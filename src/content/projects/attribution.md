---
title: Purchase attribution across a whole product
summary: The system that works out which post led to a sale, and who gets paid for it.
year: "2026"
order: 1
stack:
  - TypeScript
  - Next.js
  - React Native
  - C# / .NET
  - Dapr
  - Azure Service Bus
  - Cosmos DB
  - Bicep
highlights:
  - Designed the flow end to end, from tracking in the storefront and the mobile app, through an ingest API and a message bus, to the services that persist attribution records.
  - Made delivery reliable with idempotency keys and a transactional outbox, so a retried or duplicated event never pays out a reward twice.
  - Carried the influence context through the cart into order analytics, so the business could see which content actually drove revenue.
---

On a social commerce platform, users earn a reward when someone buys a product
after seeing their post. That only works if you can reliably connect a purchase
back to the content that influenced it, across two client apps and several
backend services that all fail in different ways.

This is the piece of work I point to when someone asks what fullstack means to
me. It touched every layer, from a tracking call in the mobile app down to the
infrastructure definition for the message topic.
