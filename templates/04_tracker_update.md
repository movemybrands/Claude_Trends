# Template 4: Tracker Update

**When to use:** Weekly portfolio maintenance, ongoing monitoring, confidence score refresh

---

## Prompt Template

```
TRACKER UPDATE REQUEST

Using my [Trend Intelligence Methodology v1.0], update the following trends:

[Paste your current tracker table or list]

**Update instructions:**
1. Recalculate confidence scores if new data available (past [7/14] days)
2. Check for kill signals (see framework for criteria)
3. Flag stage changes (has any trend moved to new lifecycle stage?)
4. Identify top 3 movers (confidence gainers/losers with ≥5 point change)
5. Suggest 1-2 new trends to add (if any meet [50/60]% threshold in this vertical)

**Method:**
- Use web_search for each trend
- Note: "No significant updates" if no new data found (that's fine!)
- Only update confidence if there's genuinely new information
- Include Δ 7d column (change from last week)

**Output:**
- Updated tracker table with new scores
- "Movers" section (top gainers/decliners)
- "Actions" section (any kill/stage change/add recommendations)
- 2-3 sentence executive summary

**Data timeframe:** Past [7/14] days only (don't re-analyze old data)
```

---

## Example Usage

```
TRACKER UPDATE REQUEST

Using my [Trend Intelligence Methodology v1.0], update the following trends:

| Trend | Added | Current Conf | Stage | Regions | Last Check |
|-------|-------|--------------|-------|---------|------------|
| AI code review tools | 2025-10-01 | 78% | Accelerating | NA, EU | 2025-10-16 |
| No-code API builders | 2025-09-15 | 65% | Emerging | NA | 2025-10-16 |
| Vertical SaaS for dental | 2025-10-10 | 72% | Accelerating | NA | 2025-10-16 |
| Voice-first CRM | 2025-10-05 | 58% | Emerging | NA | 2025-10-16 |
| Async video collaboration | 2025-09-20 | 68% | Accelerating | NA, EU, APAC | 2025-10-16 |

**Update instructions:**
1. Recalculate confidence scores if new data available (past 7 days)
2. Check for kill signals
3. Flag stage changes
4. Identify top 3 movers
5. Suggest 1-2 new B2B SaaS trends to add (if any meet 60% threshold)

**Method:**
- Use web_search for each trend
- Past 7 days only
- Include Δ 7d column

**Output:** Updated table + movers + actions + brief summary

**Today's date:** October 23, 2025
```

---

## Expected Output Structure

### Updated Tracker Table

| Trend | Added | Prev Conf | New Conf | Δ 7d | Stage | Regions | Status | Notes |
|-------|-------|-----------|----------|------|-------|---------|--------|-------|
| AI code review tools | 2025-10-01 | 78% | 82% | +4 | Accelerating | NA, EU | 🟢 Active | GitHub Copilot Workspace launch |
| No-code API builders | 2025-09-15 | 65% | 63% | -2 | Emerging | NA | 🟡 Active | Minor decline, no new data |
| Vertical SaaS for dental | 2025-10-10 | 72% | 68% | -4 | Accelerating | NA | 🟡 Active | Conflicting adoption data |
| Voice-first CRM | 2025-10-05 | 58% | 55% | -3 | Emerging | NA | 🔴 Watch | Below threshold, consider kill |
| Async video collaboration | 2025-09-20 | 68% | 75% | +7 | Accelerating | NA, EU, APAC | 🟢 Active | Loom acquisition rumors, Zoom feature launch |

---

### Top Movers (≥5 point change)

**Gainers:**
1. **Async video collaboration**: 68% → 75% (+7)
   - **Why:** Loom acquisition rumors ($500M+ range per The Information 10/20), Zoom launched async video feature (10/19), Reddit r/SaaS thread with 400+ upvotes on async tools
   - **Action:** Upgraded to Green; consider deep dive on market consolidation

**Decliners:**
(None with ≥5 point decline this week)

**Notable:** Voice-first CRM down -3 but now at 55%, below 60% threshold for 2nd consecutive week

---

### Actions Recommended

**🔴 Kill Candidates:**
- **Voice-first CRM**: Below 60% for 2 consecutive weeks, no new data found, consider archiving with 90-day revival check

**🟢 Stage Changes:**
(None this week)

**➕ New Additions to Consider:**
1. **AI-powered sprint planning tools**: Preliminary confidence ~67%, Accelerating, NA
   - Evidence: Linear's new AI feature (10/21), Height.app Series A ($20M, 10/18), 3 separate SaaS Twitter threads
   - Recommendation: Add to tracker next week if confidence holds

2. **Compliance automation for EU AI Act**: Preliminary confidence ~63%, Emerging, EU primary
   - Evidence: Multiple startups announced (2 this week), regulatory deadline approaching (2026), early enterprise interest
   - Recommendation: Monitor for another week before adding (EU-specific may be out of scope)

---

### Executive Summary

**Portfolio health:** 5 active trends, avg confidence 69% (down from 70% last week). One trend (async video) had significant positive movement on M&A activity and feature launches by majors. Voice-first CRM approaching kill threshold - recommend archive unless new data emerges next week. Strong new signal in AI sprint planning space worth adding.

**Key insight:** Big tech (GitHub, Zoom) launching features in tracked trends = validation but also commoditization risk. Consider pivoting from "tool" trends to "application" trends.

