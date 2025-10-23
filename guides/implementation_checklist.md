# IMPLEMENTATION CHECKLIST

Step-by-step guide to deploying the Trend Intelligence Framework

---

## OVERVIEW

This checklist guides you through setting up and operationalizing the Trend Intelligence Framework over your first 90 days.

**Timeline:**
- **Week 1:** Setup and configuration
- **Weeks 2-4:** Initial population and calibration
- **Month 2:** Establish operational rhythm
- **Month 3:** Optimization and expansion

---

## WEEK 1: SETUP (Days 1-7)

### Day 1: Documentation Setup

**Task:** Organize your framework files

- [ ] Create a dedicated workspace (Google Drive folder, Notion workspace, or local directory)
- [ ] Save master framework document: `Trend_Intelligence_Methodology_v1.0.md`
- [ ] Save all 7 prompt templates in a `templates/` subfolder
- [ ] Save all 3 quick reference cards in a `quick_reference/` subfolder
- [ ] Save this implementation checklist
- [ ] Create a `reports/` folder for output storage
- [ ] Create a `tracker/` folder for ongoing monitoring

**Estimated time:** 30 minutes

---

### Day 2: Define Your Scope

**Task:** Customize framework for your needs

- [ ] **Select primary verticals** (choose 3-5):
  - [ ] Consumer Tech
  - [ ] B2B SaaS
  - [ ] FinTech
  - [ ] HealthTech
  - [ ] EdTech
  - [ ] E-commerce/DTC
  - [ ] Climate Tech
  - [ ] Web3/Crypto
  - [ ] Creator Economy
  - [ ] Supply Chain/Logistics
  - [ ] Workplace Tools
  - [ ] Media/Entertainment
  - [ ] Other: ________________

- [ ] **Select primary regions** (choose 1-3):
  - [ ] North America
  - [ ] Europe (specify: UK, Continental, or both)
  - [ ] APAC (specify: China, India, SE Asia, or region-wide)
  - [ ] LATAM
  - [ ] MEA

- [ ] **Define your use case:**
  - [ ] Investor (VC, PE, public markets)
  - [ ] Operator (startup founder, product team)
  - [ ] Corporate strategist
  - [ ] Analyst/researcher
  - [ ] Other: ________________

- [ ] **Set review cadence:**
  - [ ] Weekly tracker updates: Day of week: _________
  - [ ] Monthly deep reviews: Date each month: _________
  - [ ] Quarterly backtesting: Months: _________

**Estimated time:** 45 minutes

---

### Day 3: Tracker Setup

**Task:** Create your trend tracking system

**Option A: Spreadsheet (Google Sheets, Excel)**

- [ ] Create new spreadsheet: "Trend Intelligence Tracker"
- [ ] Create columns:
  - Trend Name
  - Added Date
  - Current Confidence (%)
  - Previous Confidence (%)
  - Δ (Change)
  - Stage (Emerging/Accelerating/Mainstream/Mature/Declining)
  - Regions
  - Status (🟢 Active / 🟡 Watch / 🔴 Archive)
  - Last Updated
  - Next Check Date
  - Notes
  - Link to Full Analysis

**Option B: Airtable**

- [ ] Create new base: "Trend Intelligence"
- [ ] Create table: "Active Trends"
- [ ] Set up fields (same as spreadsheet above)
- [ ] Add views:
  - All Active Trends
  - High Confidence (≥70%)
  - Needs Update (Last Updated >14 days ago)
  - By Stage
  - By Region
- [ ] Set up filters and sorts

**Option C: Notion**

- [ ] Create new database: "Trend Tracker"
- [ ] Set up properties (same as above)
- [ ] Create views: Board (by Stage), Table (all), Calendar (by Next Check Date)

- [ ] **Add Archive section** (separate sheet/table/database)
- [ ] **Add Weak Signals section** (for trends <50% confidence)

**Estimated time:** 1 hour

---

### Day 4: Source Library Setup

**Task:** Build your go-to source list

- [ ] Create document: "Trusted Sources by Tier"
- [ ] **Tier 1 sources for your verticals:**
  - List 5-10 Tier-1 sources you'll check regularly
  - Include: Links, RSS feeds, update frequency

- [ ] **Tier 2 sources:**
  - List 10-15 Tier-2 sources
  - Include: Authors to follow, newsletters to subscribe

- [ ] **Tier 3 sources:**
  - List communities, subreddits, Discord servers
  - Include: Membership/access requirements

- [ ] **Set up monitoring:**
  - [ ] Subscribe to key newsletters
  - [ ] Follow key Twitter/X accounts
  - [ ] Join relevant Discord/Slack communities
  - [ ] Set up Google Alerts for key terms (optional)
  - [ ] Bookmark key sites

**Estimated time:** 1.5 hours

---

### Day 5: Initial Prompt Customization

