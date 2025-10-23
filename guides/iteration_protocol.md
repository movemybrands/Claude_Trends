# FRAMEWORK ITERATION PROTOCOL

How to systematically improve the Trend Intelligence Framework over time

---

## PHILOSOPHY

**The framework should evolve based on evidence, not hunches.**

- Track what works and what doesn't
- Adjust scoring weights based on predictive accuracy
- Refine definitions based on observed patterns
- Document all changes for future reference

**Core principle:** Make the framework more accurate and useful over time through disciplined iteration.

---

## MONTHLY REVIEW PROCESS

### Schedule: First Monday of Each Month (1-2 hours)

**Objective:** Assess framework performance and identify improvement opportunities

---

### STEP 1: Predictive Accuracy Check (30 minutes)

**Question:** Are your confidence scores predictive of actual outcomes?

**Data to collect:**

1. **Review trends from 30-60 days ago**
   - Which trends scored 70%+ confidence?
   - Which actually accelerated/grew as predicted?
   - Which stalled or declined?

2. **Calculate hit rates by confidence band:**

   | Confidence Band | Total Calls | Correct | Hit Rate | Target |
   |-----------------|-------------|---------|----------|--------|
   | 80-100% | ___ | ___ | ___% | ≥60% |
   | 70-79% | ___ | ___ | ___% | ≥50% |
   | 60-69% | ___ | ___ | ___% | ≥40% |
   | <60% | ___ | ___ | ___% | Baseline |

3. **Identify patterns:**
   - Are you systematically over-confident? (Hit rates below targets)
   - Are you systematically under-confident? (Hit rates well above targets, e.g., 80%+ for 70-79% band)
   - Are certain types of trends consistently mispredicted?

**Action items:**
- [ ] If over-confident: Tighten scoring (demand more Tier-1 sources, add penalties)
- [ ] If under-confident: Can be more aggressive (but be cautious, under-confidence safer than over)
- [ ] If specific trend types fail: Add specific criteria for those trends

---

### STEP 2: Source Quality Audit (20 minutes)

**Question:** Which sources have been most predictive?

**Data to collect:**

1. **List all sources cited in past 30 days**
2. **For each source, track:**
   - How many times cited?
   - How many led to correct trend calls?
   - How many led to false positives?
   - How early did they signal trends? (leading indicator test)

**Example tracking:**

| Source | Times Cited | Correct Calls | False Positives | Hit Rate | Lead Time (days) |
|--------|-------------|---------------|-----------------|----------|------------------|
| Gartner | 8 | 7 | 1 | 87.5% | 60 |
| TechCrunch | 15 | 9 | 6 | 60% | 30 |
| Reddit r/technology | 6 | 2 | 4 | 33% | 90 |

**Action items:**
- [ ] **Promote sources:** Hit rate >70% and used ≥5 times → consider tier upgrade
- [ ] **Demote sources:** Hit rate <40% → consider tier downgrade or remove
- [ ] **Leading indicators:** Sources with high lead time + high hit rate → prioritize

**Example actions:**
- TechCrunch (60% hit rate) → Keep as Tier 2
- Reddit (33% hit rate) → Downgrade to "use only with corroboration"
- Gartner (87% hit rate) → Validate as strong Tier 1

---

### STEP 3: Stage Definition Validation (20 minutes)

**Question:** Are trends moving through lifecycle stages as expected?

**Data to collect:**

1. **Review all stage changes in past 30 days**
   - Which trends moved stages?
   - Did they progress forward (Emerging → Accelerating) or regress?
   - How long did they stay in each stage?

2. **Compare to framework expectations:**

   | Stage | Expected Duration | Actual Average | Variance |
   |-------|-------------------|----------------|----------|
   | Emerging | 6-18 months | ___ months | +/- ___ |
   | Accelerating | 12-24 months | ___ months | +/- ___ |
   | Mainstream | 12-36 months | ___ months | +/- ___ |

3. **Identify mismatches:**
   - Are you assigning stages too early? (Trends regressing)
   - Are you assigning stages too late? (Trends jumping stages)
   - Are stage definitions clear enough? (Uncertainty in assignments)

