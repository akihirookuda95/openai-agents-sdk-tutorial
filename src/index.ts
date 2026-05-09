import { loadEnvFile } from "node:process";
loadEnvFile();

const { MemorySession, run } = await import("@openai/agents");
const { emailDraftAgent } = await import("./agents/emailDraftAgent.js");

const session = new MemorySession();

const result = await run(
  emailDraftAgent,
  "取引先に、明日の会議を30分後ろ倒しできるか相談するメールを書いて。丁寧だけど堅すぎない感じで。最後に本文の文字数も確認してください。",
  { session },
);

console.log("=== 一回目の出力 ===");
console.log(result.finalOutput);

const secondTurn = await run(
  emailDraftAgent,
  "さっきのメールを、もう少し短くしてください。",
  { session },
);

console.log("=== 二回目の出力 ===");
console.log(secondTurn.finalOutput);
