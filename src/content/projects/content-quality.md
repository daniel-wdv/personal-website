---
title: Scoring user content with an LLM
summary: A daily pipeline that reads every new post and predicts whether it will sell.
year: "2025"
order: 4
stack:
  - Python
  - Azure OpenAI
  - pydantic-ai
  - Azure Functions
  - Streamlit
highlights:
  - Built an LLM judge that reads each post's image or video frame alongside its title and description, and returns structured scores for purchase intent and engagement.
  - Added a rate limiter and idempotent processing, so the pipeline stays inside API limits and never pays to score the same post twice.
  - Shipped it as a scheduled serverless function with its own infrastructure as code, plus a small internal UI for reviewing the results.
---

On a platform where every post is about a product, some posts drive sales and
most do not. The team needed a way to tell the difference at scale, without
someone reviewing thousands of posts by hand.

I built and shipped this one on my own, from the prompt design through to the
deployment pipeline.
