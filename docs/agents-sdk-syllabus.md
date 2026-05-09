# OpenAI Agents SDK チュートリアル シラバス

## 目的

このチュートリアルでは、Node.js + TypeScript で OpenAI Agents SDK を使い、単体エージェントから複数エージェント、ツール、状態管理、ガードレール、観測、評価までを段階的に実装する。

基本方針は次の通り。

- 公式ドキュメントを読みながら、TypeScript のコードを写経して理解する。
- 最初は小さい単体エージェントから始める。
- 動くコードを確認してから、ツール、状態、ハンドオフ、評価を追加する。
- Python の例は扱わず、TypeScript に絞る。

## 前提

このリポジトリは、次の構成を前提にする。

```text
openai-agents-sdk-tutorial/
  package.json
  package-lock.json
  tsconfig.json
  docs/
    agents-sdk-syllabus.md
  src/
    index.ts
  dist/
```

主に使うコマンドは次の通り。

```bash
npx tsx src/index.ts
npx tsc
node dist/index.js
```

API キーは、最初は環境変数で扱う。

```bash
export OPENAI_API_KEY=sk-...
```

## 学習の進め方

各回は次の順番で進める。

1. 公式ドキュメントの該当ページを読む。
2. 重要な概念を確認する。
3. TypeScript コードを写経する。
4. `npx tsx` で実行する。
5. 動作結果とエラーを確認する。
6. 必要に応じて `npx tsc` で型チェックする。

## 第1回: Agents SDK の全体像

参照:

- https://developers.openai.com/api/docs/guides/agents

学ぶこと:

- Agents SDK が何を解決するためのものか
- OpenAI SDK と Agents SDK の違い
- Agent、tool、handoff、guardrail、trace の大まかな役割
- 「まず小さい agent を作り、必要に応じて拡張する」という設計方針

作るもの:

- まだコードは増やさず、`src/` と `docs/` の役割を整理する。

到達目標:

- Agents SDK を「モデル呼び出しだけでなく、ツール実行、状態、承認、観測を含む実行基盤」として理解する。

## 第2回: 最初のエージェント

参照:

- https://developers.openai.com/api/docs/guides/agents/quickstart

学ぶこと:

- `Agent` の作り方
- `run()` の使い方
- `name`, `instructions`, `model` の意味
- `result.finalOutput` の読み方

作るもの:

- `src/index.ts`
- 1つの質問に答える最小のエージェント

到達目標:

- `npx tsx src/index.ts` で Agents SDK の最小コードを実行できる。

## 第3回: Agent 定義を整理する

参照:

- https://developers.openai.com/api/docs/guides/agents/define-agents

学ぶこと:

- Agent に設定できる主なプロパティ
- `instructions` の書き方
- `tools` の追加
- `outputType` による構造化出力
- 1つの Agent に責務を詰め込みすぎない設計

作るもの:

- `src/agents/` ディレクトリ
- 役割ごとに分けた Agent 定義
- zod を使った簡単な構造化出力

到達目標:

- Agent の設定を `src/index.ts` に直書きせず、再利用しやすい形に分離できる。

## 第4回: モデル選択と実行設定

参照:

- https://developers.openai.com/api/docs/guides/agents/models

学ぶこと:

- Agent ごとの `model` 指定
- run 単位の model 指定
- `OPENAI_DEFAULT_MODEL` の役割
- 品質、速度、コストのトレードオフ

作るもの:

- 高品質用 Agent
- 軽量実行用 Agent
- Runner を使った実行設定

到達目標:

- どこでモデルを指定すべきかを説明できる。

## 第5回: Agent の実行ループと状態管理

参照:

- https://developers.openai.com/api/docs/guides/agents/running-agents
- https://developers.openai.com/api/docs/guides/agents/results

学ぶこと:

- 1回の `run()` が何をしているか
- tool call があるときの実行ループ
- `history`
- `lastAgent`
- `lastResponseId`
- session による会話継続

作るもの:

- 2ターン以上会話できる Agent
- `MemorySession` を使うサンプル

到達目標:

- 1回きりの実行と、会話を継続する実行の違いを理解する。

## 第6回: Function tool を作る

参照:

- https://developers.openai.com/api/docs/guides/agents/quickstart
- https://developers.openai.com/api/docs/guides/agents/define-agents

学ぶこと:

- `tool()` の使い方
- zod による引数スキーマ
- `execute()` の役割
- モデルが必要に応じてツールを呼ぶ流れ

作るもの:

- `src/tools/` ディレクトリ
- 天気、計算、検索のような小さい function tool

