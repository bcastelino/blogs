---
title: "Principles and Patterns of Building AI Agents: An Honest Review of Mastra's Free Two-Book Series"
date: 2026-07-29
excerpt: "A grounded review of Sam Bhagwat's two free Mastra books, Principles of Building AI Agents and Patterns for Building AI Agents. Principles teaches what to build; Patterns teaches how to keep it alive in production."
tags: [book-review, ai-agents, ai-engineering, llm, mastra, typescript, sam-bhagwat]
author: Brian Castelino
authorUrl: https://www.linkedin.com/in/cas7elino/
faq:
  - question: "What are Principles and Patterns of Building AI Agents?"
    answer: "They are two free books by Sam Bhagwat, CEO of the open-source TypeScript framework Mastra. Principles of Building AI Agents (3rd edition, March 2026) is a short conceptual primer across 33 chapters covering prompting, agents, tools, MCP, workflows, RAG, multi-agent systems, evals, deployment, and coding agents. Patterns for Building AI Agents (October 2025, co-written with Michelle Gienow) is Volume 2: 22 production patterns across agent design, context engineering, evals, and security."
  - question: "Are the Mastra AI agent books actually free?"
    answer: "Yes. Both are distributed free as digital downloads from mastra.ai/book, with paid print copies available on Amazon. As of mid-2026, Principles has been distributed to roughly 190,000 people and Patterns to over 32,000."
  - question: "Should I read Principles before Patterns?"
    answer: "Mastra recommends it, and I agree. Principles covers what to build and gives you the vocabulary; Patterns covers how to build and assumes you already have that base. If you have shipped agents before, you can skim Principles and spend your time in Patterns."
  - question: "Are the books tied to the Mastra framework?"
    answer: "Partly. The concepts are framework-agnostic, but the code examples and some APIs (runtimeContext, memory processors, model routing) are Mastra-specific and TypeScript-first. If you work in Python, the ideas still transfer, but the snippets will not."
  - question: "What is the main weakness of the series?"
    answer: "Breadth over depth, by design. Principles is deliberately short and skims each topic, which frustrates readers who want a deep treatment. Patterns is denser and more original, but at 92 pages it is a field guide, not an exhaustive manual. The concrete framework and model references will also date faster than the architectural patterns."
---

Most books about AI agents land in one of two piles: 500-page reference tomes you never finish, or blog posts stretched into an ebook. Sam Bhagwat's two Mastra books are neither. **Principles of Building AI Agents** and its companion **Patterns for Building AI Agents**, both free downloads from [mastra.ai/book](https://mastra.ai/book), are short enough to read in a weekend and dense enough to keep on your desk. Together they trace the full arc from your first working agent to one that survives real users, and this review covers both.

To be upfront about what this review is: I read both cover to cover as an engineer trying to keep a mental model current, not as someone who shipped a Mastra app to production. So I am reviewing the *ideas and the teaching*, not the framework's runtime. That distinction matters, and I will come back to it.

The short version: this is one series in two volumes, and reading them as a pair is the point. **Principles** tells you *what* to build. **Patterns** tells you *how* to keep it alive once real users touch it.

