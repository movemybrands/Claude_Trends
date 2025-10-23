# Template 3: Quick Scan (High-Level Only)

**When to use:** Weekly scanning, opportunity pipeline, fast decision-making, rapid triage

---

## Prompt Template

```
QUICK SCAN REQUEST

Using the confidence scoring system from my [Trend Intelligence Methodology v1.0]:

**Task:** Identify [3-5] emerging trends in [vertical/region] that meet these criteria:
- Confidence score: ≥[50/60/70]% ([Red/Yellow/Green] or higher)
- Stage: [Emerging / Accelerating / specific focus]
- Time window: Last [7/14/30] days

**Output format:**
For each trend, provide:
- Name + 1-sentence description
- Confidence score (just the final number, skip detailed dimension breakdown)
- Stage
- Top 3 evidence points (with source citations)
- One-line action recommendation

**Target length:** 150-200 words per trend (brief version)

**Data:** Web search, past [X] days

**Priority:** Speed over depth - focus on signal detection, not exhaustive analysis
```

---

## Example Usage

```
QUICK SCAN REQUEST

Using the confidence scoring system from my [Trend Intelligence Methodology v1.0]:

**Task:** Identify 5 emerging trends in Consumer Tech and Creator Economy that meet these criteria:
- Confidence score: ≥60% (Yellow or Green)
- Stage: Emerging or Accelerating only
- Time window: Last 30 days

**Output format:**
For each trend, provide:
- Name + 1-sentence description
- Confidence score (just the final number)
- Stage
- Top 3 evidence points (with sources and dates)
- One-line action recommendation

**Target length:** 150 words per trend

**Data:** Web search, past 30 days

**Priority:** I need this for a Friday morning team meeting - prioritize finding signals over perfecting analysis
```

---

## Expected Output Structure

### Trend 1: [Trend Name]
**Description:** [One sentence describing what this is and why it matters]

**Confidence:** 72% 🟡 | **Stage:** Accelerating | **Region:** NA

**Evidence:**
1. [Specific data point] from [Source, Date]
2. [Specific data point] from [Source, Date]
3. [Specific data point] from [Source, Date]

**Action:** [One-line recommendation: "Monitor for 30 days" OR "Run small test with $X budget" OR "Deep dive before acting"]

---

### Trend 2: [Trend Name]
[Same format repeated]

---

## Output Quality Checklist

Quick quality check (lower bar than full reports):
- [ ] Each trend has 3 specific evidence points
- [ ] All evidence includes source and date
- [ ] Confidence scores are plausible (not all 80%+)
- [ ] Action recommendations match confidence level
- [ ] Total output is scannable in <5 minutes

---

## Customization Options

### Ultra-Fast Version (1-2 minutes per trend)
```
QUICK SCAN REQUEST

Using my [Trend Intelligence Methodology v1.0]:

**Task:** Identify 3-5 trends in [vertical] from past 7 days

**Output format per trend:**
- Name
- 1-sentence description
- Confidence score
- Top signal (single best evidence point)
- Action (Watch/Test/Act)

**Target:** 50-75 words per trend
```

### Threshold Filter Version
```
QUICK SCAN REQUEST

Using my [Trend Intelligence Methodology v1.0]:

**Task:** Scan [vertical/region] and return ONLY trends meeting ALL criteria:
- Confidence ≥75% (Green or high Yellow)
- Stage: Emerging or Accelerating
- At least 1 Tier-1 source
- Multi-platform presence (2+ platforms)
- Past 14 days

**Output:** If 0 trends meet criteria, say so. If 1-5 meet criteria, return standard quick scan format.

**Purpose:** High-signal filter for action-ready opportunities only
```

### Comparative Scan Version
```
QUICK SCAN REQUEST

Using my [Trend Intelligence Methodology v1.0]:

**Task:** Compare these 5 specific trends and rank by confidence:
1. [Trend A]
2. [Trend B]
3. [Trend C]
4. [Trend D]
5. [Trend E]

**Output format:**
Ranked list with:
- Confidence score
- Stage
- One sentence on why ranked here
- Top supporting evidence point

**Purpose:** Prioritize which trends to deep-dive from a watchlist
```

### Regional Opportunity Scan
```
QUICK SCAN REQUEST

Using my [Trend Intelligence Methodology v1.0]:

**Task:** Identify trends that are:
- Mature in NA (70%+ awareness)
- Emerging in EU (<20% awareness)
- Time lag of 6-12 months

**Purpose:** Find proven NA concepts ready for EU market entry

**Output format:**
- Trend name
- NA stage and confidence
- EU stage and confidence
- Time lag estimate
- One-line opportunity description
```

### Sector Rotation Scan
```
QUICK SCAN REQUEST

Using my [Trend Intelligence Methodology v1.0]:

**Task:** Find trends showing up in [Sector A] that previously appeared in [Sector B]

**Example:** "Find trends in FinTech that previously showed up in Consumer Social"

**Output format:**
- Trend name
- How it manifested in Sector B (brief)
- How it's showing up in Sector A now
- Confidence that this is real pattern transfer
- Time lag between sectors

**Purpose:** Cross-sector pattern detection for early signals
```

---

## Best Practices for Quick Scans

### Do's:
✓ Use for weekly routine monitoring
✓ Set consistent criteria (same threshold each week)
✓ Track hit rate (which quick scans turned into real trends?)
✓ Combine with tracker updates (quick scan for new, tracker for existing)
✓ Accept lower confidence threshold (50-60% is fine for exploration)

### Don'ts:
✗ Don't make major resource commitments based on quick scans alone
✗ Don't skip source citations just because it's quick
✗ Don't use for high-stakes decisions (use deep dive instead)
✗ Don't let "quick" mean "sloppy" - still apply framework rigor
✗ Don't scan without clear criteria (you'll get unfocused results)

---

## Integration with Full System

**Weekly workflow:**
1. Monday morning: Run quick scan for past 7 days
2. Flag 1-2 trends for deeper analysis
3. Wednesday: Run deep dive on top flagged trend
4. Friday: Update tracker with any new quick-scan trends that meet threshold

**Decision tree:**
- Quick Scan shows trend ≥70% confidence → Add to tracker, consider deep dive
- Quick Scan shows trend 60-69% confidence → Monitor for another week
- Quick Scan shows trend <60% confidence → Note in "Weak Signals" section only

**Quality control:**
- Monthly: Review quick scan hit rate (how many became actionable?)
- Adjust confidence threshold if too many false positives/negatives
- Refine criteria if getting irrelevant results