**Action items:**
- [ ] Refine stage indicators (add more specific thresholds)
- [ ] Adjust stage duration expectations if systematic variance
- [ ] Add vertical-specific stage definitions if needed (B2B slower than consumer)

---

### STEP 4: Scoring Dimension Analysis (30 minutes)

**Question:** Are the 4 confidence dimensions weighted correctly?

**Data to collect:**

1. **For past month's trends, analyze dimension scores:**

   | Dimension | Avg Score | Range | Correlation with Outcome |
   |-----------|-----------|-------|--------------------------|
   | A: Source Quality | ___ | ___-___ | High / Med / Low |
   | B: Signal Strength | ___ | ___-___ | High / Med / Low |
   | C: Coherence | ___ | ___-___ | High / Med / Low |
   | D: Timing | ___ | ___-___ | High / Med / Low |

2. **Identify patterns:**
   - Which dimension correlates most with success? (Should it get more weight?)
   - Which dimension is least predictive? (Should it get less weight?)
   - Are you consistently scoring one dimension too high/low?

**Example findings:**
- "Coherence (C) scores average 80, but only 50% hit rate when high coherence alone"
  → Action: Stop over-weighting narrative, demand more data (Dimension B)

- "Source Quality (A) shows 85% correlation with outcome, Signal Strength (B) only 60%"
  → Action: Consider weighting A more heavily in final calculation

**Action items:**
- [ ] If considering weight changes: Document rationale, test for 30 days
- [ ] Adjust scoring rubrics for consistently mis-scored dimensions
- [ ] Add penalties or bonuses for specific patterns

**Warning:** Don't change weights based on one month. Look for consistent patterns over 2-3 months.

---

### STEP 5: Portfolio Composition Review (10 minutes)

**Question:** Is your tracker balanced and focused?

**Current state:**

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Total active trends | ___ | 10-15 | ✅ / ⚠️ / ❌ |
| Green (80%+) | ___ | 3-5 | ✅ / ⚠️ / ❌ |
| Yellow (60-79%) | ___ | 5-8 | ✅ / ⚠️ / ❌ |
| Red (<60%) | ___ | 2-4 | ✅ / ⚠️ / ❌ |
| Average confidence | ___% | 65-75% | ✅ / ⚠️ / ❌ |
| Emerging stage | ___ | 3-5 | ✅ / ⚠️ / ❌ |
| Accelerating stage | ___ | 4-6 | ✅ / ⚠️ / ❌ |
| Mainstream+ stage | ___ | 2-4 | ✅ / ⚠️ / ❌ |

**Action items:**
- [ ] Too many trends (>15): Archive lowest-confidence or stale trends
- [ ] Too few trends (<10): Run quick scan to find new trends
- [ ] Portfolio skewed: Rebalance by stage/confidence/region
- [ ] Average confidence drifting: Recalibrate scoring

---

## QUARTERLY BACKTEST PROTOCOL

### Schedule: Week 1 of Q1, Q2, Q3, Q4 (3-4 hours)

**Objective:** Deep retrospective on framework performance and major iteration decisions

---

### PART 1: 90-Day Retrospective (90 minutes)

**1. Pull all trends from 90 days ago**
   - What confidence scores did they have?
   - What stages were they in?
   - What predictions did you make?

**2. Evaluate current status**
   - Which trends are now mainstream/growing? (Predictions correct)
   - Which trends stalled or died? (Predictions wrong)
   - Which trends you missed entirely? (False negatives)

**3. Calculate comprehensive hit rates**

   | Original Confidence | Count | Correct | Incorrect | Hit Rate |
   |---------------------|-------|---------|-----------|----------|
   | 90-100% | ___ | ___ | ___ | ___% |
   | 80-89% | ___ | ___ | ___ | ___% |
   | 70-79% | ___ | ___ | ___ | ___% |
   | 60-69% | ___ | ___ | ___ | ___% |
   | 50-59% | ___ | ___ | ___ | ___% |
   | **Overall** | ___ | ___ | ___ | ___% |

