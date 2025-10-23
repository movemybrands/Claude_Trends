# CONFIDENCE SCORING CHEAT SHEET

Quick reference for calculating trend confidence scores (0-100 scale)

---

## THE 4 DIMENSIONS

Calculate each dimension (0-100), then average and round to nearest integer.

**Formula:** `(A + B + C + D) / 4 = Final Score`

---

## DIMENSION A: Source Quality (0-100 points)

| Sources | Points | When to Use |
|---------|--------|-------------|
| 3+ Tier-1 sources | 100 | High-confidence calls only |
| 2 Tier-1 OR 4+ Tier-2 | 80 | Strong signals with solid backing |
| 1 Tier-1 OR 3 Tier-2 | 60 | Medium confidence, good foundation |
| Mostly Tier-3 but corroborated (2+ sources) | 40 | Early exploration, weak signals |
| Single source or uncorroborated | 20 | Track only, don't act |

**Pro tips:**
- Mix matters: 1 Tier-1 + 2 Tier-2 = **70 pts** (interpolate)
- Independence matters: Same data repackaged ≠ multiple sources
- Recency matters: Tier-1 from 6+ months ago → downgrade to Tier-2 value

**Source Tier Quick Check:**
- **Tier 1:** Google Trends, SEC filings, Gartner, BLS, academic papers, official data
- **Tier 2:** TechCrunch, Bloomberg, Morning Brew, Axios (with citations)
- **Tier 3:** Reddit (>100 upvotes), Twitter threads, Discord mentions, preprints

---

## DIMENSION B: Signal Strength (0-100 points)

**Build score additively (max 100):**

| Element | Points | Validation Check |
|---------|--------|------------------|
| Quantitative metrics available | +40 | Search volume, sales rank, engagement counts, revenue data |
| Multi-platform presence | +30 | Visible on 3+ platforms (social, news, commerce, communities) |
| Geographic spread | +20 | Evidence in 2+ regions with independent sources |
| Persistence over time | +10 | 3+ data points over time (days/weeks depending on trend velocity) |

**Quick examples:**
- Google Trends data: **+40** (quantitative)
- Trending on Reddit + TikTok + Twitter: **+30** (3 platforms)
- Mentioned in US and UK sources: **+20** (2 regions)
- Data from 3 consecutive weeks: **+10** (persistence)
- **Total example:** 40+30+20+10 = **100 points**

**Common scenarios:**
- Just social media buzz, no metrics: **30 pts** (platforms only)
- Metrics + one platform: **40 pts**
- Metrics + multi-platform + one region: **70 pts**
- Full signals across all dimensions: **100 pts**

---

## DIMENSION C: Coherence (0-100 points)

**Build score additively (max 100):**

| Element | Points | Test Question |
|---------|--------|---------------|
| Clear narrative | +40 | Can you explain why now, who cares, what changed? |
| Identified catalyst | +30 | Can you point to a specific unlock moment? |
| Monetization pathway visible | +20 | Can you describe how someone makes money? |
| No major conflicting data | +10 | Do all sources tell consistent story? |

**Narrative quality check:**
- ✓ Explainable to a smart 12-year-old: **+40**
- ✓ Specific trigger event identifiable: **+30**
- ✓ Clear business model or revenue path: **+20**
- ✓ Sources align without contradiction: **+10**

**Red flags (deductions):**
- Vague buzzwords without specifics: **-10**
- Conflicting data not reconciled: **-10**
- Circular reasoning (trend exists because people talk about it): **-20**

**Common scenarios:**
- Good story, no business model: **70 pts** (40+30+0+10, missing monetization)
- Great narrative, unclear why now: **60 pts** (40+0+20+10, missing catalyst)
- All elements but minor conflicts: **90 pts** (40+30+20+0)

---

## DIMENSION D: Timing (0-100 points)

| Data Age | Points | Use Case |
|----------|--------|----------|
| <48 hours | 100 | Real-time signal, act fast |
| 2-7 days | 80 | Very recent, high relevance |
| 1-4 weeks | 60 | Recent enough for action |
| 1-3 months | 40 | Aging, needs refresh |
| >3 months | 20 | Stale, historical only |

**Special adjustments:**

**Slow-moving trends (B2B SaaS adoption, regulatory changes):**
- Add +20 pts per band
- Example: 1-3 months old = **60 pts** (40 + 20)

**Fast-moving trends (viral social content, consumer fads):**
- Subtract -20 pts per band
- Example: 2-7 days old = **60 pts** (80 - 20)

**Historical trends with recent validation:**
- Use the date of recent validation, not original date
- Example: 2020 trend with Oct 2025 confirmation = score based on Oct 2025

---

## FINAL CONFIDENCE SCORE

**Formula:** `(A + B + C + D) / 4`, rounded to nearest integer

---

## ACTION THRESHOLDS

| Score Range | Color | Signal Type | Action |
|-------------|-------|-------------|--------|
| 80-100 | 🟢 Green | High confidence | **ACT**: Invest, build, allocate resources, commit team |
| 60-79 | 🟡 Yellow | Medium confidence | **TEST**: Pilot, small bet, define exit criteria, monitor closely |
| 0-59 | 🔴 Red | Low confidence | **WATCH**: Track for updates, no resource commitment |

