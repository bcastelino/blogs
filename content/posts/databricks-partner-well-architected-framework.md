---
title: "Databricks Partner Well Architected Framework: How to Actually Build and Submit a Solution With It"
date: 2026-08-03
excerpt: "A practical guide to the Databricks Partner Well Architected Framework (PWAF): the three partner tracks, the four pillars, the four deployment models, and the deployment-model decision that quietly determines what program benefits you can ever earn."
tags: [databricks, pwaf, partner-architecture, isv, unity-catalog, delta-sharing, solution-accelerator]
author: Brian Castelino
authorUrl: https://www.linkedin.com/in/cas7elino/
takeaways:
  - "**Pick your deployment model before you write code.** Databricks documents four models (Partner Hosted, Hybrid, Side Car, Customer Managed), and Customer Managed explicitly gets limited program benefits because telemetry and application management are constrained. Notebook-first accelerators land there by default."
  - "**Architecture is the pillar you will over-invest in, attribution is the one that gates you.** The mandatory Connected ISV requirements are narrow and specific: OAuth 2.0, Unity Catalog registration, and a programmatic `User-Agent` string you can verify in `system.access.audit`."
  - "**Firefly Analytics is the answer key.** It is an open-source SaaS app from Databricks Labs that implements the Built-On patterns end to end, so you can read working code instead of interpreting prose."
  - "**Write the connection documentation before you build the demo.** Prerequisites, required Databricks privileges, supported auth types, and step-by-step setup per auth type are a stated submission requirement, not a nice-to-have."
faq:
  - question: "What is the Databricks Partner Well Architected Framework?"
    answer: "The Partner Well Architected Framework (PWAF) is Databricks' architecture guide for technology partners building products, integrations, and data shares on the Data Intelligence Platform. It extends the AWS, Azure, and GCP Well Architected Frameworks and the Databricks Lakehouse Architecture to partner-specific problems like multi-tenant SaaS, customer data integration, marketplace distribution, and partner attribution. It is published by Databricks Labs at databrickslabs.github.io/partner-architecture."
  - question: "Who should use the Databricks PWAF?"
    answer: "Three partner types. Connected ISV Partners building integrations that connect an existing product to Databricks, such as BI, ingestion, governance, or AI tools. Data Collaboration Partners sharing or monetizing data through OpenSharing and Databricks Marketplace. Built-On ISV Partners building their core product on Databricks as the intelligence layer, including SaaS platforms and embedded analytics."
  - question: "What are the four pillars of the PWAF?"
    answer: "Architectural Best Practices (design principles, repeatable patterns, reference architectures), Defined Technical Standards (per-partner-type requirements that must be met for validation), Measurement and Attribution (telemetry for adoption, impact, and partner attribution), and Operations and Lifecycle Management (monitoring, automation, runbooks, access management, continuous improvement)."
  - question: "Which Databricks deployment model should a partner use?"
    answer: "Databricks documents four: Partner Hosted (SaaS), where you own and operate the whole Databricks environment; Hybrid, a partner-managed control plane with a customer-owned data plane; Side Car, a federated model that delivers governed assets via OpenSharing and Clean Rooms; and Customer Managed, where the customer owns everything and you ship software, templates, and guidance. Choose based on data residency, operational capacity, customer sophistication, regulatory constraints, and unit economics."
  - question: "Why does Customer Managed get limited PWAF program benefits?"
    answer: "Databricks states directly that due to limitations in telemetry and application management, program benefits are limited for Customer Managed deployments. If the customer runs everything in their own workspace, Databricks cannot reliably observe usage or attribute it to you, which undercuts the Measurement and Attribution pillar that partner benefits depend on."
  - question: "What are the mandatory technical requirements for a validated Connected ISV integration?"
    answer: "OAuth 2.0 is mandatory for authentication, covering user-to-machine and machine-to-machine flows. Any integration that reads, writes, stages, or manages data assets must register and operate on them in Unity Catalog. A stable partner User-Agent telemetry identifier must be embedded programmatically in every Databricks API call, driver connection, SDK call, job, and CLI invocation. Partners must also supply customer-facing connection documentation."
  - question: "What is Firefly Analytics?"
    answer: "Firefly Analytics is an open-source, production-shaped SaaS application published by Databricks Labs as the PWAF reference implementation. It demonstrates SSO-SPN authentication, multi-tenancy, workspace-catalog binding, embedded Databricks Apps, and cost and scale patterns. Source is at github.com/databrickslabs/firefly with architecture docs at firefly-analytics.com/docs."
  - question: "Is Genie attribution required for partner products?"
    answer: "Yes. Products integrating with Databricks Genie must display a visible 'Powered by Genie' label wherever Genie-generated content appears, include a citation linking to the Genie Space that produced the result, surface any links returned in the Genie response, and carry the attribution in product surfaces and documentation. AI agent products must invoke Genie via MCP or they will not be validated."
