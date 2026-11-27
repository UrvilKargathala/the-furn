// Settings come from environment variables (Coolify). Business facts match the website (confirmed 27 Nov 2026).
const env = (k: string, fallback = "") => process.env[k] ?? fallback;

export const config = {
  port: Number(env("PORT", "8080")),
  databaseUrl: env("DATABASE_URL"),
  meta: {
    graphVersion: env("META_GRAPH_VERSION", "v23.0"),
    phoneNumberId: env("META_PHONE_NUMBER_ID"),
    accessToken: env("META_ACCESS_TOKEN"),
    appSecret: env("META_APP_SECRET"),
    verifyToken: env("META_VERIFY_TOKEN"),
  },
  ownerPhone: env("OWNER_PHONE", "919925618889"),
  anthropicKey: env("ANTHROPIC_API_KEY"),
  knowledgeUrl: env("KNOWLEDGE_URL", "https://www.thefurn.co/llms-full.txt"),
};

export const business = {
  name: "The Furn",
  phone: "+91 99256 18895",
  studio: "220, 219 Sumerru Business Corner, near Park Inn by Radisson Blue, Pal Gam, Surat, Gujarat 394510",
  maps: "https://maps.app.goo.gl/4Uj64GrYCCQEvjfF9",
  hours: "Monday to Saturday, 10 AM to 7 PM (Sunday closed)",
  website: "https://www.thefurn.co",
};

// Booking rules: Mon–Sat, three slots, same for site and studio visits, up to 14 days ahead
export const booking = {
  daysAhead: 14,
  slots: [
    { id: "s1", label: "10 AM – 1 PM" },
    { id: "s2", label: "2 PM – 5 PM" },
    { id: "s3", label: "5 PM – 7 PM" },
  ],
  services: [
    { id: "kitchen", label: "Modular kitchen" },
    { id: "wardrobe", label: "Wardrobes" },
    { id: "tv", label: "TV unit / living" },
    { id: "bedroom", label: "Bedroom furniture" },
    { id: "dining", label: "Dining & pooja" },
    { id: "home", label: "Complete home" },
    { id: "other", label: "Something else" },
  ],
};

// Hours a team reply keeps the bot quiet in that chat
export const TEAM_PAUSE_HOURS = 12;
