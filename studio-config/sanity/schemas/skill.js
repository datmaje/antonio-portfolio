export default {
  name: 'skill',
  title: 'Skills',
  type: 'document',
  fields: [
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          'Meter-to-Cash',
          'Digital Products & Channels',
          'IT & Business Governance',
          'Delivery & Ways of Working',
          'Cloud & Data Platforms',
          'Vendor & Contract Management'
        ]
      }
    },
    {
      name: 'skills',
      title: 'Skills in this Category',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'icon',
      title: 'Icon Name (lucide-react)',
      type: 'string',
      description: 'Receipt, Smartphone, Gauge, Settings, Cloud, Briefcase, Users, Database'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'category',
    },
  },
}
