---
title: "Extreme DAX, Second Edition: An Honest Review of the Advanced Power BI Playbook"
date: 2026-08-06
excerpt: "An honest review of Extreme DAX, Second Edition by Michiel Rozema, Madzy Stikkelorum, and Henk Vlootman. Why this Packt book is a scenario playbook for advanced Power BI, not another DAX function reference."
tags: [book-review, dax, power-bi, data-analytics, microsoft-fabric, semantic-model, packt]
author: Brian Castelino
authorUrl: https://www.linkedin.com/in/cas7elino/
takeaways:
  - "**A scenario playbook, not a function reference.** The book teaches advanced DAX through 13 real business cases (security, inventory, custom calendars, benchmarking, investment planning), not a tour of every function."
  - "**The second edition re-solves the classics with modern DAX.** Field parameters, calculation groups, custom calendars, visual calculations, and user-defined functions replace the workarounds from the 2022 edition."
  - "**Built for practitioners, not beginners.** It assumes working DAX knowledge and pairs most chapters with a downloadable PBIX so you build along. Verdict: 4.5 / 5."
faq:
  - question: "What is Extreme DAX, Second Edition?"
    answer: "Extreme DAX, Second Edition (Packt, 2026) is a 554-page, 14-chapter advanced Power BI book by Michiel Rozema, Madzy Stikkelorum, and Henk Vlootman, with a foreword by Jeroen ter Heerdt (DAX Product Manager for Power BI at Microsoft until March 2026). Instead of documenting every DAX function, it teaches the language through a series of advanced business scenarios: security, dynamic visuals, inventory, alternative calendars, Auto-Exist, recursion, waterfalls, benchmarking, and investment planning."
  - question: "Who should read Extreme DAX?"
    answer: "Analysts and BI developers who already have working knowledge of DAX in Power BI, Fabric, or other Microsoft analytics tools and want to solve harder, real-world problems. It is aimed at intermediate-to-advanced readers, not people learning DAX from scratch."
  - question: "Is Extreme DAX good for beginners?"
    answer: "No. The authors assume practical DAX experience and do not explain most functions and arguments in detail, since that information is easy to find online. Beginners should start with a fundamentals book first, then use Extreme DAX to level up."
  - question: "What is new in the second edition of Extreme DAX?"
    answer: "The second edition re-solves many first-edition scenarios using DAX features that did not exist or were impractical in 2022: field parameters, calculation groups, custom calendars, visual calculations, and user-defined functions. It also reframes DAX semantic models as the center of the Microsoft Fabric platform."
  - question: "Does Extreme DAX come with example files?"
    answer: "Yes. Most chapters include a link to a Power BI (PBIX) file in the companion GitHub repository (Extreme-DAX-Second-Edition), so you can follow along and adapt the business cases to your own data."
---

Most DAX books are reference manuals. They march function by function, argument by argument, and leave you to figure out how the pieces fit a real problem. *Extreme DAX, Second Edition* does the opposite, and that is the whole point of it.

