import type { Guide } from "./types";

// Guides: helpful articles that answer what people ask before they hire anyone.
// Facts about The Furn (materials, hardware, warranty, timelines, process) match the service pages;
// general advice is kept to widely accepted rules of thumb. `photo` and `projects` are project slugs.
export const guides: Guide[] = [
  {
    slug: "kitchen-layouts",
    t: "Which kitchen layout suits your home?",
    seo: {
      title: "Kitchen Layouts: L, U, Parallel or Island?",
      description: "How to choose between L-shape, U-shape, parallel, straight and island kitchens: space needed, pros and cons, and which suits Indian apartments and villas.",
    },
    short: "L-shape, U-shape, parallel, straight or island: how to pick the layout that fits your room and the way you cook.",
    answer: "For most Indian apartments an L-shape is the safest choice: it fits medium kitchens and keeps movement easy. Choose a U-shape if you cook a lot and want the most counter and storage, a parallel kitchen for long narrow rooms, a straight kitchen for compact spaces, and an island only in open-plan homes with clear floor space all around it.",
    photo: "serene-art",
    read: 6,
    updated: "2026-11-26",
    sections: [
      {
        h: "Start with the work triangle",
        p: [
          "Whatever the layout, a kitchen works best when the hob, the sink and the fridge form a loose triangle. You should be able to move between them in a few steps without crossing a doorway or walking around someone else.",
          "Before choosing a shape, note where your plumbing, gas line, windows and doors are. These fix where the sink and hob can go, and often decide the layout for you.",
        ],
      },
      {
        h: "L-shape: the all-rounder",
        p: [
          "Two connected walls with one open side. It suits medium kitchens, leaves room for a small dining table or breakfast counter, and lets two people work without getting in each other's way.",
          "The corner is the one weak spot. Plan a corner solution (a carousel, a magic corner or blind-corner pull-outs) so that space isn't wasted.",
        ],
        list: ["Best for: most 2BHK and 3BHK apartments", "Watch for: dead corner space without proper fittings"],
      },
      {
        h: "U-shape: the most storage",
        p: [
          "Three walls of cabinets and counter around you. It gives the most worktop and storage of any layout, which suits families who cook full meals every day.",
          "It needs width: as a rule of thumb, keep at least about 1 to 1.2 metres of clear floor between the facing counters so drawers and the dishwasher can open while someone walks past.",
        ],
        list: ["Best for: larger kitchens and serious cooks", "Watch for: two corners to plan, and feeling closed in if the room is narrow"],
      },
      {
        h: "Parallel: made for long, narrow rooms",
        p: [
          "Two facing counters with a walkway between. Many Indian apartments have long, narrow kitchens, and a parallel layout uses both long walls efficiently.",
          "A common plan puts the hob and prep counter on one side and the sink and dishwasher on the other, often near the utility or balcony.",
        ],
        list: ["Best for: galley-style apartment kitchens", "Watch for: the walkway being too tight for two people"],
      },
      {
        h: "Straight (single wall): compact and clean",
        p: [
          "Everything along one wall. It is the simplest and most compact layout, and works for studio flats, small kitchens and open kitchens that face the living room.",
          "Tall units at one end (a pantry pull-out or an appliance tower) make up for the shorter run of counter.",
        ],
        list: ["Best for: small or open kitchens", "Watch for: limited counter space"],
      },
      {
        h: "Island: for open-plan homes",
        p: [
          "An island adds a freestanding counter for prep, breakfast and conversation. It turns the kitchen into the social centre of an open-plan home.",
          "It needs real space. As a rule of thumb, leave about 1 metre or more of clear floor on every side of the island. If the room can't spare that, a peninsula (a counter attached at one end) gives a similar feel in less space.",
        ],
        list: ["Best for: villas and large open-plan apartments", "Watch for: plumbing or a hob on the island needs planning before flooring and ceilings"],
      },
      {
        h: "How we decide with you",
        p: [
          "We measure your kitchen, mark the fixed points (plumbing, gas, windows, doors) and ask how you cook and who uses the kitchen. Then we show the layout as a scaled 2D plan and 3D views before anything is made, so you can see how it works for your home.",
        ],
      },
    ],
    faqs: [
      { q: "Which kitchen layout is best for a small flat?", a: "A straight or parallel layout usually works best in small or narrow kitchens. If there is a second wall available, a compact L-shape adds corner storage without crowding the room." },
      { q: "Is an island kitchen practical in an apartment?", a: "Only if there is clear floor space on every side of the island, roughly a metre or more. In smaller open kitchens, a peninsula or a breakfast counter gives a similar feel in less space." },
      { q: "L-shape or U-shape: which gives more storage?", a: "A U-shape gives more counter and storage because it uses three walls, but it needs a wider room. An L-shape suits medium kitchens and leaves space free for a table or counter." },
    ],
    services: ["modular-kitchens"],
    projects: ["serene-art", "ochre-plinth", "island-axis", "laurent-noir"],
  },
  {
    slug: "kitchen-shutter-finishes",
    t: "Laminate, acrylic, PU or veneer: choosing kitchen shutters",
    seo: {
      title: "Laminate, Acrylic, PU or Veneer Shutters?",
      description: "Compare laminate, acrylic, PU and veneer finishes for modular kitchen shutters: looks, durability, care and relative cost, so you can pick the right one.",
    },
    short: "The shutter finish decides how your kitchen looks and how it ages. Here is how the four main options compare.",
    answer: "Laminate is the hard-wearing, budget-friendly choice with the widest range of colours and textures. Acrylic gives a high-gloss, mirror-like look but shows scratches and fingerprints. PU paint gives a seamless, premium finish in any colour, in matte or gloss. Veneer brings real wood grain and warmth but needs more care, especially near water.",
    photo: "cashmere-oak",
    read: 6,
    updated: "2026-11-26",
    sections: [
      {
        h: "What a shutter is made of",
        p: [
          "A kitchen shutter is a board (usually plywood or MDF) with a finish on the outside. The board gives strength and resists moisture; the finish decides the look, the feel and how easily it scratches or stains.",
          "Our carcasses are BWP plywood, with moisture-resistant boards near the sink. On top of that, you can choose any of the finishes below, and mix them, for example acrylic wall units with laminate base units.",
        ],
      },
      {
        h: "Laminate: tough and practical",
        p: [
          "A layer of laminate is pressed onto the board. It resists scratches, heat and moisture well, is easy to clean, and comes in hundreds of colours, wood grains, stone looks and textures in matte, suede or gloss.",
          "It is usually the most budget-friendly option. The one giveaway is the edge: a thin edge band shows where the laminate meets the side, so good edge-banding matters.",
        ],
        list: ["Looks: matte, textured or gloss; wood and stone patterns", "Durability: high", "Care: easy, wipe clean", "Relative cost: lower"],
      },
      {
        h: "Acrylic: high-gloss and bright",
        p: [
          "Acrylic sheets give a deep, mirror-like gloss that reflects light and makes a kitchen feel bigger and brighter. Colours stay vivid and the surface is non-porous, so it doesn't absorb stains.",
          "The trade-off is that gloss shows fingerprints and fine scratches more than matte finishes. It is usually priced above laminate.",
        ],
        list: ["Looks: high gloss, solid colours", "Durability: good, but scratches show", "Care: soft cloth, avoid abrasive cleaners", "Relative cost: medium"],
      },
      {
        h: "PU paint: seamless and premium",
        p: [
          "Polyurethane (PU) paint is sprayed in layers and cured, giving a smooth, seamless finish with no visible edge band. It can be any colour you choose, in matte, satin or high gloss, and suits handle-less designs and curved shutters.",
          "It is one of the more premium options and needs gentle care, but small chips can usually be touched up.",
        ],
        list: ["Looks: seamless, any colour, matte to gloss", "Durability: good with care", "Care: gentle cleaning, avoid knocks", "Relative cost: higher"],
      },
      {
        h: "Veneer: real wood",
        p: [
          "Veneer is a thin slice of real wood, sealed with polish or lacquer. Every shutter has natural grain, so it brings warmth no printed finish can copy.",
          "It needs more care: keep it away from constant water and steam, and expect it to age and change colour gently over the years. Many homes use veneer for tall units or an island and a tougher finish near the sink and hob.",
        ],
        list: ["Looks: natural wood grain", "Durability: moderate, sensitive to water", "Care: wipe dry, periodic polish", "Relative cost: higher"],
      },
      {
        h: "Choosing for your home",
        p: [
          "Cook a lot and want low maintenance? Laminate or matte PU. Want a bright, modern look? Acrylic or gloss PU. Want warmth? Veneer on selected units. You can also combine finishes, which often gives the best of each.",
          "In our studio in Pal Gam you can see and touch real samples of every finish before you decide, and the shutters are shown in your 3D design before production.",
        ],
      },
    ],
    faqs: [
      { q: "Which kitchen shutter finish lasts longest?", a: "Laminate is the most forgiving day to day: it resists scratches, heat and moisture well. PU and acrylic last well too but show marks more easily, and veneer needs the most care near water." },
      { q: "Is acrylic better than laminate?", a: "Not better, different. Acrylic gives a high-gloss, reflective look; laminate is tougher, offers more textures and is usually more affordable. Many kitchens use both." },
      { q: "Can I mix shutter finishes in one kitchen?", a: "Yes. A common combination is a tougher finish on base units near the sink and hob, and gloss, PU or veneer on wall units, tall units or an island." },
    ],
    services: ["modular-kitchens", "wardrobes"],
    projects: ["cashmere-oak", "ivory-heritage", "statuario-blanc", "torrent-grey"],
  },
  {
    slug: "kitchen-hardware",
    t: "Kitchen hardware explained: hinges, drawers and fittings",
    seo: {
      title: "Kitchen Hardware Explained: Hinges & Drawers",
      description: "A plain guide to modular kitchen hardware: soft-close hinges, drawer systems, lift-up wall units, corner solutions and tall pull-outs, and why brands matter.",
    },
    short: "Hardware is what you touch every day. Here is what each fitting does and what to look for.",
    answer: "Good hardware is what makes a modular kitchen feel solid for years. Look for soft-close hinges, full-extension drawer systems instead of basic channels, lift-up mechanisms for wall units, a proper corner solution and tall pull-outs for pantry storage, all from established brands with long warranties.",
    photo: "laurent-noir",
    read: 5,
    updated: "2026-11-26",
    sections: [
      {
        h: "Why hardware matters more than you think",
        p: [
          "Shutters and finishes are what you see, but hinges and drawer runners are what you use dozens of times a day. Cheap hardware sags, squeaks and stops closing properly within a few years; good hardware keeps every door aligned and every drawer gliding.",
          "That is why soft-close hinges and branded channels come standard in our kitchens, not as upgrades, and why our hardware carries a 15-year warranty.",
        ],
      },
      {
        h: "Hinges",
        p: [
          "Concealed hinges hold every door. Soft-close hinges have a built-in damper, so doors close gently and quietly even if pushed hard. Good hinges can be adjusted in three directions, which keeps doors perfectly aligned over time.",
        ],
      },
      {
        h: "Drawers and runners",
        p: [
          "Drawers have replaced most base cupboards because you can see and reach everything without bending. Full-extension runners let the drawer open all the way. Drawer systems with metal sides (often called tandem boxes) carry heavy loads like utensils and crockery, and close softly.",
          "Inside, organisers such as cutlery trays, plate racks, bottle pull-outs and thali baskets make each drawer work harder.",
        ],
      },
      {
        h: "Lift-up wall units",
        p: [
          "Instead of side-hinged doors, wall units can open upwards on a lift mechanism and stay open at any height. They are easier to use, especially above the hob, and you don't bump your head on an open door.",
        ],
      },
      {
        h: "Corner solutions",
        p: [
          "Corners are where storage is usually lost. Carousels, magic corners and blind-corner pull-outs bring the contents of a corner cabinet out to you, so the whole space is usable.",
        ],
      },
      {
        h: "Tall units and pantry pull-outs",
        p: [
          "A tall pull-out turns a narrow column into a pantry you can see from both sides. Appliance towers house the oven and microwave at a comfortable height, and tall units free up counter space in smaller kitchens.",
        ],
      },
      {
        h: "Brands we build with",
        p: [
          "We use hardware and materials from established brands including Blum, Hettich, Häfele, Grass, Kesseböhmer, Higold, Fenix and Rehau, chosen to suit each fitting and budget. You see and try the hardware on real samples in our studio before you sign off the quote.",
        ],
      },
    ],
    faqs: [
      { q: "Are soft-close hinges worth it?", a: "Yes. They stop doors slamming, protect the shutters and hinges from wear, and keep the kitchen quiet. In our kitchens they are standard, not an extra." },
      { q: "Drawers or cupboards for base units?", a: "Drawers, for most items. You can see and reach everything without bending or emptying the front of a cupboard. Cupboards still suit large items like pressure cookers or the sink area." },
      { q: "What warranty should kitchen hardware have?", a: "Established brands offer long warranties on hinges and drawer systems. Our hardware carries a 15-year warranty." },
    ],
    services: ["modular-kitchens"],
    projects: ["laurent-noir", "graphite-monolith", "vapour-mist"],
  },
  {
    slug: "modular-kitchen-process",
    t: "How a modular kitchen is made, from measurement to handover",
    seo: {
      title: "How a Modular Kitchen Is Made: Steps and Timeline",
      description: "Every step of a modular kitchen, from site measurement and 3D design to factory production and installation, and how long the whole process usually takes.",
    },
    short: "What happens at each step, what you decide, and how long it takes.",
    answer: "A modular kitchen moves through five steps: site measurement, layout and 3D design, choosing materials and signing a fixed quote, factory production, and installation. Most of our kitchens take about five to six weeks from design sign-off to handover; two recent kitchens of 180 and 260 sq ft took 35 and 42 days.",
    photo: "studio-furn",
    read: 5,
    updated: "2026-11-26",
    sections: [
      {
        h: "1. Site visit and measurement",
        p: [
          "We measure the room precisely, check plumbing, gas and electrical points, and talk about how you cook, what appliances you have and who uses the kitchen. Accurate measurement is the foundation: modules are made to the millimetre, so the plan has to be right.",
        ],
      },
      {
        h: "2. Layout and 3D design",
        p: [
          "You get a scaled 2D layout and 3D views of your kitchen, with storage planned around what you actually own. This is the time to change your mind: moving a drawer or a tall unit costs nothing on screen.",
        ],
      },
      {
        h: "3. Materials and a fixed quote",
        p: [
          "You choose shutters, finishes, countertops and hardware from real samples, then sign off an itemised, fixed quote. Every module and fitting is listed with its price, so nothing changes later.",
        ],
      },
      {
        h: "4. Factory production",
        p: [
          "Every module is cut, edge-banded and assembled on German machinery in our factory. Making modules off-site keeps dust and noise out of your home and gives a precise, durable finish. While production runs, the site can be prepared: plumbing, electrical points and any civil work.",
        ],
      },
      {
        h: "5. Installation and handover",
        p: [
          "Our own team installs the modules, coordinates the countertop, sink and backsplash, aligns every door and drawer and cleans up. We then walk you through care and warranty. Installation itself usually takes a few days.",
        ],
      },
      {
        h: "How long does it take?",
        p: [
          "Most of our kitchens take about five to six weeks from design sign-off to handover. Two recent kitchens of 180 and 260 sq ft took 35 and 42 days. Timelines grow with size, finish (PU paint and veneer take longer than laminate) and any civil work needed before installation.",
        ],
      },
      {
        h: "How to keep it on schedule",
        p: [
          "Finish civil work, tiling and electrical changes before installation day, decide on appliances early so the plan fits them, and sign off the design and materials in one go. Changes after production starts are the most common cause of delay.",
        ],
      },
    ],
    faqs: [
      { q: "How long does a modular kitchen take?", a: "Most of our kitchens take about five to six weeks from design sign-off to handover. Two recent kitchens of 180 and 260 sq ft took 35 and 42 days." },
      { q: "Do I need to finish tiling before the kitchen is installed?", a: "Yes, flooring, wall tiling (except the backsplash), plumbing and electrical points should be ready before installation. We confirm exactly what is needed during the site visit." },
      { q: "Can I change the design after signing the quote?", a: "Small changes are possible before production starts. Once modules are being made, changes add cost and time, which is why we show the full 3D design before you sign." },
    ],
    services: ["modular-kitchens", "complete-interiors"],
    projects: ["serene-art", "island-axis", "studio-furn"],
  },
  {
    slug: "wardrobe-planning",
    t: "Planning a wardrobe: sliding or hinged, lofts and fittings",
    seo: {
      title: "Wardrobe Planning: Sliding vs Hinged & Lofts",
      description: "How to plan a built-in wardrobe: sliding vs hinged shutters, walk-ins, lofts, hanging and drawer space, internal fittings and finishes, room by room.",
    },
    short: "Plan the inside first, then the shutters. A step-by-step guide to a wardrobe that actually fits what you own.",
    answer: "Plan a wardrobe from the inside out: count what you hang, fold and store, then size the hanging, drawers and shelves to match. Choose sliding shutters where floor space is tight and hinged doors where you want full access. Take the wardrobe to the ceiling with lofts for luggage and seasonal items.",
    photo: "serene-wardrobe",
    read: 5,
    updated: "2026-11-26",
    sections: [
      {
        h: "Start with what you own",
        p: [
          "Before choosing shutters or colours, list what goes inside: long dresses and sarees, shirts and jackets, folded clothes, shoes, bags, jewellery and accessories. Then plan each section to match, so nothing is crushed and nothing is wasted.",
        ],
        list: ["Long hanging for dresses, coats and kurtas", "Short (double) hanging for shirts and trousers, which doubles the space", "Drawers for folded clothes, innerwear and accessories", "Shelves or pull-out trays for folded stacks and bags", "Lofts for luggage, bedding and seasonal clothes"],
      },
      {
        h: "Sliding or hinged shutters?",
        p: [
          "Sliding shutters move along tracks and need no space to swing open, so they suit compact bedrooms and rooms where a door would hit the bed. You only see part of the wardrobe at a time.",
          "Hinged doors open fully and show everything at once, and suit larger rooms. They need clear floor space in front of the wardrobe to open.",
        ],
      },
      {
        h: "Walk-in wardrobes",
        p: [
          "If you have a spare room or a deep alcove, a walk-in turns storage into a dressing room: open shelves, lit hanging, an island of drawers and a full-length mirror. It needs enough width to stand and turn between both sides.",
        ],
      },
      {
        h: "Go to the ceiling",
        p: [
          "Floor-to-ceiling wardrobes give the most storage for the same wall and look neater, with no dusty gap on top. Lofts above the main wardrobe take items you use a few times a year, keeping everyday clothes at eye level.",
        ],
      },
      {
        h: "Fittings that make the difference",
        p: [
          "Pull-out trouser racks, tie and belt organisers, jewellery drawers with dividers, shoe pull-outs, a pull-down hanging rail for high sections and soft-close hinges and drawers all make the wardrobe easier to use every day. Internal lighting helps you see dark colours.",
        ],
      },
      {
        h: "Finishes",
        p: [
          "Wardrobe shutters can be laminate, acrylic, fluted glass, mirror or veneer, with profile or concealed handles. A mirror shutter makes a small bedroom feel bigger; fluted or smoked glass shows off a walk-in.",
          "We start every wardrobe with a storage audit, then show the internal layout and shutter options in 3D before production.",
        ],
      },
    ],
    faqs: [
      { q: "Sliding or hinged wardrobe: which is better?", a: "Sliding shutters suit compact bedrooms because they need no space to swing open. Hinged doors suit larger rooms and give full access to every section at once." },
      { q: "Should a wardrobe go up to the ceiling?", a: "Usually yes. A floor-to-ceiling wardrobe with lofts gives the most storage for the same wall and avoids a dusty gap on top." },
      { q: "How do I plan the inside of a wardrobe?", a: "Count what you hang (long and short), what you fold and what you store, then size the hanging, drawers, shelves and lofts to match. That is how we start every wardrobe." },
    ],
    services: ["wardrobes", "bedroom-furniture"],
    projects: ["serene-wardrobe", "laurent-noir", "beige-bailey"],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
// Guides that cover a service, for "Read our guide" links on service pages
export const guidesFor = (serviceSlug: string) => guides.filter((g) => g.services.includes(serviceSlug));
