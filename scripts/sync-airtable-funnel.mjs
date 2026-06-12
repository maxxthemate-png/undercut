#!/usr/bin/env node
// Autonomous Lead Funnel sync → Airtable "UNDERCUT Growth Ops" base.
//
// Pulls the live source_funnel breakdown from the backend admin metrics endpoint
// and upserts it (keyed on Source) into the Lead Funnel table, stamping today's
// date into "Last synced". Owner never types into the base — this keeps it current.
//
// Runs daily from .github/workflows/lifecycle-emails.yml.
//
// CLEAN NO-OP until the owner adds the AIRTABLE_PAT repo secret (mirrors the
// ANTHROPIC_API_KEY content-machine pattern): if AIRTABLE_PAT is unset, exit 0.
//
// Env:
//   AIRTABLE_PAT        (required to do anything)  — PAT scoped to this base, data.records:read+write
//   AIRTABLE_BASE_ID    default appNAQdLDHe2orGHN
//   AIRTABLE_FUNNEL_TABLE default "Lead Funnel"
//   API_URL             deployed backend base URL (e.g. https://undercut-api.onrender.com)
//   ADMIN_KEY           admin metrics key (X-Admin-Key); falls back to UNDERCUT_API_KEY

const PAT = process.env.AIRTABLE_PAT;
if (!PAT) {
  console.log('[sync-airtable-funnel] AIRTABLE_PAT not set — no-op (add the repo secret to switch on).');
  process.exit(0);
}

const BASE_ID = process.env.AIRTABLE_BASE_ID || 'appNAQdLDHe2orGHN';
const TABLE = process.env.AIRTABLE_FUNNEL_TABLE || 'Lead Funnel';
const API_URL = (process.env.API_URL || 'https://undercut-api.onrender.com').replace(/\/$/, '');
const ADMIN_KEY = process.env.ADMIN_KEY || process.env.UNDERCUT_API_KEY;

if (!ADMIN_KEY) {
  console.error('[sync-airtable-funnel] No ADMIN_KEY / UNDERCUT_API_KEY — cannot read metrics. Exiting non-zero.');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
const atUrl = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}`;

async function main() {
  // 1. Pull live source_funnel.
  const res = await fetch(`${API_URL}/api/admin/metrics`, {
    headers: { 'X-Admin-Key': ADMIN_KEY },
  });
  if (!res.ok) throw new Error(`metrics fetch failed: HTTP ${res.status}`);
  const metrics = await res.json();
  const funnel = Array.isArray(metrics.source_funnel) ? metrics.source_funnel : [];

  if (funnel.length === 0) {
    console.log('[sync-airtable-funnel] source_funnel empty — nothing to sync.');
    return;
  }

  // 2. Upsert keyed on Source (Airtable batches max 10 records per request).
  const records = funnel.map((r) => ({
    fields: {
      Source: String(r.source ?? '(unknown)'),
      Leads: Number(r.leads ?? 0),
      Signups: Number(r.signups ?? 0),
      Paid: Number(r.paid ?? 0),
      'Last synced': today,
    },
  }));

  let synced = 0;
  for (let i = 0; i < records.length; i += 10) {
    const batch = records.slice(i, i + 10);
    const r = await fetch(atUrl, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${PAT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        performUpsert: { fieldsToMergeOn: ['Source'] },
        records: batch,
      }),
    });
    if (!r.ok) {
      const body = await r.text();
      throw new Error(`Airtable upsert failed: HTTP ${r.status} ${body.slice(0, 300)}`);
    }
    synced += batch.length;
  }

  console.log(`[sync-airtable-funnel] Upserted ${synced} source rows into "${TABLE}" (synced ${today}).`);
}

main().catch((e) => {
  console.error('[sync-airtable-funnel]', e.message);
  process.exit(1);
});
