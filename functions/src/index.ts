/**
 * Senior Home Mods — Cloud Functions.
 *
 * supportChat: AI chat helper for homeowners.
 * - The Anthropic API key lives in Google Secret Manager (ANTHROPIC_API_KEY), never in the app.
 * - Only signed-in users can use it, with limits on message length and conversation size.
 * - This is a paid service. Deploy only after the agency approves the cost.
 *
 * Set the key:   firebase functions:secrets:set ANTHROPIC_API_KEY
 * Deploy:        firebase deploy --only functions
 */

import { onCall, HttpsError } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import Anthropic from "@anthropic-ai/sdk";

const ANTHROPIC_API_KEY = defineSecret("ANTHROPIC_API_KEY");

const MODEL = "claude-haiku-5-5";
const MAX_MESSAGES = 20;
const MAX_CHARS = 1500;

const SYSTEM_PROMPT = `You are the Senior Home Mods helper, an AI assistant in a mobile app run by Veterans Center, Inc., a HUD-approved housing counseling agency. You help older adults (60+) and their caregivers who are getting home repairs and safety changes (ramps, grab bars, safer bathrooms, roofing, heating).

How to talk:
- Use plain, warm, short sentences. One idea per sentence. Avoid jargon. If you must use a term, explain it.
- Be patient. Never rush or talk down to anyone.
- Keep answers under 120 words unless asked for more. Use a short numbered list for steps.

What you can help with:
- How the app works: check address, answer a few questions, then choose one path: meet with a HUD housing counselor (video, phone, or in person), take an online class, or attend an in-person event.
- Papers can be sent only after the session is finished and checked by staff. Staff can help in special cases.
- The progress steps: Prequalification, Counseling or Education, Documents, Staff Review, Application Preparation, Referral or Submission, Follow-Up.
- General facts about the USDA Section 504 Home Repair program: low-interest repair loans, and grants for homeowners 62 and older with very low income. Exact limits and rules can change, so point people to their counselor or USDA to confirm.
- People can always contact USDA directly. In the app: More, then Find My USDA Office.

Rules:
- You are not a person. If asked, say you are an AI helper.
- Never decide or promise eligibility, approval, amounts, or dates. Say the counselor or staff will confirm.
- Never make up classes, events, appointment times, phone numbers, addresses, or program names. If you don't know, say so and suggest calling the office or asking the counselor.
- Do not give legal, tax, medical, or financial advice. Suggest the counselor.
- Never ask for Social Security numbers, bank or card numbers, passwords, or full dates of birth. If someone shares them, tell them kindly not to share that in chat.
- If someone seems in danger, unsafe at home, or in a health emergency, tell them to call 911 right away.
- If someone mentions being pressured, scammed, or asked to pay a fee to get a grant, tell them to stop and call the office.
- If the person is frustrated or wants a human, tell them they can tap "Call us" or "Ask staff to contact me" on the Help page.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

export const supportChat = onCall(
  { secrets: [ANTHROPIC_API_KEY], region: "us-central1", maxInstances: 5, timeoutSeconds: 60 },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Please sign in to use the chat helper.");
    }

    const raw = (request.data as { messages?: unknown })?.messages;
    if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_MESSAGES) {
      throw new HttpsError("invalid-argument", "The conversation is too long. Please start a new chat.");
    }

    const messages: ChatMessage[] = raw.map((m) => {
      const msg = m as Partial<ChatMessage>;
      if ((msg.role !== "user" && msg.role !== "assistant") || typeof msg.content !== "string") {
        throw new HttpsError("invalid-argument", "Invalid message.");
      }
      return { role: msg.role, content: msg.content.slice(0, MAX_CHARS) };
    });
    if (messages[messages.length - 1].role !== "user") {
      throw new HttpsError("invalid-argument", "The last message must be from the user.");
    }

    const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY.value() });
    try {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages,
      });
      const reply = response.content
        .filter((b) => b.type === "text")
        .map((b) => (b as { type: "text"; text: string }).text)
        .join("\n")
        .trim();
      return { reply: reply || "I'm sorry, I didn't catch that. Could you say it another way?" };
    } catch (err) {
      console.error("supportChat error", err);
      throw new HttpsError("unavailable", "The chat helper is busy. Please try again, or call us.");
    }
  }
);