**4. Calculate false negative rate**
   - Survey: What trends became mainstream that you didn't track?
   - Why did you miss them? (Wrong sources? Wrong verticals? Scoring too conservative?)
   - Estimate: ___ major trends missed / ___ total trends = ___% miss rate

**5. Document key findings:**
   - What type of trends do you predict well?
   - What type of trends do you miss or mispredictconsistently?
   - Are there systematic biases in your analysis?

---

### PART 2: Framework Effectiveness Assessment (60 minutes)

**Question:** Is the framework providing value relative to effort?

**Quantitative assessment:**

1. **Time investment:**
   - Hours/week spent on framework: ___
   - Total hours in quarter: ___

2. **Outputs generated:**
   - Standard reports: ___
   - Deep dives: ___
   - Tracker updates: ___
   - Other analyses: ___

3. **Decisions informed:**
   - Strategic decisions influenced by framework: ___
   - Resource allocations: $ ___
   - Estimated value created: $ ___

4. **ROI calculation:**
   - Value created (estimated): $ ___
   - Time cost (hours × hourly rate): $ ___
   - ROI: ___% (value/cost - 1)

**Qualitative assessment:**

- [ ] Has the framework improved decision quality? (Y/N, how?)
- [ ] Has it identified trends earlier than ad-hoc methods? (Examples)
- [ ] Has it prevented false positives/bad bets? (Examples)
- [ ] Is it sustainable long-term? (Process burden reasonable?)

**Decision point:**
- ✅ Continue with framework (ROI positive, sustainable)
- ⚠️ Continue but iterate significantly (value there but process needs work)
- ❌ Pause or discontinue (not providing value relative to effort)

---

### PART 3: Version Upgrade Decision (60 minutes)

**Question:** Should we upgrade to a new framework version?

**Criteria for version upgrade:**

**Upgrade to v1.1 (minor) if:**
- [ ] 2-3 scoring adjustments needed
- [ ] Source tier classifications updated
- [ ] Stage definitions refined
- [ ] Specific vertical customizations documented

**Upgrade to v2.0 (major) if:**
- [ ] Fundamental scoring methodology changing (e.g., weighting dimensions differently)
- [ ] Adding/removing core dimensions
- [ ] Completely new stage model
- [ ] Structural framework changes

**Process for upgrade:**

1. **Document all proposed changes:**
   - What's changing and why?
   - What evidence supports the change?
   - What's the expected improvement?

2. **Create changelog entry:**
   ```
   ## v1.1 (YYYY-MM-DD)

   ### Changed
   - [Specific change]: [Rationale]
   - [Specific change]: [Rationale]

   ### Reason for Update
   [1-2 paragraphs on why upgrade needed]

   ### Affected Templates
   - Template X: [What needs updating]
   ```

3. **Update master methodology document:**
   - Save current version: `Methodology_v1.0_ARCHIVED.md`
   - Create new version: `Methodology_v1.1.md`
   - Update version number and date in header

4. **Update all templates:**
   - Change references from v1.0 to v1.1
   - Update any template text affected by changes
   - Test run at least 2 templates with new version

5. **Announce and train:**
   - If team is using framework, communicate changes
   - Provide training on what's different
   - Set adoption date (grace period for transition)

---

### PART 4: Future Roadmap (30 minutes)

**Question:** What should we improve next quarter?

**Identify top 3 priorities:**

1. **Priority 1:** [Issue or opportunity]
   - Current state: [Problem description]
   - Desired state: [What improvement looks like]
   - Action: [Specific next steps]
   - Timeline: [When to implement]

2. **Priority 2:** [Issue or opportunity]
   - [Same structure]

3. **Priority 3:** [Issue or opportunity]
   - [Same structure]

**Potential improvement areas:**
- Scoring accuracy (reduce over/under-confidence)
- Source coverage (add regions, verticals, or source types)
- Process efficiency (reduce time spent)
- Output quality (better reports)
- Integration (better tools, automation)
- Team adoption (training, dashboards)

