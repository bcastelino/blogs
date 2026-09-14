---
title: "ChicagoPulse Won Gold in the Databricks Genie App Challenge"
seoTitle: "ChicagoPulse Wins the Databricks Genie App Challenge"
metaDescription: "See how ChicagoPulse won Gold by combining Databricks Genie, governed metric views, civic data, evaluation, and visible evidence behind every answer."
date: 2026-09-13
excerpt: "ChicagoPulse won Gold in the Databricks Genie-Powered App Challenge. Here is how governed metrics, evaluation, and visible evidence turned a civic-data chatbot into an app people can inspect and trust."
tags: [databricks, databricks-genie, ai-engineering, data-engineering]
author: Brian Castelino
authorUrl: https://www.linkedin.com/in/cas7elino/
hidden: true
noindex: true
takeaways:
  - "**A good Genie app starts below the chat box.** ChicagoPulse grounds answers in Unity Catalog Metric Views built from four official City of Chicago datasets."
  - "**Trust needs a product surface.** Generated SQL, source provenance, completed-month reporting, explicit missing-data states, and pipeline health make the evidence inspectable."
  - "**Evaluation is part of the architecture.** A 30-question benchmark tests basic metrics, neighborhood comparisons, time trends, cross-dataset reasoning, and data freshness."
  - "**Constrain the app on purpose.** The browser cannot submit arbitrary SQL or select Databricks resources; those choices remain behind a FastAPI boundary."
faq:
  - question: "What is ChicagoPulse?"
    answer: "ChicagoPulse is a Databricks App that turns four governed City of Chicago open datasets into plain-language answers, neighborhood comparisons, maps, and data-health signals. It covers all 77 official Community Areas and exposes the evidence behind its answers, including generated SQL and source provenance."
  - question: "What is a Databricks Genie space?"
    answer: "A Databricks Genie space is a governed natural-language analytics environment configured with trusted data, metadata, instructions, and example queries. Users ask questions in ordinary language, and Genie generates and runs SQL against the data available to that space."
  - question: "How do you make a Databricks Genie app trustworthy?"
    answer: "Ground Genie in governed semantic definitions, test representative questions against verified SQL, expose provenance, separate data freshness from pipeline success, and state limitations clearly. ChicagoPulse applies these practices through Unity Catalog Metric Views, a 30-question benchmark, generated-SQL views, and a dedicated Data Health surface."
  - question: "How does ChicagoPulse make text-to-SQL safer?"
    answer: "Genie handles governed natural-language analysis, while the rest of the app uses allowlisted, parameterized server-side query templates. The browser cannot submit arbitrary SQL, choose a Genie space or warehouse, or provide job parameters. The deployed app authenticates through its dedicated service principal and explicit resource bindings."
---