---

Most partner-facing frameworks are documentation you skim once and never open again. The Databricks Partner Well Architected Framework is not that, because it contains one decision that silently determines everything downstream: which deployment model your product uses. Get that wrong and you can build a technically excellent solution that is structurally incapable of earning the partner benefits you built it for.

I found this out the practical way. I used the PWAF to design and submit a Databricks solution accelerator for WorldLink, and the framework was genuinely useful, but the most valuable thing in it was not a pattern or a diagram. It was a single sentence buried in the Customer Managed deployment page.

This post is the guide I wanted when I started: what the PWAF is, which of the three partner tracks you belong to, what the four pillars actually demand, how to choose between the four deployment models, and which requirements are hard gates versus suggestions.

<div style="margin:2rem 0;padding:1.5rem;border:1px solid var(--color-border);border-radius:16px;background:var(--color-fill-1);box-shadow:var(--shadow-card);">
<div style="display:flex;flex-wrap:wrap;gap:1.75rem;align-items:center;">
<a href="https://www.credential.net/4133c666-6e3d-4584-8eeb-4a199ee6d517" target="_blank" rel="noopener noreferrer" style="flex:0 0 auto;">
<img src="/posts/pwaf-badge.png" alt="Databricks Academy badge: Partner Training, ISV Partner Well Architected Frameworks" width="230" style="display:block;width:230px;border-radius:10px;margin:0;" />
</a>
<div style="flex:1;min-width:250px;">
<p style="margin:0 0 1rem;font-size:.95rem;font-style:italic;color:var(--color-text-secondary);">"This badge is awarded to people who complete the ISV Partner Well Architected Frameworks Training and Knowledge Check with a score of 80% or higher. This course is designed to teach ISVs the basic knowledge of Partner Well Architected Frameworks, as well as give you the main resources and tools for building solutions utilizing PWAF."</p>
<div style="display:flex;flex-wrap:wrap;gap:.4rem;">
<span style="font-size:.78rem;padding:.25rem .6rem;border-radius:999px;background:var(--color-accent-soft);color:var(--color-text-secondary);">Partner Well Architected Frameworks</span>
<span style="font-size:.78rem;padding:.25rem .6rem;border-radius:999px;background:var(--color-accent-soft);color:var(--color-text-secondary);">Solution Development</span>
<span style="font-size:.78rem;padding:.25rem .6rem;border-radius:999px;background:var(--color-accent-soft);color:var(--color-text-secondary);">Knowledge Check Assessment</span>
<span style="font-size:.78rem;padding:.25rem .6rem;border-radius:999px;background:var(--color-accent-soft);color:var(--color-text-secondary);">ISV Partnership Skills</span>
<span style="font-size:.78rem;padding:.25rem .6rem;border-radius:999px;background:var(--color-accent-soft);color:var(--color-text-secondary);">Resource Utilization</span>
</div>
<p style="margin:1rem 0 0;font-size:.85rem;"><a href="https://www.credential.net/4133c666-6e3d-4584-8eeb-4a199ee6d517" target="_blank" rel="noopener noreferrer">Verify this credential</a></p>
</div>
</div>
<div style="display:flex;flex-wrap:wrap;gap:1rem;font-size:.9rem;align-items:stretch;margin-top:1.5rem;padding-top:1.25rem;border-top:1px solid var(--color-border);">
<div style="display:flex;flex-direction:column;gap:.15rem;flex:1 1 0;min-width:0;"><span style="color:var(--color-text-muted);font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;">Issuer</span>Databricks Academy</div>
<div style="display:flex;flex-direction:column;gap:.15rem;flex:1 1 0;min-width:0;"><span style="color:var(--color-text-muted);font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;">Credential</span>Partner Training, ISV Partner Well Architected Frameworks</div>
<div style="display:flex;flex-direction:column;gap:.15rem;flex:1 1 0;min-width:0;"><span style="color:var(--color-text-muted);font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;">Issued</span>July 31, 2026</div>
</div>
</div>

The training is worth the hour, but it teaches you the map, not the terrain. What follows is the terrain.

## What is the Databricks Partner Well Architected Framework?

**The Partner Well Architected Framework (PWAF) is Databricks' architecture guide for technology partners building products, integrations, and data shares on the Databricks Data Intelligence Platform.** It is published by Databricks Labs at [databrickslabs.github.io/partner-architecture](https://databrickslabs.github.io/partner-architecture/) and organized around three partner types and four architectural pillars.

