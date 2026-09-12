import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const apiVersion = '2023-12-01'

if (!projectId) {
  throw new Error('Missing Sanity Project ID')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

export const urlFor = (source: any) => imageUrlBuilder({project: projectId, dataset}).image(source)

// Types
export interface Project {
  _id: string
  title: string
  slug?: string
  description: string
  kind?: string
  organization?: string
  role?: string
  cluster?: string
  period?: string
  location?: string
  tags?: string[]
  featured?: boolean
  status?: string
  context?: string
  roleDetail?: string
  scope?: string
  economics?: string
  fte?: string
  stakeholders?: string
  techTools?: string
  results?: string
  image?: any
  link?: string
  links?: { _key?: string; label: string; url: string }[]
  order: number
  publishedAt: string
}

// Only cases with status "published" are public. Anything draft or on-hold
// stays in the CMS and never reaches the site.
export const publishedProject = `_type == "project" && status == "published"`

export const projectCardFields = `
  _id,
  title,
  "slug": slug.current,
  description,
  organization,
  cluster,
  period,
  tags,
  featured,
  image,
  link,
  order
`

export const projectDetailFields = `
  ${projectCardFields},
  kind,
  role,
  location,
  status,
  context,
  roleDetail,
  scope,
  economics,
  fte,
  stakeholders,
  techTools,
  results,
  links[]{_key, label, url},
  publishedAt
`

export interface Hobby {
  _id: string
  title: string
  description: string
  order: number
}

export interface About {
  _id: string
  content: any[]
}

export interface Skill {
  _id: string
  category: string
  skills: string[]
  icon?: string
  order?: number
}

export interface Certification {
  _id: string
  title: string
  issuer: string
  validFrom: string
  validTo?: string
  order?: number
}
