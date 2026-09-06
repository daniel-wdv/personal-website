---
title: Replacing a paid social platform with our own
summary: Bringing feeds, posts, likes and follows in-house to cut a recurring bill.
year: "2026"
order: 2
stack:
  - C# / .NET
  - PostgreSQL
  - Entity Framework
  - Dapr
  - Azure
  - Bicep
highlights:
  - Built the persistence layer and a transactional outbox, so writing data and publishing the event that follows it happen in one transaction and cannot drift apart.
  - Shipped a versioned event contracts package shared across services, with contract tests so a breaking change fails the producer's build instead of the consumer's runtime.
  - Wrote the technical design documents the rest of the team implemented against.
---

The entire social layer, users, posts, comments, likes and follows, lived in a
paid third-party service. The cost grew with the platform and the data was not
really ours to query. The plan was to rebuild it in-house, core first, on a
system that was already live and could not stop working while we did it.

The interesting constraint was ownership. One service owns the database and
everything else talks to it through idempotent endpoints, which keeps the
migration honest and stops the old and new worlds from writing over each other.
