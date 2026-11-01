---
jobTitle: Software Engineering Intern
company: Microsoft
team: Azure Core
location: Redmond, WA
startDate: '2025-05-01'
endDate: '2025-08-31'
summary: Built a telemetry ETL pipeline and DBSCAN anomaly detection for Azure storage diagnostics.
tags: ['Azure Data Explorer', 'KQL', 'REST APIs', 'DBSCAN', 'Python', 'pandas']
metrics:
  - value: '−90%'
    label: false positives
  - value: '−60%'
    label: query execution time
  - value: '100+ GB'
    label: telemetry processed
---

- Built an ETL pipeline with Azure Data Explorer, REST APIs, and Kusto Query Language (KQL) to process **100+ GB** of telemetry and analyze 500+ partition and server statistics for storage diagnostics.
- Implemented DBSCAN anomaly detection and tuned clustering parameters using the KNN elbow method and silhouette scores, reducing false positives by **90%**.
- Reduced query execution time by **60%** through time-bounded KQL optimization; added exponential backoff with jitter to handle transient diagnostic query failures.
