import type { Service } from "./types";

// Same five steps for every service unless a service overrides them
const processSteps = [
  { t: "Layout & 3D design", d: "You get a scaled layout and 3D views, with storage mapped to what you actually own." },
  { t: "Site visit & brief", d: "We measure the space, check plumbing and electrical points, and note how you use the room every day." },
  { t: "Materials & quote", d: "Pick shutters, finishes and hardware from real samples, then sign off an itemised, fixed quote." },
  { t: "Factory production", d: "Every module is cut, edge-banded and assembled on German machines for a precise, durable finish." },
  { t: "Installation & handover", d: "Our own team installs and aligns every module, then walks you through care and warranty." },
];

// Process photos in public/process/: sample-room-hd.jpg was supplied by the client, layout-hd.jpg is from the Titanium Marquina project; the rest are free-licence Unsplash images. All sharpened for the process page (unsplash.com/license). Swap for own photos when available.
// The /process page: the same five steps, with what happens at each and what you leave with
export const processDetail = processSteps.map((st, i) => ({ ...st, ...[
  { i: "/process/layout-hd.jpg", tags: ["Scaled layout", "3D views", "Storage planning"], out: "A layout and 3D views you can walk through" },
  { i: "/process/site-visit-hd.jpg", tags: ["Measurements", "Plumbing & electrical points", "How you use the room"], out: "A clear brief and exact site measurements" },
  { i: "/process/sample-room-hd.jpg", tags: ["Real samples", "Shutters & finishes", "Hardware"], out: "An itemised, fixed quote you sign off" },
  { i: "/process/factory-hd.jpg", tags: ["Precision cutting", "Edge banding", "German machinery"], out: "Modules built to the millimetre" },
  { i: "/process/installation-hd.jpg", tags: ["Installation", "Alignment", "Care walkthrough"], out: "A finished room, handed over with warranty" },
][i] }));

