# Template 6: Sector Correlation Analysis

**When to use:** Portfolio strategy, identifying macro themes, cross-sector investment thesis, pattern detection

---

## Prompt Template

```
SECTOR CORRELATION REQUEST

Using my [Trend Intelligence Methodology v1.0], analyze cross-sector patterns:

**Task:** Identify trends appearing across multiple sectors and explain connections

**Sectors to scan:** [Choose 3-5 from below]
- Consumer Tech
- B2B SaaS
- FinTech
- HealthTech
- EdTech
- E-commerce/DTC
- Climate Tech
- Web3/Crypto
- Creator Economy
- Supply Chain/Logistics
- Workplace Tools
- Media/Entertainment
- Real Estate Tech
- LegalTech
- GovTech
- FoodTech
- Mobility/Transportation

**Analysis Framework:**
1. Identify 3-5 "meta-trends" (themes appearing in multiple sectors with ≥60% confidence)
2. Map which sectors are leading vs. lagging for each meta-trend
3. Explain causal links (why is trend X in sector A driving trend Y in sector B?)
4. Forecast next sectors likely to be affected
5. Assess investment implications (where are the opportunities?)

**Data:**
- Use web_search for signals from past [60/90] days
- Look for patterns, not just isolated examples
- Aim for 3+ sector examples per meta-trend

**Output:**
- Summary table of meta-trends by sector
- 300-400 words per meta-trend
- Strategic implications section
- "Next Sectors to Watch" forecast

**Target length:** 1,500-2,000 words total
```

---

## Example Usage

```
SECTOR CORRELATION REQUEST

Using my [Trend Intelligence Methodology v1.0], analyze cross-sector patterns:

**Task:** Identify AI-related trends appearing across multiple sectors

**Sectors to scan:** B2B SaaS, HealthTech, EdTech, FinTech, LegalTech

**Analysis Framework:**
1. Identify 3-5 AI meta-trends appearing in these sectors
2. Map which sectors are leading vs. lagging
3. Explain causal links (why does adoption follow certain paths?)
4. Forecast which sectors will see these trends next
5. Investment implications

**Data:**
- Web search, past 90 days
- Focus on adoption patterns, not just product announcements
- Need 3+ sector examples per meta-trend

**Output:**
- Meta-trend summary table
- 400 words per meta-trend
- Strategic synthesis
- 6-month forecast of sector progression

**Special focus:** Understanding why certain sectors adopt AI patterns faster than others
```

---

## Expected Output Structure

### Meta-Trend Summary Table

| Meta-Trend | Sectors (Stage) | Leading Sector | Confidence | Key Pattern |
|------------|-----------------|----------------|------------|-------------|
| AI-native interfaces replacing traditional UIs | B2B SaaS (Acc), FinTech (Em), HealthTech (Em), LegalTech (Em) | B2B SaaS | 76% | SaaS → regulated sectors |
| Verticalization of horizontal platforms | B2B SaaS (Main), HealthTech (Acc), EdTech (Acc), LegalTech (Em) | B2B SaaS | 82% | Horizontal → vertical specialization |
| Async-first communication tools | Workplace Tools (Acc), EdTech (Em), HealthTech (Pre-em) | Workplace Tools | 71% | Work → education → healthcare |
| Community-as-moat business models | Creator Economy (Acc), DTC/Ecom (Acc), B2B SaaS (Em) | Creator Economy | 68% | Consumer → B2B |

---

### Meta-Trend 1: AI-Native Interfaces Replacing Traditional UIs

**Confidence:** 76% 🟡 | **Stage Range:** Emerging to Accelerating across sectors

#### What It Is
Software products redesigning core interfaces around conversational AI and agentic workflows, moving away from traditional forms, buttons, and menus. Users describe intent in natural language; AI interprets and executes complex multi-step workflows.

#### Cross-Sector Manifestations

**B2B SaaS (Accelerating, 78%)**
- **Examples:** Notion AI, Coda AI, Dust, Glean
- **Evidence:**
  - GitHub Copilot Workspace launch (Oct 2025) for natural-language project management
  - Notion reported 30% of users engage with AI features daily (The Information, Sept 2025)
  - 5 major SaaS companies announced AI-first redesigns Q3 2025 (TechCrunch)
