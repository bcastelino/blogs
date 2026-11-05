---
title: "Enterprise AI Agent Security: An Honest Review of the Field Guide to Bounded AI Autonomy"
seoTitle: "Enterprise AI Agent Security by Thomas De Vos: Review"
metaDescription: "An honest review of Thomas De Vos's Enterprise AI Agent Security: delegated authority, OBO identity, MCP security, AgentSecOps, and where it falls short."
date: 2026-11-05
excerpt: "An honest review of Enterprise AI Agent Security by Thomas De Vos (Packt). A field guide that treats every AI agent as a new, highly privileged employee, and the most operational agent-security book I have read."
tags: [book-review, ai-engineering, ai-security]
author: Brian Castelino
authorUrl: https://www.linkedin.com/in/cas7elino/
hidden: true
takeaways:
  - "**Authority, not answers, is the risk.** Every agent claims four delegated authorities on the user's behalf (read, plan, act, and remember), and the book's central rule is that their risk multiplies rather than adds."
  - "**The model does not bound the blast radius.** Tools, memory, and retrieval do. The controls that matter sit outside the model: delegated identity, a default-deny capability boundary, pinned MCP manifests, and a policy engine that fails closed."
  - "**Written for the person who signs off.** Risk tiers, named owners, approval paths, evals as release gates, incident response, and a production readiness checklist turn agent security into evidence someone can audit."
  - "**Rating: 4.5/5.** The most operational agent-security book I have read. Expect a financial-services lens, illustrative code that needs fixing before use, and thin regulatory mapping."
faq:
  - question: "What is Enterprise AI Agent Security about?"
    answer: "It is a roughly 310-page, 21-chapter field guide by Thomas De Vos (Packt, October 2026) on securing AI agents that read data, call tools, and change state in enterprise systems. It covers the agentic risk model, a seven-layer reference architecture, MCP security, delegated identity, tool-call controls, evals, observability, secure RAG, coding agents, policy as code, incident response, and a production readiness checklist."
  - question: "What are the four delegated authorities in the book?"
    answer: "Read (what the agent can see), plan (what it decides to do next), act (what state it can change), and remember (what it keeps across turns and sessions). The book argues that most agent failures trace back to one of these being assumed rather than explicitly granted, and that risk multiplies across them instead of adding up."
  - question: "How does the book recommend securing MCP servers and tool calls?"
    answer: "It treats MCP as an interface, not a security protocol. Tool manifests are handled like code: allowlist tool names, pin hashes of descriptions and schemas, scan descriptions for instruction-like text, mirror servers internally, and verify signatures. Every tool call goes through one dispatcher that checks identity, scope, and context, with approval, idempotency, and compensation for high-risk tools."
  - question: "Is Enterprise AI Agent Security only for financial services?"
    answer: "No, but financial services is the default lens. Almost every worked example comes from banking, led by a sanctions screening copilot. The preface gives rules for scaling the controls down outside regulated settings: keep the architecture, relax the artefacts, tier each agent honestly, and re-tier whenever its tools, data, or users change."
  - question: "What is the main weakness of the book?"
    answer: "Three things. Several code listings in the review copy would not run as printed, the regulatory mapping is thin for a governance book (no EU AI Act, OWASP only as a scanner rule pack), and a seven-layer architecture is explained almost entirely in prose. The financial-services focus will also feel heavy for unregulated teams."
---

Most agent-security advice still treats the model as the thing to secure. *Enterprise AI Agent Security* by Thomas De Vos starts from the opposite premise: "The model is the least reliable component, and you build everything else around that fact."

To be upfront about what this review is: I read the book cover to cover, then held two real systems up against it. One is [ChicagoPulse](../genie-app-wins-databricks-challenge/), my public Databricks Genie app, which I checked against its source code rather than my memory. The other is the agent setups I use at work, which I will keep generic. So this reviews the ideas, and also what they exposed in my own work.

The short version: this is the book I wish existed before I first wired an agent to anything with write access. It is opinionated, specific, and unusually honest about where its own controls stop working.

