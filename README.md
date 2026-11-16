# Marked Fast

[![make.fun](https://make.fun/badge/markdown-render-speed-02.svg)](https://make.fun/bounty/markdown-render-speed-02?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)
[![rank](https://make.fun/badge/markdown-render-speed-02/Gipar1/marked-fast-platyday/rank.svg)](https://make.fun/bounty/markdown-render-speed-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)
[![reward](https://make.fun/badge/markdown-render-speed-02/Gipar1/marked-fast-platyday/reward.svg)](https://make.fun/bounty/markdown-render-speed-02?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)

A dependency-free, MIT-licensed fork of marked 18.1.3 with list-tokenization and inline-dispatch optimizations. Built for the [make.fun Markdown rendering bounty](https://make.fun/bounty/markdown-render-speed-02).

## Run

Requires Node.js with TypeScript stripping support. Set MAKEFUN_INPUT_DIR to a directory containing cases.json and MAKEFUN_OUTPUT_DIR to an existing output directory, then run `node main.ts`. Each case is rendered independently to html.json.

## Validation

See BENCHMARK.md for local correctness tests, timing samples and limitations. Local results are not official standings or proof of prize eligibility. No prize or acceptance is claimed.

## License

MIT. Upstream Marked copyright and attribution are retained in LICENSE and NOTICE.