---

## VERSION CONTROL BEST PRACTICES

### Naming Convention

**Methodology files:**
- `Trend_Intelligence_Methodology_v1.0.md`
- `Trend_Intelligence_Methodology_v1.1.md`
- `Trend_Intelligence_Methodology_v2.0.md`

**Templates:**
- `Template_01_Standard_Report_v1.0.md`
- Updated templates should reference current methodology version

**Outputs:**
- `Report_2025-10-23_v1.0.md` (includes version framework used)
- Allows retrospective analysis of which framework version produced output

### Changelog Maintenance

**Keep a master changelog:** `CHANGELOG.md`

```markdown
# Trend Intelligence Framework - Changelog

## v1.1 (2025-11-15)

### Changed
- Source Quality dimension: Now requires 3 Tier-1 sources for 100 pts (was 2)
- Reason: Systematic over-confidence with only 2 sources

- Stage definitions: Added B2B-specific timing adjustments
- Reason: B2B trends move 50% slower than consumer, needed explicit guidance

### Added
- Regional diffusion timing database
- Quick reference card for common mistakes

### Affected Templates
- All templates updated to reference v1.1
- Template 5 (Regional Comparison) enhanced with timing database

---

## v1.0 (2025-10-23)

### Added
- Initial framework release
- 3-tier source system
- 0-100 confidence scoring (4 dimensions)
- 5-stage lifecycle model
- 7 prompt templates
- 3 quick reference cards
```

### Archive Policy

**Keep all old versions accessible:**
- Archive folder: `framework/archive/`
- Never delete old versions (may need to reference)
- Include reason for archival in filename:
  - `Methodology_v1.0_ARCHIVED_2025-11-15.md`

**When to reference old versions:**
- Explaining why old reports had different scores
- Understanding evolution of framework thinking
- Training new users (show progression)

---

## CUSTOMIZATION BRANCHES

**When to create specialized versions:**

### Vertical-Specific Branches

**Example:** HealthTech-focused version

**Why:** Healthcare has unique characteristics:
- Longer sales cycles (adjust Timing dimension scoring)
- Regulatory requirements (add FDA/EMA approval as source tier)
- Clinical evidence standards (higher bar for Tier-1)

**How:**
- Create: `Methodology_v1.0_HealthTech.md`
- Document: What's different from core framework and why
- Maintain: Update when core framework updates

### Role-Specific Branches

**Example:** Operator version vs. Investor version

**Operator version:**
- Focus on execution feasibility
- Add "Build Complexity" dimension
- Emphasize competitive positioning

**Investor version:**
- Focus on market timing and returns
- Add "Exit Landscape" dimension
- Emphasize capital efficiency

### Time-Horizon Branches

**Example:** Ultra-early detection (0-5% awareness)

**Changes:**
- Lower confidence thresholds (50% = actionable)
- Heavier weight on Tier-3 sources (they lead)
- Different stage definitions (pre-emerging stage)

### Branch Naming

`Methodology_v[Version]_[Specialization].md`

Examples:
- `Methodology_v1.0_HealthTech.md`
- `Methodology_v1.0_Operator.md`
- `Methodology_v1.0_UltraEarly.md`
- `Methodology_v1.1_B2BSaaS.md`

---

## A/B TESTING YOUR FRAMEWORK

**When uncertain about a change, test it systematically:**

### Setup

1. **Define hypothesis:**
   - Old approach: [Current method]
   - New approach: [Proposed method]
   - Prediction: [How will new approach perform better?]

2. **Select test case:**
   - Choose 5-10 trends to analyze
   - Mix of stages and confidence levels
   - Preferably trends you can validate soon (Emerging/Accelerating)

### Execution

3. **Run parallel analyses:**
   - Analyze same trends with v1.0 (old method)
   - Analyze same trends with v1.1 (new method)
   - Document both results

4. **Compare outputs:**
   - Confidence scores: Do they differ? By how much?
   - Stage assignments: Different?
   - Recommendations: Would you take different actions?