**Task:** Tailor templates to your context

- [ ] Open `templates/01_standard_report.md`
- [ ] Customize the example with your verticals and use case
- [ ] Save as: "My_Standard_Report_Template.md"

- [ ] Open `templates/04_tracker_update.md`
- [ ] Customize update frequency and criteria for your rhythm
- [ ] Save as: "My_Tracker_Update_Template.md"

- [ ] Test run: Use your customized template to generate a quick scan
  - [ ] Run Template 3 (Quick Scan) with your verticals
  - [ ] Review output quality
  - [ ] Note any adjustments needed

**Estimated time:** 1 hour

---

### Day 6: Calibration Exercise

**Task:** Practice confidence scoring

- [ ] Select 3 well-known trends (current or historical)
  - Example 1: [Trend everyone knows about in your vertical]
  - Example 2: [Another known trend]
  - Example 3: [Third known trend]

- [ ] For each, manually calculate confidence score:
  - [ ] Dimension A (Source Quality)
  - [ ] Dimension B (Signal Strength)
  - [ ] Dimension C (Coherence)
  - [ ] Dimension D (Timing)
  - [ ] Final Score = (A+B+C+D)/4

- [ ] Compare your scores to outcomes (did high-confidence trends actually happen?)
- [ ] Adjust your mental model if needed

**Estimated time:** 1.5 hours

---

### Day 7: Week 1 Review

**Task:** Consolidate and prepare

- [ ] Review all setup work
- [ ] Test access to all tools (tracker, templates, sources)
- [ ] Set calendar reminders:
  - [ ] Weekly: Tracker update (Day: _____)
  - [ ] Monthly: Deep review (Date: _____)
  - [ ] Quarterly: Backtest (Months: _____)

- [ ] Prepare for Week 2: Initial trend population
- [ ] Optional: Share framework with team/stakeholders

**Estimated time:** 30 minutes

---

## WEEKS 2-4: INITIAL POPULATION (Days 8-28)

### Week 2: First Report

**Task:** Generate your first comprehensive report

- [ ] **Day 8:** Run Template 1 (Standard Report)
  - Use your customized verticals and regions
  - Target: 5-7 trends
  - Save output: `reports/Report_2025-10-23_Initial.md`

- [ ] **Day 9-10:** Review and validate
  - Check all confidence calculations
  - Verify source citations and dates
  - Ensure stage assignments match criteria
  - Note: Any output quality issues to address

- [ ] **Day 11:** Add trends to tracker
  - Populate tracker with 5-7 trends from report
  - Set "Next Check Date" for 7 days out
  - Add links to full analysis

- [ ] **Day 12-14:** Deep dive on top trend
  - Select highest-confidence trend
  - Run Template 2 (Deep Dive)
  - Save output: `reports/DeepDive_[TrendName]_2025-10-23.md`

**Estimated time:** 6-8 hours across week

---

### Week 3: Expand Coverage

**Task:** Build out your trend portfolio

- [ ] **Day 15:** Run Template 3 (Quick Scan)
  - Same verticals, past 30 days
  - Target: Find 3-5 additional trends
  - Add to tracker if ≥50% confidence

- [ ] **Day 16-17:** Diversify portfolio
  - Check stage distribution (aim for 2-3 per stage)
  - Check region coverage (at least 2 regions represented)
  - Run additional Quick Scans for underrepresented areas

- [ ] **Day 18:** First tracker update
  - Run Template 4 (Tracker Update)
  - Update confidence scores where new data available
  - Note: How long did this take? (Aim for <30 min)

- [ ] **Day 19-21:** Quality check
  - Review all tracker entries
  - Ensure consistency in scoring
  - Identify any low-quality entries to remove

**Estimated time:** 5-6 hours across week

---

### Week 4: Refine and Calibrate

**Task:** Adjust based on learnings

- [ ] **Day 22-23:** Source quality audit
  - Which sources appeared most in your reports?
  - Which sources were most useful?
  - Add/remove sources from your library

- [ ] **Day 24-25:** Scoring calibration
  - Review all confidence scores assigned
  - Are you consistently over/under-confident?
  - Do scores match your intuition about trend strength?
  - Adjust mental model if needed

- [ ] **Day 26:** Framework customization
  - Any framework rules to adjust for your context?
  - Document customizations: `My_Framework_Adaptations.md`
  - Examples: Different timing weights for B2B vs. consumer

- [ ] **Day 27:** Second tracker update
  - Run Template 4 again
  - Compare to Day 18 update
  - Note: Any trends moving significantly?

- [ ] **Day 28:** Month 1 review
  - Portfolio composition: ___ Green, ___ Yellow, ___ Red
  - Total trends tracked: ___
  - Average confidence: ___%
  - Time spent/week: ___ hours
  - Satisfaction with process: ___/10

**Estimated time:** 4-5 hours across week

