---
title: "Databricks Data + AI Summit 2026: The Lakehouse Becomes the Agentic Control Plane"
date: 2026-06-25
updated: 2026-06-26
excerpt: "A technical deep dive into Databricks Data + AI Summit 2026: Genie One, Unity AI Gateway, Lakeflow, LTAP, Lakebase, and Lakewatch, and what each announcement means for data and AI engineers."
tags: [databricks, dais-2026, data-engineering, ai-agents, lakehouse, unity-catalog]
author: Brian Castelino
authorUrl: https://www.linkedin.com/in/cas7elino/
faq:
  - question: "When and where was Databricks Data + AI Summit 2026?"
    answer: "Databricks Data + AI Summit 2026 (DAIS 2026) ran from June 15 to 18, 2026 at the Moscone Center in San Francisco, with more than 30,000 in-person attendees and tens of thousands joining virtually from over 150 countries."
  - question: "What is Genie One?"
    answer: "Genie One is Databricks' agentic AI coworker that goes beyond chat to create docs, dashboards, and workflows on governed data. It runs on web, iOS, Android, Slack, Teams, and as an MCP app, and uses usage-based pricing instead of per-seat licensing."
  - question: "What is LTAP (Lake Transactional/Analytical Processing)?"
    answer: "LTAP is a Databricks architecture that unifies transactional (OLTP) and analytical (OLAP) data on a single copy of data in the lake. It writes operational data directly into Delta or Iceberg tables with Postgres semantics, removing the need for CDC and ETL pipelines between systems."
  - question: "What is Lakebase?"
    answer: "Lakebase is Databricks' serverless Postgres database built on object storage. It adds cross-cloud disaster recovery, git-style branching, and autonomous operations, and serves as the transactional foundation for LTAP."
  - question: "How does Databricks compare to Snowflake and Microsoft Fabric after DAIS 2026?"
    answer: "Databricks positioned the lakehouse as a single governed plane for data, AI, apps, and security. Against Snowflake it stressed open formats and LTAP, and against Microsoft Fabric it emphasized zero-copy federation and importing Power BI and Tableau models into Unity Catalog."
---

Databricks used **Data + AI Summit 2026** to make a clear pivot: from *"how do we build agents?"* to *"how do we **run** agents, apps, and databases on a single governed plane at scale?"* The summit's tagline, **"Build apps and agents that work"**, was literal. The center of gravity moved from prototypes to production: governing agents, controlling AI spend, and unifying operational and analytical data.

This post is a structured, source-backed walkthrough for data engineers, analytics engineers, AI engineers, and enterprise architects. Where helpful, I've embedded the official Databricks keynote and session videos so you can go straight to the source.