<div style="display:flex;flex-wrap:wrap;gap:1.75rem;align-items:stretch;margin:2rem 0;padding:1.5rem;border:1px solid var(--color-border);border-radius:16px;background:var(--color-fill-1);box-shadow:var(--shadow-card);">
<a href="https://mastra.ai/books/principles-of-building-ai-agents" target="_blank" rel="noopener" style="flex:0 0 auto;">
<img src="https://images-na.ssl-images-amazon.com/images/P/B0DYB2QCS7.01.L.jpg" alt="Cover of Principles of Building AI Agents by Sam Bhagwat" width="140" height="210" style="display:block;width:140px;height:210px;object-fit:cover;object-position:center;border-radius:10px;margin:0;box-shadow:var(--shadow-card);" />
</a>
<a href="https://mastra.ai/books/patterns-of-building-ai-agents" target="_blank" rel="noopener" style="flex:0 0 auto;">
<img src="https://images-na.ssl-images-amazon.com/images/P/B0G1XV9FQK.01.L.jpg" alt="Cover of Patterns for Building AI Agents by Sam Bhagwat and Michelle Gienow" width="140" height="210" style="display:block;width:140px;height:210px;object-fit:cover;object-position:center;border-radius:10px;margin:0;box-shadow:var(--shadow-card);" />
</a>
<div style="flex:1;min-width:250px;">
<div style="display:flex;align-items:center;gap:.6rem;margin-bottom:.6rem;"><span style="position:relative;display:inline-block;font-size:1.25rem;letter-spacing:2px;line-height:1;"><span style="color:var(--color-text-muted);opacity:.35;">★★★★★</span><span style="position:absolute;top:0;left:0;width:85%;overflow:hidden;white-space:nowrap;color:var(--ios-orange);">★★★★★</span></span><strong style="font-size:1.05rem;">4.25 / 5 as a series</strong></div>
<p style="margin:0 0 1rem;"><strong>Quick verdict:</strong> The most efficient on-ramp to agent engineering I have read. <em>Principles</em> (4 / 5) is a fast, honest primer. <em>Patterns</em> (4.5 / 5) is the one you will keep on your desk, because it is about the messy middle between a demo and production.</p>
</div>
<div style="flex:1 1 100%;display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:1rem 1.5rem;font-size:.92rem;line-height:1.45;border-top:1px solid var(--color-border);padding-top:1.35rem;">
<div style="display:flex;flex-direction:column;gap:.25rem;"><span style="color:var(--color-text-muted);font-size:.68rem;text-transform:uppercase;letter-spacing:.07em;white-space:nowrap;">Authors</span><span style="color:var(--color-text-secondary);">Sam Bhagwat and Michelle Gienow</span></div>
<div style="display:flex;flex-direction:column;gap:.25rem;"><span style="color:var(--color-text-muted);font-size:.68rem;text-transform:uppercase;letter-spacing:.07em;white-space:nowrap;">Publisher</span><span style="color:var(--color-text-secondary);">Self-published, 2025 to 2026</span></div>
<div style="display:flex;flex-direction:column;gap:.25rem;"><span style="color:var(--color-text-muted);font-size:.68rem;text-transform:uppercase;letter-spacing:.07em;white-space:nowrap;">Length</span><span style="color:var(--color-text-secondary);">134 + 92 pages</span></div>
<div style="display:flex;flex-direction:column;gap:.25rem;"><span style="color:var(--color-text-muted);font-size:.68rem;text-transform:uppercase;letter-spacing:.07em;white-space:nowrap;">Price</span><span style="color:var(--color-text-secondary);">Free digital, paid print</span></div>
</div>
</div>

## What are Principles and Patterns of Building AI Agents?

**Principles of Building AI Agents** is a short, conceptual guide to modern agents, now in its 3rd edition (March 2026). It runs about 134 pages across 33 chapters and ten parts: prompting an LLM, building an agent, tools and MCP, graph-based workflows, RAG, multi-agent systems, observability and evals, development and deployment, coding agents, and a grab-bag "everything else" on multimodal. It is deliberately pocket-sized.

**Patterns for Building AI Agents** is Volume 2 (October 2025), co-written with Michelle Gienow. It is roughly 92 pages of 22 numbered patterns grouped into four working parts: configure your agents, engineer agent context, evaluate agent responses, and secure your agents. Where Principles is textbook, Patterns is a collection of lessons learned from teams pushing agents into production.

