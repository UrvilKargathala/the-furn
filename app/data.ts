// ponytail: Unsplash/Pexels placeholders, swap for real project media in /public
export const img = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const links = [["Home", "/"], ["Services", "/services"], ["Works", "/works"], ["Studio", "/studio"], ["Process", "/#process"]];

type Service = {
  slug: string;
  t: string;
  short: string;
  i: string;
  tags: string[];
  intro: string[];
  sections: { h: string; p: string[] }[];
  deliverables: string[];
  options: { t: string; d: string; i: string }[];
  process: { t: string; d: string }[];
};

// Same five steps for every service unless a service overrides them
const process = [
  { t: "Site visit & brief", d: "We measure the space, check plumbing and electrical points, and note how you use the room every day." },
  { t: "Layout & 3D design", d: "You get a scaled layout and 3D views, with storage mapped to what you actually own." },
  { t: "Materials & quote", d: "Pick shutters, finishes and hardware from real samples, then sign off an itemised, fixed quote." },
  { t: "Factory production", d: "Every module is cut, edge-banded and assembled in our workshop for a precise, durable finish." },
  { t: "Installation & handover", d: "Our own team installs, aligns and cleans up, then walks you through care and warranty." },
];

export const services: Service[] = [
  {
    slug: "modular-kitchens",
    t: "Modular Kitchens",
    short: "Parallel, L-shape, island and U-shape kitchens built around how you cook.",
    i: "1556911220-bff31c812dba",
    tags: ["Layout", "Shutters", "Hardware"],
    intro: [
      "A kitchen is the hardest-working room in the house. We design it around your cooking style, your appliances and the way your family moves through the space, so every drawer lands exactly where your hand reaches for it.",
      "From compact apartment kitchens to open island layouts, each module is built in our workshop and finished to the millimetre.",
    ],
    sections: [
      { h: "Planned around the way you cook", p: ["We map the work triangle between hob, sink and fridge, then plan tall units, corner solutions and appliance garages so nothing is wasted.", "Heights are set to you, not to a catalogue, so the counter, wall units and chimney all sit at a comfortable reach."] },
      { h: "Materials that handle daily life", p: ["BWP plywood carcasses, moisture-resistant boards near the sink, and shutters in acrylic, PU, laminate or veneer that stay true for years.", "Quartz and granite tops, soft-close hinges and branded channels come standard, not as upgrades."] },
    ],
    deliverables: ["Site measurement and appliance plan", "2D layout and 3D kitchen views", "Shutter, finish and hardware selection", "Countertop, sink and backsplash coordination", "Factory-made modules with edge banding", "Installation, alignment and cleanup", "10-year warranty on hardware"],
    options: [
      { t: "L-shape", d: "Two connected walls with an open end, ideal for medium kitchens and easy movement.", i: "1556912173-3bb406ef7e77" },
      { t: "U-shape", d: "Three walls of storage and counter for serious cooks who want everything within reach.", i: "1556909114-f6e7ad7d3136" },
      { t: "Parallel", d: "Two facing counters that make the most of long, narrow apartment kitchens.", i: "1556911220-bff31c812dba" },
      { t: "Island", d: "A central island for prep, breakfast and conversation in open-plan homes.", i: "1565538810643-b5bdb714032a" },
    ],
    process,
  },
  {
    slug: "wardrobes",
    t: "Wardrobes",
    short: "Sliding, hinged and walk-in storage with fittings sized to your wardrobe.",
    i: "1616486338812-3dadae4b4ace",
    tags: ["Sliding", "Walk-in", "Lofts"],
    intro: [
      "A good wardrobe starts with what goes inside it. We count your hanging, folding and accessory needs first, then design the shutters around them.",
      "Floor-to-ceiling units, lofts and smart internals mean more storage in the same wall.",
    ],
    sections: [
      { h: "Inside first, outside second", p: ["Long and short hanging, pull-out trays, trouser racks, jewellery drawers and shoe pull-outs are planned to your actual collection.", "Lofts above take seasonal items, so everyday clothes stay at eye level."] },
      { h: "Shutters that suit the room", p: ["Sliding shutters save floor space in compact bedrooms; hinged doors give full access in larger rooms.", "Choose from laminate, acrylic, fluted glass, mirror or veneer, with profile or concealed handles."] },
    ],
    deliverables: ["Storage audit of your clothes and accessories", "Internal layout with hanging, drawers and trays", "3D views with shutter options", "Loft and overhead storage planning", "Soft-close hardware and lighting", "Installation and alignment", "10-year warranty on hardware"],
    options: [
      { t: "Sliding", d: "Space-saving shutters on smooth tracks, perfect where door swing is tight.", i: "1558997519-83ea9252edf8" },
      { t: "Hinged", d: "Classic doors that open fully for complete access to every shelf.", i: "1595428774223-ef52624120d2" },
      { t: "Walk-in", d: "An open dressing room with lit shelves, islands and full-length mirrors.", i: "1616486338812-3dadae4b4ace" },
      { t: "Lofts", d: "Overhead storage to the ceiling for luggage, bedding and seasonal items.", i: "1595428774223-ef52624120d2" },
    ],
    process,
  },
  {
    slug: "living-tv-units",
    t: "Living & TV Units",
    short: "Panelling, consoles and display units that anchor the room.",
    i: "1618221195710-dd6b41faaea6",
    tags: ["Panelling", "Consoles", "Display"],
    intro: [
      "The living room is where your home is seen. We design TV walls, consoles and display units that hide clutter and show off what matters.",
      "Wires, set-top boxes and speakers are planned in from day one, so the finished wall looks clean.",
    ],
    sections: [
      { h: "A feature wall, not just a TV stand", p: ["Fluted panels, stone finishes and floating consoles turn the TV wall into the centrepiece of the room.", "Concealed wiring channels and ventilated cabinets keep electronics tidy and cool."] },
      { h: "Storage that doesn't look like storage", p: ["Closed drawers for everyday clutter, open niches for books and art, and lit display shelves for collectibles.", "Every unit is sized to your sofa and viewing distance."] },
    ],
    deliverables: ["Wall measurement and viewing-distance plan", "3D feature wall design", "Concealed wiring and point planning", "Panelling, stone and finish selection", "Display lighting layout", "Installation and cleanup", "10-year warranty on hardware"],
    options: [
      { t: "TV wall", d: "Full-height panelled walls with a floating console and hidden wiring.", i: "1600607687939-ce8a6c25118c" },
      { t: "Panelling", d: "Fluted, slatted or upholstered panels that add warmth and texture.", i: "1586023492125-27b2c045efd7" },
      { t: "Display units", d: "Lit shelves and glass cabinets for books, art and collectibles.", i: "1600121848594-d8644e57abab" },
      { t: "Consoles", d: "Low, wide consoles that ground the room and hold everyday essentials.", i: "1493809842364-78817add7ffb" },
    ],
    process,
  },
  {
    slug: "bedroom-furniture",
    t: "Bedroom Furniture",
    short: "Storage beds, side tables, dressers and study units for restful rooms.",
    i: "1505693416388-ac5ce068fe85",
    tags: ["Beds", "Dressers", "Study"],
    intro: [
      "A bedroom should feel calm, not crowded. We design beds, dressers and study corners that fit together as one quiet, well-organised room.",
      "Hydraulic storage beds and wall-mounted units free up floor space without giving up storage.",
    ],
    sections: [
      { h: "Rest and storage in one", p: ["Hydraulic and drawer-storage beds hold bedding and luggage out of sight.", "Upholstered or panelled headboards add comfort and character."] },
      { h: "Room for every routine", p: ["Dressers with mirrors and lighting, compact study units and bedside tables with charging points.", "Kids' rooms grow with the child, with modular desks, bunks and storage."] },
    ],
    deliverables: ["Room layout and furniture plan", "3D bedroom design", "Bed, headboard and storage selection", "Dresser and study unit design", "Lighting and charging point planning", "Installation and cleanup", "10-year warranty on hardware"],
    options: [
      { t: "Storage beds", d: "Hydraulic and drawer beds that hide bedding, luggage and more.", i: "1505693416388-ac5ce068fe85" },
      { t: "Dressers", d: "Lit mirrors and drawers sized for your daily essentials.", i: "1513694203232-719a280e022f" },
      { t: "Study units", d: "Compact desks with shelves and cable management for work at home.", i: "1524758631624-e2822e304c36" },
      { t: "Kids' rooms", d: "Playful, durable furniture that adapts as children grow.", i: "1571508601891-ca5e7a713859" },
    ],
    process,
  },
  {
    slug: "dining-crockery",
    t: "Dining & Crockery",
    short: "Dining tables, crockery units, bar and pooja units made to measure.",
    i: "1617806118233-18e1de247200",
    tags: ["Dining", "Crockery", "Pooja"],
    intro: [
      "Dining spaces bring the family together. We design tables, crockery units and pooja corners that fit the room and the occasion.",
      "Each piece is sized to your space, from four-seater nooks to large family tables.",
    ],
    sections: [
      { h: "Made for gathering", p: ["Solid wood and stone-top tables sized to your room, with matching benches or chairs.", "Crockery units with glass shutters and lighting keep your best pieces on display."] },
      { h: "Thoughtful corners", p: ["Pooja units with jaali shutters, bell hooks and storage for essentials.", "Bar units with wine racks, glass holders and concealed storage."] },
    ],
    deliverables: ["Space and seating plan", "3D dining area design", "Table, crockery and pooja unit design", "Glass, stone and finish selection", "Display lighting layout", "Installation and cleanup", "10-year warranty on hardware"],
    options: [
      { t: "Dining tables", d: "Wood, stone and glass tables sized to your family and your room.", i: "1617806118233-18e1de247200" },
      { t: "Crockery units", d: "Glass-front cabinets with lighting for your best dinnerware.", i: "1600121848594-d8644e57abab" },
      { t: "Bar units", d: "Compact bars with wine racks, glass holders and hidden storage.", i: "1556909114-f6e7ad7d3136" },
      { t: "Pooja units", d: "Serene pooja corners with jaali shutters and dedicated storage.", i: "1595428774223-ef52624120d2" },
    ],
    process,
  },
  {
    slug: "complete-interiors",
    t: "Complete Interiors",
    short: "End-to-end homes, from layout and material palette to handover.",
    i: "1600210492486-724fe5c67fb0",
    tags: ["Planning", "Materials", "Turnkey"],
    intro: [
      "One team for the whole home. We plan every room together, so the kitchen, wardrobes, living and bedrooms share one consistent material palette.",
      "You get a single point of contact, a single timeline and a single warranty.",
    ],
    sections: [
      { h: "Every room, one design language", p: ["We start with a whole-home mood board, then carry finishes, colours and details through every space.", "Furniture, lighting, false ceilings and paint are coordinated so nothing clashes."] },
      { h: "Turnkey, on schedule", p: ["Civil work, electrical, plumbing and furniture are scheduled together to avoid rework.", "Weekly site updates keep you informed without having to chase anyone."] },
    ],
    deliverables: ["Whole-home layout and mood board", "3D views for every room", "Material and finish palette", "Electrical, ceiling and lighting plans", "All modular furniture and wardrobes", "Project management and site updates", "Handover with care guide and warranty"],
    options: [
      { t: "2BHK homes", d: "Smart, space-saving interiors for compact apartments.", i: "1522708323590-d24dbb6b0267" },
      { t: "3BHK homes", d: "Family homes with storage planned for every member.", i: "1560448204-e02f11c3d0e2" },
      { t: "Villas", d: "Spacious, bespoke interiors across multiple floors.", i: "1600566753190-17f0baa2a6c3" },
      { t: "Offices", d: "Workspaces with modular desks, storage and meeting areas.", i: "1502005229762-cf1b2da7c5d6" },
    ],
    process,
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

type Project = {
  slug: string; n: string; c: string; cat: string; l: string; y: string; area: string; days: string; client: string;
  d: string; i: string; gallery: string[];
  overview: string; challenge: string; solution: string; features: string[]; result: string;
  quote: { t: string; by: string };
};

export const workCats = ["All", "Kitchen", "Wardrobe", "Living", "Bedroom", "Dining", "Complete Interior"];

export const projects: Project[] = [
  {
    slug: "serene-art", n: "Serene Art", c: "Modular Kitchen", cat: "Kitchen", l: "Ahmedabad", y: "2025", area: "180 sq ft", days: "35 days", client: "Private Residence",
    d: "A calm L-shaped kitchen in matte sage and oak, with tall pantry units and a hidden appliance wall.",
    i: "1556912173-3bb406ef7e77", gallery: ["1556911220-bff31c812dba", "1556909114-f6e7ad7d3136", "1565538810643-b5bdb714032a", "1484101403633-562f891dc89a"],
    overview: "A young family wanted a kitchen that felt as calm as the rest of their apartment, without losing any storage.",
    challenge: "The old kitchen had open shelves that collected clutter, a fridge blocking the window and no space for a microwave or oven.",
    solution: "We moved the fridge into a tall unit run, added a concealed appliance wall and switched to handle-less sage shutters with oak accents.",
    features: ["Tall pantry with internal drawers", "Concealed appliance wall", "Handle-less matte shutters", "Quartz top with integrated sink"],
    result: "The window is clear, every appliance has a home and the counter stays empty after cooking.",
    quote: { t: "It finally feels like part of the living room, not a separate workroom.", by: "Homeowner, Serene Art" },
  },
  {
    slug: "island-axis", n: "Island Axis", c: "Island Kitchen", cat: "Kitchen", l: "Surat", y: "2025", area: "260 sq ft", days: "42 days", client: "Private Villa",
    d: "An open island kitchen built for family cooking, with marble tops and warm under-cabinet lighting.",
    i: "1565538810643-b5bdb714032a", gallery: ["1556912173-3bb406ef7e77", "1556909114-f6e7ad7d3136", "1556911220-bff31c812dba", "1617806118233-18e1de247200"],
    overview: "A large family that cooks together every evening wanted a kitchen where four people could work at once.",
    challenge: "A closed kitchen layout separated the cooks from the dining area, and the single counter run caused constant crowding.",
    solution: "We opened the wall into an island layout with a prep sink on the island and a breakfast counter for the children.",
    features: ["2.8 m marble-top island", "Prep sink and main sink zones", "Warm LED under-cabinet lighting", "Breakfast counter seating for four"],
    result: "Dinner prep is now a family activity, with room for everyone and a clear view into the dining space.",
    quote: { t: "The island is where we all end up, every single evening.", by: "Homeowner, Island Axis" },
  },
  {
    slug: "aestra", n: "Aestra", c: "Walk-in Wardrobe", cat: "Wardrobe", l: "Vadodara", y: "2026", area: "140 sq ft", days: "28 days", client: "Private Residence",
    d: "A walk-in wardrobe with fluted glass shutters, lit display shelves and a central dresser island.",
    i: "1616486338812-3dadae4b4ace", gallery: ["1558997519-83ea9252edf8", "1595428774223-ef52624120d2", "1505693416388-ac5ce068fe85", "1513694203232-719a280e022f"],
    overview: "A couple wanted to turn a spare room into a dressing room that felt like a boutique.",
    challenge: "Two people's clothes, shoes and accessories had to fit into one room without feeling crowded or dark.",
    solution: "We planned storage on three walls, added a central dresser island and used fluted glass shutters with warm strip lighting.",
    features: ["Fluted glass shutters", "Lit shoe and bag display", "Central dresser island", "Full-length mirror wall"],
    result: "Everything is visible at a glance, and getting ready has become the calmest part of the morning.",
    quote: { t: "It feels like walking into our own little store.", by: "Homeowner, Aestra" },
  },
  {
    slug: "beige-bailey", n: "Beige Bailey", c: "Complete Interior", cat: "Complete Interior", l: "Rajkot", y: "2026", area: "2,400 sq ft", days: "90 days", client: "3BHK Apartment",
    d: "A full 3BHK interior in soft beige tones, from the living room panelling to every bedroom wardrobe.",
    i: "1618221195710-dd6b41faaea6", gallery: ["1600210492486-724fe5c67fb0", "1522708323590-d24dbb6b0267", "1493809842364-78817add7ffb", "1586023492125-27b2c045efd7"],
    overview: "A new 3BHK handed over bare, with a family moving in from another city in three months.",
    challenge: "Every room needed furniture, ceilings and lighting on a fixed deadline, coordinated remotely.",
    solution: "We designed the whole home around one beige and walnut palette and ran civil, electrical and furniture work in parallel.",
    features: ["Fluted living room panelling", "Four full-height wardrobes", "Modular kitchen and utility", "Cove lighting throughout"],
    result: "The family moved in on schedule to a finished home, down to the curtains.",
    quote: { t: "We arrived with suitcases and found a complete home waiting.", by: "Homeowner, Beige Bailey" },
  },
  {
    slug: "noir-arc", n: "Noir Arc", c: "Living & TV Wall", cat: "Living", l: "Ahmedabad", y: "2025", area: "320 sq ft", days: "30 days", client: "Private Residence",
    d: "A dramatic living room with an arched charcoal TV wall, floating console and lit display niches.",
    i: "1600607687939-ce8a6c25118c", gallery: ["1586023492125-27b2c045efd7", "1600121848594-d8644e57abab", "1493809842364-78817add7ffb", "1522708323590-d24dbb6b0267"],
    overview: "The owners wanted a living room with presence: somewhere to host friends and watch films.",
    challenge: "Wires, speakers and set-top boxes were everywhere, and the long wall felt empty.",
    solution: "We built a charcoal arched TV wall with hidden wiring, a floating console and backlit niches for their collection.",
    features: ["Arched charcoal panelling", "Fully concealed wiring", "Floating console with ventilation", "Backlit display niches"],
    result: "A clean, cinematic wall that has become the centrepiece of every gathering.",
    quote: { t: "Guests always ask who designed the wall.", by: "Homeowner, Noir Arc" },
  },
  {
    slug: "ivory", n: "Ivory", c: "Master Bedroom", cat: "Bedroom", l: "Surat", y: "2026", area: "220 sq ft", days: "25 days", client: "Private Residence",
    d: "A soft ivory bedroom with an upholstered headboard wall, storage bed and hidden study desk.",
    i: "1505693416388-ac5ce068fe85", gallery: ["1513694203232-719a280e022f", "1615874959474-d609969a20ed", "1571508601891-ca5e7a713859", "1524758631624-e2822e304c36"],
    overview: "A master bedroom that needed to be restful, but also hold a work-from-home desk.",
    challenge: "The room was small, and a desk would have made it feel like an office.",
    solution: "We designed a fold-away study unit inside the wardrobe line and a hydraulic storage bed to free up floor space.",
    features: ["Upholstered headboard wall", "Hydraulic storage bed", "Hidden fold-away desk", "Warm reading lights"],
    result: "Work disappears behind a shutter at 6 pm, and the room goes back to being a retreat.",
    quote: { t: "I close the desk and the workday is gone.", by: "Homeowner, Ivory" },
  },
  {
    slug: "concrete-canvas", n: "Concrete Canvas", c: "Villa Interior", cat: "Complete Interior", l: "Ahmedabad", y: "2026", area: "4,800 sq ft", days: "120 days", client: "Private Villa",
    d: "A two-storey villa mixing raw concrete finishes with warm oak furniture and custom joinery.",
    i: "1600566753190-17f0baa2a6c3", gallery: ["1560448204-e02f11c3d0e2", "1600210492486-724fe5c67fb0", "1617806118233-18e1de247200", "1502005229762-cf1b2da7c5d6"],
    overview: "An architect-designed villa whose owners wanted interiors that matched its bold concrete shell.",
    challenge: "Concrete can feel cold; the family wanted warmth without hiding the architecture.",
    solution: "We paired micro-concrete surfaces with oak joinery, soft textiles and layered lighting across both floors.",
    features: ["Oak joinery throughout", "Micro-concrete feature walls", "Custom staircase storage", "Layered lighting plan"],
    result: "A home that keeps its strong architecture but feels warm and lived-in.",
    quote: { t: "It finally feels like a home, not a gallery.", by: "Owner, Concrete Canvas" },
  },
  {
    slug: "avadh-ayuska", n: "Avadh Ayuska", c: "Dining & Crockery", cat: "Dining", l: "Vadodara", y: "2025", area: "200 sq ft", days: "21 days", client: "Private Residence",
    d: "A family dining room with a solid wood table, glass-front crockery unit and a serene pooja corner.",
    i: "1617806118233-18e1de247200", gallery: ["1600121848594-d8644e57abab", "1484101403633-562f891dc89a", "1556909114-f6e7ad7d3136", "1595428774223-ef52624120d2"],
    overview: "A joint family needed a dining space for ten, plus a pooja corner close to the kitchen.",
    challenge: "One room had to handle daily meals, festivals and prayer without feeling cluttered.",
    solution: "We designed an extendable wood table, a lit crockery unit and a pooja unit with jaali shutters on the same wall.",
    features: ["Extendable solid wood table", "Lit glass crockery unit", "Pooja unit with jaali shutters", "Hidden storage for festival items"],
    result: "Ten people sit comfortably for festivals, and the room stays calm on ordinary days.",
    quote: { t: "Diwali dinner for twelve, and nobody felt squeezed.", by: "Homeowner, Avadh Ayuska" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