- **Why leading:** Lowest regulatory barriers, tech-forward user base, strong margin incentive to reduce support costs

**FinTech (Emerging, 72%)**
- **Examples:** Mercury's AI accounting, Brex's AI expense categorization, robo-advisors with chat
- **Evidence:**
  - Mercury AI features in beta (company blog, Aug 2025)
  - Stripe announced AI-native dashboard (Stripe Sessions, Sept 2025)
  - 3 neo-banks added conversational interfaces for common tasks
- **Why lagging SaaS:** Regulatory approval processes, higher error cost (money vs. text), customer trust threshold

**HealthTech (Emerging, 65%)**
- **Examples:** Athenahealth AI charting, Health Gorilla's AI queries, patient intake tools
- **Evidence:**
  - Athenahealth pilot with 200+ practices (HIMSS coverage, Sept 2025)
  - 4 EHR vendors announced AI interface initiatives (Healthcare IT News, past 60 days)
  - FDA published draft guidance on AI-powered diagnostic interfaces (Aug 2025)
- **Why lagging both:** HIPAA compliance, clinical liability concerns, physician workflow entrenchment

**LegalTech (Emerging, 63%)**
- **Examples:** Harvey AI, CoCounsel (Thomson Reuters), contract AI tools
- **Evidence:**
  - Harvey raised $100M Series C (The Information, Sept 2025)
  - Thomson Reuters integrated CoCounsel across Westlaw (press release, Aug 2025)
  - 2 AmLaw 100 firms announced AI-first research tools for associates
- **Why similar to HealthTech:** Professional liability concerns, accuracy requirements, bar association scrutiny

#### Causal Links (Why This Progression?)

**SaaS leads because:**
1. Tech-forward user base willing to experiment
2. Low consequence of errors (can iterate quickly)
3. Strong economic incentive (reduce onboarding, support costs)
4. Easiest to measure adoption (usage metrics readily available)

**SaaS → FinTech transfer (12-18 month lag):**
- Once SaaS proved UX paradigm works, FinTech adopted with added safety rails
- Regulatory approval requires demonstrated safety record (borrowing from SaaS learnings)
- Customer trust built by successful SaaS implementations

**FinTech → Regulated sectors (HealthTech, LegalTech) (18-24 month lag):**
- Proof points in finance (high-stakes but not life-threatening) reduce perceived risk
- Regulatory frameworks for AI in finance provide templates for health/legal
- Professional users see peers in other sectors benefiting, demand internally

#### Next Sectors to Watch

**Within 6 months:**
- **EdTech (60% confidence):** Early signals of AI tutors with natural language interfaces, lower regulatory barriers than health/legal
- **Real Estate Tech (55% confidence):** Property search and mortgage processing candidates for AI-first interfaces

**Within 12 months:**
- **GovTech (50% confidence):** Citizen services (permit applications, benefit enrollment) could adopt, but procurement cycles slow
- **FoodTech (45% confidence):** Restaurant management software, but lower margin businesses = less investment capacity

#### Investment Implications

**High conviction:**
- Infrastructure plays serving all sectors (embedding models, safety/guardrail tooling)
- Vertical AI tools in FinTech/HealthTech (still early, but pattern validated)

**Medium conviction:**
- Horizontal platforms pivoting to AI-native (race against incumbents)
- Services layer (implementation, training) for regulated sectors

**Avoid:**
- Pure chatbot plays without workflow integration (commoditized)
- Sectors with strong entrenched UI patterns AND low economic incentive (manufacturing, logistics)

---

### Meta-Trend 2: Verticalization of Horizontal Platforms

**Confidence:** 82% 🟢 | **Stage Range:** Accelerating to Mainstream

#### What It Is
Horizontal SaaS platforms (CRM, project management, data tools) being replaced by industry-specific solutions built for particular verticals (dental, legal, construction). Vertical solutions win by embedding industry workflows, terminology, integrations, and compliance.

#### Cross-Sector Manifestations

**B2B SaaS (Mainstream, 85%)**
- **Examples:** Toast (restaurant POS), Procore (construction), Veeva (life sciences)
- **Evidence:**
  - ServiceTitan IPO filing (Oct 2025) - $500M+ ARR in home services vertical
  - Toast market cap $10B+ (public market validation of vertical approach)
  - Bessemer's "State of Cloud" report: 40% of new SaaS funding to vertical plays (Q3 2025)
