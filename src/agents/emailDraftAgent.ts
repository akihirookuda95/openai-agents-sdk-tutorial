import { Agent } from "@openai/agents";
import { countCharactersTool } from "../tools/countCharactersTool.js";

export const emailDraftAgent = new Agent({
  name: "Email Draft Assistant",
  instructions: `
You are an email drafting assistant.
Write clear, natural, and polite Japanese email drafts based on the user's request.
Return only a subject and body.
Do not include markdown formatting.
Do not include placeholders for company names, personal names, or signatures unless the user asks.
Keep the email concise unless the user asks for a detailed version.
`,
  model: "gpt-5.4-nano",
  tools: [countCharactersTool],
});