To be upfront: Packt sent me a reviewer copy, and I read it as someone who writes DAX for actual Power BI work, not as a first-timer. I recently built [`powerbi-dashboard-generator`](https://github.com/bcastelino/powerbi-dashboard-generator), so I went in with specific scars and specific questions. This review is about how the book teaches, and whether the scenarios hold up when you sit down to build them.

The short version: this is the strongest advanced DAX resource I have read, precisely because it refuses to be a function reference. It is a book of hard problems, solved well.

<div style="display:flex;flex-wrap:wrap;gap:1.75rem;align-items:center;margin:2rem 0;padding:1.5rem;border:1px solid var(--color-border);border-radius:16px;background:var(--color-fill-1);box-shadow:var(--shadow-card);">
<a href="https://www.amazon.com/dp/1836647638" target="_blank" rel="noopener" style="flex:0 0 auto;">
<img src="https://images-na.ssl-images-amazon.com/images/P/1836647638.01.L.jpg" alt="Cover of Extreme DAX, Second Edition by Michiel Rozema, Madzy Stikkelorum, and Henk Vlootman" width="160" style="display:block;width:160px;border-radius:10px;margin:0;box-shadow:var(--shadow-card);" />
</a>
<div style="flex:1;min-width:250px;">
<div style="display:flex;align-items:center;gap:.6rem;margin-bottom:.6rem;"><span style="position:relative;display:inline-block;font-size:1.25rem;letter-spacing:2px;line-height:1;"><span style="color:var(--color-text-muted);opacity:.35;">★★★★★</span><span style="position:absolute;top:0;left:0;width:90%;overflow:hidden;white-space:nowrap;color:var(--ios-orange);">★★★★★</span></span><strong style="font-size:1.05rem;">4.5 / 5</strong></div>
<p style="margin:0 0 1rem;"><strong>Quick verdict:</strong> <em>Extreme DAX, Second Edition</em> is a scenario playbook disguised as a DAX book. Its real subject is how experienced practitioners think through hard modeling problems. Best for intermediate-to-advanced analysts who are done with tutorials and stuck on the real thing.</p>
<div style="display:flex;flex-wrap:wrap;gap:1rem;font-size:.9rem;align-items:stretch;">
<div style="display:flex;flex-direction:column;gap:.15rem;flex:1 1 0;min-width:0;"><span style="color:var(--color-text-muted);font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;">Authors</span>Rozema, Stikkelorum, Vlootman</div>
<div style="display:flex;flex-direction:column;gap:.15rem;flex:1 1 0;min-width:0;"><span style="color:var(--color-text-muted);font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;">Publisher</span>Packt (2026)</div>
<div style="display:flex;flex-direction:column;gap:.15rem;flex:1 1 0;min-width:0;"><span style="color:var(--color-text-muted);font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;">Length</span>554 pages · 14 chapters</div>
<div style="display:flex;flex-direction:column;gap:.15rem;flex:1 1 0;min-width:0;"><span style="color:var(--color-text-muted);font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;">Format</span>Book + PBIX repo</div>
</div>
</div>
</div>

## What is Extreme DAX, Second Edition?

*Extreme DAX, Second Edition* is an advanced Power BI and DAX book (Packt, 2026) that teaches the language through 13 real business scenarios rather than a catalog of functions. It runs 554 pages across 14 chapters and is written by [Michiel Rozema](https://www.linkedin.com/in/michielrozema/), [Madzy Stikkelorum](https://www.linkedin.com/in/madzygroenveld/), and [Henk Vlootman](https://www.linkedin.com/in/vlootman/), with a foreword by [Jeroen ter Heerdt](https://www.linkedin.com/in/jeroenterheerdt/), who was DAX Product Manager for Power BI at Microsoft until March 2026.

The book assumes you already write DAX. It deliberately skips the "here is what SUM does" material, on the reasonable grounds that a search engine can tell you the arguments of a function. What it spends its pages on instead is the gap between knowing the functions and solving the problem: the modeling decisions, the context gymnastics, and the "why does the visual show this" moments that no function list prepares you for.

## The thesis: procedural learning, not another reference

Jeroen ter Heerdt's foreword frames the book better than any blurb could, using a distinction from learning science: declarative learning (concepts, rules, theory) versus procedural learning (doing, practice, pattern, intuition). DAX has plenty of the former and very little of the latter.

<div style="margin:1.5rem 0;padding:1.15rem 1.4rem;border-left:4px solid var(--color-accent);border-radius:0 12px 12px 0;background:var(--color-accent-soft);font-size:1.12rem;line-height:1.55;"><strong>The book is light on theory by design. Its weight is in curated, real-world scenarios, the kind you encounter in actual projects rather than contrived exercises.</strong></div>

That is an accurate description of how it reads. In ter Heerdt's words, "reading it is close to the experience of looking over the shoulder of someone who has solved your exact problem before." That is exactly the resource that is hard to find, and it is why the scenario format works.

## Why the structure is the argument

The book is built so the foundation carries the harder material, and that ordering is deliberate:

- **Chapters 1 to 4** set the base: analyzing data with DAX, model design, using DAX, and the one that everything else leans on, context and filtering (row, query, and filter context, `CALCULATE`, table functions, and variables).
- **Chapters 5 to 9** are the first wave of real scenarios: security with DAX, dynamically changing visualizations, inventory analysis, alternative calendars, and working with Auto-Exist.
- **Chapters 10 to 13** are the deep end: recursion in DAX, DAX-driven waterfalls, benchmarking with window functions, and real-estate investment planning.

Read that way, the "advanced" label is earned. Each scenario is a self-contained project with a business case, a model, and a worked solution, and most ship with a downloadable PBIX so you can open the file and see exactly how a measure behaves inside a visual.

## The scenarios that stuck with me

These are the chapters I expect to actually reach for, not just the ones that read well.

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:1rem;margin:1.5rem 0;">
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">Security beyond row-level security.</strong><span style="color:var(--color-text-secondary);">Chapter 5 goes past standard RLS into object-level security and, more usefully, value-level security: dynamically hiding specific attribute values through modeling plus security filters. It also covers securing hierarchies with PATH functions and securing aggregation levels. This is the most complete treatment of DAX security I have seen in one place.</span></div>
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">Field parameters for dynamic visuals.</strong><span style="color:var(--color-text-secondary);">Chapter 6 uses field parameters to let users swap measures, axes, and report titles at runtime, then is honest about where field parameters run out of road and you reach for control tables instead. This maps directly to problems I hit building dashboard tooling.</span></div>
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">The case of the missing workdays.</strong><span style="color:var(--color-text-secondary);">Chapter 9 explains Auto-Exist, the feature that quietly stops Power BI from evaluating measures for label combinations that do not exist, and then walks through a workday-on-workday comparison it silently breaks. The fix uses the WINDOW function and a COALESCE(WorkdayNum, 1) guard. It is the best "why is my visual wrong" chapter in the book.</span></div>
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">Recursion, which DAX does not support.</strong><span style="color:var(--color-text-secondary);">Chapter 10 tackles inherently recursive warehousing logic (stock now depends on stock earlier, which depends on stock earlier still) and shows how user-defined functions make semi-recursive calculations possible. This is the clearest example of the second edition using new language features to solve an old, hard problem.</span></div>
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">Waterfalls via visual calculations.</strong><span style="color:var(--color-text-secondary);">Chapter 11 builds dynamic waterfall charts with visual calculations, including showing and hiding parts of a visual and conditional formatting, then reuses the logic through user-defined functions. It is a good look at where visual calculations genuinely beat classic measures.</span></div>
<div style="padding:1.15rem 1.3rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);"><strong style="display:block;margin-bottom:.5rem;">Goal-seeking for IRR.</strong><span style="color:var(--color-text-secondary);">Chapter 13 covers Future Value, Present Value, NPV, and Internal Rate of Return, then confronts the fact that IRR has no closed-form solution (the worked example lands at 2.59%). It uses XNPV and XIRR, and then goal-seeking with user-defined functions when the built-ins are not enough. Real numerical methods, in DAX.</span></div>
</div>

The line from the preface that captures the second edition best is a quiet flex:

<blockquote style="margin:1.75rem 0;padding:1.4rem 1.6rem;border-left:4px solid var(--color-accent);background:var(--color-fill-1);border-radius:0 14px 14px 0;font-style:italic;font-size:1.12rem;line-height:1.6;">"Many of the scenarios from the first edition of Extreme DAX can be, and should be, solved in another way. We can even go beyond to things that were practically impossible three years ago."</blockquote>

## What changed from the first edition

If you owned the 2022 edition, this is not a cover refresh. The problems are familiar, but the solutions are rebuilt around features that have landed since: field parameters, calculation groups, custom calendars, visual calculations, and user-defined functions. Several chapters that used to lean on awkward workarounds now have cleaner answers, and the recursion and waterfall chapters in particular exist because the language finally supports them well.

The framing changed too. DAX semantic models are now positioned as the center of the Microsoft Fabric platform rather than a Power BI feature, which is the right call for where the stack is heading.

## Where it falls short

No book earns a real review without the criticism, so here is mine.

**It is genuinely advanced, and it will lose beginners fast.** The authors say plainly that they do not explain most functions and arguments, because you can find that online. That is the correct decision for the audience, but it means someone still learning `CALCULATE` will drown by Chapter 5. This is a second book, not a first.

**Some scenarios use preview features.** The book notes that a few features were not generally available at the time of writing, so you may need to enable preview options to follow along. Useful now, but a reminder that the newest material is also the least stable.

**Depth over breadth cuts both ways.** Because each chapter goes deep on one business case, the book is not a lookup you skim for a quick pattern. You get the most from it by building the PBIX alongside the text, which is a bigger time commitment than a reference.

**It is Power BI and Fabric specific.** The modeling instincts transfer, but the solutions assume the Microsoft semantic model engine. If you work in another BI stack, the thinking helps and the code does not.

## How Extreme DAX compares to other DAX books

| Aspect | Extreme DAX, 2nd Ed | Typical DAX books |
|---|---|---|
| Teaching approach | Scenario-first: 13 real business cases, solved end to end | Function-first: reference tour of syntax and arguments |
| Audience | Intermediate to advanced practitioners | Beginners to intermediate |
| Depth vs breadth | Deep on a focused set of hard problems | Broad coverage, shallower on any one problem |
| Companion material | PBIX file per chapter to build along | Often code snippets only |
| Currency | 2026 features (field parameters, visual calculations, UDFs) | Frequently a version or two behind |

## How it connects to everything else I have read and built

The most interesting thing about this book is not any single measure. It is a pattern I keep seeing across the tools I work with: the interesting work is moving out of the raw engine and into the layer of control, governance, and reusable logic wrapped around it.

DAX getting user-defined functions, recursion, and goal-seeking is the same move, in miniature, that AI agents make when they wrap a model in tools, memory, and verification. I wrote about that shift in my reviews of [Principles and Patterns of Building AI Agents](../principles-and-patterns-of-building-ai-agents-review/) and [30 Agents Every AI Engineer Must Build](../30-agents-every-ai-engineer-must-build-review/): the value lives in the architecture around the primitive, not the primitive itself. Chapter 10's UDF-driven recursion reads like DAX growing the same procedural escape hatches.

The security chapter lands the same way against the platform trend. Value-level security, aggregation security, and the Fabric-centric framing are all about turning the semantic model into a governed layer that feeds both dashboards and, increasingly, AI. That is exactly the direction I traced in my [Databricks Well-Architected Framework](../databricks-partner-well-architected-framework/) and [Databricks Data + AI Summit 2026](../databricks-data-ai-summit-2026/) write-ups: both ecosystems are converging on a governed semantic and metrics layer as the source of truth. Reading Extreme DAX next to those, the Microsoft answer to that problem comes into focus.

And on the practitioner side, three chapters map straight onto problems I hit building [`powerbi-dashboard-generator`](https://github.com/bcastelino/powerbi-dashboard-generator): field parameters for user-driven visuals (Chapter 6), Auto-Exist surprises when a visual quietly drops rows (Chapter 9), and calculation groups for keeping time intelligence sane across metrics (Chapter 8). Those are not academic examples. They are the exact places a real dashboard breaks.

## Who should actually read it

Read this if you already write DAX for a living, or close to it, and you keep hitting the wall between "I know the functions" and "I cannot make this specific thing work." Security beyond RLS, custom calendars, recursion, benchmarking, and financial modeling in DAX are all here, worked end to end.

Skip it, or shelve it for later, if you are still learning the basics. It will not hold your hand, and it is not trying to.

## Final word

<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;margin:1.5rem 0;padding:1.1rem 1.35rem;border:1px solid var(--color-border);border-radius:14px;background:var(--color-fill-1);box-shadow:var(--shadow-card);"><span style="font-size:2.2rem;font-weight:700;letter-spacing:-.02em;line-height:1;">4.5<span style="font-size:1rem;color:var(--color-text-muted);font-weight:500;"> / 5</span></span><span style="position:relative;display:inline-block;font-size:1.3rem;letter-spacing:2px;line-height:1;"><span style="color:var(--color-text-muted);opacity:.35;">★★★★★</span><span style="position:absolute;top:0;left:0;width:90%;overflow:hidden;white-space:nowrap;color:var(--ios-orange);">★★★★★</span></span><span style="flex:1;min-width:200px;color:var(--color-text-secondary);">The best advanced DAX resource I have read, because it teaches the problems, not just the functions.</span></div>

*Extreme DAX, Second Edition* is a book of hard problems solved by people who have clearly solved them for real. The scenario format is the right one for advanced DAX, the second edition earns its update by rebuilding old solutions with new language features, and the PBIX-per-chapter approach means you can actually feel the difference between reading a pattern and running it. It loses half a point only for being genuinely inaccessible to beginners and leaning on a few preview features. **4.5 / 5**, and it is going on the shelf next to the reference I reach for when I am stuck.

Disclosure: Packt sent me a reviewer copy of this book. Thank you to [Shruthi Shetty](https://www.linkedin.com/in/shruthis-shetty/) for reaching out and getting it to me, and a real thank you to [Michiel Rozema](https://www.linkedin.com/in/michielrozema/), [Madzy Stikkelorum](https://www.linkedin.com/in/madzygroenveld/), and [Henk Vlootman](https://www.linkedin.com/in/vlootman/) for writing it, and to [Jeroen ter Heerdt](https://www.linkedin.com/in/jeroenterheerdt/) for a foreword that framed the whole thing.

You can find the book on [Amazon](https://www.amazon.com/dp/1836647638) and via [Packt](https://www.packtpub.com/), and the companion Power BI files on [GitHub](https://github.com/PacktPublishing/Extreme-DAX-Second-Edition). If you read it, I would like to know which scenario you built first.