到達目標:

- Agent が自分でツールを選び、実行結果を使って回答する流れを確認できる。

## 第7回: 複数 Agent とハンドオフ

参照:

- https://developers.openai.com/api/docs/guides/agents/orchestration

学ぶこと:

- handoff と agents-as-tools の違い
- 専門 Agent に会話の主導権を渡す設計
- manager Agent が専門 Agent を道具として使う設計
- `handoffDescription` の役割

作るもの:

- triage Agent
- billing Agent
- refund Agent
- summarizer Agent

到達目標:

- 「会話を引き継がせるべきか」「裏側で呼ぶだけにするべきか」を判断できる。

## 第8回: Guardrails と human review

参照:

- https://developers.openai.com/api/docs/guides/agents/guardrails-approvals

学ぶこと:

- input guardrail
- output guardrail
- tool guardrail
- human-in-the-loop approval
- run が中断されるケース

作るもの:

- 入力内容を事前チェックする guardrail
- 危険なツール実行前に止める approval のサンプル

到達目標:

- Agent が常に自動実行してよいわけではないことを理解し、止める場所を設計できる。

## 第9回: Sandbox Agents

参照:

- https://developers.openai.com/api/docs/guides/agents/sandboxes

学ぶこと:

- sandbox の役割
- harness と compute の境界
- ファイル操作、コマンド実行、パッケージ、ポート、snapshot の考え方
- beta 機能として扱うときの注意

作るもの:

- この回では、まず概念理解を優先する。
- 実装は公式 SDK の安定性と必要性を確認してから行う。

到達目標:

- sandbox を使うべきケースと、通常の tool で十分なケースを分けられる。

## 第10回: MCP と外部連携

参照:

- https://developers.openai.com/api/docs/guides/agents/integrations-observability

学ぶこと:

- hosted MCP tool
- local MCP server
- stdio / HTTP 経由の MCP 接続
- Agent に外部能力を追加する設計

作るもの:

- hosted MCP tool の読み取り
- local MCP server の接続例を読む
- 必要に応じて小さい MCP 連携サンプルを作る

到達目標:

- function tool と MCP tool の使い分けを説明できる。

## 第11回: Tracing と観測

参照:

- https://developers.openai.com/api/docs/guides/agents/integrations-observability

学ぶこと:

- traces dashboard
- model call、tool call、handoff、guardrail の記録
- `withTrace()` の使い方
- デバッグ時に見るべき情報

作るもの:

- 複数 run を1つの trace にまとめるサンプル

到達目標:

- Agent がなぜその回答や tool call を選んだのか、trace から調べられる。

## 第12回: Agent workflow の評価

参照:

- https://developers.openai.com/api/docs/guides/agent-evals

学ぶこと:

- traces を使った初期デバッグ
- graders
- datasets
- eval runs
- prompt、tool、routing、guardrail の改善サイクル

作るもの:

- 評価観点のチェックリスト
- 小さいテストデータセット案
- 期待する tool call / handoff / 出力形式の定義

到達目標:

- 「動いた」だけで終わらず、変更前後で品質を比較する考え方を持てる。

## 最終課題

小さい業務支援 Agent を作る。

候補:

- FAQ 回答 Agent
- チケット分類 Agent
- メール下書き Agent
- 学習メモ要約 Agent

必須要件:

- 単体 Agent がある
- 少なくとも1つの function tool がある
- 2ターン以上の会話状態を扱う
- 1つ以上の guardrail がある
- trace を確認できる
- 簡単な評価観点を持つ

## 参照ドキュメント

- Agents SDK overview: https://developers.openai.com/api/docs/guides/agents
- Quickstart: https://developers.openai.com/api/docs/guides/agents/quickstart
- Agent definitions: https://developers.openai.com/api/docs/guides/agents/define-agents
- Models and providers: https://developers.openai.com/api/docs/guides/agents/models
- Running agents: https://developers.openai.com/api/docs/guides/agents/running-agents
- Sandbox agents: https://developers.openai.com/api/docs/guides/agents/sandboxes
- Orchestration and handoffs: https://developers.openai.com/api/docs/guides/agents/orchestration
- Guardrails and human review: https://developers.openai.com/api/docs/guides/agents/guardrails-approvals
- Results and state: https://developers.openai.com/api/docs/guides/agents/results
- Integrations and observability: https://developers.openai.com/api/docs/guides/agents/integrations-observability
- Evaluate agent workflows: https://developers.openai.com/api/docs/guides/agent-evals
