import { tool } from "@openai/agents";
import { z } from "zod";

export const countCharactersTool = tool({
  name: "count_characters",
  description:
    "Count the number of characters in a Japanese email body. Use this when the user asks to check the length of the draft.",
  parameters: z.object({
    text: z.string().describe("The email body text to count."),
  }),
  async execute({ text }) {
    const count = [...text.replace(/\s/g, "")].length;
    return `空白と改行を除いた文字数は ${count} 文字です。`;
  },
});