<div style="display:flex;flex-wrap:wrap;gap:1.75rem;align-items:center;margin:2rem 0;padding:1.5rem;border:1px solid var(--color-border);border-radius:16px;background:var(--color-fill-1);box-shadow:var(--shadow-card);">
<a href="https://www.amazon.com/dp/1808828658" target="_blank" rel="noopener" style="flex:0 0 auto;">
<img src="https://images-na.ssl-images-amazon.com/images/P/1808828658.01.L.jpg" alt="Cover of Enterprise AI Agent Security by Thomas De Vos, published by Packt" width="160" style="display:block;width:160px;border-radius:10px;margin:0;box-shadow:var(--shadow-card);" />
</a>
<div style="flex:1;min-width:250px;">
<div style="display:flex;align-items:center;gap:.6rem;margin-bottom:.6rem;"><span style="position:relative;display:inline-block;font-size:1.25rem;letter-spacing:2px;line-height:1;"><span style="color:var(--color-text-muted);opacity:.35;">★★★★★</span><span style="position:absolute;top:0;left:0;width:90%;overflow:hidden;white-space:nowrap;color:var(--ios-orange);">★★★★★</span></span><strong style="font-size:1.05rem;">4.5 / 5</strong></div>
<p style="margin:0 0 1rem;"><strong>Quick verdict:</strong> <em>Enterprise AI Agent Security</em> is a field guide to bounded autonomy: agents that can act, prove what they did, stay inside policy, and fail safely. Its real subject is delegated authority, not model safety. Best for engineers, architects, and risk owners who have to sign off on an agent that touches real systems.</p>
<div style="display:flex;flex-wrap:wrap;gap:1rem;font-size:.9rem;align-items:stretch;">
<div style="display:flex;flex-direction:column;gap:.15rem;flex:1 1 0;min-width:0;"><span style="color:var(--color-text-muted);font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;">Author</span>Thomas De Vos</div>
<div style="display:flex;flex-direction:column;gap:.15rem;flex:1 1 0;min-width:0;"><span style="color:var(--color-text-muted);font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;">Publisher</span>Packt (2026)</div>
<div style="display:flex;flex-direction:column;gap:.15rem;flex:1 1 0;min-width:0;"><span style="color:var(--color-text-muted);font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;">Length</span>~310 pages · 21 chapters</div>
<div style="display:flex;flex-direction:column;gap:.15rem;flex:1 1 0;min-width:0;"><span style="color:var(--color-text-muted);font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;">Format</span>Book + GitHub repo</div>
</div>
</div>
</div>

## What is Enterprise AI Agent Security?

*Enterprise AI Agent Security* (Packt, October 2026) is a roughly 310-page, 21-chapter field guide to putting AI agents into production when they can read sensitive data, call tools, and change state. It treats agent security as one operating discipline, spanning delegated identity, MCP and tool-call controls, evals, observability, secure RAG, policy as code, incident response, and audit evidence.

