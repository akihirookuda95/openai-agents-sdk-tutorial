# openai-agents-sdk-tutorial

OpenAI Agents SDK を Node.js + TypeScript で学ぶためのチュートリアル用リポジトリです。

最終的には、ユーザーの依頼内容をもとに件名と本文を作成し、修正依頼にも対応できる「メール下書き Agent」を作ります。

## このリポジトリの役割

このリポジトリは、OpenAI Agents SDK の主要機能を小さなコードで順番に学ぶための教材です。

学習対象は TypeScript 版の Agents SDK です。Python 版は扱いません。

主に学ぶ内容:

- Agent の定義
- `run()` による Agent 実行
- モデル指定
- 会話状態の扱い
- function tool の追加
- 複数 Agent の連携
- guardrail
- tracing
- eval

授業の進め方は [AGENTS.md](AGENTS.md) にまとめています。

全体のシラバスは [docs/agents-sdk-syllabus.md](docs/agents-sdk-syllabus.md) を参照してください。

最終的に作るメール下書き Agent の構想は [docs/email-draft-agent-product.md](docs/email-draft-agent-product.md) にまとめています。

## 現在の構成

```text
openai-agents-sdk-tutorial/
  src/
    index.ts
    agents/
      emailDraftAgent.ts
    tools/
      countCharactersTool.ts
  docs/
    agents-sdk-syllabus.md
    email-draft-agent-product.md
  AGENTS.md
  package.json
  tsconfig.json
  .env.example
  .vscode/
    launch.json
```

## セットアップ

依存関係をインストールします。

```bash
npm install
```

`.env.example` を参考に、`.env` を作成します。

```env
OPENAI_API_KEY=
```

`.env` には実際の API キーを設定します。

```env
OPENAI_API_KEY=sk-...
```

`.env` は `.gitignore` に含めているため、Git 管理しません。

## 実行方法

開発中は TypeScript を直接実行します。

```bash
npx tsx src/index.ts
```

型チェックは次のコマンドで行います。

```bash
npx tsc --noEmit
```

VS Code では、F5 で `src/index.ts` を実行できます。

`.vscode/launch.json` では、内部的に次の形で実行しています。

```bash
node --import tsx src/index.ts
```

## ここまでにやったこと

### 1. Node.js + TypeScript 環境の作成

- `package.json` を作成
- `typescript`, `tsx`, `@types/node` を追加
- `@openai/agents` と `zod` を追加
- `tsconfig.json` を NodeNext 前提で設定
- `.env.example` と `.gitignore` を追加
- VS Code の F5 実行用に `.vscode/launch.json` を追加

### 2. 授業方針とシラバスの作成

- `AGENTS.md` に授業スタイルを記載
- `docs/agents-sdk-syllabus.md` に全体の学習順序を記載
- `docs/email-draft-agent-product.md` に最終プロダクト構想を記載

### 3. 最小のメール下書き Agent の作成

- `src/agents/emailDraftAgent.ts` に `Email Draft Assistant` を定義
- `src/index.ts` から Agent を実行
- `gpt-5.4-nano` を使い、低コストでチュートリアルを進める方針に設定

### 4. 会話状態の追加

- `MemorySession` を使い、2ターン以上の会話を継続できるようにした
- 「さっきのメールを短くして」のような修正依頼に対応できることを確認

### 5. function tool の追加

- `src/tools/countCharactersTool.ts` に本文文字数を数える tool を追加
- `emailDraftAgent` に `tools: [countCharactersTool]` を設定
- ユーザーが文字数確認を求めたとき、Agent が tool を使えるようにした

## これからやること

次の予定は、シラバスに沿って進めます。

1. function tool の理解を深める
2. 構造化出力で件名と本文を分けて返す
3. 複数 Agent に分ける
4. guardrail を追加する
5. tracing で Agent の挙動を確認する
6. eval でメール下書きの品質を評価する

最終的には、次のようなメール下書き Agent を目指します。

- ユーザーの目的、相手、文体を理解する
- 必要なら不足情報を質問する
- 件名と本文を自然な日本語で出力する
- 追加修正に対応する
- 文字数やトーンを確認する
- 不適切な依頼を guardrail で止める
- trace と eval で品質を確認する

## 注意

API キーや秘密情報はコードに直接書かないでください。

`.env` は Git 管理対象外です。共有用には `.env.example` を使います。
