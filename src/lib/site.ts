export const site = {
  name: 'Elvis Chipiro',
  fullName: 'Elvis Tawananyasha Chipiro',
  role: 'Software engineer',
  description:
    'Elvis Chipiro: MIT CS student and software engineer building agentic AI systems, data pipelines, and reliability tooling at Google, Microsoft, and beyond.',
  summary:
    'I build systems that find what’s broken before people do: RAG triage agents at Google Cloud, anomaly detection for Azure storage, and the data pipelines underneath them.',
  location: 'Cambridge, MA',
  status: 'Open to 2027 new-grad SWE roles',
  email: 'chipiro@mit.edu',
  links: {
    github: 'https://github.com/Elvis0121',
    linkedin: 'https://www.linkedin.com/in/elvis-chipiro',
  },
}

/** Headline numbers pulled from the résumé, shown on the home page. */
export const signals = [
  { value: '+40%', label: 'triage accuracy', source: 'Google Cloud' },
  { value: '15×', label: 'faster incident triage', source: 'Google Cloud' },
  { value: '−90%', label: 'false-positive anomalies', source: 'Azure Core' },
  { value: '−60%', label: 'KQL query latency', source: 'Azure Core' },
  { value: '25×', label: 'smaller payloads', source: 'Cherokee' },
  { value: '−70%', label: 'preprocessing time', source: 'STRESS' },
]

export const research = [
  {
    title: 'Interacting-Particle Methods for Bayesian Deep Networks',
    people: 'PI: Youssef Marzouk · Supervisor: Ayoub Belhadji',
    area: 'Probabilistic ML',
  },
  {
    title:
      'Understanding and Measuring AI Capabilities & Their Impact on Economic Outcomes',
    people: 'PI: Neil Thompson',
    area: 'AI & Economics',
  },
  {
    title: 'Computer Vision',
    people: 'PI: Joseph Jacobson · Supervisor: Nikhil Lal',
    area: 'Vision',
  },
]

export const skills = [
  {
    group: 'Languages',
    items: [
      'Python',
      'TypeScript',
      'JavaScript',
      'Java',
      'C/C++',
      'C#',
      'SQL',
      'PowerShell',
      'Julia',
    ],
  },
  {
    group: 'AI & Data',
    items: [
      'Google ADK',
      'Vertex AI',
      'RAG',
      'Gemini API',
      'DBSCAN',
      'pandas',
      'Azure Data Explorer',
      'KQL',
      'SQL Server',
    ],
  },
  {
    group: 'Frameworks & Tools',
    items: [
      'React',
      'Node.js',
      'Django',
      'Mesop',
      'Azure Functions',
      'Cosmos DB',
      'Git',
      'Linux',
      'pytest',
    ],
  },
]

export function pageMeta(title: string, description: string) {
  const fullTitle = `${title} | ${site.name}`
  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
    ],
  }
}

/** Serve local images through the Netlify Image CDN at a given width. */
export function cdnImage(path: string, width: number) {
  return `/.netlify/images?url=${encodeURIComponent(path)}&w=${width}&fm=webp`
}
