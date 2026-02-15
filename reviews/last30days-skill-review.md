# Review: mvanhorn/last30days-skill (v2.1)

**Review Date:** February 15, 2026
**Repository:** https://github.com/mvanhorn/last30days-skill
**Stars:** 2.6k | **Forks:** 305 | **License:** MIT

---

## 1. What It Does

`last30days` is a Claude Code skill that researches any topic across Reddit, X (Twitter), YouTube, and the web, filtering to the last 30 days. It synthesizes findings into actionable summaries, prompt packs, or expert briefings.

**Invocation:** `/last30days [topic]`

**Core workflow:**
1. Parse user intent (TOPIC, TARGET_TOOL, QUERY_TYPE)
2. Execute Python research script with 5-minute timeout
3. Supplement with WebSearch (excluding sources already covered)
4. Synthesize and present findings with engagement stats

---

## 2. Architecture Overview

### Engine
- **Orchestrator:** `scripts/last30days.py` — coordinates discovery, enrichment, normalization, scoring, deduplication, and rendering
- **Library modules** (`scripts/lib/`):
  - `env.py` — API key loading from `~/.config/last30days/.env`
  - `dates.py` — 30-day recency window enforcement
  - `cache.py` — 24-hour TTL caching (topic + date range key)
  - `http.py` — stdlib-only HTTP client with retry logic
  - `models.py` — auto-selection of OpenAI/xAI models (7-day cache)
  - `openai_reddit.py` — OpenAI Responses API + web_search for Reddit
  - `xai_x.py` — xAI Responses API + x_search for X
  - `reddit_enrich.py` — thread JSON enrichment for real engagement metrics
  - `normalize.py` — canonical schema conversion
  - `score.py` — popularity-aware scoring (relevance + recency + engagement)
  - `dedupe.py` — near-duplicate detection via text similarity
  - `render.py` — markdown and JSON output generation
  - `schema.py` — type definitions and validation

### Additional Components
- `scripts/watchlist.py` — scheduled topic tracking
- `scripts/briefing.py` — morning briefing generation
- `scripts/store.py` — SQLite persistence layer
- `scripts/sync.sh` — data synchronization

### Plugin System
- `.claude-plugin/plugin.json` — Claude Code plugin metadata
- `agents/openai.yaml` — OpenAI Codex CLI compatibility config
- `variants/open/SKILL.md` — watchlist/briefing variant

### Search Depth Modes
| Mode | Timeout | Use Case |
|------|---------|----------|
| quick | 90s | Fast scan |
| default | 180s | Standard research |
| deep | 300s | Comprehensive investigation |

---

## 3. API Dependencies

| Service | Key Required | Purpose | Fallback |
|---------|-------------|---------|----------|
| OpenAI | Yes (`OPENAI_API_KEY`) | Reddit search via Responses API | None (reddit-only mode disabled) |
| xAI | Optional (`XAI_API_KEY`) | X/Twitter search | Bird CLI (cookie-based, free) |
| Parallel AI | Optional (`PARALLEL_API_KEY`) | LLM-optimized web results | WebSearch tool |
| Brave Search | Optional (`BRAVE_API_KEY`) | Web search (2k free/month) | WebSearch tool |
| OpenRouter | Optional (`OPENROUTER_API_KEY`) | Perplexity Sonar Pro | WebSearch tool |

**X Authentication without API key:** Reads browser cookies from Safari, Chrome, or Firefox with an active x.com login. Falls back to manual `AUTH_TOKEN` and `CT0` env vars.

---

## 4. Strengths

### Well-Engineered Data Pipeline
The separation of concerns in `scripts/lib/` is clean. Each module handles one responsibility (discovery, enrichment, normalization, scoring, deduplication, rendering). The canonical schema means different sources are comparable after normalization.

### Popularity-Aware Scoring
The scoring system accounts for relevance, recency, and engagement — three dimensions that meaningfully separate signal from noise in social data. Near-duplicate detection prevents inflated results from cross-posted content.

### Multiple Output Formats
The `--emit` flag supports `compact`, `json`, `md`, `context`, and `path` modes. The `context` output is specifically designed for embedding in other skills, and the JSON output enables programmatic consumption. This makes the skill composable.

### Embeddability
The SPEC.md documents four integration patterns (inline injection, file read, path-based loading, JSON export). This is designed to be a building block, not just a standalone tool.

### Graceful Degradation
Operates in `reddit-only`, `x-only`, or `both` modes depending on available API keys. Bird CLI provides a zero-cost fallback for X search. YouTube transcript extraction is optional via yt-dlp.

### Watchlist Mode (Open Variant)
The open variant adds persistent topic tracking, scheduled re-research, and briefing generation — moving from one-shot queries to ongoing intelligence.

---

## 5. Weaknesses and Risks

### API Cost Exposure
Every research query makes OpenAI Responses API calls. At scale (daily watchlist, multiple topics), costs could accumulate. There's no documented cost estimation or budgeting mechanism.

