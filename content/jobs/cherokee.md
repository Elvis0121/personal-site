---
jobTitle: Software Engineering Intern
company: Cherokee
location: Tahlequah, OK
startDate: '2026-01-01'
endDate: '2026-02-28'
summary: Redesigned SQL Server persistence for tribal enrollment applications to eliminate large-payload truncation failures.
tags: ['SQL Server', 'C#', 'Data modeling', 'Serialization']
metrics:
  - value: '150KB → 6KB'
    label: serialized payload size
---

- Redesigned SQL Server persistence for tribal enrollment applications, separating document storage from applicant and lineage data to resolve large-payload truncation failures.
- Reduced serialized JSON payloads from **150 KB to 6 KB** by optimizing serialization and separating binary documents from application data.
