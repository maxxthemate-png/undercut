// Tracked products for the public price-tracker pages.
// Slugs MUST match backend/utils/tracked_products.py (the snapshot cron).
export interface TrackedProduct { slug: string; name: string; query: string; category: string }

export const TRACKED_PRODUCTS: TrackedProduct[] = [
  {
    "slug": "ps5-console",
    "name": "PS5 Console",
    "query": "ps5 console disc",
    "category": "consoles & gaming"
  },
  {
    "slug": "ps5-pro",
    "name": "PS5 Pro",
    "query": "ps5 pro console",
    "category": "consoles & gaming"
  },
  {
    "slug": "xbox-series-x",
    "name": "Xbox Series X",
    "query": "xbox series x console",
    "category": "consoles & gaming"
  },
  {
    "slug": "nintendo-switch-oled",
    "name": "Nintendo Switch OLED",
    "query": "nintendo switch oled console",
    "category": "consoles & gaming"
  },
  {
    "slug": "nintendo-switch-2",
    "name": "Nintendo Switch 2",
    "query": "nintendo switch 2 console",
    "category": "consoles & gaming"
  },
  {
    "slug": "steam-deck-oled",
    "name": "Steam Deck OLED",
    "query": "steam deck oled",
    "category": "consoles & gaming"
  },
  {
    "slug": "meta-quest-3",
    "name": "Meta Quest 3",
    "query": "meta quest 3 128gb",
    "category": "consoles & gaming"
  },
  {
    "slug": "ps4-pro",
    "name": "PS4 Pro",
    "query": "ps4 pro 1tb console",
    "category": "consoles & gaming"
  },
  {
    "slug": "nintendo-64-console",
    "name": "Nintendo 64 Console",
    "query": "nintendo 64 console original",
    "category": "consoles & gaming"
  },
  {
    "slug": "gamecube-console",
    "name": "Gamecube Console",
    "query": "nintendo gamecube console",
    "category": "consoles & gaming"
  },
  {
    "slug": "airpods-pro-2",
    "name": "AirPods Pro 2",
    "query": "apple airpods pro 2nd generation",
    "category": "audio"
  },
  {
    "slug": "airpods-max",
    "name": "AirPods Max",
    "query": "apple airpods max",
    "category": "audio"
  },
  {
    "slug": "sony-wh1000xm5",
    "name": "Sony WH-1000XM5",
    "query": "sony wh-1000xm5 headphones",
    "category": "audio"
  },
  {
    "slug": "bose-quietcomfort-ultra",
    "name": "Bose Quietcomfort Ultra",
    "query": "bose quietcomfort ultra headphones",
    "category": "audio"
  },
  {
    "slug": "beats-studio-pro",
    "name": "Beats Studio Pro",
    "query": "beats studio pro headphones",
    "category": "audio"
  },
  {
    "slug": "iphone-15-pro-max",
    "name": "iPhone 15 Pro Max",
    "query": "iphone 15 pro max 256gb unlocked",
    "category": "phones & tablets"
  },
  {
    "slug": "iphone-14",
    "name": "iPhone 14",
    "query": "iphone 14 128gb unlocked",
    "category": "phones & tablets"
  },
  {
    "slug": "iphone-13",
    "name": "iPhone 13",
    "query": "iphone 13 128gb unlocked",
    "category": "phones & tablets"
  },
  {
    "slug": "samsung-galaxy-s24-ultra",
    "name": "Samsung Galaxy S24 Ultra",
    "query": "samsung galaxy s24 ultra unlocked",
    "category": "phones & tablets"
  },
  {
    "slug": "ipad-pro-12-9",
    "name": "iPad Pro 12.9",
    "query": "ipad pro 12.9 256gb",
    "category": "phones & tablets"
  },
  {
    "slug": "ipad-air-5",
    "name": "iPad Air 5",
    "query": "ipad air 5th generation 64gb",
    "category": "phones & tablets"
  },
  {
    "slug": "macbook-air-m2",
    "name": "MacBook Air M2",
    "query": "macbook air m2 256gb",
    "category": "computers & parts"
  },
  {
    "slug": "macbook-pro-m3",
    "name": "MacBook Pro M3",
    "query": "macbook pro m3 14",
    "category": "computers & parts"
  },
  {
    "slug": "dell-xps-13",
    "name": "Dell XPS 13",
    "query": "dell xps 13 laptop",
    "category": "computers & parts"
  },
  {
    "slug": "rtx-4090",
    "name": "RTX 4090",
    "query": "nvidia rtx 4090 founders",
    "category": "computers & parts"
  },
  {
    "slug": "rtx-4070",
    "name": "RTX 4070",
    "query": "nvidia rtx 4070 graphics card",
    "category": "computers & parts"
  },
  {
    "slug": "apple-watch-ultra-2",
    "name": "Apple Watch Ultra 2",
    "query": "apple watch ultra 2 49mm",
    "category": "watches"
  },
  {
    "slug": "apple-watch-series-9",
    "name": "Apple Watch Series 9",
    "query": "apple watch series 9 45mm",
    "category": "watches"
  },
  {
    "slug": "garmin-fenix-7",
    "name": "Garmin Fenix 7",
    "query": "garmin fenix 7 watch",
    "category": "watches"
  },
  {
    "slug": "charizard-base-set",
    "name": "Charizard Base Set",
    "query": "charizard base set holo psa",
    "category": "trading cards"
  },
  {
    "slug": "pokemon-151-booster-box",
    "name": "Pokemon 151 Booster Box",
    "query": "pokemon 151 booster box sealed",
    "category": "trading cards"
  },
  {
    "slug": "pokemon-evolving-skies-booster-box",
    "name": "Pokemon Evolving Skies Booster Box",
    "query": "pokemon evolving skies booster box sealed",
    "category": "trading cards"
  },
  {
    "slug": "prizm-football-hobby-box",
    "name": "Prizm Football Hobby Box",
    "query": "panini prizm football hobby box",
    "category": "trading cards"
  },
  {
    "slug": "topps-chrome-baseball-hobby-box",
    "name": "Topps Chrome Baseball Hobby Box",
    "query": "topps chrome baseball hobby box",
    "category": "trading cards"
  },
  {
    "slug": "magic-modern-horizons-3-box",
    "name": "Magic Modern Horizons 3 Box",
    "query": "mtg modern horizons 3 booster box",
    "category": "trading cards"
  },
  {
    "slug": "jordan-4-black-cat",
    "name": "Jordan 4 Black Cat",
    "query": "jordan 4 black cat",
    "category": "sneakers"
  },
  {
    "slug": "jordan-1-chicago",
    "name": "Jordan 1 Chicago",
    "query": "jordan 1 retro high chicago",
    "category": "sneakers"
  },
  {
    "slug": "nike-dunk-low-panda",
    "name": "Nike Dunk Low Panda",
    "query": "nike dunk low panda",
    "category": "sneakers"
  },
  {
    "slug": "adidas-samba-og",
    "name": "Adidas Samba OG",
    "query": "adidas samba og white black",
    "category": "sneakers"
  },
  {
    "slug": "new-balance-9060",
    "name": "New Balance 9060",
    "query": "new balance 9060 grey",
    "category": "sneakers"
  },
  {
    "slug": "lego-millennium-falcon-75192",
    "name": "Lego Millennium Falcon 75192",
    "query": "lego 75192 millennium falcon",
    "category": "lego & collectibles"
  },
  {
    "slug": "lego-titanic-10294",
    "name": "Lego Titanic 10294",
    "query": "lego titanic 10294",
    "category": "lego & collectibles"
  },
  {
    "slug": "lego-rivendell-10316",
    "name": "Lego Rivendell 10316",
    "query": "lego rivendell 10316",
    "category": "lego & collectibles"
  },
  {
    "slug": "hot-wheels-rlc",
    "name": "Hot Wheels RLC",
    "query": "hot wheels rlc exclusive",
    "category": "lego & collectibles"
  },
  {
    "slug": "funko-pop-grails",
    "name": "Funko Pop Grails",
    "query": "funko pop chase exclusive",
    "category": "lego & collectibles"
  },
  {
    "slug": "sony-a7iv",
    "name": "Sony A7Iv",
    "query": "sony a7 iv camera body",
    "category": "cameras & drones"
  },
  {
    "slug": "canon-r6-mark-ii",
    "name": "Canon R6 Mark Ii",
    "query": "canon eos r6 mark ii body",
    "category": "cameras & drones"
  },
  {
    "slug": "gopro-hero-12",
    "name": "Gopro Hero 12",
    "query": "gopro hero 12 black",
    "category": "cameras & drones"
  },
  {
    "slug": "dji-mini-4-pro",
    "name": "DJI Mini 4 Pro",
    "query": "dji mini 4 pro drone",
    "category": "cameras & drones"
  },
  {
    "slug": "zelda-tears-of-the-kingdom",
    "name": "Zelda Tears Of The Kingdom",
    "query": "zelda tears of the kingdom switch",
    "category": "video games"
  },
  {
    "slug": "mario-kart-8-deluxe",
    "name": "Mario Kart 8 Deluxe",
    "query": "mario kart 8 deluxe switch",
    "category": "video games"
  },
  {
    "slug": "pokemon-heartgold",
    "name": "Pokemon Heartgold",
    "query": "pokemon heartgold ds authentic",
    "category": "video games"
  },
  {
    "slug": "pokemon-emerald",
    "name": "Pokemon Emerald",
    "query": "pokemon emerald gba authentic",
    "category": "video games"
  },
  {
    "slug": "earthbound-snes",
    "name": "Earthbound SNES",
    "query": "earthbound snes authentic",
    "category": "video games"
  },
  {
    "slug": "dyson-v15",
    "name": "Dyson V15",
    "query": "dyson v15 detect vacuum",
    "category": "home & tools"
  },
  {
    "slug": "kitchenaid-stand-mixer",
    "name": "Kitchenaid Stand Mixer",
    "query": "kitchenaid artisan stand mixer 5 quart",
    "category": "home & tools"
  },
  {
    "slug": "milwaukee-m18-drill",
    "name": "Milwaukee M18 Drill",
    "query": "milwaukee m18 fuel drill",
    "category": "home & tools"
  },
  {
    "slug": "dewalt-20v-impact",
    "name": "Dewalt 20V Impact",
    "query": "dewalt 20v max impact driver",
    "category": "home & tools"
  },
  {
    "slug": "vitamix-5200",
    "name": "Vitamix 5200",
    "query": "vitamix 5200 blender",
    "category": "home & tools"
  },
  {
    "slug": "le-creuset-dutch-oven",
    "name": "Le Creuset Dutch Oven",
    "query": "le creuset dutch oven 5.5",
    "category": "home & tools"
  }
]