**Next week focus:** Deep dive on async video (market consolidation implications), decision on Voice-first CRM, validate AI sprint planning signal.

---

## Output Quality Checklist

- [ ] All confidence changes have justification (new data cited)
- [ ] Δ 7d column shows change from last week
- [ ] Any trend with ≥5 point move is in Top Movers section
- [ ] Kill candidates identified if below threshold for 2+ weeks
- [ ] New trend suggestions include preliminary confidence estimate
- [ ] "No significant updates" noted for trends with no new data (that's OK!)
- [ ] Executive summary is actionable (not just descriptive)

---

## Tracker Maintenance Best Practices

### Weekly Review Protocol

**Monday morning routine (15-20 minutes):**
1. Copy last week's tracker table
2. Paste into update template prompt
3. Run update
4. Review movers and actions
5. Make kill/add decisions
6. Update master tracker file

**What to update:**
- ✓ Confidence scores (if new data from past 7 days)
- ✓ Stage (if clear progression)
- ✓ Regions (if expansion detected)
- ✓ Status (Active → Watch → Kill)
- ✓ Notes (key developments)

**What NOT to change:**
- ✗ Don't recalculate from scratch every week (only update if new info)
- ✗ Don't change Added date
- ✗ Don't remove trends (move to Archive section instead)

### Monthly Deep Review

**In addition to weekly updates, do this monthly:**
1. **Stage Progression Analysis**
   - How many trends moved stages this month?
   - Are stage progressions matching expected timelines?
   - Any surprises (faster/slower than expected)?

2. **Confidence Calibration**
   - Review trends from 3 months ago: Did high-confidence trends pan out?
   - Calculate hit rate: (Trends ≥70% that accelerated) / (All trends ≥70%)
   - Target: ≥60% accuracy for 70%+ confidence trends

3. **Source Quality Audit**
   - Which sources appeared most often in updates?
   - Which sources were most predictive?
   - Any sources to promote/demote in tier system?

4. **Portfolio Rebalancing**
   - Current distribution: [X] Green, [Y] Yellow, [Z] Red
   - Target distribution: 3-5 Green, 5-8 Yellow, 2-4 Red
   - Adjust if too heavy in any category

### Kill Decision Framework

**Automatic kill if ANY of these:**
- Below 50% confidence for 3+ consecutive weeks
- Confidence dropped ≥20 points in 30 days with no recovery signs
- Failed to find new data on 4+ consecutive update attempts
- Strong negative catalyst (regulatory ban, major player exit, better substitute)

**Consider kill if:**
- Below 60% for 2+ consecutive weeks AND no clear path to recovery
- Stage regressed (e.g., Accelerating → Emerging without new data)
- Only 1 region and no expansion in 60+ days

**Kill process:**
1. Move to "Archived Trends" section in tracker
2. Note: Kill date, kill reason, final confidence score
3. Set 90-day calendar reminder to check for revival signals
4. Don't delete the data (may need for retrospective analysis)

### Revival Decision Framework

**Consider revival if:**
- Confidence recovers ≥15 points from trough in <60 days
- New Tier-1 source emerges with fresh primary data
- Expansion to new region or demographic segment
- Paradigm shift: new use case, unexpected catalyst, regulatory change

**Revival process:**
1. Recalculate confidence from scratch (don't carry forward old score)
2. Add "Revival Catalyst" note explaining what changed
3. Reset to current date as new "Added" date (or note "Revived from [date]")
4. Treat as new trend for hit rate tracking

---

## Integration with Other Templates

**Weekly workflow:**
1. **Monday**: Run Tracker Update (Template 4)
2. **Tuesday**: If any trend moved to 75%+, consider Deep Dive (Template 2)
3. **Wednesday**: Run Quick Scan (Template 3) for new trends in your verticals
4. **Thursday**: Add any Quick Scan trends that meet threshold to tracker
5. **Friday**: Review top movers and plan next week's deep dive

**Monthly workflow:**
1. **Week 1**: Standard tracker update
2. **Week 2**: Tracker update + monthly deep review
3. **Week 3**: Standard tracker update
4. **Week 4**: Tracker update + full Standard Report (Template 1) for stakeholders

---

## Customization Options

### Minimal Update (5-minute version)
```
TRACKER UPDATE REQUEST

Update these trends from my tracker:
[List just trend names]

For each, answer only:
1. Any significant new data? (Yes/No/Source)
2. Confidence change? (If yes, new score)
3. Kill signal? (Yes/No)

Output: Simple table with just changes noted, skip "no updates"
```

### Detailed Update (30-minute version)
```
TRACKER UPDATE REQUEST

Full update with:
- Confidence recalculation for ALL trends (show dimension scores)
- Stage progression analysis (where is each in lifecycle)
- Competitive landscape updates (new players, funding, exits)
- Regional expansion tracking (any new geographies)
- Validation points (are our predictions from 30/60/90 days ago holding?)

Output: Extended format with full analysis per trend
```

### Thematic Update (focus on one question)
```
TRACKER UPDATE REQUEST

Review my tracker and answer: "Which trends are showing early signs of mainstream adoption?"

For trends showing this signal:
- Evidence of mainstream movement
- Confidence impact
- Timing estimate (when will hit mainstream stage)

Skip trends with no mainstream signals.
```
