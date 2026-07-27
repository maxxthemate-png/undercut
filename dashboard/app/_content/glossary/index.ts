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
        "body": "Automated repricing is only safe if it cannot push you below profitability. That lower bound is called the price floor. Here is a concrete example for a used paperback book:\n\nCOGS (sourced at): $3.00\nShipping (poly mailer + postage): $4.25\neBay final value fee (13.6% of total): ~$1.26 on a ~$9.50 sale\nPayPal/managed payments processing: $0.30 + 2.9% ≈ $0.51\nMinimum acceptable margin: 15%\n\nWorking backwards: to clear 15% margin after all costs of $9.02, your floor is roughly $10.38. Any automated rule must stop at or above that number — it should never reprice below it regardless of what competitors do. In Undercut, you set this floor per listing. The repricer beats the lowest competitor right up to that line, then holds.",
        "bullets": []
      },
      {
        "h2": "What Automated Repricing Does (and Doesn't Do)",
        "body": "An automated repricer watches competitor prices continuously and adjusts your listings according to rules you define. It does not invent strategy — it executes yours faster than you can manually. What good automation adds is speed (repricing in minutes rather than hours or days), consistency (the same logic applied to every listing every time), and a safety net (the floor). What it doesn't do: it won't rescue a bad sourcing decision, it won't compensate for a floor you set too low, and it won't tell you whether to be in a category at all. Automation amplifies your pricing strategy; it doesn't replace judgment about which items belong in your catalog.",
        "bullets": []
      }
    ],
    "faq": [
      {
        "q": "Does repricing always mean dropping my price?",
        "a": "No. Repricing means adjusting to the market in either direction. If a competitor sells out and you're the only seller left on a SKU, there's no lower listing for Undercut to beat, so your price holds. The floor sets the downside limit, and you can also set an optional ceiling."
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
        "a": "For slow-moving or unique items, once or twice a day is fine. For high-velocity categories like electronics or trading cards, 15-minute cycles make a measurable difference in won sales. Undercut's Pro and Scale plans both reprice every 15 minutes; Scale adds capacity for up to 10,000 listings plus priority support."
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
        "href": "/ebay-repricing-software",
        "label": "See Undercut's eBay Repricing Software →"
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
        "body": "A defensible per-item floor has four components, not one. The formula is:\n\nFloor = (Item Cost + Shipping Cost) / (1 − eBay Fee Rate) / (1 − Minimum Margin %)\n\neBay's combined fee rate (final value fee + insertion fee + payment processing) typically lands between 12.9% and 15.55% depending on category and seller level. A conservative default is 13.6%. Minimum margin is whatever you decide — 15% is a common starting point for resellers who need to cover returns and storage.",
        "bullets": [
          "Item Cost: your landed cost including sourcing, prep, and inbound freight",
          "Shipping Cost: actual carrier cost for the heaviest/largest dimension, not what you charge the buyer",
          "eBay Fee Rate: check your Seller Hub fee schedule — it varies by category",
          "Minimum Margin %: your business floor, not a guess — tie it to your return rate and storage costs"
        ]
      },
      {
        "h2": "Worked Example: Calculating a Floor for a $8 Item",
        "body": "Suppose you source a used kitchen gadget for $8.00. You ship it via USPS Ground Advantage for $4.00. Your eBay fee rate in the Home & Garden category is 13.6%. You want a minimum 15% net margin.\n\nStep 1 — Add hard costs: $8.00 + $4.00 = $12.00\nStep 2 — Gross up for eBay fees: $12.00 / (1 − 0.136) = $13.89\nStep 3 — Gross up for margin: $13.89 / (1 − 0.15) = $16.34\n\nYour floor is $16.34. Round up to $16.35 or $16.99 for psychological pricing — but never below $16.34. If a competitor lists at $14.99, Undercut holds your listing at $16.34 and you simply do not chase that sale. That is the point: some sales are not worth taking.",
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
        "body": "When you connect Undercut, you set each listing's Floor Price in the dashboard — either by entering the floor directly, or by entering your cost and letting Undercut calculate it using your stored fee rate and margin target. From that point, the repricer checks the current lowest competitor price and sets your price to one cent below — unless doing so would breach your floor, in which case it holds at the floor.\n\nOn the Pro and Scale plans, per-listing AI aggressiveness tuning adjusts how quickly each listing moves toward its floor versus holding at a premium price point. This is useful in categories like electronics and collectibles where demand is inelastic — the lowest price does not always win the sale. The floor still holds regardless of which aggressiveness setting you choose; it is not a target, it is a hard stop.",
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
        "a": "Yes. eBay's quoted final value fee includes payment processing (formerly Managed Payments) in the blended rate. Check your Seller Hub fee schedule for your exact rate by category — it typically ranges from 12.9% to 15.55%. Using a flat 13.6% is a safe conservative default if you sell across multiple categories."
      },
      {
        "q": "Should my floor change during a sale or promotional period?",
        "a": "Your floor should not change unless your underlying costs change. Promotional pricing is a decision about your target price, not your minimum. If you run a sale, you are choosing to price closer to your floor — but the floor itself stays fixed at the cost-plus-minimum-margin figure."
      },
      {
        "q": "How does a price floor interact with the AI aggressiveness tuning on the Pro and Scale plans?",
        "a": "AI aggressiveness controls how quickly each listing moves toward its floor as it chases competitor price drops — but it operates entirely above your floor. A more aggressive setting means the listing closes the gap to the competitor faster; a conservative setting holds at a premium longer. Either way, the floor is a hard stop the algorithm cannot cross."
      }
    ],
    "cta": {
      "heading": "Set Your Floors Once. Let Undercut Hold Them Forever.",
      "sub": "Start free with 25 listings — no credit card, no commitment. Upgrade only when you're ready to scale."
    },
    "internalLinks": [
      {
        "href": "/compare",
        "label": "See How Undercut's Floor-First Repricer Compares →"
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
        "body": "Rule-based repricing follows a fixed instruction: 'always be $0.10 below the lowest price.' It reacts to a snapshot of the market and applies one formula regardless of context. Dynamic pricing is broader — it can weigh multiple inputs simultaneously, including velocity, time of day, seasonal demand, and competitor behavior patterns, then adjust price along a range rather than by a fixed delta. In practice, most eBay repricers sold today are rule-based engines with a dynamic-sounding name. True dynamic pricing introduces variable aggressiveness: the system may move more steeply toward the floor on some items, or hold closer to a premium price point on others. Undercut's per-listing AI aggressiveness tuning (available on the Pro and Scale plans) lets you set, per listing, how fast and how far that listing moves toward its already-set floor.",
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
        "body": "A floor is not a guess. It is derived from your actual unit economics. Take a common scenario: you sell a USB-C hub that costs you $8.00 landed. You ship it yourself and average $4.00 in postage. eBay's final value fee on electronics is approximately 13.6% of the total sale price (item + shipping). You want a minimum net margin of 15% on the item cost. Here is the floor calculation step by step.\n\nLet F = floor price (item only, buyer pays shipping separately in this example).\n\nFees = 13.6% × F = 0.136F\nRequired net = cost + target margin = $8.00 × 1.15 = $9.20\nF − 0.136F = $9.20\n0.864F = $9.20\nF = $9.20 ÷ 0.864 ≈ $10.65\n\nIf shipping is included in the listing price, add $4.00 to the right side: F ≈ $15.28. If you want the full 15% on the combined cost-plus-shipping, the calculation becomes: 0.864F = ($8.00 + $4.00) × 1.15 = $13.80, so F ≈ $15.97. Set $15.97 as the floor in Undercut and the engine will never take you below it, regardless of how aggressively competitors reprice."
      },
      {
        "h2": "How Dynamic Pricing Behaves Above the Floor",
        "body": "The floor defines the bottom of the range. Everything above it is where dynamic logic operates. Undercut's default mode targets the lowest active competitor price and undercuts it by the smallest increment needed to be the cheapest visible option — typically $0.01 to $0.05 depending on the category. On the Pro and Scale plans, per-listing AI aggressiveness tuning adjusts this behavior on listings you choose: a more aggressive setting moves that listing toward its floor faster, while a conservative setting holds higher in the range longer. You decide the setting per listing — the AI only controls how fast and how far each listing moves toward the floor you already set, never the floor itself. This is the practical difference between a flat undercut and a tunable one as applied to eBay."
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
        "a": "Free and Starter plans reprice hourly. Pro and Scale both reprice every 15 minutes — the fastest cadence Undercut runs; Scale's difference is capacity (up to 10,000 listings) and priority support, not speed. Fast repricing matters most in high-velocity, price-sensitive categories where multiple sellers are automated — if your repricer is slow, a competitor's faster engine will undercut you and hold the position. In slower categories, repricing frequency is less critical than floor accuracy."
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
        "href": "/ebay-repricing-software",
        "label": "See Undercut's Repricing Software in Action →"
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
        "body": "Repricing to win Best Match without a floor is how sellers accidentally sell below cost. Here is a concrete floor calculation for a mid-range electronics accessory. Suppose your landed cost (cost of goods) is $8.00, you offer free shipping that costs you $4.00 to fulfill, eBay's final value fee is 13.6% of the total sale price, and you require a minimum 15% net margin on cost. Your floor calculation works as follows: you need the sale price P to satisfy P minus (0.136 × P) minus $4.00 minus $8.00 >= 0.15 × $8.00. Solving: 0.864P >= $13.20, so P >= $15.28. Round up to $15.30 as your hard floor. Undercut will reprice down to $15.30 and stop — it will never go lower, no matter how aggressively a competitor drops.",
        "bullets": [
          "Cost of goods: $8.00",
          "Fulfillment / shipping: $4.00",
          "eBay final value fee (13.6%): applied to sale price",
          "Minimum margin target: 15% on cost ($1.20)",
          "Calculated hard floor: $15.25"
        ]
      },
      {
        "h2": "Why Automated Repricing Wins More Buy Boxes Than Manual Pricing",
        "body": "A competitor can change their price at any hour. Manual repricing — checking listings once a day or once a week — means you spend most of your time out of position. Undercut's Pro and Scale plans both reprice every 15 minutes (Scale adds capacity for up to 10,000 listings plus priority support, not faster repricing). For high-competition categories like consumer electronics or media, that frequency is the difference between holding the top spot through a busy weekend or watching a competitor absorb your sales. The per-listing AI aggressiveness tuning on the Pro and Scale plans lets you control how quickly each listing closes on a competitor's price versus how much cushion it keeps — so you are not always racing to the exact floor.",
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
        "a": "Add your cost of goods plus shipping plus eBay's final value fee percentage (typically 12.9%–15% depending on category) plus any minimum margin you require. That sum is your floor. For example, a $8.00 item with $4.00 shipping, 13.6% fees, and a 15% margin target yields a floor of approximately $15.25. Set that number in Undercut per listing and the repricer will never drop below it."
      },
      {
        "q": "How often does eBay Best Match re-rank listings?",
        "a": "eBay re-evaluates Best Match rankings continuously as buyer searches happen, but the impact of a price change propagates within minutes to a few hours. Undercut's Pro and Scale plans both reprice every 15 minutes, which is fast enough to respond to competitor moves before you lose meaningful traffic."
      },
      {
        "q": "Can I use a single floor for all my eBay listings?",
        "a": "You set a floor on each listing, and a single blanket number across all of them is usually too blunt. A $15 item in the Books category carries different fee rates and shipping costs than a $15 item in Electronics. Undercut supports per-listing floors so each SKU reflects its actual cost structure."
      }
    ],
    "cta": {
      "heading": "Reprice to the edge — never past your floor",
      "sub": "Start free with 25 listings. No credit card needed. Set your hard floor on day one and let Undercut handle the rest."
    },
    "internalLinks": [
      {
        "href": "/ebay-repricing-software",
        "label": "See How Undercut Helps You Win Best Match →"
      },
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
  },
  {
    "slug": "final-value-fee",
    "collection": "glossary",
    "template": "glossary",
    "title": "Final Value Fee: eBay Rates & How They Work — Undercut",
    "metaDescription": "Learn 2026 eBay final value fee rates by category and how FVFs set your repricing floor. Calculate real costs free — no card needed to start.",
    "h1": "eBay Final Value Fees Explained: 2026 Rates, What They Cover, and How to Price Around Them",
    "eyebrow": "eBay Fee Glossary",
    "intro": "A final value fee (FVF) is the percentage eBay charges on every completed sale — applied not just to the item price but to shipping and sales tax as well. For most categories in 2026, that rate sits at approximately 13.6%, with media climbing to 15.3% and qualifying sneakers over $150 dropping to 8%. Select Business & Industrial listings can be as low as 3%. On top of the percentage, eBay adds a per-order fee of $0.30 or $0.40. Because FVFs hit the entire transaction value, they must be the first input in any credible floor formula — not an afterthought.",
    "sections": [
      {
        "h2": "2026 eBay Final Value Fee Rates by Major Category",
        "body": "eBay's fee schedule as of 2026 breaks down by category. Most categories — including Electronics, Clothing & Accessories, Home & Garden, Toys, and Sporting Goods — carry a rate of approximately 13.6% on the total amount of the sale (item price + shipping charged to buyer + applicable sales tax). Media categories (Books, DVDs, Music, Video Games) are higher at roughly 15.3%. Sneakers priced at $150 or more on the dedicated sneaker platform drop to 8%. Certain Business & Industrial subcategories qualify for a 3% rate. Every order also incurs a flat per-order fee: $0.30 for most transactions, $0.40 for orders under a certain threshold. Always verify your specific subcategory on eBay's fee page before building a margin model, since rates shift and subcategory carve-outs exist.",
        "bullets": [
          "Most categories: ~13.6% on item + shipping + tax",
          "Books, DVDs, Music, Video Games: ~15.3%",
          "Sneakers $150+: 8%",
          "Select Business & Industrial: 3%",
          "Per-order fee: $0.30–$0.40 per transaction (added on top of percentage)"
        ]
      },
      {
        "h2": "What the FVF Actually Applies To",
        "body": "Many sellers make the mistake of modeling fees only against the item price. eBay calculates the final value fee on the total amount of the sale, which includes the item price, the shipping amount the buyer pays, and any sales tax collected. If you list a $40 item with $8 shipping, your FVF base is $48, not $40. At 13.6%, that's $6.53 in FVFs — versus $5.44 if you only counted the item price. That $1.09 gap per transaction is meaningful at volume. Sellers who offer free shipping often miss this because shipping isn't a line item, but it's already baked into the price, so the math still applies. Tax treatment varies by state, but eBay collects and remits marketplace facilitator taxes in most US jurisdictions, and those amounts do factor into the FVF calculation.",
        "bullets": [
          "FVF base = item price + buyer-paid shipping + collected sales tax",
          "Free shipping doesn't eliminate the issue — it just folds shipping into item price",
          "Sales tax is included in the FVF base in most US states"
        ]
      },
      {
        "h2": "How FVFs Feed the Floor Formula",
        "body": "A repricing floor is the lowest price you'll ever sell an item for without losing money. To calculate it correctly, you need to account for every cost that scales with the sale — and FVFs are the largest one. A basic floor formula looks like: Floor = (Cost of Goods + Fixed Fees) / (1 - FVF Rate - Payment Processing Rate) + Per-Order Fee + Minimum Profit. For a $50 item costing $32 with $3 shipping in a 13.6% FVF category, the FVF alone is roughly $7.21 if you include the shipping and assume $5 buyer-paid shipping. Miss that calculation and you'll reprice below cost at scale. Undercut builds the FVF and per-order fee directly into the floor it enforces — you input your cost and target margin, and the system calculates the minimum price automatically before any competitive repricing occurs.",
        "bullets": [
          "FVF is applied before you see proceeds, so it must be subtracted from revenue, not added to cost",
          "Use the gross-up method: divide by (1 - fee rate) rather than subtracting a flat estimate",
          "Per-order fee adds a fixed cost that hurts low-price items disproportionately"
        ]
      },
      {
        "h2": "Why FVFs Matter More When You're Repricing Competitively",
        "body": "Automated repricing creates a specific FVF risk: the system can legitimately shave your price by $0.01 to beat a competitor, but if your floor wasn't built on accurate fee math, that $0.01 undercut might be $2.00 below your actual break-even. Repricing tools that let sellers set a raw dollar floor rather than a cost-based floor are dangerous for this reason — a seller might set $45 as a floor on intuition, not realizing their true break-even at 13.6% FVF plus a $0.40 per-order fee and their COGS is actually $46.82. Undercut's floor-first design forces fee accuracy upfront: when you set your cost and margin target, the tool surfaces the calculated floor before activating repricing. If Undercut isn't a fit — for example, if you're in a low-volume, manually managed store with fewer than 10 listings — you can still use the free eBay fee calculator to run the math without signing up.",
        "bullets": [
          "A price floor set by intuition instead of fee math will erode margin invisibly",
          "FVF + per-order fee + COGS must all be inputs to any reliable floor",
          "Undercut surfaces the calculated floor before enabling repricing — not after the first sale"
        ]
      },
      {
        "h2": "Reducing FVF Impact Without Violating eBay's Policies",
        "body": "You cannot negotiate FVFs down as an average seller, but you can manage their impact structurally. First, category selection matters — listing an item in the correct subcategory can mean the difference between 13.6% and 3%. Second, pricing at thresholds where rate breaks apply (e.g., sneakers at exactly $150 to qualify for the 8% rate) is a legitimate optimization. Third, absorbing shipping into item price versus charging separately can shift the FVF calculation depending on your specific buyer mix and whether shipping is a cost center. Fourth, and most directly relevant to repricing, building a precise floor eliminates the risk of subsidizing buyers at your own expense. None of these tactics involve violating eBay policy — they're standard margin management. The goal is to compete on price without letting FVFs silently compress your profit to zero.",
        "bullets": [
          "Verify your subcategory — misclassification can mean overpaying on FVFs",
          "Sneaker $150+ threshold unlocks 8% rate — price engineering near thresholds is legitimate",
          "Precise cost-based floors are the single highest-leverage FVF protection for repricers"
        ]
      }
    ],
    "faq": [
      {
        "q": "Does eBay charge the final value fee on shipping?",
        "a": "Yes. eBay calculates the final value fee on the total amount of the sale, which includes the shipping amount the buyer pays. If a buyer pays $8 shipping on a $40 item, your FVF base is $48. At 13.6%, that's roughly $6.53 in fees. Sellers who offer free shipping aren't exempt — the shipping cost is baked into the item price, so the math still applies to the full transaction value."
      },
      {
        "q": "What is the eBay final value fee for most categories in 2026?",
        "a": "For most categories in 2026 — including Electronics, Clothing, Home & Garden, and Toys — eBay charges approximately 13.6% of the total sale amount (item + shipping + tax). Media categories like Books and DVDs are higher at around 15.3%. Sneakers priced at $150 or more qualify for 8%. Some Business & Industrial subcategories are as low as 3%. A flat per-order fee of $0.30 or $0.40 is added to every transaction on top of the percentage."
      },
      {
        "q": "How do I use the final value fee to set a repricing floor?",
        "a": "The correct approach is to gross up your costs rather than subtract a flat fee estimate. Floor = (COGS + fixed costs) / (1 - FVF rate - processing rate) + per-order fee + minimum margin. For a $32 item with $5 buyer-paid shipping at 13.6% FVF and $0.40 per-order fee, your floor calculation must account for the FVF applied to the full $37 base. Undercut automates this — you input cost and target margin, and it calculates and enforces the floor before repricing begins."
      },
      {
        "q": "Is Undercut suitable for sellers in the 3% Business & Industrial category?",
        "a": "Yes, but the dynamics differ. At 3% FVF, your floor is lower relative to item price, which means competitors have more room to undercut you in absolute dollars before hitting their own floors. Undercut's floor math works correctly at any FVF rate — you enter your actual category rate, and the system uses it. For B&I sellers with high-ticket, low-volume items, manual repricing may be sufficient; the Free plan (25 listings, hourly) is a reasonable starting point."
      },
      {
        "q": "Does the final value fee apply to canceled or refunded transactions?",
        "a": "eBay typically issues a final value fee credit when a transaction is canceled through the proper process (buyer requests cancel, or seller files an unpaid item case). For returns where the buyer keeps the item or a partial refund is issued, the FVF credit may be partial or unavailable. This means your effective FVF cost across a full month is slightly higher than the nominal rate once you account for refund scenarios that don't yield full credits. Build a small buffer into your floor to account for this."
      }
    ],
    "internalLinks": [
      {
        "href": "/pricing",
        "label": "See Undercut Plans & Pricing →"
      },
      {
        "href": "/guides/ebay-seller-fees-explained",
        "label": "eBay Seller Fees Explained"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to Set an eBay Price Floor"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/ebay-fee-calculator",
        "label": "Free eBay Fee Calculator"
      }
    ],
    "lastUpdated": "2026-06-10",
    "leadForm": true
  },
  {
    "slug": "race-to-the-bottom",
    "collection": "glossary",
    "template": "glossary",
    "title": "Race to the Bottom: eBay Pricing Explained — Undercut",
    "metaDescription": "A race to the bottom destroys eBay margins fast. Learn how it starts, how to spot one before joining, and how a hard floor stops the spiral—free, no card needed.",
    "h1": "Race to the Bottom: How eBay Price Wars Start and How to Escape Them",
    "eyebrow": "Glossary Term",
    "intro": "A race to the bottom happens when two or more eBay sellers keep undercutting each other automatically, with no minimum price to stop them. Each repricing cycle shaves a few cents off the ask; within hours the listing price can drop below eBay fees, let alone profit. It is not a strategy—it is a mechanical outcome of automation without guardrails. The fix is not slower repricing; it is a hard floor below which your repricer simply refuses to go, so you stay competitive without bleeding margin every time a competitor blinks.",
    "sections": [
      {
        "h2": "What a Race to the Bottom Actually Means",
        "body": "In economics, a race to the bottom describes competitive pressure that forces every participant to match the worst terms in the market. On eBay, it plays out in minutes rather than months. Seller A lists a widget at $24.99. Seller B's repricer sees it and drops to $24.89. Seller A's repricer fires back at $24.79. By the time a buyer searches, the price may have fallen to $18.00—below the point where either seller covers eBay's ~13.6% final value fee plus the $0.30 per-order fee, let alone their cost of goods. Neither seller intended to sell at a loss. Both just told their tools to beat the lowest price, full stop."
      },
      {
        "h2": "The Mechanics: How Two Sellers Destroy Each Other",
        "body": "The cycle has four repeating steps. First, one seller reprices down by a small increment—often $0.01 to $0.10. Second, the other seller's repricer detects the new lowest price and fires its own downward move within seconds or minutes. Third, because neither repricer has a floor, they keep leapfrogging until one hits a platform minimum or a human notices. Fourth, one seller eventually sells the item at a loss; the other may never sell it at all. A concrete example: a $20 item with $8 cost, eBay fees of roughly $3.02 (13.6% of $20 + $0.30), and $1 shipping leaves $7.98 gross profit at full price. A race can erase that entirely within a single repricing session if neither side sets a floor around $12.32—the true break-even."
      },
      {
        "h2": "How a Hard Floor Breaks the Cycle",
        "body": "A floor is a per-listing minimum price that your repricer will never cross, no matter what competitors do. Set it at cost + eBay fees + minimum margin—for example, cost $8.00 + fees ~$2.24 (13.6% of $16.50 floor) + $0.30 per-order + $1 shipping + $1 minimum margin = roughly $12.54. Once your repricer hits that floor it stops cutting and holds. If a competitor keeps going below your floor, you simply do not match them. You lose the sale to someone willing to take a loss, but you do not take that loss yourself. Over hundreds of SKUs, floors turn repricing from a liability into a systematic margin defense. Undercut is built floor-first: you set the floor before the repricer ever fires a price change.",
        "bullets": [
          "Floor = cost + eBay final value fee (~13.6%) + per-order fee ($0.30–$0.40) + target margin",
          "Once the floor is hit, Undercut holds price and does not follow competitors further down",
          "Competitors selling below cost will often run out of stock or pull the listing—patience is a strategy",
          "Floors apply per-listing, so high-margin SKUs stay protected differently from low-margin ones"
        ]
      },
      {
        "h2": "Spotting a Race Before You Join One",
        "body": "Not every competitive listing is a race to the bottom. Look for three warning signs before activating a repricer on a crowded SKU. First, check the listing history: if the current price is more than 30% below the average sold price for the same item over the last 90 days, a race is already underway. Second, count the active sellers: five or more identical listings within $1 of each other often signals automated leapfrogging. Third, run the math before repricing: if the lowest competitor price minus eBay fees minus your cost leaves less than $1, you are being invited to race, not compete. In those cases the better move is to hold your current price, optimize your listing title and photos, and wait for oversupplied competitors to sell through their stock.",
        "bullets": [
          "Price 30%+ below 90-day average sold price: race likely in progress",
          "5+ sellers within $1 of each other: automated leapfrogging probable",
          "Gross margin under $1 at competitor's price: do not reprice to match",
          "High sell-through rate + few sellers: safe to reprice aggressively"
        ]
      },
      {
        "h2": "When Undercut Is and Is Not the Right Tool",
        "body": "Undercut is designed for sellers who want to stay competitive without manual price monitoring, on eBay specifically. It works well when you have clear cost data per SKU and can set accurate floors. It works less well on ultra-commoditized categories—brand-new electronics, for example—where dozens of sellers list identical new-in-box units and margins are structurally thin. In those cases, automated repricing without a rigorous floor strategy accelerates losses rather than preventing them. If your average gross margin per SKU is under 15% before fees, the first step is fixing your sourcing or focusing on less-competitive categories—repricing software cannot manufacture margin that was never there."
      }
    ],
    "faq": [
      {
        "q": "What is the simplest definition of a race to the bottom on eBay?",
        "a": "Two or more sellers use automated repricing to stay below each other's price, with no minimum price set. Each repricing cycle pushes the price lower until one or both sellers are covering eBay's fees—roughly 13.6% plus $0.30–$0.40 per order—with nothing left for cost of goods or profit. It is an unintended outcome of automation without floors, not a deliberate pricing strategy."
      },
      {
        "q": "Can a repricer actually cause me to sell below cost?",
        "a": "Yes, if you do not set a hard floor. A repricer's job is to match or beat the lowest competitor. If that competitor is already below your break-even—or if the two repricers keep leapfrogging each other—your repricer will follow right off the cliff. Undercut prevents this by locking in a per-listing floor before any price change fires. If the market goes below your floor, you hold, not follow."
      },
      {
        "q": "How do I calculate the right floor price for an eBay listing?",
        "a": "Start with your landed cost per unit. Add eBay's final value fee—typically 13.6% of the total sale price including shipping—plus the per-order fee of $0.30 or $0.40 depending on your store tier. Add your actual shipping cost. Then add your minimum acceptable margin in dollars. That sum is your floor. Example: $8 cost + $2.24 fee + $0.30 order fee + $1.00 shipping + $1.00 margin = $12.54 floor."
      },
      {
        "q": "Should I ever reprice into a race to the bottom to win the sale?",
        "a": "Only if you have analyzed why competitors are selling below apparent break-even. Sometimes a seller has dramatically lower acquisition costs or is liquidating inventory—in which case they will sell through quickly and the market will recover. More often, matching a below-cost price just means taking a loss. The better play is to hold your floor, optimize your listing quality to win on factors other than price, and let undercutters exit the market on their own."
      },
      {
        "q": "How fast does Undercut reprice, and does speed matter in a price war?",
        "a": "On the Free plan, Undercut reprices hourly. Starter reprices hourly too. Pro reprices every 15 minutes. In a true race to the bottom, repricing faster just accelerates the descent. Speed matters most in healthy competitive markets where you want to react quickly to genuine price movements. In a race, the floor—not the speed—is what protects you. A floor set correctly on the Free plan is safer than no floor on the fastest repricer available."
      }
    ],
    "internalLinks": [
      {
        "href": "/compare",
        "label": "See Undercut's Floor-First Repricer →"
      },
      {
        "href": "/glossary/what-is-a-price-floor",
        "label": "What Is a Price Floor?"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "Setting an eBay Price Floor"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      }
    ],
    "lastUpdated": "2026-06-10",
    "leadForm": true
  },
  {
    "slug": "sell-through-rate",
    "collection": "glossary",
    "template": "glossary",
    "title": "Sell-Through Rate on eBay: What It Is & How to Use It — Undercut",
    "metaDescription": "Sell-through rate measures how fast your eBay listings actually sell. Learn benchmarks by category, the pricing connection, and how to reprice smarter—free, no.",
    "h1": "Sell-Through Rate: The eBay Metric That Tells You Whether to Reprice",
    "eyebrow": "eBay Glossary",
    "intro": "Sell-through rate (STR) is the percentage of listed units that sell within a given time window: units sold ÷ units listed × 100. A listing with 10 views and 3 purchases in 30 days has a 30% STR. On eBay it's the clearest signal you have that your price is (or isn't) competitive. High STR means you're moving inventory; low STR usually means you're priced out of the market or the item has weak demand. Either way, STR tells you exactly when repricing will help—and when it won't.",
    "sections": [
      {
        "h2": "How to Calculate Sell-Through Rate on eBay",
        "body": "The formula is simple: STR = (units sold ÷ units listed) × 100. Use a fixed time window—7 days, 30 days, or 90 days—and keep it consistent when comparing items or categories. On eBay, pull your sold and active listing counts from Seller Hub under Performance > Sales. For a category-level view, use the eBay Seller Hub research tab or Terapeak (free with a Store subscription). Example: you listed 40 pairs of sneakers in May and sold 22. Your 30-day STR is 22 ÷ 40 × 100 = 55%. One important nuance: multi-quantity listings count each unit individually, not each listing, so make sure you're dividing units sold by units available, not listing count.",
        "bullets": [
          "STR = units sold ÷ units listed × 100",
          "Pick a fixed window (7, 30, or 90 days) and stick to it",
          "Use Terapeak for category-level benchmarks (free with eBay Store)",
          "Count units, not listings, for multi-quantity SKUs"
        ]
      },
      {
        "h2": "Healthy STR Benchmarks by eBay Category",
        "body": "There is no universal 'good' STR—it varies widely by category, condition, and how competitive the niche is. These are approximate ranges based on typical observed patterns; treat them as starting points, not hard targets. Electronics (phones, tablets, accessories): 30–60% monthly STR is normal; competition is fierce and prices move fast. Sneakers and streetwear: 20–50% depending on colorway demand; hyped releases can hit 80%+. Trading cards and collectibles: 10–30% is typical; niche items can sit for months at the right price. Home goods and tools: 15–40%; seasonal spikes are common. Used media (books, CDs, games): often under 10% per month at standard prices—volume and low handling costs make the model work. If your STR is consistently below 5% in a category where similar items clear at 25%, pricing is almost certainly the lever to pull first.",
        "bullets": [
          "Electronics: 30–60% monthly STR typical",
          "Sneakers/streetwear: 20–50%, hyped items higher",
          "Collectibles/cards: 10–30%",
          "Used media: under 10% is normal at standard pricing"
        ]
      },
      {
        "h2": "How Pricing Directly Affects Sell-Through Rate",
        "body": "Price is the most controllable driver of STR on eBay. eBay's search algorithm (Cassini) factors price competitiveness into placement, so a listing priced 15% above comparable sold comps often ranks lower and converts worse—resulting in a low STR that looks like a demand problem but is actually a pricing problem. The relationship is not perfectly linear: dropping price by 5% rarely doubles your STR, but being within 3–5% of the lowest comparable listing tends to put you in contention for the sale. The risk is racing to the bottom: cutting price without tracking profit per unit means you can hit 100% STR while losing money on every sale. This is why a hard cost floor—your minimum acceptable net after eBay's ~13.6% final value fee, the $0.30–$0.40 per-order fee, and your cost of goods—should be set before any repricing decision. Undercut enforces this floor automatically so you never reprice below break-even.",
        "bullets": [
          "eBay ranks price-competitive listings higher, boosting visibility and STR",
          "Being within 3–5% of the lowest comp puts you in contention",
          "Never cut price without knowing your break-even floor first",
          "eBay fees (~13.6% FVF + $0.30–$0.40 per order) must be in your floor calculation"
        ]
      },
      {
        "h2": "Using STR to Decide When to Reprice",
        "body": "STR gives you a trigger, not a magic answer. A practical decision tree: if STR is above your category benchmark, hold price or test a small increase—you're clearing inventory fast enough. If STR is 50–75% of benchmark, run a modest reprice down to the lowest comparable active listing and monitor for 7 days. If STR is below 25% of benchmark for 14+ days and comps are moving, your price is almost certainly too high—reprice to the lowest comp or slightly below and set a floor to protect margin. If STR is low and comps aren't moving either, the issue is demand, not price; repricing won't help much. Automated repricers like Undercut handle the middle case continuously: they watch for a new lowest competitor, undercut by your configured amount, and stop at your floor—doing in seconds what a manual check takes hours. Free plan covers 25 listings with hourly checks; Pro ($79/mo) covers 1,000 listings with 15-minute intervals.",
        "bullets": [
          "STR above benchmark: hold or test a small price increase",
          "STR 50–75% of benchmark: trim price to lowest active comp, watch 7 days",
          "STR below 25% of benchmark for 14+ days: aggressive reprice down to floor",
          "STR low AND comps not moving: demand problem, repricing won't fix it"
        ]
      },
      {
        "h2": "STR Limits: When Repricing Won't Save a Listing",
        "body": "Sell-through rate is a diagnostic, not a cure. Several situations make repricing ineffective or harmful. First, if you have a niche item with fewer than 5 sold comps in 90 days, STR data is too thin to act on—you're guessing, not measuring. Second, condition mismatches: a 'Good' condition item priced the same as 'Very Good' will have low STR regardless of price because buyers can read condition grades. Third, poor listing quality—blurry photos, sparse titles, missing item specifics—suppresses clicks before price is even a factor. Fix the listing first. Fourth, if repricing to the market floor puts you below your cost floor, the right answer is to stop selling that SKU, not to eat the loss. Undercut's floor-first design means it will simply stop repricing rather than push you below break-even, which is the correct behavior when margins compress.",
        "bullets": [
          "Thin comp data (< 5 sold in 90 days): STR signal is too noisy",
          "Condition mismatches suppress STR independent of price",
          "Listing quality issues need fixing before repricing helps",
          "If market floor < cost floor, exit the SKU—don't race to a loss"
        ]
      }
    ],
    "faq": [
      {
        "q": "What is a good sell-through rate on eBay?",
        "a": "It depends heavily on category. Electronics typically clear at 30–60% monthly STR; collectibles and trading cards often run 10–30%; used media can be under 10% and still be profitable at volume. The more useful question is: how does your STR compare to similar sold comps in your specific niche? If category peers are clearing at 40% and you're at 8%, pricing or listing quality is holding you back."
      },
      {
        "q": "Does eBay show sell-through rate anywhere in Seller Hub?",
        "a": "Not as a single labeled metric, but you can calculate it yourself. Seller Hub > Performance > Sales shows units sold per period. Compare that to your active listing quantity for the same window. Terapeak (free with any eBay Store subscription) goes deeper—it shows historical sold volume and listing counts for specific keywords, which lets you benchmark your STR against the broader market for that item."
      },
      {
        "q": "Can I improve STR without lowering my price?",
        "a": "Yes, in some cases. Better photos, a keyword-rich title, complete item specifics, and competitive shipping speed all influence click-through and conversion rates independent of price. If your listing quality is below average for the category, fix that first—lowering price on a poorly optimized listing often doesn't move the needle enough to justify the margin hit. Once listing quality is solid, price becomes the primary remaining lever."
      },
      {
        "q": "How does Undercut use sell-through rate signals to reprice?",
        "a": "Undercut doesn't directly ingest your STR as an input today—it monitors the lowest competitor price in real time and adjusts yours automatically, stopping at the floor you set. You bring the STR analysis: if your STR is low and you've confirmed competitors are moving, lower your floor slightly and let Undercut chase the market. The 14-day free Starter trial (no card required) lets you test this on up to 100 listings before committing."
      },
      {
        "q": "What's the difference between sell-through rate and conversion rate on eBay?",
        "a": "Conversion rate is views-to-purchases: how many people who saw your listing actually bought. STR is listings-to-sales: how many of your available units sold in a period. Both matter but measure different things. Low conversion rate with decent STR usually means a listing visibility problem—you're getting found but not clicked. Low STR across the board usually points to pricing or demand. Use both together for a full diagnosis."
      }
    ],
    "internalLinks": [
      {
        "href": "/ebay-repricing-software",
        "label": "See Undercut's eBay Repricing Software →"
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
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/glossary/what-is-repricing",
        "label": "What Is Repricing?"
      }
    ],
    "lastUpdated": "2026-06-10",
    "leadForm": true
  },
  {
    "slug": "undercutting",
    "collection": "glossary",
    "template": "glossary",
    "title": "What Is Undercutting in eBay Pricing? — Undercut",
    "metaDescription": "Undercutting means beating rivals on price to win sales—but without a floor it destroys margin. See how Undercut automates it safely. Free trial, no card needed.",
    "h1": "Undercutting: How It Works, When It Wins, and When It Backfires",
    "eyebrow": "Pricing Glossary",
    "intro": "Undercutting means pricing your listing below the current lowest competitor to win the sale. On eBay, where buyers sort by price + shipping and the cheapest active listing gets the click, undercutting is the default competitive move. Done with a hard floor—a per-item minimum that covers cost, fees, and target margin—it's a durable strategy. Done without one, you enter a race to the bottom where every seller cuts until nobody profits. The difference between those two outcomes is almost entirely about whether your floor is set before you start repricing.",
    "sections": [
      {
        "h2": "What Undercutting Actually Means",
        "body": "Undercutting is the act of pricing an item at least $0.01 below the next-lowest identical or equivalent listing. On commodity marketplaces like eBay, where multiple sellers often list the same SKU, the cheapest option wins the visible top spot when buyers sort by price. A single penny can be the margin between a sale and none—this is called penny-undercutting. More aggressive sellers drop by a fixed percentage (say 1–3%) to ensure they stay clearly ahead even after rounding. The tactic is rational when your cost structure supports it: if your landed cost is $8.00 and the current floor listing is $14.99, dropping to $14.98 captures the sale while keeping $3–4 in margin after eBay's ~13.6% final value fee plus the $0.30 per-order charge."
      },
      {
        "h2": "Penny-Undercutting Mechanics",
        "body": "Penny-undercutting is the purest form: every seller in the stack prices $0.01 below the next. On a $20 item, the difference is negligible to the buyer but meaningful in aggregate for sellers competing at volume. The problem emerges when sellers react to each other in loops: Seller A drops to $19.99, Seller B drops to $19.98, Seller A reprices again to $19.97—within hours the price can collapse to near-cost with no one benefiting. Manual repricing makes this slow; automated repricing without a floor makes it instantaneous and catastrophic. eBay's final value fee of roughly 13.6% on the total amount means a $20 listing already carries a $2.72 fee before shipping costs. Penny-undercutting without floor logic erases that buffer fast.",
        "bullets": [
          "Each $0.01 drop on a $20 item is a 0.05% price reduction—invisible to buyers, painful in a loop",
          "eBay charges ~13.6% FVF on item price + shipping + tax, plus $0.30–$0.40 per order",
          "A $20 item with $5 shipping incurs ~$3.40 in FVF alone—floor must account for this",
          "Automated loops without floors can collapse a price from $20 to $12 overnight"
        ]
      },
      {
        "h2": "When Undercutting Wins vs. When It Destroys Margin",
        "body": "Undercutting is the right move on commodity listings where your cost structure is lower than the market. If you sourced a popular electronics accessory for $6 and competitors list at $18.99, you can undercut to $17.99, earn solid margin, and still have room to defend if others react. It also works well when you have volume: even thin margins per unit add up across hundreds of daily sales. Undercutting fails when there is no cost advantage, when the market is already thin, or when the seller has no floor set. Without a floor, the repricer just chases the lowest listing indefinitely. A single low-ball competitor—perhaps someone liquidating at cost—can drag your price below breakeven before you notice. The fix is simple but mandatory: set a floor equal to your item cost plus eBay fees plus your minimum acceptable margin, and never let the repricer cross it.",
        "bullets": [
          "Wins: commodity SKUs, cost advantage exists, high-volume operation with thin but consistent margins",
          "Wins: you need to clear inventory and floor covers landed cost at minimum",
          "Loses: no cost advantage over competitors already at thin margins",
          "Loses: no floor set—any liquidator in the stack pulls you to breakeven or below"
        ]
      },
      {
        "h2": "Automated Undercutting With a Floor: How Undercut Does It",
        "body": "Undercut reprices every listing to beat the current lowest competitor automatically, 24/7—but the floor is hardcoded per listing and the repricer will not cross it. If the market drops below your floor, your listing simply holds at floor price and stops competing on price alone. This is the structural difference from a race to the bottom: the floor acts as a circuit breaker. On the Free plan ($0), 25 listings reprice hourly. Starter ($29/mo) covers 100 listings at hourly cadence. Pro ($79/mo) covers 1,000 listings with 15-minute repricing and per-listing AI aggressiveness tuning that lets you set, per listing, how fast and how far it moves toward its floor. Scale ($199/mo) handles 10,000 listings with 15-minute repricing and priority support. Every account starts with a 14-day Starter trial—no card required—so you can set floors, watch the repricer run, and verify margin before committing. Annual plans include two months free.",
        "bullets": [
          "Free plan: 25 listings, hourly repricing, floor protection included",
          "Pro plan ($79/mo): 1,000 listings, 15-min cadence, per-listing AI aggressiveness tuning toward your set floor",
          "Floor = your set minimum; repricer holds there if the market dips below it",
          "No card needed for 14-day Starter trial—test floors on live listings before paying"
        ]
      },
      {
        "h2": "When Automated Undercutting Is NOT the Right Tool",
        "body": "Automated undercutting is a bad fit for handmade, one-of-a-kind, or differentiated listings where you are the only seller of that exact item—there is no competitor price to beat, only your own pricing judgment. It's also a weak fit if you haven't calculated per-item floors yet: running the repricer without floors is worse than manual pricing because it moves faster and more relentlessly. If your catalog has a mix of commodity and differentiated items, configure the repricer only on the commodity SKUs and manage differentiated listings separately. Undercut is designed to be simpler and cheaper than alternatives like StreetPricer, RepricerExpress, or Informed.co, but simpler doesn't help if the underlying floor math hasn't been done. Use the eBay profit calculator to validate your floor on each SKU before enabling repricing."
      }
    ],
    "faq": [
      {
        "q": "What's the difference between undercutting and a race to the bottom?",
        "a": "Undercutting is a deliberate tactic: you price below competitors to win sales while your margin stays positive. A race to the bottom is what happens when multiple sellers undercut each other in a loop with no floor—prices collapse until none of them profit. The only structural fix is a hard per-listing floor set before repricing starts. With a floor, the repricer stops cutting when it hits your minimum; without one, it follows the market down indefinitely."
      },
      {
        "q": "How do I set the right floor price on eBay?",
        "a": "Your floor should cover: (1) item cost including shipping to you, (2) eBay's final value fee—roughly 13.6% of the total collected amount including buyer's shipping—plus the $0.30 or $0.40 per-order fee, (3) your cost to ship the item out, and (4) your minimum acceptable margin, typically 10–20%. Add those four numbers together. That sum is your floor. If the current lowest listing is above that number, the repricer can undercut. If competitors are already below it, hold at floor and let them sell unprofitably without you."
      },
      {
        "q": "Does Undercut undercut by exactly $0.01 or a percentage?",
        "a": "Undercut beats the current lowest competing price—the default behavior is designed to be the cheapest active listing. The specific undercut increment is small enough to win the position without sacrificing more margin than necessary. On most commodity listings, even a minimal price difference wins the sort position. The floor constraint is always enforced regardless of how the undercut amount is calculated."
      },
      {
        "q": "Is automated undercutting worth it for low-volume sellers?",
        "a": "Yes, particularly on the Free plan which covers 25 listings at no cost. Even at low volume, 24/7 automated repricing captures sales that happen while you're offline—nights and weekends. The key condition is that your floors are set correctly first. A seller moving 5–10 units per day on commodity SKUs will see a measurable sales lift from always holding the lowest position, assuming their cost structure allows a competitive floor."
      },
      {
        "q": "What happens when a competitor lists below my floor?",
        "a": "Undercut holds your listing at your floor price and stops competing on price. You won't lose money following a competitor who is selling at a loss or liquidating inventory. Once that competitor sells out or raises their price above your floor, the repricer automatically drops back to beat them. This is the core value of floor-first design: you sit out unprofitable price wars automatically instead of having to monitor and intervene manually."
      }
    ],
    "internalLinks": [
      {
        "href": "/compare",
        "label": "Compare Undercut to Other eBay Repricers →"
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
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/ebay-profit-calculator",
        "label": "eBay Profit Calculator"
      }
    ],
    "lastUpdated": "2026-06-10",
    "leadForm": true
  },
  {
    "slug": "repricing-frequency",
    "collection": "glossary",
    "template": "glossary",
    "title": "Repricing Frequency Explained for eBay Sellers — Undercut",
    "metaDescription": "Learn how repricing frequency affects your eBay search rank and sales. See why 15-minute cycles beat daily. Try Undercut free for 14 days, no card needed.",
    "h1": "Repricing Frequency: Why Your Update Interval Makes or Breaks eBay Sales",
    "eyebrow": "Glossary",
    "intro": "Repricing frequency is how often your repricing software checks competitor prices and updates your listing price. On eBay, where dozens of sellers can list the same item and prices shift throughout the day, a slow update cycle means you spend hours overpriced while rivals capture your buyers. The interval between updates — whether that's once a day, once an hour, or every 15 minutes — directly shapes how long your listing sits at a competitive price and, by extension, how often it appears near the top of Best Match search results.",
    "sections": [
      {
        "h2": "What Repricing Frequency Actually Means",
        "body": "Repricing frequency is the maximum elapsed time between the moment a competitor changes their price and the moment your own listing reflects a response. If your repricer runs every 24 hours, a competitor who drops their price at 9 a.m. captures all buyer traffic until your next cycle fires — potentially a full day later. If your repricer runs every 15 minutes, that same competitor move costs you at most a 15-minute window.\n\nThe frequency is always a ceiling, not a guarantee. A repricer set to 15-minute cycles will update your listing within 15 minutes of detecting a change; it will not always update exactly on the minute. What matters practically is the worst-case lag — the longest you can be out of position before the software corrects it.\n\nUndercut offers two cadences: hourly repricing on Free and Starter plans, and 15-minute repricing on Pro and Scale plans. There is no sub-15-minute or real-time tier."
      },
      {
        "h2": "How Frequency Affects eBay Best Match Ranking",
        "body": "eBay ranks search results using Best Match, a proprietary algorithm that weighs factors including price competitiveness, listing quality, and sales velocity. Price competitiveness is the most directly actionable lever a seller controls in real time — a listing priced above comparable live competitors is deprioritized relative to lower-priced rivals.\n\nSales velocity — how quickly a listing sells — is itself a Best Match input, which creates a compounding effect: a more competitive price generates more sales, which boosts velocity, which improves ranking further. Repricing frequency determines how quickly you regain price leadership after a competitor moves, and therefore how many buyer impressions you lose in the gap.\n\nConsider a concrete example. Suppose you sell a used graphics card priced at $189.00. A competitor drops to $184.00 at 10:05 a.m. With daily repricing, you remain at $189.00 until roughly 10:05 a.m. the next day — 1,440 minutes of exposure at a disadvantaged price. With hourly repricing, you're corrected by 11:05 a.m. — a 60-minute lag. With 15-minute repricing, you're corrected by 10:20 a.m. — a 15-minute lag. At an average of, say, 20 page views per hour for that listing, the daily repricer costs you roughly 480 impressions at a non-competitive price; the hourly repricer costs 20; the 15-minute repricer costs 5."
      },
      {
        "h2": "Daily vs. Hourly vs. 15-Minute Cycles: A Practical Comparison",
        "body": "Daily repricing is common among sellers who update prices manually or use basic spreadsheet workflows. It is essentially incompatible with categories where prices move intraday — electronics, trading cards, and sneakers in particular. A seller in one of these categories who reprices once a day is, in effect, setting a price and hoping the market doesn't move.\n\nHourly repricing is a meaningful improvement and is sufficient for slower-moving categories — collectibles, vintage items, home goods — where competitor prices may shift only a few times per day. Undercut's Free and Starter plans both reprice hourly, making automated hourly repricing accessible at no cost for up to 25 listings.\n\nFifteen-minute repricing is the fastest cadence Undercut offers and is available equally on both Pro ($79/mo, up to 1,000 listings) and Scale ($199/mo, up to 10,000 listings). For high-competition categories, the difference between hourly and 15-minute cycles is material. In the graphics card example above, switching from hourly to 15-minute repricing reduces your worst-case exposure window from 60 minutes to 15 minutes — a 75% reduction in maximum lag time.\n\nNote: Scale's advantages over Pro are listing capacity (10,000 vs. 1,000) and priority support — not repricing speed. Both tiers reprice at the same 15-minute cadence."
      },
      {
        "h2": "Floor Protection Across Every Frequency",
        "body": "Faster repricing raises an obvious concern: if the software is checking and updating prices more often, could it race prices down to zero? Undercut prevents this with a hard floor set per listing. Every repricing cycle — whether hourly or every 15 minutes — is clamped to that floor. The software will never set a price below it, regardless of where competitors move.\n\nHere is a worked example of floor protection in action. You list a vintage camera lens at a starting price of $95.00. You set a hard floor of $72.00 (your cost plus a minimum acceptable margin after eBay's ~13.6% final value fee — at $72.00, the fee is roughly $9.54, leaving about $62.46 before other costs). A competitor drops their price to $68.00. Undercut detects this and, rather than matching or beating $68.00, holds your listing at the floor of $72.00. You remain competitive against all sellers priced above $72.00; you simply do not chase the one who is selling below your minimum.\n\nYou can also set an optional per-listing ceiling. If you source the same lens opportunistically and want to test a higher price when competition thins, the ceiling caps the upward reprice so you do not accidentally list at an absurd price during an off-peak period.\n\nOn Pro and Scale, the optional Claude AI aggressiveness tuning adds a further layer: it adjusts how fast and how far each listing moves toward its already-set floor within a given cycle. It never overrides the hard floor — the floor remains absolute."
      },
      {
        "h2": "Choosing the Right Frequency for Your Catalog",
        "body": "The right repricing frequency depends on how often your competitors actually move their prices, not on the fastest option available. Buying a 15-minute plan when you sell hand-thrown pottery that sees one price change per week is paying for precision you do not need. Conversely, running hourly repricing for electronics is leaving real impressions on the table.\n\nA practical framework: start by observing how often the lowest-priced comparable listing changes in your category over a 48-hour window. You can do this manually by checking eBay search results for your item at a few intervals each day. If prices shift multiple times per day, 15-minute repricing (Pro or Scale) is justified. If they shift once or twice a day at most, hourly repricing (Free or Starter) is likely sufficient.\n\nFor sellers managing up to 25 listings in a stable-price category, Undercut's Free plan provides automated hourly repricing with hard-floor protection at no cost — a strong baseline before committing to a paid tier. The 14-day no-card trial at Starter level (100 listings, hourly repricing) gives sellers a low-risk way to measure repricing impact before deciding whether 15-minute cycles are worth the upgrade."
      }
    ],
    "faq": [
      {
        "q": "What is the fastest repricing frequency Undercut offers?",
        "a": "The fastest cadence is every 15 minutes, available on both Pro ($79/mo) and Scale ($199/mo) plans. Undercut does not offer 5-minute, 10-minute, or real-time repricing. Free and Starter plans reprice hourly."
      },
      {
        "q": "Does Scale reprice faster than Pro?",
        "a": "No. Both Pro and Scale reprice every 15 minutes — the cadence is identical. Scale's advantages over Pro are a higher listing capacity (10,000 vs. 1,000 listings) and priority support, not repricing speed."
      },
      {
        "q": "Can a faster repricing cycle cause my price to drop below my cost?",
        "a": "No. Every plan includes a per-listing hard floor, and every repricing cycle — regardless of frequency — is clamped to that floor. If competitors drop below your floor, Undercut holds your price at the floor and does not follow them down."
      },
      {
        "q": "Is hourly repricing fast enough for electronics or trading cards?",
        "a": "For highly competitive, fast-moving categories like electronics or trading cards, hourly repricing can leave you overpriced for up to 60 minutes after a competitor moves. Fifteen-minute repricing on Pro or Scale reduces that worst-case lag to 15 minutes, which meaningfully reduces lost impressions in active categories."
      },
      {
        "q": "How do I know which repricing frequency I need before paying?",
        "a": "New accounts get a 14-day free trial at Starter level (100 listings, hourly repricing) with no credit card required. Use that window to observe how often competitor prices move in your category; if you regularly see prices shift multiple times per day, upgrading to Pro for 15-minute cycles is likely worth it."
      }
    ],
    "cta": {
      "heading": "See How Fast Your Listings Can Respond",
      "sub": "Start your 14-day free trial — no credit card required. Undercut keeps you competitive on every repricing cycle, always above your floor."
    },
    "internalLinks": [
      {
        "href": "/ebay-repricing-software",
        "label": "See Undercut's eBay Repricing Software →"
      },
      {
        "href": "/glossary/what-is-repricing",
        "label": "What Is Repricing?"
      },
      {
        "href": "/guides/ebay-best-match-algorithm",
        "label": "How eBay Best Match Works"
      },
      {
        "href": "/guides/fastest-ebay-repricer",
        "label": "Fastest eBay Repricer Guide"
      },
      {
        "href": "/guides/manual-vs-automated-repricing",
        "label": "Manual vs. Automated Repricing"
      },
      {
        "href": "/glossary/race-to-the-bottom",
        "label": "Race to the Bottom — Glossary"
      },
      {
        "href": "/pricing",
        "label": "Undercut Pricing Plans"
      }
    ],
    "lastUpdated": "2026-07-16",
    "leadForm": true
  }
]