The framing matters. Databricks explicitly positions the PWAF as an extension of the cloud Well Architected Frameworks (AWS, Azure, GCP) and the [Databricks Lakehouse Architecture](https://docs.databricks.com/aws/en/lakehouse-architecture/), applied to problems those frameworks do not cover: multi-tenant SaaS architectures, customer data integration, marketplace distribution, and partner attribution.

That last one, attribution, is the tell. The cloud frameworks care whether your system is reliable and secure. The PWAF also cares whether Databricks can *see* your product working, because partner economics depend on measurable joint impact. Read the whole framework through that lens and a lot of otherwise-arbitrary requirements start making sense.

One practical note before you start: the PWAF is deliberately built for AI-assisted development. Every page has a copy-link action and an AI assistant dropdown with pre-loaded prompts, and the site publishes two machine-readable context files, an `llms.txt` site map and an `ai-context.txt` guidance file. If you are going to work through the framework with Claude or Cursor, point the tool at those files first instead of pasting pages one at a time.

## Who the PWAF is for: the three partner tracks

Before reading anything else, work out which track you are in, because the technical standards differ per track and you will waste time reading requirements that do not apply to you.

| Track | You are here if | Core technical concerns |
| --- | --- | --- |
| **Connected ISV Partner** | You have an existing product (BI, ingestion, governance, AI tooling) and you are connecting it to Databricks | OAuth, SQL drivers and SDKs, Unity Catalog registration, `User-Agent` telemetry, Genie attribution |
| **Data Collaboration Partner** | You are sharing or monetizing data privately or through Databricks Marketplace | OpenSharing, Unity Catalog layout, metadata quality, recipients, Change Data Feed |
| **Built-On ISV Partner** | Databricks *is* your backend, and your customers may never know it | Deployment models, multi-tenancy, workspace models, credential isolation, cost management |

The boundaries blur in practice. A notebook-based solution accelerator that a customer runs in their own workspace is closest to the Built-On track under the Customer Managed deployment model, even though it feels nothing like a SaaS product. That mismatch is worth thinking about early, and I will come back to it.

One thing the PWAF is clear about: the framework is technical guidance, not membership. To get go-to-market benefits, co-sell, and program incentives you have to be an active member of the [Databricks Partner Program](https://partners.databricks.com/), and validation requests go through the Partner Portal. Building well and being a partner are separate steps, in that order or not.

## The four PWAF pillars, and which ones actually gate you

Databricks defines four pillars:

1. **Architectural Best Practices.** Design principles, repeatable patterns, reference architectures, and implementation guidance.
2. **Defined Technical Standards.** Per-partner-type requirements that must be met for validation and program participation, with a stated path to validation.
3. **Measurement and Attribution.** Continuous measurement of adoption and impact, and partner attribution through telemetry.
4. **Operations and Lifecycle Management.** Monitoring, automation, runbooks, access management, and continuous improvement workflows.

Here is the part nobody tells you: engineers spend roughly all of their effort on pillar 1 and almost none on pillar 3, and pillar 3 is closer to a gate.

Pillar 1 is fun. It is diagrams, patterns, and design debates. It is also where you have the most latitude, because "good architecture" has many valid shapes.

Pillars 2 and 3 are checklists with binary outcomes. Did you embed a programmatic `User-Agent`? Did you register your data assets in Unity Catalog? Is OAuth implemented, or are you still passing personal access tokens around? These are yes-or-no, and they are cheap to do early and expensive to retrofit.

Pillar 4 is the one that gets deferred to "after we ship," which is why so many partner solutions have no runbook, no documented upgrade path, and no support boundary. The Customer Managed guidance is blunt about this: define clear boundaries for support, provide clear versioning for all artifacts, document upgrade paths and breaking changes, and consider backward compatibility for long-term customers. That is a pillar-4 to-do list, and it takes a day.

## Connected ISV: the requirements that are genuinely mandatory

If you are connecting an existing product to Databricks, the [integration requirements](https://databrickslabs.github.io/partner-architecture/isv-partners/integration-requirements) page is the highest-value page in the entire framework. It is short and it is specific. These are the hard requirements.

### OAuth 2.0 is mandatory, and personal access tokens are not a strategy

OAuth is mandatory for all ISV partner integrations and is the standard mechanism for secure production authentication. Two flows are supported:

- **User-to-machine (U2M).** A browser-based OAuth flow where the user authenticates with their own identity and your app acts on their behalf. Relevant docs cover JDBC, ODBC, OIDC U2M, and token federation.
- **Machine-to-machine (M2M).** Client credentials with service principals, so jobs, services, and scripts reach Databricks with no signed-in user. This covers Workload Identity Federation, account token federation, and Databricks OIDC M2M.

The security and lifecycle guidance is standard but worth quoting as a checklist, because reviewers will look for it: request least-privilege scopes, persist tokens securely, rotate refresh tokens, use PKCE, never log tokens and ensure redaction, support revocation, and provide a clear disconnect and re-auth experience.

That last item is the one I see skipped most. Plenty of integrations can connect. Far fewer can cleanly *disconnect*.

### Unity Catalog registration is not optional if you touch data

The rule is broad: if an ISV integration reads, writes, stages, or manages any type of data asset, the integration must register and operate on those assets in Unity Catalog. "Data asset" is defined widely too, covering structured and tabular data (tables, views, materialized views, metric views, UDFs), unstructured files (images, documents, logs, binaries, ingestion files), and ML models.

Practically, this means three-level namespacing (`<catalog>.<schema>.<table>`) everywhere, no side-channel storage that bypasses governance, and metadata access that complies with the [Databricks Acceptable Use Policy](https://www.databricks.com/legal/acceptable-use-policy).

### Telemetry: one string, programmatically set, verifiable in a system table

This is the requirement that most directly serves the Measurement and Attribution pillar, and it is a small amount of work with outsized consequences.

You must programmatically embed a stable partner `User-Agent` identifier in every Databricks API call, driver or SQL connection, SDK or connector call, job, CLI invocation, or other integration request originating from your product. The format is built from `isv-name`, `product-name`, and `product-version`, separated by underscores. Each product or integration needs a distinct value.

Two details matter more than the format:

**You cannot outsource it to the customer.** The framework says it plainly: partners must set this value programmatically in the connection code path, and you cannot rely on joint customers to configure it themselves. It calls this a strict requirement.

**You can verify it yourself.** The Source column in [Query History](https://docs.databricks.com/aws/en/sql/user/queries/query-history) reflects the `User-Agent` used by the partner application, and for full coverage across workloads you query the audit system table:

```sql
SELECT *
FROM system.access.audit
WHERE event_time > current_timestamp() - INTERVAL 2 days
  AND lower(user_agent) LIKE '%<your-user-agent>%';
```

Run that before you submit anything. If it returns nothing, your attribution does not exist, whatever your architecture diagram says.

### Genie attribution has specific UI requirements

If your product surfaces Genie output, four things are required: a visible "Powered by Genie" label wherever Genie-generated content appears, a citation linking directly to the Genie Space that produced the result (constructible from the `space_id` returned by the Genie API), any links in the Genie response surfaced and navigable, and the same attribution in product surfaces like settings or integration dialogs and in your documentation.

And a hard one for AI products: agent products must invoke Genie via MCP, and agent workflows that do not use the Genie MCP will not be validated. If you built an agent that talks to Databricks through a bespoke SQL path, that is a rewrite, not a tweak.

### Documentation is a deliverable, not an afterthought

Partners must provide written documentation that lets a customer connect the product to Databricks, and the framework specifies its contents: prerequisites, the Databricks privileges the connecting user or service principal needs, which authentication types are supported, and step-by-step setup for each supported auth type. PDF is accepted at submission, live docs on your site are preferred.

I would go further and write this document *first*. It forces you to answer "what privileges do we actually need" before you have hard-coded an over-privileged service principal into a demo.

### Product categories change the specifics

Beyond the common requirements, the framework splits Connected ISV guidance into five product categories: Data Engineering and Ingestion, AI Agents and Tools, Business Intelligence, Governance and Observability, and Apps and Dev Tools. Find your category and read its page, because category-specific best practices are additive to the shared requirements, not a substitute.

## Data Collaboration: productizing data instead of shipping software

The Data Collaboration track assumes your data already exists in Databricks and is registered in Unity Catalog. It does not cover upstream ingestion or ETL, which is a useful scoping decision.

Sharing breaks into named patterns:

| Pattern | Direction | Auth | Best for |
| --- | --- | --- | --- |
| **D2D** (Databricks-to-Databricks) | Outbound | Sharing identifier, no token exchange | Customers already on Databricks; richest feature set, all asset types including volumes, notebooks, and models |
| **D2O** (Databricks-to-Open) | Outbound | Bearer tokens or OIDC federation | External platforms, non-Databricks recipients, broad distribution |
| **O2D** (Open-to-Databricks) | Inbound | Lakeflow Connectors and other ingestion | Consuming data from external providers |
| **Bi-directional** | Both | Combination | Data exchanges, hub-and-spoke architectures |

The engineering advice in this track is less about protocols and more about making data usable, and it lands on metadata. Unity Catalog lets you attach table and column descriptions, tags, business terms, and relationships, and the framework ties this directly to AI readiness: when Genie can read complete and accurate metadata, users can query and explore your data in natural language.

That is a real incentive change. Metadata used to be documentation hygiene you did for humans who mostly ignored it. Now it is the interface that determines whether natural-language querying works on your data product. If you share a table with cryptic column names and no descriptions, you have shipped a dataset that AI tooling cannot use well, and your consumers will notice.

Two more operational notes worth acting on: enable [Change Data Feed](https://docs.databricks.com/aws/en/delta/delta-change-data-feed) where incremental reads and automation matter, and plan schema evolution and backward compatibility so your updates do not break consumer workloads. A shared table is an API. Breaking changes behave like breaking changes.

## Built-On ISV: the five-layer application architecture

If Databricks is your backend, the framework expects a specific application shape. For most Built-On products you build an application that sits between your end users and the platform, in five layers:

```text
1. Client Layer        Browser frontend (React, Angular, Vue), renders UI,
                       makes authenticated API requests
2. Authentication      OAuth 2.0 / OIDC with your identity provider,
                       user auth and session management
3. Backend Layer       Server-side API routes, validates sessions, manages
                       tokens, proxies ALL Databricks API calls
4. Data Layer          Application database (PostgreSQL, MySQL): users,
                       organizations, encrypted credentials
5. Databricks          Unity Catalog, SQL Warehouses, DBFS, Jobs, and other
                       services via REST APIs
```

The design goal is stated explicitly: Databricks credentials never reach the client, authentication boundaries are clear, and each layer scales independently.

The load-bearing word there is "all." Every Databricks call is proxied through your backend. It sounds obvious written down, and it is the first thing that gets violated when someone wants a fast dashboard and calls the SQL Warehouse straight from the browser with a token in local storage. If you take one structural rule from the Built-On track, take that one.

Layer 4 is the one people under-plan. You need somewhere to store users, organizations, and encrypted customer credentials, which means you are running an application database alongside Databricks and inheriting all the key-management responsibility that comes with storing customer credentials at rest.

## How to choose a Databricks deployment model

This is the decision the rest of your architecture hangs off. Databricks documents four models.

| Model | Who owns the Databricks environment | What the partner operates | Distinguishing mechanism |
| --- | --- | --- | --- |
| **Partner Hosted (SaaS)** | Partner owns workspaces, compute, storage, pipelines | Everything; customers need no Databricks account | Databricks powers the backend and stays invisible to end users |
| **Hybrid** | Partner-managed control plane, customer-owned data plane | Control plane; customer owns where data lives | Customer-managed VPC (AWS, GCP) or Azure Managed Applications |
| **Side Car** | Partner builds and governs assets centrally in its own workspace | Asset quality, versioning, IP | OpenSharing plus Clean Rooms deliver governed assets to customer environments |
| **Customer Managed** | Customer owns workspace, infrastructure, and data | Nothing at runtime; partner ships software, templates, guidance | Notebooks, Databricks Asset Bundles, Terraform modules, Python packages |

The framework gives five selection criteria, and they are good questions in the order they are asked:

1. **Data residency.** Does the customer's data need to stay in their environment?
2. **Operational capacity.** Do you want to manage infrastructure, or does the customer prefer to?
3. **Customer sophistication.** Does the customer have a platform team capable of managing Databricks?
4. **Regulatory constraints.** Do compliance requirements dictate where data can reside?
5. **Scale and economics.** Which model gives you the best unit economics?

Databricks also notes that many partners offer more than one model, typically Partner Hosted for customers who want simplicity and Hybrid for enterprise customers with data residency or compliance requirements. Treat the models as a product-line decision, not a one-time architectural choice.

Side Car deserves a closer look because it is the least familiar of the four. Partners build and govern assets centrally, then deliver them into customer environments via OpenSharing and Clean Rooms, keeping control of asset quality, versioning, and IP while the customer keeps authority over their data and execution environment. Customers can consume shared datasets from non-Databricks systems and run compute wherever they like, while Databricks centralizes policy enforcement and asset governance. If your value is *the asset* rather than *the application*, this is the model to read twice.

## The deployment model trap: Customer Managed limits your program benefits

Here is the sentence I mentioned at the top. On the [Customer Managed](https://databrickslabs.github.io/partner-architecture/built-on/deployment-models/customer-managed) page, Databricks states:

> Due to limitations in telemetry and application management, program benefits are limited for Customer Managed deployments.

Sit with that for a second, because it connects two things that look unrelated.

The Measurement and Attribution pillar exists so Databricks can observe adoption and attribute joint impact to you. Customer Managed means the customer owns the workspace, the infrastructure, and the runtime. You ship notebooks, Databricks Asset Bundles, Terraform modules, or Python packages, and then you are not in the execution path. There is no product of yours making tagged API calls, because the customer's own workspace is making them.

So the model with the lowest operational burden for you is also the model where attribution is weakest, and attribution is what partner benefits are built on. That is not a hidden penalty, it is a structural consequence, and Databricks documents it.

Now consider what most consulting-built solution accelerators look like. A repo of notebooks, a job definition, a config file, a deployment guide. The customer clones it and runs it in their workspace. That is Customer Managed, by default, without anyone having chosen it.

If you are building an accelerator and you want program benefits, you have three honest options:

- **Accept the tradeoff.** Build Customer Managed because it fits the buyer, and treat the accelerator as a services differentiator and credibility asset rather than a route to partner benefits.
- **Move up a model.** Wrap the same logic in a Partner Hosted or Hybrid application so there is a product in the execution path that can carry a `User-Agent` and be managed and versioned by you.
- **Go Side Car.** If the output is a governed asset (a metric view, a curated dataset, a model), deliver it via OpenSharing so you keep central control of quality and versioning while the customer keeps their data.

What you should not do is build Customer Managed by accident and then be surprised when the attribution story is thin. I would have made a different architectural choice at the start if I had read that page before designing rather than during.

## Firefly Analytics: read the reference implementation, not just the prose

The single most useful resource attached to the PWAF is [Firefly Analytics](https://databrickslabs.github.io/partner-architecture/built-on/firefly), an open-source SaaS application published by Databricks Labs specifically as a PWAF reference implementation. Source is at [github.com/databrickslabs/firefly](https://github.com/databrickslabs/firefly), it runs live at [firefly-analytics.com](https://www.firefly-analytics.com/), and the architecture docs are at [firefly-analytics.com/docs](https://www.firefly-analytics.com/docs/architecture/overview).

Its stack is documented rather than implied:

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query
- **Backend:** Next.js API routes, PostgreSQL with Drizzle ORM, Better-Auth
- **Databricks:** Unity Catalog, SQL Warehouses, DBFS, Volumes, Databricks Apps
- **Deployment:** Vercel for the frontend, Docker, VM, or serverless for the proxy

The patterns it demonstrates map one-to-one onto the framework's abstract guidance: SSO-SPN authentication, Databricks identity handling, workspace-catalog binding for tenant isolation, application-tier auto-scaling, hybrid tenancy, and organization and user onboarding. It also demonstrates six things Built-On partners commonly build, including embedded Databricks Apps via a proxy, notebook and code and SQL editors, a data catalog, and a pipeline editor.

Two ways to use it that are better than reading it start to finish:

**As a diff target.** Pick the one pattern you are least sure about, credential isolation between tenants, say, and read only Firefly's implementation of it. Compare against yours. The gap is your work item.

**As AI context.** The framework explicitly suggests pointing AI tools at Firefly's source, which carries inline comments explaining PWAF principles in context. Combined with the `llms.txt` and `ai-context.txt` files, you can ask concrete questions ("how does Firefly bind an organization to a catalog?") and get answers grounded in working code instead of paraphrased docs.

Do not deploy it as your product. It is a reference implementation provided for learning, with no support commitment beyond documentation and your Databricks partner team.

## Field notes: mapping a real accelerator onto the PWAF

Abstract frameworks get concrete when you run something through them. Here is the accelerator I built at WorldLink Labs, the [Semantic Model Migration Accelerator](https://worldlink-us.ai/partners/databricks/semantic-model-migration), described the way the PWAF would want it described.

**What it does.** Converts Power BI semantic models exported as TMDL into governed Unity Catalog metric views, with deterministic DAX-to-SQL translation, flagged-measure review bundles, and KPI parity validation against the Power BI baseline.

**The pipeline.** Five stages: parse `.tmdl` files for tables, measures, relationships, and partition sources; translate using configurable DAX-to-SQL, format string, and relationship mapping rules; generate metric view YAML plus model summaries and review bundles; deploy by registering metric views as Unity Catalog objects through the SQL Statement Execution API; validate by comparing KPI results against the Power BI baseline and producing reviewer-ready quality reports.

**The numbers.** A moderately complex model takes an engineer 2 to 3 days by hand. Automated conversion runs in under 2 minutes per model. Conservative time savings are 60 to 80 percent versus manual conversion, with internal benchmarks reaching over 95 percent on supported star-schema models. The repo carries 156+ automated tests passing in CI, 23 sample TMDL packs across topologies, and a reference workload migrating 12 measures.

Now the honest PWAF mapping, pillar by pillar.

| Pillar | How the accelerator scored | What I would change |
| --- | --- | --- |
| **Architectural Best Practices** | Strong. Databricks-native throughout: Workflows and Jobs for orchestration, notebooks for the pipeline, Delta Lake as source of truth, Unity Catalog metric views as governed output, Genie and Databricks SQL as consumers. | Little. This is the pillar that is fun and the pillar I over-invested in. |
| **Defined Technical Standards** | Mostly met. Unity Catalog registration is the whole point of the output. Premium or Enterprise workspace, UC enabled, and a SQL Warehouse are documented prerequisites. | Auth was workspace-native rather than a designed OAuth story, because the customer runs it. Under a productized model that becomes a real requirement. |
| **Measurement and Attribution** | Weak, structurally. Notebook-first execution in the customer's workspace means there is no partner product in the call path to carry a `User-Agent`. | This is the one to fix first, and fixing it means changing the deployment model, not adding a config field. |
| **Operations and Lifecycle** | Decent. A repeatable 5-phase delivery framework (Discovery 3 days, Mapping 2, Migration 3, Validation 2, Enablement 1) with runbook, CI/CD, and knowledge transfer handed over at the end. | Version and upgrade documentation for the artifacts themselves, distinct from the engagement runbook. |

Two things I would keep exactly as they are.

**The explicit non-goals.** The accelerator documents what requires additional scope as loudly as what works: Power BI Import-mode models (data must be materialized as Delta first), calculation groups and many-to-many relationships (roadmap), row-level security (reapplied directly in Unity Catalog), and composite models (only DirectQuery portions migrate automatically). Naming the boundary is a credibility feature. Reviewers and customers both trust a scoped tool more than a tool that claims everything.

**Determinism as the supported path.** Optional, bounded Mosaic AI review handles edge cases, but the production path stays deterministic. For a migration tool where the deliverable is numerical parity with an existing report, "the LLM will figure it out" is not a validation story. Parity is measurable, and a >95 percent parity target is a claim you can be held to.

The thing I got wrong was upstream of all of this: I designed a genuinely good Customer Managed solution without registering that Customer Managed is where program benefits are thinnest. The architecture was not the problem. The model selection was made implicitly by the delivery format.

## How to get started with the PWAF

In the order that avoids rework:

1. **Join the Databricks Partner Program.** The framework is public, but co-sell, go-to-market benefits, and validation submissions require active membership via the [Partner Portal](https://partners.databricks.com/).
2. **Take the ISV PWAF training.** It is short, and it gives you the vocabulary and the resource map. The knowledge check needs 80 percent or higher.
3. **Identify your track.** Connected ISV, Data Collaboration, or Built-On. Read your track's requirements page in full before designing anything.
4. **Choose your deployment model explicitly, and write down why.** Use the five criteria. Record the decision with its tradeoffs, including the Customer Managed benefits limitation if that is where you land.
5. **Implement the hard requirements first.** OAuth, Unity Catalog registration, and the programmatic `User-Agent`. These are cheap now and expensive later.
6. **Verify attribution with a query, not a hope.** Run the `system.access.audit` check above and confirm your `User-Agent` shows up.
7. **Read Firefly for the pattern you are least sure about.** Diff its implementation against yours.
8. **Write the customer connection documentation.** Prerequisites, required Databricks privileges, supported auth types, step-by-step setup per auth type.
9. **Produce the pillar-4 artifacts.** Runbook, support boundary, versioning scheme, upgrade path, breaking-change notes.
10. **Ask for architectural review before you submit.** Partner Engineering takes technical questions through a Partner Support request in the Partner Portal. Use that earlier than feels necessary.

## PWAF best practices, and the mistakes that cost the most

**Choose the deployment model before the tech stack.** It determines your attribution ceiling, your operational burden, and which program benefits are even available. Deciding it implicitly through delivery format is the single most expensive mistake in this whole process.

**Treat technical standards as acceptance criteria.** OAuth, Unity Catalog, `User-Agent`, Genie attribution, MCP for agents. Put them in your definition of done, not your backlog.

**Instrument attribution on day one.** It is one string in your connection code path. Retrofitting it across every driver, SDK call, job, and CLI invocation later is tedious and easy to do incompletely.

**Do not let customers configure your telemetry.** The framework prohibits it, and even if it did not, customer-configured telemetry is telemetry you do not have.

**Define the ideal customer profile and the explicit non-goals.** A tool that says "star-schema models with SUM, DISTINCTCOUNT, DIVIDE, AVERAGEX, and time intelligence" is more trustworthy than one that says "any semantic model."

**Make quality measurable.** Parity percentages, test counts, benchmark workloads. "Significantly faster" is not a claim; "under 2 minutes per model versus 2 to 3 days manually" is.

**Write the docs before the demo.** Documenting required privileges first prevents you from quietly building on an over-privileged service principal.

**Build a demo that works on someone else's data.** Bundled reference workloads and multiple sample topologies exist for exactly this reason. A demo that only runs on your dataset is a video, not a solution.

**Keep AI on the optional path when correctness is the deliverable.** Deterministic core, bounded AI assist for edge cases, clearly labelled. This is easier to validate and easier to defend.

**Plan for schema evolution if you share data.** A shared table is an API contract, and CDF plus backward compatibility planning is how you avoid breaking consumers.

## Sources

Everything in this post is drawn from the official framework. If you only open three of these, make them the integration requirements, the deployment models overview, and the Customer Managed page.

| Resource | What it covers |
| --- | --- |
| [PWAF home](https://databrickslabs.github.io/partner-architecture/) | Entry point and the three partner tracks |
| [Introduction and pillars](https://databrickslabs.github.io/partner-architecture/intro) | The four pillars, relationship to cloud WAFs, partner program requirement |
| [Integration requirements](https://databrickslabs.github.io/partner-architecture/isv-partners/integration-requirements) | Mandatory OAuth, Unity Catalog, telemetry, Genie attribution, MCP, docs |
| [Integration patterns](https://databrickslabs.github.io/partner-architecture/isv-partners/integration-patterns) | ODBC, JDBC, Node.js, Golang drivers, SDKs, CLI and DABs, REST APIs |
| [Telemetry and attribution](https://databrickslabs.github.io/partner-architecture/isv-partners/telemetry-attribution) | `User-Agent` format rules and how to verify with Query History and audit tables |
| [Product categories](https://databrickslabs.github.io/partner-architecture/isv-partners/product-categories) | Category-specific requirements for data engineering, AI, BI, governance, apps |
| [Data collaboration](https://databrickslabs.github.io/partner-architecture/data-collaboration) | Scope and prerequisites for data providers |
| [Sharing patterns](https://databrickslabs.github.io/partner-architecture/data-collaboration/sharing-patterns) | D2D, D2O, O2D, and bi-directional sharing |
| [Data as a product](https://databrickslabs.github.io/partner-architecture/data-collaboration/data-products) | Unity Catalog layout, metadata and AI readiness, Change Data Feed |
| [Deployment models](https://databrickslabs.github.io/partner-architecture/built-on/deployment-models) | The four models, five selection criteria, five-layer app architecture |
| [Customer Managed](https://databrickslabs.github.io/partner-architecture/built-on/deployment-models/customer-managed) | What partners provide, packaging, support boundaries, benefits limitation |
| [Side Car](https://databrickslabs.github.io/partner-architecture/built-on/deployment-models/side-car) | OpenSharing and Clean Rooms federated delivery, cost model |
| [Firefly Analytics](https://databrickslabs.github.io/partner-architecture/built-on/firefly) | Patterns demonstrated, tech stack, how to get started |
| [Firefly source](https://github.com/databrickslabs/firefly) | Working implementation you can read and diff against |
| [Firefly architecture docs](https://www.firefly-analytics.com/docs/architecture/overview) | Per-layer responsibilities, security, scalability, request flow |
| [AI-ready documentation](https://databrickslabs.github.io/partner-architecture/ai-ready) | `llms.txt` and `ai-context.txt` files and AI-assisted workflows |
| [Databricks Partner Portal](https://partners.databricks.com/) | Program application, validation submissions, Partner Support |
| [ISV PWAF training credential](https://www.credential.net/4133c666-6e3d-4584-8eeb-4a199ee6d517) | Verification for the badge above |

## Related reading

If you want the platform context these partner patterns sit on top of, my breakdown of [Databricks Data + AI Summit 2026](../databricks-data-ai-summit-2026/) covers Genie, Unity Catalog semantics, and metric views in depth, which is most of what the PWAF assumes you already understand.

If you are building an accelerator right now, do one thing before you write more code: open the deployment models page, pick your model deliberately, and write down the tradeoff you are accepting. That paragraph is worth more than the next week of implementation.
