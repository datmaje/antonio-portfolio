export default {
  name: 'hobby',
  title: 'Hobbies & Interests',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Hobby Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required()
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