- **Why leading:** Largest addressable market, most funding available, horizontal incumbents mature

**HealthTech (Accelerating, 79%)**
- **Examples:** Tebra (private practice), Elation Health (primary care), Headway (mental health billing)
- **Evidence:**
  - 6 specialty-specific EHR/practice mgmt startups raised Series B+ in 2025 (Rock Health data)
  - Legacy EHRs (Epic, Cerner) losing market share in SMB segment (KLAS report, Sept 2025)
  - Vertical-specific tools showing 30-50% higher NPS than horizontal (aggregate Gartner data)
- **Why accelerating:** HIPAA compliance + specialty workflows make horizontal solutions painful

**EdTech (Accelerating, 73%)**
- **Examples:** Brightwheel (childcare), Chalk (higher ed), Ampersand (K-12)
- **Evidence:**
  - Brightwheel raised $105M Series D (TechCrunch, Aug 2025)
  - 4 education-vertical LMS/admin platforms launched in 2025 (EdSurge coverage)
  - Google Classroom + Canvas losing share in childcare/specialty segments
- **Why accelerating:** Pandemic showed generic tools inadequate for education-specific needs

**LegalTech (Emerging, 68%)**
- **Examples:** Clio (law practice mgmt), LawPay (payments), specialty litigation tools
- **Evidence:**
  - Clio reported $200M+ ARR, 150K+ users (company disclosure, Sept 2025)
  - Thomson Reuters launching practice-area-specific suites (IP, family, tax)
  - 3 YC companies building vertical legal tools (YC demo day, Aug 2025)
- **Why earlier stage:** Smaller market, less funding, but clear trajectory

#### Causal Links

**Why B2B SaaS leads:**
- Horizontal SaaS matured first (Salesforce, ServiceNow, etc.)
- As horizontal markets saturated, startups sought differentiation via verticalization
- Vertical-first approach learned in B2B SaaS now template for other sectors

**Pattern transfer:**
1. **Horizontal solution emerges** (works for most use cases, wins early market)
2. **Power users in specific verticals** hit limitations (workflows, integrations, terminology)
3. **Vertical-specific entrant** builds purpose-built solution, wins these segments
4. **Vertical → platform:** Successful vertical plays expand to adjacent verticals (Toast: restaurants → retail)

**Why pattern spreading to other sectors:**
- Playbook proven: venture capital now funds vertical plays aggressively
- Cloud infrastructure (AWS, Stripe, Twilio) makes vertical software faster to build
- End users (dentists, lawyers, teachers) now expect consumer-grade, tailored UX

#### Next Sectors to Watch

**Within 6 months:**
- **Supply Chain/Logistics (70% confidence):** Vertical logistics for specific industries (pharma, food) replacing generic WMS
- **Real Estate Tech (65% confidence):** Commercial vs. residential vs. property management tools diverging

**Within 12 months:**
- **GovTech (60% confidence):** Agency-specific tools (DMV, permitting, tax) vs. generic case management
- **Climate Tech (55% confidence):** Vertical carbon accounting for specific industries (fashion, food, construction)

#### Investment Implications

**High conviction:**
- Vertical SaaS in large, underserved markets (home services, field services, healthcare specialties)
- Platform/infrastructure enabling vertical software (embeddable compliance, payments, data)

**Medium conviction:**
- Vertical plays in smaller TAM industries (still can be great businesses, but harder to reach scale)
- Horizontal-to-vertical pivots (if early enough, but incumbents struggling)

**Avoid:**
- Late-stage horizontal plays without vertical strategy (margin compression risk)
- Verticals with insufficient TAM to support standalone software ($50M+ TAM minimum)

---

### [Meta-Trend 3, 4, etc. would follow same structure]

---

### Strategic Synthesis

#### Cross-Cutting Themes

**Theme 1: "Consumer-grade UX" spreading to B2B and regulated sectors**
- Pattern: Consumer tech innovations (mobile-first, AI interfaces, community features) adopted by prosumer tools first, then B2B SaaS, then regulated sectors (health, legal, finance) with 12-24 month lags
- Implication: To predict next B2B trend, look at consumer tech 18-24 months ago

