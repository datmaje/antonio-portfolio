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
          'Cloud Architecture',
          'Digital Strategy',
          'Leadership',
          'Agile & DevOps',
          'Development',
          'Data & Systems'
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
      description: 'Cloud, Zap, Users, Settings, Code2, Database, etc.'
    },
  ],
  preview: {
    select: {
      title: 'category',
    },
  },
}