---

## MONTH 2: OPERATIONAL RHYTHM (Days 29-56)

### Goal: Establish sustainable routine

**Weekly routine (repeat 4 times):**

**Monday (30 min):**
- [ ] Run Template 4 (Tracker Update)
- [ ] Review movers (top gainers/decliners)
- [ ] Make kill/archive decisions
- [ ] Flag trends for deep dive

**Wednesday (1-2 hours, bi-weekly):**
- [ ] Week 1: Run Template 1 (Standard Report) for one vertical
- [ ] Week 3: Run Template 3 (Quick Scan) for new trends
- [ ] Alternate between full reports and quick scans

**Friday (30 min):**
- [ ] Quick review of week's findings
- [ ] Add any weak signals to tracker
- [ ] Plan next week's deep dive

**End of Month 2 checklist:**

- [ ] Portfolio size: Target 10-15 active trends
- [ ] Confidence distribution: 3-5 Green, 5-8 Yellow, 2-4 Red
- [ ] Stage diversity: At least 3 different stages represented
- [ ] Weekly time commitment: ≤3 hours sustainable
- [ ] First "kill" signal: Did you archive any dead trends?
- [ ] First "revival": Did any low-confidence trends improve?

**Review questions:**
- What's working well?
- What's taking too long?
- What would you change?
- Is the framework adding value to your decisions?

**Estimated time:** 8-12 hours across month

---

## MONTH 3: OPTIMIZATION (Days 57-90)

### Goal: Refine system and expand capabilities

**Week 9-10: Advanced Templates**

- [ ] Run Template 5 (Regional Comparison)
  - Choose one trend with multi-region signals
  - Analyze regional diffusion patterns
  - Save insights for future regional forecasting

- [ ] Run Template 6 (Sector Correlation)
  - Analyze patterns across your verticals
  - Identify meta-trends
  - Document cross-sector insights

- [ ] Run Template 7 (Contrarian Analysis)
  - Choose one mainstream belief in your space
  - Build contrarian case
  - Practice intellectual honesty and steel-manning

**Week 11: Quality Assurance**

- [ ] **Backtest past calls:**
  - Review trends from Week 2 (60 days ago)
  - Which high-confidence trends panned out?
  - Which didn't? Why?
  - Calculate hit rate: (Correct calls / Total high-conf calls)
  - Target: ≥60% hit rate for 70%+ confidence trends

- [ ] **Source audit:**
  - Which sources had highest hit rate?
  - Promote/demote sources in tier system
  - Document in your Source Library

- [ ] **Scoring review:**
  - Are you over/under-confident systematically?
  - Adjust scoring approach if needed
  - Document: "Scoring Adjustments Log"

**Week 12: Framework v1.1 (Optional)**

- [ ] **Review customizations:**
  - What framework rules did you change?
  - What worked better than original?
  - What didn't work?

- [ ] **Decide: Upgrade to v1.1?**
  - If you have ≥3 substantive changes
  - Document in: `Trend_Intelligence_Methodology_v1.1.md`
  - Update changelog
  - Update templates to reference v1.1

- [ ] **90-day retrospective:**
  - Total trends tracked: ___
  - Successful calls: ___
  - Failed calls: ___
  - Hit rate: ___%
  - Time commitment stabilized at: ___ hours/week
  - ROI assessment: ___ (value created vs. time invested)

---

## MONTH 4+: SUSTAINED OPERATIONS

### Ongoing Weekly Routine

**Monday (30 min):**
- [ ] Tracker update (Template 4)
- [ ] Review movers
- [ ] Kill/archive decisions

**Wednesday (1 hour, weekly or bi-weekly):**
- [ ] Rotating focus:
  - Week 1: Standard Report (Template 1) - one vertical
  - Week 2: Quick Scan (Template 3) - new trends
  - Week 3: Deep Dive (Template 2) - top opportunity
  - Week 4: Advanced template (5/6/7) - strategic analysis

**Friday (15 min):**
- [ ] Weekly synthesis
- [ ] Update stakeholders (if applicable)

### Monthly Deep Dive (First Monday of month)

- [ ] **Stage progression analysis:**
  - How many trends moved stages?
  - Are progressions matching expectations?

- [ ] **Confidence calibration:**
  - Hit rate check for past 30 days
  - Over/under-confidence patterns?

- [ ] **Source quality audit:**
  - Most useful sources this month?
  - Any to add/remove?

- [ ] **Portfolio rebalancing:**
  - Current: ___ Green, ___ Yellow, ___ Red
  - Target: 3-5 Green, 5-8 Yellow, 2-4 Red
  - Add/remove to rebalance

### Quarterly Backtest (First week of quarter)

- [ ] Review trends from 90 days ago
- [ ] Calculate hit rates by confidence band
- [ ] Identify systematic errors
- [ ] Consider framework upgrades
- [ ] Update methodology if needed

