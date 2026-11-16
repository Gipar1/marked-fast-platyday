# Benchmark

Measured locally on Windows, Node v24.16.0. These are process measurements, not official Node 22 container heat results. No official ranking or confidence claim is made.

## Implementation

parse.js is an attributed MIT fork of marked 18.1.3, not a new Markdown dialect. It retains the complete grammar and renderer for complex inputs. The list tokenizer uses indexOf/slice instead of split to obtain the first line. Inline dispatch checks necessary leading characters before escape, HTML, code, emphasis, deletion and autolink probes. There is no output lookup, case ID use, cross-call memoization, clock or environment access in the parser. main.ts reads only directory overrides supported by the local kit driver.

## Commands

Run from this repository (prefix with rtk proxy if using the workspace RTK wrapper):

~~~powershell
node ../markdown-render-speed-02-kit/cli/makefun.mjs verify-instance --kit ../markdown-render-speed-02-kit --driver process
node ../markdown-render-speed-02-kit/cli/makefun.mjs grade-local --kit ../markdown-render-speed-02-kit --bot . --driver process --worktree
node ../markdown-render-speed-02-kit/cli/makefun.mjs check --kit ../markdown-render-speed-02-kit --repo . --worktree --json
node benchmark.mjs
~~~

The benchmark script imports the sibling kit only for development. It is never imported by the entry. It compares complete HTML strings, consumes rendered lengths, uses one warmup and four measured rounds, alternates baseline/entry order, and records process.cpuUsage and performance.now outside the parser. Fresh documents use the kit readme generator and streamFor with two independently chosen seeds (64-digit hex encodings of 1 and 2), 40 documents each. Insert examples are filtered for a surviving trailing sentinel paragraph. This is a fresh generated stress corpus, not a claim of reproducing an official drand draw.

## Results

- Kit integrity: 27 files verified. verify-instance regenerated practice twice with matching input/reference digests.
- grade-local: passed=1, cases_passed=720, cases_total=720; all 71 groups; two executions and L1 regrade reproduced byte for byte.
- check: ok=true, failed=[] after adding SPDX-License-Identifier: MIT. Recording, ownership and other server-only requirements are not established by local checks.
- Final benchmark correctness: practice 720/720, fresh 80/80, deterministic fuzz 12000/12000.
- Earlier stress run: an additional 160 generated documents containing unrestricted spec inserts and 12000 fuzz strings all matched. Its fresh CPU speedup was 1.00x; timings are sensitive to workload and host load.

Final timing samples in milliseconds, whole corpus per sample:

| Corpus | Metric | Baseline samples | Entry samples | Median baseline | Median entry | Ratio |
|---|---|---|---|---:|---:|---:|
| Practice 720 | CPU | 937, 937, 750, 812 | 750, 719, 766, 829 | 874.5 | 758 | 1.154x |
| Practice 720 | Wall | 874.062, 908.566, 757.335, 802.693 | 736.406, 713.000, 754.969, 788.225 | 838.377 | 745.687 | 1.124x |
| Fresh 80 | CPU | 1735, 1531, 1875, 1984 | 1374, 1406, 1360, 1687 | 1805 | 1390 | 1.299x |
| Fresh 80 | Wall | 1761.123, 1561.706, 1920.956, 2067.188 | 1335.153, 1442.840, 1332.093, 1700.586 | 1841.039 | 1388.996 | 1.325x |

Output lengths were 3,911,425 code units for practice and 7,289,124 for fresh for both implementations in every measured run.

Before editing, an eight-pass baseline V8 CPU profile was collected with node --cpu-prof on an external development script. Top self samples: list 854, inline-text regex 347, emphasis mask 337, inline dispatch 303, emStrong 279. This motivated first-line allocation removal and character dispatch guards. Profiles, copied kit data and generated outputs remain outside the repository.

The full upstream source is retained with its copyright and NOTICE. No submission was made and no remote repository was created. Local correctness evidence cannot prove equivalence for every possible string, and local timings do not establish official prize eligibility.