Both are written by Sam Bhagwat, CEO of [Mastra](https://mastra.ai/), the open-source TypeScript agent framework, and previously a co-founder of the Gatsby React framework. Both are free.

## The thesis: what to build, then how to build

Bhagwat states the relationship between the two books plainly, and it is the most useful framing in either one:

<div style="margin:1.5rem 0;padding:1.15rem 1.4rem;border-left:4px solid var(--color-accent);border-radius:0 12px 12px 0;background:var(--color-accent-soft);font-size:1.12rem;line-height:1.55;"><strong>Principles covered what to build. Patterns covers how to build. Principles will get you through the first few weeks; Patterns should be on your desk until its contents are imprinted in your mind.</strong></div>

That is not marketing filler. It is an accurate description of how the two books actually feel to read. Principles gets you fluent. Patterns is where the scar tissue lives.

## Principles: a primer that respects your time

The best decision in Principles is its length. Bhagwat says in the foreword that it "should fit in your back pocket," and that you should be able to get something working in a day or two. He keeps that promise. There is no throat-clearing.

A few things it does genuinely well:

**It anchors on a clean definition.** It borrows Simon Willison's line that an agent "calls tools in a loop to achieve a goal," then lays agency out as a spectrum, from binary choices in a decision tree, to memory and retries, up to planning, subtask decomposition, and self-correction across long horizons. That ladder is a better mental model than the usual "agents are magic" hand-waving.

**It has a spine of engineering judgment.** The line I kept coming back to is "make it work, make it right, make it fast/cheap, in that order." It shows up when choosing a provider, when picking model size, and when deciding whether to move workloads to cheaper open models later. It is the kind of advice that sounds obvious and that people ignore constantly.

**Tool design gets the emphasis it deserves.** The chapter on tool calling argues that designing your tools is the single most important step, and it should happen on paper before you write code. The illustration, investor Alana Goyal's book-recommendation agent, is a clean before-and-after: dumping every book into the context window failed, and breaking the problem into specific tools ("get books by genre," "get recommendations by investor") made the agent behave like a real analyst. Think like an analyst, then write each operation as a tool.

**Memory is treated as a design choice.** Principles names three memory types (working memory, semantic recall, and observational memory) and spends real pages on observational memory, where an "observer agent" compresses raw sessions into structured observations and a "reflector agent" garbage-collects when they overflow. That is a more honest picture of production memory than "just stuff it in the context window."

Where Principles is weakest is the flip side of its virtue: it is thin. Some chapters are two pages. If you already build agents, several sections will feel like a table of contents with commentary. That is a fair trade for a free primer, but it is why I score it a notch below its sequel.

## Patterns: the half worth paying for (even though it is free)

Patterns is the one I would hand to a team about to ship. It is organized as problem, then solution, then a real example, and the examples are specific enough to be useful rather than decorative. Three parts stood out.

### Context engineering, treated as its own discipline

The context section is the clearest short treatment of context engineering I have read. It names five concrete failure modes rather than waving at "the model got confused":

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;margin:1.5rem 0;">
<div style="padding:1.05rem 1.2rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.4rem;">Context poisoning</strong><span style="color:var(--color-text-secondary);">A hallucination gets into context and is referenced again and again.</span></div>
<div style="padding:1.05rem 1.2rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.4rem;">Context distraction</strong><span style="color:var(--color-text-secondary);">Context grows so long the model over-focuses on it and discounts its training.</span></div>
<div style="padding:1.05rem 1.2rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.4rem;">Context confusion</strong><span style="color:var(--color-text-secondary);">Irrelevant material drags the response quality down.</span></div>
<div style="padding:1.05rem 1.2rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.4rem;">Context clash</strong><span style="color:var(--color-text-secondary);">New information contradicts something already in the prompt.</span></div>
<div style="padding:1.05rem 1.2rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.4rem;">Context rot</strong><span style="color:var(--color-text-secondary);">Around 100k tokens, even long-context models start losing the signal in the noise.</span></div>
</div>

The example that sells it: a Google Gemini team benchmarking a Pokemon-playing agent watched accuracy start degrading around 125k tokens, even with a 500k-token window. By filtering with RAG, pruning irrelevant context, and assembling a compiled context string before every call, they took a research agent from 34% to reliably over 90% accuracy. The book's blunt summary is that "context is not free," and every token influences behavior for better or worse.

### Evals as engineering, not vibes

The evals part is built around a recurring, believable case study: a medical necessity-review agent for health insurers, whose north-star metric is "false approvals." The workflow it lays out is the honest version of quality work: list your failure modes and *why* they happen, connect engineering metrics to a business metric, cross-reference the two, then iterate against a benchmark in CI so a fix "here" does not silently break something "there."

The pattern I found most quietly important is "Have SMEs Label Data." The argument is that software engineers are not your domain experts, so they should not be the ones judging whether a medical approval was correct. Outsourcing annotation breaks the loop between seeing a failure and understanding it. That is a governance point disguised as a labeling tip.

<blockquote style="margin:1.75rem 0;padding:1.4rem 1.6rem;border-left:4px solid var(--color-accent);background:var(--color-fill-1);border-radius:0 14px 14px 0;font-style:italic;font-size:1.12rem;line-height:1.6;">"Benchmarks are the difference between engineering and experimentation."</blockquote>

### Security, written for the way agents actually break

The security part opens with the right observation: traditional security assumes humans click buttons and code runs deterministically, and agents break both assumptions by interpreting instructions from anywhere and acting across systems.

Its centerpiece is Simon Willison's "lethal trifecta": access to private data, exposure to untrusted content, and the ability to communicate externally. Combine all three and a prompt-injection attack can read your secrets and exfiltrate them. The GitHub MCP server is the worked example, and it covers the whole trifecta at once. The practical advice is to remove one leg, usually the exfiltration path, via input processors. The rest of the part is equally grounded: sandbox untrusted code (with fast-start runtimes like E2B or Daytona, since a Docker cold start is too slow), grant granular just-in-time access rather than broad roles, and add real-time guardrails on both inputs and outputs.

## The patterns that stuck with me

These are the ideas I expect to actually reuse, pulled from across both books.

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:1rem;margin:1.5rem 0;">
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">Design agents like an org chart.</strong><span style="color:var(--color-text-secondary);">Patterns opens by treating agent design as organizational design: write down every capability, group by data source and task type, then split into agents. It is the same "divide and conquer" instinct as normal software, applied before you over-build a mega-agent that chooses the wrong tool.</span></div>
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">Discover the architecture, do not pre-plan it.</strong><span style="color:var(--color-text-secondary);">Build the one burning agent well, watch what users ask for next, split when it gets unwieldy, add routing when you have several. The content-creation example (coordinator to router to specialists) earns the lesson: you never build a mediocre master agent.</span></div>
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">Parallelize carefully.</strong><span style="color:var(--color-text-secondary);">The Temple Run example is a great warning: two subagents working in isolation produced a runner and a stop-and-think path system that could not be combined. Sometimes a single-threaded linear agent is the more reliable architecture.</span></div>
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">Feed errors back into context.</strong><span style="color:var(--color-text-secondary);">Good agents examine and correct their own errors instead of crashing. Give the agent the error message, let it fix and re-run, and if you see a recurring error, put it in the prompt. It is how Cursor, Cascade, and Replit already behave.</span></div>
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">Human-in-the-loop is a design axis.</strong><span style="color:var(--color-text-secondary);">In-the-loop, post-processing review, or deferred execution: the book frames HITL as three distinct injection points chosen by risk, and honestly notes that humans then become the bottleneck since agents do not sleep.</span></div>
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">Dynamic agents over version sprawl.</strong><span style="color:var(--color-text-secondary);">Rather than maintaining an agent per user tier, let one agent adapt its prompt, tools, memory, and model at runtime from signals like user role. More power, more testing burden; the book is clear about both.</span></div>
</div>

## Where the series falls short

No book earns a real review without the criticism, so here is mine.

**Breadth beats depth, and Principles feels it most.** This is the same complaint you will find on Goodreads, and it is fair. Principles skims. It is a wide, shallow tour by design, so anyone hoping to *master* RAG or multi-agent orchestration from it will be disappointed. It is a map, not the territory.

**It is Mastra's book, and it shows.** The concepts are portable, but the code and several APIs are Mastra-specific and TypeScript-first. That is reasonable for a free book from a framework company, and the plugs are examples rather than hard sells, but Python engineers should know the snippets will not copy-paste.

**The stack will age faster than the ideas.** Both books name specific models, token thresholds, and tools. Useful now, dated in eighteen months. The durable parts are the distinctions: single-threaded versus parallel, generation versus verification, autonomy versus guardrails.

**Patterns is a field guide, not a manual.** At 92 pages it is dense and original, but each pattern is a strong sketch, not an end-to-end implementation. You will still need docs and code to actually ship any one of them.

## How the two books compare

| | Principles (Vol 1) | Patterns (Vol 2) |
|---|---|---|
| Purpose | What to build | How to build in production |
| Style | Textbook primer | Problem / solution / example patterns |
| Length | ~134 pages, 33 chapters | ~92 pages, 22 patterns |
| Best for | Getting fluent fast | Surviving the prototype-to-production gap |
| Standout | Tool design, memory types, "make it work, right, fast" | Context engineering, evals, the lethal trifecta |
| Read it if | You are new to agents | You have a demo and now need reliability |

## Who should actually read it

Read Principles if you are a developer, ideally in TypeScript, who wants a fast and jargon-light on-ramp to how agents work. You can finish it in an evening and immediately hold better conversations about agents.

Read Patterns if you have a working prototype and are staring down the gap between "it demos well" and "it survives real users." That is the book's whole reason to exist, and it delivers there.

If you want a deeper, Python-first, and far more exhaustive treatment of agent architectures, the two Mastra books pair well as the lean counterpart to a heavier text. I wrote about one such book, a 542-page pattern library, in my [review of *30 Agents Every AI Engineer Must Build*](../30-agents-every-ai-engineer-must-build-review/). Read together, the contrast is instructive: one is a comprehensive reference you study, the other is a pocket guide you keep open while you work.

## Final word

<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;margin:1.5rem 0;padding:1.1rem 1.35rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);box-shadow:var(--shadow-card);"><span style="font-size:2.2rem;font-weight:700;letter-spacing:-.02em;line-height:1;">4.25<span style="font-size:1rem;color:var(--color-text-muted);font-weight:500;"> / 5</span></span><span style="position:relative;display:inline-block;font-size:1.3rem;letter-spacing:2px;line-height:1;"><span style="color:var(--color-text-muted);opacity:.35;">★★★★★</span><span style="position:absolute;top:0;left:0;width:85%;overflow:hidden;white-space:nowrap;color:var(--ios-orange);">★★★★★</span></span><span style="flex:1;min-width:200px;color:var(--color-text-secondary);">The best free on-ramp to agent engineering, with a second volume that is unusually honest about production.</span></div>

Bhagwat's series wins on a rare axis: respect for the reader's time. **Principles** (4 / 5) gets you fluent in an evening. **Patterns** (4.5 / 5) is the one I would keep open while building, because it is about the part everyone skips: what happens after the demo works. That the whole thing is free, and this good, is faintly ridiculous.

Thank you to [Sam Bhagwat](https://www.linkedin.com/in/sambhagwat/) and Michelle Gienow for writing them, and for giving them away. You can download both at [mastra.ai/book](https://mastra.ai/book), or grab print copies of [Principles](https://www.amazon.com/dp/B0DYH5GHDD) and [Patterns](https://www.amazon.com/Patterns-Building-Agents-Sam-Bhagwat-ebook/dp/B0G1XV9FQK) on Amazon. If you read them, I would like to know which pattern you reached for first.
