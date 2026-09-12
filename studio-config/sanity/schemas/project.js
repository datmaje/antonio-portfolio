export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 }
    },
    {
      name: 'description',
      title: 'Tagline',
      description: 'One line. Shown on the project card.',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'kind',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Project', value: 'project' },
          { title: 'Programme', value: 'programme' },
          { title: 'Role', value: 'role' }
        ]
      }
    },
    {
      name: 'organization',
      title: 'Organization',
      type: 'string'
    },
    {
      name: 'role',
      title: 'Role (title held)',
      type: 'string'
    },
    {
      name: 'cluster',
      title: 'Cluster',
      type: 'string',
      options: {
        list: [
          { title: 'Direct Product Ownership', value: 'Direct Product Ownership' },
          { title: 'Meter-to-Cash', value: 'Meter-to-Cash' },
          { title: 'Data & AI', value: 'Data & AI' },
          { title: 'Governance & Delivery', value: 'Governance & Delivery' },
          { title: 'Earlier Career', value: 'Earlier Career' },
          { title: 'Side Ventures', value: 'Side Ventures' }
        ]
      }
    },
    {
      name: 'period',
      title: 'Period',
      type: 'string'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'On hold', value: 'on-hold' },
          { title: 'Published', value: 'published' }
        ]
      },
      initialValue: 'draft'
    },
    {
      name: 'context',
      title: 'Context',
      type: 'text',
      rows: 5
    },
    {
      name: 'roleDetail',
      title: 'Role (in this project)',
      type: 'text',
      rows: 5
    },
    {
      name: 'scope',
      title: 'Scope',
      type: 'text',
      rows: 6
    },
    {
      name: 'economics',
      title: 'Economics',
      type: 'text',
      rows: 3
    },
    {
      name: 'fte',
      title: 'FTE',
      type: 'text',
      rows: 3
    },
    {
      name: 'stakeholders',
      title: 'Stakeholders',
      type: 'text',
      rows: 4
    },
    {
      name: 'techTools',
      title: 'Tech & Tools',
      type: 'text',
      rows: 4
    },
    {
      name: 'results',
      title: 'Results',
      type: 'text',
      rows: 6
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'link',
      title: 'Project Link',
      type: 'url'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
}