The author, [Thomas De Vos](https://www.linkedin.com/in/thomasdevos), is a Director at HCLTech AI Labs and its Global Financial Services AI Lead. He writes that he has been shipping software for about twenty-five years and building AI systems for about eleven, mostly in financial services, "where if your system makes a mistake, somebody will eventually file a complaint or a fine."

A note on the name: the review copy I read was titled *Securing Enterprise AI Agents: A Field Guide to Bounded AI Autonomy, AgentSecOps, and MCP Security*, which is also how an earlier Leanpub edition was sold. The Packt edition is *Enterprise AI Agent Security: A Practical Guide to MCP Security, Prompt Injection Defense, RAG Security, and Agentic AI Governance*. Same book, same 21 chapters.

The preface names four readers: the engineer whose demo now has to face customers, the architect triaging agent proposals, the security or risk lead asked to sign off on something they cannot fully see, and the engineering director deciding where platform money goes. It also gives three rules for scaling the controls down outside regulated settings, starting with the most useful: keep the architecture, relax the artefacts. The seven layers, delegated identity, the policy gate, and per-turn traces are cheap to design in and expensive to retrofit; the formal threat model and multi-party approval record can be lighter for low-stakes agents.

## The thesis: treat an AI agent like a new, highly privileged employee

The whole book hangs off one framing in the preface.

<div style="margin:1.5rem 0;padding:1.15rem 1.4rem;border-left:4px solid var(--color-accent);border-radius:0 12px 12px 0;background:var(--color-accent-soft);font-size:1.12rem;line-height:1.55;"><strong>An AI agent is a new, highly privileged employee. You would not give a new joiner unsupervised production access on day one, or let them act on customer accounts without identity, authorisation, audit, supervision, and a performance review. Agents need the same.</strong></div>

Chapter 1 turns that into vocabulary. Chatbots talk, copilots suggest, and agents act. Every agent quietly claims four delegated authorities on behalf of its user:

- **Read:** everything it can see, summed across every tool, retrieval source, and memory record.
- **Plan:** the model picks the tool, the arguments, and the order. This is where injection lives, because a PDF does not have to compromise the model to change the plan.
- **Act:** every write, message, ticket, trade, or commit is a side effect that may not be reversible.
- **Remember:** memory carries data and instructions across sessions, which the author calls "probably the most dangerous" of the four.

The rule that follows is the one I now repeat to anyone designing an agent: "Risk increases multiplicatively across the four delegated authorities, not additively." An agent that can read customer data and act on customer accounts can do more harm than either authority alone, and memory amplifies both.

Chapter 4 adds the design heuristic that goes with it, the blast radius rule. The blast radius of an agent is bounded by the union of capabilities at the tool, memory, and retrieval layers. The model does not bound it, the policy layer reduces it, and observability does not change it. So when someone answers "what is the worst this agent can do?" with "the model would not do that," they have not answered the question.

## Why the structure is the argument

Each of the six parts adds one layer to the discipline:

- **Part I, Chapters 1 to 3:** the risk model. The four authorities, eight production failure modes, and an operating model built on three owners (business, technical, risk) and four risk tiers.
- **Part II, Chapters 4 to 7:** the architecture core. Seven layers (model, tool, memory, retrieval, policy, evaluation, observability) with a trust boundary between each, then MCP, identity, and tool-call security.
- **Part III, Chapters 8 to 10:** evals as the new test suite, trace-per-turn observability with replay, and agent reliability engineering, including cost as a security vector.
- **Part IV, Chapters 11 to 13:** RAG as an attack surface, production RAG architecture, and knowledge governance.
- **Part V, Chapters 14 to 16:** coding agents in professional teams, security boundaries for AI coding, and a seven-gate track from vibe coding to governed delivery.
- **Part VI, Chapters 17 to 21:** deployment patterns, policy as code in Rego and Cedar, incident response, a unified AgentSecOps architecture, and the production readiness checklist.

The author is explicit that Part I is "the why" and everything after it is mechanism. If you are short on time, he recommends the chapter summaries, Chapter 20, and Chapter 21. I would add Chapter 6, because the identity chapter is where most of the real design work sits.

## The ideas that stuck with me

These are the parts I expect to keep reusing.

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:1rem;margin:1.5rem 0;">
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">A token without an actor is fatal.</strong><span style="color:var(--color-text-secondary);">Chapter 6 restates the Confused Deputy problem for agents and fixes it with OAuth token exchange (RFC 8693). The agent gets a short-lived token carrying the user (<code>sub</code>), the agent and its version (<code>act</code>), a task ID, and narrowed scopes. An MCP server that receives a bare user token rejects it.</span></div>
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">MCP is not a security protocol.</strong><span style="color:var(--color-text-secondary);">Chapter 5 is blunt: a tool described in MCP is exactly as safe as the wrapper around it. Tool descriptions are an injection surface, and the chapter catalogues tool poisoning, schema metadata abuse, name spoofing, shadowing, and rug-pulls. The defence is to treat manifests as code: allowlist, pin hashes, sign, and scan.</span></div>
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">Human review has an error rate.</strong><span style="color:var(--color-text-secondary);">Human-in-the-loop is a control, not a fallback, and its reliability falls with volume. A reviewer looking at three requests a day reads them; a reviewer looking at fifty clicks approve, while the audit trail still shows a named human on every call. Keeping high-risk tools rare is what keeps approval meaningful.</span></div>
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">The agent that should not have been an agent.</strong><span style="color:var(--color-text-secondary);">Chapter 3 includes a case where a well-governed routing agent turned out to be 95 percent decision table. The team replaced it with a parser, code, and human escalation, and latency, cost, testability, and audit all improved. The test I keep: if the model returned a constant, how much value would remain?</span></div>
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">Cost is a security signal.</strong><span style="color:var(--color-text-secondary);">The most expensive incident the author describes was a pull-request review agent that spawned sub-agents per file and per function: about fourteen thousand model calls in eight hours, with no budget alert. Chapter 10 reframes this as algorithmic denial of service, with step, cost, and wall-clock caps that fail closed.</span></div>
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">Automate the reductive, never the expansive.</strong><span style="color:var(--color-text-secondary);">Chapter 20's rule for auto-remediation: dropping a capability, quarantining a document, revoking a token, or rolling back to a known-good prompt can be automatic. Adding a capability, editing content, minting a credential, or loosening a threshold cannot. Every automatic action still pages a human.</span></div>
</div>

Two lines capture the book's tone:

<blockquote style="margin:1.75rem 0;padding:1.4rem 1.6rem;border-left:4px solid var(--color-accent);background:var(--color-fill-1);border-radius:0 14px 14px 0;font-style:italic;font-size:1.12rem;line-height:1.6;">"The future of enterprise AI is not maximum autonomy. It is bounded autonomy with security, governance, and evidence built into the operating model."<br><br>"A book that only ever argues for more governance is a book written by someone selling governance."</blockquote>

That second line introduces the decision-table case above, and it is why I trust the rest of the book. It also credits its sources carefully. The author attributes the "AgentSecOps," "Autonomous Attack Simulation," and "Agent Contract" names to Straiker, and marks the frameworks he coined himself as his own.

## Tiering my own Genie app with the book's risk model

The fastest way to test a framework is to point it at something you built. I ran [ChicagoPulse](../genie-app-wins-databricks-challenge/), my Databricks Genie app for Chicago civic data, through the book's tiering and capability questions. I checked every claim below against the [source repository](https://github.com/bcastelino/genie-chicago-pulse), because the first answers I gave from memory turned out to be partly wrong.

ChicagoPulse runs as two deployments from the same code. The public site needs no login: the browser talks to an Appwrite Function gateway, which calls the Databricks App API with OAuth machine-to-machine credentials. A governed Databricks App deployment serves the same interface to the people granted access to it, which today means maintainers. The model-facing surface is Genie answering natural-language questions over governed Unity Catalog Metric Views of public City of Chicago data.

The book's four tiers classify agents by surface, not model:

| Tier | Book definition | Does ChicagoPulse fit? |
|---|---|---|
| 1. Internal informational | Reads non-sensitive internal data for internal users, no action tools | No: the public site serves people outside any organisation |
| 2. Internal operational | Reads sensitive internal data, may act on internal systems | Partly: the governed deployment can start the refresh job, an internal write |
| 3. Customer-data agent | Reads customer data that feeds customer-facing decisions | No: there is no customer or personal data |
| 4. Customer-facing actor | Acts on customers' accounts or speaks directly to customers | By the letter, yes: the public site speaks directly to anyone |

So the public site is Tier 4 by the letter, and that felt wrong until I asked the book's own question: "What is the worst thing that changes in the world because this agent produced the wrong output, and how many humans stand between that output and the change?" For ChicagoPulse, the worst case is a resident misreading a neighbourhood trend in public data that the app already labels as not real-time and not decision support. The blast radius is small.

The book has a way through this. Chapter 3 says "tier is a starting point for the conversation, not a substitute for having it," and the preface says that outside regulated settings you should read the controls "as a menu and pick what your risk profile justifies." A Tier 4 approval path with an executive risk committee would be absurd for a civic side project. The Tier 4 controls that protect what the app says to the public are not, and most of them were already there:

| Book control | Chapter | What ChicagoPulse does today |
|---|---|---|
| Default-deny capability boundary | 7 | The gateway allowlists 13 method and path pairs. Anything else gets a 404 or 405, and the refresh route gets a 403: "Administrative operations are not available through the public gateway." |
| Least privilege per identity | 6 | The app's service principal is bound to one Genie space (`CAN_RUN`), one SQL warehouse (`CAN_USE`), and one job (`CAN_MANAGE_RUN`). The gateway uses its own credential, and starting a stopped app uses a third, pinned to a single app name. |
| Strict argument validation | 7 | Data endpoints use allowlisted, parameterised SQL templates; the browser cannot send SQL. Questions are capped at 1,000 characters and results at 2,000 rows. |
| Idempotency for writes | 7 | The refresh path starts only the bound job, returns the active run instead of stacking a second, and passes an idempotency token. |
| Approval for consequential actions | 7 | Refresh exists only on the governed deployment, behind app permissions and a confirmation step. |
| Evals as a regression set | 8 | A 30-question Genie benchmark with verified SQL runs before and after Genie changes. |
| Closed loop from production signal | 20 | Answer feedback is evidence that maintainers review; it never rewrites Genie instructions automatically. |

ChicagoPulse also passes the "if the model returned a constant" test. Neighbourhood Pulse and Data Health are deterministic queries, so only Ask ChicagoPulse depends on the model. That split was a design choice I made for reliability, and the book gave me the vocabulary for why it is also the safer shape.

What the book would make me add:

- **Attribution.** Every public request reaches Databricks under one machine identity, so I can say what the gateway did but not which person asked. That is acceptable for anonymous access to public data. The day ChicagoPulse shows anything per-user, Chapter 6's on-behalf-of-user pattern stops being optional.
- **A policy check in code.** The refresh endpoint has no role check of its own; app permissions decide who can reach it. That works today, but a permission change would silently widen it. The book's policy layer would make the rule explicit, versioned, and testable.
- **A written capability matrix and named owners.** The matrix exists, but only implicitly, across the gateway code and the bundle configuration. The book's line is direct: "If the matrix is missing, the agent is not ready."

## How it held up against agent setups at work

I also compared the book with how I use agents at work, kept generic:

| Book control | What the book asks for | Where my setup stood, and the gap |
|---|---|---|
| Delegated identity (Chapter 6) | A task-scoped token that records both the user and the agent, valid for 60 to 600 seconds, checked at every tool wrapper | A mix of service principals and on-behalf-of-user auth. The gap is the default: a service principal is easier to set up, and the book's first question (is the agent's read union bigger than the user's?) is now the one I ask before choosing. |
| MCP supply chain (Chapter 5) | Allowlisted tool names, pinned hashes of descriptions and schemas, description scanning, internal mirrors, signed packages | Connectors start read-only and narrowly scoped, and write tools are added only after review. A review at install time does not catch a later description change, so the book's rug-pull case is the one this setup does not cover. |
| Capability boundary and state machine (Chapter 7) | One dispatcher that checks every call, with allowed tools per workflow state and re-checks at execution | Read-only exploration agents are separate from write-capable ones, and a plan step comes before any edit. The separation lives in agent configuration. The book wants it enforced at execution, so an approved plan is checked when the action runs rather than assumed. |

The pattern across all three is the same. I had the right instincts at design time, and the book moved each one to the point where it is enforced and recorded.

## Where it falls short

No book earns a real review without the criticism, so here is mine.

**Financial services first, and a lot of new vocabulary.** Almost every worked example comes from banking, led by a sanctions screening copilot that runs through the whole book. That makes the examples concrete, and the scale-down rules help, but unregulated teams will translate constantly. The book also coins many of its own frameworks (four authorities, seven layers, eight failure modes, four tiers), and the author says so. They are good frameworks, but they are vocabulary you will have to teach your risk committee.

**Some listings would not run as printed.** In the review copy I read, the RFC 8693 token-exchange example sends `actor_token_type` without an `actor_token`, which the RFC does not allow when no actor token is present. The MCP signature verifier passes PEM bytes to `Ed25519PublicKey.from_public_bytes()`, which accepts only a raw 32-byte key. The CI workflow filters jobs with `contains(github.event.pull_request.changed_files, 'policies/')`, but `changed_files` is a count, not a list of paths. To be fair, both the book and the [companion repository](https://github.com/PacktPublishing/Enterprise-AI-Agent-Security) label the listings illustrative, and many carry honest caveats such as "This meter is local telemetry, not admission control." Still, security code gets copied, so test it before you use it.

**Thin regulatory mapping for a governance book.** The preface lists regulatory readiness as part of the discipline, and the artefacts are clearly built for auditors. But NIST AI RMF and ISO 42001 get a single note, the EU AI Act is never named, and OWASP appears only as a Semgrep rule pack in the CI chapter. If you need to map controls to a specific regulation, you will do that work yourself.

**A layered architecture explained in prose.** The reference deployment in Chapter 4 is described in words, with a note that the figure lives in a separate figures pack, and only a handful of figures are referenced in the text I read. For a book built on seven layers and the trust boundaries between them, I wanted more diagrams.

## How it compares to other agent books I have reviewed

The useful distinction is between building agents, building software with agents, and securing agents once they act.

| Aspect | Enterprise AI Agent Security | *Enterprise Vibe Coding* | *30 Agents Every AI Engineer Must Build* | Mastra *Patterns for Building AI Agents* |
|---|---|---|---|---|
| Subject | Securing agents that act inside enterprise systems | Using coding agents to deliver software | Building agent systems as products | Getting agent products into production |
| Primary reader | Engineers, architects, and risk owners who sign off | Tech leads, platform teams, governance owners | AI and backend engineers | TypeScript developers shipping agents |
| Stack | Framework-agnostic: Python, MCP, OAuth token exchange, OPA and Cedar | GitHub Copilot, Microsoft Agent Framework, MCP | Python, LangChain and LangGraph | Mastra, TypeScript |
| Security depth | The whole book | Five-layer governance model | Chapters on verification and ethics | Security and evals sections |
| Length | ~310 pages | 192 pages | 542 pages | About 92 pages |

If you build agent products, start with my reviews of [*30 Agents Every AI Engineer Must Build*](../30-agents-every-ai-engineer-must-build-review/) and [*Principles and Patterns of Building AI Agents*](../principles-and-patterns-of-building-ai-agents-review/). If your agents already act on real systems, this is the one to read next.

## Who should read Enterprise AI Agent Security

Read this if an agent you own, or one you have to approve, can call tools, read enterprise data, or change state. It is especially useful if you are the person who has to explain the decision afterwards: a platform or AI engineer moving a pilot to production, a security architect, or a risk owner. Chapters 6, 7, 20, and 21 alone are worth the price.

Skip it if you want to learn how to build an agent, or if you need a regulation-by-regulation compliance map. It assumes you can already build the agent and want to stop it doing the wrong thing.

If your main concern is coding agents in a shared repository, read it alongside my review of [*Enterprise Vibe Coding for Agentic Engineering*](../enterprise-vibe-coding-for-agentic-engineering-review/). Part V of this book covers the same ground from the security side, including a seven-gate track for hardening vibe-coded prototypes.

## Final word

<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;margin:1.5rem 0;padding:1.1rem 1.35rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);box-shadow:var(--shadow-card);"><span style="font-size:2.2rem;font-weight:700;letter-spacing:-.02em;line-height:1;">4.5<span style="font-size:1rem;color:var(--color-text-muted);font-weight:500;"> / 5</span></span><span style="position:relative;display:inline-block;font-size:1.3rem;letter-spacing:2px;line-height:1;"><span style="color:var(--color-text-muted);opacity:.35;">★★★★★</span><span style="position:absolute;top:0;left:0;width:90%;overflow:hidden;white-space:nowrap;color:var(--ios-orange);">★★★★★</span></span><span style="flex:1;min-width:200px;color:var(--color-text-secondary);">The most operational agent-security book I have read, written for the person whose name goes on the sign-off.</span></div>

*Enterprise AI Agent Security* treats agents as what they have become: privileged actors with credentials, memory, and side effects. The four delegated authorities, the blast radius rule, and the delegated-identity chapter changed how I review agent designs. Pointing the book at ChicagoPulse showed me which of my instincts were already controls and which were still only habits. It loses half a point for its financial-services lens, listings that need fixing, thin regulatory mapping, and too few diagrams. **4.5 / 5**, and the book I would hand to anyone about to give an agent write access.

Disclosure: Packt sent me a review copy of this book. Thank you to [Sayantani Saha](https://www.linkedin.com/in/sayantani-s-a567b7b4/) for sharing it with me, and a real thank you to [Thomas De Vos](https://www.linkedin.com/in/thomasdevos) for writing a security book that is willing to argue for fewer controls when the design does not need them.

You can find the book on [Amazon](https://www.amazon.com/dp/1808828658) and via [Packt](https://www.packtpub.com/), and the companion code on [GitHub](https://github.com/PacktPublishing/Enterprise-AI-Agent-Security). If you read it, I would like to know which agent you re-tiered first.
