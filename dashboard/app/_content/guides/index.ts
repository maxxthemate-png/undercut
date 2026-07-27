import type { PageContent } from '../types'

export const guides: PageContent[] = [
  {
    "title": "How to Reprice Electronics on eBay — Undercut",
    "metaDescription": "Learn how to reprice electronics on eBay without killing your margin. Set hard floors on aging stock and start a 14-day free trial — no card required.",
    "h1": "How to Reprice Electronics on eBay While Protecting Your Margin on Aging Stock",
    "eyebrow": "Guide",
    "intro": "Electronics depreciate faster than almost any other eBay category. A graphics card that listed at $320 in January can be worth $240 by March. That price decay is relentless — and if you are manually checking comps once a week, you are already behind. The fix is not just repricing fast; it is repricing with a hard floor so that as the market drops, you follow it down to a win without selling below your actual cost. This guide walks through exactly how to do that, with real numbers.",
    "sections": [
      {
        "h2": "Why Electronics Repricing Is Different From Every Other Category",
        "body": "Most eBay categories have stable or slowly shifting prices. Electronics do not. GPU prices swing on new-release announcements. Refurbished iPhone pricing moves within days of a carrier promotion. Opened-box laptops depreciate the moment a newer SKU ships. This means two things for sellers: first, you can capture a sale quickly by being even $1 below the lowest live competitor. Second, if you do not update prices constantly, you are either overpriced and invisible, or underpriced and bleeding margin. The solution is automated repricing with a floor — not just a floor in your head, but a hard number locked to each listing that the repricer will never cross.",
        "bullets": [
          "GPU and console prices can shift 10-20% within a single news cycle",
          "Refurbished smartphone comps change daily as carriers run promotions",
          "Opened-box and used condition listings face extra downward pressure vs. new",
          "Slow-moving stock loses value every week it sits — a floor keeps you honest about when to cut losses"
        ]
      },
      {
        "h2": "How to Calculate a Hard Floor for an Electronics Listing",
        "body": "Your floor is the lowest price at which selling the item is still worth it. For electronics, that calculation needs to account for cost of goods, shipping (often heavier than other categories), eBay fees, and your minimum acceptable margin. Here is a worked example for a refurbished tablet:\n\nCost of goods: $62.00\nShipping (box + padding + label): $9.50\neBay final value fee: 13.6% of sale price\nMinimum margin target: 15%\n\nFloor = (Cost + Shipping) / (1 - FVF% - Margin%) = (62 + 9.50) / (1 - 0.136 - 0.15) = 71.50 / 0.714 = $100.15\n\nRound up to $100.99 and that is your floor. Undercut will reprice that listing down to $100.99 to beat any competitor, but it will never go to $98, $95, or $89 chasing a race to the bottom. You win the sale or you do not — but you never sell at a loss.",
        "bullets": [
          "Always include actual outbound shipping cost, not a rough guess — electronics packaging adds up",
          "Use eBay's current final value fee for your category, not a blended average",
          "Add a buffer for returns: electronics have higher return rates than most categories",
          "Reassess floors every 30 days as component costs and used-market benchmarks shift"
        ]
      },
      {
        "h2": "Setting Up Repricing Frequency for Fast-Moving Electronics",
        "body": "Repricing once a day is fine for books or clothing. For electronics, it is often not enough. A competitor can drop their price, take your sales for 18 hours, and restock before you ever notice. The faster your repricing cycle, the more time your listing spends at or near the top of search results. Undercut's Pro and Scale plans both reprice every 15 minutes — the difference between them is capacity, not speed. For high-volume electronics sellers — especially those moving phones, tablets, or gaming hardware — Scale's 10,000-listing capacity and priority support keep a large, fast-moving catalog covered at the same 15-minute cadence. If you are just starting out, the free plan (25 listings, repriced multiple times daily) is enough to learn the system before committing.",
        "bullets": [
          "Free plan: up to 25 listings — good for testing a single electronics SKU category",
          "Starter $29/mo: 100 listings, suitable for a focused niche like one brand of refurbished phones",
          "Pro $79/mo: 1,000 listings + 15-min repricing + AI aggressiveness tuning",
          "Scale $199/mo: 10,000 listings + 15-min repricing + priority support — for warehouse-scale electronics operations"
        ]
      },
      {
        "h2": "Using AI Aggressiveness Tuning for Electronics",
        "body": "Not every electronics listing should chase the floor aggressively. A brand-new, sealed-in-box item with high demand should stay near market price — dropping fast only trains buyers to wait for a lower price. A refurbished unit with 90 days of shelf age and three competitors actively undercutting each other is a different situation: you want to be at the floor as soon as possible to move the unit before it depreciates further. Undercut's AI aggressiveness tuning (available on Pro and Scale) lets you configure, per listing, how quickly and how far a listing moves toward its floor. You can set a refurbished unit to move aggressively toward its floor while a sealed-new unit moves conservatively. This is especially useful for mixed electronics inventories where the same repricing behavior should not apply across every condition level.",
        "bullets": []
      },
      {
        "h2": "Common Mistakes Electronics Sellers Make When Repricing",
        "body": "The most common error is setting no floor at all and letting the repricer match any competitor price. In electronics, this is dangerous because some listings are priced incorrectly by sellers who made a calculation mistake — and your repricer will match them straight into a loss. The second most common mistake is setting a floor based on the original purchase price without accounting for eBay fees, shipping, and return risk. The floor feels safe but is actually below breakeven once you run the math. The third mistake is repricing too infrequently in a category where prices move hourly. If your repricing cycle is 24 hours, you are likely winning sales only during the window right after the cycle runs, then drifting out of position for most of the day.",
        "bullets": [
          "Never reprice without a floor in electronics — one bad comp will crater your margin",
          "Recalculate floors after any change in shipping carrier rates or eBay fee adjustments",
          "Check your repricing logs monthly: if a listing is hitting its floor constantly, it may be time to sell through or bundle rather than keep dropping"
        ]
      }
    ],
    "faq": [
      {
        "q": "What happens when every competitor drops below my floor?",
        "a": "Undercut holds your listing at the floor price rather than crossing it. You may lose the sale, but you will not sell at a loss. At that point the real question is whether your floor is correctly calculated or whether the market has structurally moved and you need to reassess cost, bundling, or liquidation options."
      },
      {
        "q": "How often should I update floors for electronics listings?",
        "a": "At minimum once a month. For fast-depreciating categories like smartphones or GPUs, review floors every two to three weeks. If you change shipping carriers, update immediately — a $2 shipping cost increase directly raises your breakeven floor."
      },
      {
        "q": "Can I set different repricing aggressiveness for new versus refurbished condition?",
        "a": "Yes. On the Pro and Scale plans, Undercut's AI aggressiveness tuning lets you set a different aggressiveness on each listing. A common setup is conservative repricing on your sealed-new electronics and aggressive repricing on the refurbished or open-box units that are aging on the shelf."
      },
      {
        "q": "Does Undercut reprice multi-variation electronics listings (e.g. different storage sizes)?",
        "a": "Yes. Each variation can carry its own floor, so a 128GB and a 256GB model of the same phone are repriced independently against their respective competitors — not blended together."
      },
      {
        "q": "Is the 14-day trial enough time to see real results for electronics repricing?",
        "a": "For most sellers, yes. Electronics categories have enough price movement that within 14 days you will see the repricer actively adjusting listings, and you can compare how quickly your items sell and your average selling price before and after. No card is required to start."
      }
    ],
    "cta": {
      "heading": "Set Your Floor. Win the Sale. Never Sell Below Cost.",
      "sub": "Start repricing electronics in minutes — 14-day free trial, no credit card required. Your hard floors are locked in from day one."
    },
    "internalLinks": [
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/ai-repricing-ebay",
        "label": "AI Repricing on eBay Explained"
      },
      {
        "href": "/guides/fastest-ebay-repricer",
        "label": "Fastest eBay Repricer for High-Velocity Listings"
      }
    ],
    "slug": "electronics-repricing",
    "collection": "guides",
    "template": "guide",
    "leadForm": true,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "Repricing Clothing & Fashion on eBay — Undercut",
    "metaDescription": "Seasonal shifts and size sprawl wreck manual pricing. Learn how to reprice clothing on eBay automatically — with hard floors — and start a free 14-day trial, no.",
    "h1": "How to Reprice Clothing and Fashion on eBay Without Tanking Your Margins",
    "eyebrow": "Guide",
    "intro": "Fashion resellers face a double burden that other eBay categories do not: inventory splits across dozens of size and color variations, and prices that need to move with the season. A winter puffer listed in November competes at one price point; in March it competes at a completely different one — or sits unsold. Manual repricing across hundreds of SKUs with these dynamics is not slow, it is mathematically unwinnable. The answer is automated repricing anchored by a per-item hard floor, so markdowns chase the sale without ever crossing into a loss.",
    "sections": [
      {
        "h2": "Why Clothing Is the Hardest Category to Reprice Manually",
        "body": "A typical reseller carrying 200 garments might have 600 or more active listings once sizes and colors are split into separate SKUs. Each variation has its own cost basis, its own sell-through velocity, and its own competitive landscape. A size-small cardigan may have three competitors; the size-large has twelve. Checking and adjusting each one daily is a part-time job on its own — and the market does not wait for you to finish.",
        "bullets": [
          "Size fragmentation: one item becomes 4-10 listings, each with a distinct price floor and competitor set",
          "Seasonal compression: demand peaks are short; late-season listings need aggressive cuts timed to sell before the window closes",
          "Condition variation: new-with-tags, new-without-tags, and pre-owned all price differently even within the same SKU",
          "Fee creep: eBay's 13.6% final value fee (on most clothing) erodes margin fast when floors are not set correctly"
        ]
      },
      {
        "h2": "Setting a Hard Floor for Every Clothing Listing",
        "body": "The most important habit any clothing reseller can build before automating is calculating and recording a floor for every item. Without a floor, an automated repricer will follow competitors all the way to a loss. The floor formula is straightforward: cost of goods + shipping cost + eBay fees + your minimum acceptable margin.\n\nWorked example — a vintage denim jacket:\n- Cost (sourced): $18.00\n- Shipping (poly mailer + label): $6.00\n- eBay final value fee at 13.6%: applied to sale price\n- Minimum margin target: 20%\n\nTo find the floor price, solve for P where P × (1 − 0.136) − $6.00 − $18.00 ≥ 0.20 × cost:\nP × 0.864 ≥ $18.00 + $6.00 + ($18.00 × 0.20)\nP × 0.864 ≥ $27.60\nP ≥ $31.95\n\nSet the floor at $31.95. Undercut will reprice aggressively below every competitor but will stop at that number — automatically, for every SKU you configure.",
        "bullets": [
          "Use your actual landed cost, not the purchase price alone — account for sourcing mileage, storage, and supplies",
          "Update floors after each resupply run if costs change",
          "Seasonal clearance floors can be lower than in-season floors — set separate floor profiles for November vs. March"
        ]
      },
      {
        "h2": "How Seasonality Changes the Repricing Strategy — and How to Automate It",
        "body": "Clothing has two repricing modes: in-season and clearance. In-season, the goal is to hold near the market price and win sales from buyers ready to buy now. Clearance, the goal is velocity — move inventory before it becomes unseasonal dead stock, but still above the floor.\n\nManually switching between these modes for hundreds of listings is the exact work automation eliminates. On Undercut's Pro and Scale plans, the AI aggressiveness tuning lets you dial, per listing, how fast and how far a listing moves toward its floor — from conservative to aggressive. Sellers typically run conservative settings in peak season and shift to aggressive in the final four to six weeks of a season's sell window.\n\nThe floor stays constant throughout both phases — it is what keeps the clearance discount from becoming a loss.",
        "bullets": [
          "Peak season: conservative mode, protect margin, let the floor work as a ceiling against undercutting wars",
          "Late season: aggressive mode, beat the lowest price by a defined percentage, flush inventory above floor",
          "End of season: anything sitting at the floor can be moved to a private sale, a bundle, or pulled and stored for next year"
        ]
      },
      {
        "h2": "Size and Variation Sprawl: Repricing at Scale Without Chaos",
        "body": "The practical problem with fashion repricing is volume. If you source 50 garments a week and each generates four size-variation listings, you are managing 200 new listings weekly — on top of your existing catalog. Repricing each one by hand before the next batch arrives is impossible without a team.\n\nUndercut connects to your full eBay catalog and reprices against a floor you set on each listing, not at the account level. That means your XS listings compete against XS competitors and your XL listings compete against XL competitors — each with the floor you set for that specific cost basis. The Scale plan (10,000 listings, plus priority support) is built specifically for sellers at this volume.",
        "bullets": [
          "Connect your eBay account and set each listing's Floor Price from your existing cost data",
          "Floors apply per listing — a floor mismatch in one size does not affect another",
          "15-minute repricing ensures you respond to competitor price drops before buyers see a stale listing"
        ]
      },
      {
        "h2": "Choosing the Right Undercut Plan for a Clothing Seller",
        "body": "The right plan depends on your active listing count and whether you need AI aggressiveness tuning for seasonal mode-switching.\n\nFree (25 listings): test the floor mechanic with a small capsule of your best sellers before committing.\nStarter at $29/month (100 listings): works for a focused boutique reseller with a tight, curated catalog.\nPro at $79/month (1,000 listings, 15-minute repricing): the practical entry point for anyone running seasonal clearance strategies — the AI aggressiveness tuning is what makes the in-season vs. clearance mode switch automatic.\nScale at $199/month (10,000 listings, 15-minute repricing, priority support): sourcing at volume, multiple categories, or running a small resale operation with staff.\n\nAll plans start with a 14-day free trial and no credit card required, so you can validate your floors and watch repricing work before paying anything."
      }
    ],
    "faq": [
      {
        "q": "How do I set different floors for in-season versus end-of-season clearance on the same item?",
        "a": "You can update a listing's floor at any point — Undercut will respect the new value immediately. Many clothing sellers keep a simple spreadsheet with two floor columns (peak and clearance) and update each listing's Floor Price in the dashboard as the season shifts. The repricer holds at whichever floor is active, so there is no risk of the clearance price overshooting into a loss."
      },
      {
        "q": "Does Undercut handle size variations as separate listings or as one listing with variants?",
        "a": "eBay surfaces most size variations as separate active listings in your seller account, and Undercut reprices at the individual listing level. Each size gets its own floor and its own competitor comparison, which matters because a size small and a size large often have different supply and different competitor prices."
      },
      {
        "q": "My clothing costs vary a lot because I source from thrift stores. How do I floor items I paid different prices for?",
        "a": "Set the floor per listing based on that item's actual cost. If two identical jackets cost you $8 and $22 respectively, they get different floors. The formula is the same — cost + shipping + fees + margin target — but the input changes per unit. You set each listing's Floor Price in the dashboard, so two identical jackets with different costs each get the floor that matches what you actually paid."
      },
      {
        "q": "Competitors on my clothing listings sometimes price below their shipping cost. Will Undercut match those prices?",
        "a": "No — that is exactly what the floor prevents. If a competitor lists below your floor (even below their own cost, which happens in race-to-bottom situations), Undercut stops at your floor and holds. You may not win every sale, but you will not take a loss on the ones you do win."
      },
      {
        "q": "How quickly does repricing react when a competitor drops their price on a trending item during a sale event like Prime Day or a holiday weekend?",
        "a": "On both the Pro and Scale plans, repricing checks run every 15 minutes. During high-traffic sale events when prices shift fast, that 15-minute cadence keeps fashion sellers responsive to competitor activity, matching or beating a price drop within a single cycle rather than the next time you log in. Scale adds capacity (up to 10,000 listings) and priority support for sellers running large catalogs through those events, not a faster cycle."
      }
    ],
    "cta": {
      "heading": "Set Your Floors and Let Undercut Handle the Rest",
      "sub": "Start your free 14-day trial — no credit card, no commitment. Import your clothing catalog, set a floor for each item, and watch the repricer work without touching your margins."
    },
    "internalLinks": [
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/guides/seasonal-repricing",
        "label": "Seasonal Repricing Strategy Guide"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "Setting an eBay Price Floor"
      }
    ],
    "slug": "clothing-repricing",
    "collection": "guides",
    "template": "guide",
    "leadForm": false,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "Repricing Books on eBay Without Selling at a Loss — Undercut",
    "metaDescription": "Repricing books on eBay risks razor-thin losses if you ignore shipping costs. Learn the floor formula and start a 14-day free trial — no card required.",
    "h1": "The Book Seller's Floor Formula: Reprice on eBay Without Losing Money on Every Sale",
    "eyebrow": "Guide",
    "intro": "Books are the category where automated repricing can silently destroy your margin. Media Mail shipping, eBay's variable final value fees, and the sheer volume of $3–$15 titles mean a repricer chasing the lowest price can drop a listing below your actual cost before you notice. Unlike electronics, a $1 undercut on a used paperback can flip a 20% margin into a 15% loss. That's why every serious book seller needs one thing before turning on any repricer: a hard floor calculated specifically for books, factoring in the costs that most sellers forget.",
    "sections": [
      {
        "h2": "Why Books Are the Hardest Category to Reprice Safely",
        "body": "Most repricing guides are written with electronics or collectibles in mind — categories where a $5 swing is trivial. Books are different. The average used book on eBay sells for $6–$14, which means every dollar of unaccounted cost is a significant percentage of revenue. Three costs destroy book margins that sellers routinely underestimate:",
        "bullets": [
          "Media Mail is cheap but not free — USPS Media Mail starts at $3.65 for a single book under 1 lb, and a heavier hardcover can reach $5.50 or more.",
          "eBay's final value fee on books runs 13.6% of the total amount (item + shipping), not just the item price — so your shipping charge is also being fee'd.",
          "Packaging supplies — a poly mailer or bubble mailer adds $0.15–$0.50 per order, which sounds trivial until you're shipping 200 books a month."
        ]
      },
      {
        "h2": "The Book Floor Formula: A Worked Example",
        "body": "Before you set up any repricer, calculate the minimum price you can accept for each book. Here is the formula and a concrete example using a common used paperback:\n\nFloor = (Cost + Shipping + Supplies) / (1 - eBay fee rate - desired margin rate)\n\nExample: You sourced a paperback for $2.00. Media Mail shipping is $3.65. Poly mailer costs $0.20. You want a 15% net margin. eBay final value fee is 13.6%.\n\nTotal hard costs = $2.00 + $3.65 + $0.20 = $5.85\nFloor = $5.85 / (1 - 0.136 - 0.15) = $5.85 / 0.714 = $8.20\n\nSo your floor is $8.20. If a competitor lists the same ISBN at $6.99, your repricer must not follow — it should hold at $8.20 and let that sale go. Chasing $6.99 means you net approximately -$0.58 after fees and shipping. A floor stops this automatically.",
        "bullets": []
      },
      {
        "h2": "How to Set Floors in Undercut for Your Book Inventory",
        "body": "Undercut lets you set a hard floor per listing, which the repricer will never breach regardless of what competitors do. For book sellers, the recommended approach is to calculate your floor for each ISBN or SKU using the formula above, then enter that floor when you import or create the listing in Undercut. The repricer will then beat the lowest visible competitor price by your configured amount — but the moment doing so would require going below your floor, it holds the listing at the floor instead of matching. This means you stay competitive on every title where margin exists, and you automatically step aside on titles where it does not. On the Pro and Scale plans, AI aggressiveness tuning lets you configure whether to hold at floor, fractionally undercut, or match — useful for slow-moving titles where you'd rather sell at cost than warehouse indefinitely.",
        "bullets": [
          "Set each listing's Floor Price in the dashboard.",
          "Floors are respected even during rapid market drops — no manual intervention needed.",
          "Pro and Scale plans both reprice every 15 minutes — useful during peak selling hours on popular ISBNs; Scale adds capacity and priority support, not a faster cycle."
        ]
      },
      {
        "h2": "Common Book Repricing Mistakes (and How a Floor Prevents Them)",
        "body": "Even experienced sellers make these errors when they first automate book repricing:",
        "bullets": [
          "Forgetting to include shipping in the floor calculation — the most common mistake, and the most expensive on Media Mail volume.",
          "Setting one floor for all books — a $0.99 mass-market paperback has a completely different cost structure than a $45 textbook. Floors must be per-item or per-category.",
          "Using the item price only for fee calculation — eBay charges fees on the total transaction including shipping collected, so your fee base is larger than you think.",
          "Repricing below floor 'just once' manually — undermines the discipline the floor exists to enforce. If the floor is right, trust it.",
          "Not updating floors when USPS changes Media Mail rates — check at the start of each year and after any announced rate changes."
        ]
      },
      {
        "h2": "When to Let a Book Sit Rather Than Reprice It",
        "body": "Not every book should be repriced aggressively. For titles with only one or two competitors and slow turnover — textbooks outside semester windows, out-of-print niche titles, local-interest books — holding at a higher price and waiting is often more profitable than racing to the bottom. Undercut's floor mechanic supports this naturally: if the lowest competitor is below your floor, your listing simply holds at floor price. You do not need to create a separate rule or manually pause repricing. The floor is the rule. For true dead inventory — books that have not sold in 90+ days despite competitive pricing — the right move is usually relist at a lower floor (after recalculating with updated shipping costs) or remove from inventory entirely, not chase an unprofitable price point with automation.",
        "bullets": []
      }
    ],
    "faq": [
      {
        "q": "Does Media Mail shipping count toward eBay's final value fee on book sales?",
        "a": "Yes. eBay calculates its final value fee on the total amount the buyer pays, which includes the shipping charge you collect. At 13.6%, this means a $3.65 Media Mail charge adds roughly $0.50 in fees on top of the item fee. Your floor must account for this or you will underestimate your true cost per sale."
      },
      {
        "q": "What if a competitor lists the same ISBN at a price below my floor — will Undercut match them?",
        "a": "No. Undercut's floor is a hard limit the repricer will not cross. If the lowest competitor is at $5.99 and your floor is $8.20, your listing stays at $8.20. You may lose that individual sale, but you avoid the more damaging outcome of fulfilling an order at a net loss."
      },
      {
        "q": "Should I set the same floor for paperbacks and hardcovers?",
        "a": "No. Hardcovers weigh significantly more, which increases Media Mail shipping cost and therefore your floor. A 1.5 lb hardcover may cost $4.60 to ship via Media Mail versus $3.65 for a light paperback — that $0.95 difference compounds through the floor formula and produces a meaningfully higher minimum price. Calculate floors individually or by weight bracket."
      },
      {
        "q": "How often does Undercut reprice my book listings, and does speed matter for books?",
        "a": "The Free and Starter plans reprice on a slower cadence suited to most book sellers. The Pro and Scale plans both reprice every 15 minutes. For most book categories, the slower cadence is fine — book prices don't move as fast as electronics. Textbooks during semester rush are an exception where the 15-minute cadence on Pro or Scale can meaningfully affect sell-through."
      },
      {
        "q": "How do I set floors across a large book inventory — do I have to do it one listing at a time?",
        "a": "Undercut imports your active listings when you connect your eBay account, and you set the Floor Price on each listing in the dashboard. For sellers with hundreds or thousands of ISBNs, the practical path is to calculate floors offline in your own spreadsheet (for example, cost × 1.45), then enter each listing's floor. The floor you set is the floor the repricer respects."
      }
    ],
    "cta": {
      "heading": "Set Your Floor. Let Undercut Handle the Rest.",
      "sub": "Start free with 25 listings — no credit card required. Calculate your book floor once, then let automated repricing compete without ever selling below cost."
    },
    "internalLinks": [
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "Setting an eBay Price Floor"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/ebay-seller-fees-explained",
        "label": "eBay Seller Fees Explained"
      }
    ],
    "slug": "book-repricing",
    "collection": "guides",
    "template": "guide",
    "leadForm": false,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "Repricing Collectibles on eBay the Right Way — Undercut",
    "metaDescription": "Repricing collectibles on eBay without a floor AND ceiling destroys margins. Start Undercut's 14-day free trial — no card required — and reprice safely.",
    "h1": "Why Collectibles Need a Floor AND a Ceiling — Not Just a Lowest-Price Chase",
    "eyebrow": "Guide",
    "intro": "A vintage 1983 G.I. Joe in C-8 condition is not the same item as a C-5 copy listed three cents cheaper. Blind undercutting in collectibles does not make you competitive — it makes you the seller who trains buyers to expect mint prices for played-with goods, and it erodes category-wide values over time. Repricing collectibles on eBay works only when your repricer understands two constraints: a hard floor below which you never go, and an intelligent ceiling that keeps you from leaving money on the table when demand spikes.",
    "sections": [
      {
        "h2": "Why Standard Repricing Logic Breaks Down for Collectibles",
        "body": "Most repricing tools treat eBay listings as fungible: one seller's widget equals every other seller's widget, so the goal is simply to be the cheapest. That assumption holds for commodity goods — phone cases, printer ink, basic kitchen tools. It fails completely for collectibles, where two nominally identical listings can differ by 300% in fair value based on condition grade, completeness, provenance, and whether original packaging is present.",
        "bullets": [
          "A Funko Pop graded 9.6 by Wax Pack Heroes commands a premium over a raw, open-box copy — they are different products.",
          "A complete-in-box Sega Genesis game is worth multiples of a cartridge-only copy; matching them in price punishes the better seller.",
          "Seasonal demand spikes (holiday, anniversary releases, media tie-ins) can move fair market value 40–80% in weeks — a ceiling prevents underpricing into a hot market.",
          "Condition-inflation by some sellers means the 'lowest price' is often a legitimately inferior item, not a true comp."
        ]
      },
      {
        "h2": "Setting a Hard Floor: A Worked Example for Sports Cards",
        "body": "Before you configure any repricer, calculate the minimum price below which a sale is a loss. For collectibles, factor in item cost, shipping (often higher due to rigid mailers, toploaders, or boxes), eBay fees, and your minimum acceptable margin. Here is a concrete floor calculation for a raw rookie card:\n\n- Item cost (what you paid): $8.00\n- Shipping supplies + postage: $4.00\n- eBay final value fee (13.6% of sale price, approximate for this category): applied to sale price\n- Minimum margin target: 15%\n\nSolving for the floor price where (price × 0.864) − $12 ≥ 15% × price:\n\nFloor ≈ $12 ÷ (0.864 − 0.15) = $12 ÷ 0.714 ≈ $16.81, rounded up to $17.00 for safety.\n\nThat $17.00 is your hard floor. Undercut will never reprice below it, regardless of what a competitor lists. You set it once per listing; the repricer handles the rest.",
        "bullets": [
          "Always include shipping materials in your cost basis — poly mailers are cheap, rigid card savers are not.",
          "If you offer free shipping, the full postage cost must be embedded in your floor calculation.",
          "Graded slabs have higher floor costs: PSA/BGS grading fees typically run $20–$150+ per card and must be recovered."
        ]
      },
      {
        "h2": "Adding a Ceiling: Capturing Upside Without Manual Intervention",
        "body": "A floor protects you from selling at a loss. A ceiling is the upper bound you set so that your repricer does not drift your price down to match a temporarily distressed seller dumping inventory. In collectibles, ceilings matter for a second reason: when comparable sold listings show rising prices — a set is discontinued, a player gets called up, a show gets a reboot — you want your price to rise with the market, not sit anchored to a stale competitor low.\n\nSet your ceiling at the highest price you believe the market will currently bear for your specific condition. A practical approach: check the last 30 days of eBay sold listings filtered to your exact condition and completeness, take the 75th-percentile sale price, and use that as your ceiling. Revisit monthly for active categories like vintage video games or modern Pokemon cards where values shift quickly.\n\nWith Undercut's Pro and Scale plans, AI aggressiveness tuning lets you set, per listing, how quickly and how far the repricer moves toward your floor — without ever breaking your floor or your ceiling.",
        "bullets": [
          "A ceiling without a floor is still dangerous — always set both.",
          "For graded collectibles, set separate ceiling values per grade tier if you have multiple copies.",
          "Seasonal ceilings: raise them 3–4 weeks before peak demand (Christmas, convention season) and lower them 2 weeks after."
        ]
      },
      {
        "h2": "Choosing the Right Repricing Cadence for Collectibles",
        "body": "Collectibles markets move more slowly than commodity electronics, but they are not static. A repricing interval of once per day is usually too slow during active periods; once per hour is adequate for most categories. Here is how Undercut's plans map to common collectibles seller profiles:\n\n- Free plan (25 listings): ideal for a seller testing the waters with a small curated inventory of vintage items.\n- Starter at $29/month (100 listings): covers a focused single-category seller — sports cards, vintage toys, or comic books — with a manageable SKU count.\n- Pro at $79/month (1,000 listings, 15-minute repricing + AI tuning): suited to multi-category resellers or box-breakers managing a rotating inventory.\n- Scale at $199/month (10,000 listings, 15-minute repricing, priority support): for high-volume liquidators or large trading card shops where breadth and support matter.\n\nFor most collectibles sellers, the 15-minute cadence on Pro or Scale is more than fast enough — the market rarely moves in seconds the way liquidation electronics can.",
        "bullets": [
          "15-minute repricing on Pro is fast enough for 95% of collectibles categories.",
          "Scale's added capacity (10,000 listings) and priority support matter most when you sell high-demand modern releases at volume where competitor stock sells through rapidly.",
          "AI aggressiveness tuning on Pro and Scale lets you move more defensively toward the floor on rare, slow-moving items and more aggressively on common, liquid ones — without managing two separate tools."
        ]
      },
      {
        "h2": "Practical Setup: Getting Your Collectibles Inventory Floor-Ready",
        "body": "The most common mistake sellers make when connecting Undercut to a collectibles inventory is setting one blanket floor across every listing instead of giving each its own. That works for commodity goods; for collectibles it is wrong. A $0.99 common sports card and a $400 vintage action figure in sealed packaging do not share a floor.\n\nThe right approach is to set floors at the listing level or, at minimum, by condition tier. Undercut lets you set per-listing floors directly, so you can start with your highest-value items where the floor matters most, verify the math, and then work through your lower-value long tail. Start your 14-day free trial to connect your eBay seller account, import your listings, and test floor logic on up to 25 items before upgrading.",
        "bullets": [
          "Export your active listings to a spreadsheet first and calculate floors offline, so you have the right number ready when you set each listing's Floor Price.",
          "Group your spreadsheet by condition tier as you calculate, so similar items get consistent floors when you enter them.",
          "Review floors after any significant purchase — if your cost basis changes (bulk lot buy, grading expense), update the floor before the listing goes live."
        ]
      }
    ],
    "faq": [
      {
        "q": "Can I set different floors for the same item in different condition grades?",
        "a": "Yes. In Undercut, floors are set at the individual listing level, so a Near Mint copy of a card and a Good copy can each carry the floor that reflects their actual cost basis and condition. There is no requirement to apply a single floor across all copies of the same title."
      },
      {
        "q": "What happens if every competitor lists below my floor?",
        "a": "Undercut holds your price at your floor and does not reprice below it — ever. Your listing may not be the cheapest, but it will not be a loss. This is intentional: in collectibles, the cheapest listing is often a lower-condition or incomplete item, and buyers who want your specific condition will still find you."
      },
      {
        "q": "Should I set a floor for items I list at auction rather than fixed price?",
        "a": "Undercut reprices fixed-price (Buy It Now) listings. For auction-format listings, your floor is effectively your starting bid — set that manually in eBay based on the same cost-plus-fees-plus-margin formula described in this guide. Consider converting slow-moving fixed-price collectibles to auction only after you have tested the price band with automated repricing first."
      },
      {
        "q": "How does AI aggressiveness tuning help with collectibles specifically?",
        "a": "Available on the Pro and Scale plans, AI aggressiveness tuning lets you set, per listing, how quickly and how far Undercut moves your price toward the floor. Set a rare item with one competitor to move conservatively so it holds closer to your ceiling; set a liquid common to move aggressively so it reaches competitive pricing faster. Floors and ceilings always remain hard boundaries regardless of the aggressiveness setting."
      },
      {
        "q": "I sell across multiple collectibles categories — sports cards, vintage video games, and vinyl records. Can one Undercut account handle all of them?",
        "a": "Yes. Undercut connects to your eBay seller account and reprices all fixed-price listings regardless of category. You set floors and ceilings per listing, so your vinyl records, graded cards, and CIB games each carry their own rules. The Pro plan's 1,000-listing capacity covers most multi-category resellers comfortably."
      }
    ],
    "cta": {
      "heading": "Set Your Floor. Protect Every Sale. Start Free Today.",
      "sub": "Connect your eBay account, set per-listing floors for your collectibles, and let Undercut handle the rest — 14-day trial, no credit card required."
    },
    "internalLinks": [
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/vintage-antiques-repricing",
        "label": "Repricing Vintage and Antiques on eBay"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/ebay-pricing-strategy",
        "label": "eBay Pricing Strategy: A Complete Guide"
      }
    ],
    "slug": "collectibles-repricing",
    "collection": "guides",
    "template": "guide",
    "leadForm": false,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "Repricing Vintage & Antique Items on eBay — Undercut",
    "metaDescription": "Learn how to reprice vintage and antique eBay listings safely using per-item cost floors. Start Undercut free — 14-day trial, no card required.",
    "h1": "How to Reprice Vintage and Antique Items on eBay Without Guessing",
    "eyebrow": "Guide",
    "intro": "Most repricing advice assumes you can benchmark your item against a dozen near-identical competitors. Vintage and antique sellers know that rarely applies. A 1930s pressed-glass pitcher and a 1960s version of the \"same\" pattern are not the same item — and pricing them identically can mean selling below what you paid. The only reliable floor for a one-of-a-kind piece is one you build yourself from your actual cost, shipping estimate, eBay fees, and the minimum margin you need to stay in business.",
    "sections": [
      {
        "h2": "Why Competitor Matching Breaks Down for One-of-a-Kind Items",
        "body": "On eBay, automated repricing works best when identical SKUs compete head-to-head. For mass-produced goods, a repricer can safely anchor to the lowest live price and undercut it by a cent. Vintage and antique items rarely have that luxury. A Victorian mourning brooch, an Art Deco cocktail shaker, or a signed mid-century pottery piece each has its own condition grade, provenance, and rarity story. If a competitor lists a superficially similar item in poor condition at $18, matching that price on your excellent-condition piece destroys your margin — and your reputation.\n\nThe fix is not to ignore competitor data entirely. It is to use competitor prices as a ceiling reference, not a floor. Your floor must come from your cost basis, not from what someone else decided to charge for something only loosely related to what you are selling.",
        "bullets": [
          "Condition differences of even one grade can represent 40-60% price variance in ceramics and glass",
          "Signed or marked pieces routinely command 3-5x the price of unsigned equivalents in the same style",
          "Era confusion (e.g., 1950s reproduction vs. genuine 1920s original) makes raw eBay comps unreliable"
        ]
      },
      {
        "h2": "Building a Per-Item Cost Floor: A Worked Example",
        "body": "A cost floor is the minimum price at which you break even after all costs, plus your required margin. Here is how to calculate one for a piece of Depression-era green glassware you sourced at an estate sale.\n\nAssume:\n- Item cost: $8.00\n- Shipping materials + postage: $4.00\n- eBay final value fee (approximate blended rate): 13.6% of sale price\n- Minimum acceptable margin: 15% of sale price\n\nLet S equal the floor sale price. Your proceeds after fees and shipping must cover cost plus margin:\n\nS − (0.136 × S) − $4.00 − $8.00 = 0.15 × S\n\nS × (1 − 0.136 − 0.15) = $12.00\n\nS × 0.714 = $12.00\n\nS ≈ $16.81\n\nRound up for safety: set your hard floor at $17.00. Undercut will never drop your listing below that price, regardless of where a competitor prices their version of a vaguely similar piece. Enter this number directly on the per-listing floor field in Undercut — it takes 15 seconds and protects every future reprice on that item automatically."
      },
      {
        "h2": "Categorizing Your Inventory to Set Floors at Scale",
        "body": "If you carry hundreds of vintage items, calculating a unique floor for every single listing sounds exhausting. In practice, most vintage and antique sellers cluster their inventory into cost tiers that make batch floor-setting realistic.\n\nA common approach is to define three to five cost bands — say, items sourced under $10, $10-$25, $25-$75, and $75 and above — and apply a standard fee-plus-margin formula to each band to produce a minimum multiplier. An item that cost you $20 in the $10-$25 band might automatically get a $28 floor using a 1.4x multiplier that bakes in fees and a 20% margin target.\n\nThis is not as precise as item-by-item calculation, but it is far safer than letting a repricer match whatever a competitor lists. You can refine individual floors for high-value pieces while relying on band multipliers to protect the long tail of lower-cost items.",
        "bullets": [
          "Use your sourcing receipts or a simple spreadsheet to assign every new listing to a cost band on arrival",
          "Review floors quarterly — shipping costs and eBay fee rates change",
          "High-ticket items (over $100 cost) always warrant individual floor calculations"
        ]
      },
      {
        "h2": "Using Undercut's Aggressiveness Controls for Vintage Categories",
        "body": "Vintage and antique selling is not just about protecting the floor — it is also about competitive positioning when you do want to move inventory. Undercut's Pro and Scale plans include AI aggressiveness tuning, which lets you tell the repricer how quickly and how far to move toward the competitor floor (without crossing your hard floor).\n\nFor vintage sellers, a moderate aggressiveness setting often outperforms maximum aggression. Because your items are differentiated, being the absolute lowest price does not always generate the most sales — buyers searching for vintage goods frequently filter by condition, era, and seller feedback, not purely by price. A setting that keeps you 3-5% below the nearest comparable listing, rather than pennies below the cheapest listing regardless of quality, tends to produce better margins over a full selling quarter.\n\nPro repricing also runs every 15 minutes, which matters when a competitor sells out and prices spike — you want to float back up toward your optimal price promptly, not hours later."
      },
      {
        "h2": "Common Floor-Setting Mistakes Vintage Sellers Make",
        "body": "The most frequent error is setting floors once and never revisiting them. Postage rates increase, eBay adjusts its fee structure, and your sourcing costs shift over time. A floor set two years ago may now be below your break-even point.\n\nA second mistake is treating floor as a set-it-and-forget-it ceiling on ambition. The floor is the absolute minimum — your listing price should start higher, often at or near your researched market value, and only descend if competition genuinely warrants it. Undercut starts from your current listing price and moves down only as needed, stopping at your floor. If no competitor is undercutting you, your price stays where it is.\n\nFinally, do not copy a floor from a similar item without adjusting for condition. A floor appropriate for a near-mint piece of art pottery is not appropriate for a piece with a hairline crack, even if the listing titles look identical.",
        "bullets": [
          "Audit floors after every eBay fee change announcement",
          "Keep a note in your listing title or private notes field with the floor calculation date",
          "Never use another seller's floor as your template — their cost basis is not yours"
        ]
      }
    ],
    "faq": [
      {
        "q": "Can I reprice vintage items automatically if no identical item exists on eBay right now?",
        "a": "Yes. When Undercut finds no matching competitor listings, it leaves your price where it is — it does not race to zero or behave erratically. Your hard floor acts as the safety net, and the repricer simply holds your current price until a comparable listing appears."
      },
      {
        "q": "What eBay fee rate should I use when calculating a floor for a vintage item?",
        "a": "Use approximately 13.6% as a blended final value fee rate for most categories, but check eBay's current fee schedule for your specific category. Certain categories like coins or fine jewelry carry different rates. Always add your payment processing fee (now included in eBay's final value fee for most sellers) and any promoted listings spend you allocate to that item."
      },
      {
        "q": "Should I set the same floor for a piece in excellent condition versus one with minor damage?",
        "a": "No. Condition directly affects both your selling price ceiling and your floor. A piece with a chip or hairline crack will sell for less, so its floor should reflect a lower target price — but it should still be calculated from your actual cost for that specific piece, not copied from the floor of a mint-condition version."
      },
      {
        "q": "How do I handle vintage lots (multiple items sold together) in Undercut?",
        "a": "Set the floor for a lot based on the combined cost of all items in it, plus shipping and fees for the lot as a unit. Do not average floors from individual items — a lot's cost basis is additive, and you should treat it as a single SKU with its own floor calculation."
      },
      {
        "q": "Does using a repricer hurt my standing with vintage buyers who expect negotiated prices?",
        "a": "Automated repricing and Best Offer are not mutually exclusive on eBay. You can enable Best Offer on your listings while still using Undercut to manage the Buy It Now price. Undercut only adjusts the listed price — it does not affect offer thresholds you set separately in eBay Seller Hub."
      }
    ],
    "cta": {
      "heading": "Protect every vintage piece with a floor only you set",
      "sub": "Start free — 25 listings, 14 days, no card required. Add per-item floors in seconds and let Undercut handle the rest."
    },
    "internalLinks": [
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to Set an eBay Price Floor That Protects Your Margin"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/collectibles-repricing",
        "label": "Repricing Collectibles on eBay"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "How to Reprice eBay Listings Without Losing Margin"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      }
    ],
    "slug": "vintage-antiques-repricing",
    "collection": "guides",
    "template": "guide",
    "leadForm": false,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "eBay Repricing for High-Volume Sellers — Undercut",
    "metaDescription": "Scale eBay repricing across 500+ listings with a per-listing hard floor on every item. Beat every competitor automatically — 14-day free trial, no card.",
    "h1": "How High-Volume eBay Sellers Reprice at Scale Without Losing Margin Control",
    "eyebrow": "Guide",
    "intro": "At 500 or more active listings, the math changes. You can't manually review every price, and a single misconfigured rule can silently erode margin across hundreds of SKUs overnight. The answer isn't faster hands — it's a per-listing hard floor on every item, so the repricer can chase competitors aggressively while never crossing the minimum you set. This guide shows exactly how to structure that, including the floor formula that keeps every sale profitable, and where automation stops so your margins don't.",
    "sections": [
      {
        "h2": "Why Standard Repricing Breaks Down Above 500 Listings",
        "body": "Below 100 listings, a single flat rule — beat the lowest price by 2% — works well enough. Above 500, it doesn't, for two reasons. First, your catalog is heterogeneous: a lot of electronics might carry 8% margin while a vintage camera lot runs 35%. A single repricing posture across the whole catalog punishes your high-margin inventory. Second, listing churn accelerates: new competitors appear, old ones sell out, and buy-box positions shift faster than any weekly review cycle can track. High-volume repricing requires a hard floor on every item, with the floor calculated from each item's own cost so the repricer can chase competitors without ever crossing it.",
        "bullets": [
          "A flat %-below rule ignores cost variance across categories",
          "Weekly manual reviews miss intraday buy-box shifts",
          "Without floors, a race-to-the-bottom wipes margin on fast-moving SKUs",
          "A per-listing floor protects your best-margin listings individually"
        ]
      },
      {
        "h2": "The Floor Formula Every High-Volume Seller Should Run First",
        "body": "Before you configure a single repricing rule, calculate the hard floor for each item. The formula is: Floor = (Item Cost + Shipping Cost) / (1 − eBay Fee Rate − Minimum Margin Rate). For a practical example: cost $8.00, shipping $4.00, eBay fees 13.6% (a typical combined rate for most categories including FVF and PayPal/managed payments), minimum acceptable margin 15%. Floor = ($8 + $4) / (1 − 0.136 − 0.15) = $12 / 0.714 = $16.81. Round up to $16.85 to avoid rounding-down losses at scale. In Undercut, you set this as the hard floor on that listing. The repricer will never go below it — not even if a competitor lists at $10.00. At 1,000 listings, running this formula once per SKU (easily done in a spreadsheet export) takes less time than recovering from a week of below-cost sales.",
        "bullets": [
          "Always include actual outbound shipping cost, not an estimate",
          "Use your blended eBay fee rate — it varies by category",
          "Set minimum margin to reflect your true business overhead, not just COGS",
          "Re-run the formula when supplier costs change"
        ]
      },
      {
        "h2": "Per-Listing Floors: The Real Control Layer at Scale",
        "body": "Every listing carries its own hard floor, which is the real control layer for high-volume sellers. You set each listing's Floor Price in the dashboard, and Undercut respects that specific floor on every reprice. This matters when your catalog spans categories with very different fee structures or cost bases. A book category might carry 13% eBay fees; a collectibles category might carry 10%. A floor that's safe for your highest-fee category leaves money on the table in lower-fee categories, so calculating the right number per listing — rather than reusing one figure everywhere — is what protects margin without underpricing.",
        "bullets": [
          "Per-listing floor: set on each listing in the dashboard, never crossed by the repricer",
          "Calculate the right floor for high-cost or high-margin outliers individually",
          "Free and Starter sellers set floors one listing at a time; the same per-listing control applies on every plan",
          "Audit quarterly — supplier cost changes should trigger a floor refresh"
        ]
      },
      {
        "h2": "Repricing Cadence at Scale: When 15-Minute Cycles Matter",
        "body": "Repricing speed is only a meaningful lever in fast-moving categories. On a 1,000-listing electronics catalog where competitors sell out and relist within hours, a 15-minute repricing cycle (Undercut Pro and Scale both run on this cadence) is often sufficient — most buy-box shifts stabilize within one cycle. For categories like trading cards, sneakers, or trending media where inventory moves in minutes, the 15-minute cycle still keeps you from extended periods of being undercut, because the engine matches or beats a competitor's drop within one check rather than the next time you log in. The counterintuitive rule: responsive repricing on thin-margin, high-competition listings is where it pays most. On high-margin, low-competition listings, slower cycles cost you nothing and reduce unnecessary price changes that confuse buyers browsing your store. As your catalog grows, Scale's value is capacity (up to 10,000 listings) and priority support, not a faster cycle.",
        "bullets": [
          "15-minute cycles (Pro and Scale): keep you responsive across categories with normal-to-high competition velocity",
          "Scale: up to 10,000 listings plus priority support — capacity and support, same 15-minute cadence as Pro",
          "Unnecessary repricing churn can suppress listing visibility — don't reprice what doesn't need it",
          "Segment your catalog by velocity; apply faster cycles only where justified"
        ]
      },
      {
        "h2": "AI Aggressiveness Tuning for Large Catalogs",
        "body": "Undercut Pro and Scale include per-listing AI aggressiveness tuning, which sets how fast and how far each listing moves toward its hard floor. It does not read sell-through, stock levels, or demand — you set the aggressiveness, and the AI controls the pace and depth of the move toward the floor you already defined. For high-volume sellers, that means a listing you expect to clear can be set to move aggressively toward its floor, while a high-margin item you'd rather hold can be set to move conservatively. As a unit ages and you decide to move it, you raise its aggressiveness or lower its floor yourself — the tuning never escalates on its own, and your hard floor is never crossed.",
        "bullets": [
          "Set aggressive tuning on items you want to clear toward the floor",
          "Set conservative tuning on high-margin items you'd rather hold near market",
          "Aging listings (60+ days): raise the aggressiveness or lower the floor yourself when you decide to move them",
          "Floor is always honored — AI tuning operates above it, never below"
        ]
      }
    ],
    "faq": [
      {
        "q": "How do I set floor prices across my entire catalog?",
        "a": "Undercut imports your active listings when you connect your eBay account, then you set the Floor Price on each listing in the dashboard. The practical workflow is to calculate floors in your own spreadsheet first so you have the right number ready for each item, and to update a listing's floor in the dashboard whenever your costs change."
      },
      {
        "q": "What happens if every competitor lists below my floor?",
        "a": "Your listing stays at your floor price and will not undercut further. You won't win the buy box in that moment, but you also won't execute a loss-making sale. Undercut is designed on the assumption that a sale below floor is worse than no sale at all."
      },
      {
        "q": "How do I set safe floors when my catalog spans multiple categories with different fee rates?",
        "a": "Set each listing's floor from its own category fee rate — because floors are per-listing, a lower-fee media item can carry a lower floor than an electronics item, and each stays protected. For a fast start, floor everything using your highest-fee category's rate, then revisit the lower-fee listings to recover the margin a blanket number leaves behind."
      },
      {
        "q": "Does the Scale plan reprice faster than Pro, and does the cadence apply to all my listings?",
        "a": "No — both Pro and Scale reprice on the same 15-minute cycle, and that cycle applies across every listing on your plan. Scale's advantage is capacity (up to 10,000 listings) and priority support, not a faster cycle. Choose Scale when your catalog size exceeds Pro's 1,000-listing limit, not because you expect quicker repricing."
      },
      {
        "q": "Will AI aggressiveness tuning ever override or ignore my floor?",
        "a": "No. The hard floor is inviolable — AI aggressiveness tuning controls how aggressively Undercut positions your price relative to competitors, but all adjustments are calculated above the floor. The AI cannot instruct the repricer to cross the floor under any circumstances."
      }
    ],
    "cta": {
      "heading": "Set Your Floors. Let Undercut Handle the Rest.",
      "sub": "Start free with 25 listings — no credit card needed. Add per-item floors, go live in minutes, and scale to 10,000 listings when you're ready."
    },
    "internalLinks": [
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/multi-listing-repricing-strategy",
        "label": "Multi-Listing Repricing Strategy"
      },
      {
        "href": "/guides/ai-repricing-ebay",
        "label": "AI Repricing on eBay"
      }
    ],
    "slug": "high-volume-repricing",
    "collection": "guides",
    "template": "guide",
    "leadForm": true,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "Seasonal Product Repricing on eBay — Undercut",
    "metaDescription": "Learn seasonal product repricing on eBay — raise floors when demand peaks, hold margins off-season. Start a 14-day free trial, no card required.",
    "h1": "How to Reprice eBay Listings for Seasonal Demand Without Dumping Inventory",
    "eyebrow": "Guide",
    "intro": "Most eBay sellers treat their price floor as a fixed number. That's a mistake. Seasonal demand reshapes what buyers will pay — and what the lowest competitor will dare to list. The smart move isn't chasing the floor down in January when holiday stock oversupply hits; it's holding firm off-season and raising your floor proactively before peak season begins. This guide walks through exactly how to set, adjust, and automate seasonal floors so Undercut does the repricing without ever selling you into a loss.",
    "sections": [
      {
        "h2": "Why Seasons Move the Floor, Not Just the Price",
        "body": "Demand elasticity on eBay shifts dramatically by time of year. When 40 sellers flood the platform with Christmas ornaments in February, the race to the bottom is tempting — but it destroys margin on inventory that would sell at full price by October. Conversely, a seller who holds a firm floor in February keeps margin intact and moves units profitably once demand returns. The same logic runs in reverse for summer outdoor goods, back-to-school supplies, or Valentine's gifts: as the peak window approaches, buyers tolerate higher prices and competitors haven't yet undercut each other into the floor. Seasonal repricing is therefore a two-lever system: raise the floor before peak demand arrives, and hold — not lower — the floor as the off-season sets in.",
        "bullets": [
          "Peak season: raise your floor to capture elevated buyer willingness to pay",
          "Off-season: hold the floor steady rather than discounting perishable margin",
          "Transition windows (4–6 weeks before peak): the highest-leverage moment to adjust floors upward",
          "Oversupply periods: let competitors race to the bottom while you protect cost basis"
        ]
      },
      {
        "h2": "Building a Seasonal Floor: A Worked Example",
        "body": "Take a Halloween costume accessory: landed cost $8, average shipping $4, eBay fees approximately 13.6% of sale price, target minimum margin 15%. Working backward: floor = (cost + shipping) / (1 - fees% - margin%) = ($8 + $4) / (1 - 0.136 - 0.15) = $12 / 0.714 ≈ $16.81, rounded to $17.00 as your year-round hard floor. Now apply seasonal logic. In September and October, buyer demand is at its highest and competing listings thin out as stock sells through. You can responsibly raise that floor to $21–$23 — not as a guess, but because completed eBay sales data from the prior year shows average selling prices 25–35% above February lows for the same item. In November, oversupply hits post-Halloween clearance. Rather than dropping to $10 to 'move units,' hold $17. The unit either sells at margin or sits until next September. Dumping inventory at $10 books a confirmed loss; holding books an unrealized wait.",
        "bullets": []
      },
      {
        "h2": "Category-Specific Seasonal Patterns to Know",
        "body": "Not every category follows the same calendar. Understanding your category's demand curve is the prerequisite to setting seasonal floors intelligently.",
        "bullets": [
          "Holiday decor and gifting (Oct–Dec peak): floors should rise in September; hold firm January through August",
          "Outdoor and garden (March–May peak): begin raising floors in February; expect a sharp demand cliff in July",
          "Back-to-school supplies (July–August peak): competitors over-order and slash in September — hold the floor",
          "Collectibles and trading cards (year-round with event spikes): set floors around major release dates and conventions, not calendar months",
          "Clothing and apparel: seasonal sizing transitions create 6–8 week peak windows per season — track sell-through rate, not just price"
        ]
      },
      {
        "h2": "Automating Seasonal Floors with Undercut",
        "body": "Manually updating floors across hundreds of listings before every seasonal shift is error-prone and time-consuming. Undercut lets you set a hard floor per listing — a number the repricer will never breach regardless of what competitors do. When your peak season arrives, you raise each listing's Floor Price in the dashboard; Undercut then auto-undercuts the new lowest competitor price, but only down to your revised, higher floor, so a higher floor effectively holds your price up during peak demand. On Pro and Scale plans, the 15-minute repricing interval means that when a competitor sells through their last unit and prices spike, Undercut responds within minutes — not hours. The AI aggressiveness tuning on Pro and Scale lets you set, per listing, how fast and how far the listing moves down toward that floor, which is particularly valuable in fast-moving seasonal windows where prices can swing $5–$10 in a single afternoon.",
        "bullets": [
          "Set per-listing hard floors that survive any repricing event",
          "Raise each listing's floor before peak season so a higher floor holds your price up",
          "Pro/Scale: respond to competitor sell-throughs within the 15-minute repricing cycle",
          "AI aggressiveness tuning (Pro and Scale) controls how fast and far each listing moves toward its floor"
        ]
      },
      {
        "h2": "Common Seasonal Repricing Mistakes and How to Avoid Them",
        "body": "The most damaging mistake is treating the repricer as a race-to-the-bottom engine with no floor. Without a hard floor, automated repricing during an off-season oversupply event can drain margin to zero — or below — across hundreds of SKUs before the seller notices. The second mistake is setting floors once and forgetting them. A floor calculated on last year's COGS is wrong the moment your supplier raises prices. Build a quarterly floor review into your workflow, especially before each major seasonal transition. Third, sellers often lower floors proactively ahead of a slow season 'to stay competitive.' The data rarely supports this: conversion rates on eBay for seasonal items drop because buyer intent drops, not because prices are too high. Protecting your floor in slow periods preserves both margin and the perceived value of your listings.",
        "bullets": []
      }
    ],
    "faq": [
      {
        "q": "How far in advance should I raise my seasonal floor before peak demand hits?",
        "a": "Four to six weeks is the typical lead time. Competitor prices start rising 3–4 weeks before peak as sellers anticipate demand, and raising your floor at week 6 means Undercut is already positioned to undercut those rising competitors at a profitable price — rather than catching up after the window has partially closed."
      },
      {
        "q": "What happens if I hold my floor and don't sell through my off-season inventory?",
        "a": "Unsold inventory at margin is a storage cost problem, not a pricing problem. If your off-season floor is correctly calculated to cover cost plus fees plus a minimum margin, holding it means you either sell profitably or carry the item until the next peak. Selling below the floor books a confirmed loss; carrying the item does not."
      },
      {
        "q": "Can I set different floors for different seasons on the same SKU in Undercut?",
        "a": "Undercut stores one active floor per listing at any time, which you update in the dashboard whenever you want to change it. The practical workflow is to keep your seasonal floor calculations in your own spreadsheet and update each listing's Floor Price before a major season transition. The repricer immediately respects the new floor."
      },
      {
        "q": "My category has unpredictable spikes — a viral moment or a news event. How does seasonal floor logic apply?",
        "a": "Event-driven spikes behave like compressed seasonal peaks. The floor logic is identical: raise your floor to reflect elevated demand willingness, let Undercut undercut the new competitor landscape at that higher floor, and hold the floor as the spike subsides rather than chasing the market back down. The 15-minute repricing interval on Pro and Scale is particularly useful here, recapturing position within one cycle as competitors move."
      },
      {
        "q": "Does Undercut automatically detect seasonal patterns and adjust my floors?",
        "a": "No — and this is intentional. Floors are a seller decision because they encode your actual cost basis, which only you know. Undercut enforces whatever floor you set with precision and reprices competitively above it, but it does not move your floor autonomously. You control the floor; Undercut controls the competitive response above it."
      }
    ],
    "cta": {
      "heading": "Set Your Seasonal Floor — Undercut Handles the Rest",
      "sub": "Start a 14-day free trial and protect every listing with a hard floor that survives off-season price wars. No credit card required."
    },
    "internalLinks": [
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to Set an eBay Price Floor"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing on eBay Without Losing Margin"
      },
      {
        "href": "/guides/ai-repricing-ebay",
        "label": "AI Repricing on eBay"
      }
    ],
    "slug": "seasonal-repricing",
    "collection": "guides",
    "template": "guide",
    "leadForm": false,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "Win the eBay Buy Box Without Wrecking Margins — Undercut",
    "metaDescription": "Learn how to win the buy box on eBay by repricing to beat competitors — safely clamped to a hard floor. Start a 14-day free trial, no card required.",
    "h1": "How to Win the eBay Buy Box: Price Smart, Floor Firm",
    "eyebrow": "Guide",
    "intro": "Price is the single biggest lever in eBay's Best Match algorithm for Buy It Now listings. Undercutting the lowest competitor reliably wins more impressions and the coveted buy box position — but unclamped repricing is a trap. Sellers who race to the bottom without a hard floor can wind up selling below cost within hours of a competitor's next move. The only sustainable path is automated repricing that beats the market price and refuses to go below a floor you control, per item, before a single sale happens.",
    "sections": [
      {
        "h2": "How eBay's Best Match Algorithm Uses Price",
        "body": "eBay's Best Match ranking for Buy It Now listings weighs several factors: seller feedback score, shipping speed, return policy, and — critically — price competitiveness. eBay does not publish exact weights, but its own seller guidance confirms that listings priced closer to the lowest available are more likely to surface at the top of search results and win the buy box when multiple sellers offer the same or similar item. In practice, even a $0.50 gap below a competitor can shift visibility. The implication is direct: if you are not actively tracking and responding to competitor price changes, you are ceding buy box time to whoever repriced last.",
        "bullets": [
          "Best Match is not purely price — but price is the lever you can adjust fastest.",
          "Buy box eligibility requires a seller to meet minimum feedback and policy thresholds first.",
          "Once eligible, the lowest-priced seller with fast shipping wins the buy box the majority of the time.",
          "eBay reprices the buy box assignment in near real-time — static pricing loses ground continuously."
        ]
      },
      {
        "h2": "Why Unclamped Repricing Is Dangerous",
        "body": "Most repricing tools simply find the lowest competitor price and match or beat it by a fixed amount. That works until a competitor misprices an item, drops to $0.01, or a bot sets off a price war. Without a floor, your repricer follows all the way down. A seller in the electronics category who sets a $0.01 undercut rule with no floor on a $45 USB hub can wake up to 200 units sold at $3.12 — the price two bots ratcheted down to overnight. The floor is not an optional feature. It is the mechanism that makes automated repricing safe to leave running.",
        "bullets": [
          "Price wars between automated tools can bottom out in minutes, not hours.",
          "eBay does not reverse transactions because your repricer malfunctioned.",
          "A floor set per listing ensures every sale clears your minimum acceptable margin."
        ]
      },
      {
        "h2": "How to Calculate a Hard Floor for Any Listing",
        "body": "Your floor is the lowest price at which selling the item still makes financial sense. The standard formula accounts for four inputs: landed cost, shipping cost, eBay fee percentage, and your minimum acceptable margin. Here is a worked example for a mid-range kitchen gadget sold in the Home & Garden category:\n\nCost of goods: $8.00\nOutbound shipping: $4.00\neBay final value fee (13.6% of sale price including shipping): variable\nMinimum margin: 15%\n\nTo solve for floor price F where profit margin is at least 15%:\nF = (cost + shipping) / (1 − fee% − margin%)\nF = ($8.00 + $4.00) / (1 − 0.136 − 0.15)\nF = $12.00 / 0.714\nF ≈ $16.81\n\nRound up to $17.00 or $17.14 to add a small buffer. That number goes into Undercut as the hard floor for that listing. The repricer will beat any competitor above $17.14 — and refuse to move below it under any circumstance.",
        "bullets": [
          "Always include eBay's final value fee in the floor calculation — it applies to the full amount including shipping.",
          "Factor in PayPal or managed payments processing if applicable.",
          "Recalculate floors when your supplier costs change, not just when competitors move."
        ]
      },
      {
        "h2": "Repricing Cadence: How Often Matters",
        "body": "The buy box is reassigned continuously. A repricer that checks prices once per day is functionally useless for competitive categories. On Undercut's Pro and Scale plans, listings reprice every 15 minutes. For high-velocity categories like consumer electronics, media, or health products where dozens of sellers compete on the same GTIN, 15-minute repricing means you recapture the buy box price within one cycle of any competitor move. For lower-competition niches — vintage items, handmade, or single-SKU listings — even hourly repricing is often sufficient, making the Free or Starter plan adequate. Match your repricing cadence to the actual competition density in your category.",
        "bullets": [
          "Electronics and media: 15-minute repricing makes a measurable difference in buy box share.",
          "Clothing, collectibles, vintage: hourly or daily repricing is usually sufficient.",
          "Check your eBay seller dashboard for buy box percentage — that is the metric repricing speed affects most directly."
        ]
      },
      {
        "h2": "Setting Up Floor-Protected Repricing in Undercut",
        "body": "Undercut connects to your eBay account via the standard eBay API. During onboarding, you import your active listings. For each listing, you set a floor price in the dashboard. Once floors are set, you choose your undercut amount: beat the lowest competitor by a fixed amount (e.g. $0.10) or by a percentage (e.g. 1%). From that point forward, Undercut monitors competitor prices and adjusts your listing price downward to stay at the buy box position, stopping the moment the next move would breach your floor. On the Pro and Scale plans, AI aggressiveness tuning lets you set, per listing, how close to the floor you are willing to operate — useful for margin-sensitive SKUs where you would rather lose the buy box than compress profit further.",
        "bullets": [
          "Free plan covers up to 25 listings — enough to validate the approach on your best sellers before scaling.",
          "Set the floor on each listing in the dashboard, calculating it from that item's own cost.",
          "AI aggressiveness tuning (Pro and Scale) controls how fast and how far each listing moves toward its floor — it never crosses or changes the floor you set."
        ]
      }
    ],
    "faq": [
      {
        "q": "Does winning the buy box always require having the lowest price on eBay?",
        "a": "Not always the absolute lowest on eBay as a whole, but you generally need to be the lowest among eligible sellers for that specific listing format. A seller with excellent feedback and fast handling can sometimes hold the buy box at a slightly higher price than a low-feedback competitor, but the gap is small — typically under 3-5%. Price remains the primary variable you can move quickly."
      },
      {
        "q": "What happens if I set a floor and a competitor prices below it?",
        "a": "Undercut holds your listing at your floor price and does not follow the competitor below it. You will lose the buy box for that period. That is the correct outcome — selling below your floor means selling at a loss or at an unacceptable margin. When the competitor raises their price or sells out, Undercut automatically recaptures the buy box."
      },
      {
        "q": "How do I know if my floor is set correctly?",
        "a": "Run the floor formula: (cost + shipping) / (1 − eBay fee% − minimum margin%). For most categories, eBay's final value fee is 13.6% on the total including shipping. Add your minimum acceptable margin — 15% is a common baseline. If you are consistently losing the buy box to a competitor who is pricing below your floor, that competitor is likely selling at a loss or has lower costs than you; following them down is not a viable strategy."
      },
      {
        "q": "Is automated repricing against eBay's rules?",
        "a": "No. eBay explicitly supports third-party repricing tools through its official API. Undercut uses the eBay API to update listing prices programmatically, which is a standard, permitted seller activity. eBay's policies restrict certain listing manipulation tactics, but price updates via the API are not among them."
      },
      {
        "q": "How many listings do I need before automated repricing pays for itself?",
        "a": "It depends on your margins and competition density, but most sellers find that even 10-15 competitive listings benefit from automated repricing. If even one listing wins the buy box an additional 20% of the time due to faster repricing, and that listing moves $500/month in GMV, the incremental revenue typically exceeds the Starter plan cost. Use the 14-day free trial to measure buy box percentage before and after enabling repricing on your top listings."
      }
    ],
    "cta": {
      "heading": "Set Your Floor. Win the Box. Keep the Margin.",
      "sub": "Start repricing up to 25 listings free — 14-day trial, no credit card. Your floor is locked in before your first sale."
    },
    "internalLinks": [
      {
        "href": "/glossary/what-is-the-ebay-buy-box",
        "label": "What Is the eBay Buy Box?"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/ebay-pricing-strategy",
        "label": "eBay Pricing Strategy Guide"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "Setting an eBay Price Floor"
      }
    ],
    "slug": "win-the-buy-box",
    "collection": "guides",
    "template": "guide",
    "leadForm": false,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "Never Sell Below Cost on eBay — Undercut",
    "metaDescription": "Learn how to avoid selling below cost on eBay with the exact floor formula (cost + fees + margin). Start a 14-day free trial — no card required.",
    "h1": "The Exact Formula to Set an eBay Price Floor That Protects Every Sale",
    "eyebrow": "Guide",
    "intro": "Most eBay sellers who lose money on a sale set a floor too late — after a repricer already chased a competitor into the red. The fix is not slowing down your repricer; it is doing the floor math before you automate anything. This guide gives you the exact formula: cost + fulfillment + eBay fees + minimum margin = hard floor. Once that number lives in your repricer, no algorithm, no competitor spiral, and no flash sale can force a loss. We'll walk through a real worked example so you can replicate it for every SKU in your catalog.",
    "sections": [
      {
        "h2": "Why Sellers Keep Losing Money Even With a Repricer Running",
        "body": "Automated repricing is designed to win sales by undercutting competitors. The problem is that \"winning\" is only profitable if there is a floor below which the tool refuses to go. Most sellers skip this step or set a floor based on gut feel — a round number that does not account for eBay's variable fee structure or the cost of the label. The repricer then does exactly what it is supposed to do: it beats the lowest price. When that lowest price is already below your break-even point, you are paying to ship something for free or worse.",
        "bullets": [
          "Forgetting that eBay's final value fee applies to the total amount including shipping",
          "Setting a floor equal to landed cost with no margin buffer",
          "Using a single flat floor across all categories despite different fee rates",
          "Not updating floors after supplier price changes or postage increases"
        ]
      },
      {
        "h2": "The Floor Formula: Cost + Fees + Minimum Margin",
        "body": "The correct floor is not your cost. It is the minimum price at which the transaction leaves you with acceptable profit after every deduction. Use this formula: Floor = (Landed Cost + Fulfillment Cost) / (1 - eBay Fee Rate - Target Margin Rate). Breaking that down: Landed Cost is what you paid per unit including inbound shipping and any prep. Fulfillment Cost is the outbound postage or FBA-equivalent fee. eBay Fee Rate is your final value fee percentage for that category — typically 13.6% for most categories, lower for some like heavy equipment. Target Margin Rate is the minimum net margin you will accept, expressed as a decimal.\n\nWorked example — a phone case: You source it for $8.00. Outbound shipping via USPS First Class costs $4.00. eBay final value fee for cell phone accessories is 13.6%. You want at least a 15% net margin.\n\nFloor = ($8.00 + $4.00) / (1 - 0.136 - 0.15) = $12.00 / 0.714 = $16.81\n\nYou would set your hard floor at $16.81. At that price, after eBay takes $2.29 and shipping costs $4.00, you net $2.52 — exactly 15% of $16.81. Any automated repricer that hits this floor stops. It does not go lower, no matter what a competitor lists at.",
        "bullets": [
          "Landed cost: $8.00",
          "Outbound fulfillment: $4.00",
          "eBay final value fee (13.6%): $2.29",
          "Net at floor price of $16.81: $2.52 (15% margin)",
          "Hard floor entered in repricer: $16.81"
        ]
      },
      {
        "h2": "Category-Specific Fee Rates That Change Your Floor",
        "body": "eBay's fee structure is not flat. Using the wrong rate when calculating your floor means the number you enter is wrong before any sale happens. Check your specific category in eBay's fee schedule and use that rate, not a generic 13.6%. A few reference points as of mid-2025: Books, DVDs, and Music run 14.95% up to $7,500. Clothing, Shoes, and Accessories run 15% on most items under $2,000. Collectibles sit at 13.6%. Heavy machinery and industrial equipment can be as low as 2-3%. If you sell across multiple categories, you need a separate floor calculation for each one — a single blended rate will leave some SKUs underprotected.",
        "bullets": [
          "Books, DVDs, Music: 14.95% (use ~15% in your formula)",
          "Clothing and Accessories: 15%",
          "Most general merchandise: 13.6%",
          "Heavy equipment and industrial: 2-9% depending on subcategory",
          "Always verify against eBay's current fee page before setting floors"
        ]
      },
      {
        "h2": "How Undercut Enforces Your Floor on Every Reprice Cycle",
        "body": "Once you calculate a floor using the formula above, you enter it as the Hard Floor for that listing in Undercut. From that point, every reprice cycle — running every 15 minutes on both Pro and Scale — checks the competitor's current lowest price, calculates a target undercut, and then applies one rule before writing a new price: if the result is below your floor, the listing price is held at the floor instead. It does not reprice down. It does not match a competitor who is selling at a loss. It holds and waits for the market to recover.\n\nThis means you can run an aggressive repricing strategy — AI aggressiveness tuning on Pro and Scale — without the anxiety that aggression itself will cause a loss. The floor is not a suggestion; it is a hard constraint the algorithm cannot override.",
        "bullets": [
          "Free plan: set floors on up to 25 listings, hourly repricing",
          "Starter ($29/mo): 100 listings with floor protection on every cycle",
          "Pro ($79/mo): 1,000 listings, AI aggressiveness tuning, 15-minute cycles",
          "Scale ($199/mo): 10,000 listings, 15-minute cycles, priority support, full floor enforcement"
        ]
      },
      {
        "h2": "Keeping Floors Current: When to Recalculate",
        "body": "A floor set in January may be wrong by March. Supplier invoices change, USPS postage rates update, and eBay occasionally adjusts its fee schedule. If any input to the formula changes, the floor is stale. The practical habit is to recalculate floors whenever you receive a new supplier invoice, after any eBay fee announcement, and once per quarter as a standard review. For high-volume sellers with hundreds of SKUs, the most efficient approach is to maintain a spreadsheet with the formula per category, recalculate floors there, and then update each listing's Floor Price in the dashboard. Keeping the math in your spreadsheet makes a quarterly floor refresh quick — you already have every new number ready to enter."
      }
    ],
    "faq": [
      {
        "q": "Does my floor need to include eBay's listing fee or just the final value fee?",
        "a": "For most sellers, listings are free (eBay includes a monthly allotment of zero-insertion-fee listings). Your floor calculation should focus on the final value fee, which applies to every completed sale and is the meaningful per-transaction cost. If you are in a category or volume tier where insertion fees apply, add that cost to your landed cost input in the formula."
      },
      {
        "q": "What if a competitor lists below my floor and my listing stops selling entirely?",
        "a": "That is the correct behavior. If a competitor is selling below your calculated break-even, matching them means paying to fulfill orders. Your floor holds your price at the minimum profitable point. In some cases, a competitor is liquidating inventory or has a lower cost basis — neither situation justifies you selling at a loss. If the market stays depressed for an extended period, the right move is to review your supplier cost, not lower your floor."
      },
      {
        "q": "How do I handle free shipping offers — does that change the floor math?",
        "a": "Yes. If you offer free shipping, the outbound fulfillment cost must still appear in your floor formula — it just moves from a line-item on the buyer's receipt to a cost you absorb. Use the same formula but treat your fulfillment cost as part of your landed cost input. The result will be a higher floor price than a listing where shipping is charged separately, which is accurate: free shipping listings need to price in that cost or they lose money."
      },
      {
        "q": "Can I set one floor for an entire category instead of per SKU?",
        "a": "You can, but it introduces risk. A category-level floor is only safe if every item in that category has the same or lower landed cost and fulfillment cost as your most expensive SKU. In practice, items in the same category often have a wide cost spread. A per-SKU floor is more work to set up initially but is the only approach that reliably protects each listing. Undercut's per-listing Floor Price field makes per-SKU floor management practical even at high volume."
      },
      {
        "q": "What margin percentage should I use as my minimum in the floor formula?",
        "a": "That depends on your business model. Most resellers targeting sustainable eBay income use 15-25% net margin as a floor minimum. If your business relies on high volume and thin margins, you might accept 10%. If you are selling unique or collectible items with low competition, 30%+ is reasonable. The key is that the number reflects an actual business decision, not an arbitrary guess — factor in the time you spend sourcing, listing, and handling returns when deciding what net margin is worth your effort."
      }
    ],
    "cta": {
      "heading": "Set Your Floor Once. Let Undercut Hold It on Every Reprice.",
      "sub": "Start a 14-day free trial — no credit card required. Add your floor per listing, connect your eBay account, and let Undercut beat competitors without ever dropping below your break-even."
    },
    "internalLinks": [
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/ebay-seller-fees-explained",
        "label": "eBay Seller Fees Explained"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/manual-vs-automated-repricing",
        "label": "Manual vs. Automated Repricing"
      },
      {
        "href": "/ebay-profit-calculator",
        "label": "eBay Profit Calculator"
      }
    ],
    "slug": "avoid-selling-below-cost",
    "collection": "guides",
    "template": "guide",
    "leadForm": true,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "Manual vs Automated eBay Repricing — Undercut",
    "metaDescription": "Manual vs automated repricing on eBay: see the real ROI in hours and sales, and how a hard floor eliminates the risk. Start a 14-day free trial — no card needed.",
    "h1": "Manual vs Automated Repricing on eBay: The Real ROI (and Why the Floor Changes Everything)",
    "eyebrow": "Guide",
    "intro": "The case for automating eBay repricing is usually framed around speed. But speed is only half the story. The deeper ROI is in two places most sellers never quantify: the hours you stop spending watching prices, and the sales you win in the windows when you were asleep or away. The reason sellers have historically resisted automation is fear — fear of a runaway price drop. A hard floor per listing removes that fear entirely, which means the only real argument left for manual repricing is that you have fewer than 25 listings and truly enjoy spreadsheets.",
    "sections": [
      {
        "h2": "What Manual Repricing Actually Costs You",
        "body": "Manual repricing is not free. If you manage 100 active listings and check competitor prices twice a day, a conservative estimate is 3-4 minutes per listing session — that is 5 to 7 hours a week spent on price surveillance alone. At a modest $25/hr opportunity cost, you are spending $125 to $175 per week on a task that produces no creative value and that a machine can do in seconds.",
        "bullets": [
          "You only see prices at the moment you check — competitors move in between",
          "You are most vulnerable overnight and on weekends, when buy-box churn peaks",
          "Manual errors (wrong decimal, copy-paste) can price items below cost with no safeguard",
          "Scaling from 100 to 500 listings multiplies the problem linearly"
        ]
      },
      {
        "h2": "What Automated Repricing Actually Wins You",
        "body": "An automated repricer does not just save time — it captures sales that would otherwise go to a competitor who undercut you by $0.50 while you were offline. eBay's buy box and Best Match algorithm favor competitive pricing, and the window to win a sale can be as short as 15 minutes after a competitor's price changes. Pro and Scale plan subscribers on Undercut both reprice every 15 minutes, meaning a competitor price drop is matched or beaten within one cycle rather than the next time you log in. In electronics — a category where median listing lifespans are under 48 hours and price volatility is high — missing even two repricing windows in a day can mean losing the sale entirely to a same-condition competitor who was $1.20 cheaper at the moment a buyer searched.",
        "bullets": [
          "15-minute repricing (Pro and Scale): beat a competitor drop before most buyers even refresh their search",
          "Scale adds capacity (10,000 listings) and priority support: critical for high-volume sellers in fast-moving categories like consumer electronics and media",
          "AI aggressiveness tuning (Pro+): set how hard Undercut chases the lowest price based on your margin tolerance"
        ]
      },
      {
        "h2": "The Floor Calculation: Why Automation Is Now Risk-Free",
        "body": "The only credible objection to automated repricing is the race-to-zero risk — the fear that the software will keep cutting price until you sell at a loss. A hard floor per listing makes this structurally impossible. Here is a worked example for a used textbook sold via standard shipping:\n\nItem cost: $8.00\nShipping cost: $4.00\neBay final value fee (13.6% of $20 sale): $2.72\nPayPal/managed payments processing (~2.9% + $0.30): $0.88\nMinimum target margin: 15% of sale price\n\nFloor = (cost + shipping + fees) / (1 - margin %) = ($8 + $4 + ~$3.60) / (1 - 0.15) ≈ $18.36\n\nSet your floor at $18.36. Undercut will chase every competitor down to that number and stop. It will never sell below it. If all competitors drop below your floor, Undercut holds at your floor rather than matching — you simply do not win that sale, which is exactly the right outcome. You keep margin integrity without lifting a finger.",
        "bullets": [
          "Set the floor once per listing — Undercut enforces it on every reprice cycle",
          "Update a listing's floor in the dashboard if your supplier costs change",
          "The floor also protects against competitors using loss-leader tactics to force rivals below cost"
        ]
      },
      {
        "h2": "When Manual Repricing Still Makes Sense",
        "body": "Manual repricing is defensible in a narrow set of circumstances: fewer than 25 listings with low price volatility (vintage, antiques, one-of-a-kind items where you are the only comparable seller), or categories where you deliberately price above market because your listing quality — photos, description, seller feedback — justifies a premium. If either of those describes you, Undercut's free plan covers 25 listings at no cost and no card required. You can automate the occasional commodity item and keep manual control on the differentiated pieces. The point is that automation and manual are not mutually exclusive — floors give you the control to use both in the same account."
      },
      {
        "h2": "How to Transition From Manual to Automated Without Losing Control",
        "body": "The transition is lower-risk than most sellers expect. The recommended approach: start with your 25 highest-volume commodity listings — items with multiple identical competitors where you are purely competing on price. Set conservative floors (use the formula above, or Undercut's built-in floor calculator). Run automated repricing on those listings for one week while keeping your remaining listings manual. Review the repricing log: you will see exactly which competitor moves triggered a reprice, what price was set, and whether the floor was hit. After a week, most sellers find their floor was never reached on commodity items and expand automation to additional listings. Undercut's free 14-day trial gives you enough time to run this experiment with zero financial commitment.",
        "bullets": [
          "Start with your most price-competitive, lowest-margin listings",
          "Set floors before enabling automation — never the other way around",
          "Review the repricing log daily for the first week",
          "Expand automation by category once you trust the floor logic"
        ]
      }
    ],
    "faq": [
      {
        "q": "If I automate repricing, will Undercut keep lowering my price even if every competitor is selling below my cost?",
        "a": "No. Undercut will lower your price to match the lowest competitor only down to the floor you set. If competitors drop below your floor, Undercut holds at your floor and stops. You will not win those sales, but you will not lose money on them either. The floor is a hard constraint, not a suggestion."
      },
      {
        "q": "How much time does automated repricing realistically save for a 200-listing eBay store?",
        "a": "Most sellers with 200 listings report spending 8 to 12 hours per week on manual price monitoring before switching. With automated repricing that drops to roughly 30 minutes per week reviewing logs and updating floors when costs change — a time saving of 90% or more. That time can go toward sourcing, photography, or listing new inventory."
      },
      {
        "q": "Does repricing frequency actually matter, or is once a day enough?",
        "a": "It depends on your category. For slow-moving niches like antiques or handmade items, daily repricing is often sufficient. For electronics, media, or any category with multiple competitors and high search volume, a price change by a competitor at 2am can cost you the next 50 sales before you wake up. Undercut's Pro and Scale plans both reprice every 15 minutes — that 15-minute cadence matters most in high-velocity categories, recapturing position within one cycle of any competitor move."
      },
      {
        "q": "Can I use automated repricing for only some of my listings and keep others manual?",
        "a": "Yes. Automation is per-listing in Undercut — you enable it on the listings where you want it and leave others untouched. A common pattern is to automate commodity items with clear competitors and keep unique or collectible items on manual pricing where your listing quality justifies a premium over comps."
      },
      {
        "q": "What happens to my floor if my supplier raises costs mid-month?",
        "a": "You update the floor yourself in the dashboard. Undercut does not automatically recalculate floors when your costs change — you own that number because you own the cost data. The workflow is: update your cost sheet, recalculate the new floor, and enter it on the listing in Undercut. Until you update it, the old floor remains in effect, which is a safe default — it will not let the price drop below the old floor while you catch up."
      }
    ],
    "cta": {
      "heading": "Set your floor. Let Undercut do the rest.",
      "sub": "Start your 14-day free trial — 25 listings included, no credit card required. See exactly how many reprice events fire in your first week and what each one wins you."
    },
    "internalLinks": [
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/ebay-pricing-strategy",
        "label": "eBay Pricing Strategy Guide"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/ai-repricing-ebay",
        "label": "AI Repricing on eBay: How It Works"
      }
    ],
    "slug": "manual-vs-automated-repricing",
    "collection": "guides",
    "template": "guide",
    "leadForm": false,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "eBay Pricing Strategy for Competitive Markets — Undercut",
    "metaDescription": "Learn when to undercut vs. hold price on eBay — and how setting a hard floor lets you compete aggressively without eroding margin. 14-day trial, no card needed.",
    "h1": "When to Undercut, When to Hold: A Floor-First eBay Pricing Strategy",
    "eyebrow": "Guide",
    "intro": "Most eBay sellers treat pricing as a binary: go low to win, or hold firm and wait. Neither works alone in a competitive market. The real strategy is knowing which items reward aggressive undercutting and which reward patience — and then protecting every decision with a hard floor so that competing on price never crosses into selling at a loss. This guide gives you a practical framework for both choices, with the math to back each one.",
    "sections": [
      {
        "h2": "The Core Decision: Undercut or Hold Premium?",
        "body": "Not every listing benefits from being the cheapest. The right move depends on demand velocity, your cost basis, and how many identical or near-identical competitors you face. Two questions cut through most of the noise:",
        "bullets": [
          "How fungible is the item? Commodities (common media, mass-produced electronics accessories, standard apparel sizes) are price-sensitive; buyers sort by price and rarely read the description. Undercut.",
          "How differentiated is your listing? Strong photos, detailed condition notes, fast-handling reputation, or rare variant details give buyers a reason to pay a small premium. Hold.",
          "How many active competitors are there? Three or fewer identical listings means price discipline works. Ten or more means you either undercut to stay visible or exit the category."
        ]
      },
      {
        "h2": "Setting a Hard Floor: The Math That Protects Your Margin",
        "body": "A floor is the minimum price at which selling the item is still worth your time. Building it from first principles prevents the instinct to 'just drop it a bit more' from compounding into a loss. Here is a worked example for a used textbook:\n\nCost of goods: $8.00\nShipping supplies + postage: $4.00\neBay final value fee (13.6% of total): applied to $16.81 sale = $2.29\nPayPal/payments processing (already included in eBay fee structure post-2023)\nMinimum acceptable margin: 15% of sale price\n\nSolving: Floor = (COGS + shipping) / (1 − fee rate − margin rate) = $12.00 / (1 − 0.136 − 0.15) = $12.00 / 0.714 ≈ $16.81\n\nRound up to $17.00 and that is your floor. Undercut enters automatically above that number; it stops the moment reaching the next lower price would breach it. No guesswork, no midnight panic.",
        "bullets": []
      },
      {
        "h2": "When Aggressive Undercutting Is the Right Call",
        "body": "Undercutting earns its keep in specific conditions. Understanding them stops you from applying it indiscriminately and racing to zero.",
        "bullets": [
          "High-velocity commodity categories: common video game accessories, phone cases, standard USB cables. Buyers sort by price; being second cheapest costs you the sale.",
          "End-of-season or slow-moving inventory: carrying cost and storage risk outweigh the margin difference. A 5% haircut that moves the item this week beats holding for six months.",
          "New seller building feedback: a slightly lower price accelerates early transactions. Once you have 50–100 positive feedbacks, re-evaluate and tighten the floor.",
          "Multi-listing stacks where you hold quantity: a small per-unit margin reduction multiplied across 200 units still beats one sale a month at full price."
        ]
      },
      {
        "h2": "When to Hold — and How Long",
        "body": "Holding premium is not stubbornness; it is demand testing. eBay's search surfaces listings to buyers who are actively ready to purchase, which means an unsold listing at full price is still generating impressions. Use these signals to decide when to drop vs. when to wait:\n\nIf your listing has had more than 30 views and zero watchers in 14 days, the price is above market. Drop to floor plus 10% and test again.\n\nIf you have 5+ watchers but no sales, you are in buyer consideration — often a small drop (3–5%) triggers the purchase. Do not slash; nudge.\n\nIf a competitor sells out at their price, raise yours before relisting. Scarcity shifts the market temporarily and sellers who hold capture the spike.\n\nCollectibles, vintage items, and anything with subjective value (art, memorabilia, rare variants) almost always reward patience over undercutting. A floor here prevents panic-selling a $120 item for $40 during a slow week.",
        "bullets": []
      },
      {
        "h2": "Automating the Strategy Without Losing Control",
        "body": "A manual pricing strategy works for 10 listings. It does not work for 200. Automation should enforce your framework, not replace your judgment. That means two non-negotiable controls:\n\nFirst, the floor is inviolable. Every automated repricer decision runs through the floor check before executing. If beating the competitor requires breaching the floor, the repricer holds — and you get visibility into which listings are stuck so you can decide to relist, bundle, or liquidate through a different channel.\n\nSecond, repricing speed should match category volatility. Electronics and phone accessories can move significantly in hours; book prices are stable for days. Undercut's Pro plan reprices every 15 minutes and lets you tune aggressiveness on each listing, so fast-moving items stay competitive without over-firing on stable ones. The Scale plan runs on the same 15-minute cycle and adds capacity (up to 10,000 listings) plus priority support for highest-volume sellers.",
        "bullets": [
          "Set the floor on each listing from that item's own cost — consistent math across similar items keeps your floors accurate.",
          "Review floor accuracy quarterly as eBay fee structures, shipping costs, and COGS change.",
          "Use AI aggressiveness tuning (Pro and Scale) to move conservatively toward the floor on high-margin items and aggressively on commodity inventory."
        ]
      }
    ],
    "faq": [
      {
        "q": "How do I know if my floor is set correctly?",
        "a": "Run the floor formula: (COGS + fulfillment cost) divided by (1 minus your fee rate minus your minimum margin percentage). If your repricer is holding on nearly every listing because competitors are below your floor, the problem is usually COGS — you are buying too high to compete in that category, not a floor calculation error."
      },
      {
        "q": "Is undercutting by $0.01 actually effective on eBay?",
        "a": "It depends on how buyers sort. In Best Match, a $0.01 undercut has almost no effect because eBay weights seller reputation, shipping speed, and listing quality alongside price. In price-sorted search, it wins the top slot. For commodity categories where buyers explicitly sort by price plus shipping, even a $0.01 gap matters. For differentiated or collectible items, it is largely irrelevant."
      },
      {
        "q": "What happens when a competitor drops below my floor?",
        "a": "Your repricer stops adjusting and holds at the floor. You do not lose money; you lose the sale. That is the correct tradeoff. The next step is to evaluate whether the listing is viable at all: can you reduce COGS, cut packaging cost, or shift to a faster shipping method that lets you lower the floor and remain competitive? If not, that SKU may need to exit the catalog."
      },
      {
        "q": "Should I use the same pricing strategy across all my eBay categories?",
        "a": "No. Electronics accessories, books, collectibles, and clothing each have different demand curves, fee rates, and buyer behavior. A floor-and-undercut approach suits high-volume commodities; a hold-and-watch approach suits collectibles and vintage. Ideally, you set each listing's floor from its own cost and, on Pro and Scale, tune each listing's aggressiveness to match its category rather than applying one blanket setting."
      },
      {
        "q": "Can I use a pricing strategy to win the eBay Buy Box on fixed-price listings?",
        "a": "eBay's Best Match for fixed-price listings is influenced by price competitiveness, but it is not a pure Buy Box auction the way Amazon operates. Being the lowest qualified seller (meeting eBay's service metrics) in a multi-seller listing improves your placement, but price alone does not guarantee the top slot. Your seller rating, handling time, and return policy also factor in, which is why undercutting to the floor is often more effective than undercutting to zero."
      }
    ],
    "cta": {
      "heading": "Set Your Floor. Let Undercut Do the Rest.",
      "sub": "Start a 14-day free trial — no credit card required. Add up to 25 listings, set your hard floors, and watch Undercut compete without touching your margin."
    },
    "internalLinks": [
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/manual-vs-automated-repricing",
        "label": "Manual vs. Automated Repricing"
      },
      {
        "href": "/guides/ai-repricing-ebay",
        "label": "AI Repricing on eBay"
      }
    ],
    "slug": "ebay-pricing-strategy",
    "collection": "guides",
    "template": "guide",
    "leadForm": false,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "Repricing Without Losing Margin — Undercut",
    "metaDescription": "Learn how repricing without losing margin works using hard price floors. Start Undercut's 14-day free trial — no credit card required — and stop the race to the.",
    "h1": "How to Reprice Without Losing Margin (And Why Most Sellers Are Wrong About the Race to the Bottom)",
    "eyebrow": "Guide",
    "intro": "Conventional wisdom says that automated repricing triggers a death spiral — everyone keeps undercutting until profit disappears. The data says otherwise. When repricing is governed by a hard floor, roughly half of all repricing events move prices upward, not down. The race to the bottom is not a law of markets; it is an artifact of floorless tools. This guide explains exactly how price floors work, how to calculate one that protects real margin, and how Undercut enforces it automatically on every listing.",
    "sections": [
      {
        "h2": "Why the Race to the Bottom Is a Myth — Not a Market Law",
        "body": "The term \"race to the bottom\" describes a feedback loop: seller A drops to $19.99, seller B drops to $19.89, seller C drops to $19.79, and so on until everyone is selling at cost. This loop is real — but only when no participant has a floor. The moment even one seller holds a floor, the loop stops at that price. When most sellers in a category have floors (even informally), the price distribution stabilises well above cost. Internal repricing data from floor-governed accounts consistently shows that close to half of all repricing events are upward adjustments. When a competitor sells out, raises their price, or leaves the listing entirely, Undercut moves your price back up toward your ceiling automatically. Without a floor, you only see downward moves. With a floor, you capture upward moves too.",
        "bullets": [
          "A repricing event is any automated price change — up or down",
          "Upward reprices recover margin you'd otherwise leave on the table",
          "Sellers without floors drag a category down; sellers with floors anchor it",
          "The floor doesn't prevent you from winning — it prevents you from winning unprofitably"
        ]
      },
      {
        "h2": "How to Calculate a Hard Price Floor That Reflects Real Costs",
        "body": "A floor is only protective if it accounts for every cost layer. Most sellers undercount because they forget that eBay fees apply to the total buyer payment including shipping. Here is a worked example for a common resale item:\n\nCost of goods: $8.00\nShipping cost: $4.00\neBay final value fee (13.6% of item + shipping): $1.59\nPayPal/managed payments processing: included in eBay fee for most sellers\nTarget minimum net margin: 15% of sale price\n\nFloor calculation: (Cost + Shipping + Fixed fees) / (1 - Fee% - Margin%) = ($8 + $4) / (1 - 0.136 - 0.15) = $12 / 0.714 = approximately $16.81. Round up to $17.00 for a clean floor.\n\nAt $17.00, after fees and shipping, you net just above your 15% minimum. Every cent above $17.00 is incremental margin. Every repricing event Undercut makes will stay at or above this number — it is enforced at the rule level, not just as a soft guideline.",
        "bullets": [
          "Include category-specific fee rates — some categories carry 15% final value fees",
          "Factor storage or FBA-equivalent costs if you use a 3PL",
          "Refresh floors when supplier costs or shipping rates change",
          "Use Undercut's per-listing floor field so each SKU carries its own protection"
        ]
      },
      {
        "h2": "How Undercut Enforces Floors Without Slowing Down Repricing",
        "body": "Undercut checks the lowest qualified competitor price on a schedule (every 15 minutes on both Pro and Scale) and sets your price to beat it — subject to two hard limits: your ceiling and your floor. The floor is not a preference or a warning; the repricing engine will not write a price below it regardless of what competitors do. If the lowest competitor drops below your floor, your price stays at your floor. You do not follow them down. You also do not have to monitor the situation manually.\n\nThis matters most in volatile categories like consumer electronics and seasonal goods, where a single liquidating competitor can temporarily crater the visible price on a listing. Without a floor, your tool follows them into unprofitable territory. With Undercut, you hold position and wait for that seller to sell through their stock — then Undercut moves your price back up when the competitive floor rises again.",
        "bullets": [
          "Free plan: up to 25 listings, floor enforced on every one",
          "Starter ($29/mo): 100 listings, hourly repricing",
          "Pro ($79/mo): 1,000 listings, 15-minute repricing, AI aggressiveness tuning",
          "Scale ($199/mo): 10,000 listings, 15-minute repricing, priority support"
        ]
      },
      {
        "h2": "Category-Specific Floor Strategies",
        "body": "The right floor strategy varies by what you sell. Electronics resellers face thin margins and fast price swings — floors should be recalculated every time a supplier invoice changes, and aggressiveness should be tuned conservatively (the Pro and Scale plans' AI tuning helps here). Clothing and shoes sellers deal with size-level inventory, meaning a floor set at the category level can be wrong for a specific SKU that has higher return rates; set floors at the variant level when possible. Book sellers often have predictable cost structures ($0 for remainders, fixed for used grades) and benefit from tight floors set close to cost plus a small buffer. Collectibles and vintage sellers should set floors based on their acquisition price plus a meaningful margin premium — these categories have inelastic demand and frequent upward price moves when comparable items sell. In all cases, the floor is a per-listing input in Undercut, not a global override, so each category can carry its own logic.",
        "bullets": [
          "Electronics: recalculate floors on every restock; use conservative aggressiveness",
          "Clothing: set floors at the variant (size/color) level, not just the parent listing",
          "Books: grade-adjusted floors — a Fine copy has a higher floor than a Good copy",
          "Collectibles: floor should reflect scarcity premium, not just replacement cost"
        ]
      },
      {
        "h2": "Common Mistakes That Turn Repricing Into a Margin Problem",
        "body": "Most repricing margin problems come from one of four errors. First, setting no floor at all — the tool has nothing to anchor to and follows competitors indefinitely. Second, setting a floor based on sale price alone without subtracting fees and shipping, which makes the floor an illusion. Third, setting a single global floor for an entire account when individual SKUs have different cost structures. Fourth, forgetting to update floors when costs change — a floor set six months ago may now be below actual cost if supplier prices or postage rates have risen. Undercut lets you update a listing's Floor Price in the dashboard the moment a cost changes, so a supplier increase is reflected on the affected SKUs before the next reprice cycle runs.",
        "bullets": [
          "No floor: the single most common cause of margin loss from repricing",
          "Fee-blind floor: a $10 floor with 13.6% fees means you net under $8.64 before shipping",
          "Stale floor: supplier price increases require floor updates — calendar a quarterly review",
          "Global floor: one number across all SKUs will be wrong for most of them"
        ]
      }
    ],
    "faq": [
      {
        "q": "What happens if a competitor drops below my floor — does Undercut follow them down?",
        "a": "No. If a competitor's price falls below your floor, Undercut holds your listing at your floor price. The engine will not write a price below the floor under any circumstances. When that competitor's price rises again — or they sell out — Undercut will move your price down toward the new competitive level, as long as it remains above your floor."
      },
      {
        "q": "Can I set a different floor for every listing, or is it one setting for my whole account?",
        "a": "Floors are set per listing. Each SKU can carry its own floor reflecting its specific cost, shipping, and margin target. You set each listing's Floor Price through the dashboard, calculating it from that item's own cost. There is no single account-wide floor that would override individual settings."
      },
      {
        "q": "How do I calculate a floor that actually protects margin after eBay fees?",
        "a": "The safest formula is: Floor = (Cost of goods + Shipping cost) divided by (1 minus eBay fee percentage minus your target margin percentage). For a $12 all-in cost with a 13.6% eBay fee and a 15% margin target, that works out to approximately $16.81. Round up and set that as your floor. Recalculate whenever your costs change."
      },
      {
        "q": "Does having a floor mean I'll win fewer sales because I'm not always the cheapest?",
        "a": "A floor means you will not win sales that would cost you money to fulfil. In practice, most eBay shoppers do not select the absolute cheapest listing — reviews, seller feedback, shipping speed, and listing quality all influence the buy. Undercut keeps you competitive within the range where you can profit, rather than winning every sale at a loss."
      },
      {
        "q": "Will repricing software keep dropping my price even on slow-moving inventory that I'd rather hold?",
        "a": "Only if you let it. Undercut respects your floor absolutely, so slow-moving inventory will sit at the floor rather than being repriced below cost. If you want to clear aged stock deliberately, you can lower the floor temporarily for specific listings, then restore it. The tool does not make liquidation decisions autonomously."
      }
    ],
    "cta": {
      "heading": "Set Your Floors. Let Undercut Handle the Rest.",
      "sub": "Start a 14-day free trial — no credit card required. Protect every listing with a hard floor from day one, and stop leaving margin on the table when prices move up."
    },
    "internalLinks": [
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/ebay-seller-fees-explained",
        "label": "eBay Seller Fees Explained"
      },
      {
        "href": "/guides/ebay-pricing-strategy",
        "label": "eBay Pricing Strategy Guide"
      },
      {
        "href": "/guides/manual-vs-automated-repricing",
        "label": "Manual vs Automated Repricing"
      }
    ],
    "slug": "repricing-without-losing-margin",
    "collection": "guides",
    "template": "guide",
    "leadForm": true,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "Fastest eBay Repricer: Speed + Floor Protection — Undercut",
    "metaDescription": "Learn how repricing speed wins eBay sales — and why a hard floor keeps every fast reprice profitable. Start a 14-day free trial, no card required.",
    "h1": "How Repricing Speed Wins the Sale on eBay (Without Wrecking Your Margin)",
    "eyebrow": "Guide",
    "intro": "On eBay, the lowest-priced listing in a competitive search often sells first. But \"first\" is decided by minutes, not days — when a competitor drops their price, whoever responds fastest captures the next buyer. Repricing speed is the mechanical edge that converts your competitive intelligence into actual revenue. The catch: speed without a floor is just a faster race to losing money. The only repricer worth running is one that reacts in real time and stops cold at the minimum price you can afford.",
    "sections": [
      {
        "h2": "Why Repricing Cycle Time Directly Affects How Often You Sell",
        "body": "eBay's Best Match algorithm surfaces recently-priced competitive listings near the top of search. When a competing seller drops below your price, you may slip from position one to position three or four in seconds. If your repricer checks prices once every 24 hours, you can spend an entire day invisible to buyers who sort by price. Repricers that run every 15 minutes return you to the front of the results 96 times a day — coverage across every buying window, including lunch breaks, evenings, and weekend traffic peaks when conversion rates are highest. Undercut's Pro and Scale plans both run on this 15-minute cycle.",
        "bullets": [
          "Daily repricing: up to 24 hours of lost position per competitor move",
          "Hourly repricing (Free/Starter): up to 59 minutes of lost position per competitor move",
          "15-minute repricing (Pro and Scale): maximum 14 minutes of exposure — the fastest cadence Undercut runs, and enough for high-velocity categories like electronics and trending items"
        ]
      },
      {
        "h2": "The Floor Calculation That Makes Speed Safe",
        "body": "Speed is only an advantage if every reprice is still profitable. Before you turn on any repricer, calculate the absolute minimum price you can accept per listing — your hard floor. The formula: Floor = Cost + Shipping + (Sale Price × eBay Fee %) + Minimum Acceptable Margin.\n\nWorked example for a used kitchen appliance:\n- Item cost: $8.00\n- Estimated shipping: $4.00\n- eBay final value fee: 13.6% of sale price (applied to the floor price of ~$16.81 ≈ $2.29)\n- Minimum margin: 15% of cost ($1.20)\n- Floor: $8.00 + $4.00 + $2.29 + $1.20 ≈ $15.49, rounded up to $15.50 for safety\n\nEnter $15.50 as the hard floor in Undercut. No matter how fast the repricer fires, it will never push that listing below $15.50. Competitors can race each other to zero — you stop at profit.",
        "bullets": [
          "Set floors per SKU, not per account — every item has a different cost basis",
          "Revisit floors when your supplier raises costs or eBay fee categories change",
          "Include return-rate cushion for high-return categories like clothing or electronics"
        ]
      },
      {
        "h2": "Where 15-Minute vs. Hourly Repricing Actually Matters",
        "body": "Not every category needs the fastest possible cycle. Matching cycle time to category volatility keeps your repricer focused where responsiveness earns its keep.",
        "bullets": [
          "Electronics and video games: prices shift multiple times per hour around new releases or viral deals — 15-minute cycles (Pro and Scale) are justified",
          "Clothing and apparel: price movement is slower; 15-minute cycles are sufficient for most sellers",
          "Books and media: commodity pricing changes infrequently; even hourly repricing outperforms manual adjustment",
          "Collectibles and vintage: floor protection matters more than speed — set a firm floor and let the repricer catch occasional undercuts",
          "High-volume sellers (1,000+ SKUs): 15-minute repricing at scale requires a tool built for throughput, not one that queues listings for hours — the Scale plan adds capacity (10,000 listings) and priority support on the same 15-minute cycle"
        ]
      },
      {
        "h2": "AI Aggressiveness Tuning: Controlling How Hard You Chase the Lowest Price",
        "body": "Raw speed tells the repricer when to fire. Aggressiveness tuning tells it how far to move. A repricer set to maximum aggression always matches or beats the lowest competitor price instantly — optimal when you have genuine cost advantages. A more conservative setting might undercut by only $0.01, preserve margin on slow-moving inventory, or hold price when the lowest competitor appears to be a liquidator you cannot sustainably match.\n\nUndercut's Pro and Scale plans include AI aggressiveness tuning that lets you set, per listing, how fast and how far that listing moves toward its floor — so you can hold a conservative posture on items where you would rather not chase every momentary undercut. This helps avoid the common failure mode where a fast repricer races a one-hour clearance price down toward the floor when you would rather wait the seller out.",
        "bullets": []
      },
      {
        "h2": "Choosing the Right Repricing Plan for Your Catalog Size",
        "body": "Undercut's plans are built around listing count and the cycle speed your catalog demands. Matching plan to catalog size ensures you pay for the throughput you actually need.",
        "bullets": [
          "Free (25 listings): test repricing with your top sellers before committing — 14-day trial, no card required",
          "Starter $29/mo (100 listings): suitable for part-time sellers or single-category stores with stable inventory",
          "Pro $79/mo (1,000 listings): 15-minute repricing cycles plus AI aggressiveness tuning — the right tier for full-time eBay businesses",
          "Scale $199/mo (10,000 listings): same 15-minute cycles plus priority support, built for high-volume operations that need the catalog capacity"
        ]
      }
    ],
    "faq": [
      {
        "q": "How often does Undercut actually reprice my listings — and does the cycle time vary by plan?",
        "a": "Reprice frequency depends on your plan. Pro and Scale both reprice every 15 minutes — the fastest cadence Undercut runs. Free and Starter plans reprice less frequently. If your category sees rapid intraday price swings — electronics, gaming, trending collectibles — upgrading to Pro is where the 15-minute cycle translates directly into more sales; move to Scale when your catalog outgrows Pro's 1,000-listing limit."
      },
      {
        "q": "What stops the repricer from dropping my price below what I paid for the item?",
        "a": "Your hard floor. Before activating repricing on any listing, you set a minimum acceptable price per SKU. Undercut will never submit a price below that floor, regardless of what competitors do. The floor is enforced at the listing level, so different items in your store can have different floors based on their individual cost basis."
      },
      {
        "q": "Will the Scale plan help me if I only have 50 listings?",
        "a": "No — Scale is about capacity (up to 10,000 listings) and priority support, not faster repricing. Pro and Scale reprice on the same 15-minute cycle, so a 50-listing catalog gains nothing from Scale. For most small catalogs, 15-minute repricing on a lower tier captures the meaningful competitive moves. Start on Free or Starter, monitor how often your listings are being undercut, and upgrade to Pro if you see consistent lag."
      },
      {
        "q": "Can I set different aggressiveness levels for different parts of my catalog?",
        "a": "Yes. On the Pro and Scale plans, AI aggressiveness tuning can be set on each listing individually. You might set aggressive movement toward the floor on commodity items where you have a clear cost advantage, and conservative movement on unique or near-mint items where matching a liquidator's price makes no business sense."
      },
      {
        "q": "Does repricing speed affect my eBay seller standing or trigger any account flags?",
        "a": "No. Undercut submits price updates through eBay's official API, which is the same channel eBay expects third-party tools to use. Frequent price updates are normal seller behavior and do not negatively affect your seller metrics or Best Match ranking."
      }
    ],
    "cta": {
      "heading": "Reprice in minutes, never below your floor",
      "sub": "Start your 14-day free trial with 25 live listings — set your hard floors first, then let Undercut do the rest. No credit card required."
    },
    "internalLinks": [
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/electronics-repricing",
        "label": "Electronics Repricing on eBay"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/ai-repricing-ebay",
        "label": "AI Repricing on eBay: How It Works"
      }
    ],
    "slug": "fastest-ebay-repricer",
    "collection": "guides",
    "template": "guide",
    "leadForm": false,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "Smart AI Repricing for eBay That Protects Margin — Undercut",
    "metaDescription": "Discover how AI repricing for eBay wins more sales without margin bleed — set a hard floor, tune aggressiveness, and start a 14-day free trial, no card needed.",
    "h1": "AI Repricing for eBay: Win Sales Without Destroying Your Margin",
    "eyebrow": "Guide",
    "intro": "Most repricing tools do one thing: match or beat the lowest price. That sounds smart until you realize the lowest price is often set by a seller who miscalculated their fees, ships slowly, or simply doesn't care about profit. AI aggressiveness tuning changes the game entirely. Instead of chasing every price drop blindly, it measures how much competitive pressure actually exists in your listing — and nudges price only as far as necessary to win the sale, while your hard floor keeps every transaction profitable.",
    "sections": [
      {
        "h2": "Why Dumb Undercutting Destroys eBay Sellers",
        "body": "A basic repricer has one instruction: be the cheapest. Feed it a competitive category and it triggers a race to the bottom that compresses margins across your entire catalog. Two weeks in, you are selling the same volume at 8% lower average prices — with no net gain in units moved, because the other sellers repriced right back. Dumb undercutting also ignores context: a competitor with 94% feedback, 3-day handling, and no returns is not the same threat as one with 78% feedback and two negatives in the last month. AI aggressiveness tuning reads that context and prices accordingly.",
        "bullets": [
          "Race-to-the-bottom triggers when every seller runs the same naive 'beat lowest' rule",
          "Margin erosion compounds: a 5% average price cut on $50K monthly GMV is $2,500 gone per month",
          "Weak competitors are over-weighted: matching a seller with poor metrics costs you margin you did not need to give",
          "Velocity is ignored: a listing already selling once a day does not need an aggressive cut to move"
        ]
      },
      {
        "h2": "What AI Aggressiveness Tuning Actually Does",
        "body": "Undercut's AI aggressiveness tuning (available on the Pro and Scale plans) lets you set a posture — conservative, moderate, or aggressive — on each listing. That posture controls one thing: how fast and how far the listing moves toward the hard floor you already set as it undercuts the lowest comparable competitor. A conservative posture undercuts by a fraction and holds well above the floor; an aggressive posture moves more decisively toward it. You decide the posture per listing, and the AI applies it strictly within the floor you set. The result is a price that is competitive enough to win — not the lowest price in the room.",
        "bullets": [
          "Conservative posture: moves slowly toward the floor, holding well above it and undercutting by only a fraction",
          "Moderate posture: light adjustments to stay within a defined spread of the best competitor",
          "Aggressive posture: moves decisively toward the floor to compete hard for the buy box",
          "All three postures are bounded below by your hard floor — the engine cannot go lower, ever"
        ]
      },
      {
        "h2": "Setting a Hard Floor: A Worked Example",
        "body": "The floor is the number below which no algorithm — however aggressive — can reprice your listing. Here is how to calculate one for a typical electronics accessory. Suppose your landed cost is $8.00, you charge $4.00 shipping (or absorb it in free shipping), eBay's final value fee is 13.6% of total sale price, and your minimum acceptable net margin is 15% of sale price. Working backwards: if sale price = X, then X minus 0.136X minus $8 minus $4 must equal at least 0.15X. Solving: 0.714X = $12, so X = $16.81. Round up to $17.00 and that is your floor. Enter $17.00 in Undercut and the repricer will never go below it regardless of what competitors do. On Pro and Scale plans, repricing checks happen every 15 minutes, so your floor is enforced on every cycle.",
        "bullets": [
          "Floor formula: (cost + shipping) / (1 - fee% - target margin%) = minimum price",
          "Example result: $8 cost + $4 ship + 13.6% fees + 15% margin = $17.00 floor",
          "Set the floor on each listing individually, calculated from that item's own cost",
          "Floors survive plan changes — they are stored at the listing level, not the algorithm level"
        ]
      },
      {
        "h2": "Repricing Speed: When 15-Minute Cycles vs Hourly Actually Matters",
        "body": "Pro and Scale plans both reprice every 15 minutes; Free and Starter run on a slower cadence. For most categories — clothing, books, collectibles — 15 minutes is ample. A vintage jacket is not going to be undercut and sell in under a quarter hour. Electronics and high-velocity commodity items are different. A popular phone case or cable can see three or four price changes in an hour during peak shopping windows (evenings, weekends, major sale events). On an hourly or daily cadence you may miss a window entirely; at 15 minutes you catch it. The practical rule: if your average time-to-sale is under 48 hours and your category has more than 10 active competitive sellers, the 15-minute cadence on Pro or Scale will meaningfully outperform a slower plan in win rate. The choice between Pro and Scale is about catalog size (1,000 vs 10,000 listings) and priority support, not cycle speed.",
        "bullets": [
          "15-minute repricing (Pro and Scale) is meaningful for electronics, consumables, and commodity accessories",
          "Hourly repricing (Free/Starter) is sufficient for clothing, books, collectibles, and most vintage items",
          "Both Pro and Scale run the same 15-minute cycle, bounded by your floors — faster repricing does not mean more risk"
        ]
      },
      {
        "h2": "How to Combine AI Tuning With a Floor Strategy by Category",
        "body": "Different catalog segments need different postures. For high-competition commodity listings (cables, cases, generic accessories), set aggressive posture with a tight floor calculated on thin margin targets — the goal is velocity. For branded or unique items where you have limited direct competition, set conservative posture with a wider margin target baked into the floor — you do not need to race anyone. For collectibles and vintage, AI tuning has less utility because competitors are sparse and prices are idiosyncratic; moderate posture with a manually set floor based on acquisition cost is the right call. Mixing postures across your catalog is where sellers see the biggest real-world gain: high-velocity SKUs move faster, premium SKUs hold price, and nothing ever sells below cost.",
        "bullets": [
          "Commodity SKUs: aggressive posture, thin floor — move them fast before prices erode",
          "Branded/unique SKUs: conservative posture, fat floor, protect average sale price",
          "Collectibles/vintage: moderate posture, manual floor, reduce active management time",
          "Books: conservative posture with floor set to cover FBA-style cost + shipping + fees"
        ]
      }
    ],
    "faq": [
      {
        "q": "Does AI aggressiveness tuning override my hard floor?",
        "a": "No. The hard floor is an absolute constraint, not a preference. No posture setting — not even aggressive — can instruct Undercut to price below your floor. The AI layer decides how quickly and how steeply to move within the space above your floor. The floor itself is inviolable."
      },
      {
        "q": "How does the AI decide a competitor is 'weak' and not worth matching?",
        "a": "Undercut scores competitors on feedback percentage, feedback volume, handling time listed, and return policy. A seller with 78% feedback, 5-day handling, and no returns accepted scores significantly lower than one with 99.2% feedback and same-day dispatch. Conservative and moderate postures weight this score heavily — you will not be instructed to match a weak competitor's price just because it is technically lower."
      },
      {
        "q": "I sell in multiple categories with very different margins. Can I set different floors per category?",
        "a": "Yes. Floors are set at the listing level, but you can apply a category default and then override individual SKUs. For example, set a 20% margin floor as the default for your electronics category, then override specific high-competition SKUs to 12% where you need more price flexibility to compete."
      },
      {
        "q": "Will 15-minute repricing cause prices to swing wildly?",
        "a": "No. Repricing frequency controls how often the engine checks, not how often it changes price. If nothing meaningful has changed in the competitive landscape, the engine holds price. Rapid oscillation only happens when competitors are themselves repricing frequently — and in that case, checking every 15 minutes means you spend less time underpriced between checks than you would on an hourly or daily cadence. Your hard floor still bounds every move regardless of how often the engine runs."
      },
      {
        "q": "I am on the Free plan. Can I still set hard floors?",
        "a": "Yes. Floor-setting is available on every plan including Free (up to 25 listings). AI aggressiveness tuning is a Pro and Scale feature, but the floor protection is universal — no seller on any plan can have a listing repriced below their set floor."
      }
    ],
    "cta": {
      "heading": "Reprice Smarter — Your Floor Comes First",
      "sub": "Start your 14-day free trial and set hard floors on every listing from day one. No credit card required. Upgrade only when you need AI tuning or faster cadence."
    },
    "internalLinks": [
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/ebay-pricing-strategy",
        "label": "eBay Pricing Strategy Guide"
      },
      {
        "href": "/guides/electronics-repricing",
        "label": "Electronics Repricing on eBay"
      }
    ],
    "slug": "ai-repricing-ebay",
    "collection": "guides",
    "template": "guide",
    "leadForm": false,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "Cheapest eBay Repricer: Real Cost Breakdown — Undercut",
    "metaDescription": "What does a cheapest eBay repricer actually cost? Start free (25 listings, no card) then $29/mo — here's the honest math before you spend anything.",
    "eyebrow": "Guide",
    "h1": "What the Cheapest eBay Repricer Actually Costs — and What You Should Never Pay For",
    "intro": "Most repricing guides skip straight to feature lists. This one starts with the bill. A free plan covers 25 listings with no card required. After that, the smallest paid tier is $29 per month for 100 listings. That's the real floor on cost — and it's the right question to ask first, before you evaluate speed, AI tuning, or anything else. Here's a plain-English breakdown of what repricing software costs, what those costs buy you, and which features are worth paying for at each stage of your eBay business.",
    "sections": [
      {
        "h2": "The True Cost Tiers: Free to $199",
        "body": "Undercut's pricing is designed so you only pay when repricing is actually generating returns. Every tier includes the same core safety guarantee — a per-item hard floor that prevents any listing from selling below your cost.",
        "bullets": [
          "Free: 25 active listings, no credit card, unlimited floor rules. Enough for a new seller to test repricing on their best SKUs.",
          "Starter ($29/mo): 100 listings. Repricing runs on a standard schedule. Right for part-time sellers with a focused catalog.",
          "Pro ($79/mo): 1,000 listings, 15-minute reprice cycles, and AI aggressiveness tuning — tells the algorithm how hard to chase the lowest price.",
          "Scale ($199/mo): 10,000 listings, same 15-minute cycles as Pro, plus priority support. Built for high-volume operations that need the catalog capacity."
        ]
      },
      {
        "h2": "Worked Example: Setting Your Floor Before You Reprice a Single Listing",
        "body": "The cheapest repricer is useless if it sells your inventory below cost. Before activating any repricing tool, you need a hard floor per SKU. Here's a real calculation for a common scenario — a used electronics accessory.\n\nItem cost: $8.00. Shipping (you pay): $4.00. eBay final value fee: 13.6% of sale price. Minimum acceptable margin: 15%.\n\nFloor calculation: You need to recover $12.00 in hard costs, plus 13.6% in fees, plus 15% margin on top. Working backward: Floor = (Cost + Shipping) ÷ (1 − Fee% − Margin%) = $12.00 ÷ (1 − 0.136 − 0.15) = $12.00 ÷ 0.714 ≈ $16.81.\n\nRound up for safety: set your floor at $17.00. Undercut will never reprice below that number, no matter how aggressively competitors drop. That's the protection the free plan gives you on day one — before you've spent a cent on a subscription."
      },
      {
        "h2": "What You Should Pay For — and What You Shouldn't",
        "body": "Not every repricing feature justifies a higher monthly fee. Here's an honest read on where the upgrade value actually lives.",
        "bullets": [
          "Worth paying for: Faster reprice cycles (Pro/Scale) if you sell in competitive categories like electronics or media, where listings turn hourly.",
          "Worth paying for: AI aggressiveness tuning (Pro+) if you have a mixed catalog — some SKUs should chase the floor hard, others shouldn't.",
          "Not worth paying for at the start: the Scale plan's extra capacity if your category moves slowly or your catalog is small. Collectibles, vintage, and handmade items rarely need the fastest cadence, and Scale costs more for listing headroom you may not use.",
          "Not worth paying for ever: Any tool that doesn't let you set a hard per-item floor. Speed without a floor is how sellers accidentally liquidate inventory at a loss.",
          "Not worth paying for: Per-listing setup fees, 'AI insights' dashboards with no repricer underneath, or tools that charge extra for floor-rule features."
        ]
      },
      {
        "h2": "How to Evaluate 'Cheap' vs. 'Affordable'",
        "body": "A $9/month repricer that reprices once per day and has no floor protection will cost you more than a $29/month tool that keeps you profitable. Cheap and affordable are not the same thing when your inventory is on the line.\n\nThe right benchmark is cost per listing per month. At Starter tier, $29 for 100 active listings is $0.29 per listing. If repricing wins you one extra sale per week on even a handful of those listings, the subscription pays for itself within days.\n\nFor sellers on the free plan (25 listings), the benchmark is simpler: $0.00. Start there. Graduate to Starter only when your active catalog outgrows 25 SKUs — not before."
      },
      {
        "h2": "When to Upgrade: Practical Signals, Not Upsell Pressure",
        "body": "You should move from Free to Starter when you consistently have more than 25 active listings you want repriced. You should move from Starter to Pro when you notice competitors beating your price within hours of your last reprice cycle — that's a signal that 15-minute cycles and AI tuning will recover sales you're currently losing.\n\nYou should move to Scale ($199) only when your catalog exceeds roughly 1,000 active SKUs and you operate in categories where speed matters. For most independent eBay sellers, Pro is the practical ceiling. Scale is built for catalog-level operations, not for sellers with a few hundred listings.\n\nThere is no pressure to upgrade. Every plan includes the hard floor. Every plan is month-to-month."
      }
    ],
    "faq": [
      {
        "q": "Can I use Undercut's free plan without entering a credit card?",
        "a": "Yes. The free plan covers 25 active listings and requires no payment information. You set your floor rules, activate repricing, and pay nothing. A card is only required if you upgrade to a paid plan."
      },
      {
        "q": "What happens to my listings when I hit the 25-listing limit on the free plan?",
        "a": "Undercut stops repricing listings beyond the 25-listing cap — it does not deactivate them or change their prices. Your 25 selected listings continue repricing normally. You choose which listings to include."
      },
      {
        "q": "Is the $29 Starter plan actually worth it for a part-time seller?",
        "a": "It depends on your active catalog size and category competitiveness. If you have 26-100 active listings in a category where prices shift daily (electronics, media, sporting goods), $29/month typically recovers its cost in additional sales within the first week. If you sell fewer than 25 listings, the free plan is the right answer."
      },
      {
        "q": "Does a cheaper repricing tool ever make sense over a more full-featured one?",
        "a": "Only if the cheaper tool includes a hard floor per listing. Without that, you risk repricing below cost on any SKU where your cost data isn't perfectly maintained. The floor is not a premium feature — it is the baseline requirement for any repricer you should trust with live inventory."
      },
      {
        "q": "How does the AI aggressiveness tuning on Pro and Scale actually affect my prices?",
        "a": "AI tuning lets you tell the repricer how closely to chase the lowest competitor price. Set it conservative and Undercut will undercut by the minimum needed to stay competitive. Set it aggressive and it will move more decisively toward the floor. The hard floor you set per-item remains inviolable regardless of the aggressiveness setting."
      }
    ],
    "cta": {
      "heading": "Start Free — Set Your Floor, Pay Nothing",
      "sub": "25 listings, no credit card, full floor protection from day one. Upgrade only when your catalog outgrows the free plan."
    },
    "internalLinks": [
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/ebay-seller-fees-explained",
        "label": "eBay Seller Fees Explained"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/free-ebay-repricer",
        "label": "Free eBay Repricer"
      }
    ],
    "slug": "cheapest-ebay-repricer",
    "collection": "guides",
    "template": "guide",
    "leadForm": true,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "eBay Repricing for Beginners — Undercut",
    "metaDescription": "New to eBay repricing? Learn how to set a price floor and automate pricing safely — no race to the bottom. Start your 14-day free trial, no card required.",
    "h1": "Your First eBay Repricer: Set a Floor, Connect, Turn It On",
    "eyebrow": "Guide",
    "intro": "Most sellers avoid auto-repricing because they picture prices spiraling toward zero overnight. That fear is legitimate — but it only happens when there is no floor. The safer approach is to set one hard minimum per item before you touch anything else, then let the repricer do its job above that line. This walkthrough covers exactly that sequence: calculate your floor, connect your eBay account, and switch on repricing in a single session. Nothing complicated, nothing irreversible.",
    "sections": [
      {
        "h2": "What Repricing Actually Does (and What It Does Not)",
        "body": "An eBay repricer watches the live prices of competing listings for the same item and adjusts your price to stay just below the lowest one — so buyers see your listing first. What it does not do, on its own, is know your costs. That is your job, and it is the only thing you need to supply. Once your floor is set, the repricer will never go below it, regardless of how aggressive competitors get. Think of it as a thermostat with a hard lower limit: it can turn the heat down, but it cannot freeze the pipes.",
        "bullets": [
          "Repricers match competitor drops automatically — you do not need to watch listings manually.",
          "Without a floor, a repricer will follow competitors below your cost.",
          "With a floor, it stops and holds until competitors recover.",
          "You stay visible without becoming the seller who accidentally gives inventory away."
        ]
      },
      {
        "h2": "Step 1 — Calculate Your Floor Before You Do Anything Else",
        "body": "Your floor is the lowest price at which a sale still puts money in your pocket after every cost is paid. Here is a worked example using a common household electronics item.\n\nSuppose you sourced a used Bluetooth speaker for $8.00 and your shipping supplies and label cost $4.00. eBay's final value fee runs roughly 13.6% of the total sale price. You want at least a 15% net margin on your cost to make the time worthwhile.\n\nFloor calculation:\n• Total hard cost: $8.00 (item) + $4.00 (shipping) = $12.00\n• Add 15% margin target: $12.00 × 1.15 = $13.80\n• Gross up for eBay fees (divide by 0.864): $13.80 ÷ 0.864 ≈ $15.97\n• Round up to a clean number for comfort: set floor at $16.00\n\nThat $16.00 is your hard floor. Enter it in Undercut per listing. The repricer will never propose a price below it, even if a competitor lists at $12.00.",
        "bullets": [
          "Item cost + all shipping costs = your base.",
          "Apply your minimum margin multiplier.",
          "Gross up for eBay fees (13.6% is a safe estimate for most categories).",
          "Round up, not down — fees vary slightly, so give yourself a cushion."
        ]
      },
      {
        "h2": "Step 2 — Connect Your eBay Account (Takes About Three Minutes)",
        "body": "Undercut connects through eBay's official OAuth flow, the same mechanism eBay uses for every authorized third-party app. You grant read and write access to your listings — nothing else. Undercut cannot touch your PayPal, your bank, or your eBay messages.\n\nOnce connected, Undercut imports your active listings. For each listing, you will see a Floor Price field. You enter each listing's floor in the dashboard, calculating the number from that item's own cost — keeping your calculations in a spreadsheet makes this quick when several listings share a cost band. Start with five to ten listings on your first session so you can watch how pricing behaves before scaling up.",
        "bullets": [
          "Sign in to Undercut and click 'Connect eBay Account'.",
          "Approve read/write access on eBay's own OAuth page.",
          "Your active listings appear in Undercut within seconds.",
          "Set a floor on each listing before enabling repricing for that item."
        ]
      },
      {
        "h2": "Step 3 — Turn On Repricing and Read the Dashboard",
        "body": "After floors are set, enable repricing per listing or in bulk. Undercut checks competitor prices and updates yours on its next repricing cycle — every hour on the Free plan, and every 15 minutes on Pro and Scale. For beginners, hourly is plenty. Most eBay buyers do not refresh pages by the minute.\n\nThe dashboard shows three columns that matter most: your current price, the lowest competitor price, and your floor. When the competitor price falls below your floor, your listing holds at floor price and a small indicator flags the item as floor-locked. That flag is useful — it tells you a competitor may be selling below cost, liquidating, or pricing incorrectly. You can decide whether to reprice manually or simply wait them out.",
        "bullets": [
          "Floor-locked items hold at your minimum — no action required from you.",
          "Watch the floor-locked count over a week; a high count may mean your floor needs recalibrating.",
          "Repricing cycles run automatically; you do not need to log in every day.",
          "The Free plan covers 25 listings — enough to test the workflow on your best movers."
        ]
      },
      {
        "h2": "Common Beginner Mistakes and How Floors Prevent Them",
        "body": "The two most common beginner repricing errors are setting no floor at all and setting a floor based on the sale price rather than the cost. Both lead to the same outcome: profitable-looking sales that lose money once fees are counted.\n\nA third mistake is enabling repricing on every listing at once before verifying that floors are correct. If you miscalculate one floor, the repricer faithfully defends the wrong number. The fix is simple: start with a small batch, review your first week of sales against your floor spreadsheet, and expand only when the numbers match your expectations.\n\nUndercut's floor field is required — you cannot enable repricing on a listing without entering a value, which makes accidental omission impossible.",
        "bullets": [
          "Never set a floor from memory — always calculate from current sourcing cost.",
          "Fees compound: a 13% fee on a $20 sale is $2.60, not a rounding error.",
          "Enable repricing on 5-10 listings first, then review after one week.",
          "Update floors whenever your sourcing cost or shipping rates change."
        ]
      }
    ],
    "faq": [
      {
        "q": "Will the repricer keep lowering my price until I am selling at a loss?",
        "a": "No, as long as you set a floor. The floor is a hard stop — Undercut will not propose any price below the value you enter for that listing. If competitors drop below your floor, your listing holds at the floor price instead of following them down."
      },
      {
        "q": "How do I know what floor to set if I sell items across many different cost points?",
        "a": "Calculate a floor individually for each listing using the formula: (item cost + shipping cost) divided by (1 minus eBay fee rate), then multiplied by your margin target. If you have many listings in the same cost band — say, books that all cost you $3-4 — you can set a single floor for the batch and adjust individual listings that fall outside the range."
      },
      {
        "q": "What happens to my floor if eBay changes its fee structure?",
        "a": "Your floor stays at whatever number you entered — Undercut does not auto-adjust it. You are responsible for recalculating and updating floors if eBay's fee rates change or if your shipping costs shift. Undercut will send an alert if you have a floor-locked listing for more than 72 hours, which is a good prompt to review whether a recalculation is needed."
      },
      {
        "q": "Can I try repricing without connecting my live eBay inventory?",
        "a": "You can sign up and use Undercut's floor calculator and dashboard in preview mode before connecting. Once you are ready, connect your eBay account and enable repricing only on the specific listings you choose. Nothing is switched on automatically — every listing starts paused."
      },
      {
        "q": "Is the Free plan genuinely usable, or is it just a teaser?",
        "a": "The Free plan covers up to 25 active listings with hourly repricing and full floor protection — all core features included. It is genuinely functional for sellers who are still building inventory or want to validate the workflow before committing to a paid plan. No credit card is required to start, and the 14-day trial of Pro is also included so you can test faster repricing cycles on the same account."
      }
    ],
    "cta": {
      "heading": "Set Your First Floor and Start Repricing Today",
      "sub": "14-day free trial, no credit card. Connect your eBay account, enter your floors, and let Undercut hold your prices above cost — automatically."
    },
    "internalLinks": [
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/ebay-seller-fees-explained",
        "label": "eBay Seller Fees Explained"
      },
      {
        "href": "/guides/manual-vs-automated-repricing",
        "label": "Manual vs Automated Repricing"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      }
    ],
    "slug": "ebay-repricing-for-beginners",
    "collection": "guides",
    "template": "guide",
    "leadForm": true,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "eBay Seller Fees Explained 2026 — Undercut",
    "metaDescription": "eBay seller fees explained for 2026: insertion, final value, payment processing, and more — so your price floor is honest. 14-day free trial, no card required.",
    "h1": "eBay Seller Fees in 2026: The Complete Breakdown for Setting an Honest Price Floor",
    "eyebrow": "Guide",
    "intro": "Most eBay guides treat fees as an afterthought. But fees are the hidden input to your price floor — get them wrong and every \"profitable\" sale quietly loses money. This guide breaks down every fee you'll encounter in 2026: insertion, final value, payment processing, and category surcharges. We'll show you how to add each one into a real floor calculation so the minimum price Undercut will ever reprice you to is mathematically sound, not a gut guess.",
    "sections": [
      {
        "h2": "The Four Fee Buckets Every eBay Seller Pays in 2026",
        "body": "eBay charges sellers through four distinct mechanisms, and conflating them is the most common source of floor miscalculation.",
        "bullets": [
          "Insertion fees: Free for your first 250 listings per month (or unlimited with an eBay Store). Beyond that, $0.35 per listing. Fixed-price listings in most categories renew every 30 days, so a slow-moving SKU accumulates these.",
          "Final value fees (FVF): The biggest line item. Charged as a percentage of the total sale amount — item price plus shipping. Rates vary by category (see next section).",
          "Payment processing: eBay Payments (formerly managed by PayPal) charges 2.9% + $0.30 per transaction on most sales. International transactions add an additional 1.65%.",
          "Optional promoted listings: If you use Promoted Listings Standard, your chosen ad rate (typically 2–15%) is added only when a sale results from an ad click. This is discretionary but must be in your floor if you run ads."
        ]
      },
      {
        "h2": "Final Value Fee Rates by Category in 2026",
        "body": "FVF rates are category-specific and change periodically. These are the 2026 standard rates for sellers without an eBay Store. Store subscribers pay lower rates in exchange for the monthly subscription fee — factor that subscription cost into your per-item overhead instead.",
        "bullets": [
          "Most categories (electronics, clothing, home): 13.6% on the total amount up to $7,500, then 2.35% on the portion above.",
          "Books, DVDs, Music, Video Games: 14.95% up to $7,500.",
          "Collectibles and Trading Cards (non-graded): 13.6% with potential category surcharges during high-demand periods.",
          "Watches priced $1,000–$7,500: 6.5%.",
          "Real estate, heavy industrial, select vehicle parts: flat fees apply instead of percentages.",
          "Below-standard sellers: eBay adds a 6% FVF surcharge. Maintaining above-standard status is a direct cost-control measure."
        ]
      },
      {
        "h2": "How to Build Your Fee Math into a Real Price Floor",
        "body": "Here is a concrete worked example using a general merchandise item. You source a product for $8.00 and ship it for $4.00 (you charge the buyer actual shipping on top of the item price, so shipping is covered — but eBay charges FVF on the shipping amount too, which sellers routinely miss).\n\nAssume: cost $8.00, shipping $4.00 (buyer pays), FVF 13.6%, payment processing 2.9% + $0.30, no promoted listing, minimum acceptable margin 15% on cost.\n\nFee calculation on a $14 item price (+ $4 shipping = $18 total charged to buyer):\n- FVF: 13.6% × $18.00 = $2.448\n- Payment processing: 2.9% × $18.00 + $0.30 = $0.822\n- Total fees: $3.27\n- Total cost: $8.00 (COGS) + $3.27 (fees) = $11.27\n- 15% margin on cost means target net ≥ $9.20 after fees, so item price must be at least: $8.00 × 1.15 + $3.27 ≈ $12.47 item price\n\nRounding conservatively, your hard floor for this SKU is $12.50. At $12.50 item price + $4.00 shipping, Undercut will never reprice you below that number regardless of what competitors do. Enter $12.50 as your floor per listing — and sleep soundly.\n\nNote: if you run Promoted Listings at 5%, add 5% × $18 = $0.90 to fees, pushing your floor to approximately $13.40.",
        "bullets": []
      },
      {
        "h2": "Store Subscriptions: When the Monthly Fee Lowers Your Effective FVF",
        "body": "An eBay Store subscription reduces FVF rates but adds a fixed monthly cost ($7.95 Basic, $27.95 Premium, $74.95 Anchor, $349.95 Enterprise as of 2026). The break-even math is straightforward: divide your monthly subscription cost by the FVF percentage you save per dollar of sales to find the monthly sales volume at which the Store pays for itself.",
        "bullets": [
          "Basic Store saves roughly 1–3 percentage points of FVF depending on category. At 2% savings, you need $7.95 / 0.02 = $397.50 in monthly GMV to break even.",
          "Premium Store is typically worth it at around $1,400+ monthly GMV in standard categories.",
          "Anchor and Enterprise make sense only at high volume and when you value the additional free insertions and promotional credits.",
          "Key point for floor math: if you have a Store, your per-item FVF is lower — but your per-item overhead now includes a pro-rated share of the subscription fee. Both belong in the floor calculation."
        ]
      },
      {
        "h2": "Common Fee Mistakes That Quietly Destroy Margin",
        "body": "Even experienced sellers make these errors when setting price floors manually.",
        "bullets": [
          "Forgetting FVF applies to shipping: eBay charges final value fees on the full amount the buyer pays, including any shipping charge. A $4.99 shipping charge at 13.6% FVF costs you an extra $0.68 per sale.",
          "Using list price instead of expected sale price to model fees: FVF is charged on actual sale price. If you discount or accept best offers, model fees on the expected transaction value.",
          "Ignoring the $0.30 flat component of payment processing: On low-price items (under ~$10), the flat $0.30 is proportionally enormous. A $3.00 sale has $0.38 in payment processing fees alone — 12.7% of revenue.",
          "Not accounting for returns: eBay refunds FVF on returned transactions, but you may still absorb payment processing fees and return shipping. Model a realistic return rate into your margin buffer.",
          "Setting a floor once and never updating it: FVF rates change. Promoted Listings ad rates drift. Subscription tier changes. Audit your floor math at least quarterly."
        ]
      }
    ],
    "faq": [
      {
        "q": "Does eBay charge a final value fee on the shipping amount I charge buyers?",
        "a": "Yes. eBay's final value fee is calculated on the total amount the buyer pays, which includes the item price plus any shipping and handling charge. This catches many sellers off guard — a $5.99 shipping charge at 13.6% FVF adds $0.81 to your fee bill on every sale. Your price floor must account for this or it will be understated."
      },
      {
        "q": "How do I calculate my price floor if I use Promoted Listings?",
        "a": "Add your promoted listing ad rate (the percentage you set) applied to the total buyer-paid amount, on top of your FVF and payment processing fees. For example, at a 5% ad rate on an $18 total transaction, you owe $0.90 extra per promoted sale. Since promoted sales are the ones most likely to generate revenue, assume your floor applies to promoted transactions and set it accordingly."
      },
      {
        "q": "What happens to FVF if I have an eBay Store subscription?",
        "a": "Store subscribers pay lower FVF rates in most categories — the exact savings depend on category and store tier. However, your floor math should now include a pro-rated share of your monthly subscription fee spread across your expected number of sales. Divide monthly subscription cost by expected monthly units sold and add that amount to your per-item cost before calculating the floor."
      },
      {
        "q": "Will Undercut ever reprice me below the floor I set, even to win a sale?",
        "a": "No. The hard floor you enter per listing is an absolute lower bound. Undercut's repricing engine will match or beat the lowest competitor price, but it will stop at your floor and go no lower — regardless of what competitors do. If the market price falls below your floor, your listing simply holds at the floor rather than selling at a loss."
      },
      {
        "q": "How often do eBay's fee rates change, and how will I know to update my floors?",
        "a": "eBay typically announces fee changes with 30 days' notice, usually in late Q1 or Q3. Major changes in recent years have included the migration from PayPal to eBay Payments (which altered the per-transaction structure) and periodic FVF adjustments in specific categories. Subscribe to eBay's seller announcements, and plan a floor audit any time you receive a fee-change notice. Stale floors are one of the most common sources of margin erosion for high-volume sellers."
      }
    ],
    "cta": {
      "heading": "Set a Floor That Actually Protects Your Margin",
      "sub": "Undercut enforces your per-listing hard floor on every reprice — start free for 14 days, no credit card required."
    },
    "internalLinks": [
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/ebay-profit-calculator",
        "label": "eBay Profit Calculator"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to Set an eBay Price Floor"
      }
    ],
    "slug": "ebay-seller-fees-explained",
    "collection": "guides",
    "template": "guide",
    "leadForm": false,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "How to Reprice eBay Listings — Undercut",
    "metaDescription": "Learn how to reprice eBay listings manually, where the process breaks down at scale, and how a floor-first repricer protects margin — 14-day free trial, no card.",
    "h1": "How to Reprice eBay Listings Without Selling Below Cost",
    "eyebrow": "Guide",
    "intro": "Most eBay sellers start repricing manually: open Sold listings, check the lowest active price, edit their own listing. It works for five items. At fifty it becomes a part-time job, and at five hundred it breaks entirely — prices drift stale overnight, winning bids slip to competitors, and panic cuts eat margin. This guide walks through every step of that manual process, pinpoints exactly where it fails, and shows how setting a hard price floor before you automate keeps you competitive without ever selling at a loss.",
    "sections": [
      {
        "h2": "The Manual Repricing Process, Step by Step",
        "body": "Here is what manual repricing actually looks like when done correctly — before automation enters the picture.",
        "bullets": [
          "Open eBay and search your exact item title or catalog match.",
          "Filter results to 'Buy It Now', sorted by lowest price + shipping.",
          "Note the lowest total landed price (item + shipping) from a credible seller — ignore listings with 0 feedback or obvious junk.",
          "Open your own listing and edit the price to beat that number by a small amount, typically $0.50–$2.00 depending on category.",
          "Record your new price and the timestamp in a spreadsheet.",
          "Repeat for every active listing."
        ]
      },
      {
        "h2": "Where Manual Repricing Breaks Down",
        "body": "The manual loop has three structural failure points that compound as your catalog grows. First, staleness: competitors can relist or reprice within minutes of a market move, but you are checking prices at most once a day. A competitor who drops to undercut you at 9 AM captures all the traffic by the time you log in at 7 PM. Second, floor blindness: when you are moving fast through a spreadsheet, it is easy to set a price that feels competitive but is actually below your cost plus fees. A single mis-priced SKU can wipe out the margin from ten other sales. Third, human exhaustion: at around 80–120 active listings, the daily repricing task takes longer than the revenue it protects. Sellers either stop doing it or start doing it sloppily — both outcomes cost money."
      },
      {
        "h2": "How to Calculate Your Price Floor Before You Touch Any Tool",
        "body": "A price floor is the lowest price you will ever accept for a specific item. You must calculate it per SKU before you reprice — manually or automatically. The formula is straightforward: Floor = (Cost + Shipping Out) / (1 − eBay Fee Rate) / (1 − Minimum Margin). Here is a concrete example for a used electronics accessory. Cost of goods: $8.00. Outbound shipping: $4.00. eBay final value fee: 13.6% (electronics category as of 2025). Minimum acceptable margin: 15%. Step one: total cash in = $8.00 + $4.00 = $12.00. Step two: divide by (1 − 0.136) = $12.00 / 0.864 = $13.89 to cover fees. Step three: divide by (1 − 0.15) = $13.89 / 0.85 = $16.34, which rounds up to a floor of $16.34. Set your floor at $16.34. No repricer — automated or manual — should ever move that listing below that number. If competitors are pricing below $16.34, you simply do not match them. You hold or you pull the listing.",
        "bullets": [
          "Cost of goods: $8.00",
          "Outbound shipping: $4.00",
          "eBay fee rate (electronics): 13.6%",
          "Minimum margin target: 15%",
          "Calculated floor: $16.34 — never go below this"
        ]
      },
      {
        "h2": "When and Why to Automate — and What 'Floor-First' Means",
        "body": "Automation earns its keep at the point where manual checking costs more in time than it saves in margin. For most sellers that threshold is somewhere between 50 and 150 active listings. The critical design question is not speed — it is constraint. A repricer that only chases the lowest price without limits will eventually reach your cost, then go below it, because it has no way to know what your cost is. A floor-first repricer inverts the logic: you set the floor per SKU, and the repricer is only permitted to move the price between that floor and your ceiling. It will always try to beat the lowest competitor, but it physically cannot go below your floor. The result is that you stay competitive on listings where the market supports your margin, and you automatically hold firm on listings where competitors have priced themselves into losses — without you having to watch either situation manually. Undercut's 15-minute repricing interval on the Pro and Scale plans means your prices are never more than 15 minutes stale, which keeps you responsive in high-velocity categories like trading cards, media, and consumer electronics where prices move intraday. Scale adds capacity (up to 10,000 listings) and priority support on that same 15-minute cycle for sellers managing large catalogs in those categories."
      },
      {
        "h2": "Putting It Together: A Simple Repricing Workflow",
        "body": "Here is the complete workflow that combines the manual floor calculation with automated execution.",
        "bullets": [
          "For every SKU, calculate your floor using the formula above — cost, shipping, fee rate, and margin target. Enter it into your repricer before the rule goes live.",
          "Set a ceiling price that reflects the upper bound a buyer would reasonably pay (often your original list price).",
          "Let the repricer monitor competitors and move your price within that band automatically.",
          "Review a 'held at floor' report weekly — if many listings are stuck at floor, your cost structure or sourcing price needs attention, not your repricing rule.",
          "Adjust floors whenever your shipping carrier rates, supplier costs, or eBay fee tiers change."
        ]
      }
    ],
    "faq": [
      {
        "q": "How often should I reprice my eBay listings?",
        "a": "For slow-moving categories like clothing or antiques, once per day is often sufficient. For competitive categories like consumer electronics, trading cards, or media, competitors can reprice within minutes, so a 15-minute automated interval captures most opportunities without overcorrecting on every price tick."
      },
      {
        "q": "What happens if a competitor prices below my floor?",
        "a": "A floor-first repricer holds your listing at your floor price rather than matching the competitor's unsustainable price. You may lose the sale on that item, but you do not sell at a loss. In practice, competitors who price below cost tend to either sell out quickly or reprice back up — at which point your listing automatically becomes the lowest again."
      },
      {
        "q": "Can I set a different floor for each listing, or is it one global setting?",
        "a": "With Undercut, floors are per-listing. You set each listing's Floor Price in the dashboard, which is important because your cost basis, shipping weight, and category fee rate differ by SKU. A single global floor would either be too conservative on some items or too permissive on others."
      },
      {
        "q": "Do eBay fees change by category, and does that affect my floor calculation?",
        "a": "Yes, meaningfully. eBay's final value fee rates vary from around 3% for heavy equipment to 15% for jewelry. If you use a single average rate for your floor formula, you will systematically under-calculate floors in high-fee categories. Check the current rate for each category you sell in — eBay publishes the full table in the Seller Center — and use the exact rate in the floor formula for that SKU."
      },
      {
        "q": "Is there a risk that automated repricing will trigger eBay's duplicate listing policies?",
        "a": "Repricing an existing listing — changing its price — is entirely within eBay's policies. The duplicate listing concern arises if you create multiple listings for the same item. A repricer edits your existing listing's price field; it does not create new listings. That said, always confirm the repricer you use operates via eBay's official API to avoid any policy exposure."
      }
    ],
    "cta": {
      "heading": "Set Your Floor. Let Undercut Do the Rest.",
      "sub": "Start with up to 25 listings free — no credit card required. Add your floors, set your ceiling, and stop watching competitor prices manually. 14-day full trial on paid plans."
    },
    "internalLinks": [
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/manual-vs-automated-repricing",
        "label": "Manual vs. Automated Repricing"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/ebay-seller-fees-explained",
        "label": "eBay Seller Fees Explained"
      }
    ],
    "slug": "how-to-reprice-ebay-listings",
    "collection": "guides",
    "template": "guide",
    "leadForm": true,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "Managing Repricing Across Many eBay Listings — Undercut",
    "metaDescription": "Manage repricing across many eBay listings using account defaults + per-item floors. Beat competitors automatically without babysitting each listing. 14-day free.",
    "h1": "How to Manage Repricing Across Hundreds of eBay Listings Without Losing Margin",
    "eyebrow": "Guide",
    "intro": "The insight most multi-listing sellers miss: you do not need to configure every item individually. Set one account-level repricing default — target lowest competitor, respect a minimum margin — then override the floor only for the listings that truly need it. That two-layer approach lets Undercut watch hundreds of SKUs simultaneously, undercutting rivals on every one of them, while a hard floor on each item ensures you never sell below cost no matter how aggressive the market gets.",
    "sections": [
      {
        "h2": "Two Layers: An Account Undercut Rule and Per-Listing Floors",
        "body": "Undercut separates setup into two layers so you spend minutes, not hours per SKU. At the account level you choose a single default undercut rule — for example, beat the lowest competitor by $0.01 — plus your repricing cadence by plan. Every listing follows that rule automatically. The second layer is each listing's own hard floor: any listing can carry a floor Undercut will never cross, regardless of the undercut rule. If the market crashes and competitors list below your cost, Undercut holds your price at that listing's floor rather than following them down.",
        "bullets": [
          "Account undercut rule: applies to every listing automatically, no per-item setup needed.",
          "Per-listing floor: set once per SKU, stored permanently, updated any time.",
          "Undercut checks the floor before every reprice — the floor always wins.",
          "The account undercut rule sets the behavior; each listing's own floor sets its hard limit."
        ]
      },
      {
        "h2": "How to Calculate a Defensible Floor for Any Listing",
        "body": "A floor that is too low destroys margin; one that is too high costs you sales. The correct floor covers every cost you will actually incur. Work through this example for a small electronics accessory: item cost $8.00, shipping supplies and postage $4.00, eBay final value fee 13.6% of the total sale price, and a minimum acceptable margin of 15%. Because the fee and margin are both percentages of the sale price, solve for it: floor = (cost + shipping) / (1 − fee% − margin%) = $12.00 / (1 − 0.136 − 0.15) = $12.00 / 0.714 ≈ $16.81. Round up to $16.85 and that is the floor you enter in Undercut. The platform will never reprice below that number, so every sale at or above it is profitable by construction.",
        "bullets": [
          "Include all variable costs: item cost, postage, packaging, and the eBay fee tier for that category.",
          "Add your minimum margin as a percentage so profit scales with price.",
          "Recalculate floors when your supplier raises costs or eBay changes fee structures.",
          "Undercut's free eBay profit calculator can pre-fill the formula for you."
        ]
      },
      {
        "h2": "Organizing Large Catalogs: Where to Spend Your Floor-Setting Time",
        "body": "For sellers with hundreds or thousands of listings, the practical question is where to spend the most care when setting per-listing floors. In most catalogs, roughly 70–80% of SKUs share similar margin profiles, so you can reuse the same floor math across them quickly. Reserve your closest attention for three situations: items with unusually high acquisition cost (liquidation lots, rare collectibles), items in categories with atypical eBay fee structures (media items carry a lower fee, which shifts the floor down), and items you purchased at varying costs across restocking runs. For everything else, the standard formula gives you the floor to enter. This is what makes managing repricing across many eBay listings tractable rather than exhausting.",
        "bullets": [
          "High-cost or irregular-margin SKUs: calculate the floor individually with extra care.",
          "Commodity or refill SKUs with stable costs: reuse the same floor math across them.",
          "Seasonal items: review floors before peak season when costs and demand shift.",
          "Set every listing's Floor Price in the dashboard from that item's own cost."
        ]
      },
      {
        "h2": "Reprice Frequency and AI Aggressiveness at Scale",
        "body": "Speed and strategy interact differently across catalog sizes. At small volumes — the Free plan covers 25 listings — hourly repricing is usually fast enough because your competitors are not moving that quickly. As your catalog grows past a few hundred listings, a faster cycle matters more because you are competing in more sub-niches simultaneously. Undercut's Pro plan reprices every 15 minutes and adds AI aggressiveness tuning, which you set per listing to control how sharply that listing moves toward its floor as it undercuts the lowest competitor. The Scale plan runs on the same 15-minute cycle across up to 10,000 listings, with priority support, and is designed for liquidators and wholesale resellers managing large catalogs. In all cases the floor constraint is enforced at every reprice cycle, regardless of how aggressive the AI setting is.",
        "bullets": [
          "Free and Starter plans: reprice on a standard cycle, suitable for steady-state catalogs.",
          "Pro (15-min cycle + AI tuning): right for active resellers competing in fast-moving categories.",
          "Scale (same 15-min cycle, 10,000 listings, priority support): built for high-volume and liquidation operations.",
          "AI aggressiveness affects how far below the competitor you go — the floor caps the downside."
        ]
      },
      {
        "h2": "Common Mistakes That Erode Margin When Repricing at Scale",
        "body": "The most frequent error is setting a floor based on purchase price alone and forgetting the eBay fee. A seller who paid $20 for an item and sets a $22 floor believes they are making $2 per sale. After a 13.6% final value fee on $22, they net $22 − $2.99 = $19.01 — a loss of $0.99 on every transaction. The second mistake is a single global floor across all categories, which ignores that eBay charges different fee rates by category. The third is never updating floors after supplier price changes. Undercut does not know your new landed cost — that update must come from you by editing the listing's Floor Price in the dashboard. Build a calendar reminder to audit floors quarterly, or whenever a major supplier invoice arrives.",
        "bullets": [
          "Always calculate floors on the net-after-fees sale price, not the gross price.",
          "Use category-specific floors when you sell across categories with different fee structures.",
          "Treat floor maintenance as a recurring task, not a one-time setup.",
          "Undercut logs every reprice decision — review the history to spot listings drifting near the floor."
        ]
      }
    ],
    "faq": [
      {
        "q": "If I change my account-level default rule, does it override floors I already set on individual listings?",
        "a": "No. Changing your default undercut amount updates how far below the lowest competitor Undercut prices — but it never overrides a per-listing floor you have set. The floor on each listing is a separate, protected value. If you want to raise or lower floors, you edit each listing's Floor Price in the dashboard."
      },
      {
        "q": "What happens when every competitor's price drops below my floor?",
        "a": "Undercut holds your listing at the floor price rather than following competitors down. Your listing will not be the lowest price in those moments, but you will not sell at a loss. Once competitors raise their prices above your floor again, Undercut resumes normal repricing and undercuts them automatically."
      },
      {
        "q": "Can I set floors as a percentage of cost rather than a fixed dollar amount?",
        "a": "Currently Undercut stores floors as a fixed dollar amount per listing. The recommended workflow is to calculate your margin-inclusive floor (cost + shipping + fees + minimum margin %) as a dollar figure and enter that value. The free eBay profit calculator on the Undercut site walks through this calculation for any category's fee structure."
      },
      {
        "q": "How do I manage repricing for listings I add frequently without reconfiguring from scratch each time?",
        "a": "New listings automatically inherit your current default undercut amount, so the repricing behavior carries over. You set the Floor Price on each new listing in the dashboard, calculated from that item's own cost. For frequent restockers, keeping your floor formula in a spreadsheet makes it quick to look up the right number and enter it before you go live."
      },
      {
        "q": "Does Undercut reprice listings that are already at the buy box price, or only ones being undercut?",
        "a": "Undercut reprices any listing where a lower-priced competitor exists, including listings that are currently winning but could be challenged. If your listing is already the lowest and no competitor undercuts you, Undercut holds the current price rather than lowering unnecessarily — protecting margin while you hold position."
      }
    ],
    "cta": {
      "heading": "Set Your Floors Once — Let Undercut Handle the Rest",
      "sub": "Start your 14-day free trial and reprice up to 25 listings today. No credit card required. Add per-item floors in minutes and never sell below cost again."
    },
    "internalLinks": [
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/multi-listing-repricing-strategy",
        "label": "Multi-Listing Repricing Strategy"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/high-volume-repricing",
        "label": "High-Volume Repricing on eBay"
      },
      {
        "href": "/ebay-profit-calculator",
        "label": "Free eBay Profit Calculator"
      }
    ],
    "slug": "multi-listing-repricing-strategy",
    "collection": "guides",
    "template": "guide",
    "leadForm": false,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "eBay Repricing Best Practices — Undercut",
    "metaDescription": "The eBay repricing best practices that actually protect margin: set hard floors, filter outliers, review competitors regularly. Start free — no card needed.",
    "h1": "The Guardrails Checklist: eBay Repricing Best Practices That Keep Automation Safe",
    "eyebrow": "Guide",
    "intro": "Most repricing advice focuses on speed — how fast can you match the lowest price? But the sellers who burn out on repricing do so because they moved fast without guardrails. The best practice that separates profitable automation from a race to zero is simple: define what you will never do before you define what the software can do. This guide covers the exact checklist — hard floors, competitor filtering, outlier detection, and cadence — that makes automated eBay repricing safe enough to run while you sleep.",
    "sections": [
      {
        "h2": "Best Practice #1: Set a Hard Floor Before You Touch Any Repricing Rule",
        "body": "A floor is not a preference — it is a constraint the software cannot cross under any circumstance. Calculate yours item by item before you configure a single repricing rule. The formula is: Cost + Shipping Cost + eBay Fees + Minimum Acceptable Margin = Floor.\n\nWorked example: You source a phone case for $8.00, ship it for $4.00, and eBay charges ~13.6% of the sale price (final value fee + payment processing on a $20 item ≈ $2.72). You want at least 15% net margin on cost. That means: $8 + $4 + $2.72 + $1.20 (15% of $8) = $15.92 floor, rounded up to $16.00 for safety.\n\nUntil that number is locked in as a hard floor in your repricer, do not enable any automation. Every other best practice builds on this one.",
        "bullets": [
          "Use landed cost (cost + inbound shipping + prep fees), not just invoice price",
          "Recalculate floors when your supplier raises prices — automation does not do this for you",
          "Set a separate floor for bundles and multi-packs; bundled items have different fee structures",
          "If you sell across categories, note that eBay fee rates differ — electronics and collectibles are not the same"
        ]
      },
      {
        "h2": "Best Practice #2: Filter Competitor Listings Before You Chase Their Price",
        "body": "Your repricer should never react to every listing that appears in search results. Low-feedback sellers, listings with no returns, drop-shippers with inflated shipping, and sellers listing a damaged or incomplete item all pull the apparent market price down below what a reputable seller should charge. Chasing those prices is how good sellers train buyers to distrust the category.\n\nBefore enabling repricing, audit who you are competing against. In Undercut you can restrict the competitor pool to sellers above a feedback threshold, with returns accepted, and with handling times within a defined window. Run this filter first, then let the algorithm work within that cleaned pool.",
        "bullets": [
          "Exclude sellers with fewer than 50 feedback or below 98% positive",
          "Exclude listings where the competitor's shipping cost makes their true landed price higher than yours",
          "Flag listings marked 'for parts / not working' — they should never anchor your price",
          "Revisit competitor filters monthly; new drop-shippers enter categories constantly"
        ]
      },
      {
        "h2": "Best Practice #3: Detect and Ignore Outliers — One Rogue Listing Can Collapse Your Margin",
        "body": "Outliers are single listings priced absurdly low — a competitor clearing dead stock, a data-entry error, or a seller who has already sold out but whose listing is still live. If your repricer is set to beat the lowest price unconditionally, one outlier pulls every one of your listings down with it.\n\nThe guardrail here is a minimum-price delta rule: only match or beat prices that are within a defined percentage band of the current median. If the median price for your item is $42 and one listing appears at $19, that listing is almost certainly anomalous. A well-configured repricer ignores it until at least two or three comparable listings exist at that level.\n\nThis is the single most underused best practice among high-volume sellers, and it is responsible for a disproportionate share of margin erosion events.",
        "bullets": [
          "Set an outlier threshold: ignore any competitor priced more than 25-35% below the category median",
          "Review repricing logs weekly for any listing that dropped more than 20% in a single repricing cycle",
          "Use Undercut's 15-minute cadence (Pro and Scale) to recover quickly once an outlier sells through"
        ]
      },
      {
        "h2": "Best Practice #4: Match Repricing Cadence to Category Velocity",
        "body": "Not every category needs the fastest available cadence. High-velocity categories — consumer electronics, phone accessories, popular media — can see prices shift meaningfully within an hour. Slow-moving categories — vintage, antiques, collectibles, niche books — may not need repricing more than once per day, and repricing too aggressively in slow categories can signal desperation to buyers who are already doing price research.\n\nMatch your cadence to actual category behavior. As a starting framework: electronics and accessories benefit from 15-minute repricing; clothing, shoes, and general merchandise are well-served by hourly; collectibles, vintage, and antiques rarely need better than daily. Over-repricing is not a performance problem — it is a margin problem, because it trains the algorithm to chase noise.",
        "bullets": [
          "Electronics / phone accessories: 15-minute cadence",
          "Clothing, shoes, home goods: 30–60 minute cadence",
          "Books, media, collectibles: daily or every 12 hours",
          "Use Undercut Pro (15-min) for most active categories; Scale runs the same 15-min cycle with more capacity for high-volume electronics operations"
        ]
      },
      {
        "h2": "Best Practice #5: Build a Weekly Review Ritual — Automation Drifts Without Human Oversight",
        "body": "The biggest mistake sellers make after setting up a repricer is treating it as a set-and-forget system. Markets shift, suppliers raise costs, eBay adjusts fee rates, and competitor pools change. A repricer operating on stale floors and outdated competitor filters will quietly erode your margin over weeks without triggering any obvious alarm.\n\nSchedule a 20-minute weekly review covering three questions: (1) Have my costs changed for any active listing? (2) Are there new low-feedback or anomalous sellers anchoring my category prices? (3) Did any listing reprice more than 15% downward this week — and if so, why? This ritual catches drift before it becomes a problem and keeps automation safe over the long term.",
        "bullets": [
          "Export your weekly repricing log and flag any listing that hit its floor more than twice",
          "Recalculate floors for any item where supplier cost or shipping cost changed",
          "Check eBay fee rate updates — category fee changes can invalidate floors calculated months ago",
          "Review your lowest-priced competitor per category — if new entrants have appeared, reassess whether your competitor filter is still catching bad actors"
        ]
      }
    ],
    "faq": [
      {
        "q": "How do I calculate a safe price floor when eBay's fees vary by category?",
        "a": "Look up your category's final value fee rate in eBay's fee schedule, then add the 0.30 fixed payment processing fee per order. Build your floor formula as: landed cost + shipping cost + (sale price × category FVF rate) + 0.30 + minimum margin. Because the fee is a percentage of the sale price, you may need to solve for the floor iteratively — or simply add 2-3% buffer to your estimate to account for variation."
      },
      {
        "q": "What happens if I forget to update my floors when my supplier raises prices?",
        "a": "Your repricer will keep competing at prices that no longer cover your actual cost. This is one of the most common causes of margin erosion among automated sellers — the automation is working correctly, but the floor inputs are stale. Build a cost-review trigger into your inventory workflow: any time a supplier invoice changes, that item's floor gets recalculated before the next repricing cycle runs."
      },
      {
        "q": "Should I set the same repricing aggressiveness for all my listings?",
        "a": "No. High-turnover commodity items (phone cases, common cables) benefit from aggressive repricing to stay visible, while unique or scarce items (vintage, collectibles, limited-run products) have pricing power you lose by chasing every competitor. Undercut's Pro and Scale plans include AI aggressiveness tuning so you can set a different aggressiveness on each listing rather than applying a single posture to your entire catalog."
      },
      {
        "q": "How do I handle a competitor who keeps pricing $0.01 below me?",
        "a": "First, verify they are in your competitor pool legitimately — check their feedback, return policy, and shipping terms. If they are a credible competitor, accept that some categories are price-efficient and focus on service signals (faster handling, better photos, more detailed descriptions) rather than trying to out-penny them indefinitely. If their floor is below your cost, your floor will stop the chase automatically. The goal of repricing is not to win every price comparison — it is to win the profitable ones."
      },
      {
        "q": "Can I use Undercut's free plan to test floor-based repricing before committing?",
        "a": "Yes. The free plan supports up to 25 listings with no credit card required. That is enough to run your full guardrails checklist — set floors, configure competitor filters, and observe one full week of repricing behavior — before deciding whether to expand to a paid plan. Start with your 25 most active listings to get the most signal from the trial period."
      }
    ],
    "cta": {
      "heading": "Set Your Floors. Start Repricing Safely — Free for 14 Days.",
      "sub": "No credit card required. Add up to 25 listings on the free plan and run the full guardrails checklist before you spend a cent."
    },
    "internalLinks": [
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to Set an eBay Price Floor"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/manual-vs-automated-repricing",
        "label": "Manual vs. Automated Repricing: Which Is Right for You?"
      }
    ],
    "slug": "ebay-repricing-best-practices",
    "collection": "guides",
    "template": "guide",
    "leadForm": false,
    "lastUpdated": "2026-06-09"
  },
  {
    "slug": "ebay-best-match-algorithm",
    "collection": "guides",
    "template": "guide",
    "title": "How eBay Best Match Works for Sellers — Undercut",
    "metaDescription": "Understand every documented eBay Best Match factor—price, sales history, seller metrics—and keep listings competitive automatically. Free 14-day trial, no card.",
    "h1": "eBay Best Match Algorithm: What Actually Moves Your Listings Up",
    "eyebrow": "Seller Guide",
    "intro": "Best Match is eBay's default sort order, and it determines whether your listing appears on page one or page ten. eBay has never published a complete formula, but years of seller data and eBay's own documentation point to five concrete signal groups: price competitiveness, sales history, seller performance metrics, item specifics completeness, and click-through rate. This guide separates documented factors from common myths, explains why ending a listing resets the history that took weeks to build, and shows which lever—price—you can actually move every hour without restructuring your entire catalog.",
    "sections": [
      {
        "h2": "The Five Documented Best Match Signals",
        "body": "eBay's own Seller Center acknowledges these inputs to Best Match ranking: (1) Price + shipping total — buyers sort by 'lowest price + shipping' constantly, so eBay weights combined landed cost. (2) Recent sales and conversion history — how often your listing converts views to purchases over the past 30-90 days. (3) Seller performance tier — Top Rated Plus badges receive a documented ranking boost; Below Standard sellers face suppression. (4) Item specifics completeness — listings missing Brand, MPN, or category-required fields rank lower because eBay cannot match them to buyer search filters. (5) Click-through rate — if buyers repeatedly scroll past your thumbnail, eBay interprets low CTR as a relevance signal and reduces impressions. None of these is publicly weighted, but all five appear in eBay's help documentation or have been confirmed via eBay seller-community communications."
      },
      {
        "h2": "Why Ending a Listing Is Dangerous for Rank",
        "body": "Every time you end a fixed-price listing and relist it—even with the same SKU—eBay treats it as a brand-new listing with zero sales history. The conversion data, watcher count, and CTR signals accumulated on the original listing are gone. A listing that took 60 days to build 15 sales and climb to page one resets to day zero. This is one of the most expensive mistakes multi-SKU sellers make when they try to 'refresh' stale listings. If you need to update price, title, or item specifics, use the Revise function inside the active listing. The only exception eBay documents is the 'Sell Similar' flow, which also starts fresh. If your goal is to protect ranking history, never end a performing listing to relist it."
      },
      {
        "h2": "Price Competitiveness: The One Lever You Can Move Daily",
        "body": "Sales history and seller metrics change slowly—you cannot manufacture 30 days of conversions overnight. Item specifics are a one-time fix. CTR depends on photography and titles that take weeks to test. Price is the only Best Match input you can change today, multiple times per day, without losing accumulated signals. eBay's algorithm favors listings whose combined price + shipping is competitive relative to identical or similar items in the same category. Being the lowest-priced option is not always necessary—but being more than 10-15% above the median on a commoditized item is typically enough to suppress ranking. An automated repricer like Undercut monitors competitor prices continuously and adjusts your price to stay competitive without requiring manual checks. On Undercut's Free plan (up to 25 listings, hourly repricing), you can test this on your highest-volume SKUs before committing to a paid tier."
      },
      {
        "h2": "Myths vs. Documented Factors",
        "body": "Several ranking tactics circulate in seller forums without supporting documentation. Here is an honest breakdown:",
        "bullets": [
          "MYTH: Promoted Listings boost organic Best Match rank. FALSE — Promoted Listings are a separate paid placement layer. They do not improve your unpaid Best Match position, though higher visibility from ads can indirectly increase sales history.",
          "MYTH: Listing at auction first then switching to fixed-price passes sales history. NOT DOCUMENTED — eBay has not confirmed any history transfer between listing formats.",
          "MYTH: Adding more keywords to the title always helps. PARTIALLY TRUE — Title keywords determine which searches your listing appears in, but keyword stuffing that reduces CTR can hurt rank.",
          "DOCUMENTED: Top Rated Plus status provides a ranking boost. eBay's own Seller Center confirms this explicitly.",
          "DOCUMENTED: Free shipping improves rank. eBay states that listings with free shipping are favored when all else is equal because it lowers the buyer's total landed cost.",
          "UNKNOWN: Exact weight of each signal. eBay has never published coefficients. Anyone claiming precise percentages is guessing."
        ]
      },
      {
        "h2": "Setting a Price Floor Before You Reprice",
        "body": "Competing on price is only sustainable if every price change stays above your breakeven. For most eBay categories, the math is: item cost + 13.6% final value fee on (item price + shipping + tax) + $0.35 per-order fee + shipping cost + packaging. On a $40 item with $8 shipping, that fee load alone is roughly $7.70, leaving less margin than many sellers realize. Undercut requires you to set a per-item floor—the minimum price you will accept—before any repricing rule activates. The repricer will beat the lowest competitor automatically but will stop at your floor rather than cross it. This floor-first design prevents the race-to-zero that destroys margins when multiple sellers chase the same position. Set your floor at cost + fees + your minimum acceptable margin, not just cost."
      }
    ],
    "faq": [
      {
        "q": "Does Best Match rank update in real time?",
        "a": "No. eBay's ranking signals are recalculated periodically, not instantly. Price changes typically reflect within a few hours. Sales history and conversion data are aggregated over rolling windows of 30-90 days. This means a single price drop will not immediately push a listing to page one, but consistent competitiveness over days and weeks does compound into improved rank."
      },
      {
        "q": "If I have zero sales history on a new listing, can I still rank well?",
        "a": "Yes, but you need to compensate with the signals you can control: set the most competitive price, fill every item specific, offer free shipping, and use a high-quality main thumbnail. New listings occasionally get a short 'honeymoon' boost in impressions according to seller community observations, though eBay has not officially documented this. Convert those early impressions to sales and you start building the history that sustains rank long-term."
      },
      {
        "q": "How does Undercut help with Best Match without hurting my margins?",
        "a": "Undercut sets a hard per-item floor—cost plus fees plus your minimum margin—and will never reprice below it. Within that constraint it adjusts your price to beat the lowest competitor automatically, 24/7. You stay price-competitive for Best Match purposes without manually monitoring rivals or accidentally repricing below cost. The Free plan covers 25 listings with hourly repricing and requires no credit card, so you can verify the impact on ranking before upgrading."
      },
      {
        "q": "Is Undercut a good fit if I sell one-of-a-kind or handmade items?",
        "a": "Probably not. Automated repricing works best for commodity or multi-quantity fixed-price listings where direct price comparison exists. One-of-a-kind, handmade, vintage, or rare collectible listings have no direct competitors to undercut. For those, Best Match optimization should focus on item specifics, photography, and title keyword match rather than price. Undercut is honest about this: it is built for sellers with repeatable, comparable inventory."
      },
      {
        "q": "Does having a Top Rated Plus badge actually move the needle on rank?",
        "a": "Yes—this is one of the few factors eBay explicitly confirms. Top Rated Plus listings receive a ranking boost in Best Match and display a badge that increases buyer trust and CTR. To qualify you need a 98%+ positive feedback rate, under 0.5% transaction defects, and under 3% cases closed without resolution over the trailing 12 months. Achieving TRP status amplifies the benefit you get from price competitiveness because both signals stack."
      }
    ],
    "internalLinks": [
      {
        "href": "/guides/ebay-repricing-best-practices",
        "label": "eBay Repricing Best Practices"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/ebay-pricing-strategy",
        "label": "eBay Pricing Strategy Guide"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to Set an eBay Price Floor"
      }
    ],
    "lastUpdated": "2026-06-10",
    "leadForm": true
  },
  {
    "slug": "ebay-best-offer-strategy",
    "collection": "guides",
    "template": "guide",
    "title": "eBay Best Offer Strategy: Set Thresholds That Protect Margin — Undercut",
    "metaDescription": "Learn to set auto-accept and auto-decline thresholds using cost + fees + margin math. Optimize Best Offer without racing to the bottom. Free, no card required.",
    "h1": "How to Use eBay Best Offer Without Giving Away Your Margin",
    "eyebrow": "Pricing Strategy",
    "intro": "Best Offer is one of eBay's most underused margin-protection tools — but only if your thresholds are set with real numbers behind them. Most sellers either ignore it entirely or accept whatever comes in. The correct approach: treat your auto-decline floor as a hard negotiation wall built from cost, eBay fees, and your minimum margin, then let auto-accept capture buyers willing to pay near list. This guide shows you the exact math, explains how Best Offer interacts with automated repricing, and tells you when it beats simply lowering your list price.",
    "sections": [
      {
        "h2": "Computing Your Minimum Acceptable Offer",
        "body": "Before touching any Best Offer settings, calculate your floor using three inputs: item cost, eBay fees, and your minimum acceptable margin. eBay charges roughly 13.6% final value fee on the total transaction (item + shipping + tax) plus a $0.30–$0.40 per-order fee depending on your store plan. Example: you paid $18 for an item, ship for $6, and want at least 15% net margin. Gross needed = ($18 + $6) / (1 - 0.15) ≈ $28.24. Subtract eBay's fee: $28.24 / (1 - 0.136) = $32.69 list equivalent. Any offer below $28.24 net destroys your floor. Set your auto-decline threshold at or above that figure. Never eyeball it — one miscalculated threshold across 200 listings erases weeks of profit."
      },
      {
        "h2": "Auto-Accept and Auto-Decline Thresholds Explained",
        "body": "eBay gives you two threshold levers. Auto-decline rejects any offer below the number you set — no counter, no notification, no time wasted. Auto-accept automatically accepts any offer at or above a second, higher number without you lifting a finger. A practical setup: list at $38, auto-decline below $30 (your floor from the math above), auto-accept at $35 (captures motivated buyers fast, still 16%+ margin). The band between $30 and $35 lands in your manual review queue. Keep that band narrow — wide bands mean more manual negotiations and more opportunities to accidentally accept a bad deal under time pressure. If you have 500+ listings, manual review bands become unmanageable; at that point, tighten the band or skip manual review entirely.",
        "bullets": [
          "Auto-decline = your negotiation floor, never below cost + fees + minimum margin",
          "Auto-accept = your 'close fast' price, typically 5–10% below list",
          "Manual band between the two should be narrow to avoid negotiation overhead",
          "eBay does not charge a fee for declined offers — decline freely"
        ]
      },
      {
        "h2": "How Best Offer Interacts with Automated Repricing",
        "body": "Here is where most sellers get confused: when Undercut reprices your listing down to beat a competitor, does your Best Offer threshold move with it? On eBay, Best Offer thresholds are fixed dollar amounts set at listing time — they do not float with price changes automatically. This creates a real risk: if Undercut drops your list price from $38 to $31 to beat a competitor, and your auto-decline is still set at $30, a buyer can offer $30.50 and get auto-accepted at effectively zero margin. The fix is to define your price floor in Undercut itself. When you set a per-listing hard floor — say $32 — Undercut will never reprice below it, keeping your auto-decline threshold safely inside the repricing range. Floor-first design is the reason Undercut was built this way: the floor is not an afterthought, it is the starting point."
      },
      {
        "h2": "When Best Offer Beats Lowering Your List Price",
        "body": "Dropping your list price is permanent and visible to every buyer and competitor. Enabling Best Offer is neither. Use Best Offer instead of a price cut when: (1) you have a slow-moving item and want to test price sensitivity without publicly marking it down; (2) your category attracts negotiation-minded buyers (collectibles, vintage, parts); (3) you want to move inventory quickly without triggering a competitor repricer war. Lower your list price when: your item is priced above all competitors and you are getting no traffic at all, or your category buyers rarely use Best Offer (most commodity new-in-box electronics buyers just click Buy It Now). A combined approach — competitive list price via repricing plus a tight Best Offer band — captures both buyer types without sacrificing margin on either path.",
        "bullets": [
          "Best Offer: good for price-sensitive categories, slow movers, inventory clearance",
          "Price cut: better when traffic is zero and you are clearly above market",
          "Combined: reprice to competitive list, add Best Offer band 8–12% below list",
          "Undercut's floor prevents repricing from colliding with your offer thresholds"
        ]
      },
      {
        "h2": "Setting Thresholds at Scale with Undercut",
        "body": "Manually reviewing and updating Best Offer thresholds across hundreds of listings is not realistic. Undercut's floor-first repricing handles the hardest part: your per-listing cost + fees + margin floor is stored in the system and used as the repricing hard stop. This means your auto-decline threshold and your repricing floor are anchored to the same number — they cannot diverge. Free plan covers 25 listings with hourly repricing checks. Starter ($29/mo) handles 100 listings. Pro ($79/mo) scales to 1,000 listings with AI tuning and 15-minute check intervals — relevant if your Best Offer volume is high enough that 15-minute response windows matter. All accounts start with a 14-day Starter trial, no credit card required. If you have fewer than 25 listings, the Free plan is permanent — not a trial."
      }
    ],
    "faq": [
      {
        "q": "What percentage should I set for my Best Offer auto-decline threshold?",
        "a": "Do not use a percentage — use a dollar floor derived from your actual cost, eBay's 13.6% final value fee, and your minimum margin. Example: $18 cost + $6 shipping with 15% margin floor means your minimum acceptable net is about $28.24. Convert that to a pre-fee list-equivalent and set your auto-decline there. A flat percentage ignores shipping costs and per-order fees, which are fixed regardless of price and hurt disproportionately on lower-priced items."
      },
      {
        "q": "Does changing my list price in Undercut affect my existing Best Offer thresholds?",
        "a": "eBay Best Offer thresholds are stored as fixed dollar values on the listing and do not automatically adjust when your list price changes. If Undercut reprices your item down significantly, a previously safe auto-decline threshold could end up near or below your actual cost floor. The solution: set your Undercut price floor at or above your auto-decline threshold so the repricer never drops into dangerous territory."
      },
      {
        "q": "Should I enable Best Offer on every listing?",
        "a": "No. Best Offer adds friction for Buy It Now buyers in commodity categories where no one negotiates. Enable it where your category data shows buyers actually use it: collectibles, vintage items, auto parts, refurbished electronics, and slower-moving unique items. For fast-moving new-in-box commodity products, a competitive list price from repricing is cleaner. eBay's Seller Hub shows Best Offer activity rates by category — check before enabling broadly."
      },
      {
        "q": "Can I use Best Offer and Undercut's automated repricing at the same time?",
        "a": "Yes, and this is the recommended setup. Set your Undercut per-listing floor equal to or slightly above your Best Offer auto-decline threshold. Undercut keeps your list price competitive, while Best Offer captures buyers who prefer to negotiate. The two levers address different buyer behaviors simultaneously. Just make sure your floor in Undercut is set before you enable repricing — Undercut will never go below the floor you define, protecting both your margin and your offer thresholds."
      },
      {
        "q": "What happens if I set my auto-decline too high and miss sales?",
        "a": "Your auto-decline floor should equal your actual minimum profitable price — not higher. If it is too high, you will auto-decline offers that would have been profitable, and buyers move on rather than countering. Review declined offers monthly in eBay's Best Offer reports. If you are declining offers within 5–8% of your floor, consider whether your floor math is correct or whether your cost assumptions need updating."
      }
    ],
    "internalLinks": [
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to Set an eBay Price Floor"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/ebay-seller-fees-explained",
        "label": "eBay Seller Fees Explained"
      },
      {
        "href": "/guides/ebay-pricing-strategy",
        "label": "eBay Pricing Strategy Guide"
      }
    ],
    "lastUpdated": "2026-06-10",
    "leadForm": true
  },
  {
    "slug": "ebay-markdown-manager-guide",
    "collection": "guides",
    "template": "guide",
    "title": "eBay Markdown Manager: Complete Guide for Sellers — Undercut",
    "metaDescription": "Learn how eBay Markdown Manager works, its rules and limits, and when to use sale events vs. continuous repricing. Start free, no card required.",
    "h1": "eBay Markdown Manager Explained: Sale Events, Rules, and When to Use Repricing Instead",
    "eyebrow": "eBay Pricing Tools",
    "intro": "eBay Markdown Manager lets Store subscribers run time-limited sale events with visible strikethrough pricing — the kind that shows a crossed-out original price next to the sale price. It's a legitimate promotional tool, but it operates under strict rules: minimum listing age, cooldown periods between events, and a structure that treats price cuts as events rather than ongoing strategy. This guide explains exactly how Markdown Manager works, what it can and cannot do, and why some sellers pair it with a continuous repricer like Undercut instead of choosing one or the other.",
    "sections": [
      {
        "h2": "What Is eBay Markdown Manager?",
        "body": "Markdown Manager is a feature exclusive to eBay Store subscribers (Basic, Premium, Anchor, or Enterprise). It lets you create sale events that display strikethrough pricing on your listings — the original price appears crossed out, and the sale price shows in red or bold alongside it. This visual signal is proven to lift click-through rates because buyers perceive an explicit discount. You access it through the Seller Hub Promotions tab or the older Markdown Manager tool under the Marketing menu. You can apply markdowns to individual listings, entire categories within your store, or your whole inventory at once. The discount can be set as a percentage off or a fixed dollar amount, and the event runs for a defined window — typically 1 to 14 days depending on your plan."
      },
      {
        "h2": "Rules and Limits You Must Follow",
        "body": "eBay enforces several rules to prevent abuse of strikethrough pricing:",
        "bullets": [
          "Minimum listing age: A listing must be active for at least 14 days before it qualifies for a markdown event. New listings cannot immediately show a strikethrough price.",
          "Cooldown between events: After a markdown event ends on a listing, you must wait at least 30 days before running another markdown on the same listing.",
          "Duration limits: Individual sale events can run from 1 day up to 14 days. You cannot run a continuous or indefinite markdown.",
          "Discount floor: Markdowns must reduce the price by at least 5% from the pre-event price.",
          "Store subscription required: Markdown Manager is not available on a basic eBay account without a Store subscription. Basic Store costs around $21.95/month, Premium around $59.95/month.",
          "Price manipulation risk: eBay monitors for artificial inflation of the original price before creating a markdown. Using Markdown Manager correctly means the pre-event price must reflect genuine prior pricing."
        ]
      },
      {
        "h2": "How Strikethrough Pricing Works in Practice",
        "body": "When you create a markdown event, eBay records the listing's price at the moment the event starts as the 'was' price. That figure appears crossed out on the listing page and in search results during the event window. For example, if you have a listing at $45.00 for at least 14 days, you can run a 20% markdown event and buyers see $45.00 crossed out next to $36.00. The visual impact is strongest in search results where the red sale price stands out against competitors with no strikethrough. After the event ends, the listing reverts to its pre-markdown price automatically. If you manually changed the price during the event, behavior can vary, which is one reason sellers using a repricer need to coordinate carefully — a repricer moving the price during an active markdown can interfere with how eBay displays the strikethrough."
      },
      {
        "h2": "Markdown Events vs. Continuous Repricing: When Each Is Right",
        "body": "Markdown Manager and automated repricing solve different problems. Markdown events are promotional — you use them to create urgency, clear slow inventory, or boost visibility during peak buying periods like holidays or clearance cycles. They are time-boxed by design and rely on the psychological effect of a visible discount. Continuous repricing, by contrast, is a process that runs 24/7 to keep your prices competitive against other active sellers. Undercut checks competitor prices on an interval (every hour on Free, every 15 minutes on Pro) and adjusts your price to beat the lowest competitor, but never below your hard floor. These tools are not mutually exclusive. A common pattern: use repricing to stay competitive day-to-day, then pause repricing on targeted listings and run a Markdown Manager event during a clearance push. After the event ends, re-enable repricing. The key distinction is that markdowns are events and repricing is a process — they operate on different timescales and serve different goals."
      },
      {
        "h2": "When Automated Repricing Is a Better Fit Than Markdowns",
        "body": "Markdown Manager requires manual setup for each event cycle, is restricted to Store subscribers, and has a 30-day cooldown that makes it impractical as a day-to-day pricing mechanism. If you are selling in competitive categories where prices shift daily — electronics, collectibles, used goods, media — a continuous repricer handles what Markdown Manager cannot. Undercut's floor-first design means you set a hard minimum (cost + eBay fees + target margin) per listing, and the repricer works within that boundary automatically. At 13.6% final value fee plus a $0.30–$0.40 per-order fee on most categories, margin erosion is real if you reprice without a floor. The Free plan covers 25 listings with hourly checks at $0/month — no card required. The Starter plan at $29/month covers 100 listings. Markdown Manager can complement this workflow but should not be the primary mechanism for staying price-competitive in fast-moving categories."
      }
    ],
    "faq": [
      {
        "q": "Do I need an eBay Store to use Markdown Manager?",
        "a": "Yes. Markdown Manager is only available to sellers with an active eBay Store subscription at any tier — Basic ($21.95/month), Premium ($59.95/month), Anchor, or Enterprise. If you do not have a Store, you cannot create markdown sale events with strikethrough pricing. Sellers without a Store can still lower prices manually or use an automated repricer like Undercut, which does not require a Store subscription."
      },
      {
        "q": "Why won't my listing qualify for a markdown event?",
        "a": "The most common reason is the 14-day minimum listing age requirement. A listing must have been active for at least 14 consecutive days before eBay will allow a markdown event on it. The second most common reason is the 30-day cooldown: if the listing recently finished a markdown event, you must wait 30 days before starting another. Check the listing's event history in Seller Hub Promotions to confirm which rule applies."
      },
      {
        "q": "Can I run Markdown Manager and an automated repricer at the same time?",
        "a": "You can, but you should pause repricing on any listing that has an active markdown event. If the repricer adjusts the price during an active event, it can affect the strikethrough display or cause eBay to recalculate the 'was' price in unexpected ways. The cleanest workflow is to exclude markdown-event listings from your repricer's active queue during the event window, then re-enable them once the event ends and the listing reverts to its base price."
      },
      {
        "q": "Is Markdown Manager the same as reducing a listing price manually?",
        "a": "No. Manually lowering a price does not trigger strikethrough pricing in search results — buyers just see the new lower price with no visual comparison to the old price. Markdown Manager specifically creates the crossed-out original price display, which has a measurably different psychological effect on buyers. If your goal is simply to stay price-competitive rather than signal a promotional event, manual price changes or continuous repricing are more efficient than managing markdown event schedules."
      },
      {
        "q": "How does Undercut protect my margin when repricing aggressively?",
        "a": "Every listing in Undercut has a hard floor you define — typically cost plus eBay's ~13.6% final value fee plus a target margin percentage. The repricer will beat the lowest competitor price, but it will never move the price below that floor regardless of what competitors do. This means you can reprice aggressively in competitive categories without the risk of selling below cost during a price war or when a competitor lists at an unsustainably low price."
      }
    ],
    "internalLinks": [
      {
        "href": "/guides/manual-vs-automated-repricing",
        "label": "Manual vs. Automated Repricing on eBay"
      },
      {
        "href": "/guides/ebay-pricing-strategy",
        "label": "eBay Pricing Strategy Guide"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "How to Reprice Without Losing Margin"
      },
      {
        "href": "/guides/ebay-seller-fees-explained",
        "label": "eBay Seller Fees Explained"
      }
    ],
    "lastUpdated": "2026-06-10",
    "leadForm": true
  },
  {
    "slug": "lower-price-without-ending-listing",
    "collection": "guides",
    "template": "guide",
    "title": "How to Lower Your eBay Price Without Ending the Listing — Undercut",
    "metaDescription": "Lower an eBay listing price without ending it—keep your sales history and Best Match rank intact. Free repricer trial, no card required.",
    "h1": "Lower Your eBay Price Without Ending the Listing (And Keep Your Rank)",
    "eyebrow": "eBay Pricing Guide",
    "intro": "Ending an eBay listing to relist at a lower price is one of the most common seller mistakes. It wipes your sales history, resets your Best Match signals, and can bury a listing that was gaining traction. You don't need to end it. eBay lets you revise a live listing's price in seconds—and if you're managing dozens or hundreds of SKUs, bulk edits and automated repricers let you do it at scale without touching each listing individually. This guide covers every method, when each one makes sense, and how to stay above your profit floor no matter how low competitors push.",
    "sections": [
      {
        "h2": "Why Ending a Listing to Relist Hurts Your Sales",
        "body": "When you end and relist, eBay treats it as a brand-new item. You lose accumulated watchers, any bid history on auction-style listings, and—critically—the transaction count and positive feedback signals that feed Best Match's ranking algorithm. Best Match rewards listings with a proven conversion record. A listing with 15 sales and a strong click-through rate ranks higher than an identical item relisted at zero. eBay's own seller guidance confirms that revising an active listing preserves all of this history. For competitive categories where dozens of sellers stock the same SKU, throwing away that history to save a dollar on a price change is a losing trade every time."
      },
      {
        "h2": "The Revise Listing Flow: Step-by-Step",
        "body": "To lower the price on a single live listing without ending it: go to My eBay → Selling → Active listings, find the item, click the dropdown arrow next to it, and select 'Revise.' On the revision page, scroll to the pricing section and update the Buy It Now price or starting bid directly. Save the revision. The listing ID, sales history, and watcher count stay intact. One constraint worth knowing: eBay restricts certain revisions once a listing has bids or is within 12 hours of ending on auction-style formats. Fixed-price (Buy It Now) listings have far fewer restrictions—you can revise the price at any point, including with active watchers. Most repricers operate on fixed-price inventory for exactly this reason."
      },
      {
        "h2": "Bulk Price Edits: Changing Many Prices at Once",
        "body": "For stores with more than a handful of listings, revising one at a time is impractical. eBay offers two native bulk tools. First, the Seller Hub bulk edit: in Active Listings, check multiple items, click 'Edit,' choose 'Price,' and apply a fixed amount or percentage change across all selected listings. This works for up to a few hundred listings at once. Second, eBay's File Exchange / bulk upload method: export your active listings to a spreadsheet, update the price column, and re-upload. Changes apply without ending the listings. Both approaches still preserve sales history because you're revising, not relisting. The downside is that bulk edits are manual snapshots in time—you do the work, prices go stale, and you repeat the cycle every time a competitor moves."
      },
      {
        "h2": "Markdown Manager vs. Direct Price Revision",
        "body": "eBay's Markdown Manager (available to sellers meeting minimum sales thresholds) lets you schedule sale events that display a strikethrough original price alongside the discounted price. It looks compelling to buyers and can lift conversion rates. But it's a separate mechanism from simply revising the listing price. Markdown events run for a defined window (minimum 1 day, maximum 14 days), after which the price reverts. If your goal is to permanently match a competitor at a lower price, direct revision is cleaner—Markdown Manager is better suited to timed promotions. Also note: eBay enforces a 30-day restriction on Markdown Manager for items that were already discounted recently, so it can't be used as a continuous repricing tool."
      },
      {
        "h2": "Automating Price Revisions With a Repricer",
        "body": "Manual revision works for a few listings. At 50, 100, or 1,000 SKUs, you need automation. A repricer like Undercut monitors competitor prices continuously and submits revisions through eBay's API—the same revision mechanism you use manually, just executed automatically. Because it's revising rather than relisting, all sales history stays intact. Undercut's Pro plan checks prices every 15 minutes across up to 1,000 listings; the free plan covers 25 listings on an hourly cadence. Every rule requires a hard floor (your cost + eBay's ~13.6% final value fee + minimum margin), so the repricer never revises a price below the number that would make the sale unprofitable. You set the floor once per item; Undercut handles every price move after that. There's a 14-day Starter trial with no card required."
      },
      {
        "h2": "Setting a Price Floor Before You Drop Prices",
        "body": "Before you lower any price—manually or automatically—you need to know your break-even point. For most eBay categories, total selling cost is roughly 13.6% final value fee on item + shipping + tax, plus a per-order fee of $0.30 (standard) or $0.40 (below standard or certain categories), plus your actual cost of goods, plus shipping cost if you offer free shipping. On a $40 item with $6 shipping and $5 COGS, that's approximately $40 × 13.6% = $5.44 FVF + $0.30 order fee + $5 COGS + $6 shipping = $16.74 in costs. Your floor is $16.74. Any revision above that is profitable; below it you're paying to sell. Undercut enforces this floor at the item level—you input cost and minimum margin, and the repricer will hold the price at the floor rather than chase a competitor below it."
      }
    ],
    "faq": [
      {
        "q": "Does revising a listing price affect its Best Match ranking?",
        "a": "A price revision itself does not reset Best Match signals. Your sales count, click-through rate, and conversion history all carry over. In fact, lowering a price through revision can improve Best Match performance if the new price improves your conversion rate—eBay's algorithm rewards listings that sell. What kills Best Match rank is ending and relisting, which resets the listing to zero history."
      },
      {
        "q": "Can I revise the price on a listing that already has watchers?",
        "a": "Yes. Fixed-price (Buy It Now) listings can be revised at any time regardless of how many watchers they have. eBay may notify watchers of a price drop, which can actually trigger purchases from buyers who were on the fence. Auction-style listings with active bids have more restrictions—you generally cannot lower the starting price once bids are placed, though you can add a Buy It Now price if none exists."
      },
      {
        "q": "How is a repricer different from just using eBay's bulk edit tool?",
        "a": "eBay's bulk edit is a one-time manual action—you pick a moment, apply a change, and walk away. Competitor prices keep moving after you close the browser. A repricer monitors prices continuously and submits revisions automatically whenever a competitor undercuts you. Undercut's Pro plan checks every 15 minutes. For sellers in fast-moving categories, a 15-minute response time versus a multi-hour manual update window is the difference between winning and losing the sale."
      },
      {
        "q": "Will Undercut ever lower my price below what I can afford?",
        "a": "No. Every listing in Undercut requires a hard floor before repricing activates. You enter your item cost and minimum acceptable margin; Undercut calculates the floor including eBay's ~13.6% final value fee and per-order fees. If the lowest competitor price would push you below that floor, Undercut holds your price at the floor rather than matching. You will not win every race to the bottom—and that is by design."
      },
      {
        "q": "Is Undercut a good fit if I only have a few listings?",
        "a": "Yes. The Free plan covers 25 listings at no cost—no card, no trial expiry. It checks prices hourly, which is sufficient for most low-volume sellers. If you grow past 25 listings or want 15-minute repricing, the Starter plan is $29 per month (100 listings). A 14-day Starter trial starts automatically on every new account so you can test the faster cadence before deciding."
      }
    ],
    "internalLinks": [
      {
        "href": "/guides/manual-vs-automated-repricing",
        "label": "Manual vs. Automated Repricing: Which Is Right for You?"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to Set a Price Floor on eBay"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/guides/ebay-repricing-best-practices",
        "label": "eBay Repricing Best Practices"
      }
    ],
    "lastUpdated": "2026-06-10",
    "leadForm": true
  },
  {
    "slug": "promoted-listings-vs-lowering-price",
    "collection": "guides",
    "template": "guide",
    "title": "Promoted Listings vs Lowering Price on eBay — Undercut",
    "metaDescription": "See the real profit math: a 5% ad rate vs a 5% price cut hit your margin differently. Learn when to run ads, when to reprice, and how to stack both free.",
    "h1": "Promoted Listings vs Lowering Your Price: Which Actually Wins?",
    "eyebrow": "eBay Pricing Strategy",
    "intro": "eBay gives you two levers when sales stall: run a Promoted Listings campaign or cut your price. They look symmetrical — both cost roughly the same percentage — but they hit your margin in completely different ways. A 5% ad rate and a 5% price cut are not the same trade. One is a conditional cost you pay only on a sale; the other is a permanent margin reduction on every future sale regardless of where the buyer found you. This guide works through the math on both, shows when each lever is the right tool, and explains how Undercut's floor-first repricing keeps you from accidentally over-cutting.",
    "sections": [
      {
        "h2": "The Core Math: 5% Ad Rate vs 5% Price Cut",
        "body": "Start with a $40 item in a typical category. eBay's final value fee is roughly 13.6% of the total amount (item + shipping + tax), plus a $0.35 per-order fee. Assume free shipping and no tax for simplicity.\n\nScenario A — Promoted Listings at 5%: You pay the 13.6% FVF ($5.44) plus a 5% ad fee ($2.00) only when the buyer clicks your promoted placement. Total platform take: $7.79. You collect $32.21 before COGS.\n\nScenario B — Price cut to $38 (5% off): You now pay 13.6% on $38 ($5.17) plus the $0.35 order fee. Total platform take: $5.52. You collect $32.48 before COGS — but your listed price is now permanently lower, every buyer sees it, and it anchors future price expectations downward.\n\nThe gap is only $0.27 here, but the structural difference matters: the ad cost is conditional and reversible. The price cut is immediate and visible to all buyers and competitors."
      },
      {
        "h2": "When Visibility Is the Problem (Use Promoted Listings)",
        "body": "Promoted Listings make sense when your item is priced competitively but buried in search results. Signs that visibility is your bottleneck: high impressions, low click-through rate in Seller Hub; the item is in a saturated category with many near-identical listings; your sell-through rate is low despite your price already matching or beating the buy-box.\n\nIn these situations, cutting price does almost nothing — you are already price-competitive, and buyers simply are not seeing your listing. Adding a 3-8% promoted ad rate buys guaranteed above-the-fold placement. eBay only charges the ad fee when someone clicks your promoted slot, so if the campaign does not perform, your cost is zero.\n\nOne practical rule: if your impressions-to-click ratio is worse than 1-in-50 and you are in the bottom half of search results, test a promoted campaign before touching your price.",
        "bullets": [
          "High impressions, low clicks = visibility problem, not price problem",
          "Use Promoted Listings when you match the buy-box price but rank poorly",
          "Ad fee is conditional: zero cost if buyer does not click your ad",
          "Start at the category suggested rate; raise by 1% increments until CTR improves"
        ]
      },
      {
        "h2": "When Price Is the Problem (Use Repricing)",
        "body": "Price is the bottleneck when buyers are landing on your listing but not purchasing, or when competitors are consistently undercutting you by more than a rounding-error margin. Signs: decent click-through rate but low conversion; your price is visibly higher than the top-seller on the same item; you are losing the buy-box on multi-seller listings.\n\nHere, a Promoted Listings campaign amplifies the problem — you spend money bringing buyers to a listing they still reject on price. The right fix is to reprice down to the competitive level.\n\nThe risk of manual price-cutting is cutting too far and destroying margin. This is exactly what a floor-based repricer like Undercut prevents: you set a hard floor equal to your cost plus the full eBay fee stack plus your minimum acceptable margin, and the repricer beats competitors automatically without ever crossing that floor. You get the price advantage without the guesswork.",
        "bullets": [
          "Good clicks, poor conversion = price problem, not visibility problem",
          "Promoted Listings on an overpriced item wastes the ad budget",
          "Set a hard cost floor before running any repricing to prevent margin erosion",
          "Undercut beats the lowest competitor automatically, 24/7, never below your floor"
        ]
      },
      {
        "h2": "Combining Both: The Stack That Works",
        "body": "The highest-performing eBay sellers often run both simultaneously, but in sequence, not in parallel from day one. The recommended approach: first, reprice to a competitive level using a floor-based tool so your price is already correct. Then layer on a modest Promoted Listings rate (3-5%) to capture placement above organically priced competitors.\n\nWhen you combine them, model the full all-in fee stack before setting your floor: 13.6% FVF + $0.35 order fee + your promoted ad rate + shipping cost + COGS. On a $40 item with 5% ads, free shipping, and $18 COGS, that stack looks like: $5.44 FVF + $0.35 order + $2.00 ad fee + $18.00 COGS = $25.79 total out. Gross profit: $14.21, a 35.5% margin. If you cut price to $36 without adjusting the ad rate, that same stack yields $11.57 gross — an 18% margin collapse from a 10% price reduction.\n\nThe lesson: model the full stack before adjusting either lever. Undercut's profit calculator helps verify the floor before you set it.",
        "bullets": [
          "Reprice to competitive level first; add Promoted Listings second",
          "Full stack: FVF 13.6% + $0.35 order fee + ad rate + shipping + COGS",
          "A 10% price cut with a 5% ad rate still running can collapse margin by 18%+",
          "Adjust your floor in Undercut whenever you change your promoted ad rate"
        ]
      },
      {
        "h2": "All-In eBay Fee Stack: What You're Actually Paying",
        "body": "Most sellers underestimate eBay's total take because they only count the headline FVF. The full stack for a typical transaction includes: final value fee (13.6% in most categories, applied to item price + shipping + applicable tax collected), a per-order processing fee ($0.30 for most sellers, $0.40 in certain categories), any Promoted Listings ad rate you set (0-100% of FVF equivalent, charged as a percentage of total sale amount), plus payment processing which eBay now bundles into the FVF.\n\nExample: $50 item, free shipping, 5% promoted rate. FVF: $6.80. Order fee: $0.35. Ad fee: $2.50. Total to eBay: $9.65 — that is 19.3% of your sale price before you count a single dollar of COGS or shipping label cost. Sellers who set a floor only against the 13.6% FVF are routinely selling below their real cost. Undercut's floor calculation accounts for the full stack so this cannot happen silently."
      }
    ],
    "faq": [
      {
        "q": "Does eBay charge the Promoted Listings fee even if the buyer finds me organically?",
        "a": "No. eBay only charges the promoted ad fee when a buyer clicks your specifically promoted placement and then completes a purchase. If a buyer finds your listing through organic search and buys, you pay only the standard final value fee and order fee — no ad rate. This conditional structure is what makes Promoted Listings fundamentally different from a price cut, which affects every sale regardless of how the buyer arrived."
      },
      {
        "q": "If I lower my price, will eBay automatically give me better search placement?",
        "a": "Partially. eBay's Cassini algorithm does factor price competitiveness into ranking, so cutting to the lowest price in a competitive set can improve organic placement. However, the effect is gradual and not guaranteed. If your listing has poor sales history or low seller metrics, Cassini may still rank you below higher-priced sellers with stronger metrics. Price is one signal among many — visibility tools like Promoted Listings target placement more directly and immediately."
      },
      {
        "q": "What promoted ad rate should I start with?",
        "a": "eBay suggests a 'trending rate' per category in your Seller Hub, typically 5-15% in competitive categories. Start at or just above the trending rate for guaranteed premium placement. Then track your campaign's impressions-to-sale conversion over 14 days. If conversion is strong, hold or lower the rate slightly to improve margin. If impressions are high but clicks are low, the rate is not your problem — your title, image, or price may need work first."
      },
      {
        "q": "How does Undercut make sure I don't cut price below my total cost when Promoted Listings are also running?",
        "a": "Undercut lets you set a per-listing hard floor — a minimum price that accounts for your full cost stack. Before setting that floor, you should include your COGS, eBay's 13.6% FVF, the per-order fee, your current promoted ad rate, and any shipping cost. Once the floor is set, Undercut's repricer will beat competitors automatically but will never move your price below that number, regardless of how aggressively others undercut. Every account gets a free 14-day Starter trial — no card required — to set floors and test the logic."
      },
      {
        "q": "Can running Promoted Listings and lowering my price at the same time hurt me?",
        "a": "Yes, if done without recalculating your margin first. The ad rate is a percentage of the sale amount, so a lower price reduces the absolute ad cost slightly — but your margin shrinks faster than the ad cost does. The worst outcome is paying for promoted placement to drive traffic to a listing where you are already selling below your real cost. Always recalculate your full all-in fee stack before making both changes simultaneously, and update your Undercut floor to match."
      }
    ],
    "internalLinks": [
      {
        "href": "/guides/ebay-seller-fees-explained",
        "label": "eBay Seller Fees Explained"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/ebay-pricing-strategy",
        "label": "eBay Pricing Strategy Guide"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost"
      }
    ],
    "lastUpdated": "2026-06-10",
    "leadForm": true
  },
  {
    "slug": "when-to-lower-ebay-price",
    "collection": "guides",
    "template": "guide",
    "title": "When to Lower Your eBay Price (And When Not To) — Undercut",
    "metaDescription": "Know exactly when to cut your eBay price and when to hold. Data-driven signals, a decision checklist, and a free repricer—no card required to start.",
    "h1": "eBay Price Cuts: The Signals That Tell You When (and When Not) to Drop",
    "eyebrow": "Pricing Strategy",
    "intro": "Dropping your price too soon destroys margin. Waiting too long means stale inventory eating into storage and opportunity costs. The right call depends on five concrete signals: watcher count relative to sales, sell-through rate trends, competitor undercutting, seasonal demand decay, and the carrying cost of aging stock. This guide walks through each signal with actionable thresholds, then covers the three situations where lowering your price is the wrong move—and closes with a decision checklist you can run in under two minutes.",
    "sections": [
      {
        "h2": "Signal 1: Watchers But No Sales",
        "body": "If a listing has 8 or more watchers but zero sales in 14 days, buyers are comparison-shopping and finding a better price elsewhere. Watchers signal genuine demand—someone added your item to their watch list—but the purchase barrier is price. A useful threshold: if your watcher-to-sale conversion rate drops below 1 sale per 10 watchers over a 30-day window, your price is above market. Drop 3–5% and monitor for 72 hours. If watchers convert within that window, you've found the clearing price. If not, repeat. One caveat: a spike in watchers right before a major holiday can be pre-purchase intent—wait 48 hours before reacting."
      },
      {
        "h2": "Signal 2: Falling Sell-Through Rate",
        "body": "Sell-through rate (STR) is the percentage of your active listings that sell within a set period—typically 30 days. A healthy STR varies by category: electronics often run 40–60%, while collectibles may sit at 10–20%. The signal to act is a downward trend, not just a low absolute number. If your STR drops more than 15 percentage points over two consecutive 30-day periods, the market is moving against you. Check whether the entire category is softening (check eBay's marketplace data or use the eBay Price Checker) or if competitors have aggressively undercut. Category-wide softness calls for patience or a modest 5% cut; competitive undercutting calls for a faster, automated response."
      },
      {
        "h2": "Signal 3: Competitors Have Undercut You",
        "body": "When a competitor lists the same item at a price below yours and has stronger feedback (e.g., 98%+ vs your 96%), you are functionally invisible in Best Match sorting. eBay's algorithm weighs price and seller metrics together, so even a $1–2 gap can shift the Buy Box equivalent. The right response depends on margin. Calculate your floor first: item cost + eBay fees (roughly 13.6% on item price plus shipping and tax, plus a $0.30–$0.40 per-order fee) + target margin. If beating the competitor keeps you above your floor, drop to $0.01 below their price and hold. If it doesn't, hold your price—you cannot profitably compete on this item at this moment."
      },
      {
        "h2": "Signal 4: Seasonal Decay and Aging Inventory Cost",
        "body": "Seasonal items lose value quickly once peak demand passes. Holiday decorations, summer sporting goods, tax-prep software—these all have demand cliffs. If you're 3 weeks past peak season and the item is unsold, every additional week costs you: capital tied up, potential storage fees, and a lower clearing price if you wait. A practical rule: after the seasonal peak passes, reduce price 10% at week 3, another 10% at week 6, and reassess at week 9 whether to liquidate or hold for next season. For evergreen items, aging inventory beyond 90 days with no sale and no price change is usually a pricing problem. Run the eBay Profit Calculator to find the lowest price that still clears your cost and fees before marking down."
      },
      {
        "h2": "When NOT to Lower Your eBay Price",
        "body": "Three situations where a price cut is the wrong move:",
        "bullets": [
          "Below your floor: Never drop below cost + fees + minimum margin. If matching the lowest competitor means selling at a loss, hold your price or delist. Undercut enforces this automatically via a per-listing hard floor.",
          "Unique or rare items: One-of-a-kind, graded, or highly differentiated items don't compete on price the same way commodity items do. Watchers on a rare item often mean buyers are watching to see if you'll lower—hold firm or auction instead.",
          "Temporary competitor stockouts: If a competitor just sold out and their listing disappeared, your higher price may clear naturally within days. Check their listing history before reacting to a sudden absence in search results.",
          "End-of-quarter dumping pressure: If you feel urgency to clear inventory for accounting reasons, make sure a price cut is actually necessary—sometimes relisting with better photos and keywords moves the item without sacrificing margin."
        ]
      },
      {
        "h2": "Decision Checklist: Should You Lower the Price Right Now?",
        "body": "Run through these five questions before changing any price:",
        "bullets": [
          "Is the new price above my floor (cost + ~13.6% eBay fees + $0.30–$0.40 order fee + target margin)? If no, stop.",
          "Do I have 8+ watchers with zero conversions in the past 14 days? If yes, try a 3–5% drop.",
          "Has my sell-through rate dropped 15+ points over two consecutive 30-day periods? If yes, investigate whether to cut 5–10%.",
          "Is a competitor listing the identical item at a lower price with equal or better feedback? If yes and you have margin room, drop to $0.01 below them.",
          "Is the item seasonal and 3+ weeks past peak, or evergreen and unsold for 90+ days? If yes, apply the 10% decay schedule or calculate a liquidation price."
        ]
      },
      {
        "h2": "Automate the Decision With a Price Floor",
        "body": "Running this checklist manually across dozens or hundreds of listings is unsustainable. Automated repricing tools like Undercut watch competitor prices around the clock and apply your rules instantly—without ever breaching your floor. Undercut's Free plan handles 25 listings with hourly checks at no cost, no card required. The Starter plan ($29/month) covers 100 listings. Pro ($79/month) adds AI tuning and 15-minute repricing intervals for faster markets. Scale ($199/month) handles up to 10,000 listings. Every new account starts on a 14-day Starter trial—free, no card—so you can test the floor-first logic on your real inventory before committing. Annual billing saves the equivalent of two months on every plan."
      }
    ],
    "faq": [
      {
        "q": "How many watchers on an eBay listing means I should lower the price?",
        "a": "A rough threshold is 8 or more watchers with zero sales over 14 days. This combination signals buyers are interested but choosing a lower-priced alternative. Drop 3–5% and monitor conversions for 72 hours. If no sale follows, drop again by the same amount. The watcher-to-sale ratio matters more than the raw watcher count—if you're converting 1 in 10 or fewer, your price is above the market clearing point."
      },
      {
        "q": "What eBay fees should I factor in before deciding to lower my price?",
        "a": "Most eBay categories charge approximately 13.6% as a final value fee applied to the total amount the buyer pays—item price plus shipping plus tax. You also pay a per-order fee of $0.30 or $0.40 depending on your store subscription. These fees come off the top before you see revenue, so your break-even price is higher than your item cost alone. Use the eBay Profit Calculator to model the exact floor before you drop any price."
      },
      {
        "q": "Should I lower my eBay price if a competitor is temporarily out of stock?",
        "a": "Generally no. When a competitor sells out, their listing disappears from search results, which means buyers see your listing first and may purchase at your current price without needing a discount. Check the competitor's listing history to confirm it's a true stockout versus a permanent exit. Wait at least 48–72 hours before reacting. If they restock quickly at a lower price, then apply your normal competitive repricing rules."
      },
      {
        "q": "How do I avoid a price war where I keep cutting until I'm selling at a loss?",
        "a": "Set a hard floor per listing before you start repricing. Your floor is the minimum price at which the item is still profitable: item cost plus eBay fees (roughly 13.6% plus the per-order fee) plus your minimum acceptable margin. Undercut's repricing engine enforces this floor on every adjustment—it will never drop a listing below the floor you set, even if the lowest competitor goes below it. That's how you compete aggressively without accidentally selling at a loss."
      },
      {
        "q": "When should I raise my eBay price instead of lowering it?",
        "a": "Raise your price when competitors sell out and demand remains, when your sell-through rate is above 70% (you may be underpricing), or when you're consistently the lowest active seller with no competitive pressure. Rapid sales after a recent price cut also signal room to test a higher price. Automated repricing tools typically focus on lowering prices, but setting your floor close to your current price during low-competition periods effectively holds your price without manual intervention."
      }
    ],
    "internalLinks": [
      {
        "href": "/guides/ebay-pricing-strategy",
        "label": "eBay Pricing Strategy Guide"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to Set an eBay Price Floor"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/free-ebay-repricer",
        "label": "Free eBay Repricer"
      }
    ],
    "lastUpdated": "2026-06-10",
    "leadForm": true
  },
  {
    "slug": "ebay-repricing-for-sneakers",
    "collection": "guides",
    "template": "guide",
    "title": "eBay Repricing for Sneakers & Streetwear Resellers — Undercut",
    "metaDescription": "Set hard floors and the right repricing aggressiveness for sneaker and streetwear flips where comps swing on hype. Start a 14-day no-card trial.",
    "h1": "How to Reprice Sneakers and Streetwear on eBay Without Torching Your Margin",
    "eyebrow": "Guide",
    "intro": "Sneakers and streetwear are the most volatile category most eBay resellers will ever touch. A hyped release can trade at triple retail on drop day and sag back toward retail two weeks later, while a quiet colorway barely moves for months. Repricing by hand in that environment is a losing game — you are either overpriced and invisible, or chasing a falling market and giving away margin on every pair. The fix is automated repricing anchored to a hard floor for each listing, so you follow the market down to a win but never let a $120 pair go for $90 just to beat someone who mispriced theirs.",
    "sections": [
      {
        "h2": "Why Sneaker and Streetwear Repricing Is Its Own Beast",
        "body": "Most eBay categories move slowly. Sneakers do not. Prices spin around release hype, restock rumors, and influencer moments, and a single StockX dip can drag the whole eBay comp set down within hours. On top of that, condition is everything: a deadstock (DS) pair and a visibly worn pair of the same SKU are effectively two different products with two different floors. If your repricing treats them the same, you will either underprice your DS pairs or fail to move your used inventory before it depreciates further. A repricer that beats the lowest live competitor while respecting a per-listing hard floor lets you stay competitive on the pairs worth winning without racing a mispriced seller to the bottom.",
        "bullets": [
          "Hyped releases can swing 20-40% within a single news or restock cycle",
          "Deadstock, VNDS, and used pairs of the same SKU need separate floors",
          "Cross-platform comps (StockX, GOAT) pull eBay prices down faster than most sellers check them",
          "Aging hype stock loses value every week — a floor keeps you honest about when to cut a pair loose"
        ]
      },
      {
        "h2": "Calculating a Hard Floor for a Sneaker Listing",
        "body": "Your floor is the lowest price at which selling the pair is still worth it after every cost. For sneakers, that means cost of goods, shipping (double-boxing and a heavier label than most categories), eBay's final value fee, and your minimum acceptable margin. Here is a worked example for a popular Jordan retail pickup:\n\nCost of goods: $120.00\nShipping (box-in-box + label): $12.00\neBay final value fee: 13.6%\nMinimum margin target: 12%\n\nFloor = (Cost + Shipping) / (1 - FVF% - Margin%) = (120 + 12) / (1 - 0.136 - 0.12) = 132 / 0.744 = $177.42\n\nRound up to $177.99 and that is your hard floor. Undercut will reprice that listing down to beat the lowest competitor, but it will never cross $177.99 chasing a sale. You win the pair at a profit or you let it sit — you never sell at a loss.",
        "bullets": [
          "Always use real double-boxed shipping cost — sneaker packaging is heavier than it looks",
          "Use eBay's current final value fee for the sneakers category, not a blended guess",
          "Add a buffer for returns and 'not as described' claims, which run high in sneakers",
          "Re-check floors as the resale market and your replacement cost move"
        ]
      },
      {
        "h2": "Setting Aggressiveness: Drop-Day Hype vs. Aging Stock",
        "body": "Not every pair should chase the floor at the same speed. A brand-new hyped release with deep demand should hold near market — dropping fast only trains buyers to wait you out and leaves money on the table. A pair that has sat 60 days while three other sellers undercut each other is the opposite case: you want to be at or near your floor quickly to move it before the hype fully decays. Undercut's AI aggressiveness tuning (Pro and Scale) lets you configure, per listing, how quickly and how far each one moves toward its floor — for example, set an aging pair to move aggressively while a hyped deadstock pair stays conservative. That way one inventory of wildly different demand curves does not get one blunt repricing behavior."
      },
      {
        "h2": "Condition Tiers: Why One Floor Never Fits DS, VNDS, and Used",
        "body": "The single biggest margin leak in sneaker repricing is applying one floor across condition tiers. A deadstock pair, a 'very near deadstock' (VNDS) pair, and a used pair carry different costs, different buyer expectations, and different acceptable margins. The right approach is to compute a separate floor for each listing using the same formula, then let the repricer compete only against genuinely comparable listings. A used pair priced against deadstock comps will look overpriced and never sell; a deadstock pair floored like a used pair will sell instantly and burn your margin. Treat each condition as its own product, set its own floor, and let automation hold the line on all of them at once.",
        "bullets": [
          "Compute a distinct floor per condition tier, not one floor per SKU",
          "Match each listing against comparable-condition competitors where possible",
          "Set each listing's aggressiveness to match its condition — aggressive on used, conservative on deadstock",
          "Liquidate the lowest tier first when storage or cash flow is tight"
        ]
      },
      {
        "h2": "Repricing Frequency for Release-Day Volatility",
        "body": "On a normal day, repricing once or twice is fine. On a release or restock day, the comp set can move every few minutes, and the seller who is consistently one position too high simply does not get the sale. The faster your repricing cycle, the more time your listing spends at the top of search while the market churns. Undercut's Pro and Scale plans both reprice every 15 minutes — for sellers moving real volume around drops, that cadence is the difference between catching the wave and watching it pass. Scale adds capacity (up to 10,000 listings) and priority support on the same 15-minute cycle for sellers running large catalogs through those drops. If you are just starting, the free plan (25 listings, repriced multiple times daily) is enough to learn the floor-first workflow on a single model before you scale up."
      }
    ],
    "faq": [
      {
        "q": "Should I reprice deadstock and used pairs of the same shoe the same way?",
        "a": "No. Deadstock and used pairs are effectively different products with different costs, buyer expectations, and acceptable margins. Give each listing its own hard floor and, on Pro and Scale, its own aggressiveness setting so used stock can liquidate while deadstock holds near market."
      },
      {
        "q": "How low should my floor be on a hyped release?",
        "a": "Your floor should equal the lowest price that still clears your cost of goods, double-boxed shipping, eBay's final value fee, and your minimum margin. On a hyped pair you will rarely hit the floor, but it protects you on the day the hype breaks and comps fall fast."
      },
      {
        "q": "Can Undercut handle size-run listings where each size has a different cost?",
        "a": "Yes. Each listing carries its own floor, so a size you paid more for can be floored higher than a common size. Set the floor per listing and the repricer respects it independently while still beating the lowest comparable competitor."
      },
      {
        "q": "Will automated repricing make it look like I'm dumping pairs?",
        "a": "Not if your floor is set correctly. Undercut only undercuts the live competitor low and stops at your floor — it never spirals to the bottom. Buyers see a competitive price; you keep your margin intact on every sale."
      },
      {
        "q": "Is the free plan enough to test this on my sneaker inventory?",
        "a": "For most resellers, yes, to start. The free plan covers 25 listings repriced multiple times daily, which is enough to prove the floor-first workflow on a focused set of pairs before moving to Starter or Pro for more listings and faster cycles."
      }
    ],
    "cta": {
      "heading": "Reprice your sneakers without selling below cost",
      "sub": "Set a hard floor on every pair and let Undercut win the sale for you — start a 14-day no-card trial."
    },
    "internalLinks": [
      {
        "href": "/repricers/sneakers",
        "label": "Undercut's eBay sneaker repricer"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to set an eBay price floor"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "Never sell below cost on eBay"
      },
      {
        "href": "/ebay-profit-calculator",
        "label": "Free eBay profit calculator"
      },
      {
        "href": "/guides/collectibles-repricing",
        "label": "Repricing collectibles on eBay"
      },
      {
        "href": "/pricing",
        "label": "Undercut plans & pricing"
      }
    ],
    "lastUpdated": "2026-06-12",
    "leadForm": true
  },
  {
    "slug": "ebay-repricing-for-auto-parts",
    "collection": "guides",
    "template": "guide",
    "title": "eBay Repricing for Auto Parts & Accessories — Undercut",
    "metaDescription": "How to set hard floors for fitment-sensitive auto parts on eBay — account for core charges and heavy shipping, and reprice safely. 14-day no-card trial.",
    "h1": "Repricing Auto Parts on eBay When Fitment, Core Charges, and Freight All Move Your Floor",
    "eyebrow": "Guide",
    "intro": "Auto parts are a high-margin, high-headache category on eBay. Listings are fitment-sensitive, often OEM, frequently heavy, and sometimes carry a core charge — and the competitor undercutting you may simply have mis-listed a part that does not actually fit the same vehicles. Reprice blindly against that listing and you either lose money or train buyers to expect a price your costs cannot support. The right approach is a hard floor on every part that bakes in real freight and any core exposure, paired with repricing that beats genuinely comparable listings and ignores the noise. This guide shows how to set that up.",
    "sections": [
      {
        "h2": "Why Auto-Parts Repricing Is Different From Everything Else",
        "body": "Two parts that share a name are not always interchangeable. Fitment varies by year, trim, engine, and sometimes production date, so the 'lowest competitor' your repricer sees may be a part for a different application or a mislabeled listing. Matching it can drag you below cost for no reason. Auto parts are also disproportionately heavy — an alternator, caliper set, or body panel can cost more to ship than many whole items in other categories — and some carry a refundable core charge that distorts the headline price. A floor that ignores freight and core exposure is not a real floor. The fix is to encode those costs into each listing's hard floor and let automation compete only where it makes sense.",
        "bullets": [
          "Fitment differences mean the 'lowest comp' is often not the same product",
          "Freight can be the single largest cost line on heavy parts",
          "Core charges inflate or distort competitor headline prices",
          "Mislisted or counterfeit parts create false lows you should not chase"
        ]
      },
      {
        "h2": "Building a Hard Floor That Includes Freight and Core Exposure",
        "body": "Your floor is the lowest price at which the sale still clears every cost. For parts, that means cost of goods, realistic outbound freight, eBay's final value fee, and your minimum margin — and if there is a core charge, your floor logic should assume the worst case where the core is never returned. Worked example for a remanufactured alternator:\n\nCost of goods: $45.00\nFreight (heavy, padded box): $14.00\neBay final value fee: 13.6%\nMinimum margin target: 15%\n\nFloor = (Cost + Freight) / (1 - FVF% - Margin%) = (45 + 14) / (1 - 0.136 - 0.15) = 59 / 0.714 = $82.63\n\nRound up to $82.99 and that is your hard floor. Undercut will reprice down to beat a comparable competitor but never cross $82.99. If a mislisted cheaper part appears, your floor keeps you from following it into a loss.",
        "bullets": [
          "Use real, current freight cost per part — not a flat category average",
          "If a core charge applies, floor as if the core is never recovered",
          "Use eBay Motors' Parts & Accessories final value fee, not a blended rate",
          "Add a margin buffer for returns, which run high on fitment errors"
        ]
      },
      {
        "h2": "Don't Match Mislisted or Non-Comparable Competitors",
        "body": "The biggest trap in parts repricing is reacting to a low price that is not really your competition. A listing might be a used part sold as new, a different OEM number, or a part for a similar-but-different platform. Because Undercut clamps every move to your floor, a bogus low can never pull you below profitability — the worst case is you simply hold at your floor and wait for a buyer who needs the correct part. For sellers with deep catalogs, the practical workflow is to set an accurate floor on each part once and let the repricer hold the line automatically rather than manually policing every suspicious competitor."
      },
      {
        "h2": "Repricing Frequency and Aggressiveness for Parts Inventories",
        "body": "Most parts do not move on a minute-by-minute basis the way hyped sneakers do, so even a tight repricing cycle is rarely the deciding factor on the whole catalog. What matters more is consistent coverage across a large SKU count and the ability to be more aggressive on slow-moving or seasonal stock (think AC parts in fall) while staying conservative on scarce OEM pieces with little competition. On Pro and Scale, AI aggressiveness tuning lets you set that behavior on each listing, so a warehouse of thousands of parts does not get one blunt setting. A high-volume parts seller typically lands on Pro ($79/mo, 1,000 listings, 15-minute repricing) or Scale ($199/mo, 10,000 listings, same 15-minute repricing plus priority support)."
      }
    ],
    "faq": [
      {
        "q": "How do core charges affect my floor?",
        "a": "Treat the core as if it may never come back. Set your floor on the assumption that you keep none of the core deposit, so even a worst-case sale where the buyer never returns the core still clears your cost and margin. If the core is returned, that is upside, not something to price around."
      },
      {
        "q": "What if the cheapest competitor listed the wrong part?",
        "a": "Your hard floor protects you. Undercut never prices below the floor you set, so a mislisted or non-comparable competitor cannot pull you into a loss. You hold at your floor and wait for a buyer who needs the correct fitment."
      },
      {
        "q": "Can I set different behavior for OEM vs aftermarket parts?",
        "a": "Yes. Each listing has its own floor, and on Pro and Scale you can set a different aggressiveness on each listing — for example, conservative on scarce OEM parts and aggressive on overstocked aftermarket items that you want to move."
      },
      {
        "q": "Is heavy shipping really worth building into the floor?",
        "a": "Absolutely. On heavy parts, freight is often the largest single cost. A floor that ignores it can look profitable on the screen while actually losing money once the label prints. Always include real outbound freight in the floor formula."
      },
      {
        "q": "How many parts can I reprice on each plan?",
        "a": "The free plan covers 25 listings, Starter ($29/mo) covers 100, Pro ($79/mo) covers 1,000 with 15-minute repricing, and Scale ($199/mo) covers 10,000 on the same 15-minute cycle plus priority support. Most serious parts sellers run Pro or Scale given catalog size."
      }
    ],
    "cta": {
      "heading": "Floor every part, then let repricing win the sale",
      "sub": "Bake freight and core exposure into a hard floor and compete safely — start a 14-day no-card trial."
    },
    "internalLinks": [
      {
        "href": "/repricers/auto-parts",
        "label": "Undercut's eBay auto-parts repricer"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to set an eBay price floor"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "Never sell below cost on eBay"
      },
      {
        "href": "/ebay-fee-calculator",
        "label": "Free eBay fee calculator"
      },
      {
        "href": "/ebay-profit-calculator",
        "label": "eBay profit calculator"
      },
      {
        "href": "/pricing",
        "label": "Undercut plans & pricing"
      }
    ],
    "lastUpdated": "2026-06-12",
    "leadForm": true
  },
  {
    "slug": "ebay-repricing-for-trading-cards",
    "collection": "guides",
    "template": "guide",
    "title": "eBay Repricing for Trading Cards & TCG — Undercut",
    "metaDescription": "Reprice Pokemon, sports, and Magic singles on eBay where prices move daily — floor by grading cost and graded-vs-raw. Start a 14-day no-card trial.",
    "h1": "Repricing Trading Cards on eBay When the Market Moves Every Single Day",
    "eyebrow": "Guide",
    "intro": "Trading cards are one of the few eBay categories where the fair price can change overnight. A tournament result, a new set announcement, or a single influential break can move Pokemon, sports, and Magic singles by double digits in a day. On top of that, the same card exists as raw and in several graded tiers, each a different product with a different cost basis. Manually re-checking comps across a card inventory is impossible to keep up with, and stale prices mean you are either invisible or selling under value. Automated repricing anchored to a per-card hard floor keyed to your real cost — including grading — keeps you competitive without giving cards away.",
    "sections": [
      {
        "h2": "Why Card Prices Demand Automated Repricing",
        "body": "Card markets are reflexive and fast. Sold comps that were accurate last week can be meaningfully wrong today, and the spread between the lowest active listing and the last sold price is often where the next sale happens. If you list a few hundred singles and reprice by hand, you simply cannot revisit each one often enough to stay at the front of search as the market moves. A repricer that continuously beats the lowest comparable live listing — while never crossing the floor you set for that exact card and condition — does the watching for you. That is the difference between catching the momentum on a spiking card and missing it because your price was a day behind.",
        "bullets": [
          "Tournament results and set releases can move singles 10-30% in a day",
          "Raw and each graded tier are distinct products with distinct floors",
          "The lowest active listing, not the last sold, usually wins the next sale",
          "Hundreds of singles make manual comp-checking impossible to sustain"
        ]
      },
      {
        "h2": "Floor a Card by Its Real Cost Basis — Including Grading",
        "body": "For raw cards, your floor is cost plus shipping, fees, and margin. For graded cards, the floor must also absorb grading cost and the time and risk you took to submit. Worked example for a card you bought raw and graded:\n\nCard cost (raw): $20.00\nGrading cost (per card, all-in): $19.00\nShipping (carded, tracked): $5.00\neBay final value fee: 13.6%\nMinimum margin target: 15%\n\nFloor = (Card + Grading + Shipping) / (1 - FVF% - Margin%) = (20 + 19 + 5) / (1 - 0.136 - 0.15) = 44 / 0.714 = $61.62\n\nRound up to $61.99 and that is your floor for the graded copy. Your raw copies of the same card get a separate, lower floor without the grading line. Undercut reprices each down to beat its comparable competitors but never below its own floor.",
        "bullets": [
          "Graded and raw copies of the same card get separate floors",
          "Roll grading cost (and submission risk) into the graded floor",
          "Use tracked, carded shipping cost — not a flat guess",
          "Revisit floors as your replacement cost for the card changes"
        ]
      },
      {
        "h2": "Match Like-for-Like: Grade, Grader, and Condition",
        "body": "A PSA 10 should not be repriced against a PSA 9 or a raw copy, and a card graded by one company should not blindly chase another grader's pricing. The cheapest 'comp' eBay shows you is frequently not the same product. Because every Undercut listing is clamped to its own floor, a non-comparable low can never force you below profitability — at worst you hold at your floor. The practical workflow for a card seller is to set accurate per-listing floors, keep grade and grader explicit in the listing, and let the repricer compete within the right tier instead of chasing the absolute lowest number on the page."
      },
      {
        "h2": "Repricing Cadence for Spikes and Slabs",
        "body": "During a spike, minutes matter — the lowest live listing changes fast and the sale goes to whoever is at the front when a buyer with cash shows up. A tight repricing cycle keeps you there. Undercut's Pro and Scale plans both reprice every 15 minutes, which suits sellers actively trading hot singles. For a slower long-tail inventory of commons and mid-value slabs, daily repricing on the free or Starter plan is plenty. Many card sellers split the difference: a focused, frequently-repriced set of high-value cards plus a larger, lightly-repriced long tail, scaling the plan to the listing count. Scale's edge over Pro is capacity (10,000 listings) and priority support, not a faster cycle."
      }
    ],
    "faq": [
      {
        "q": "Should raw and graded copies of the same card share a floor?",
        "a": "No. They are different products with different cost bases. The graded copy's floor must include grading cost; the raw copy's floor should not. Set each listing's floor independently so neither one sells under its true cost."
      },
      {
        "q": "How do I keep from repricing a PSA 10 against a PSA 9?",
        "a": "Keep grade and grader explicit in each listing and rely on your per-card floor. Because Undercut never prices below the floor you set, a lower-grade or different-grader comp can't pull a PSA 10 into a loss — at worst it holds at its floor."
      },
      {
        "q": "Can repricing keep up with a card that's spiking?",
        "a": "Yes, that's where it shines. On Pro or Scale, both running a 15-minute cycle, your listing stays at or near the front of search as the lowest live price moves, so you catch the sale instead of being a day behind with a manual price."
      },
      {
        "q": "Is it worth automating for a few hundred singles?",
        "a": "Usually, yes. A few hundred singles is already more than you can re-check by hand often enough to stay competitive. Automation holds every floor and beats comparable lows continuously, which is exactly what a fast-moving card inventory needs."
      },
      {
        "q": "Which plan fits a card inventory?",
        "a": "Free covers 25 listings, Starter ($29/mo) 100, Pro ($79/mo) 1,000 with 15-minute repricing, and Scale ($199/mo) 10,000 on the same 15-minute cycle plus priority support. Card sellers often run Pro for an active inventory or split into a frequently-repriced high-value set plus a larger long tail."
      }
    ],
    "cta": {
      "heading": "Stop letting day-old prices cost you card sales",
      "sub": "Floor every raw and graded copy and let Undercut track the market for you — start a 14-day no-card trial."
    },
    "internalLinks": [
      {
        "href": "/repricers/trading-cards",
        "label": "Undercut's eBay trading-card repricer"
      },
      {
        "href": "/guides/collectibles-repricing",
        "label": "Repricing collectibles on eBay"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to set an eBay price floor"
      },
      {
        "href": "/glossary/sell-through-rate",
        "label": "What is sell-through rate?"
      },
      {
        "href": "/ebay-profit-calculator",
        "label": "eBay profit calculator"
      },
      {
        "href": "/pricing",
        "label": "Undercut plans & pricing"
      }
    ],
    "lastUpdated": "2026-06-12",
    "leadForm": true
  },
  {
    "slug": "ebay-repricing-for-part-time-sellers",
    "collection": "guides",
    "template": "guide",
    "title": "eBay Repricing for Part-Time & Weekend Sellers — Undercut",
    "metaDescription": "Have a day job and under 100 eBay listings? See how automated repricing with a hard floor wins sales while you're away. Start a 14-day no-card trial.",
    "h1": "How Part-Time eBay Sellers Win Sales While They're at Their Day Job",
    "eyebrow": "Guide",
    "intro": "If you sell on eBay around a full-time job, your biggest disadvantage is not price — it is attention. Full-time competitors adjust prices throughout the day while you are at work, asleep, or with family, and the listing sitting one dollar too high quietly loses the sale. You do not need to babysit prices to compete, though. Automated repricing with a hard floor handles the adjusting for you: it beats the lowest competitor in the moments you cannot, and it never drops below the minimum you set. This guide shows how a part-time seller with under 100 listings gets most of the upside on the free or Starter plan.",
    "sections": [
      {
        "h2": "The Real Problem Isn't Price — It's Coverage",
        "body": "A part-time seller and a full-time seller can list the identical item at the identical price. The difference shows up over the next eight hours: when a competitor drops their price at 11am, the full-timer responds by noon and the part-timer responds at 6pm — after losing a day of being the cheapest comparable listing. Multiply that across a week and a modest inventory and it is a real number of missed sales. Repricing software closes that gap by reacting on your behalf around the clock. You are effectively present in the market even when you are not at your screen, and a hard floor guarantees nothing ever sells below the price you would have accepted yourself.",
        "bullets": [
          "Most price moves happen during hours a part-timer can't monitor",
          "Being one position too high for hours quietly forfeits the sale",
          "A hard floor means hands-off repricing never costs you margin",
          "You compete on equal footing with full-time sellers' attention"
        ]
      },
      {
        "h2": "A Simple Worked Example of What Coverage Is Worth",
        "body": "Suppose you carry 25 active listings averaging a $12 profit per sale, and being consistently first on price would win you just two extra sales per week. That is roughly $24 a week, or about $100 a month, in recovered profit — from sales you were already losing to slow manual repricing. The free plan covers exactly that 25-listing scenario at no cost, so the recovered profit is pure upside. If you grow to 100 listings, the Starter plan is $29/mo; at the same $12 average profit you only need about three extra sales in the entire month to cover it, and active repricing typically wins far more than that. The point is that the math favors automation well before you go full-time.",
        "bullets": [
          "Free plan: 25 listings, repriced multiple times daily — $0",
          "Starter $29/mo: 100 listings — pays for itself in ~3 extra sales",
          "Each recovered sale is profit you were already losing to lag",
          "No card required to run the 14-day trial at Starter level"
        ]
      },
      {
        "h2": "Set It Once: Floors, Then Walk Away",
        "body": "The whole appeal for a busy seller is that the setup is front-loaded and the running is hands-off. You connect your eBay account, import your listings, and set a hard floor on each one — the lowest price that still clears your cost, shipping, eBay's fee, and the margin you want. From then on the repricer beats the lowest comparable competitor automatically and stops at your floor every time. There is nothing to check daily. You can revisit floors when your costs change or when you add inventory, but the day-to-day price chasing — the part that does not fit around a job — is simply gone."
      },
      {
        "h2": "When to Stay Free, and When to Upgrade",
        "body": "Stay on the free plan while you are at or under 25 active listings; it covers the core benefit at no cost and is the right way to learn the floor-first workflow. Move to Starter when your active count climbs past 25 and the extra sales clearly cover $29/mo — which, as the example above shows, happens quickly. You generally do not need Pro's 15-minute cycle or AI aggressiveness tuning as a part-timer; those matter most for high-volume or fast-moving inventories. Upgrade for listing capacity first, speed second, and only when the inventory actually justifies it."
      }
    ],
    "faq": [
      {
        "q": "Do I need to watch prices at all once it's set up?",
        "a": "No. After you set a hard floor on each listing, repricing runs on its own — it beats the lowest comparable competitor and stops at your floor automatically. You only revisit floors when your costs change or you add new inventory."
      },
      {
        "q": "Is the free plan really enough for a part-time seller?",
        "a": "For many, yes. The free plan covers 25 active listings repriced multiple times daily, which captures the core benefit of staying competitive while you're at work. You upgrade only when your listing count grows past 25."
      },
      {
        "q": "Will hands-off repricing accidentally sell my items too cheap?",
        "a": "No. The hard floor is the safeguard — Undercut never prices any listing below the floor you set, so automation can only ever win sales at or above your minimum acceptable price. It never races to the bottom."
      },
      {
        "q": "I have a day job — how long does setup take?",
        "a": "Setup is a one-time job: connect eBay, import listings, and set a floor on each. For a small inventory that's a short evening's work, and there's nothing to maintain daily afterward. The 14-day trial needs no card to start."
      },
      {
        "q": "When should I move from free to Starter?",
        "a": "Upgrade when your active listings pass 25 or when the extra sales clearly cover the $29/mo Starter cost. At a typical $12 profit per sale, roughly three extra sales a month covers it, and active repricing usually wins more than that."
      }
    ],
    "cta": {
      "heading": "Compete like a full-timer — without quitting your job",
      "sub": "Set floors once and let Undercut win sales while you're away — start a 14-day no-card trial, no card required."
    },
    "internalLinks": [
      {
        "href": "/guides/ebay-repricing-for-beginners",
        "label": "eBay repricing for beginners"
      },
      {
        "href": "/guides/manual-vs-automated-repricing",
        "label": "Manual vs. automated repricing"
      },
      {
        "href": "/free-ebay-repricer",
        "label": "Free eBay repricer"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to set an eBay price floor"
      },
      {
        "href": "/ebay-profit-calculator",
        "label": "eBay profit calculator"
      },
      {
        "href": "/pricing",
        "label": "Undercut plans & pricing"
      }
    ],
    "lastUpdated": "2026-06-12",
    "leadForm": true
  },
  {
    "slug": "how-much-to-undercut-competitors-ebay",
    "collection": "guides",
    "template": "guide",
    "title": "How Much Should You Undercut Competitors on eBay? — Undercut",
    "metaDescription": "When $0.01 below wins and when a percentage undercut makes sense on eBay — and how a hard floor caps the race. Start a 14-day no-card trial.",
    "h1": "Choosing Your Undercut Amount on eBay: A Penny, a Percent, or Neither",
    "eyebrow": "Guide",
    "intro": "\"Undercut the competition\" sounds simple until you have to pick the actual number. Go a penny under and you barely move; go too far under and you hand away margin you never needed to give. The right undercut amount depends on how buyers shop the listing, how many competitors there are, and — most importantly — how close the lowest price already sits to your floor. This guide breaks down when a one-cent undercut is plenty, when a percentage cut earns its keep, and how a hard floor keeps any undercut strategy from turning into a race to the bottom.",
    "sections": [
      {
        "h2": "When a One-Cent Undercut Is All You Need",
        "body": "For most commodity-style listings where buyers sort by price and grab the cheapest acceptable option, being the lowest by a single cent captures the same sale as being lowest by five dollars — at five dollars more margin. If the lowest comparable competitor is at $100.00, listing at $99.99 makes you the cheapest result without throwing away profit. The penny undercut is the default for a reason: it wins the price-sort position at the smallest possible cost. You only need a bigger gap when something about the listing makes a one-cent difference invisible or unconvincing to the buyer.",
        "bullets": [
          "Best for price-sorted, commodity-style listings with clear comparables",
          "Captures the same buyers as a larger cut, at higher margin",
          "$100.00 lowest comp → list at $99.99 and you're the cheapest result",
          "The default undercut for most inventory"
        ]
      },
      {
        "h2": "When a Percentage Undercut Actually Earns Its Keep",
        "body": "A larger, percentage-based undercut makes sense when a penny won't change behavior. That happens when buyers weigh more than price — seller feedback, photos, shipping speed — or when you are deliberately trying to move aging stock faster than the market. Worked example: the lowest comp is $100, and you carry more feedback risk as a newer seller. A 3% undercut to $97 may be what it takes to overcome a buyer's hesitation. The question is always whether the extra $2.99 of discount buys enough additional conversion to be worth it — and that answer changes by category, condition, and how badly you need the cash.",
        "bullets": [
          "Use when buyers weigh feedback, photos, or shipping over raw price",
          "Use to deliberately accelerate aging or seasonal stock",
          "$100 comp → 3% cut = $97; ask if the extra $3 buys enough conversion",
          "A bigger undercut is a tool, not a default — spend it on purpose"
        ]
      },
      {
        "h2": "The Floor Is What Makes Any Undercut Safe",
        "body": "Whatever undercut amount you choose, it only stays profitable if it can never cross your floor. Say your floor on an item is $92 (cost + shipping + fees + minimum margin). A penny undercut from a $100 comp lands at $99.99 — fine. But if a competitor misprices at $90, a blind \"always undercut\" rule would chase them to $89.99 and lose you money. With a hard floor, Undercut undercuts only down to $92 and then stops, holding there until a buyer who needs the item shows up. The undercut amount decides how you compete; the floor decides how far you're willing to go. You need both.",
        "bullets": [
          "Floor = cost + shipping + eBay fee + minimum margin",
          "A blind undercut rule chases mispriced competitors into a loss",
          "Undercut clamps every move to the floor, then holds",
          "Set the undercut for strategy, the floor for safety"
        ]
      },
      {
        "h2": "Letting AI Tune the Undercut Per Listing",
        "body": "The honest answer to \"how much should I undercut?\" is that it varies by listing, and hand-tuning every listing across a large inventory is impractical. On Pro and Scale, you set an aggressiveness on each listing and Undercut's AI applies it — controlling how hard that listing pushes toward its floor as it undercuts the lowest comparable competitor. Set conservative on items you'd rather hold near market and aggressive on items you want to move. You set the floor and the aggressiveness; the AI handles the moment-to-moment undercut within them. That turns a question you'd otherwise answer manually, thousands of times, into a setting you choose once per listing."
      }
    ],
    "faq": [
      {
        "q": "Is undercutting by one cent really enough?",
        "a": "For most price-sorted, commodity-style listings, yes. Being the lowest by a penny wins the same buyers as being lowest by several dollars, at much higher margin. Reserve larger undercuts for cases where a penny won't change buyer behavior."
      },
      {
        "q": "When does a percentage undercut beat a flat penny?",
        "a": "When buyers weigh more than price — feedback, photos, shipping speed — or when you're deliberately trying to move aging stock. In those cases a few percent below can lift conversion enough to be worth the smaller margin. Otherwise the penny undercut wins."
      },
      {
        "q": "How does the floor relate to the undercut amount?",
        "a": "They're separate controls. The undercut amount is how you compete; the floor is the hard limit you'll never cross. Undercut applies your undercut down to the floor and then stops, so a mispriced competitor can't drag you into a loss."
      },
      {
        "q": "What happens if a competitor prices below my floor?",
        "a": "Undercut holds at your floor rather than following them down. You stay at the lowest profitable price and wait for a buyer, instead of selling at a loss to beat a price that doesn't even clear your costs."
      },
      {
        "q": "Can I set different undercut amounts for different listings?",
        "a": "Yes. You can set the undercut amount (a fixed amount or a percentage), and each listing carries its own floor. On Pro and Scale, AI aggressiveness tuning lets you set how hard each listing moves toward its floor. You choose the settings once instead of hand-pricing thousands of items."
      }
    ],
    "cta": {
      "heading": "Undercut competitors without underselling yourself",
      "sub": "Set a floor, pick your aggressiveness, and let Undercut win the price-sort for you — start a 14-day no-card trial."
    },
    "internalLinks": [
      {
        "href": "/glossary/undercutting",
        "label": "What is undercutting?"
      },
      {
        "href": "/guides/ebay-pricing-strategy",
        "label": "eBay pricing strategy"
      },
      {
        "href": "/guides/win-the-buy-box",
        "label": "Win the eBay buy box"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to set an eBay price floor"
      },
      {
        "href": "/ebay-profit-calculator",
        "label": "eBay profit calculator"
      },
      {
        "href": "/pricing",
        "label": "Undercut plans & pricing"
      }
    ],
    "lastUpdated": "2026-06-13",
    "leadForm": true
  },
  {
    "slug": "ebay-repricing-roi",
    "collection": "guides",
    "template": "guide",
    "title": "Does eBay Repricing Software Pay for Itself? — Undercut",
    "metaDescription": "A worked ROI model for eBay repricing software: recovered margin and extra sell-through vs. a $29/mo subscription. Start a 14-day no-card trial.",
    "h1": "The Real ROI Math on eBay Repricing Software",
    "eyebrow": "Guide",
    "intro": "Any subscription is only worth it if it returns more than it costs. For eBay repricing software the return comes from two places: extra sales you win by spending more time at the top of the price sort, and margin you stop giving away because a hard floor keeps every sale profitable. The cost side is simple — a flat monthly fee. This guide builds an honest ROI model with real numbers, shows the break-even listing count for each plan, and is upfront about when repricing software is not worth it yet. No hand-waving, just the arithmetic you can run against your own store.",
    "sections": [
      {
        "h2": "The Two Ways Repricing Returns Money",
        "body": "Repricing pays off through recovered sales and protected margin. Recovered sales: when your price tracks the lowest comparable competitor automatically, your listing spends more hours at the front of the price sort, so you win sales that previously went to whoever happened to be cheapest at that moment. Protected margin: a hard floor stops you from ever selling below cost, which means the sales you do win are profitable rather than panic discounts. Neither effect is magic — they are just the difference between a price that's current and a price that's hours or days stale. The ROI question is whether those two effects, added up over a month, beat a flat subscription fee.",
        "bullets": [
          "Recovered sales: more time at the top of the price sort",
          "Protected margin: a floor stops below-cost discounting",
          "Both come from prices being current instead of stale",
          "ROI = (recovered sales × profit) + protected margin − subscription"
        ]
      },
      {
        "h2": "A Worked ROI Example",
        "body": "Take a seller on the Starter plan ($29/mo, up to 100 listings) averaging $14 profit per sale. Suppose automated repricing wins them just one extra sale every four days that they'd otherwise have lost to a fresher competitor price. That's roughly 7-8 extra sales a month:\n\n7.5 extra sales × $14 profit = $105/month in recovered profit\nSubscription cost = $29/month\nNet gain = $76/month, before counting any margin protected by the floor\n\nThat's a 3.6x return on the subscription from recovered sales alone. The break-even is only about 2.1 extra sales per month ($29 ÷ $14). If repricing wins you more than two extra sales a month — a low bar for an active store — it has already paid for itself.",
        "bullets": [
          "Starter $29/mo, $14 avg profit → break-even ≈ 2.1 extra sales/month",
          "7.5 recovered sales = $105 profit → $76 net gain (3.6x)",
          "Floor-protected margin is upside on top of this",
          "Run the same math with your real profit-per-sale and volume"
        ]
      },
      {
        "h2": "Break-Even by Plan",
        "body": "The break-even scales with plan cost and your profit per sale. On Free (25 listings) the cost is zero, so any recovered sale is pure gain — it's the obvious starting point. On Starter ($29/mo) you need roughly two extra sales a month at a $14 average. On Pro ($79/mo, 1,000 listings, 15-minute repricing) the break-even is around six extra sales a month, which a store large enough to need 1,000 listings clears easily — and the faster cycle plus AI aggressiveness tuning typically lifts the recovered-sales number well past that. On Scale ($199/mo, 10,000 listings, same 15-minute repricing plus priority support), the per-listing cost is tiny and the break-even is trivial relative to that inventory size. The rule of thumb: match the plan to your listing count, and the break-even takes care of itself.",
        "bullets": [
          "Free: zero cost, any recovered sale is pure gain — start here",
          "Starter $29: ~2 extra sales/month to break even",
          "Pro $79: ~6 extra sales/month, easily cleared at 1,000 listings",
          "Scale $199: trivial break-even relative to 10,000 listings"
        ]
      },
      {
        "h2": "When Repricing Is NOT Worth It Yet",
        "body": "Honesty matters here. Repricing software has the weakest payoff when your listings face little or no price competition — one-of-a-kind items, rare collectibles with no comparable live listings, or categories where you're the only seller. If nobody is undercutting you, there's nothing to track and little to recover. It's also less impactful for very low-volume hobby sellers who list a handful of items a month; the free plan covers that case at no cost anyway, so there's no downside to using it, but don't expect a paid plan to transform a five-listing store. Repricing earns its fee in competitive, multi-seller categories with steady volume — which is exactly where most eBay margin gets won or lost.",
        "bullets": [
          "Weak fit: unique items with no comparable competitors",
          "Weak fit: very low-volume hobby selling (use Free, not paid)",
          "Strong fit: competitive, multi-seller categories with volume",
          "Start on Free to measure your own recovered-sales rate first"
        ]
      }
    ],
    "faq": [
      {
        "q": "How many extra sales do I need for repricing to pay off?",
        "a": "On the $29 Starter plan at a $14 average profit, about two extra sales a month covers the cost. Anything beyond that is net gain. Most active, competitive stores clear that bar easily, before even counting margin protected by the floor."
      },
      {
        "q": "Can I measure my own ROI before paying?",
        "a": "Yes — start on the free plan (25 listings). It captures the core benefit at no cost, so you can watch your recovered-sales rate directly and decide whether a paid plan's higher listing limit and faster cycle are worth it for your volume."
      },
      {
        "q": "Does the floor factor into ROI?",
        "a": "Yes, as upside. Beyond recovered sales, the hard floor prevents below-cost discounting, so every sale stays profitable. That protected margin is real return that the simple 'extra sales' math above doesn't even include."
      },
      {
        "q": "When is repricing software not worth paying for?",
        "a": "When your items have little price competition — unique pieces or categories where you're the only seller — there's little to track or recover. Very low-volume sellers should simply use the free plan rather than expect a paid plan to transform a tiny store."
      },
      {
        "q": "Which plan gives the best ROI?",
        "a": "Match the plan to your listing count and the break-even takes care of itself. Free is pure upside to start; Starter pays off at ~2 extra sales/month; Pro and Scale have trivial break-evens relative to the inventory sizes they're built for."
      }
    ],
    "cta": {
      "heading": "Run the math on your own store",
      "sub": "Start free, watch the recovered sales add up, and upgrade only when the numbers say so — 14-day no-card trial."
    },
    "internalLinks": [
      {
        "href": "/pricing",
        "label": "Undercut plans & pricing"
      },
      {
        "href": "/ebay-profit-calculator",
        "label": "eBay profit calculator"
      },
      {
        "href": "/ebay-fee-calculator",
        "label": "eBay fee calculator"
      },
      {
        "href": "/guides/manual-vs-automated-repricing",
        "label": "Manual vs. automated repricing"
      },
      {
        "href": "/guides/cheapest-ebay-repricer",
        "label": "Cheapest eBay repricer breakdown"
      },
      {
        "href": "/guides/ebay-repricing-for-beginners",
        "label": "eBay repricing for beginners"
      }
    ],
    "lastUpdated": "2026-06-13",
    "leadForm": true
  },
  {
    "slug": "ebay-repricing-for-used-items",
    "collection": "guides",
    "template": "guide",
    "title": "Repricing Used & Pre-Owned Items on eBay — Undercut",
    "metaDescription": "Why one floor fails across used conditions on eBay, and how to reprice aging pre-owned stock toward liquidation without losing money. 14-day no-card trial.",
    "h1": "Repricing Used and Pre-Owned Inventory Without Losing Your Shirt",
    "eyebrow": "Guide",
    "intro": "Used inventory breaks the simple repricing playbook. The same model in \"like new\" and \"acceptable\" condition are two different products with two different buyers, two different costs, and two different right prices. Pile on that pre-owned stock depreciates the longer it sits, and a single blanket repricing rule will either overprice your rough units so they never sell, or underprice your clean ones and burn margin. This guide covers why used goods need condition-specific floors, how to reprice aging stock toward liquidation deliberately, and how to do it across a mixed used inventory without hand-pricing every item.",
    "sections": [
      {
        "h2": "Why One Floor Fails Across Conditions",
        "body": "eBay condition tiers — new other, used, very good, good, acceptable — aren't cosmetic labels; they map to real differences in what a buyer will pay and what you can profitably accept. A \"like new\" unit competes against near-retail comps; an \"acceptable\" unit competes on being cheap. If you set one floor for the SKU, you'll price the rough unit as if it were clean (it sits forever) or the clean unit as if it were rough (it sells instantly at a loss of margin you could have kept). The fix is a separate floor per condition tier, each built from that unit's actual cost and the margin you need, so each listing competes only where it belongs.",
        "bullets": [
          "Condition tiers map to real differences in buyer willingness-to-pay",
          "One SKU-wide floor mis-prices both your best and worst units",
          "Set a distinct floor per condition tier",
          "Let each listing compete against comparable-condition comps"
        ]
      },
      {
        "h2": "Building a Condition-Specific Floor",
        "body": "Each used unit gets its own floor from its own cost basis. Worked example for the same model in two conditions:\n\nLike-new unit — acquisition $40, refurb/cleaning $6, shipping $8, eBay FVF 13.6%, target margin 18%:\nFloor = (40 + 6 + 8) / (1 - 0.136 - 0.18) = 54 / 0.684 = $78.95 → $78.99\n\nAcceptable unit — acquisition $18, minimal prep $2, shipping $8, same FVF, but a thinner 10% margin to move it:\nFloor = (18 + 2 + 8) / (1 - 0.136 - 0.10) = 28 / 0.764 = $36.65 → $36.99\n\nSame model, two floors that differ by more than 2x — because the cost basis and the margin you'll accept are genuinely different. Undercut holds each listing to its own floor while beating its own comparable competitors.",
        "bullets": [
          "Floor each unit from its real acquisition + prep + shipping cost",
          "Accept a thinner margin on lower tiers you want to move",
          "Like-new $78.99 vs. acceptable $36.99 on the same model",
          "Each listing's floor is independent — no blanket SKU price"
        ]
      },
      {
        "h2": "Repricing Aging Stock Toward Liquidation",
        "body": "Used goods have a clock on them. A unit that's sat 90 days is worth less than the day you listed it, and storage and tied-up cash have a cost too. The smart move is to plan the glide path: as a unit ages, you accept a thinner margin to move it — but never below the floor that still clears your hard costs. In practice that means setting a more aggressive repricing behavior on aging tiers so they press toward their (already lower) floor faster, while clean, fresh stock holds nearer market. The floor guarantees that even your most aggressive liquidation price still covers cost — you're trimming margin to move metal, not selling at a loss.",
        "bullets": [
          "Pre-owned stock depreciates and ties up cash the longer it sits",
          "Plan a glide path: thinner accepted margin as a unit ages",
          "Aggressive toward the floor on aging tiers, conservative on fresh stock",
          "The floor still covers hard cost even at full liquidation pressure"
        ]
      },
      {
        "h2": "Managing a Mixed Used Inventory at Scale",
        "body": "Hand-pricing every used unit by condition and age is exactly the kind of work that doesn't scale past a few dozen listings. With Undercut, you set each listing's floor once and, on Pro and Scale, set its aggressiveness: AI aggressiveness tuning lets aging-and-rough units move aggressively toward their floors while like-new stock stays conservative and holds near market — all running continuously without you touching it. As a unit ages, you raise its aggressiveness or lower its floor yourself. A reseller flipping a steady stream of mixed-condition used goods is the ideal case for automation, because the manual alternative is re-checking dozens of condition-and-age combinations by hand, every day, forever."
      }
    ],
    "faq": [
      {
        "q": "Can I use one price for all conditions of the same item?",
        "a": "You shouldn't. Different conditions have different cost bases and attract different buyers, so one price either overprices your rough units or underprices your clean ones. Give each condition tier its own floor and let it compete against comparable-condition listings."
      },
      {
        "q": "How do I reprice used stock that isn't selling?",
        "a": "Plan a glide path: accept a thinner margin as the unit ages and set a more aggressive repricing behavior so it presses toward its floor faster. The floor still covers your hard costs, so you're trimming margin to move it — not selling at a loss."
      },
      {
        "q": "Does the floor formula change for used items?",
        "a": "The formula is the same — cost + prep + shipping over one minus fees and margin — but the inputs differ per unit. Lower-tier units have lower acquisition costs and often a thinner accepted margin, which is exactly why each one needs its own floor."
      },
      {
        "q": "Is automated repricing worth it for used inventory?",
        "a": "Especially so, because used inventory multiplies the variables — condition times age times competition. Hand-pricing that doesn't scale past a few dozen listings, while Undercut holds every condition-specific floor and reprices continuously on its own."
      },
      {
        "q": "What plan handles different aggressiveness for mixed-condition inventory?",
        "a": "Any plan lets you set per-listing floors. Pro and Scale add AI aggressiveness tuning, so you can set aging or rough units to move aggressively toward their floors while like-new stock stays conservative near market — useful once your used inventory grows."
      }
    ],
    "cta": {
      "heading": "Floor every condition, liquidate the rest on purpose",
      "sub": "Set condition-specific floors and let Undercut move aging stock without losing money — 14-day no-card trial."
    },
    "internalLinks": [
      {
        "href": "/guides/collectibles-repricing",
        "label": "Repricing collectibles on eBay"
      },
      {
        "href": "/guides/vintage-antiques-repricing",
        "label": "Repricing vintage & antiques"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to set an eBay price floor"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "Never sell below cost on eBay"
      },
      {
        "href": "/ebay-profit-calculator",
        "label": "eBay profit calculator"
      },
      {
        "href": "/pricing",
        "label": "Undercut plans & pricing"
      }
    ],
    "lastUpdated": "2026-06-13",
    "leadForm": true
  },
  {
    "slug": "winning-ebay-price-wars",
    "collection": "guides",
    "template": "guide",
    "title": "How to Win an eBay Price War Without Going Broke — Undercut",
    "metaDescription": "When two sellers keep undercutting each other, a hard floor lets you compete on the listings worth winning and walk away from the rest. 14-day no-card trial.",
    "h1": "Surviving an eBay Price War: Compete Where It Pays, Walk Away Where It Doesn't",
    "eyebrow": "Guide",
    "intro": "A price war starts innocently: a competitor drops a dollar, you match, they drop again, and within a week you're both selling near cost. The seller who \"wins\" a race to the bottom often wins nothing but a pile of break-even sales. The way out isn't to undercut harder — it's to know your floor cold, compete only on the listings where winning is still profitable, and deliberately let the unprofitable ones go. This guide lays out how a hard floor turns an emotional price war into a calm, rules-based decision you make once and let run.",
    "sections": [
      {
        "h2": "Why Price Wars Destroy Margin So Fast",
        "body": "A price war is a feedback loop. Each undercut invites a counter-undercut, and because eBay buyers sort by price, neither seller can stop without ceding the sale. Without a hard limit, that loop only ends when someone hits cost — and often both sellers are now selling at a margin that doesn't cover the time and risk of fulfilling the order. The mistake is treating every listing as a war worth winning. Some are; many aren't. The sellers who stay profitable are the ones who decided their floor in advance and let it make the stop-or-fight call automatically, instead of reacting emotionally to every competitor move.",
        "bullets": [
          "Price-sorted search turns each undercut into a forced counter-undercut",
          "Without a floor, the loop ends only at (or below) cost",
          "Winning a race to the bottom often means break-even sales",
          "The fix is a pre-set floor, not undercutting harder"
        ]
      },
      {
        "h2": "Your Floor Decides When to Fight and When to Fold",
        "body": "A hard floor converts \"should I match this?\" into a yes/no the system answers for you. Worked example: your floor on an item is $48 (cost $32 + shipping $6 + fees + margin). A competitor sits at $52, so Undercut prices you to $51.99 and you win the sale profitably — fight. The competitor then drops to $46, below your $48 floor. Undercut holds you at $48 and stops — fold. You don't chase them to $45.99 and lose money to \"win.\" You've decided, in advance and without emotion, that this sale isn't worth having below $48. The competitor can have the unprofitable sales; you keep your margin and your sanity.",
        "bullets": [
          "Floor = cost + shipping + fees + minimum margin",
          "Competitor above your floor → undercut and win profitably",
          "Competitor below your floor → hold and let them have it",
          "The decision is pre-made, so no emotional price-chasing"
        ]
      },
      {
        "h2": "Pick Your Battles Across the Catalog",
        "body": "Not every listing deserves the same fight. Items with healthy demand, thin competition, or a differentiator (faster shipping, better feedback, bundled extras) are worth defending aggressively toward their floor. Commodity items where five sellers are racing each other to cost are often worth conceding — you let your price sit at the floor and win only when the others run out of stock or give up. Deciding how contested and how profitable each item is lets you set a different aggressiveness on each listing, so your attention and your margin go to the battles you can actually win.",
        "bullets": [
          "Defend items with demand, thin competition, or a real differentiator",
          "Concede crowded commodity races — sit at the floor and wait",
          "Judge each listing by contest level and profitability",
          "Set aggressiveness per listing on the ones worth winning"
        ]
      },
      {
        "h2": "Let Automation Hold the Line for You",
        "body": "The hardest part of a price war is discipline — it's tempting to drop \"just one more dollar\" to win a sale you can see slipping away. Automation removes the temptation. With Undercut, you set each listing's floor once and the repricer enforces it on every cycle, undercutting competitors down to the floor and never past it, around the clock. On Pro and Scale, the per-listing AI aggressiveness setting you choose decides how hard each listing pushes toward its floor within those limits. You stop watching competitors obsessively and start trusting a setting that already encodes your worst-acceptable price — which is exactly the discipline a price war demands."
      }
    ],
    "faq": [
      {
        "q": "Should I always match a competitor who undercuts me?",
        "a": "No. Match only while the competitor's price is above your floor, where winning is still profitable. Once they drop below your floor, hold and let them take the unprofitable sale. A hard floor makes that call automatically on every listing."
      },
      {
        "q": "Doesn't refusing to chase mean I lose sales?",
        "a": "You lose the unprofitable ones, which is the point. Chasing a competitor below cost wins sales that lose money. Holding at your floor keeps you the lowest profitable option, so you still win every sale that's actually worth having."
      },
      {
        "q": "How do I decide which listings to fight for?",
        "a": "Defend items with solid demand, limited competition, or a real edge like faster shipping or better feedback. Concede crowded commodity races to the floor. Tagging inventory and setting per-group aggressiveness focuses your margin on winnable battles."
      },
      {
        "q": "Can automated repricing make price wars worse?",
        "a": "Not when it's floor-bounded. Undercut only undercuts down to your floor and then stops — it never spirals. It actually ends the emotional part of a price war, because the stop point is decided in advance and enforced automatically."
      },
      {
        "q": "What plan do I need for per-listing aggressiveness?",
        "a": "Any plan lets you set per-listing floors. Pro and Scale add AI aggressiveness tuning, so you can push hard on contested winnable items while conceding crowded races — useful once you're managing more than a handful of listings."
      }
    ],
    "cta": {
      "heading": "End the race to the bottom",
      "sub": "Set a floor on every listing and let Undercut decide when to fight and when to fold — start a 14-day no-card trial."
    },
    "internalLinks": [
      {
        "href": "/guides/how-much-to-undercut-competitors-ebay",
        "label": "How much to undercut competitors"
      },
      {
        "href": "/glossary/race-to-the-bottom",
        "label": "What is a race to the bottom?"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to set an eBay price floor"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "Never sell below cost on eBay"
      },
      {
        "href": "/ebay-profit-calculator",
        "label": "eBay profit calculator"
      },
      {
        "href": "/pricing",
        "label": "Undercut plans & pricing"
      }
    ],
    "lastUpdated": "2026-06-13",
    "leadForm": true
  },
  {
    "slug": "ebay-bulk-price-editing",
    "collection": "guides",
    "template": "guide",
    "title": "Bulk Price Editing on eBay vs. Automated Repricing — Undercut",
    "metaDescription": "eBay's bulk-edit and Seller Hub price tools are a manual stopgap. See where rules-based repricing with hard floors takes over. Start a 14-day no-card trial.",
    "h1": "Where eBay's Bulk Price Editing Ends and Automated Repricing Begins",
    "eyebrow": "Guide",
    "intro": "eBay gives you real tools to change prices in bulk — Seller Hub's bulk editor, promotions, and markdown manager. They're genuinely useful for a one-time reset. But they share one limitation: they're manual snapshots. You set prices, walk away, and the market keeps moving without you. This guide is an honest comparison of what eBay's built-in bulk editing does well, where it falls short for active inventory, and the specific point at which rules-based automated repricing with a hard floor takes over — so you can use each for what it's actually good at.",
    "sections": [
      {
        "h2": "What eBay's Bulk Editing Does Well",
        "body": "Seller Hub's bulk editor lets you select many listings and change price, quantity, or other fields in one pass — perfect for a seasonal reset, a store-wide sale, or correcting a pricing mistake across a category. The markdown manager schedules percentage discounts for events. These tools are free, built in, and exactly right for deliberate, occasional, manual changes. If you're repricing your whole store once a quarter or running a Black Friday promotion, bulk editing is the correct tool and you don't need anything else. Credit where due: for set-piece changes, it works.",
        "bullets": [
          "Great for one-time, store-wide resets and seasonal sales",
          "Markdown manager schedules event discounts",
          "Free and built into Seller Hub",
          "The right tool for deliberate, occasional changes"
        ]
      },
      {
        "h2": "Where It Falls Short for Active Inventory",
        "body": "The limitation is that bulk editing is a snapshot, not a system. The moment you save, your prices are frozen while competitors keep moving. If you bulk-set a listing to $40 on Monday and a competitor drops to $38 on Tuesday, you're invisible until you notice and bulk-edit again. There's also no floor logic: a bulk percentage markdown applies the same cut to every item regardless of each one's actual cost, so a blanket \"20% off\" can quietly push your thin-margin items below break-even. For inventory in competitive, fast-moving categories, manual bulk edits are always one step behind the market.",
        "bullets": [
          "Prices freeze the instant you save — the market doesn't",
          "No per-item floor: a blanket % cut can go below cost",
          "Re-checking and re-editing is constant manual work",
          "Always one step behind in competitive categories"
        ]
      },
      {
        "h2": "A Worked Comparison",
        "body": "Say you have 200 active listings in a competitive category. Manual approach: you bulk-edit prices Monday morning, it takes 30 minutes, and by Wednesday a third of them are no longer the lowest because competitors moved. You either repeat the 30-minute edit every day (2.5 hours/week) or accept being stale. Automated approach: you set a hard floor on each listing once, and the repricer beats the lowest comparable competitor continuously, never crossing any floor — zero ongoing time. Even valuing your time at $20/hour, the manual route costs ~$50/week in labor to do worse than a $29/month plan does automatically. The break-even isn't close once inventory is active and contested.",
        "bullets": [
          "200 listings, manual: ~2.5 hrs/week and still goes stale",
          "Automated: set floors once, then zero ongoing time",
          "~$50/week of labor to underperform a $29/mo plan",
          "Floors prevent the below-cost risk a blanket markdown creates"
        ]
      },
      {
        "h2": "Use Both — for What Each Is Good At",
        "body": "This isn't either/or. Use eBay's bulk editor for what it's best at: the occasional deliberate reset, a scheduled sale, or fixing a category-wide mistake. Then let automated repricing handle the relentless day-to-day of staying competitive without going below your floor. In practice that means you bulk-set sensible starting prices and floors, then hand the ongoing adjustments to Undercut, which reprices on a 15-minute cycle (Pro and Scale alike) and stops at every floor. The manual tool sets the stage; the repricer runs the show. You stop choosing between stale-but-free and current-but-manual, because automation gives you current-and-hands-off."
      }
    ],
    "faq": [
      {
        "q": "Is eBay's bulk price editor good enough on its own?",
        "a": "For occasional, deliberate changes — seasonal resets, scheduled sales, fixing mistakes — yes. For active inventory in competitive categories it falls behind, because prices freeze the moment you save while competitors keep moving. That's where automated repricing takes over."
      },
      {
        "q": "Can't I just bulk-edit prices every day?",
        "a": "You can, but for a few hundred listings that's hours a week of manual work, and you're still stale between edits. Automated repricing does it continuously for no ongoing time, and adds per-item floors that blanket bulk edits can't enforce."
      },
      {
        "q": "Does the markdown manager protect my margin?",
        "a": "No. A markdown applies the same percentage to every item regardless of its individual cost, so a blanket cut can push thin-margin listings below break-even. A hard floor protects each listing's minimum individually, which a percentage markdown cannot."
      },
      {
        "q": "Should I stop using bulk editing entirely?",
        "a": "No — use it for what it's good at: one-time resets and scheduled promotions. Let automated repricing handle the ongoing competitive adjustments. The two complement each other; bulk editing sets the stage and the repricer runs the day-to-day."
      },
      {
        "q": "How fast does automated repricing react versus manual edits?",
        "a": "Undercut reprices on a 15-minute cycle (Pro and Scale alike), versus whenever you next sit down to bulk-edit. That difference is how much time your listings spend at the front of the price sort instead of stale and invisible."
      }
    ],
    "cta": {
      "heading": "Stop choosing between stale and manual",
      "sub": "Bulk-set your floors once, then let Undercut keep you current and profitable automatically — 14-day no-card trial."
    },
    "internalLinks": [
      {
        "href": "/guides/manual-vs-automated-repricing",
        "label": "Manual vs. automated repricing"
      },
      {
        "href": "/guides/how-to-reprice-ebay-listings",
        "label": "How to reprice eBay listings"
      },
      {
        "href": "/guides/multi-listing-repricing-strategy",
        "label": "Repricing across many listings"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to set an eBay price floor"
      },
      {
        "href": "/ebay-profit-calculator",
        "label": "eBay profit calculator"
      },
      {
        "href": "/pricing",
        "label": "Undercut plans & pricing"
      }
    ],
    "lastUpdated": "2026-06-13",
    "leadForm": true
  },
  {
    "slug": "ebay-competitor-price-tracking",
    "collection": "guides",
    "template": "guide",
    "title": "How to Track Competitor Prices on eBay — Undercut",
    "metaDescription": "Manual comp-checking vs. continuous competitor-low tracking on eBay, and how that data should feed your repricing decisions. Start a 14-day no-card trial.",
    "h1": "Tracking Competitor Prices on eBay — and Actually Using the Data",
    "eyebrow": "Guide",
    "intro": "Knowing what your competitors charge is step one of pricing well — but on eBay the lowest comparable price changes constantly, so a number you checked this morning may be wrong by lunch. Most sellers either spot-check a few listings by hand or ignore competitor prices entirely until sales dry up. Neither scales. This guide covers how to track competitor prices on eBay properly, the difference between a manual snapshot and continuous competitor-low tracking, and the part most guides skip: how that tracking data should actually drive a repricing decision rather than just sitting in a spreadsheet.",
    "sections": [
      {
        "h2": "Manual Comp-Checking and Why It Breaks Down",
        "body": "The manual method is familiar: search your item, sort by lowest price plus shipping, note the cheapest comparable listing, and decide whether to adjust. It works for a handful of items checked occasionally. It breaks down on two axes at once — volume and freshness. Across a few hundred listings you can't check them all often enough, and even the ones you do check go stale within hours as competitors move. You end up with a spreadsheet that's perpetually out of date and a nagging sense that you're leaving sales on the table. The information isn't wrong; it's just old by the time you act on it.",
        "bullets": [
          "Search, sort by lowest price + shipping, note the comp",
          "Fine for a few items checked occasionally",
          "Breaks on volume (too many) and freshness (goes stale fast)",
          "A spreadsheet that's out of date the moment you finish it"
        ]
      },
      {
        "h2": "Continuous Competitor-Low Tracking",
        "body": "The alternative is to track the lowest comparable price continuously and automatically. Instead of you checking, a system polls the live market on a schedule and records the competitor low for each of your listings, building a history rather than a single snapshot. That history is valuable on its own — you can see whether an item's market is trending down (time to be more aggressive) or holding firm (no need to discount) — but its real power is that it can feed pricing decisions in real time instead of waiting for you to read a report. Continuous tracking turns competitor price from something you look up into something your prices respond to automatically.",
        "bullets": [
          "A system polls the live market on a schedule, per listing",
          "Records competitor-low history, not just a one-time snapshot",
          "History reveals trends: drop aggressively vs. hold firm",
          "Tracking that feeds pricing beats tracking you have to read"
        ]
      },
      {
        "h2": "Turning Tracking Into a Pricing Decision",
        "body": "Tracking data only pays off when it drives action. Worked example: your listing sits at $60, your floor is $54, and continuous tracking shows the competitor low just dropped from $62 to $58. A manual workflow means you eventually notice and edit to $57.99. An automated workflow means the moment the competitor-low reading updates to $58, your price moves to $57.99 — above your $54 floor, so still profitable — without you touching anything. If the competitor low instead dropped to $51 (below your $54 floor), the system holds you at $54 rather than chasing a loss. The tracking and the decision are the same loop, closed automatically.",
        "bullets": [
          "$62 → $58 competitor low: auto-move to $57.99 (above $54 floor)",
          "$58 → $51 competitor low: hold at $54, don't chase a loss",
          "Tracking + decision become one automatic loop",
          "No lag between learning the comp moved and acting on it"
        ]
      },
      {
        "h2": "How Undercut Tracks and Reprices Together",
        "body": "Undercut treats tracking and repricing as one system. It reads the lowest comparable competitor for each listing, records it, and immediately uses it to reprice — undercutting down to the price you set and never below your floor. You see the latest competitor low right next to each listing in the dashboard, so the data that drove the price is visible, not hidden. On both Pro and Scale the cycle runs every 15 minutes, which is how often the tracking-and-decision loop closes. You get the competitor intelligence and the action it implies in the same place, instead of maintaining a tracking spreadsheet on one screen and editing prices on another."
      }
    ],
    "faq": [
      {
        "q": "What's the best way to track competitor prices on eBay?",
        "a": "For a few items, manually sorting by lowest price plus shipping is fine. For real inventory, continuous automated tracking of the competitor low per listing is the only approach that stays current — and it's most useful when it feeds your repricing directly rather than a spreadsheet."
      },
      {
        "q": "Why isn't a price-tracking spreadsheet enough?",
        "a": "Because it's stale the moment you finish it and it doesn't act. Competitor prices move within hours, so a spreadsheet you update manually is always behind. Tracking only pays off when the data drives a pricing decision automatically and in real time."
      },
      {
        "q": "Does competitor-low history actually matter?",
        "a": "Yes. A history shows whether an item's market is trending down — signaling you can afford to be more aggressive toward your floor — or holding firm, where discounting just gives away margin. A single snapshot can't show that direction."
      },
      {
        "q": "How does tracking turn into a price change safely?",
        "a": "When the tracked competitor low updates, Undercut undercuts down to it — but never below your hard floor. So a falling competitor price moves you only as far as it's still profitable, and a competitor pricing below your floor leaves you holding at the floor instead of chasing a loss."
      },
      {
        "q": "Can I see the competitor data behind a price change?",
        "a": "Yes. The latest competitor low is shown next to each listing in the dashboard, so the data that drove the price is visible rather than hidden. Tracking and repricing live in the same place instead of separate tools."
      }
    ],
    "cta": {
      "heading": "Track competitors and act on it — automatically",
      "sub": "Let Undercut read the market and reprice to win, never below your floor — start a 14-day no-card trial."
    },
    "internalLinks": [
      {
        "href": "/ebay-price-checker",
        "label": "Free eBay price checker"
      },
      {
        "href": "/guides/ebay-best-match-algorithm",
        "label": "How eBay Best Match works"
      },
      {
        "href": "/guides/how-to-reprice-ebay-listings",
        "label": "How to reprice eBay listings"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to set an eBay price floor"
      },
      {
        "href": "/ebay-profit-calculator",
        "label": "eBay profit calculator"
      },
      {
        "href": "/pricing",
        "label": "Undercut plans & pricing"
      }
    ],
    "lastUpdated": "2026-06-13",
    "leadForm": true
  },
  {
    "slug": "ebay-minimum-advertised-price",
    "collection": "guides",
    "template": "guide",
    "title": "Floors, MAP, and Minimum Pricing on eBay — Undercut",
    "metaDescription": "Learn how brand MAP policies and your own breakeven floor interact on eBay — and how to encode both as a hard floor. Start a free 14-day trial, no card needed.",
    "h1": "eBay Minimum Advertised Price: How to Honor MAP and Protect Your Margin at the Same Time",
    "eyebrow": "Guide",
    "intro": "Selling branded goods on eBay means juggling two different minimums: the brand's Minimum Advertised Price (MAP) and your own breakeven floor. Get either one wrong and you're either violating an authorized-dealer agreement or selling at a loss. Automated repricing makes this more urgent — a bot set too aggressively can race through both limits in minutes. This guide explains what MAP means in an eBay context, how to calculate your true breakeven floor, which number to use when they differ, and exactly how to encode the result as a hard floor in Undercut so repricing never crosses either line.",
    "sections": [
      {
        "h2": "What MAP Actually Means on eBay (and What It Doesn't)",
        "body": "Minimum Advertised Price is a unilateral pricing policy set by a brand or manufacturer. It specifies the lowest price at which an authorized reseller may publicly advertise a product. The key word is advertised: MAP governs the price displayed in a listing, not necessarily the price a buyer pays after a private Best Offer negotiation — though many brand agreements have tightened this distinction in recent years, so always read your specific dealer agreement.\n\neBay does not enforce MAP on the platform's behalf. There is no system-level block preventing a listing from going below a brand's MAP figure. Enforcement is entirely contractual: if you violate MAP, the brand can terminate your authorized-dealer status, cut off wholesale supply, or pursue civil remedies. The consequences are real, but they come from the brand, not from eBay.\n\nThis means the burden of compliance falls entirely on you — and on any repricing software you use. A repricer that blindly chases the lowest competitor price will happily list a $200 MAP item at $149 if a grey-market seller goes there first. Your only reliable protection is a hard floor set at or above the MAP figure for every affected listing.",
        "bullets": [
          "MAP = minimum advertised price; it governs what appears publicly in your listing.",
          "eBay does not police MAP — your dealer agreement does.",
          "Best Offer acceptance may or may not be exempt; check your specific brand policy.",
          "A hard floor in your repricer is the only automated safeguard."
        ]
      },
      {
        "h2": "Calculating Your True Breakeven Floor",
        "body": "Before you can set a sensible floor, you need to know what it actually costs you to sell a unit. Many sellers anchor on their wholesale cost and forget the stack of fees sitting on top.\n\nHere is a worked example. Suppose you source a Bluetooth speaker for $45. The item sells for $89.99 on eBay. eBay's Final Value Fee on most Electronics listings is 13.6% of the total sale amount (item price + shipping), capped at $750 per item — so on $89.99 that is roughly $12.24. Add a $0.30 per-order transaction fee. If you use a promoted listing at 5%, that is another $4.50. Shipping and packaging costs $8.00. Payment processing (included in eBay's managed payments) is already captured in the FVF. Total costs: $45.00 + $12.24 + $0.30 + $4.50 + $8.00 = $70.04. Your breakeven price is $70.04 — sell below that and you lose money on every unit.\n\nMost sellers also want a minimum margin, say 15%. Apply that: $70.04 ÷ (1 − 0.15) = $82.40. That is your margin-protected floor. Round up to $82.99 to keep a clean price point, and that is the number you should never go below — regardless of what competitors do.",
        "bullets": [
          "Start with landed COGS: wholesale cost + inbound shipping + customs.",
          "Add eBay Final Value Fee (category-dependent, commonly 12–13.6%).",
          "Add shipping, packaging, and any promoted-listing percentage.",
          "Divide by (1 − desired margin %) to get your margin-protected floor.",
          "Use the eBay Profit Calculator to run this for each SKU before setting floors."
        ]
      },
      {
        "h2": "Which Number Wins: MAP or Your Breakeven Floor?",
        "body": "Once you have both figures, the rule is straightforward: your hard floor must be the higher of the two numbers.\n\nScenario A — MAP is higher than your breakeven floor. Imagine your breakeven floor (with 15% margin) is $82.99, but the brand's MAP is $99.95. Your hard floor is $99.95. If you set it lower, you risk violating your dealer agreement even though you would still be profitable. Undercut's repricing will never push your listing below $99.95, so you stay compliant automatically.\n\nScenario B — Your breakeven floor is higher than MAP. Your breakeven floor is $82.99, but the brand's MAP is $74.99 (perhaps the brand set MAP years ago and wholesale costs have since risen). Your hard floor is $82.99. You cannot profitably honor the old MAP, so you either need to negotiate with the brand, find a cheaper supply source, or accept that this SKU is unviable at current costs. Setting the floor at MAP in this scenario would mean losing money on every repriced sale.\n\nScenario C — No MAP applies. You are selling unbranded goods or secondhand items with no MAP restriction. Your hard floor is simply your margin-protected breakeven. This is the most common situation for general eBay resellers.\n\nA practical way to track this: maintain a simple spreadsheet with columns for SKU, COGS, all-in cost, breakeven floor, brand MAP (if any), and the final hard floor you load into Undercut. Review it whenever your costs or brand agreements change.",
        "bullets": [
          "Hard floor = MAX(your margin-protected breakeven, brand MAP).",
          "Never set your floor at MAP if MAP is below your actual cost.",
          "Revisit floors whenever wholesale costs, fees, or brand policies change.",
          "Keep a SKU-level floor spreadsheet as your source of truth."
        ]
      },
      {
        "h2": "Encoding Both Floors as a Hard Floor in Undercut",
        "body": "Undercut lets you set a per-listing hard floor (and an optional ceiling) on every eBay listing you connect. The hard floor is a strict lower bound — the repricing engine will never set your price below it, regardless of competitor activity. This is the mechanism that protects both your margin and your MAP compliance simultaneously.\n\nTo configure it: in your Undercut dashboard, open any listing and enter the hard floor value in the Floor Price field. Using the example above where the brand MAP is $99.95 and your breakeven floor is $82.99, you enter $99.95. Undercut will then reprice competitively down to $99.95 but stop there. If the lowest competitor drops to $94.99 — below your floor — Undercut holds your price at $99.95 rather than chasing them.\n\nFor sellers on the Pro and Scale plans, Claude AI-powered aggressiveness tuning lets you set, per listing, how quickly and how deeply Undercut reprices toward the floor. You might set a listing you want to move more aggressively (repricing faster and closer to the floor), while setting a low-volume collectible conservatively to preserve margin. Critically, the AI aggressiveness setting is one you choose per listing and it never overrides the hard floor — it only governs the pace and depth of repricing within the floor-to-ceiling range.\n\nIf you have hundreds of listings with MAP restrictions, the practical workflow is to calculate the right floor for each in your own spreadsheet, then enter each listing's Floor Price in the dashboard. Keeping the math ready makes setting many listings quick.",
        "bullets": [
          "Enter MAX(breakeven floor, MAP) as the Floor Price on each listing.",
          "The hard floor is never overridden — not by AI tuning, not by competitor activity.",
          "Use the optional ceiling to prevent price from rising above a profitable or MAP-compliant upper bound.",
          "Calculate floors in a spreadsheet first to make setting large catalogs quick.",
          "Update a listing's floor in the dashboard whenever costs or MAP policies change."
        ]
      },
      {
        "h2": "Common Mistakes and How to Avoid Them",
        "body": "The most expensive mistake sellers make is setting a floor based on the item's purchase price alone, forgetting eBay fees, shipping, and promoted listing costs. As the worked example in section two shows, fees alone can add $16–$20 to the cost of a $90 item. A floor set at your wholesale cost will have you selling at a consistent loss.\n\nThe second common mistake is syncing floors once and never updating them. eBay's fee schedule changes periodically. Wholesale costs fluctuate. Brand MAP policies get revised — sometimes upward, sometimes downward. A floor that was accurate six months ago may now be too low. Build a quarterly review into your workflow, or trigger a review whenever you receive a new wholesale invoice or a MAP policy update email from a brand.\n\nA subtler mistake is applying the same floor to identical SKUs bought at different costs. If you have 50 units purchased at $40 and a later batch of 30 units purchased at $52 because of supply chain increases, your blended cost is different from either lot. Decide whether to use average cost, FIFO cost, or worst-case cost as your floor basis — most sellers use worst-case (highest COGS) to be conservative.\n\nFinally, do not confuse eBay's own promotional tools — like Markdown Manager or Promoted Listings — with floor violations. Offering a 10% promotional discount on a $99.95 MAP item could push the displayed price to $89.96, which is below MAP. If you run promotions, check whether your brand agreement permits temporary promotional prices below MAP, and if not, exclude MAP-restricted listings from those campaigns.",
        "bullets": [
          "Include all fees (FVF, shipping, promotions) in your floor calculation — not just COGS.",
          "Review and update floors quarterly and after any wholesale or fee changes.",
          "Use worst-case COGS when you hold inventory purchased at different prices.",
          "Exclude MAP-restricted listings from eBay Markdown Manager campaigns unless your dealer agreement explicitly permits promotional pricing below MAP."
        ]
      }
    ],
    "faq": [
      {
        "q": "Does eBay enforce MAP policies on behalf of brands?",
        "a": "No. eBay does not monitor or enforce brand MAP policies at the platform level. Your listing can go below MAP without eBay intervening. Enforcement comes entirely from the brand — they may audit authorized resellers, send warning notices, or terminate dealer agreements. The only reliable automated safeguard is a hard floor set at or above the MAP figure in your repricing software."
      },
      {
        "q": "Can I honor MAP on the listing price but accept Best Offers below MAP?",
        "a": "It depends on the specific brand agreement. Some MAP policies cover only the advertised (listed) price and explicitly allow Best Offer negotiations below MAP, while others prohibit final transaction prices below MAP regardless of how the sale originates. Read your dealer agreement carefully. If it is ambiguous, ask your brand rep in writing so you have a clear record."
      },
      {
        "q": "What happens in Undercut if a competitor drops below my hard floor?",
        "a": "Undercut holds your price at the hard floor and does not reprice further downward. You will not match or undercut a competitor who is selling below your floor — whether they are violating MAP, selling grey-market goods, or simply losing money. Your listing stays at the floor price until that competitor's price rises back above your floor, at which point normal repricing resumes."
      },
      {
        "q": "How often does Undercut check competitor prices on Pro and Scale plans?",
        "a": "On both the Pro plan ($79/mo) and the Scale plan ($199/mo), Undercut checks and reprices every 15 minutes — Scale's difference is capacity (up to 10,000 listings) and priority support, not a faster cycle. The 15-minute interval is fast enough to respond to most competitor price changes within a single shopping session, while the hard floor ensures rapid repricing never accidentally breaches your minimum."
      },
      {
        "q": "Can I set a different floor for each of my listings?",
        "a": "Yes. Undercut supports per-listing floors, so every SKU can have its own floor reflecting its unique cost structure and MAP requirement. For large catalogs, calculate the right floor for each item in your own spreadsheet first, then enter each listing's Floor Price in the dashboard. Per-listing floors are available on every plan, including Free."
      }
    ],
    "cta": {
      "heading": "Never Reprice Below MAP or Breakeven Again",
      "sub": "Set a hard floor on every listing and let Undercut handle the rest. 14-day free trial, no credit card required."
    },
    "internalLinks": [
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to Set an eBay Price Floor"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor? (Glossary)"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/ebay-profit-calculator",
        "label": "eBay Profit Calculator"
      },
      {
        "href": "/glossary/race-to-the-bottom",
        "label": "Race to the Bottom (Glossary)"
      }
    ],
    "lastUpdated": "2026-06-15",
    "leadForm": true
  },
  {
    "slug": "ebay-repricing-for-home-and-garden",
    "collection": "guides",
    "template": "guide",
    "title": "eBay Repricing for Home, Garden & Tools — Undercut",
    "metaDescription": "Freight costs eat margins fast in home & garden. Learn how Undercut's hard floor repricing protects profit. Start a free 14-day trial — no card required.",
    "h1": "eBay Repricing for Home, Garden & Tools: Win Sales Without Letting Freight Kill Your Margins",
    "eyebrow": "Guide",
    "intro": "Home, garden, and tools listings on eBay carry a repricing challenge most categories don't: the item itself might sell for $45, but freight can cost $30. Set your floor too low and you hand every order to a carrier at a loss. Set it too high and you sit unsold through peak season. Automated repricing solves both problems — but only if the software understands that your price floor must bake in actual shipping costs, and that demand swings hard from February seed-starting to October leaf-blower season. This guide shows you exactly how to do that with Undercut.",
    "sections": [
      {
        "h2": "Why Freight Cost Is the Defining Variable in Home & Garden Repricing",
        "body": "A 50-lb bag of soil conditioner, a 72-inch folding workbench, or a push-reel mower all share one brutal truth: the carrier's dimensional weight pricing can exceed the product's landed cost. Before you touch a repricer, you need an accurate per-listing freight cost baked into your floor — not a rough average across your catalog.\n\nHere is a worked example. Suppose you stock a 40-lb garden hose reel. Your COGS is $28. Ground shipping runs $18 (dimensional weight pricing). eBay's final value fee at a $75 sell price is roughly 13.6%, or about $10.20. That leaves you with $75 − $28 − $18 − $10.20 = $18.80 gross profit — a 25% margin. If a competitor drops to $69 and you blindly match them, your margin collapses to roughly $13. But if you had set a hard floor of $72, Undercut would never go below that number, no matter what competitors do.\n\nUndercut lets you set a per-listing HARD FLOOR in dollars. For every home or garden SKU, calculate: COGS + actual shipping cost + eBay fees at floor price + your minimum acceptable margin. Enter that number as the floor. The repricer will then chase competitors down to that floor and stop — never a penny lower.",
        "bullets": [
          "Calculate freight per SKU, not per category average — a 5-lb trowel and a 40-lb hose reel ship very differently",
          "Use eBay's shipping calculator or your carrier's rate card to pin down dimensional weight costs before setting any floor",
          "Remember eBay's final value fee applies to the total amount paid including shipping, so factor that in",
          "Revisit freight costs quarterly — carrier rate increases in January and July can silently erode your floor's accuracy"
        ]
      },
      {
        "h2": "Mapping Seasonal Demand to Your Repricing Ceiling (and Aggressiveness)",
        "body": "Home and garden is one of eBay's most pronounced seasonal categories. Google Trends and eBay's own sold-listing data show predictable spikes: lawn equipment peaks March–May, pressure washers April–June, leaf blowers September–October, snow blowers November–December, and indoor grow lights October–February. During peak windows, buyer demand outstrips supply and you can often hold — or even raise — your ceiling without losing the sale. In the off-peak trough, you may need to be far more aggressive to move inventory before it ties up warehouse space for another six months.\n\nUndercut's Pro and Scale plans include AI aggressiveness tuning powered by Claude AI. Rather than relying on a single static undercut amount everywhere, you set the aggressiveness listing-by-listing, and the AI controls how fast and how far each listing moves toward its floor. During a peak spring gardening week when you have a $120 ceiling on a popular raised-bed kit and the lowest competitor is at $108, a conservative setting that undercuts by $0.01–$1 is all you need. In late November when the same kit is a slow mover, you set a more aggressive posture to get the visibility.\n\nA practical seasonal ceiling strategy: set your ceiling at the 90th-percentile sold price from the prior peak season, then let Undercut work between floor and ceiling automatically. You capture peak-season margin without manual intervention, and the floor guarantees you never subsidize a slow-season clearance sale.",
        "bullets": [
          "Peak seasons by sub-category: lawn care (Mar–May), outdoor power tools (Apr–Jun), snow removal (Nov–Dec), grow lights (Oct–Feb)",
          "Use eBay's 'Sold Listings' filter to find the 90th-percentile recent sale price — that becomes your seasonal ceiling",
          "Pro plan ($79/mo) reprices every 15 minutes, catching flash price drops and spikes faster than daily manual checks",
          "Scale plan ($199/mo) reprices on the same 15-minute cycle and adds capacity (10,000 listings) plus priority support — valuable for high-volume seasonal SKUs with dozens of competitors"
        ]
      },
      {
        "h2": "Setting Up Undercut for a Home & Garden Catalog: Step-by-Step",
        "body": "Getting Undercut configured correctly for bulky, shipping-heavy inventory takes about 30 minutes of upfront setup and pays dividends all season. Here is how to approach it.\n\nStep 1 — Build your floor spreadsheet before connecting eBay. For each SKU, note: (a) your COGS, (b) your actual outbound shipping cost in dollars, (c) eBay's estimated final value fee percentage for the category, and (d) your minimum acceptable net margin in dollars. Sum those four numbers to get your floor. Example: COGS $22 + shipping $14 + eBay fees at a $60 price point ≈ $8.16 (13.6%) + minimum margin $8 = floor of $52.16. Round up to $52.50 to give yourself a buffer.\n\nStep 2 — Connect your eBay store to Undercut via the OAuth flow. Undercut imports your active listings automatically. Free plan covers 25 listings; Starter ($29/mo) covers 100; Pro ($79/mo) covers 1,000; Scale ($199/mo) covers 10,000.\n\nStep 3 — Assign floors (and optional ceilings) to each listing. You can do this individually or use Undercut's bulk editing interface. For seasonal SKUs, set a ceiling that reflects the peak-season price you've researched.\n\nStep 4 — Choose your plan. Starter and Free plans reprice at standard intervals. Pro and Scale both reprice every 15 minutes; Scale's difference is capacity (10,000 listings) and priority support, not a faster cycle. For home and garden, 15-minute repricing is usually sufficient outside peak promotional events.\n\nStep 5 — Monitor your first week's results. Check that no listing is hitting its floor repeatedly — that signals your floor may be above market and worth investigating. If you're consistently at ceiling, demand is strong and you may have room to raise the ceiling.",
        "bullets": [
          "Always use per-listing shipping costs, not a blended average, to protect margin on your heaviest SKUs",
          "Bulk-assign ceilings by season: set spring/summer ceilings in February, fall/winter ceilings in August",
          "If a listing hits its floor more than 3 days in a row, consider whether the market has structurally repriced and your floor needs recalculating",
          "Free plan (25 listings) is ideal for testing Undercut on your top 25 home/garden SKUs before committing"
        ]
      },
      {
        "h2": "Avoiding the Race to the Bottom on Commoditized Garden SKUs",
        "body": "Commoditized home and garden products — generic trowel sets, basic garden hose fittings, standard utility shelving — are especially prone to price wars. Multiple sellers stock identical or near-identical items, and without a hard floor every one of them is one aggressive repricer away from a margin-destroying spiral.\n\nUndercut's hard floor is the mechanical answer: no matter how many competitors undercut each other, your listing will not follow below your defined minimum. But there is also a strategic layer. If you are regularly hitting your floor and not winning the sale, that is data. It may mean your total landed cost is higher than a competitor who negotiates better freight rates or sources cheaper. No repricer can fix a structural cost disadvantage — but Undercut will at least prevent you from selling at a loss while you figure it out.\n\nFor differentiated home and garden listings — a branded power tool with a warranty, a garden kit bundled with a planting guide, a riding mower with included assembly — the ceiling matters as much as the floor. Buyers on eBay do comparison-shop, but unique bundles and strong seller feedback scores command a small premium. In these cases, setting an aggressive undercut amount risks leaving money on the table. On the Pro and Scale plans, Claude AI's aggressiveness tuning lets you set a conservative posture on differentiated listings and an aggressive posture on pure commodities within the same account.",
        "bullets": [
          "Generic SKUs with 10+ identical competitors: prioritize floor accuracy and accept you will sometimes be at floor",
          "Bundled or differentiated listings: set a higher ceiling and use lower aggressiveness to capture premium pricing",
          "Review your sold-vs-active ratio monthly — low sell-through at floor price signals a sourcing cost problem, not a repricing problem",
          "Never set your floor below your true all-in cost just to 'stay competitive' — that is the race to the bottom"
        ]
      },
      {
        "h2": "Choosing the Right Undercut Plan for Your Home & Garden Volume",
        "body": "Home and garden sellers vary enormously in catalog size. A hobbyist reselling surplus garden tools might have 20 active listings. A wholesaler of outdoor power equipment might have 3,000. Undercut's plan tiers map cleanly to these different scales.\n\nFree plan (25 listings, $0/mo): Perfect for testing the repricer on your best-selling SKUs, or for a small seller who stocks fewer than 25 active home/garden lines. No card required.\n\nStarter plan (100 listings, $29/mo): Covers a focused home and garden store — say, 80 garden tools and 20 outdoor power accessories. Repricing runs at standard intervals. No AI aggressiveness tuning. Good entry point for sellers doing $2,000–$8,000/mo in home/garden GMV.\n\nPro plan (1,000 listings, $79/mo): The sweet spot for serious home and garden sellers. The 15-minute repricing interval matters here because competitor pricing on seasonal items can shift multiple times a day during peak weeks. Claude AI's aggressiveness tuning means you can run hundreds of listings without manually calibrating each one — the AI handles conservative vs. aggressive posture per listing. This plan is well-suited to sellers doing $10,000–$80,000/mo in GMV.\n\nScale plan (10,000 listings, $199/mo): Built for large-volume sellers or multi-brand home/garden wholesalers. It runs the same 15-minute repricing cycle as Pro and adds priority support, with the headroom to cover a very large catalog during promotional events like eBay's seasonal sales, when prices move rapidly. At $199/mo for up to 10,000 listings, the per-listing cost is under $0.02/mo.\n\nAll new signups get a no-card-required 14-day trial at Starter level (100 listings). That is enough to reprice a meaningful slice of a home and garden catalog and measure the impact before any payment.",
        "bullets": [
          "Free: 25 listings, $0 — test on your top home/garden SKUs",
          "Starter: 100 listings, $29/mo — solid for focused stores up to ~100 active lines",
          "Pro: 1,000 listings, $79/mo — 15-min repricing + Claude AI tuning, best for serious seasonal sellers",
          "Scale: 10,000 listings, $199/mo — same 15-min repricing plus priority support, for large catalogs and high-velocity promotional events"
        ]
      }
    ],
    "faq": [
      {
        "q": "How do I account for high shipping costs when setting my floor on heavy garden items?",
        "a": "Add your actual per-item outbound shipping cost directly to your floor calculation alongside COGS, eBay fees, and minimum margin. For example, a 40-lb item shipping for $18 needs that $18 baked into the floor before the repricer ever runs. Undercut's hard floor is a dollar amount you set per listing, so you have full control to encode freight cost precisely — there is no blended average forced on you."
      },
      {
        "q": "Will Undercut automatically raise my prices during peak gardening season?",
        "a": "Undercut will price up to your ceiling if market prices rise above your current price — it always targets just below the lowest competitor, bounded by your floor and ceiling. To capture seasonal peaks, set a ceiling that reflects peak-season sold prices (research eBay's completed listings from the prior year's peak). Undercut will not exceed that ceiling, but it will rise toward it as the market rises."
      },
      {
        "q": "How often does Undercut reprice my home and garden listings?",
        "a": "Repricing frequency depends on your plan: Free and Starter run at standard intervals, while Pro and Scale both reprice every 15 minutes. Scale's difference over Pro is capacity (up to 10,000 listings) and priority support, not a faster cycle. For most home and garden sellers, 15-minute repricing (Pro, $79/mo) is sufficient to respond to competitor price changes within the same day, including during fast-moving seasonal promotional events."
      },
      {
        "q": "What happens if all my competitors price below my hard floor?",
        "a": "Undercut will hold your listing at your floor price and not follow competitors below it. Your listing may not be the lowest price in search results during that period, but you will never sell at a loss. If you are consistently stuck at your floor and not making sales, that is a signal to review your sourcing costs or freight rates — not to lower your floor below your break-even point."
      },
      {
        "q": "Can I use Undercut for both tools and garden categories in the same account?",
        "a": "Yes. Undercut reprices any active eBay listing in your account regardless of category, and floors and ceilings are set per listing — so your 40-lb mower listing and your lightweight pruning-shears listing can have entirely different floor calculations. You are not locked into a single margin rule for your whole catalog."
      }
    ],
    "cta": {
      "heading": "Stop Guessing on Heavy-Item Margins — Let Undercut Hold Your Floor",
      "sub": "Start a free 14-day trial at Starter level (100 listings). No credit card required. Set your freight-inclusive floor today and never sell a bulky item below cost again."
    },
    "internalLinks": [
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to Set an eBay Price Floor"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/seasonal-repricing",
        "label": "Seasonal Repricing Strategy for eBay"
      },
      {
        "href": "/glossary/race-to-the-bottom",
        "label": "What Is a Race to the Bottom?"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "Price Floor — Glossary"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      }
    ],
    "lastUpdated": "2026-06-15",
    "leadForm": true
  }
]
