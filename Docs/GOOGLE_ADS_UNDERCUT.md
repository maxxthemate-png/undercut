# Undercut — Google Ads launch kit (paste-ready)

Goal: put Undercut in front of **active eBay resellers at the moment they're searching for a repricer**, and get the first paying customer. This is also the cheapest demand test we have — see the kill/scale read at the bottom.

Everything here is paste-ready. The only things Claude can't do are in **OWNER ACTIONS** (billing + launch live in your Google Ads account).

---

## 1. Campaign settings

- **Campaign type:** Search only (no Display/Search Partners to start — keeps clicks high-intent).
- **Networks:** Google Search only. Uncheck "Search partners" and "Display Network."
- **Geo:** United States (the eBay Browse data + pricing are US-centric).
- **Language:** English.
- **Budget:** **$15/day** to start (~$450/mo cap). Enough for a real read, small enough to be safe pre-revenue.
- **Bidding:** Start **Maximize clicks** with a **max CPC cap of $2.50** for the first ~2 weeks (until the signup conversion has data), then switch to **Maximize conversions** once ~15-30 signups have fired. (Same playbook as IdeaCoach.)
- **Ad rotation:** Optimize.

---

## 2. Ad groups + keywords

Three tight ad groups so each ad matches the query. Use **phrase match** (in quotes) and **exact** ([brackets]) — avoid broad match (it burns budget on junk).

### Ad group A — Repricer intent
```
"ebay repricer"
[ebay repricer]
"ebay repricing software"
"ebay repricing tool"
"automatically reprice ebay"
"auto reprice ebay listings"
"ebay price automation"
```
Landing page: **/ebay-repricing-software**

### Ad group B — Competitor alternatives (highest intent — they already pay for a repricer)
```
"streetpricer alternative"
[streetpricer alternative]
"repricerexpress alternative"
"repricer.com alternative"
"3dsellers repricer alternative"
"cheaper than streetpricer"
```
Landing page: **/streetpricer-alternative**

### Ad group C — Problem / job-to-be-done
```
"beat lowest price ebay"
"ebay undercut competitors"
"stop racing to the bottom ebay"
"ebay price floor tool"
"reprice ebay without losing money"
```
Landing page: **/ebay-price-checker** (the instant demo — they can try it on their own item immediately)

---

## 3. Negative keywords (paste into the campaign's negative list)

Keep out buyers, freebie-hunters, and unrelated "repricing":
```
free
crack
amazon
walmart
shopify
"how to sell on ebay"
jobs
salary
coupon
discount code
what is
meaning
reddit
```
(Buyers searching a product name are handled by the price-tracker pages, not these ads.)

---

## 4. Ad copy — Responsive Search Ads (RSA)

Paste these into one RSA per ad group. Google mixes headlines/descriptions; give it 8-10 headlines + 4 descriptions. Pin nothing at first.

### RSA for Ad group A (Repricer intent)
**Headlines:**
1. Automated eBay Repricing
2. Beat the Lowest Competitor 24/7
3. Never Sell Below Your Floor
4. Reprice eBay on Autopilot
5. Win the Sale, Keep the Margin
6. Set a Floor. We Do the Rest.
7. Free 14-Day Trial — No Card
8. Set It and Forget It
9. Stop Re-Pricing by Hand
10. Floor-Protected Repricing

**Descriptions:**
1. Undercut beats the lowest competitor on every listing — but never below the floor you set. Free to start.
2. Stop checking prices by hand. Undercut reprices 24/7 and protects your margin automatically.
3. See exactly what we'd price your listing at — free, no signup. Then put your whole store on autopilot.
4. 14-day trial, no credit card. Connect your eBay store in one click.

### RSA for Ad group B (Competitor alternatives)
**Headlines:**
1. A StreetPricer Alternative
2. Floor-First eBay Repricing
3. Start Free — No Card
4. Cheaper, Floor-Protected
5. Beat Competitors, Keep Margin
6. Reprice eBay Automatically
7. RepricerExpress Alternative
8. Try It On Your Listing Free
9. Win the Sale Without the Race
10. Simple eBay Repricing

**Descriptions:**
1. Floor-protected eBay repricing that beats the lowest competitor without racing to the bottom. Free to start.
2. Switching repricers? Undercut undercuts competitors and stops dead at your per-item floor. 14-day free trial.
3. See what Undercut would price your listing at — free, no signup required.
4. No credit card to start. Set your floors once and let it run.

### RSA for Ad group C (Problem / JTBD)
**Headlines:**
1. See the Lowest eBay Price Free
2. What Would You Price It At?
3. Beat It — Without Losing Money
4. Try Undercut On Your Listing
5. Free eBay Price Checker
6. Stop the Race to the Bottom
7. Reprice With a Hard Floor
8. Win the Sale, Protect Margin
9. Free — No Signup to Try
10. Then Automate Your Store

**Descriptions:**
1. Check the lowest live eBay price for any item, then see exactly what Undercut would price it at — free.
2. Beat the lowest competitor automatically, but never below your floor. Try it on one listing, free.
3. No race to the bottom. Undercut holds your floor and wins the sale when it's profitable.
4. 14-day trial, no card. Put your whole store on autopilot.

---

## 5. Conversion tracking — what flips the dark tag live

The site already ships the gtag scaffold + a `sign_up` conversion event on trial signup, **deployed dark**. It does nothing until you give it your Ads conversion ID. Steps:

1. **Google Ads → Goals → Conversions → New conversion action → Website.**
2. Create a conversion named **"Trial signup"**, category **Sign-up**, count **One**, value optional.
3. Ads shows you a **Conversion ID** (`AW-XXXXXXXXXX`) and a **Conversion label** (`abcdEFGhIJ...`). Copy both.
4. Send them to Claude (paste in chat), OR add them yourself in **Vercel → undercut project → Settings → Environment Variables**:
   - `NEXT_PUBLIC_GADS_ID` = `AW-XXXXXXXXXX`
   - `NEXT_PUBLIC_GADS_SIGNUP_LABEL` = `abcdEFGhIJ...`
5. Redeploy the frontend (`vercel --prod`) — Claude can do this once the values exist. The tag goes live and every trial signup reports as a conversion.

Until step 4, ads still run and you can read clicks → demo-uses → signups in `/admin`; you just won't get Ads-side conversion optimization yet.

---

## 6. OWNER ACTIONS (only you can do these)

1. **Add a payment method** to your Google Ads account (you have the IdeaCoach one — you can reuse the account or make a new campaign in it).
2. **Build the campaign** above: 1 Search campaign, 3 ad groups, paste keywords + negatives + the 3 RSAs, set $15/day + $2.50 max CPC.
3. **Create the "Trial signup" conversion action** (section 5) and send Claude the `AW-...` ID + label (or set the Vercel env vars yourself).
4. **Launch.** Then tell Claude — I'll watch the funnel in `/admin` and tune.

---

## 7. Kill / scale read (after ~$150-200 spend)

- **Clicks but ~0 demo-uses** → the landing page/offer isn't landing. Fix message-match or the hero.
- **Demo-uses but ~0 signups** → the activation ask (connect store) is the leak; lean harder on the no-OAuth demo + trust.
- **Signups but ~0 paid** → pricing/value gap at trial→paid; tune the in-app nudges.
- **A paid customer** → that's the win. Then we work on making CPA < LTV and scaling budget.

The point: $150 buys a specific, fast answer to "does this funnel convert?" — far faster than waiting on SEO to tell us the same thing in a year.