> **Note on sourcing:** This recap prioritizes official Databricks announcements and reputable coverage. Confirmed product announcements are stated plainly; analyst interpretation and keynote-only details are flagged as such. Full links are in the [source table](#sources-official-and-reputable-coverage) at the end.

**Quick answer:** Databricks Data + AI Summit 2026 (DAIS 2026) was Databricks' annual data and AI conference, held June 15 to 18, 2026 at the Moscone Center in San Francisco with more than 30,000 in-person attendees. Its headline launches were Genie One, Unity AI Gateway, Lakeflow, LTAP with Lakebase, and the Lakewatch security lakehouse.

## TL;DR: the five things that matter

- **Event:** DAIS 2026 ran **June 15–18 at Moscone Center, San Francisco**, with 30,000+ in-person attendees, tens of thousands virtual across 150+ countries, and 800+ breakout sessions.
- **Genie One**: Genie evolves from AI/BI chat into a **governed agentic coworker** (web, iOS, Android, Slack, Teams, MCP), backed by **Genie Ontology**, **Genie Agents**, **App Builder**, and **ZeroOps**.
- **Unity AI Gateway** + expanded **Unity Catalog**: runtime governance for models, agents, and tools: contextual policies, hard spend caps, unified tracing, semantics (Glossary, Domains, Metrics), and cross-cloud/region governance.
- **Lakeflow**: unified, agentic data engineering: Lakeflow Designer (GA), 100+ Connect connectors, Zerobus ingest, Real-Time Mode for Spark Declarative Pipelines, and Lakeflow Jobs as a platform orchestrator.
- **LTAP + Lakebase + Lakehouse//RT**: **Lake Transactional/Analytical Processing** unifies OLTP and OLAP on a single storage copy, with serverless Postgres (Lakebase) and a millisecond-latency engine (Lakehouse//RT).
- **Lakewatch + Panther**: an "agentic SIEM" security lakehouse, plus the intended acquisition of Panther to bring AI SOC workflows into the platform.

**If you internalize only three things for 2026–2027:**

1. **LTAP + Lakebase** aims to collapse the OLTP/OLAP split and remove CDC/ETL between operational and analytical systems.
2. **Genie + Unity AI Gateway + Unity Catalog** define the **runtime control plane** for agents, models, and AI/BI, including spend and policy enforcement.
3. **Lakeflow + Lakewatch** signal that data engineering and security operations will increasingly be run *by* agents on the lakehouse.

## Event overview

- **Dates & location:** June 15–18, 2026, at Moscone North/West/South, San Francisco, with hybrid virtual attendance.
- **Scale:** 30,000+ in-person and tens of thousands virtual participants from 150+ countries, across 800+ breakout sessions spanning data engineering, governance, AI, applications, and agents.
- **Audience:** Data engineers, ML/AI engineers, data scientists, BI developers, architects, app developers, and executives.
- **Tone vs. prior years:**
  - 2024–2025: *"How do we build agents and RAG?"*
  - 2026: *"How do we **operate** agents and AI apps reliably, govern them, control cost, and run on unified data?"*

Analysts consistently noted the shift from proof-of-concept demos to operating models, agents, and security at production scale.

### Watch: the Day 1 keynote

The full Day 1 keynote is the best single source for the announcement sequencing, Unity AI Gateway, Genie Ontology/One/Agents, Lakewatch, CustomerLake, Reyden/Lakehouse//RT, LTAP, and Lakeflow.

<a href="https://www.youtube.com/watch?v=Qux8E-L1mk8" target="_blank" rel="noopener noreferrer" style="display:block;max-width:560px;margin:1.5rem 0;border-radius:14px;overflow:hidden;border:1px solid var(--color-border);box-shadow:var(--shadow-card);text-decoration:none;">
  <img src="https://img.youtube.com/vi/Qux8E-L1mk8/maxresdefault.jpg" alt="Data + AI Summit Keynote 2026, Day 1" style="display:block;width:100%;margin:0;border-radius:0;" />
  <span style="display:block;padding:0.75rem 1rem;font-weight:600;background:var(--color-fill-1);">▶ Data + AI Summit Keynote 2026, Day 1 <span style="display:block;font-weight:400;font-size:0.9rem;color:var(--color-text-muted);">Databricks · YouTube</span></span>
</a>

### Watch: the Day 2 keynote

The Day 2 keynote dives deeper into the developer and research side: open source, AI engineering, and the technical underpinnings of the agentic platform.

<a href="https://www.youtube.com/watch?v=sn9My5Pj0mE" target="_blank" rel="noopener noreferrer" style="display:block;max-width:560px;margin:1.5rem 0;border-radius:14px;overflow:hidden;border:1px solid var(--color-border);box-shadow:var(--shadow-card);text-decoration:none;">
  <img src="https://img.youtube.com/vi/sn9My5Pj0mE/maxresdefault.jpg" alt="Data + AI Summit Keynote 2026, Day 2" style="display:block;width:100%;margin:0;border-radius:0;" />
  <span style="display:block;padding:0.75rem 1rem;font-weight:600;background:var(--color-fill-1);">▶ Data + AI Summit Keynote 2026, Day 2 <span style="display:block;font-weight:400;font-size:0.9rem;color:var(--color-text-muted);">Databricks · YouTube</span></span>
</a>

## AI and the agentic platform

### Genie One, Ontology, Agents, App Builder, ZeroOps

- **Genie One** evolves Genie from AI/BI chat into a **data-smart agentic coworker** for business users, available on web, iOS, Android, Slack, Teams, and as an MCP app for other assistants. It connects via Lakehouse federation, Lakeflow Connect, and 50+ workplace apps (Google Drive, Jira, Slack, Confluence, SharePoint, email), and can schedule tasks, send alerts, create docs, and call tools.
- **Genie Ontology** is an automatically learned **enterprise context graph** that extracts meaning from tables, queries, dashboards, pipelines, and apps, ranks authoritative definitions (PageRank-style), and enforces ACLs via Unity Catalog.
- **Genie Agents** turn curated "Spaces" into reusable agents that reason over structured and unstructured data and take autonomous actions via tools, MCP connections, and write-backs, all governed by Unity AI Gateway/Unity Catalog.
- **Genie App Builder** (private preview) is a vibe-coding environment: upload context, and Genie produces a build plan and a live app against governed data, enforcing Unity Catalog permissions.
- **Genie ZeroOps** is a background agent that watches pipelines, tables, jobs, and models, performs root-cause analysis using logs, metrics, and lineage, proposes fixes, tests them in a sandbox, and lets humans approve.

**Pricing/packaging:** Genie moves to **usage-based, no-seat pricing**, with up to **$10 of free usage per user per month**; organizations pay only for AI consumed (token-based).

<a href="https://www.youtube.com/watch?v=6W3BnCgoYVA" target="_blank" rel="noopener noreferrer" style="display:block;max-width:560px;margin:1.5rem 0;border-radius:14px;overflow:hidden;border:1px solid var(--color-border);box-shadow:var(--shadow-card);text-decoration:none;">
  <img src="https://img.youtube.com/vi/6W3BnCgoYVA/maxresdefault.jpg" alt="Introducing Genie One: the AI coworker that understands your data (with demo)" style="display:block;width:100%;margin:0;border-radius:0;" />
  <span style="display:block;padding:0.75rem 1rem;font-weight:600;background:var(--color-fill-1);">▶ Introducing Genie One: the AI coworker that understands your data (with demo) <span style="display:block;font-weight:400;font-size:0.9rem;color:var(--color-text-muted);">Databricks · YouTube</span></span>
</a>

### Unity AI Gateway and agent governance

**Unity AI Gateway** is the runtime governance and telemetry layer for models, agents, tools, and MCP services:

- **One place to govern all AI assets**, register Databricks-hosted and external models, agents, skills, and MCP services alongside data, with the same access controls, discovery, lineage, and auditing as Unity Catalog tables.
- **Contextual Service Policies (Beta)**, *runtime* policies that allow/deny/require approval for actions like pushing code to GitHub, writing to certain paths, blocking PII in responses, and guarding against prompt injection.
- **AI budgets + hard caps**, central budgets now cover external BYO-key providers; hard caps *stop* requests when a budget is hit, not just alert.
- **Unified tracing**, model and MCP traces feed into Lakewatch for investigation, giving full auditability of agent tool calls.

Analysts argue that Unity AI Gateway + Unity Catalog together make the catalog *"the control plane for enterprise AI, not just data."*

### Agent Bricks and Mosaic AI

- **Agent Bricks** is Databricks' agent platform, integrated with Lakewatch and hands-on training; official materials emphasize Vector Search, AI Playground, and Foundation Model APIs to build RAG agents with **MLflow Tracing**–based observability.
- Lakewatch, Genie, and Lakeflow all rely on **Mosaic AI** components (models, vector search, evaluation, tracing) under the hood, but most Mosaic-specific updates were folded into these products rather than launched under separate branding. *(Inference based on keynote/product positioning; no standalone "What's new in Mosaic AI" Summit blog was found in the sources reviewed.)*

<a href="https://www.youtube.com/watch?v=GezX9a_9bwI" target="_blank" rel="noopener noreferrer" style="display:block;max-width:560px;margin:1.5rem 0;border-radius:14px;overflow:hidden;border:1px solid var(--color-border);box-shadow:var(--shadow-card);text-decoration:none;">
  <img src="https://img.youtube.com/vi/GezX9a_9bwI/maxresdefault.jpg" alt="How Agent Bricks gives developers choice, context and control (with demo)" style="display:block;width:100%;margin:0;border-radius:0;" />
  <span style="display:block;padding:0.75rem 1rem;font-weight:600;background:var(--color-fill-1);">▶ How Agent Bricks gives developers choice, context and control (with demo) <span style="display:block;font-weight:400;font-size:0.9rem;color:var(--color-text-muted);">Databricks · YouTube</span></span>
</a>

For ML engineers specifically, **Genie Code** gained upgraded intelligence for ML workflows, feature engineering, training, and evaluation, with native integrations across the Databricks ML platform.

<a href="https://www.youtube.com/watch?v=C1rEj2VQtwU" target="_blank" rel="noopener noreferrer" style="display:block;max-width:560px;margin:1.5rem 0;border-radius:14px;overflow:hidden;border:1px solid var(--color-border);box-shadow:var(--shadow-card);text-decoration:none;">
  <img src="https://img.youtube.com/vi/C1rEj2VQtwU/maxresdefault.jpg" alt="Agentic machine learning with Genie Code (includes demo)" style="display:block;width:100%;margin:0;border-radius:0;" />
  <span style="display:block;padding:0.75rem 1rem;font-weight:600;background:var(--color-fill-1);">▶ Agentic machine learning with Genie Code (includes demo) <span style="display:block;font-weight:400;font-size:0.9rem;color:var(--color-text-muted);">Databricks · YouTube</span></span>
</a>

## Data engineering, Delta, streaming, and LTAP

### Lakeflow: unified, agentic data engineering

The Lakeflow update is the most material announcement for data engineering teams.

<a href="https://www.youtube.com/watch?v=0WDGu-IPmZM" target="_blank" rel="noopener noreferrer" style="display:block;max-width:560px;margin:1.5rem 0;border-radius:14px;overflow:hidden;border:1px solid var(--color-border);box-shadow:var(--shadow-card);text-decoration:none;">
  <img src="https://img.youtube.com/vi/0WDGu-IPmZM/maxresdefault.jpg" alt="Unlocking agentic data engineering with Lakeflow + Genie" style="display:block;width:100%;margin:0;border-radius:0;" />
  <span style="display:block;padding:0.75rem 1rem;font-weight:600;background:var(--color-fill-1);">▶ Unlocking agentic data engineering with Lakeflow + Genie <span style="display:block;font-weight:400;font-size:0.9rem;color:var(--color-text-muted);">Databricks · YouTube</span></span>
</a>

Key pillars:

- **Lakeflow Designer (GA)**: a visual, AI-powered no-code canvas for Spark Declarative Pipelines; flows compile down to real SDP code, so engineers can refine without translation gaps.
- **Genie Code + Lakeflow**: Genie Code is embedded to generate connectors, pipelines (Python/SQL), and job DAGs with triggers and dependencies, using full end-to-end context.
- **Lakeflow Connect**: 100+ native managed connectors to apps, databases, and file stores; query-based CDC for all DB and federation sources, plus a "Community Connectors" OSS framework. **Free tier:** 100 DBUs/day, supporting up to 100M records/day.
- **Zerobus Ingest (GA)**: Kafka-free ingestion for high-volume events: near-real-time writes (<5s), up to 100 MB/s per stream and >10 GB/s per table, with a Kafka-compatible API (Beta), gRPC + REST (GA), SDKs for Python/Java/Rust/Go/TypeScript, and OpenTelemetry (public preview).
- **Spark Declarative Pipelines Real-Time Mode (Public Preview)**: ~5 ms end-to-end latency on a Spark-only stack (no separate Flink cluster), on classic and serverless compute.
- **Lakeflow Jobs**: a native orchestrator with **data-aware triggers** (jobs fire when SQL-expressed "ready" conditions are met), **external orchestration** (operators for Snowflake, REST APIs, Slack, PagerDuty, etc., with 40+ examples), and Unity Catalog–governed credentials and audit.

**Customer proof points:** Panasonic reported a **50% reduction in Power BI refresh times** after consolidating legacy ETL onto Databricks via Lakeflow; Meta cut end-to-end pipeline latency to under a minute with Zerobus + SDP Real-Time Mode.

### LTAP, Lakebase, and Lakehouse//RT

- **LTAP (Lake Transactional/Analytical Processing)** unifies transactions, analytics, streaming, and operational data on a **single copy of data in the lake**, built on Lakebase and the Lakehouse. It writes OLTP data directly into Delta/Iceberg in Unity Catalog with Postgres semantics and full ACID, eliminating the CDC/ETL duplication between OLTP and OLAP, with strict isolation between transactional and analytical workloads.
- **Lakebase** (serverless Postgres on object storage) now serves thousands of customers and reportedly **12M database launches/day**, adding cross-cloud/region disaster recovery, git-style branching and snapshots, and autonomous DB operations (agents monitor health, propose indexes, assist recovery).
- **Lakehouse//RT + Reyden**: a real-time warehouse engine delivering millisecond-scale query latency and tens of thousands of concurrent users directly on Delta/Iceberg, meant to replace separate serving layers and caches. SiliconANGLE reports customers seeing up to **16x better performance** vs. existing real-time serving stacks, positioned as a drop-in upgrade for Lakehouse SQL warehouses (beta).

Analysts characterized LTAP + Lakehouse//RT as Databricks *"declaring the end of pipelines"* between applications and analytics, particularly for agent-heavy workloads.

<a href="https://www.youtube.com/watch?v=9J2-PovJppA" target="_blank" rel="noopener noreferrer" style="display:block;max-width:560px;margin:1.5rem 0;border-radius:14px;overflow:hidden;border:1px solid var(--color-border);box-shadow:var(--shadow-card);text-decoration:none;">
  <img src="https://img.youtube.com/vi/9J2-PovJppA/maxresdefault.jpg" alt="Introducing LTAP (Lake Transactional/Analytical Processing)" style="display:block;width:100%;margin:0;border-radius:0;" />
  <span style="display:block;padding:0.75rem 1rem;font-weight:600;background:var(--color-fill-1);">▶ Introducing LTAP: a new data processing architecture <span style="display:block;font-weight:400;font-size:0.9rem;color:var(--color-text-muted);">Databricks · YouTube</span></span>
</a>

<a href="https://www.youtube.com/watch?v=L3_sGJRC674" target="_blank" rel="noopener noreferrer" style="display:block;max-width:560px;margin:1.5rem 0;border-radius:14px;overflow:hidden;border:1px solid var(--color-border);box-shadow:var(--shadow-card);text-decoration:none;">
  <img src="https://img.youtube.com/vi/L3_sGJRC674/maxresdefault.jpg" alt="Introducing Lakehouse//RT and Reyden, Reynold Xin" style="display:block;width:100%;margin:0;border-radius:0;" />
  <span style="display:block;padding:0.75rem 1rem;font-weight:600;background:var(--color-fill-1);">▶ Introducing Lakehouse//RT and Reyden, Reynold Xin, Co-founder & Chief Architect <span style="display:block;font-weight:400;font-size:0.9rem;color:var(--color-text-muted);">Databricks · YouTube</span></span>
</a>

## BI and analytics (including Power BI / Fabric relevance)

### Genie for AI/BI and business workflows

Genie One extends beyond conversational analytics into **doc/report generation, dashboards, scheduled briefs, and workflow automation** grounded in governed data. It's embedded in Slack/Teams, has native mobile apps, and can be called as an MCP tool by external assistants, turning Databricks into a shared AI/BI backend.

**Customers:** Uplight uses Genie One to "explore, discover and innovate" faster; Foot Locker uses Genie Agents as a central AI insights space for executives across banners; Albertsons uses Genie within a Merchandising Intelligence initiative for explainable decisions across the 4Ps.

### Unity Catalog Metrics and semantics for BI

- **Metrics enhancements**: multi-fact relationships (Public Preview in Dashboards), LOD calculations, parameterized metrics, richer window functions, and metric **materialization** (public preview) for faster dashboards and agent queries.
- **Agentic/UI-driven authoring**: a visual designer plus agents that propose metric definitions, lowering the barrier to semantic modeling.
- **Import from third-party tools (Beta)**: **import models from Power BI and Tableau directly into Databricks**, bootstrapping Metrics from existing BI semantics.
- **Domains and Glossary**: Domains (Public Preview) and an upcoming Glossary organize assets into business categories and feed Genie Ontology and agents.
- **External lineage (GA)**: end-to-end lineage now spans upstream sources and downstream BI tools.

This is a critical bridge for **Power BI/Fabric customers**: you can keep existing semantic models while migrating workloads or running BI across platforms.

### Real-time BI

For BI teams, Lakehouse//RT + LTAP mean direct millisecond queries from BI tools against Delta/Iceberg without a separate serving database, and "fresh" analytics that sit directly on operational data (no ETL lag).

## Governance and security

### Unity Catalog: control, context, choice

Unity Catalog's roadmap is framed around **control, context, and choice** in the agentic era:

- **Control**: Unity AI Gateway; **Governance Hub** (Private Preview) for a centralized posture dashboard; **ABAC expansions** (grant policies for models, identity/context attributes, tag propagation); and opt-in **RBAC** (Public Preview soon).
- **Context**: Glossary, Domains, and Metrics build an open, OSI-ready semantic layer accessible via SQL, APIs, MCPs, and agents; External Lineage (GA) and Table Insights feed Genie Ontology.
- **Choice**: **cross-cloud/region governance** with a four-level namespace (`metastore.catalog.schema.table`); **external engine writes** to UC-managed Delta tables (Spark, Flink, DuckDB) via catalog commits; **FILE type (Beta)** for governing unstructured assets (PDFs, images, audio, video); and **geospatial types (GA)** in Delta and Iceberg v3.
- **OpenSharing**: announced as a Linux Foundation project, extending Delta Sharing to models, skills, and unstructured data.

### Platform security and compliance

- **Automatic Identity Management (AIM)**: Entra ID (GA on AWS/GCP) and Okta (Public Preview) auto-provision users, groups, and service principals.
- **Context-Based Ingress (Public Preview)**: zero-trust-style policies combining network, identity, and scope, plus expanded Inbound Private Link.
- **Private Network Gateway** (Private Preview on Azure) and **Private Link for Lakebase** (GA on AWS, Public Preview on Azure).
- **Compliance expansion**: HITRUST across AWS/Azure/GCP, ISMAP (Japan), extended KSA on GCP, expanded AWS GovCloud coverage for AI features, and forthcoming FedRAMP High on Azure Commercial.

### Lakewatch and the Panther acquisition

- **Lakewatch** (agentic SIEM), formally launched earlier in 2026, was a major Summit theme. It unifies security, IT, and business data in one governed lakehouse with petabyte-scale retention and a claimed up to **80% lower TCO** vs. legacy SIEM, embedding security agents (via Agent Bricks + Genie Code) for automated triage, rule authoring, and investigation.
- **Panther acquisition**: Databricks announced intent to acquire Panther, an AI SOC platform with detection-as-code and 100+ security integrations, to accelerate the Security Lakehouse vision. Analysts see this as Databricks moving from a data platform *into* core security infrastructure.

## Partner ecosystem

- **Microsoft / Azure Databricks**: emphasis on modernizing Azure data estates and **zero-copy federated analytics**, combining Azure's enterprise cloud with Databricks' Lakehouse/Lakebase/Genie rather than redundant warehouses.
- **AWS**: returned as a "Legend Sponsor," highlighting co-built customer stories (e.g., Mastercard) and **Bedrock + Databricks** agent patterns (Bedrock AgentCore agents querying Unity Catalog, answering via Genie, reading low-latency state from Lakebase/Lakehouse//RT).
- **GCP and others**: expanded KSA compliance on GCP and a broad open ecosystem around Lakewatch (Okta, Zscaler, Wiz, Panther). OpenSharing and open table formats keep interop viable with third-party engines including Snowflake and Fabric-connected BI tools.

### Watch: CustomerLake, the agentic CDP

Among the vertical announcements, Databricks introduced **CustomerLake**, an agentic Customer Data Platform natively embedded in Databricks.

<a href="https://www.youtube.com/watch?v=SUz4k1yxw1I" target="_blank" rel="noopener noreferrer" style="display:block;max-width:560px;margin:1.5rem 0;border-radius:14px;overflow:hidden;border:1px solid var(--color-border);box-shadow:var(--shadow-card);text-decoration:none;">
  <img src="https://img.youtube.com/vi/SUz4k1yxw1I/maxresdefault.jpg" alt="Introducing CustomerLake: The Agentic CDP" style="display:block;width:100%;margin:0;border-radius:0;" />
  <span style="display:block;padding:0.75rem 1rem;font-weight:600;background:var(--color-fill-1);">▶ Introducing CustomerLake: The Agentic CDP, Ali Ghodsi <span style="display:block;font-weight:400;font-size:0.9rem;color:var(--color-text-muted);">Databricks · YouTube</span></span>
</a>

## Top announcements timeline

Dates use press/blog publication dates; many were also demoed live in the June 15 Day 1 keynote.

| Date (2026) | Announcement | Category |
| :-- | :-- | :-- |
| Mar 24 | Lakewatch launch (agentic SIEM) | Security |
| Jun 2 | DAIS 2026 agenda & keynote lineup | Event |
| Jun 15 | Unity Catalog "What's new", AI Gateway, semantics, external writes, FILE type | Governance |
| Jun 15 | Lakeflow: a new era of agentic data engineering | Data engineering |
| Jun 15 | Genie One / Genie Ontology / Genie Agents (blog) | AI/BI |
| Jun 16 | Genie One press release, GA + usage-based pricing | AI/BI |
| Jun 16 | LTAP press release, architecture + Lakebase stats | Architecture |
| Jun 16 | Platform security & compliance "What's new" | Security/platform |
| Jun 16–17 | Lakewatch + Panther acquisition announced | Security |
| Jun 15–18 | Keynote: Lakehouse//RT, Reyden, CustomerLake, Omnigent | Platform/vertical |

## Five trends from the summit

1. **From building agents to operating agentic systems.** Unity AI Gateway, Genie Ontology, ZeroOps, Lakewatch, and Lakeflow together address runtime concerns, cost, guardrails, observability, and auto-remediation.
2. **Collapse of OLTP/OLAP and serving layers into LTAP.** One storage copy, multiple engines, open formats, and strict isolation, going beyond "HTAP in a single engine."
3. **Governance and semantics as AI infrastructure.** Unity Catalog moved from access control to runtime AI governance and semantic context; the catalog is now a *decision-maker* for AI, not just a registry.
4. **Data engineering becoming agentic and unified.** Lakeflow consolidates ingestion, streaming, and orchestration, with Genie Code and ZeroOps automating authoring and operations, fewer standalone tools (Airflow, Kafka, proprietary CDC).
5. **Security converging with data and AI.** Lakewatch + Panther push SIEM workloads onto the lakehouse, with security agents running alongside data and AI workloads.

## Competitive analysis

- **vs. Snowflake**: LTAP's storage-centric unification (Postgres apps + open Delta/Iceberg) is explicitly contrasted with HTAP and "Zero-ETL" architectures that keep separate engines and hidden CDC. External engine writes, Iceberg v3 GA, and OpenSharing reinforce an open multi-engine story; Lakewatch + Panther position Databricks directly against SIEM players.
- **vs. Microsoft Fabric**: Azure Databricks content emphasizes modernizing Azure estates with zero-copy federated analytics rather than wholesale replacement. **Metrics import from Power BI/Tableau** is a clear bridge, and Genie One overlaps conceptually with Copilot for Power BI but stresses governed SQL, multi-app context, and usage-based economics over per-seat licensing.
- **vs. point AI/MLOps tools**: Genie, App Builder, and Agent Bricks compete with standalone agent frameworks by being tightly integrated into governance, security, and semantics; MLflow Tracing + Mosaic AI remain the evaluation backbone but are framed as parts of end-to-end agent platforms.

## Enterprise implications

### Three announcements with the biggest 2026–2027 impact

1. **LTAP + Lakebase**: if executed, unifying OLTP/OLAP/streaming on one governed storage copy can drastically reduce CDC/ETL complexity and time-to-production for AI apps. A multi-year journey for most, but a clear directional bet away from dual-stack architectures.
2. **Genie One + Ontology + Agents**: Genie Ontology addresses the "context problem" by making governed data (not embeddings) the ground truth for reasoning, with large potential productivity gains if enterprises standardize on Genie for data-informed work.
3. **Unity AI Gateway + UC semantics**: contextual policies, budgets with hard caps, and unified tracing respond directly to CFO/CISO concerns about uncontrolled LLM spend and agent risk.

### Three announcements most relevant to Power BI / Fabric users

1. **Unity Catalog Metrics + Power BI/Tableau import**: centralize metrics and reuse them across Databricks SQL, Genie, and external BI while preserving existing definitions.
2. **Lakeflow + Power BI performance**: Connect, Zerobus, and SDP Real-Time Mode offer a Fabric-like ingestion/transformation experience on the Lakehouse (Panasonic's 50% refresh-time improvement is the showcase).
3. **Lakehouse//RT + zero-copy analytics with Azure**: low-latency queries on lakehouse data without replication to a separate serving store, aligning with the zero-copy federated analytics patterns Microsoft and Databricks jointly advocate.

### Practical takeaways by role

**Data engineers**: Pilot Lakeflow Designer + SDP on non-critical pipelines; evaluate Zerobus as a Kafka replacement for high-volume producers; start capturing lineage via Lakeflow Connect + UC External Lineage to prepare for ZeroOps and data-aware orchestration. Medium term: rationalize Kafka/Airflow into Lakeflow Jobs and pressure-test Lakebase for greenfield transactional workloads.

**Analytics engineers / BI developers**: Treat **Unity Catalog Metrics** and **Domains** as your new semantic modeling surface; import from Power BI/Tableau where it accelerates migration; explore Genie One/Agents for curated domains, starting with users who already live in Slack/Teams; test Lakehouse//RT for high-concurrency dashboards.

**AI/ML engineers**: Standardize on **Unity AI Gateway** for model and tool access so budget and policy enforcement are centralized from day one; use **Agent Bricks + Vector Search + MLflow Tracing** for RAG observability; integrate Genie Ontology and UC semantics into prompting and tool choices.

**Architects / technical leaders**: Map roadmaps to **LTAP** (where OLTP+OLAP unification on open storage is feasible over 2–3 years); build a governance strategy with Unity Catalog at the center (data, AI, security, cost); track Lakewatch + Panther integration timelines if you already centralize security data in Databricks.

## Conclusions and predictions

- Databricks is explicitly betting the lakehouse will be both the **data layer** *and* the **runtime control plane** for agents, apps, and security. LTAP, Unity AI Gateway, and Lakewatch all reinforce that strategy.
- For 2026–2027, the likely near-term wins are in **data engineering and AI/BI**, not wholesale LTAP adoption. Lakeflow consolidation, Genie One deployment, and UC semantics can deliver value without touching core transactional systems.
- **LTAP could be transformative but will land unevenly**: cloud-native apps and new AI products are the most natural candidates; SaaS-heavy or vendor-locked workloads will migrate slower.
- **Governance will increasingly be the differentiator** across platforms, pushing competitors to match runtime policy, spend caps, and semantic openness.
- **Security workloads will move closer to the data platform**: if Lakewatch + Panther deliver, expect more SOCs to treat the lakehouse as their primary telemetry and detection surface.

For teams already deep in Databricks, Power BI, and cloud data engineering, the immediate opportunity is to **treat Databricks less as a warehouse and more as an agentic operating environment**, incrementally adopting Lakeflow, Genie, and Unity Catalog semantics while planning if and where LTAP and Lakewatch fit your roadmap.

## Sources (official and reputable coverage)

| Topic | Type | Publisher | Link |
| :-- | :-- | :-- | :-- |
| DAIS 2026 event site | Official event | Databricks | <https://www.databricks.com/dataaisummit> |
| 2026 keynote lineup | Press release | Databricks | <https://www.databricks.com/company/newsroom/press-releases/databricks-announces-2026-data-ai-summit-keynote-lineup-and> |
| Day 1 keynote (video) | Keynote video | Databricks | <https://www.youtube.com/watch?v=Qux8E-L1mk8> |
| Day 2 keynote (video) | Keynote video | Databricks | <https://www.youtube.com/watch?v=sn9My5Pj0mE> |
| Genie One / Ontology / Agents | Product blog | Databricks | <https://www.databricks.com/blog/introducing-genie-one-genie-ontology-and-genie-agents> |
| Genie One launch | Press release | Databricks | <https://www.databricks.com/company/newsroom/press-releases/databricks-launches-genie-one-all-new-agentic-coworker-every-team> |
| LTAP launch | Press release | Databricks | <https://www.databricks.com/company/newsroom/press-releases/databricks-launches-ltap-first-lake-transactionalanalytical> |
| Lakeflow: agentic data engineering | Product blog | Databricks | <https://www.databricks.com/blog/lakeflow-new-era-agentic-data-engineering> |
| Lakeflow + Genie (video) | Session video | Databricks | <https://www.youtube.com/watch?v=0WDGu-IPmZM> |
| What's new with Unity Catalog | Product blog | Databricks | <https://www.databricks.com/blog/whats-new-unity-catalog-data-ai-summit-2026> |
| Platform security & compliance | Product blog | Databricks | <https://www.databricks.com/blog/whats-new-databricks-platform-security-and-compliance-data-ai-summit-2026> |
| Lakewatch launch | Press release | Databricks | <https://www.databricks.com/company/newsroom/press-releases/databricks-enters-security-market-launch-lakewatch-new-agentic-siem> |
| Lakewatch product page | Product page | Databricks | <https://www.databricks.com/product/lakewatch> |
| AWS + Databricks at DAIS 2026 | Blog | Databricks | <https://www.databricks.com/blog/aws-and-databricks-data-ai-summit-2026-accelerating-real-world-ai-innovation> |
| Azure Databricks at DAIS 2026 | Blog | Microsoft | <https://techcommunity.microsoft.com/blog/azure-databricks/azure-databricks-at-databricks-data--ai-summit-2026-updates-and-new-announcement/4528388> |
| CustomerLake (video) | Keynote video | Databricks | <https://www.youtube.com/watch?v=SUz4k1yxw1I> |
| LTAP & Lakehouse//RT coverage | Article | SiliconANGLE | <https://siliconangle.com/2026/06/16/databricks-declares-end-pipelines-unified-platform-operational-analytical-data/> |
| Lakehouse as agentic control plane | Analysis | Bain & Company | <https://www.bain.com/insights/databricks-data-ai-summit-the-lakehouse-becomes-the-agentic-enterprise-control-plane/> |
| Summit announcements recap | Recap | Atlan | <https://atlan.com/know/ai-agent/databricks/databricks-data-ai-summit-2026-announcements/> |
| Panther acquisition | News | StorageNewsletter | <https://www.storagenewsletter.com/2026/06/17/data-ai-summit-2026-databricks-agrees-to-acquire-panther/> |

*Prioritize official Databricks sources; confirmed announcements are distinguished from analyst interpretation throughout this post.*
