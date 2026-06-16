import type { PageContent } from '../types'

export const repricers: PageContent[] = [
  {
    "slug": "auto-parts",
    "collection": "repricers",
    "template": "repricer",
    "title": "eBay Auto Parts Repricer for High-SKU Sellers — Undercut",
    "metaDescription": "Undercut auto-reprices thousands of fitment-specific eBay parts 24/7, never below your cost floor. Start free — no credit card needed for your 14-day trial.",
    "h1": "Stop Manually Repricing Thousands of eBay Motors Parts",
    "eyebrow": "Auto Parts Repricing",
    "intro": "An eBay auto parts catalog isn't 50 listings — it's 3,000 brake rotors, 8,000 filters, and 15,000 gaskets, each tied to specific year/make/model fitments. A competitor drops a price at 2 a.m. and your identical part sits overpriced until you wake up. Undercut monitors every listing around the clock, beats the lowest comparable price automatically, and never crosses the cost floor you set per SKU. The Scale plan handles 10,000 active listings — built for exactly this volume.",
    "sections": [
      {
        "h2": "Why Manual Repricing Breaks Down at Auto Parts Scale",
        "body": "A typical eBay Motors parts seller carries thousands of SKUs across dozens of categories — exhaust, suspension, brakes, filters, lighting. Checking prices manually even once a day on 5,000 listings would take a full-time employee doing nothing else. In practice it doesn't happen, which means listings drift overpriced for weeks while competitors undercut you, or get priced too low when supplier costs tick up. Undercut runs repricing checks as frequently as every 15 minutes on the Pro and Scale plans, reacting to competitor price changes faster than any spreadsheet workflow can. At $199/month for 10,000 listings, the Scale plan costs less than four hours of warehouse labor per month."
      },
      {
        "h2": "Fitment Specificity Creates Imperfect Comps — Here's How to Handle It",
        "body": "A 2018 F-150 brake rotor is not the same listing as a 2014 F-150 brake rotor, even if the part numbers look similar. Interchange numbers (OEM cross-references like Dorman 128.65071 mapping to multiple vehicle applications) mean one physical part can appear under dozens of titles with different fitment data. Undercut compares against active eBay listings for the same item, so fitment mismatches in competitor listings naturally filter out — you're competing against what the buyer actually sees as an alternative, not a different fitment that only superficially looks the same. Set your floor conservatively on high-fitment-variance parts where true comparables are sparse.",
        "bullets": [
          "Match on eBay item ID, not just title keywords",
          "Use per-listing floors to account for fitment rarity premiums",
          "Interchange parts with many fitments typically have more true comps and tighter margins",
          "Rare single-fitment parts can hold higher prices — set floors that reflect that"
        ]
      },
      {
        "h2": "Scale Plan: Built for 10,000-Listing Auto Parts Catalogs",
        "body": "The Scale plan at $199/month supports up to 10,000 active eBay listings with the fastest repricing cycle. For an auto parts seller with 6,000 live SKUs, that's roughly $0.033 per listing per month — a rounding error against eBay's ~13.6% final value fee on every sale. Set a hard floor on each listing (your landed cost + eBay fees + minimum margin), and Undercut handles the rest. Pay annually and get two months free, dropping the effective cost to $166/month. No per-transaction fees, no percentage of revenue taken — a flat subscription regardless of whether you sell $20,000 or $200,000 that month.",
        "bullets": [
          "Up to 10,000 listings on Scale plan at $199/month",
          "15-minute reprice cycles — catches overnight competitor changes before the morning rush",
          "Set a hard floor per listing so repricing never crosses your minimum",
          "Annual billing saves $398/year vs. monthly"
        ]
      },
      {
        "h2": "Setting Price Floors on Parts: Cost + Fees + Minimum Margin",
        "body": "Auto parts margins vary enormously — a $4 cabin air filter and a $340 alternator need different floor logic. For each listing, your floor should cover: landed cost (product + shipping to you), eBay's ~13.6% final value fee applied to the full sale price including shipping, the $0.30–$0.40 per-order fee, your outbound shipping cost, and a minimum acceptable margin. Undercut never sells below that floor even if it means not winning the lowest price spot. This matters in auto parts because a race to zero on commodity filters can wipe out an entire category's profitability. The floor-first design is the core feature — the repricing is only useful if it can't accidentally destroy your margin.",
        "bullets": [
          "Floor formula: landed cost ÷ (1 − 0.136) + shipping out + $0.35 per order + target margin",
          "Set tighter floors on high-competition commodity parts (oil filters, air filters)",
          "Allow wider repricing range on specialty or hard-to-source fitment parts",
          "Review floors when supplier invoices change — set each listing's Floor Price in the dashboard"
        ]
      },
      {
        "h2": "Undercut vs. StreetPricer and RepricerExpress for Auto Parts",
        "body": "StreetPricer and RepricerExpress both support eBay Motors and have more configuration options — channel groupings, complex repricing rules, marketplace sync. If you need multi-marketplace repricing (Amazon, Walmart) alongside eBay, or you have a dedicated pricing analyst who will configure 20-rule strategies per category, those tools make sense. Undercut is the right call if you want a simpler setup, a lower monthly cost, and the floor-first guarantee without learning a complex rule engine. The 14-day Starter trial requires no card, so you can test it against your actual catalog before committing. Honest assessment: at 500 SKUs or fewer, any plan works; at 5,000–10,000 SKUs, the Scale plan is where Undercut is specifically built to perform."
      }
    ],
    "faq": [
      {
        "q": "Can Undercut handle eBay Motors fitment listings specifically?",
        "a": "Yes. Undercut reprices any active eBay listing, including parts and accessories with vehicle fitment data. It compares against other active listings for the same eBay item, so the fitment-specific title and compatibility data your listing carries is what drives the comparison — not a generic keyword match. Fitment mismatches in competitor listings don't pollute your reprice logic."
      },
      {
        "q": "I have 8,000 auto parts listings. Which plan do I need?",
        "a": "The Scale plan at $199/month covers up to 10,000 active listings. At 8,000 SKUs that gives you 2,000 headroom for catalog growth. Scale also includes the shortest reprice interval (5 minutes), which is relevant at high SKU counts where manual oversight isn't practical. Annual billing drops it to roughly $166/month effective."
      },
      {
        "q": "What happens if a competitor lists a part for less than my cost floor?",
        "a": "Nothing — Undercut holds your price at your floor and does not reprice below it. You will not win the lowest-price spot, but you also won't take an unprofitable sale. The floor is a hard ceiling on how low the algorithm can go, set per listing by you. In auto parts this matters because aggressive liquidators occasionally dump inventory below cost — you don't want to follow them there."
      },
      {
        "q": "How do interchange numbers affect repricing accuracy?",
        "a": "Interchange numbers mean one part number maps to multiple eBay listings under different titles or vehicle applications. Undercut reprices against the specific eBay listing it's assigned to, not a catalog-level product ID, so interchange variants only affect your reprice if they appear as direct competitors on the same eBay search results. Set per-listing floors on parts with many interchange equivalents, since those typically have more true comps and thinner margins."
      },
      {
        "q": "Is there a free trial before I commit to a paid plan?",
        "a": "Every new account starts on a 14-day Starter trial — no credit card required. The Starter plan covers 100 listings, which is enough to test repricing logic on a representative slice of your catalog before scaling up. After the trial you can upgrade to Pro or Scale, or stay on the free plan (25 listings) if you only have a small active subset."
      }
    ],
    "internalLinks": [
      {
        "href": "/guides/manual-vs-automated-repricing",
        "label": "Manual vs. Automated Repricing: What Changes at Scale"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "How to Avoid Selling Below Cost on eBay"
      },
      {
        "href": "/guides/ebay-seller-fees-explained",
        "label": "eBay Seller Fees Explained"
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
    "slug": "books",
    "collection": "repricers",
    "template": "repricer",
    "title": "eBay Book Repricer for Sellers — Undercut",
    "metaDescription": "Automate eBay book pricing with floor protection. Built for the 15.3% media fee and penny-book economics. 14-day free trial, no card required.",
    "h1": "The eBay Repricer Built for Booksellers",
    "eyebrow": "Book Repricing",
    "intro": "Books are the most fee-punishing category on eBay. At 15.3% final value fee — the highest of any standard category — plus the $0.30 or $0.40 per-order fee, a $2 paperback can lose money before you've paid for the mailer. Undercut keeps you competitive by automatically undercutting the lowest listed price 24/7, but it never goes below the floor you set. For booksellers, that floor isn't optional — it's the whole game. Set it once per listing (cost + 15.3% + $0.40 + postage + minimum margin), and let Undercut hold the line.",
    "sections": [
      {
        "h2": "Why the 15.3% Media Fee Changes Everything",
        "body": "Most eBay sellers work with a roughly 13.6% final value fee. Book and media sellers pay 15.3% — about 1.7 percentage points higher. On a $20 textbook that sounds minor: roughly $0.34 extra. On a $1.50 paperback it means eBay takes $0.23, plus the $0.40 per-order fee, plus $0.15 PayPal equivalent — you've spent $0.78 in fees before the book leaves the shelf. Undercut's floor calculation lets you bake the 15.3% rate directly into each listing's minimum. Every reprice stays above that floor, so you never accidentally accept an order that loses money."
      },
      {
        "h2": "Penny-Book Economics and Why Floor Is the Core Feature",
        "body": "The penny-book market exists because buyers absorb media mail shipping costs, making a $0.01 listing profitable only if media mail revenue covers fees and postage. The math is tight: $3.99 shipping minus $0.61 FVF (15.3% of $4.00) minus $0.40 order fee minus ~$3.19 media mail = ~$0 margin. Any price movement below your floor destroys that margin instantly. Competing repricers built for electronics or fashion often let floors slide when aggressive repricing rules stack up. Undercut's floor-first architecture treats the floor as a hard stop, not a soft preference — the price simply does not go below it, ever.",
        "bullets": [
          "Floor = cost + 15.3% FVF + $0.40 order fee + postage estimate + your margin target",
          "Penny books only work if the floor covers media mail at the exact weight tier",
          "A $0.05 floor miscalculation across 500 listings is a $25 guaranteed loss per sell-through"
        ]
      },
      {
        "h2": "Textbook Seasonality: Repricing Windows That Matter",
        "body": "Textbook demand spikes twice a year — late July through September (fall semester) and early January (spring semester). During those six-to-eight-week windows, the lowest listed price on popular ISBNs can jump 3x to 10x versus the off-season floor. Undercut's continuous repricing means your price rises with the market during peak demand, not just falls during slow periods. Outside peak windows, competition intensifies and prices compress fast. The 15-minute reprice interval on the Pro plan ($79/mo) is particularly valuable here — a textbook window can open and close in hours as semester rush orders clear.",
        "bullets": [
          "Peak windows: late July–September and early January",
          "Off-season: prices compress, floor protection is most critical",
          "Pro plan reprices every 15 minutes vs. hourly on Free/Starter"
        ]
      },
      {
        "h2": "When Undercut Is and Isn't the Right Tool",
        "body": "Undercut fits booksellers with at least 26 active listings who list the same edition across multiple ISBNs and want hands-off floor protection. If you sell fewer than 25 books at a time, the Free plan (25 listings, hourly reprice, $0) is genuinely sufficient — no upsell needed. If you run a high-volume media operation with 1,000+ SKUs and want per-listing AI aggressiveness tuning that adjusts how fast each listing moves toward its floor, that's the Pro and Scale plans. Where Undercut is not a fit: if you need cross-platform repricing (Amazon + eBay simultaneously), or if your catalog is 100% fixed-price rare books where you never want automated price movement. For those cases, manual pricing or a different tool is the honest answer.",
        "bullets": [
          "Free plan: 25 listings, hourly — good for casual or testing sellers",
          "Starter $29/mo: 100 listings — right for small dedicated book stores",
          "Pro $79/mo: 1,000 listings, 15-min, AI tuning — high-volume media sellers",
          "Scale $199/mo: 10,000 listings — large warehouse or liquidation operations"
        ]
      },
      {
        "h2": "Setting Up Your Book Floor in Undercut",
        "body": "The setup is a three-field calculation per listing: acquisition cost, shipping cost estimate, and minimum acceptable margin. Undercut applies the 15.3% media fee automatically when your eBay category is set to Books, Movies & Music. You enter your cost (e.g., $0.50 from a library sale), estimated media mail cost for that weight tier (e.g., $3.19 for under 1 lb), and a minimum margin (e.g., $0.50). Undercut calculates the floor: $0.50 + $3.19 + $0.50 + $0.40 order fee + 15.3% of the total = your hard floor. The repricer then beats the current lowest ask but never goes below that number. No spreadsheet required.",
        "bullets": [
          "Category auto-detection applies the correct 15.3% rate",
          "Set each listing's Floor Price in the dashboard",
          "Floor updates propagate to live listings within one reprice cycle"
        ]
      }
    ],
    "faq": [
      {
        "q": "What is the eBay final value fee for books?",
        "a": "Books, DVDs, music, and most media on eBay are charged a 15.3% final value fee calculated on the total amount paid (item price + shipping + tax). This is the highest standard category rate on eBay — roughly 1.7 percentage points above the 13.6% rate that applies to most other categories. On top of that, eBay charges a per-order fee of $0.30 (for orders under $10) or $0.40 (for orders $10 and above), which hits cheap books especially hard as a percentage of revenue."
      },
      {
        "q": "How does Undercut handle the per-order fee for cheap books?",
        "a": "The $0.40 per-order fee is factored directly into the floor calculation you set for each listing. On a $2 book, $0.40 is 20% of the sale price — significant enough that omitting it from your floor means you're systematically underestimating costs. Undercut's floor field accepts all cost inputs including the per-order fee, shipping, and the 15.3% FVF so your floor reflects actual break-even, not just the item cost."
      },
      {
        "q": "Is Undercut worth it if I only have 25 book listings?",
        "a": "Yes, and it costs nothing. The Free plan covers up to 25 active listings with hourly repricing and full floor protection. For a casual bookseller running 10–25 SKUs, Free is the right plan indefinitely — there's no pressure to upgrade. The 14-day Starter trial lets you test the 100-listing tier before deciding, and no credit card is required to start either plan."
      },
      {
        "q": "How should I handle textbook repricing during peak semester rush?",
        "a": "During the late-July-through-September and early-January windows, textbook prices move fast. The Pro plan's 15-minute reprice cycle is the best fit for high-demand ISBNs during rush periods. Set your floor for the off-season economics, then let Undercut track the market upward during peak demand without manual intervention. When the rush clears and prices compress, the floor holds your minimum, so you don't accidentally sell below cost chasing declining comps."
      },
      {
        "q": "How do I set floors across my existing book inventory?",
        "a": "You set each listing's Floor Price directly in the Undercut dashboard. For every listing you enter your cost, shipping estimate, and margin target, and Undercut holds that listing's floor as a hard stop. When you onboard a large media catalog, you work through your listings in the dashboard and set the floor on each one before repricing takes over."
      }
    ],
    "internalLinks": [
      {
        "href": "/guides/ebay-seller-fees-explained",
        "label": "eBay Seller Fees Explained (Including the 15.3% Media Rate)"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to Set an eBay Price Floor That Covers All Costs"
      },
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin on Low-Price Items"
      },
      {
        "href": "/ebay-profit-calculator",
        "label": "eBay Profit Calculator — Check Your Book Margins"
      }
    ],
    "lastUpdated": "2026-06-10",
    "leadForm": true
  },
  {
    "slug": "electronics",
    "collection": "repricers",
    "template": "repricer",
    "title": "eBay Electronics Repricer for Faster-Moving Comps — Undercut",
    "metaDescription": "Automatically reprice eBay electronics listings every 15 minutes, protect thin margins with a hard floor, and handle depreciation pressure. Free trial, no card.",
    "h1": "Stop Losing Electronics Sales to Price Drops You Didn't See Coming",
    "eyebrow": "Electronics Repricing",
    "intro": "Consumer electronics move faster than almost any other eBay category. A new phone model drops, and last quarter's unit loses 20% of its value overnight. Refurb, used, and parts-only listings compete on completely different price axes. Margins are already compressed by eBay's ~13.6% final value fee plus per-order charges, leaving almost no room for guesswork. Undercut watches your competitors 24/7, drops your price to beat the lowest active listing, and never crosses the hard floor you set — cost plus fees plus the minimum margin you can live with.",
    "sections": [
      {
        "h2": "Why Electronics Comps Move Faster Than Any Other Category",
        "body": "A listing that's competitive at 9 a.m. can be undercut by a dozen sellers by noon. Electronics attract high-volume resellers, wholesalers dumping excess inventory, and Amazon third-party spillover — all at once. Hourly repricing (available on the Free plan) helps, but it's often not enough when a major retailer runs a flash sale that tanks market price within minutes. Undercut's Pro and Scale plans reprice every 15 minutes, which is the practical minimum for categories like smartphones, laptops, and gaming hardware where a single large seller can shift the entire price floor in one bulk listing."
      },
      {
        "h2": "Depreciation Pressure: New Model Releases and Value Cliffs",
        "body": "The iPhone 16 launches and every iPhone 15 listing on eBay drops in value the same day. The same pattern repeats with GPU generations, gaming consoles, and tablets. If you're holding used or refurb stock when a new model releases, you need to respond within hours — not the next time you manually check. Setting a hard floor in Undercut means you capture the maximum price possible on the way down without accidentally selling below cost when the market moves fast. You can also set different floors per SKU, so an iPhone 15 Pro and an iPhone 15 standard aren't sharing the same margin assumption.",
        "bullets": [
          "Set per-listing floors tied to your actual landed cost for that unit",
          "Reprice every 15 minutes on Pro ($79/mo) during a model-release window",
          "Avoid manual price checks that can lag a depreciation event by 12–24 hours"
        ]
      },
      {
        "h2": "Condition Tiers: New, Refurb, Used, and Parts Only",
        "body": "A \"used\" MacBook Air and a \"for parts or not working\" MacBook Air are not competing with each other, but they're both competing within their own condition segment. Undercut competes against listings in the same condition tier, so a refurb unit isn't automatically undercut by a parts listing. This matters in electronics more than almost any other category because condition defines the entire value proposition. A refurbished unit with a 90-day warranty commands a meaningful premium over a seller-refurbished listing with no warranty — and your repricing logic should reflect that, not flatten it.",
        "bullets": [
          "Repricing targets same-condition comps only",
          "Refurb and certified listings stay separated from \"as-is\" inventory",
          "Parts-only listings don't drag down your working-unit floor"
        ]
      },
      {
        "h2": "Thin Margins Make the Floor Non-Negotiable",
        "body": "Electronics margins are notoriously thin. After eBay's ~13.6% final value fee, a $0.30–$0.40 per-order fee, PayPal or managed payments processing, and shipping, a $200 sale might net $20–$30 profit at best. Selling even one unit $15 below your true cost can wipe out the margin on two or three good sales. Undercut's floor-first design means the floor is set before any repricing logic runs — it's not a soft suggestion, it's a hard stop. Free plan covers 25 listings with hourly repricing; Starter ($29/mo) covers 100 listings; Pro ($79/mo) adds 15-minute repricing and AI tuning for up to 1,000 listings, and Scale ($199/mo) carries the same AI tuning up to 10,000 listings. Every account starts with a 14-day Starter trial, no card required."
      },
      {
        "h2": "When Undercut Is and Isn't the Right Fit",
        "body": "Undercut works best when you have multiple listings competing in the same condition tier and need to stay at or near the lowest price without constant manual checking. It's a strong fit for refurb resellers, liquidation buyers, and used electronics dealers with 25–10,000 active listings. It's not the right tool if you're selling rare or collectible electronics where price discovery is manual and there are no direct comps — in that case, automated repricing can drive your price down to irrelevant comps. It's also not a substitute for accurate cost accounting; if your floors aren't set correctly, no repricer can protect you.",
        "bullets": [
          "Good fit: refurb resellers, liquidation buyers, multi-SKU used electronics dealers",
          "Not a fit: rare or vintage electronics with no direct comps",
          "Not a fit: sellers who haven't calculated true landed cost per unit"
        ]
      }
    ],
    "faq": [
      {
        "q": "How often does Undercut reprice my electronics listings?",
        "a": "It depends on your plan. The Free plan (25 listings, $0) reprices hourly. Starter ($29/mo, 100 listings) also runs hourly. Pro ($79/mo, 1,000 listings) and Scale ($199/mo, 10,000 listings) reprice every 15 minutes. For fast-moving electronics categories like smartphones and GPUs, the 15-minute tier is usually the practical minimum to stay competitive during active trading hours."
      },
      {
        "q": "Will Undercut reprice my refurb listing against a parts-only listing?",
        "a": "No. Undercut competes against same-condition comps. A refurbished listing won't be undercut by a for-parts or seller-refurbished listing at a lower price tier. This is especially important in electronics where condition differences carry significant price differences — your refurb margin shouldn't be destroyed by a non-working unit listed at a fraction of the price."
      },
      {
        "q": "What happens to my floor when a new model releases and market price drops fast?",
        "a": "Your floor holds. If the market price drops below your per-listing floor (cost + eBay fees + your minimum margin), Undercut stops repricing and holds at your floor price. You won't sell below cost just because a depreciation event moved the market. You can update floors manually at any time — for example, after you've adjusted your cost basis on existing stock following a model release."
      },
      {
        "q": "How do I calculate the right floor for an electronics listing with eBay's fees?",
        "a": "Start with your landed cost (purchase price + shipping to you + any refurb labor). Add eBay's ~13.6% final value fee on the item plus shipping, plus the $0.30–$0.40 per-order fee. Add your target margin. That total is your floor. Undercut's free eBay profit calculator at /ebay-profit-calculator can walk through this math per listing so you're not guessing on the fee structure."
      },
      {
        "q": "Is there a free trial before I commit to a paid plan?",
        "a": "Yes. Every new Undercut account starts with a 14-day Starter trial — no credit card required. Starter covers up to 100 listings with hourly repricing. After the trial, you can stay on the free plan (25 listings) or upgrade to Starter, Pro, or Scale. Annual billing gives you two months free compared to month-to-month pricing."
      }
    ],
    "internalLinks": [
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "How to Reprice Without Losing Margin"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "Setting a Price Floor on eBay"
      },
      {
        "href": "/guides/ebay-seller-fees-explained",
        "label": "eBay Seller Fees Explained"
      },
      {
        "href": "/ebay-profit-calculator",
        "label": "Free eBay Profit Calculator"
      }
    ],
    "lastUpdated": "2026-06-10",
    "leadForm": true
  },
  {
    "slug": "sneakers",
    "collection": "repricers",
    "template": "repricer",
    "title": "eBay Sneaker Repricer for Resellers — Undercut",
    "metaDescription": "Automate eBay sneaker pricing with Undercut's floor-first repricer. Keep margins on 8% fee pairs, beat hype decay, never undersell. Free 14-day trial, no card.",
    "h1": "Automated Repricing Built for Sneaker Resellers on eBay",
    "eyebrow": "Sneaker Repricer",
    "intro": "Sneaker reselling on eBay moves faster than any manual pricing routine can keep up with. A Jordan 1 that sold for $320 on drop day can slide to $210 within two weeks as hype cools and supply catches up. Meanwhile, size 9 and size 13 are entirely different markets — a size 9 pair might have 40 competing listings while size 14 has three. Undercut tracks each SKU independently, beats the lowest live competitor automatically, and never drops below the hard floor you set: cost plus fees plus minimum margin. No spreadsheet updates at midnight. No sold-below-cost surprises.",
    "sections": [
      {
        "h2": "eBay's 8% Sneaker Fee — and What It Actually Changes",
        "body": "eBay charges a reduced 8% final value fee on sneakers sold for $150 or more through its Authenticity Guarantee program, compared to the standard ~13.6% on most categories. That 5.6-point spread is meaningful. On a $220 pair, standard fees run about $30.22 (13.6% + $0.30 order fee); the sneaker rate drops that to $17.90 — a $12.32 difference per sale. When you build your floor in Undercut, use the 8% rate for eligible pairs so you're not leaving margin on the table by overcalculating fees. For pairs under $150 or categories that don't qualify, revert to 13.6%. Getting this input right is what makes the floor calculation trustworthy."
      },
      {
        "h2": "Hype Cycle Price Decay — Why Hourly Repricing Isn't Fast Enough Post-Drop",
        "body": "Hyped sneaker releases follow a predictable arc: price peaks in the first 24–72 hours, then bleeds as more pairs hit the secondary market. A Nike Dunk Low might open at $280 on release weekend and settle at $165 three weeks later. If you're holding inventory and repricing hourly (Free plan) or every 15 minutes (Pro plan), you're either chasing too slowly or burning margin by dropping too fast. The practical move: set a tighter floor early — say, cost $130 + 8% fee $17.90 + $15 minimum margin = $162.90 floor — and let Undercut compete aggressively above it. As market price falls toward your floor, you stop repricing down and hold. That's when you decide whether to hold or liquidate consciously, not by accident."
      },
      {
        "h2": "Sizes Are Separate Markets — Manage Them That Way",
        "body": "A size 10.5 Air Force 1 and a size 6.5 Air Force 1 in the same colorway are not competing with each other. Supply and demand differ enough that the size 6.5 might sit at $95 while size 10.5 clears at $75. If you list multiple sizes under one static price or one shared floor, you either leave money behind on scarce sizes or reprice rare sizes down unnecessarily. In Undercut, each listing gets its own floor. List your size 6.5 pair with a floor of $88 and your size 10.5 pair with a floor of $68, and both compete independently. Sellers running 20–50 size variants of the same shoe benefit most from Pro and Scale ($79/mo and $199/mo), where per-listing AI aggressiveness tuning lets you set how fast each listing moves toward its own floor."
      },
      {
        "h2": "Building a Real Floor: Cost + Fees + Margin Example",
        "body": "Vague floors get sellers into trouble. Here is a concrete example for a Nike SB Dunk Low qualifying for Authenticity Guarantee:",
        "bullets": [
          "Purchase cost: $140",
          "eBay final value fee at 8% on $210 sale price: $16.80",
          "Per-order fee: $0.30",
          "Shipping cost (if not eBay-fulfilled): $8.00",
          "Minimum acceptable margin: $20",
          "Floor = $140 + $16.80 + $0.30 + $8.00 + $20 = $185.10",
          "Set floor to $186 in Undercut — Undercut will beat any competitor above $186, and stop at $186 rather than go below it",
          "If market price drops below $186, you hold at floor and decide to keep or pull the listing — no accidental losses"
        ]
      },
      {
        "h2": "When Undercut Is Not the Right Tool",
        "body": "Undercut is built for eBay resellers who need a simple, trustworthy floor and automatic undercutting. It is not a fit for every sneaker seller. If you sell primarily on StockX, GOAT, or Kicks Crew, Undercut does not reprice those platforms. If your volume is under 25 active listings and you prefer checking prices manually once a day, the effort of setup may not pay off — though the Free plan costs nothing to try. If you need cross-platform repricing (eBay + Amazon + Shopify simultaneously), Undercut does not cover that use case today. For pure eBay sneaker resellers — especially those with 25 or more live listings across multiple sizes and colorways — the 14-day Starter trial makes the ROI clear fast."
      }
    ],
    "faq": [
      {
        "q": "Does Undercut automatically apply the 8% eBay sneaker fee when calculating my floor?",
        "a": "No — you input the fee rate yourself when setting up each listing's floor. Undercut does not auto-detect listing category. For sneakers over $150 sold through Authenticity Guarantee, enter 8% as your fee rate. For pairs under $150 or non-qualifying listings, use 13.6%. Getting this right is important: underestimating fees erodes your margin; overestimating fees sets your floor too high and you lose sales to competitors."
      },
      {
        "q": "How quickly does Undercut reprice when a sneaker's market price drops after a hype release?",
        "a": "Free plan reprices hourly, Starter every hour, Pro every 15 minutes. For fast-moving release-day inventory, Pro's 15-minute cadence is worth the upgrade — prices can move meaningfully in an hour during the first 48 hours post-drop. However, Undercut will never reprice below your floor regardless of how fast the market drops, so the floor is your real protection. Repricing speed affects how competitive you are above the floor, not whether you lose money."
      },
      {
        "q": "Should I set a separate floor for each shoe size, or can I use one floor for an entire colorway?",
        "a": "Set separate floors per listing whenever sizes have meaningfully different market values. A size 13 or size 6 in a popular colorway often commands a premium because supply is thinner — using a shared floor means Undercut will reprice your rare size down to match common-size competition unnecessarily. If sizes are trading at similar prices, shared floors are fine, but individual floors give you the most control and protect margin on scarce sizes."
      },
      {
        "q": "What happens in Undercut when the lowest competitor price falls below my floor?",
        "a": "Undercut holds your listing at the floor price and stops repricing downward. It does not match or beat a competitor who is selling below your cost-plus-margin minimum. Your listing stays live at floor price — you may sell if a buyer pays your floor, or you can manually pull the listing. Undercut will never trigger a sale that loses you money based on the floor you set. You're in control of whether to lower the floor or remove the listing."
      },
      {
        "q": "Is Undercut cheaper than StreetPricer or RepricerExpress for a sneaker reseller with around 100 listings?",
        "a": "At 100 listings, Undercut's Starter plan is $29/month. StreetPricer and RepricerExpress both start higher for equivalent listing counts and include features many sneaker resellers don't need. Undercut's design is simpler and cheaper by intent. The 14-day Starter trial (no credit card required) lets you verify performance before paying. Annual billing drops the effective rate further — equivalent to two months free."
      }
    ],
    "internalLinks": [
      {
        "href": "/guides/ebay-seller-fees-explained",
        "label": "eBay Seller Fees Explained"
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
        "href": "/ebay-profit-calculator",
        "label": "eBay Profit Calculator"
      }
    ],
    "lastUpdated": "2026-06-10",
    "leadForm": true
  },
  {
    "slug": "trading-cards",
    "collection": "repricers",
    "template": "repricer",
    "title": "Trading Card Repricer for eBay — Undercut",
    "metaDescription": "Automate eBay repricing for Pokemon, MTG, and sports cards. Set a hard floor per card, reprice hourly, and stay competitive — free trial, no credit card required.",
    "h1": "Stop Manually Repricing Your Trading Cards on eBay",
    "eyebrow": "Card Seller Tool",
    "intro": "Trading card prices don't wait for you. A hot Pokemon alt-art or a rookie card can swing 20–40% in a single afternoon when new sales comps roll in. Manually checking competitors every few hours is a full-time job on top of your actual grading, sourcing, and listing work. Undercut watches every listing you have, finds the lowest live competitor price, and undercuts it automatically — but only down to the floor you set per card, so a sudden market crash never forces you to sell a PSA 10 below your buy-in cost.",
    "sections": [
      {
        "h2": "Why Trading Cards Break Most Repricers",
        "body": "Most eBay repricers were built for commodity retail — the same SKU repeated a thousand times. Trading cards don't work like that. A Charizard Base Set is not the same listing as a Charizard Base Set PSA 9, and neither is comparable to a raw lightly-played copy. Three different comps, three different floors, three different competitive landscapes. Undercut lets you set a hard floor on each individual listing, not just a blanket percentage rule. That matters when a graded card trades at 3x its raw counterpart and you can't afford to let a blanket 5%-off rule collapse your graded inventory into raw pricing territory."
      },
      {
        "h2": "Raw vs. Graded Pricing and Why Your Floor Is Everything",
        "body": "A raw near-mint Mew ex might comp at $18. The same card in a PSA 10 slab might comp at $65. If your repricer doesn't know the difference — or worse, doesn't respect the floor you paid for that slab — you're one competitor price-drop away from selling a $40 graded card for $17. With Undercut, you enter a hard floor for every listing: your cost, plus eBay's 13.25% TCG fee (eBay's special category rate for trading cards), plus a minimum margin. The repricer will race to the bottom on your behalf, but it physically cannot cross that line. Floor-first design is the whole point.",
        "bullets": [
          "Set floor = cost + eBay fee (13.25% for trading cards) + your minimum margin",
          "Raw and graded copies get separate listings with separate floors",
          "Hourly repricing catches the fast moves; Pro plan drops to 15-minute cycles",
          "If every competitor is below your floor, you simply hold price rather than sell at a loss"
        ]
      },
      {
        "h2": "How Comps Move on Hot Cards and What Repricing Does About It",
        "body": "When a card gets announced for a tournament meta — say a new Elden Beast in One Piece TCG or a newly discovered print error — comps on eBay can jump or crash within two hours of the announcement. A repricer that only checks once a day is essentially useless for active card sellers. Undercut's Free plan reprices hourly, which catches most intraday moves. If you're actively flipping during spoiler season or tournament weekends, the Pro plan's 15-minute cycle ($79/month, up to 1,000 listings) is worth it. You're not trying to win every millisecond like a stock trader — you just need to not wake up having sold twenty copies at yesterday's price when today's comp is 30% higher.",
        "bullets": [
          "Free plan: hourly repricing, up to 25 listings — enough to test on your top movers",
          "Starter ($29/mo): 100 listings, hourly — good for a focused singles inventory",
          "Pro ($79/mo): 1,000 listings, 15-minute cycles, AI aggressiveness tuning — for active flippers",
          "Scale ($199/mo): 10,000 listings — sealed case breakers and large inventory sellers"
        ]
      },
      {
        "h2": "eBay's 13.25% TCG Fee and Building It Into Your Floor",
        "body": "eBay's trading cards category carries a 13.25% final value fee (applied to item price, shipping, and tax) for most card sales, compared to the 13.6% rate in many other categories. That half-point difference sounds minor, but on a $200 graded card it's a dollar, and across a month of volume it adds up. More importantly, your floor calculation has to use the right fee or you'll systematically under-floor your listings. The free eBay fee calculator at /ebay-fee-calculator lets you plug in your card's sale price and see the exact fee before you set your floor. Set floor wrong once and you can lose money on every sale while thinking you're profitable. It's worth spending five minutes getting this right per card tier.",
        "bullets": [
          "TCG final value fee: 13.25% on item + shipping + tax",
          "Plus $0.30 per-order fee for most transactions (standard) or $0.40 in some cases",
          "Use /ebay-fee-calculator to confirm before setting floors on high-value slabs",
          "Annual plan saves 2 months vs. monthly — meaningful if you're running Pro or Scale year-round"
        ]
      },
      {
        "h2": "Using the eBay Price Checker for Comp Lookups",
        "body": "Before you can set a floor, you need to know what the card is actually selling for — not what it's listed at, but what it last sold for. The free price checker at /ebay-price-checker pulls recent sold comps so you can see the actual market, not just aspirational listings. For trading cards specifically, it helps you separate the raw comps from the graded comps that pollute search results. Once you have a realistic sold price, you can subtract the 13.25% fee, your shipping cost, and your minimum margin to land on a defensible floor. Doing that math manually is slow; Undercut's profit calculator at /ebay-profit-calculator automates the subtraction so you get a floor number in seconds."
      }
    ],
    "faq": [
      {
        "q": "Can Undercut handle both raw and graded versions of the same card separately?",
        "a": "Yes. Each eBay listing gets its own floor and repricing rules in Undercut, regardless of what the title says. A raw LP Charizard and a PSA 9 Charizard are two separate listings with two separate floors. There's no shared rule that groups them. You set the floor individually, which is the only safe approach when graded copies trade at 2–4x the raw price."
      },
      {
        "q": "What happens when a card crashes and every competitor is below my floor?",
        "a": "Undercut holds your price at the floor and does not reprice below it. You won't win the sale at that moment, but you won't sell at a loss either. You can review your floor manually — maybe the crash is permanent and your buy-in cost needs to be written down — but that's your decision to make, not something the repricer does automatically. The floor is a hard wall, not a soft suggestion."
      },
      {
        "q": "Is the 14-day trial enough to test repricing on my card inventory?",
        "a": "For most card sellers, yes. The Starter trial gives you 100 listings and hourly repricing for 14 days with no credit card required. That's enough to run your top 50–100 singles through a full repricing cycle and see how the floors hold up. If you have sealed product alongside singles, you may want to prioritize which listings to load first during the trial period to get representative data."
      },
      {
        "q": "Does Undercut work for sports cards and MTG, or only Pokemon?",
        "a": "Any trading card listed on eBay in the trading cards category works. Pokemon, MTG, One Piece TCG, sports cards (NBA, NFL, MLB), wrestling cards — the repricer doesn't care about the game, it cares about the eBay listing. The 13.25% TCG fee applies across the trading cards category, so your floor calculation method is the same regardless of which game you're selling."
      },
      {
        "q": "How does Undercut compare to manually repricing with eBay's bulk edit tool?",
        "a": "eBay's bulk edit requires you to export, edit a spreadsheet, and re-import — typically a 20–30 minute process that you'd have to repeat multiple times a day to stay competitive on hot cards. Undercut runs continuously in the background with no manual steps after the initial setup. For sellers with 50+ active listings, the time savings alone justify the cost within the first week of use."
      }
    ],
    "internalLinks": [
      {
        "href": "/ebay-fee-calculator",
        "label": "eBay Fee Calculator"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to Set an eBay Price Floor"
      },
      {
        "href": "/ebay-price-checker",
        "label": "eBay Price Checker"
      },
      {
        "href": "/guides/avoid-selling-below-cost",
        "label": "Avoid Selling Below Cost on eBay"
      }
    ],
    "lastUpdated": "2026-06-10",
    "leadForm": true
  },
  {
    "slug": "video-games",
    "collection": "repricers",
    "template": "repricer",
    "title": "eBay Video Game Repricer for Retro & Modern — Undercut",
    "metaDescription": "Automate eBay video game pricing across loose, CIB, and sealed conditions. Undercut beats competitors 24/7, never below your floor. Free trial, no card needed.",
    "h1": "Stop Losing Sales to Faster Video Game Sellers on eBay",
    "eyebrow": "Video Game Repricing",
    "intro": "Video games are one of eBay's most commoditized categories. The same cartridge, the same condition grade, dozens of sellers — and whoever has the lowest price gets the sale. Retro titles move in cycles tied to nostalgia waves; modern releases slide fast in the weeks after launch. Without automated repricing, you wake up to stale prices while competitors already undercut you overnight. Undercut monitors every active listing and adjusts your price to beat the lowest competitor automatically, 24/7, while your hard floor ensures you never sell below cost plus fees.",
    "sections": [
      {
        "h2": "Commodity SKUs: Why Video Games Demand Automation",
        "body": "A loose copy of Super Mario Bros. 3 for NES isn't unique — it's interchangeable with the 40 other copies listed right now. Buyers sort by price and condition, click the cheapest acceptable option, and move on. That commodity dynamic means a $2 gap between your price and a competitor's can redirect dozens of sales per week away from your store. Manual repricing requires you to check each title individually, research current comps, and edit listings one by one. For a catalog of 200 games spanning five consoles and three condition tiers each, that's hundreds of data points to update every few days. Undercut collapses that to zero manual work — it checks the lowest comparable live competitor listing on eBay and adjusts your price to just beat it automatically, within minutes on the Pro plan or hourly on Free."
      },
      {
        "h2": "Condition Tiers Are Separate Markets — Price Them That Way",
        "body": "Loose, Complete in Box (CIB), and sealed are not the same product at different prices. They are distinct markets with different buyer pools, different comp sets, and sometimes 10x price differences. A loose copy of Chrono Trigger sells for around $50; CIB runs $150–$200; sealed factory copies have traded above $500. If your repricer treats these as the same SKU or blends comps across conditions, it will either undervalue your CIB copies or overprice your loose stock. Undercut lets you set a separate hard floor for each individual listing, so your sealed Chrono Trigger has a floor that reflects sealed-only sold comps, and your loose copy competes only against other loose listings. This per-listing floor is the core of the floor-first design — it's not a category-wide setting but a per-item number you control.",
        "bullets": [
          "Set a distinct floor for loose, CIB, and sealed copies of the same title",
          "Undercut only compares your listing against the correct condition tier on eBay",
          "Floor = your cost + eBay's ~13.6% final value fee + shipping + your minimum margin",
          "Change any floor at any time without pausing repricing"
        ]
      },
      {
        "h2": "Price Charting Culture and the Race to the Bottom",
        "body": "Serious video game buyers cross-reference PriceCharting.com before purchasing. They know what a title sold for last month, last year, and at peak. That price transparency is a double-edged sword for sellers: buyers are informed, but so are your competitors. When a popular title sees a spike — say, a retro gaming YouTube video sends demand for a specific SNES game up 30% overnight — sellers reprice fast. If you're not automated, you miss the upswing and still hold the pre-spike floor. Conversely, when a console generation gets replaced (PS4 → PS5 transition, for example), library titles slide steadily downward. A floor stops you from racing to the bottom unconsciously: Undercut will never push your price below what you've defined as the minimum acceptable return, so a downward price trend in the market gets absorbed by your competitors before it ever touches your margin.",
        "bullets": [
          "Automated repricing captures demand spikes you'd miss while sleeping",
          "Floor protection absorbs console-generation price slides without manual intervention",
          "Pro plan checks and adjusts prices every 15 minutes — fast enough for trending titles"
        ]
      },
      {
        "h2": "Fast Undercutting in Popular Titles Without Destroying Margin",
        "body": "High-velocity titles — recent releases, first-party Nintendo games, popular retro franchises — see price changes dozens of times per day. A seller on the Pro plan ($79/mo) with 15-minute repricing cycles stays competitive throughout the day without lifting a finger. The Starter plan ($29/mo) checks hourly, which covers most casual volumes. Free handles up to 25 listings on hourly cycles — enough to test repricing on your top sellers before committing. The key math for every video game listing: eBay charges approximately 13.6% final value fee on the total amount (item + shipping + tax), plus a $0.30–$0.40 per-order fee. A game that costs you $20, sells for $35, ships for $5, means roughly $5.44 in eBay fees plus $0.35 per order — leaving about $9.21 gross. Your floor should reflect that math, not just the item cost. Undercut's floor system enforces the full unit economics, not just a price threshold."
      },
      {
        "h2": "When Undercut Is Not the Right Fit",
        "body": "Undercut is built for eBay sellers repricing against active competition. It is not a fit if you sell exclusively graded (WATA/VGA) games where each item is unique and there's no direct comparable listing to undercut — those require manual valuation. It's also not designed for auction-format listings, only fixed-price Buy It Now. If your catalog is under 10 listings and you check prices daily anyway, the Free plan works but the efficiency gain is minimal. Sellers primarily on Amazon, TCGPlayer, or Whatnot will need a different tool. But if you run a fixed-price eBay storefront with 50+ video game listings across multiple platforms and conditions, and you're losing sales to competitors who reprice faster, Undercut solves exactly that problem."
      }
    ],
    "faq": [
      {
        "q": "Can Undercut handle different condition grades for the same game title?",
        "a": "Yes. Each eBay listing is repriced independently, so your loose copy of a game and your CIB copy each have their own floor and their own repricing logic. Undercut does not aggregate conditions — it only competes your listing against comparable active listings in the same condition tier as defined by your eBay listing details. You set a separate floor for each copy based on what that condition is actually worth to you."
      },
      {
        "q": "How fast does Undercut reprice video games when a competitor drops their price?",
        "a": "On the Pro plan ($79/mo), Undercut checks and adjusts every 15 minutes. On Starter ($29/mo) and Free ($0), it runs hourly cycles. For most video game categories, hourly is sufficient — even popular retro titles don't see meaningful price changes every few minutes. If you're selling new-release titles in the first 48 hours after launch, the 15-minute Pro cycle is worth the upgrade to stay competitive during the fastest-moving window."
      },
      {
        "q": "What happens when a retro game's market price drops below my floor?",
        "a": "Undercut will not reprice below your floor under any circumstances. If the competitive market price falls beneath your floor, your listing stays at the floor price. You may lose the sale to a lower-priced competitor, but you will never sell at a loss. This is intentional — the floor is a hard stop, not a suggestion. You can review and lower your floor manually if market conditions have genuinely shifted and you want to stay competitive at the new price level."
      },
      {
        "q": "Does Undercut work for both retro and modern video game listings?",
        "a": "Yes. The repricing logic is the same regardless of whether you're selling a 1985 NES cartridge or a PlayStation 5 disc released last month. Both categories are high-competition fixed-price eBay markets where automated repricing provides a consistent edge. The only distinction is that modern releases tend to have faster price decay, which makes floor discipline more important — your floor keeps you from chasing a declining market down past your break-even point."
      },
      {
        "q": "Is there a free version I can use to test repricing before paying?",
        "a": "Yes. The Free plan supports up to 25 listings with hourly repricing at $0/month — no credit card required. Every new account also gets a 14-day Starter trial (100 listings, hourly) automatically. That gives you enough runway to reprice your top 25–100 video game SKUs and see exactly how many price adjustments Undercut makes and whether sales velocity improves before you decide on a paid plan."
      }
    ],
    "internalLinks": [
      {
        "href": "/guides/repricing-without-losing-margin",
        "label": "Repricing Without Losing Margin"
      },
      {
        "href": "/guides/ebay-price-floor",
        "label": "How to Set an eBay Price Floor"
      },
      {
        "href": "/guides/ebay-pricing-strategy",
        "label": "eBay Pricing Strategy Guide"
      },
      {
        "href": "/free-ebay-repricer",
        "label": "Free eBay Repricer"
      }
    ],
    "lastUpdated": "2026-06-10",
    "leadForm": true
  }
]