**Hard rules:**
- ❌ Never assign 80%+ without ≥2 Tier-1 sources
- ✓ Exception: Single source is primary research you conducted
- 🟡 Yellow (60-79) must have clear upgrade criteria: "If X happens in Y timeframe → green"
- 🔴 Red (<60) is fine for weak signal exploration, but label as such

---

## WORKED EXAMPLE

**Trend:** AI-powered code review tools in enterprise

### Dimension Scores:

**A. Source Quality: 80 pts**
- 2 Tier-1 sources: GitHub's research paper + Gartner report
- Formula: 2 Tier-1 = 80 pts

**B. Signal Strength: 70 pts**
- Quantitative: GitHub usage metrics (+40)
- Multi-platform: GitHub, Twitter, Reddit (+30)
- Geographic: Only NA (0)
- Persistence: 3 weeks of data (+10)
- Formula: 40+30+0+10 = **70 pts** (capped at 100)

**C. Coherence: 80 pts**
- Clear narrative: Why now (AI maturity), who cares (dev teams), what changed (ChatGPT moment) (+40)
- Catalyst: ChatGPT launch Nov 2022 (+30)
- Monetization: Subscription SaaS model, $20-50/user/mo (+20)
- Conflicts: None (-0)
- Formula: 40+30+20+10 = **100**, but note minor issues = **80 pts**

**D. Timing: 80 pts**
- Data from 5 days ago
- Standard trend (not fast/slow)
- Formula: 2-7 days = **80 pts**

### Final Calculation:
```
(A + B + C + D) / 4
= (80 + 70 + 80 + 80) / 4
= 310 / 4
= 77.5
≈ 78% (round to nearest integer)
```

**Result: 78% 🟡 YELLOW → TEST**

**Action:** Run pilot with defined success metrics and 90-day evaluation period

---

## FAST CALCULATION METHOD

**For speed, use this shortcut:**

1. **Quick tier check:** How many Tier-1 sources?
   - 0 → A=40 or less
   - 1 → A=60
   - 2 → A=80
   - 3+ → A=100

2. **Quick signal check:** What do you have?
   - Just buzz → B=30
   - Metrics → B=40-70
   - Full signals → B=80-100

3. **Quick coherence check:**
   - Can you explain it? → C=70+
   - Confused? → C=50 or less

4. **Quick timing check:**
   - This week → D=80-100
   - This month → D=60
   - Older → D=40 or less

5. **Average and round**

**Most trends fall into these ranges:**
- **50-60%:** Weak signals, early exploration
- **60-70%:** Moderate confidence, worth monitoring
- **70-80%:** Strong signals, test worthy
- **80%+:** High confidence, act

---

## COMMON MISTAKES TO AVOID

❌ **Over-weighting narrative without data**
- Good story ≠ high confidence
- Need quantitative signals (Dimension B)

❌ **Counting same source multiple times**
- TechCrunch citing Bloomberg = 1 source (Bloomberg)
- Original reporting only

❌ **Ignoring data age**
- 6-month-old Tier-1 source ≠ current Tier-1
- Always check dates

❌ **Assigning 80%+ too easily**
- Requires ≥2 Tier-1 sources (hard rule)
- High bar intentional

❌ **Not interpolating mixed sources**
- 1 Tier-1 + 2 Tier-2 = 70, not 60
- Use judgment to interpolate

---

## CALIBRATION TIPS

**Monthly check:** Are your scores predictive?
- Track: How many 80%+ trends actually accelerated?
- Target: ≥60% hit rate for high-confidence calls
- If under 60%: You're over-confident → tighten scoring
- If over 80%: You're under-confident → can be more aggressive

**Comparison check:** Score the same trend twice
- Wait 1 week between attempts
- Scores should be within ±5 points
- If not: Refine your rubric understanding

**Peer check:** Have another analyst score
- Compare scores
- Discuss discrepancies
- Build shared calibration

---

## SCORE TRANSLATION

**What each range means:**

**90-100% 🟢:** Near-certain, multiple Tier-1 sources, full signals, act immediately
**80-89% 🟢:** High confidence, validated across dimensions, commit resources
**70-79% 🟡:** Good signals but gaps remain, test with clear success criteria
**60-69% 🟡:** Moderate confidence, monitor closely, small bet OK
**50-59% 🔴:** Weak signals, track only, too early for action
**<50% 🔴:** Very weak, archive or wait for better data

---

## QUICK REFERENCE SUMMARY

| Score | Action | Typical Profile |
|-------|--------|-----------------|
| 80+ | ACT | 2+ Tier-1, metrics, multi-platform, clear story, recent data |
| 60-79 | TEST | 1 Tier-1 or 3 Tier-2, some metrics, coherent narrative |
| <60 | WATCH | Tier-3 or single source, limited data, weak signals |

**Remember:** Confidence scores measure evidence strength, not outcome certainty. Even 80%+ trends can fail. Use scores to size bets, not guarantee outcomes.