ChicagoPulse won **Gold and first place in Track A, Real World Problem Solving**, in the 2026 [Databricks Community Genie-Powered App Challenge](https://community.databricks.com/t5/learning-events/databricks-community-contest-genie-powered-app-challenge/ev-p/165825). The project scored **35.7 points**, finished as the top Track A entry, and was selected for a BrickTalk spotlight.

The medal matters to me. The more useful story for an engineer, though, is what sat behind the demo: governed metrics, a real data pipeline, a 30-question evaluation suite, constrained server APIs, and product decisions that let a user inspect why an AI-generated answer should be trusted.

<img src="/posts/genie-app-gold-win.jpg" alt="Databricks Community Contest graphic naming Brian Denis Castelino and ChicagoPulse as the Gold winner in Track A with 35.7 points" style="display:block;width:100%;margin:2rem 0;border-radius:12px;" />

## What ChicagoPulse does with Databricks Genie

**ChicagoPulse is a Databricks App that turns governed City of Chicago open data into plain-language answers, neighborhood comparisons, maps, and transparent data-health signals.** It is built for residents, community organizations, and civic-data practitioners who want local context without first learning Socrata APIs, SQL, or the structure of several municipal datasets.

The app has three connected surfaces:

1. **Ask ChicagoPulse** answers natural-language questions through Databricks Genie. A user can inspect the generated SQL, chart or table, source identifiers, request provenance, and suggested follow-up questions.
2. **Neighborhood Pulse** covers all **77 official Chicago Community Areas**, with a choropleth, completed-month metrics, 12-month trends, and comparisons for up to four areas.
3. **Data Health** shows whether the pipeline actually completed, when each source was ingested, what period the app reports, and how much source data is available.

<img src="/posts/chicagopulse-hero.png" alt="ChicagoPulse interface showing the Chicago skyline and entry points for Ask ChicagoPulse, Neighborhood Pulse, and Data Health" style="display:block;width:100%;margin:2rem 0;border-radius:12px;" />

ChicagoPulse currently models four official City datasets:

| Signal in ChicagoPulse | Official City of Chicago dataset |
| --- | --- |
| Service demand | [311 Service Requests](https://data.cityofchicago.org/d/v6vf-nfxy) |
| Business activity | [Business Licenses](https://data.cityofchicago.org/d/r5kz-chrr) |
| Development activity | [Building Permits](https://data.cityofchicago.org/d/ydr8-5enu) |
| Property conditions | [Building Violations](https://data.cityofchicago.org/d/22u3-xenr) |

The product question was never merely, "Can Genie answer a question?" The harder question was, "Can someone understand the answer, inspect its evidence, and decide whether the underlying data is current enough for their purpose?"

## A civic-data chatbot is not enough

City open-data portals contain valuable records, but access is not the same as usability. A resident asking how 311 demand changed in Austin should not need to discover the correct dataset, decode its columns, learn Chicago's Community Area identifiers, choose a complete reporting period, and write a defensible aggregation before seeing an answer.

Natural-language querying removes much of that friction. It also creates a new failure mode: a fluent answer can hide the wrong metric, an incomplete month, stale data, or a plausible query built at the wrong grain.

That is especially uncomfortable in a civic context. ChicagoPulse is not emergency, legal, or policy decision support, but the product still needs to show its work. I treated evidence as part of the interface, not as an implementation detail buried in logs.

## The architecture behind the chat box

The deployed frontend and API run together as a Databricks App. React and TypeScript provide the interface, while FastAPI is the normalization and security boundary between the browser and Databricks services.

<svg role="img" aria-label="ChicagoPulse architecture diagram" viewBox="0 0 720 560" style="display:block;width:100%;max-width:720px;height:auto;margin:1.5rem auto;background:var(--color-fill-1);border:1px solid var(--color-border);border-radius:12px;" xmlns="http://www.w3.org/2000/svg">
  <title>ChicagoPulse data and application architecture</title>
  <desc>Flow from City of Chicago Socrata APIs through Bronze, Silver, and Gold tables to Unity Catalog Metric Views, then through the React and FastAPI app to Databricks Genie, SQL Warehouse, and Jobs APIs.</desc>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-text-muted)"/>
    </marker>
    <marker id="arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-accent)"/>
    </marker>
  </defs>

  <rect x="10" y="10" width="700" height="540" rx="12" fill="var(--color-fill-0)" stroke="var(--color-border)" stroke-width="1"/>

  <text x="360" y="44" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="15" font-weight="650" fill="var(--color-text-secondary)">ChicagoPulse architecture</text>

  <rect x="245" y="70" width="230" height="36" rx="18" fill="color-mix(in oklab, var(--color-accent) 8%, var(--color-fill-0))" stroke="color-mix(in oklab, var(--color-accent) 32%, var(--color-border))" stroke-width="1"/>
  <text x="360" y="94" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="12" font-weight="600" fill="var(--color-text-primary)">City of Chicago Socrata APIs</text>

  <line x1="360" y1="106" x2="360" y2="126" stroke="var(--color-text-muted)" stroke-width="1.5" marker-end="url(#arrow)"/>

  <rect x="70" y="136" width="170" height="44" rx="10" fill="var(--color-fill-1)" stroke="var(--color-border)" stroke-width="1"/>
  <text x="155" y="158" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="var(--color-text-primary)">Bronze</text>
  <text x="155" y="174" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="11" fill="var(--color-text-muted)">ingestion</text>

  <rect x="275" y="136" width="170" height="44" rx="10" fill="var(--color-fill-1)" stroke="var(--color-border)" stroke-width="1"/>
  <text x="360" y="158" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="var(--color-text-primary)">Silver</text>
  <text x="360" y="174" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="11" fill="var(--color-text-muted)">transformations</text>

  <rect x="480" y="136" width="170" height="44" rx="10" fill="var(--color-fill-1)" stroke="var(--color-border)" stroke-width="1"/>
  <text x="565" y="158" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="var(--color-text-primary)">Gold</text>
  <text x="565" y="174" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="11" fill="var(--color-text-muted)">semantic tables</text>

  <line x1="240" y1="158" x2="275" y2="158" stroke="var(--color-text-muted)" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="445" y1="158" x2="480" y2="158" stroke="var(--color-text-muted)" stroke-width="1.5" marker-end="url(#arrow)"/>

  <line x1="565" y1="180" x2="565" y2="216" stroke="var(--color-text-muted)" stroke-width="1.5" marker-end="url(#arrow)"/>

  <rect x="410" y="224" width="310" height="50" rx="10" fill="var(--color-fill-2)" stroke="var(--color-border)" stroke-width="1"/>
  <text x="565" y="247" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="13" font-weight="650" fill="var(--color-text-primary)">Unity Catalog</text>
  <text x="565" y="264" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="11" fill="var(--color-text-muted)">Metric Views</text>

  <line x1="360" y1="180" x2="360" y2="324" stroke="var(--color-text-muted)" stroke-width="1.5" stroke-dasharray="4 4" marker-end="url(#arrow)"/>
  <text x="367" y="286" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="11" fill="var(--color-text-muted)">Daily validation</text>
  <circle cx="360" cy="324" r="4" fill="var(--color-text-muted)"/>

  <line x1="565" y1="274" x2="565" y2="304" stroke="var(--color-text-muted)" stroke-width="1.5" marker-end="url(#arrow)"/>

  <rect x="195" y="320" width="150" height="40" rx="10" fill="var(--color-fill-1)" stroke="var(--color-border)" stroke-width="1"/>
  <text x="270" y="345" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="var(--color-text-primary)">React + TypeScript</text>

  <rect x="405" y="320" width="120" height="40" rx="10" fill="var(--color-fill-2)" stroke="var(--color-border)" stroke-width="1"/>
  <text x="465" y="345" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="11" fill="var(--color-text-primary)">/api/*</text>

  <rect x="575" y="320" width="125" height="40" rx="10" fill="color-mix(in oklab, var(--color-accent) 8%, var(--color-fill-0))" stroke="color-mix(in oklab, var(--color-accent) 32%, var(--color-border))" stroke-width="1"/>
  <text x="637" y="345" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="var(--color-text-primary)">FastAPI</text>

  <line x1="345" y1="340" x2="405" y2="340" stroke="var(--color-text-muted)" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="525" y1="340" x2="575" y2="340" stroke="var(--color-text-muted)" stroke-width="1.5" marker-end="url(#arrow)"/>

  <line x1="637" y1="360" x2="637" y2="390" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#arrow-accent)"/>

  <rect x="260" y="400" width="130" height="32" rx="8" fill="var(--color-fill-1)" stroke="var(--color-border)" stroke-width="1"/>
  <text x="325" y="420" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="11" fill="var(--color-text-primary)">Genie Conversation</text>

  <rect x="405" y="400" width="120" height="32" rx="8" fill="var(--color-fill-1)" stroke="var(--color-border)" stroke-width="1"/>
  <text x="465" y="420" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="11" fill="var(--color-text-primary)">Genie Feedback</text>

  <rect x="540" y="400" width="115" height="32" rx="8" fill="var(--color-fill-1)" stroke="var(--color-border)" stroke-width="1"/>
  <text x="597" y="420" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="11" fill="var(--color-text-primary)">SQL Warehouse</text>

  <rect x="50" y="400" width="90" height="32" rx="8" fill="var(--color-fill-1)" stroke="var(--color-border)" stroke-width="1"/>
  <text x="95" y="420" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="11" fill="var(--color-text-primary)">Jobs API</text>

  <line x1="95" y1="400" x2="95" y2="382" stroke="var(--color-text-muted)" stroke-width="1.5"/>
  <line x1="95" y1="382" x2="637" y2="382" stroke="var(--color-text-muted)" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="637" y1="382" x2="637" y2="390" stroke="var(--color-text-muted)" stroke-width="1.5" marker-end="url(#arrow)"/>

  <line x1="325" y1="400" x2="325" y2="390" stroke="var(--color-text-muted)" stroke-width="1.5"/>
  <line x1="465" y1="400" x2="465" y2="390" stroke="var(--color-text-muted)" stroke-width="1.5"/>
  <line x1="597" y1="400" x2="597" y2="390" stroke="var(--color-text-muted)" stroke-width="1.5"/>

  <line x1="637" y1="432" x2="637" y2="476" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#arrow-accent)"/>

  <rect x="255" y="484" width="210" height="44" rx="10" fill="color-mix(in oklab, var(--color-accent) 12%, var(--color-fill-0))" stroke="var(--color-accent)" stroke-width="1.5"/>
  <text x="360" y="511" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="13" font-weight="650" fill="var(--color-text-primary)">workspace.chicagopulse</text>

  <text x="360" y="545" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="11" fill="var(--color-text-muted)">React + TypeScript, FastAPI, Genie, SQL Warehouse, and Jobs API all run as one Databricks App</text>
</svg>

The data layer is more than a collection of uploaded CSV files. Fifteen notebooks cover setup, Bronze ingestion, Silver transformations, Gold metrics, spatial enrichment, semantic-base construction, Unity Catalog Metric Views, incremental refresh, and validation. The daily workflow has explicit ingestion, transformation, and validation stages.

That separation matters. Genie should reason over defined business measures, not infer metric semantics from raw operational columns on every question. ChicagoPulse Metric Views expose measures such as total 311 requests, open building violations, permit fees, and month-over-month change with governed dimensions for month and Community Area.

The app then binds three Databricks resources at deployment time: a Genie space, a SQL Warehouse, and the daily refresh job. It authenticates as a dedicated app service principal instead of putting a personal token or resource credential in browser code.

## Why the browser cannot send arbitrary SQL

One of my most important choices was to make ChicagoPulse deliberately less flexible.

Genie owns the natural-language analytical conversation inside its governed space. The app's other data endpoints, such as neighborhood maps, comparisons, and Data Health, do **not** accept arbitrary SQL from the browser. FastAPI maps those requests to allowlisted, parameterized query templates. Resource selection also stays on the server, so a client cannot choose a different Genie space, warehouse, job, notebook path, or set of job parameters.

| Approach | Flexibility | Risk and operational cost |
| --- | --- | --- |
| Browser submits arbitrary SQL | Highest | Expands the query and authorization surface; harder to validate and govern |
| Backend accepts user-selected resources | High | Lets clients reach unintended spaces, warehouses, or jobs unless every path is verified |
| Allowlisted server templates | Lower | Predictable query shapes, bounded parameters, testable API contracts |
| Governed Genie space for NLQ | Focused | Flexible questions within configured data, instructions, semantics, and permissions |

The trade-off is real. A user cannot turn the neighborhood endpoint into a general-purpose analytics API. I accepted that constraint because the route has a specific product job. It should return a neighborhood pulse, not execute whatever SQL arrives over HTTP.

This split also made the public API simpler. Raw Databricks payloads and state messages are normalized before they reach the browser. Empty, failed, cancelled, and expired Genie messages become explicit application states. Upstream errors do not leak credentials or internal payloads.

## A 30-question benchmark keeps Genie changes honest

A polished demo question proves very little. It usually proves that someone tested the demo question.

ChicagoPulse has a **30-question Genie benchmark** with verified SQL. The questions are grouped across six categories:

- basic metrics;
- neighborhood comparisons;
- 311 drilldowns;
- time trends;
- cross-dataset reasoning; and
- freshness and coverage.

The suite ranges from straightforward prompts such as "How many 311 requests were recorded across Chicago in the last completed month?" to cross-dataset questions such as identifying Community Areas where 311 requests and building violations both rose by more than 10 percent.

The benchmark is part of the maintenance loop. Answer feedback does not automatically retrain Genie or mutate its instructions. Instead, maintainers review recurring feedback, verify proposed corrections against governed data, turn proven patterns into instructions or verified SQL examples, and run the benchmark before and after the change.

That process is slower than feeding every negative rating directly back into the system. It is also auditable. User feedback is evidence to investigate, not ground truth by default.

## Data Health makes trust visible

Many data products display a recent timestamp and call the pipeline healthy. ChicagoPulse does not infer end-to-end success from `MAX(_ingested_at)`.

An ingestion timestamp answers one question: when did records last arrive? It does not prove that transformations completed, Gold tables were rebuilt, semantic views remained valid, or quality checks passed. Data Health therefore separates **source freshness** from **pipeline success**.

The surface shows the last successful refresh, latest completed reporting month, source coverage, row counts, ingestion timestamps, and links back to the official City datasets. A maintainer can explicitly start the one bound refresh job after a confirmation step, then inspect the real Jobs API state for ingestion, transformation, and validation. The interface never fabricates progress.

Two smaller display rules prevent surprisingly large analytical errors:

- Neighborhood metrics use only **fully completed calendar months**, so a partial current month is not compared with a full prior month.
- Missing source coverage renders as **N/A**, not zero. Zero is a measured result; unavailable means the app does not have enough evidence to make that claim.

These details are not visually dramatic. They are the details that determine whether someone misreads the chart.

## The hardest problems were semantic, spatial, and operational

The chat interface was not the hardest part of ChicagoPulse.

**Time semantics were harder than they looked.** "Latest" is ambiguous when a source is updated during the current month. I standardized the product on the latest completed month for neighborhood metrics and made the reporting period visible.

**Geography needed explicit enrichment.** City records do not all arrive with equally usable Community Area fields. The pipeline includes official Community Area boundaries and spatial enrichment for building violations so that neighborhood comparisons share a common geographic vocabulary.

**Genie is asynchronous.** A conversation response can be pending, complete, empty, failed, cancelled, or expired. The FastAPI layer normalizes those states so the React app has a stable contract instead of coupling every component to upstream response shapes.

**Free Edition forced useful discipline.** The production snapshot runs on Databricks Apps Free Edition, where access to the live app may require permission in the connected Databricks account. That constraint reinforced the need for deterministic mock providers, local lifecycle testing, and a production fail-closed rule that refuses to start when mock mode is enabled.

None of those choices appears in a screenshot of a successful answer. Together, they are most of the reason I trust the screenshot.

## What ChicagoPulse does not claim

ChicagoPulse summarizes public administrative data for neighborhood-level exploration. It is not real-time, address-level, emergency, legal, or policy decision support. Source records can be revised by the City, and the live experience may require Databricks account permission.

The Data Health catalog identifies food inspections, crimes, traffic crashes, and affordable rental housing developments as possible future sources. They are visibly marked as future scope. They are not currently ingested, modeled, or available to Genie.

That distinction is intentional. A roadmap label must not look like current data coverage.

## What winning changed for me

The contest result validated more than a UI or a single Genie response. It rewarded the whole path from source records to a governed semantic layer, from a natural-language question to inspectable SQL, and from an ingestion timestamp to evidence that a pipeline actually completed.

If I were starting again, I would define the benchmark categories and trust states before polishing the interface. Evaluation questions expose semantic gaps early. Explicit states expose product ambiguity early. Both are cheaper to address before users build expectations around the happy path.

I would also preserve the boundary between conversational flexibility and deterministic application queries. It is tempting to route every data interaction through one AI interface. ChicagoPulse is better because it does not. Genie handles open-ended questions over governed semantics; fixed product journeys use constrained APIs.

The Gold banner is the visible outcome. The reusable lesson is less glamorous: a Genie-powered app becomes credible when governance, evaluation, provenance, and operational truth are designed into the product from the start.

## Try ChicagoPulse and inspect the evidence

- Read the official [Databricks Community winners announcement](https://community.databricks.com/t5/announcements/databricks-community-contest-winners-of-the-genie-powered-app/td-p/168246).
- Open [ChicagoPulse on Databricks Apps](https://chicagopulse-7474647819672339.aws.databricksapps.com). Access may require permission in the connected Databricks account.
- Explore the four official City datasets linked above and compare their raw structure with the questions the app supports.
- Review the [ChicagoPulse source code on GitHub](https://github.com/bcastelino/genie-chicago-pulse) for the full React, FastAPI, and Databricks pipeline notebooks.
- [Coming Soon: ChicagoPulse demo video URL.]

If you are building with Databricks Genie, start your next design review below the chat box. Ask what defines each measure, which questions form the regression suite, what evidence a user can inspect, and how the interface distinguishes stale, missing, partial, and failed data. Those answers will matter long after the demo ends.
