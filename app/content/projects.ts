import type { Project } from "./types";
import { MEDIA } from "./site";

// Project photos live in public/works/<folder>/ (folders keep the original project names). Films stream from media.thefurn.co.
const work = (slug: string, f: string) => `/works/${slug}/${f}.webp`;
const workJpg = (slug: string, f: string) => `/works/${slug}/${f}.jpg`;
// Project films: full-quality originals from the client Drive, served from our media server
// ?v=2: new cache key, so Cloudflare never serves an old cached 404 from before the HD upload
const film = (path: string) => `${MEDIA}/works/${path}.mp4?v=2`;

export const projects: Project[] = [
  {
    slug: "serene-art", n: "Serene Art", c: "Modular Kitchen", cat: "Kitchen", l: "Surat", y: "2024", area: "180 sq ft", days: "35 days", client: "Private Residence",
    d: "A calm L-shaped kitchen in matte sage and oak, with tall pantry units and a hidden appliance wall.",
    i: work("serene-art", "cover"), gallery: [work("serene-art", "01"), work("serene-art", "02")],
    service: "Furniture", credits: [{ n: "Ar. Aditya Sutariya", r: "Architect" }, { n: "Manan Surti", r: "Visual Team" }],
    video: film("serene-art/hd"), insta: "https://www.instagram.com/thefurn.co/p/DJbIoDIP_BB/",
    overview: "A young family wanted a kitchen that felt as calm as the rest of their apartment, without losing any storage.",
    challenge: "The old kitchen had open shelves that collected clutter, a fridge blocking the window and no space for a microwave or oven.",
    solution: "We moved the fridge into a tall unit run, added a concealed appliance wall and switched to handle-less sage shutters with oak accents.",
    features: ["Tall pantry with internal drawers", "Concealed appliance wall", "Handle-less matte shutters", "Quartz top with integrated sink"],
    result: "The window is clear, every appliance has a home and the counter stays empty after cooking.",
    quote: { t: "It finally feels like part of the living room, not a separate workroom.", by: "Homeowner, Serene Art" },
  },
  {
    slug: "island-axis", n: "Island Axis", c: "Modular Kitchen", cat: "Kitchen", l: "Surat", y: "2024", area: "260 sq ft", days: "42 days", client: "Private Villa",
    d: "An open island kitchen built for family cooking, with marble tops and warm under-cabinet lighting.",
    i: work("island-axis", "cover"), gallery: [work("island-axis", "01"), work("island-axis", "02")],
    service: "Furniture", credits: [{ n: "Ar. Smit Vaghasiya", r: "Architect" }, { n: "Manan Surti", r: "Visual Team" }],
    video: film("island-axis/hd"), insta: "https://www.instagram.com/p/DGKlXmMPRR2/",
    overview: "A large family that cooks together every evening wanted a kitchen where four people could work at once.",
    challenge: "A closed kitchen layout separated the cooks from the dining area, and the single counter run caused constant crowding.",
    solution: "We opened the wall into an island layout with a prep sink on the island and a breakfast counter for the children.",
    features: ["2.8 m marble-top island", "Prep sink and main sink zones", "Warm LED under-cabinet lighting", "Breakfast counter seating for four"],
    result: "Dinner prep is now a family activity, with room for everyone and a clear view into the dining space.",
    quote: { t: "The island is where we all end up, every single evening.", by: "Homeowner, Island Axis" },
  },
  {
    slug: "beige-bailey", n: "Beige Bailey", c: "Modular Kitchen", cat: "Kitchen", l: "Surat", y: "2024", area: "2,400 sq ft", days: "90 days", client: "3BHK Apartment",
    d: "A full 3BHK interior in soft beige tones, from the living room panelling to every bedroom wardrobe.",
    i: work("beige-bailey", "cover"), gallery: [work("beige-bailey", "01"), work("beige-bailey", "02")],
    service: "Furniture", credits: [{ n: "Ar. Shushil Patel", r: "Architect" }, { n: "Manan Surti", r: "Visual Team" }],
    video: film("beige-bailey/hd"), insta: "https://www.instagram.com/thefurn.co/p/DHYM00sv46Q/",
    overview: "A new 3BHK handed over bare, with a family moving in from another city in three months.",
    challenge: "Every room needed furniture, ceilings and lighting on a fixed deadline, coordinated remotely.",
    solution: "We designed the whole home around one beige and walnut palette and ran civil, electrical and furniture work in parallel.",
    features: ["Fluted living room panelling", "Four full-height wardrobes", "Modular kitchen and utility", "Cove lighting throughout"],
    result: "The family moved in on schedule to a finished home, down to the curtains.",
    quote: { t: "We arrived with suitcases and found a complete home waiting.", by: "Homeowner, Beige Bailey" },
  },
  {
    slug: "concrete-canvas", n: "Concrete Canvas", c: "Modular Kitchen", cat: "Kitchen", l: "Surat", y: "2025", area: "", days: "", client: "Private Villa",
    d: "A modular kitchen that pairs raw concrete-look finishes with warm oak joinery.",
    i: work("concrete-canvas", "cover"), gallery: [work("concrete-canvas", "01"), work("concrete-canvas", "02")],
    service: "Furniture", credits: [{ n: "Kardhavya Architect", r: "Architect" }, { n: "Manan Surti", r: "Visual Team" }],
    video: film("concrete-canvas/hd"), insta: "https://www.instagram.com/thefurn.co/p/DXRehk_D7tf/",
    overview: "", challenge: "", solution: "", features: [], result: "",
    quote: { t: "", by: "" },
  },
  {
    slug: "amber-travertine", n: "Amber Travertine", c: "Weekend Home", cat: "Weekend Home", l: "Surat", y: "2026", area: "6,000 sq ft", days: "21 days", client: "Private Residence",
    d: "A 6,000 sq ft weekend home with a book-matched marble TV wall, warm timber panelling and solid-wood lounge seating, plus a family dining room with a pooja corner.",
    i: workJpg("avadh-ayuska", "02"), gallery: [workJpg("avadh-ayuska", "01"), workJpg("avadh-ayuska", "03"), workJpg("avadh-ayuska", "04"), workJpg("avadh-ayuska", "05"), workJpg("avadh-ayuska", "06"), workJpg("avadh-ayuska", "07"), workJpg("avadh-ayuska", "08"), workJpg("avadh-ayuska", "09"), workJpg("avadh-ayuska", "10"), workJpg("avadh-ayuska", "11")],
    service: "Furniture", credits: [{ n: "Ar. Aditya Sutariya", r: "Architect" }, { n: "Tysh Marketing", r: "Visual Team" }],
    video: `${MEDIA}/works/avadh-ayuska/villa-reel.mp4`, moreVideos: [`${MEDIA}/works/avadh-ayuska/priya-01.mp4`, `${MEDIA}/works/avadh-ayuska/priyal.mp4`], insta: "https://www.instagram.com/p/DWyeI2QPAbW/",
    overview: "A joint family needed a dining space for ten, plus a pooja corner close to the kitchen.",
    challenge: "One room had to handle daily meals, festivals and prayer without feeling cluttered.",
    solution: "We designed an extendable wood table, a lit crockery unit and a pooja unit with jaali shutters on the same wall.",
    features: ["Extendable solid wood table", "Lit glass crockery unit", "Pooja unit with jaali shutters", "Hidden storage for festival items"],
    result: "Ten people sit comfortably for festivals, and the room stays calm on ordinary days.",
    quote: { t: "Diwali dinner for twelve, and nobody felt squeezed.", by: "Homeowner, Amber Travertine" },
  },
  {
    slug: "studio-furn", n: "Studio Furn", c: "Studio", cat: "Studio", l: "Surat", y: "2022", area: "", days: "", client: "The Furn",
    d: "Our own studio in Surat, where every material, finish and module is on display.",
    i: work("studio-furn", "cover"), gallery: [work("studio-furn", "01"), work("studio-furn", "02")],
    service: "Furniture", credits: [{ n: "Id. Vipul Dodiya", r: "Architect" }, { n: "Tysh Marketing", r: "Visual Team" }],
    video: film("studio-furn/hd"), insta: "https://www.instagram.com/thefurn.co/reel/DTu4lVUjylt/",
    overview: "", challenge: "", solution: "", features: [], result: "",
    quote: { t: "", by: "" },
  },
  {
    slug: "vapour-mist", n: "Vapour Mist", c: "Modular Kitchen", cat: "Kitchen", l: "", y: "2026", area: "", days: "", client: "",
    d: "A calm, light-toned modular kitchen with a stone breakfast counter, glass-front display units and a concealed shutter appliance wall.",
    i: workJpg("atmosphere", "02"), gallery: [workJpg("atmosphere", "03"), workJpg("atmosphere", "05"), workJpg("atmosphere", "06"), workJpg("atmosphere", "08"), workJpg("atmosphere", "10"), workJpg("atmosphere", "12"), workJpg("atmosphere", "13"), workJpg("atmosphere", "15"), workJpg("atmosphere", "17"), workJpg("atmosphere", "19")],
    service: "Furniture", credits: [],
    video: `${MEDIA}/works/atmosphere/green.mp4`, moreVideos: [`${MEDIA}/works/atmosphere/features.mp4`], insta: "https://www.instagram.com/thefurn.co/p/DW_c986j038/",
    overview: "", challenge: "", solution: "", features: [], result: "",
    quote: { t: "", by: "" },
  },
  {
    slug: "torrent-grey", n: "Torrent Grey", c: "Modular Kitchen", cat: "Kitchen", l: "", y: "", area: "", days: "", client: "",
    d: "A dark, refined modular kitchen with a timber-fronted island, glass display units and terrazzo flooring.",
    i: workJpg("casa-rivera", "01"), gallery: [workJpg("casa-rivera", "02"), workJpg("casa-rivera", "03"), workJpg("casa-rivera", "04"), workJpg("casa-rivera", "05"), workJpg("casa-rivera", "06"), workJpg("casa-rivera", "07"), workJpg("casa-rivera", "08"), workJpg("casa-rivera", "09"), workJpg("casa-rivera", "10"), workJpg("casa-rivera", "11")],
    service: "Furniture", credits: [{ n: "Pravaah Design Studio", r: "Architect" }, { n: "Studio Rohan Patel", r: "Photography" }],
    video: `${MEDIA}/works/casa-rivera/srp7.mp4`, moreVideos: [`${MEDIA}/works/casa-rivera/srp8.mp4`], insta: "https://www.instagram.com/p/DV_DBmej_pv/",
    overview: "", challenge: "", solution: "", features: [], result: "",
    quote: { t: "", by: "" },
  },
  {
    slug: "statuario-blanc", n: "Statuario Blanc", c: "Modular Kitchen", cat: "Kitchen", l: "", y: "", area: "", days: "", client: "",
    d: "A quiet greige modular kitchen with a long run of handle-less units, a central island and a tall appliance wall.",
    i: workJpg("snowera", "01"), gallery: [workJpg("snowera", "02"), workJpg("snowera", "03"), workJpg("snowera", "04"), workJpg("snowera", "05"), workJpg("snowera", "06"), workJpg("snowera", "07")],
    service: "Furniture", credits: [{ n: "Ar. Ajay Panchal", r: "Architect" }, { n: "Manan Surti", r: "Visual Team" }],
    video: `${MEDIA}/works/snowera/furn-k1.mp4`, insta: "https://www.instagram.com/p/DU8IdlgjwGR/",
    overview: "", challenge: "", solution: "", features: [], result: "",
    quote: { t: "", by: "" },
  },
  {
    slug: "titanium-marquina", n: "Titanium Marquina", c: "Modular Kitchen & Dining", cat: "Kitchen", l: "", y: "", area: "", days: "", client: "",
    d: "A soft-toned modular kitchen with a marble feature wall and a round marble-top dining table beside it.",
    i: workJpg("palladium", "10"), gallery: [workJpg("palladium", "01"), workJpg("palladium", "02"), workJpg("palladium", "03"), workJpg("palladium", "04"), workJpg("palladium", "05"), workJpg("palladium", "06"), workJpg("palladium", "07"), workJpg("palladium", "08"), workJpg("palladium", "09"), workJpg("palladium", "11")],
    service: "Furniture", credits: [],
    video: "", insta: "",
    overview: "", challenge: "", solution: "", features: [], result: "",
    quote: { t: "", by: "" },
  },
  {
    slug: "honed-aggregate", n: "Honed Aggregate", c: "Complete Interior", cat: "Complete Interior", l: "", y: "", area: "", days: "", client: "",
    d: "A calm, grey-and-timber home interior with a panelled bedroom headboard and a grey modular kitchen with black granite tops, reeded-glass wall cabinets and a breakfast counter.",
    i: workJpg("globcon", "11"), gallery: [workJpg("globcon", "01"), workJpg("globcon", "07"), workJpg("globcon", "08"), workJpg("globcon", "09"), workJpg("globcon", "10"), ...["01", "02", "03", "04", "05", "06", "07"].map((n) => workJpg("globcon-oasis", n))],
    service: "Furniture", credits: [],
    video: `${MEDIA}/works/globcon-oasis/furn3-1.mp4`, insta: "",
    overview: "", challenge: "", solution: "", features: [], result: "",
    quote: { t: "", by: "" },
  },
  {
    slug: "laurent-noir", n: "Laurent Noir", c: "Kitchen & Wardrobes", cat: "Kitchen", l: "", y: "", area: "", days: "", client: "",
    d: "A dark-stone island kitchen with a floating hood and tall handle-less units, paired with a walk-in wardrobe of fluted glass, slate-blue panels and brass trims.",
    i: workJpg("gokuldham", "01"), gallery: ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11"].map((n) => workJpg("gokuldham", n)),
    service: "Furniture", credits: [],
    video: `${MEDIA}/works/gokuldham/kitchen.mp4`, insta: "",
    overview: "", challenge: "", solution: "", features: [], result: "",
    quote: { t: "", by: "" },
  },
  {
    slug: "sage-calacatta", n: "Sage Calacatta", c: "Complete Interior", cat: "Complete Interior", l: "", y: "", area: "", days: "", client: "",
    d: "A double-height home in warm greys and bronze: a sunken living room, dining, a grey modular kitchen, walnut wardrobes and calm, textured bedrooms.",
    i: workJpg("greenopolish", "01"), gallery: ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11"].map((n) => workJpg("greenopolish", n)),
    service: "Furniture", credits: [],
    video: "", insta: "",
    overview: "", challenge: "", solution: "", features: [], result: "",
    quote: { t: "", by: "" },
  },
  {
    slug: "ochre-plinth", n: "Ochre Plinth", c: "Modular Kitchen", cat: "Kitchen", l: "", y: "", area: "", days: "", client: "",
    d: "A handle-less grey L-kitchen against concrete-finish walls, with a black chimney hood, a tall appliance wall and a lit glass display cabinet.",
    i: workJpg("setu-villa", "01"), gallery: ["02", "03", "04", "05", "06", "07"].map((n) => workJpg("setu-villa", n)),
    service: "Furniture", credits: [],
    video: "", insta: "",
    overview: "", challenge: "", solution: "", features: [], result: "",
    quote: { t: "", by: "" },
  },
  {
    slug: "graphite-monolith", n: "Graphite Monolith", c: "Modular Kitchen", cat: "Kitchen", l: "", y: "", area: "", days: "", client: "",
    d: "A green-stone kitchen built around a sculpted angled island, with a black island hood, grey base units and tall glass-fronted storage.",
    i: workJpg("pcube", "01"), gallery: ["02", "03", "04"].map((n) => workJpg("pcube", n)),
    service: "Furniture", credits: [],
    video: "", insta: "",
    overview: "", challenge: "", solution: "", features: [], result: "",
    quote: { t: "", by: "" },
  },
  {
    slug: "cashmere-oak", n: "Cashmere Oak", c: "Modular Kitchen", cat: "Kitchen", l: "", y: "", area: "", days: "", client: "",
    d: "A warm greige kitchen framed by a rounded walnut arch, with black granite tops, reeded-glass uppers, pendant lights and a breakfast counter.",
    i: workJpg("timber-arch", "01"), gallery: ["02", "03", "04"].map((n) => workJpg("timber-arch", n)),
    service: "Furniture", credits: [],
    video: `${MEDIA}/works/timber-arch/furn-k2.mp4`, insta: "",
    overview: "", challenge: "", solution: "", features: [], result: "",
    quote: { t: "", by: "" },
  },
  {
    slug: "ivory-heritage", n: "Ivory Heritage", c: "Kitchen & Living", cat: "Kitchen", l: "", y: "", area: "", days: "", client: "",
    d: "A bright all-white open kitchen and living space on marble floors, with shaker-style units, a lit glass display tower, a mobile glass trolley and a slim TV wall.",
    i: workJpg("shreepad", "01"), gallery: ["02", "03", "04", "05", "06", "07", "08"].map((n) => workJpg("shreepad", n)),
    service: "Furniture", credits: [],
    video: "", insta: "",
    overview: "", challenge: "", solution: "", features: [], result: "",
    quote: { t: "", by: "" },
  },
  {
    slug: "serene-wardrobe", n: "Serene Wardrobe", c: "Wardrobe", cat: "Wardrobe", l: "", y: "", area: "", days: "", client: "",
    d: "A walk-in wardrobe in warm oak and smoked glass, with lit shelves, slim black frames, pull-out trays and hanging drawer units.",
    i: workJpg("serene-wardrobe", "01"), gallery: ["02", "03", "04", "05", "06", "07", "08", "09"].map((n) => workJpg("serene-wardrobe", n)),
    service: "Furniture", credits: [],
    video: "", insta: "",
    overview: "", challenge: "", solution: "", features: [], result: "",
    quote: { t: "", by: "" },
  },
  {
    slug: "sage-granite", n: "Sage Granite", c: "Kitchen & Dining", cat: "Kitchen", l: "", y: "", area: "", days: "", client: "",
    d: "A sage-green and mocha kitchen with a speckled granite backsplash, cove-lit units and a black-fluted island, opening onto a long marble-top dining table.",
    i: workJpg("sage-granite", "01"), gallery: ["02", "03", "04", "05", "06"].map((n) => workJpg("sage-granite", n)),
    service: "Furniture", credits: [],
    video: `${MEDIA}/works/sage-granite/furn3-4.mp4`, insta: "",
    overview: "", challenge: "", solution: "", features: [], result: "",
    quote: { t: "", by: "" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

// Client testimonials, shown on the home page and the Studio page. `slug` links a quote to its project (photo and
// link); leave it out when we don't know the project yet and one of our kitchen photos is shown instead.
// Entries marked `sample` are placeholders (see SHOW_SAMPLES in testimonials.tsx).
export type Testimonial = { quote: string; name: string; role: string; place: string; slug?: string; sample?: boolean };
export const testimonials: Testimonial[] = [
  { quote: "Honestly, our experience with The Furn was amazing, they executed our kitchen perfectly. Before planning our kitchen, everything was well explained and properly planned out for us. And mainly after the execution, we feel our kitchen feels very premium and elegant.", name: "Mrs. Rupal Shroff", role: "Modular kitchen", place: "Vesu, Surat" },
  { quote: "Our kitchen finally feels like home – warm, inviting, and beautifully organized. The Furn really understood what we needed and turned our vision into reality. It's not just a kitchen anymore – it's our favorite space in the house. We're so happy we chose them.", name: "Mrs. Trusha Patel", role: "Modular kitchen", place: "Pal, Surat" },
  { quote: "Choosing The Furn for our modular kitchen was the best decision we made during our home journey. The design is sleek yet warm, with a clear focus on functionality and finish. Every element – from the smooth drawers to the premium fittings – reflects quality. It's a space that feels both luxurious and effortless.", name: "Poonam Patel", role: "Interior designer", place: "Pal, Surat" },
  { quote: "We had a fantastic experience with The Furn. Right from the design stage to the final setup, everything was handled with care and professionalism. The modular kitchen they delivered is both elegant and practical – exactly what we needed. The quality, finish, and attention to detail truly set them apart. Highly recommended!", name: "Mr. Deepak Shah", role: "Modular kitchen", place: "Vesu, Surat" },
  { quote: "My modular kitchen has completely transformed my home! The minimal and modern design is not only stunning but also extremely functional. The use of high-quality materials and innovative solutions like hidden storage make it feel luxurious and efficient at the same time. It's exactly what I wanted, and I'm so glad I chose this team for the project!", name: "Patel Family", role: "Modular kitchen", place: "Piplod, Surat" },
];

// The photo behind a testimonial: its project's cover, or one of our kitchen photos when the project isn't known
const kitchenPhotos = projects.filter((p) => p.cat === "Kitchen").map((p) => p.i);
export const testimonialPhoto = (t: Testimonial, k: number) => (t.slug && getProject(t.slug)?.i) || kitchenPhotos[(k * 3) % kitchenPhotos.length];

// Works filter: every category that has at least one project, biggest first, so new categories appear on their own
export const workCats: { c: string; n: number }[] = [
  { c: "All", n: projects.length },
  ...Object.entries(projects.reduce<Record<string, number>>((m, p) => ({ ...m, [p.cat]: (m[p.cat] ?? 0) + 1 }), {}))
    .sort((a, b) => b[1] - a[1]).map(([c, n]) => ({ c, n })),
];
