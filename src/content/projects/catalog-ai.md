---
title: Cleaning a marketplace catalog with AI
summary: Standardising messy seller data across an entire product catalog.
year: "2025"
order: 3
stack:
  - C# / .NET
  - Dapr
  - Cosmos DB
  - Azure
  - LLMs
highlights:
  - Built a service that processes product metadata in batches, with cleaning rules that differ per category rather than one set of rules stretched over everything.
  - Added real-time updates through webhooks, so a product corrected at the source is reprocessed instead of waiting for the next batch.
  - Designed it to be resumable and observable, because a job that runs across a whole catalog will fail partway through at some point.
---

Products came from many different sellers, each describing the same kind of item
their own way. Inconsistent titles, missing attributes and unusable descriptions
made search worse and the catalog harder to trust. Cleaning it by hand was never
going to scale.

This was the first thing I was handed when I joined, on a stack and a problem
domain I had not worked in before.