**Theme 2: Unbundling and re-bundling cycles**
- Verticalization is an unbundling (specific > general)
- But within verticals, seeing re-bundling (multiple point solutions → unified vertical suite)
- Implication: Opportunity in "operating system for [vertical]" plays

**Theme 3: AI as horizontal technology, but vertical implementation**
- AI is the technical enabler (infrastructure layer)
- But value captured at application layer, customized per vertical
- Implication: Commoditized AI infrastructure, defensible vertical AI applications

#### Sector Leading/Lagging Indicators

**Leading indicators (trends appear here first):**
1. **Consumer Tech** (especially social/mobile): Earliest signals, lowest barriers
2. **B2B SaaS** (especially PLG tools): Early adopter tech workers, fast iteration
3. **Creator Economy**: Experimentation culture, community-driven

**Middle indicators:**
4. **FinTech**: Regulated but innovation-friendly, tech-forward users
5. **EdTech**: Schools/teachers willing to try new approaches post-pandemic
6. **E-commerce/DTC**: Competitive pressure drives innovation adoption

**Lagging indicators (last to adopt, but validate mainstream status):**
7. **HealthTech**: High regulatory barriers, but large TAM when trends arrive
8. **LegalTech**: Conservative profession, slow sales cycles
9. **GovTech**: Procurement complexity, long sales cycles, but massive scale

**Pattern:** Consumer/SaaS signals today → FinTech/EdTech in 6-12mo → Regulated sectors in 18-24mo

#### Investment Framework

**When evaluating a trend in any sector, ask:**
1. **Has this pattern appeared in leading sectors?** (If yes, higher confidence it will spread)
2. **What's the lag time for this sector?** (Use sector lag framework above)
3. **What sector-specific barriers exist?** (Regulatory, buyer psychology, economics)
4. **Who's best positioned to execute?** (Incumbents vs. startups vs. new entrants)

**Portfolio construction implications:**
- **Early-stage:** Focus on leading sectors (Consumer, SaaS) for high-risk/high-reward
- **Growth-stage:** Focus on middle sectors (FinTech, EdTech) where patterns are validating
- **Late-stage:** Lagging sectors (HealthTech, LegalTech, GovTech) offer lower risk, proven patterns

---

### 6-Month Sector Watch List

| Sector | Trend to Watch | Current Stage | Confidence | Check Back |
|--------|----------------|---------------|------------|------------|
| Supply Chain | AI-native warehouse mgmt | Emerging | 68% | Jan 2026 |
| Real Estate Tech | Vertical PropTech by asset class | Emerging | 71% | Dec 2025 |
| EdTech | AI tutors for test prep | Accelerating | 75% | Nov 2025 |
| GovTech | Citizen service AI chatbots | Pre-emerging | 52% | Feb 2026 |
| FoodTech | AI menu optimization | Emerging | 63% | Jan 2026 |

---

## Output Quality Checklist

- [ ] 3-5 meta-trends identified with ≥60% confidence
- [ ] Each meta-trend has examples from 3+ sectors
- [ ] Causal links explain progression (not just description)
- [ ] Leading/lagging sector analysis included
- [ ] "Next sectors" forecast with timing and confidence
- [ ] Investment implications specific and actionable
- [ ] Strategic synthesis connects meta-trends to themes

---

## Customization Options

### Quick Pattern Detection
```
SECTOR CORRELATION REQUEST

Quick scan: What patterns are emerging across B2B SaaS, FinTech, and HealthTech?

Output:
- 2-3 meta-trends (one paragraph each)
- Which sector leads
- One-line implication

Target: 500 words
```

### Deep Single-Pattern Analysis
```
SECTOR CORRELATION REQUEST

Deep dive: Analyze the "AI co-pilot" pattern across sectors

Sectors: B2B SaaS, HealthTech, LegalTech, FinTech, EdTech (all)

Analysis:
- Detailed stage in each sector
- Why this pattern spreading
- Technical/regulatory/economic barriers by sector
- 12-month forecast
- Investment opportunities

Target: 1,500-2,000 words
```

### Portfolio Strategy Brief
```
SECTOR CORRELATION REQUEST

For a venture fund, analyze:
- Top 3 cross-sector trends
- Which sectors offer best entry points NOW
- Which sectors to wait on (and for how long)
- Specific company archetypes to seek

Output: Investment memo format
Target: 1,000 words
```