export const services: Service[] = [
  {
    slug: "modular-kitchens",
    t: "Modular Kitchens",
    short: "Parallel, L-shape, island and U-shape kitchens built around how you cook.",
    i: "/works/gokuldham/01.jpg",
    tags: ["Layout", "Shutters", "Hardware"],
    intro: [
      "A kitchen is the hardest-working room in the house. We design it around your cooking style, your appliances and the way your family moves through the space, so every drawer lands exactly where your hand reaches for it.",
      "From compact apartment kitchens to open island layouts, each module is precision-built on German machinery and finished to the millimetre.",
    ],
    sections: [
      { h: "Planned around the way you cook", p: ["We map the work triangle between hob, sink and fridge, then plan tall units, corner solutions and appliance garages so nothing is wasted.", "Heights are set to you, not to a catalogue, so the counter, wall units and chimney all sit at a comfortable reach."] },
      { h: "Materials that handle daily life", p: ["BWP plywood carcasses, moisture-resistant boards near the sink, and shutters in acrylic, PU, laminate or veneer that stay true for years.", "Quartz and granite tops, soft-close hinges and branded channels come standard, not as upgrades."] },
    ],
    deliverables: ["Site measurement and appliance plan", "2D layout and 3D kitchen views", "Shutter, finish and hardware selection", "Countertop, sink and backsplash coordination", "Factory-made modules with edge banding", "Installation, alignment and cleanup", "15-year warranty on hardware"],
    options: [
      { t: "L-shape", d: "Two connected walls with an open end, ideal for medium kitchens and easy movement.", i: "1556912173-3bb406ef7e77" },
      { t: "U-shape", d: "Three walls of storage and counter for serious cooks who want everything within reach.", i: "1556909114-f6e7ad7d3136" },
      { t: "Parallel", d: "Two facing counters that make the most of long, narrow apartment kitchens.", i: "1556911220-bff31c812dba" },
      { t: "Island", d: "A central island for prep, breakfast and conversation in open-plan homes.", i: "1565538810643-b5bdb714032a" },
    ],
    process: processSteps,
  },
  {
    slug: "wardrobes",
    t: "Wardrobes",
    short: "Sliding, hinged and walk-in storage with fittings sized to your wardrobe.",
    i: "/works/serene-wardrobe/01.jpg",
    tags: ["Sliding", "Walk-in", "Lofts"],
    intro: [
      "A good wardrobe starts with what goes inside it. We count your hanging, folding and accessory needs first, then design the shutters around them.",
      "Floor-to-ceiling units, lofts and smart internals mean more storage in the same wall.",
    ],
    sections: [
      { h: "Inside first, outside second", p: ["Long and short hanging, pull-out trays, trouser racks, jewellery drawers and shoe pull-outs are planned to your actual collection.", "Lofts above take seasonal items, so everyday clothes stay at eye level."] },
      { h: "Shutters that suit the room", p: ["Sliding shutters save floor space in compact bedrooms; hinged doors give full access in larger rooms.", "Choose from laminate, acrylic, fluted glass, mirror or veneer, with profile or concealed handles."] },
    ],
    deliverables: ["Storage audit of your clothes and accessories", "Internal layout with hanging, drawers and trays", "3D views with shutter options", "Loft and overhead storage planning", "Soft-close hardware and lighting", "Installation and alignment", "15-year warranty on hardware"],
    options: [
      { t: "Sliding", d: "Space-saving shutters on smooth tracks, perfect where door swing is tight.", i: "1558997519-83ea9252edf8" },
      { t: "Hinged", d: "Classic doors that open fully for complete access to every shelf.", i: "1595428774223-ef52624120d2" },
      { t: "Walk-in", d: "An open dressing room with lit shelves, islands and full-length mirrors.", i: "1616486338812-3dadae4b4ace" },
      { t: "Lofts", d: "Overhead storage to the ceiling for luggage, bedding and seasonal items.", i: "1595428774223-ef52624120d2" },
    ],
    process: processSteps,
  },
  {
    slug: "living-tv-units",
    t: "Living & TV Units",
    short: "Panelling, consoles and display units that anchor the room.",
    i: "/works/avadh-ayuska/10.jpg",
    tags: ["Panelling", "Consoles", "Display"],
    intro: [
      "The living room is where your home is seen. We design TV walls, consoles and display units that hide clutter and show off what matters.",
      "Wires, set-top boxes and speakers are planned in from day one, so the finished wall looks clean.",
    ],
    sections: [
      { h: "A feature wall, not just a TV stand", p: ["Fluted panels, stone finishes and floating consoles turn the TV wall into the centrepiece of the room.", "Concealed wiring channels and ventilated cabinets keep electronics tidy and cool."] },
      { h: "Storage that doesn't look like storage", p: ["Closed drawers for everyday clutter, open niches for books and art, and lit display shelves for collectibles.", "Every unit is sized to your sofa and viewing distance."] },
    ],
    deliverables: ["Wall measurement and viewing-distance plan", "3D feature wall design", "Concealed wiring and point planning", "Panelling, stone and finish selection", "Display lighting layout", "Installation and cleanup", "15-year warranty on hardware"],
    options: [
      { t: "TV wall", d: "Full-height panelled walls with a floating console and hidden wiring.", i: "1600607687939-ce8a6c25118c" },
      { t: "Panelling", d: "Fluted, slatted or upholstered panels that add warmth and texture.", i: "1586023492125-27b2c045efd7" },
      { t: "Display units", d: "Lit shelves and glass cabinets for books, art and collectibles.", i: "1600121848594-d8644e57abab" },
      { t: "Consoles", d: "Low, wide consoles that ground the room and hold everyday essentials.", i: "1493809842364-78817add7ffb" },
    ],
    process: processSteps,
  },
  {
    slug: "bedroom-furniture",
    t: "Bedroom Furniture",
    short: "Storage beds, side tables, dressers and study units for restful rooms.",
    i: "/works/globcon/01.jpg",
    tags: ["Beds", "Dressers", "Study"],
    intro: [
      "A bedroom should feel calm, not crowded. We design beds, dressers and study corners that fit together as one quiet, well-organised room.",
      "Hydraulic storage beds and wall-mounted units free up floor space without giving up storage.",
    ],
    sections: [
      { h: "Rest and storage in one", p: ["Hydraulic and drawer-storage beds hold bedding and luggage out of sight.", "Upholstered or panelled headboards add comfort and character."] },
      { h: "Room for every routine", p: ["Dressers with mirrors and lighting, compact study units and bedside tables with charging points.", "Kids' rooms grow with the child, with modular desks, bunks and storage."] },
    ],
    deliverables: ["Room layout and furniture plan", "3D bedroom design", "Bed, headboard and storage selection", "Dresser and study unit design", "Lighting and charging point planning", "Installation and cleanup", "15-year warranty on hardware"],
    options: [
      { t: "Storage beds", d: "Hydraulic and drawer beds that hide bedding, luggage and more.", i: "1505693416388-ac5ce068fe85" },
      { t: "Dressers", d: "Lit mirrors and drawers sized for your daily essentials.", i: "1513694203232-719a280e022f" },
      { t: "Study units", d: "Compact desks with shelves and cable management for work at home.", i: "1524758631624-e2822e304c36" },
      { t: "Kids' rooms", d: "Playful, durable furniture that adapts as children grow.", i: "1571508601891-ca5e7a713859" },
    ],
    process: processSteps,
  },
  {
    slug: "dining-crockery",
    t: "Dining & Crockery",
    short: "Dining tables, crockery units, bar and pooja units made to measure.",
    i: "/works/palladium/06.jpg",
    tags: ["Dining", "Crockery", "Pooja"],
    intro: [
      "Dining spaces bring the family together. We design tables, crockery units and pooja corners that fit the room and the occasion.",
      "Each piece is sized to your space, from four-seater nooks to large family tables.",
    ],
    sections: [
      { h: "Made for gathering", p: ["Solid wood and stone-top tables sized to your room, with matching benches or chairs.", "Crockery units with glass shutters and lighting keep your best pieces on display."] },
      { h: "Thoughtful corners", p: ["Pooja units with jaali shutters, bell hooks and storage for essentials.", "Bar units with wine racks, glass holders and concealed storage."] },
    ],
    deliverables: ["Space and seating plan", "3D dining area design", "Table, crockery and pooja unit design", "Glass, stone and finish selection", "Display lighting layout", "Installation and cleanup", "15-year warranty on hardware"],
    options: [
      { t: "Dining tables", d: "Wood, stone and glass tables sized to your family and your room.", i: "1617806118233-18e1de247200" },
      { t: "Crockery units", d: "Glass-front cabinets with lighting for your best dinnerware.", i: "1600121848594-d8644e57abab" },
      { t: "Bar units", d: "Compact bars with wine racks, glass holders and hidden storage.", i: "1556909114-f6e7ad7d3136" },
      { t: "Pooja units", d: "Serene pooja corners with jaali shutters and dedicated storage.", i: "1595428774223-ef52624120d2" },
    ],
    process: processSteps,
  },
  {
    slug: "complete-interiors",
    t: "Modular Furniture Solution",
    short: "End-to-end modular furniture for your home: selection, sourcing, manufacture and installation.",
    i: "/works/avadh-ayuska/02.jpg",
    tags: ["Selection", "Sourcing", "Manufacture", "Installation"],
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
    process: processSteps,
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