### Cookie-Based X Auth is Fragile
Browser cookie extraction for X/Twitter is inherently unstable. Cookie formats change, browsers update storage mechanisms, and session expiry is unpredictable. This is the weakest link in the pipeline.

### No Source Tier Classification
Results are scored by engagement metrics but not classified by source reliability. A viral Reddit shitpost and a well-sourced industry analysis both flow through the same pipeline. The scoring system weights popularity, which can amplify low-quality viral content.

### Limited Geographic Filtering
There's no mechanism to filter or weight results by region. All sources are treated equally regardless of geographic relevance — a gap if your analysis requires regional specificity.

### Node.js 22+ Requirement for X Search
The vendored Twitter GraphQL client requires Node.js 22+, which is a relatively recent version. This could create friction in environments with older Node installations.

### Two-Phase Search is Slow
V2's depth-over-speed tradeoff means typical queries take 2-8 minutes. For time-sensitive decisions or high-volume scanning, this is a meaningful constraint.

---

## 6. Compatibility with Claude_Trends Framework

This is where the two projects intersect most meaningfully. The Claude_Trends framework defines a rigorous methodology for trend analysis but relies on manual research. The `last30days` skill automates exactly the data collection phase that the framework's templates require.

### Direct Alignment

| Claude_Trends Component | last30days Capability |
|--------------------------|----------------------|
| **Tier 3 source collection** (Reddit, X, Discord) | Core function — automated Reddit and X search with engagement metrics |
| **Template 3: Quick Scan** (30-60 min, 3-5 trends) | `--emit=compact` mode provides fast topic scanning |
| **Template 4: Tracker Update** (weekly maintenance) | Watchlist mode with scheduled re-research |
| **Signal Strength dimension** (multi-platform presence) | Cross-platform search with normalized engagement data |
| **Timing dimension** (data recency) | Enforced 30-day window with recency scoring |

### Gaps Between the Two

| Claude_Trends Requirement | last30days Gap |
|---------------------------|----------------|
| **Tier 1 sources** (Google Trends, SEC filings, Gartner) | Not covered — skill focuses on social/community data |
| **Tier 2 sources** (TechCrunch, Bloomberg, trade press) | Partially covered via web search supplement |
| **Source tier classification** | No tier assignment — all results scored equally |
| **Confidence scoring** (4-dimension, 0-100) | Has its own scoring but doesn't map to the framework's dimensions |
| **Lifecycle stage identification** | Not addressed — reports raw signals, not lifecycle classification |
| **Regional analysis** | No geographic filtering or regional breakdown |
| **Portfolio management** (max 15 trends, kill/revival) | Watchlist tracks topics but doesn't enforce portfolio rules |

### Integration Feasibility

The `--emit=json` and `--emit=context` outputs make integration straightforward. A practical integration would:

1. Use `last30days` as the **Tier 3 data collection layer** for the Quick Scan and Tracker Update templates
2. Feed normalized JSON into a scoring adapter that maps engagement metrics to the framework's Signal Strength (Dimension B) and Timing (Dimension D) scores
3. Keep Tier 1 and Tier 2 source collection as manual or separate automated steps
4. Use the watchlist mode to maintain the framework's weekly tracker cadence

This would not replace the framework's methodology — it would automate the most time-consuming part of it (community signal discovery).

---

## 7. Recommendations

### For Immediate Use
- Install and test with a single topic relevant to your current trend portfolio
- Evaluate output quality against manually collected Tier 3 data for the same topic
- Measure whether the engagement metrics (upvotes, likes, views) correlate with your existing Signal Strength assessments

### For Integration
- Build a lightweight adapter that takes `--emit=json` output and maps it to the Claude_Trends confidence scoring schema (specifically Dimensions B and D)
- Add source tier tagging to last30days output (all its sources are Tier 3 by the framework's classification)
- Use the watchlist mode to automate Template 4 (Tracker Update) data collection on a weekly schedule

### Before Relying on It
- Test X search reliability across browsers and over multiple sessions to assess cookie auth stability
- Estimate API costs for your expected query volume
- Verify that the engagement-weighted scoring doesn't systematically bias toward viral-but-shallow content over substantive-but-lower-engagement discussions

---

## 8. Summary

`last30days` is a well-structured research automation tool that fills a specific gap in the Claude_Trends workflow: **automated Tier 3 source collection with engagement metrics**. Its architecture is modular, its output formats are composable, and its watchlist mode aligns with the framework's weekly cadence.

It does not replace the framework's methodology — it has no concept of confidence scoring, lifecycle stages, or portfolio management. It's a data collection engine, not an analytical framework. The two are complementary: `last30days` gathers the raw signals, and Claude_Trends provides the structure to evaluate them.

The main risks are API cost at scale, fragile X authentication, and the absence of source quality classification. These are manageable with proper testing and the recommended adapter layer.

**Bottom line:** Worth integrating as the Tier 3 data pipeline for the framework's Quick Scan and Tracker Update workflows. Not a substitute for the full methodology.
