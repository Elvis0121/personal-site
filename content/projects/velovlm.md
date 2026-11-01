---
title: VeloVLM
description: A five-agent incident-response copilot that reads dashboard screenshots, diagnoses data warehouse issues, and drafts the fix as a pull request.
event: Google Hackathon
date: '2026-07-01'
outcome: 5 cooperating agents
tags: ['Python', 'Gemini API', 'Multi-agent', 'Vision']
---

VeloVLM turns a screenshot of a broken dashboard into a remediation PR.

- **Perception agent** extracts anomaly metrics straight from dashboard screenshots with Gemini vision.
- **Diagnosis agents** correlate the anomaly with warehouse tables and lineage to find the root cause.
- **Remediation agent** drafts the fix as code and opens a pull request for human review.
