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

export const urlFor = (source: any) => imageUrlBuilder({projectId, dataset}).image(source)

// Types
export interface Project {
  _id: string
  title: string
  description: string
  image?: any
  link: string
  order: number
  publishedAt: string
}

export interface Hobby {
  _id: string
  title: string
  description: string
  order: number
}

export interface About {
  _id: string
  title?: string
  content: any[]
}

export interface Skill {
  _id: string
  category: string
  skills: string[]
  icon?: string
}

export interface Certification {
  _id: string
  title: string
  issuer: string
  validFrom?: string
  validTo?: string
  order?: number
}
