import type { PageContent } from '../types'

export const glossary: PageContent[] = [
  {
    "title": "What Is Repricing on eBay? — Undercut",
    "metaDescription": "Repricing means adjusting your prices to stay competitive. Learn when to automate it on eBay — and start a free 14-day trial, no card required.",
    "h1": "What Is Repricing? A Plain-English Guide for eBay Sellers",
    "eyebrow": "Definition",
    "intro": "Repricing is the practice of adjusting your listing prices in response to competitor activity, demand shifts, or your own cost changes. On eBay, where dozens of sellers often compete on the same item, a price that won every sale yesterday can be buried by lunchtime today. This guide explains what repricing actually means in a marketplace context, how it differs from a simple price cut, and the specific signals that tell you it's time to stop doing it by hand.",
    "sections": [
      {
        "h2": "Repricing Defined: More Than Just Lowering Your Price",
        "body": "Repricing means changing a listing price in response to new information — a competitor's price drop, a change in your own costs, or a shift in buyer demand. The word gets misused to mean \"race to the bottom,\" but that's only one approach, and usually the wrong one. A well-designed repricing strategy does two things at once: it keeps you competitive enough to win sales, and it holds firm at a floor below which selling would cost you money. Without the floor, repricing is just erosion. Without the competitive logic, it's just a static price with a fancy name.",
        "bullets": [
          "Competitive repricing: match or beat the lowest eligible competitor",
          "Demand-based repricing: raise prices when stock is low or sell-through is fast",
          "Cost-based repricing: recalculate floor whenever shipping or COGS changes",
          "Hybrid: combine all three with a hard floor as the final guardrail"
        ]
      },
      {
        "h2": "How eBay Marketplace Pricing Actually Works",
        "body": "eBay surfaces listings by Best Match, which weighs price, seller feedback, shipping cost, and item specifics together. A lower price doesn't guarantee the top slot, but it is the easiest lever a buyer can see at a glance. When several sellers carry the same SKU — common in media, electronics, and auto parts — the spread between the cheapest and the second-cheapest listing is often just a few cents. A competitor repricing at 2 a.m. can push your listing from first to fourth before you wake up. That gap compounds: fewer impressions mean fewer sales, which can gradually erode your seller metrics. This is why timing and frequency matter as much as the repricing rule itself.",
        "bullets": []
      },
      {
        "h2": "When Manual Repricing Stops Making Sense",
        "body": "Manual repricing — logging in, searching comparable listings, and editing prices one by one — is reasonable at a small scale. Once you cross certain thresholds, it becomes the bottleneck. The common trigger points are:",
        "bullets": [
          "More than 30 active listings that compete on price (not unique/handmade items)",
          "Any category where competitors reprice intraday (electronics, books, media)",
          "Restocking cycles shorter than a week, making cost floors a moving target",
          "Selling across multiple eBay accounts or storefronts simultaneously",
          "Lost sales you only notice after the fact, with no record of what triggered them"
        ]
      },
      {
        "h2": "The Floor Calculation: A Worked Example",
        "body": "Automated repricing is only safe if it cannot push you below profitability. That lower bound is called the price floor. Here is a concrete example for a used paperback book:\n\nCOGS (sourced at): $3.00\nShipping (poly mailer + postage): $4.25\neBay final value fee (13.25% of total): ~$0.96 on a $7.25 sale\nPayPal/managed payments processing: $0.30 + 2.9% ≈ $0.51\nMinimum acceptable margin: 15%\n\nWorking backwards: to clear 15% margin after all costs of $9.02, your floor is roughly $10.38. Any automated rule must stop at or above that number — it should never reprice below it regardless of what competitors do. In Undercut, you set this floor per listing. The repricer beats the lowest competitor right up to that line, then holds.",
        "bullets": []
      },
      {
        "h2": "What Automated Repricing Does (and Doesn't Do)",
        "body": "An automated repricer watches competitor prices continuously and adjusts your listings according to rules you define. It does not invent strategy — it executes yours faster than you can manually. What good automation adds is speed (repricing in 5 to 15 minutes rather than hours or days), consistency (the same logic applied to every listing every time), and a safety net (the floor). What it doesn't do: it won't rescue a bad sourcing decision, it won't compensate for a floor you set too low, and it won't tell you whether to be in a category at all. Automation amplifies your pricing strategy; it doesn't replace judgment about which items belong in your catalog.",
        "bullets": []
      }
    ],
    "faq": [
      {
        "q": "Does repricing always mean dropping my price?",
        "a": "No. Repricing means adjusting to the market in either direction. If a competitor sells out and you're the only seller left on a SKU, a repricer following demand signals can raise your price. The floor sets the downside limit; there's no ceiling unless you set one."
      },
      {
        "q": "How is a price floor different from just setting a minimum price manually?",
        "a": "A static minimum price on a listing is one number you set once. A floor in a repricing tool is calculated per item — factoring in your cost, fees, and target margin — and it travels with the listing through every automated price change. The repricer can never go below it, no matter how aggressively competitors drop."
      },
      {
        "q": "What happens if every competitor drops below my floor?",
        "a": "Your listing stays at the floor. You won't win that sale — but you also won't sell at a loss. Undercut holds your price at the floor and waits. When competitors sell through their stock or raise prices, your listing is positioned to win again without any action on your part."
      },
      {
        "q": "How often does an eBay repricer need to check competitor prices?",
        "a": "For slow-moving or unique items, once or twice a day is fine. For high-velocity categories like electronics or trading cards, 15-minute or 5-minute cycles make a measurable difference in won sales. Undercut's Pro plan reprices every 15 minutes; Scale reprices every 5 minutes."
      },
      {
        "q": "Can I start repricing without giving a credit card?",
        "a": "Yes. Undercut's 14-day free trial starts with no card required. The Free plan covers up to 25 listings after the trial ends, so you can test whether automated repricing actually moves your metrics before you commit to a paid plan."
      }
    ],
    "cta": {
      "heading": "Set Your Floor. Let Undercut Do the Rest.",
      "sub": "Start your 14-day free trial — no credit card needed. Your prices compete on their own while your floor keeps every sale profitable."
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
        "href": "/guides/manual-vs-automated-repricing",
        "label": "Manual vs. Automated Repricing"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/ebay-repricing-for-beginners",
        "label": "eBay Repricing for Beginners"
      }
    ],
    "slug": "what-is-repricing",
    "collection": "glossary",
    "template": "glossary",
    "leadForm": false,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "What Is a Price Floor? — Undercut",
    "metaDescription": "A price floor is a seller-set minimum below which auto-repricing never goes. Learn the formula, see a worked example, and start a free 14-day trial — no card needed.",
    "h1": "Price Floors: The Safety Net Every Auto-Repricer Needs",
    "eyebrow": "Definition",
    "intro": "A price floor is the lowest price you are ever willing to accept for a specific listing — the hard stop that keeps automated repricing from eroding your margin. Unlike a sitewide minimum, a per-item floor is calculated from that listing's actual costs: what you paid, what shipping costs, what eBay takes, and what margin you require. Get the formula right once per SKU and every future price drop is bounded. Undercut enforces that floor automatically, so competing on price never means selling at a loss.",
    "sections": [
      {
        "h2": "The Price Floor Formula (and What Each Variable Means)",
        "body": "A defensible per-item floor has four components, not one. The formula is:\n\nFloor = (Item Cost + Shipping Cost) / (1 − eBay Fee Rate) / (1 − Minimum Margin %)\n\neBay's combined fee rate (final value fee + insertion fee + payment processing) typically lands between 12.9% and 15.55% depending on category and seller level. A conservative default is 13.25%. Minimum margin is whatever you decide — 15% is a common starting point for resellers who need to cover returns and storage.",
        "bullets": [
          "Item Cost: your landed cost including sourcing, prep, and inbound freight",
          "Shipping Cost: actual carrier cost for the heaviest/largest dimension, not what you charge the buyer",
          "eBay Fee Rate: check your Seller Hub fee schedule — it varies by category",
          "Minimum Margin %: your business floor, not a guess — tie it to your return rate and storage costs"
        ]
      },
      {
        "h2": "Worked Example: Calculating a Floor for a $8 Item",
        "body": "Suppose you source a used kitchen gadget for $8.00. You ship it via USPS Ground Advantage for $4.00. Your eBay fee rate in the Home & Garden category is 13.25%. You want a minimum 15% net margin.\n\nStep 1 — Add hard costs: $8.00 + $4.00 = $12.00\nStep 2 — Gross up for eBay fees: $12.00 / (1 − 0.1325) = $13.83\nStep 3 — Gross up for margin: $13.83 / (1 − 0.15) = $16.27\n\nYour floor is $16.27. Round up to $16.29 or $16.99 for psychological pricing — but never below $16.27. If a competitor lists at $14.99, Undercut holds your listing at $16.27 and you simply do not chase that sale. That is the point: some sales are not worth taking.",
        "bullets": []
      },
      {
        "h2": "Why a Hard Floor Is the Key Safety Control for Auto-Repricing",
        "body": "Auto-repricing without a floor is a race to zero. The repricer sees a lower competitor, drops your price, the competitor drops again, and the loop continues until one seller sells below cost. A per-item hard floor breaks the loop at the right place — for you, not a competitor.\n\nA floor does three things a sitewide minimum cannot: it accounts for the real cost of each SKU (a $3 item and a $30 item cannot share a floor), it absorbs fee-rate differences across categories, and it survives price changes in your cost of goods without a manual update — as long as you re-calculate when your landed cost changes.",
        "bullets": [
          "Prevents the race-to-zero dynamic common in high-volume categories",
          "Protects margin on slow movers that competitors aggressively discount",
          "Gives you confidence to turn on aggressive repricing modes — you know the worst case",
          "Keeps you compliant with MAP agreements if your supplier requires one"
        ]
      },
      {
        "h2": "How Undercut Enforces Your Floor on Every Listing",
        "body": "When you connect Undercut, you set a floor for each listing — either manually, via a bulk CSV import, or by entering your cost and letting Undercut calculate it using your stored fee rate and margin target. From that point, the repricer checks the current lowest competitor price and sets your price to one cent below — unless doing so would breach your floor, in which case it holds at the floor.\n\nOn Pro and Scale plans, AI aggressiveness tuning adjusts how quickly Undercut chases a competitor drop versus holding at a premium price point. This is useful in categories like electronics and collectibles where demand is inelastic — the lowest price does not always win the sale. The floor still holds regardless of which aggressiveness setting you choose; it is not a target, it is a hard stop.",
        "bullets": []
      },
      {
        "h2": "Common Mistakes Sellers Make When Setting Floors",
        "body": "Most floor errors come from leaving out a cost category or using a stale number. The most damaging mistakes:",
        "bullets": [
          "Using purchase price only and forgetting shipping — floors set this way are almost always too low",
          "Applying one floor to an entire category instead of per-SKU — a $2 margin on a $5 item is 40%; on a $50 item it is 4%",
          "Not updating floors after fee-rate changes — eBay adjusts category fees periodically; audit quarterly",
          "Setting a margin target of 0% 'just to move inventory' — after a return, you lose money",
          "Confusing the floor with the target price — the floor is the worst acceptable outcome, not the goal"
        ]
      }
    ],
    "faq": [
      {
        "q": "Can I set a different floor for each listing, or is it one number for my whole store?",
        "a": "Per-listing floors are the correct approach and what Undercut supports. A single store-wide floor ignores cost differences between SKUs. A high-cost item with a low sitewide floor will sell below cost; a low-cost item with a high sitewide floor will never compete. Set floors at the SKU level, calculated from each item's actual landed cost."
      },
      {
        "q": "What happens if a competitor's price is already below my floor before I even list?",
        "a": "Undercut will list your item at your floor price rather than matching the competitor. You may not win the sale — but you will not lose money on it either. If this happens frequently in a category, it is a signal to revisit your sourcing costs for that SKU, not to lower your floor."
      },
      {
        "q": "Do I need to include eBay's payment processing fee in my floor calculation?",
        "a": "Yes. eBay's quoted final value fee includes payment processing (formerly Managed Payments) in the blended rate. Check your Seller Hub fee schedule for your exact rate by category — it typically ranges from 12.9% to 15.55%. Using a flat 13.25% is a safe conservative default if you sell across multiple categories."
      },
      {
        "q": "Should my floor change during a sale or promotional period?",
        "a": "Your floor should not change unless your underlying costs change. Promotional pricing is a decision about your target price, not your minimum. If you run a sale, you are choosing to price closer to your floor — but the floor itself stays fixed at the cost-plus-minimum-margin figure."
      },
      {
        "q": "How does a price floor interact with the AI aggressiveness tuning on Pro and Scale plans?",
        "a": "AI aggressiveness controls how quickly and how deeply Undercut chases competitor price drops — but it operates entirely above your floor. A more aggressive setting means the repricer will close the gap to the competitor faster; a conservative setting holds at a premium longer. Either way, the floor is a hard stop the algorithm cannot cross."
      }
    ],
    "cta": {
      "heading": "Set Your Floors Once. Let Undercut Hold Them Forever.",
      "sub": "Start free with 25 listings — no credit card, no commitment. Upgrade only when you're ready to scale."
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
        "href": "/glossary/what-is-repricing",
        "label": "What Is Repricing?"
      },
      {
        "href": "/guides/ebay-seller-fees-explained",
        "label": "eBay Seller Fees Explained"
      },
      {
        "href": "/guides/ebay-repricing-best-practices",
        "label": "eBay Repricing Best Practices"
      }
    ],
    "slug": "what-is-a-price-floor",
    "collection": "glossary",
    "template": "glossary",
    "leadForm": false,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "What Is Dynamic Pricing? — Undercut",
    "metaDescription": "Dynamic pricing adjusts your prices automatically as the market moves. Learn how it differs from rule-based repricing — and start a 14-day trial, no card required.",
    "h1": "What Is Dynamic Pricing — and Why Your Floor Is the Most Important Part",
    "eyebrow": "Definition",
    "intro": "Dynamic pricing means your prices change automatically in response to live market conditions — competitor listings, demand signals, and inventory levels — rather than staying fixed until you manually update them. It sounds simple, but most sellers confuse it with rule-based repricing, which is something narrower. Understanding the difference, and knowing where a hard floor fits into both models, is what separates sellers who compete intelligently from those who race each other to zero.",
    "sections": [
      {
        "h2": "Dynamic Pricing vs. Rule-Based Repricing: Not the Same Thing",
        "body": "Rule-based repricing follows a fixed instruction: 'always be $0.10 below the lowest price.' It reacts to a snapshot of the market and applies one formula regardless of context. Dynamic pricing is broader — it can weigh multiple inputs simultaneously, including velocity, time of day, seasonal demand, and competitor behavior patterns, then adjust price along a range rather than by a fixed delta. In practice, most eBay repricers sold today are rule-based engines with a dynamic-sounding name. True dynamic pricing introduces variable aggressiveness: the system may drop more steeply when inventory is high and slow of movement, or hold price closer to your ceiling when stock is low and demand is rising. Undercut's AI aggressiveness tuning (available on Pro and Scale) is the mechanism that shifts between these modes automatically.",
        "bullets": [
          "Rule-based: one formula, always applied the same way",
          "Dynamic: multiple signals, variable response, range-aware",
          "Both need a floor — the difference is what happens above it"
        ]
      },
      {
        "h2": "Where a Hard Floor Fits — and Why It Is Not Optional",
        "body": "Every dynamic pricing system, no matter how sophisticated, needs a lower bound. Without one, competitive pressure from other automated sellers cascades downward until someone sells below cost. A hard floor is a per-item minimum price that the repricing engine will never cross, regardless of what competitors do. It is not a soft preference or a warning threshold — it is a hard stop. Undercut enforces the floor at the listing level, so each SKU carries its own minimum independent of every other SKU in your catalog.",
        "bullets": [
          "Floor is per-item, not account-wide",
          "The engine stops repricing down at the floor — it does not pause or warn",
          "If every competitor is already below your floor, Undercut holds at your floor rather than following them down"
        ]
      },
      {
        "h2": "How to Calculate a Real Floor: A Worked Example",
        "body": "A floor is not a guess. It is derived from your actual unit economics. Take a common scenario: you sell a USB-C hub that costs you $8.00 landed. You ship it yourself and average $4.00 in postage. eBay's final value fee on electronics is approximately 13.25% of the total sale price (item + shipping). You want a minimum net margin of 15% on the item cost. Here is the floor calculation step by step.\n\nLet F = floor price (item only, buyer pays shipping separately in this example).\n\nFees = 13.25% × F = 0.1325F\nRequired net = cost + target margin = $8.00 × 1.15 = $9.20\nF − 0.1325F = $9.20\n0.8675F = $9.20\nF = $9.20 ÷ 0.8675 ≈ $10.61\n\nIf shipping is included in the listing price, add $4.00 to the right side: F ≈ $15.22. If you want the full 15% on the combined cost-plus-shipping, the calculation becomes: 0.8675F = ($8.00 + $4.00) × 1.15 = $13.80, so F ≈ $15.90. Set $15.90 as the floor in Undercut and the engine will never take you below it, regardless of how aggressively competitors reprice."
      },
      {
        "h2": "How Dynamic Pricing Behaves Above the Floor",
        "body": "The floor defines the bottom of the range. Everything above it is where dynamic logic operates. Undercut's default mode targets the lowest active competitor price and undercuts it by the smallest increment needed to be the cheapest visible option — typically $0.01 to $0.05 depending on the category. On Pro and Scale plans, AI aggressiveness tuning adjusts this behavior based on your sell-through rate and margin headroom: when you have room and velocity is low, the engine moves more aggressively toward the competitive floor of the market; when stock is tight or velocity is already strong, it holds higher in the range to protect margin. This is the practical difference between static rule-based repricing and genuine dynamic pricing as applied to eBay."
      },
      {
        "h2": "Dynamic Pricing on eBay: Practical Limits to Know",
        "body": "eBay does not have an algorithmic buy box equivalent to Amazon's in most categories — visibility is driven by Best Match, which weighs seller reputation, shipping speed, and price together. Dynamic pricing on eBay therefore targets competitive positioning in search results, not a single box. This means the payoff of aggressive dynamic pricing is highest in high-volume, price-sensitive categories like consumer electronics, media, and commodity parts, and lower in categories where buyers sort by condition, rarity, or seller feedback rather than price alone.",
        "bullets": [
          "Electronics and media: price is a primary sort signal — dynamic pricing has high leverage",
          "Collectibles and vintage: condition and provenance matter more — set a higher floor and reprice conservatively",
          "Clothing: size and style filter before price — dynamic pricing still helps on commodity basics",
          "Books: highly price-competitive, thin margins — floor accuracy is critical"
        ]
      }
    ],
    "faq": [
      {
        "q": "If a competitor drops below my floor, will Undercut match them?",
        "a": "No. Undercut holds your listing at your floor price and stops repricing downward. The engine does not follow competitors below your set minimum under any circumstance. Your floor is a hard stop, not a preference."
      },
      {
        "q": "What is the difference between dynamic pricing and just setting a minimum price manually?",
        "a": "Setting a minimum manually is a one-time action — you set it and forget it, and the price sits there until you change it. Dynamic pricing continuously adjusts your price within the range between your floor and ceiling in response to live competitor activity. The floor and ceiling you set define the boundaries; dynamic logic decides where within those boundaries to price right now."
      },
      {
        "q": "Does dynamic pricing work differently for fixed-price listings versus auction listings on eBay?",
        "a": "Yes. Undercut reprices fixed-price (Buy It Now) listings only. Auction listings have prices set at the time the auction starts and cannot be changed mid-auction by a repricer. Dynamic pricing as a strategy is almost entirely a fixed-price phenomenon on eBay."
      },
      {
        "q": "How fast does Undercut reprice, and does speed matter for dynamic pricing?",
        "a": "Free and Starter plans reprice on a longer cycle. Pro reprices every 15 minutes and Scale every 5 minutes. Speed matters most in high-velocity, price-sensitive categories where multiple sellers are automated — if your repricer is slow, a competitor's faster engine will undercut you and hold the position. In slower categories, repricing frequency is less critical than floor accuracy."
      },
      {
        "q": "Can I use different floors for different listings, or is the floor account-wide?",
        "a": "Floors are set per listing in Undercut, not account-wide. This is intentional — your cost basis, fee structure, and margin requirements differ by item, so a single account-wide floor would either protect some items incorrectly or leave others unprotected. You set the floor for each SKU based on its own unit economics."
      }
    ],
    "cta": {
      "heading": "Reprice competitively — without ever crossing your floor",
      "sub": "Start free with 25 listings on the Free plan, or try any paid plan for 14 days. No credit card required."
    },
    "internalLinks": [
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/glossary/what-is-repricing",
        "label": "What Is Repricing?"
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
        "href": "/guides/ai-repricing-ebay",
        "label": "AI Repricing on eBay"
      }
    ],
    "slug": "what-is-dynamic-pricing",
    "collection": "glossary",
    "template": "glossary",
    "leadForm": false,
    "lastUpdated": "2026-06-09"
  },
  {
    "title": "What Is the eBay Buy Box? — Undercut",
    "metaDescription": "Learn what the eBay Buy Box is, how Best Match ranks your listings, and why a protected price floor wins it without killing your margin. 14-day free trial, no card.",
    "h1": "What Is the eBay Buy Box — and How Does Price Win It?",
    "eyebrow": "Definition",
    "intro": "Every eBay sale flows through one gate: Best Match. When a buyer searches for an item, eBay's algorithm scores every competing listing and surfaces one winner in the primary \"Buy It Now\" position — that's the Buy Box. Price is the single lever sellers control most directly. But slashing price without a limit destroys margin. The sellers who consistently win the Buy Box are the ones who reprice to the edge of competition, then hold there — protected by a hard floor below which they will never go.",
    "sections": [
      {
        "h2": "The eBay Buy Box, Defined",
        "body": "eBay's Buy Box is the prominent 'Buy It Now' button that appears when multiple sellers list the same or equivalent item. Unlike Amazon's buy box — which rotates among sellers sharing a single product page — eBay's version is tied to Best Match, the ranking algorithm that decides which listing a shopper sees first in search results. Winning Best Match is effectively winning the Buy Box: your listing loads first, converts at a higher rate, and generates the bulk of sales volume for that search query.",
        "bullets": [
          "Best Match factors: price (total cost to buyer including shipping), seller feedback score, handling time, item condition, and listing completeness.",
          "Price carries the most weight on commodity and multi-seller listings where other factors are equal.",
          "Sponsored Listings can buy placement, but organic Best Match is what sustains long-term volume."
        ]
      },
      {
        "h2": "How eBay's Best Match Algorithm Uses Price",
        "body": "eBay evaluates total buyer cost — item price plus shipping — not item price alone. A seller charging $18.00 with free shipping outranks a seller charging $14.99 plus $5.00 shipping in Best Match scoring, because the buyer's total is lower. This means your repricing strategy must account for your shipping model before setting a floor. eBay also looks at recent sales velocity: a listing that has converted well at a price point carries historical credibility that helps it hold rank even when a new competitor undercuts by a few cents.",
        "bullets": []
      },
      {
        "h2": "The Floor Calculation: A Worked Example",
        "body": "Repricing to win Best Match without a floor is how sellers accidentally sell below cost. Here is a concrete floor calculation for a mid-range electronics accessory. Suppose your landed cost (cost of goods) is $8.00, you offer free shipping that costs you $4.00 to fulfill, eBay's final value fee is 13.25% of the total sale price, and you require a minimum 15% net margin on cost. Your floor calculation works as follows: you need the sale price P to satisfy P minus (0.1325 × P) minus $4.00 minus $8.00 >= 0.15 × $8.00. Solving: 0.8675P >= $13.20, so P >= $15.22. Round up to $15.25 as your hard floor. Undercut will reprice down to $15.25 and stop — it will never go lower, no matter how aggressively a competitor drops.",
        "bullets": [
          "Cost of goods: $8.00",
          "Fulfillment / shipping: $4.00",
          "eBay final value fee (13.25%): applied to sale price",
          "Minimum margin target: 15% on cost ($1.20)",
          "Calculated hard floor: $15.25"
        ]
      },
      {
        "h2": "Why Automated Repricing Wins More Buy Boxes Than Manual Pricing",
        "body": "A competitor can change their price at any hour. Manual repricing — checking listings once a day or once a week — means you spend most of your time out of position. Undercut's Pro plan reprices every 15 minutes; the Scale plan reprices every 5 minutes. For high-competition categories like consumer electronics or media, that frequency is the difference between holding the top spot through a busy weekend or watching a competitor absorb your sales. The AI aggressiveness tuning on Pro and Scale plans lets you control how quickly Undercut closes on a competitor's price versus how much cushion it keeps — so you are not always racing to the exact floor.",
        "bullets": []
      },
      {
        "h2": "Floor-First Repricing: Protecting Margin While Competing on Price",
        "body": "The most common mistake sellers make when they start repricing is treating it as a pure race to the bottom. The Buy Box rewards competitiveness, but eBay's algorithm also depresses search visibility for listings with very low sell-through rates — a sign of a listing that is priced so low it attracts returns, disputes, or low-quality buyers. A hard floor is not just a financial safeguard; it is also a signal that you are pricing your item appropriately for its condition and your fulfillment model. Undercut enforces a per-listing floor you set, ensures every automated price move stays above that threshold, and logs every reprice so you can audit what happened and when.",
        "bullets": [
          "Set a floor per listing, not site-wide — different categories carry different fee structures and margins.",
          "Review floors quarterly as COGS and shipping rates change.",
          "Use Undercut's reprice log to spot listings where your floor is being hit frequently — a signal to renegotiate supplier cost or exit the SKU."
        ]
      }
    ],
    "faq": [
      {
        "q": "Does eBay have a Buy Box the same way Amazon does?",
        "a": "Not exactly. Amazon's buy box rotates among sellers sharing one product page. eBay's equivalent is the top Best Match position in search results, which is determined per listing rather than per product catalog entry. Winning it means your individual listing outscores competing listings on price, seller metrics, and listing quality."
      },
      {
        "q": "Will repricing to the lowest price always win Best Match?",
        "a": "Price is the strongest lever, but not the only one. A seller with a 99.8% feedback score, one-day handling, and a well-optimized listing title can hold Best Match against a slightly lower-priced competitor with poor seller metrics. Focus on being price-competitive within your floor, and keep your service metrics strong."
      },
      {
        "q": "How do I calculate the right floor so I never sell below cost on eBay?",
        "a": "Add your cost of goods plus shipping plus eBay's final value fee percentage (typically 12.9%–15% depending on category) plus any minimum margin you require. That sum is your floor. For example, a $8.00 item with $4.00 shipping, 13.25% fees, and a 15% margin target yields a floor of approximately $15.25. Set that number in Undercut per listing and the repricer will never drop below it."
      },
      {
        "q": "How often does eBay Best Match re-rank listings?",
        "a": "eBay re-evaluates Best Match rankings continuously as buyer searches happen, but the impact of a price change propagates within minutes to a few hours. Undercut's Pro plan reprices every 15 minutes and the Scale plan every 5 minutes, which is fast enough to respond to competitor moves before you lose meaningful traffic."
      },
      {
        "q": "Can I use a single floor for all my eBay listings?",
        "a": "You can set a site-wide default floor as a starting point, but a single floor is usually too blunt. A $15 item in the Books category carries different fee rates and shipping costs than a $15 item in Electronics. Undercut supports per-listing floors so each SKU reflects its actual cost structure."
      }
    ],
    "cta": {
      "heading": "Reprice to the edge — never past your floor",
      "sub": "Start free with 25 listings. No credit card needed. Set your hard floor on day one and let Undercut handle the rest."
    },
    "internalLinks": [
      {
        "href": "/guides/win-the-buy-box",
        "label": "How to Win the eBay Buy Box"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/glossary/what-is-repricing",
        "label": "What Is Repricing?"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      }
    ],
    "slug": "what-is-the-ebay-buy-box",
    "collection": "glossary",
    "template": "glossary",
    "leadForm": false,
    "lastUpdated": "2026-06-09"
  }
]