### Validation

5. **Wait for outcomes:**
   - Set validation date (30/60/90 days)
   - Track actual trend progression
   - Compare: Which framework version was more accurate?

6. **Adopt winner:**
   - If v1.1 more accurate: Adopt new version
   - If v1.0 more accurate: Keep old version, discard proposed change
   - If tie: Default to simpler approach

### Example A/B Test

**Hypothesis:** "Adding a 5th dimension for 'Market Readiness' will improve accuracy for B2B SaaS trends"

**Test:**
- Analyze 10 B2B SaaS trends from Q3 2025
- Score with 4-dimension model (v1.0)
- Score with 5-dimension model (v1.1 test)
- Compare confidence scores and predictions

**Results (Q4 2025):**
- v1.0 hit rate: 60% (6/10 correct)
- v1.1 hit rate: 70% (7/10 correct)
- Decision: Adopt 5-dimension model for B2B branch

---

## RED FLAGS: WHEN NOT TO ITERATE

**Don't change the framework if:**

❌ **Based on small sample size**
- Need ≥10 data points before concluding a pattern
- One bad call doesn't mean framework is broken

❌ **Based on recency bias**
- Last month's results ≠ systematic issue
- Look for patterns over 2-3 months minimum

❌ **Chasing perfection**
- 60%+ hit rate on 70%+ confidence is good (not 100%)
- Over-optimization leads to overfitting

❌ **Making it too complex**
- More dimensions/rules ≠ better accuracy
- Simplicity is a feature, not a bug

❌ **Not testing changes**
- Don't adopt major changes without validation
- A/B test or pilot first

❌ **Too frequent changes**
- Iterating monthly = unable to measure impact
- Quarterly or semi-annual iterations better

---

## FRAMEWORK MATURITY STAGES

### Stage 1: Learning (Months 1-3)
- Expect inconsistency and mistakes
- Focus on understanding framework, not perfecting it
- Minor tweaks OK, no major changes yet

### Stage 2: Calibrating (Months 4-6)
- Enough data to identify patterns
- First meaningful iterations (v1.1 likely)
- Confidence scoring stabilizing

### Stage 3: Optimizing (Months 7-12)
- Framework feels natural
- Scoring instinctive
- Changes more refinement than overhaul

### Stage 4: Mastery (Year 2+)
- Framework adapted to your context
- High predictive accuracy
- Teaching others

**Don't expect mastery in Month 1.** Allow time for framework to prove itself before major changes.

---

## DOCUMENTATION REQUIREMENTS

**For every framework change, document:**

1. **What changed:** Specific rule or scoring adjustment
2. **Why:** Evidence that motivated change
3. **Expected impact:** How will this improve accuracy?
4. **Date:** When change implemented
5. **Results:** After 30-60 days, did it work?

**Example:**

```markdown
## Change Log Entry

**Change:** Source Quality dimension now requires 3 Tier-1 sources for 100 pts (was 2)

**Rationale:**
- Sept-Oct 2025: 5 trends scored 80%+ with 2 Tier-1 sources
- Only 2 of 5 actually accelerated (40% hit rate)
- Analysis: 2 sources not sufficient for high confidence

**Expected Impact:**
- Fewer trends scoring 80%+ (expect 20-30% reduction)
- Higher hit rate for remaining 80%+ trends (target 70%+)

**Implemented:** 2025-11-01

**Results (to be filled 2025-12-01):**
- Actual reduction in 80%+ trends: ___%
- New hit rate for 80%+ trends: ___%
- Conclusion: [Success / Partial / Revert]
```

---

## REMEMBER

✅ **Iterate based on evidence, not intuition**
✅ **Test changes before full adoption**
✅ **Document everything**
✅ **Allow time for changes to prove themselves**
✅ **Simpler is usually better**

❌ **Don't change too frequently**
❌ **Don't over-optimize on small samples**
❌ **Don't add complexity without clear benefit**

**The goal:** Gradually improve accuracy and usefulness while maintaining simplicity and usability.