---

## SUCCESS METRICS

### Process Metrics (How well are you executing?)

- **Consistency:** Did you complete weekly updates ≥80% of weeks?
- **Portfolio health:** 10-15 active trends maintained?
- **Time efficiency:** Weekly commitment ≤3 hours?
- **Coverage:** All primary verticals represented?

### Outcome Metrics (Is the framework working?)

- **Hit rate:** ≥60% accuracy for 70%+ confidence trends?
- **Early detection:** Identified trends ≥6 months before mainstream?
- **Decision support:** Informed ≥3 strategic decisions with framework?
- **Value creation:** Estimated $ impact of decisions informed by framework?

### Quality Metrics (Is the analysis rigorous?)

- **Source quality:** ≥50% of citations from Tier-1 sources?
- **Documentation:** All confidence scores have calculation notes?
- **Falsifiability:** Predictions include specific validation criteria?
- **Intellectual honesty:** Archived dead trends and documented misses?

---

## TROUBLESHOOTING

### "I'm spending too much time on this (>5 hours/week)"

**Solutions:**
- Use Template 3 (Quick Scan) instead of Template 1 for weekly work
- Reduce tracker size to 10 trends max
- Focus on depth (fewer trends) vs. breadth (many trends)
- Automate data collection (set up Google Alerts, RSS feeds)

### "I'm not finding good trends in my verticals"

**Solutions:**
- Expand source list (add more Tier-2 and Tier-3 sources)
- Lower confidence threshold temporarily (50% vs. 60%) for exploration
- Use Template 6 (Sector Correlation) to find trends crossing into your vertical
- Look at adjacent verticals for spillover

### "My confidence scores are all wrong (trends I scored high failed)"

**Solutions:**
- You're likely over-weighting narrative (Dimension C) vs. data (Dimension B)
- Tighten Source Quality requirements (demand more Tier-1)
- Add penalty for lack of quantitative metrics
- Review: Are you confusing "exciting story" with "strong signal"?

### "I can't tell what stage trends are in"

**Solutions:**
- Use Google Trends as primary stage indicator
- Check product availability (how many SKUs?)
- Survey friends/colleagues: "Have you heard of X?" (rough awareness check)
- Compare to known trends: "Is this like [known trend] in 2020 or 2023?"

### "The framework feels rigid and I want to customize"

**Solutions:**
- Good! Customize it. The framework is a starting point, not dogma.
- Document customizations in: `My_Framework_v1.1.md`
- Test customizations for 30 days before fully adopting
- Share learnings back to the community

---

## NEXT STEPS AFTER 90 DAYS

**If framework is working well:**
- [ ] Train team members on framework
- [ ] Create internal dashboard for stakeholders
- [ ] Expand to additional verticals
- [ ] Consider automation (scripts to pull data)
- [ ] Contribute improvements back to community

**If framework needs work:**
- [ ] Review this checklist - did you skip steps?
- [ ] Identify specific pain points
- [ ] Seek feedback from peers using framework
- [ ] Consider simplifying (reduce complexity)
- [ ] Give it another 30 days with adjustments

**If framework isn't providing value:**
- [ ] Honest assessment: Is trend intelligence useful for your work?
- [ ] Perhaps your needs are different (real-time signals vs. strategic trends?)
- [ ] Consider alternative approaches (qual research, user interviews, etc.)
- [ ] Archive framework as reference, don't force it

---

## GRADUATION CRITERIA

**You're successfully using the framework when:**

✅ You maintain a tracker with 10-15 active trends consistently
✅ You update the tracker weekly without reminders
✅ Your confidence scores are predictive (≥60% hit rate on 70%+ calls)
✅ You've made ≥3 decisions informed by framework insights
✅ You can complete weekly routine in ≤3 hours
✅ You've identified ≥1 trend ≥6 months before mainstream awareness
✅ You've killed ≥2 trends (demonstrating discipline to archive dead signals)
✅ You've revised ≥1 trend upward based on new data (showing update discipline)

**Congratulations!** You now have a systematic approach to trend intelligence. The framework should feel like a natural part of your workflow, not a burden.

---

## RESOURCES

**Framework files:**
- Master Methodology: `framework/Trend_Intelligence_Methodology_v1.0.md`
- Templates: `templates/` (all 7 templates)
- Quick References: `quick_reference/` (all 3 cards)

**Community:**
- [Link to GitHub discussions, if applicable]
- [Link to Discord/Slack, if applicable]
- [Link to example reports, if applicable]

**Need help?**
- Review FAQ: [Link if exists]
- Post question: [Community link]
- Share feedback: [Feedback mechanism]

---

**Remember:** The framework is a tool to enhance judgment, not replace it. Stay curious, intellectually honest, and always skeptical of your own analysis. Good luck!
