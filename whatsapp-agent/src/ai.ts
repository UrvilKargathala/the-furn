// Answers typed questions. Placeholder until the Claude step is built (Sonnet 5.5 everyday, Opus 5.5 for harder chats);
// for now it hands the question to the team so nothing goes unanswered.
import { business } from "./config.js";
import type { Turn } from "./db.js";

export async function answer(question: string, _history: Turn[], _name: string): Promise<string> {
  void question;
  return `Thank you for your message. A member of our team will reply here shortly (${business.hours}).`;
}
