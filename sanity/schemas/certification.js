export default {
  name: 'certification',
  title: 'Certifications',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Certification Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'issuer',
      title: 'Issued By',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'validFrom',
      title: 'Valid From (Year)',
      type: 'string',
      description: '2023',
    },
    {
      name: 'validTo',
      title: 'Valid To (Year or "Present")',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'issuer',
    },
  },
}
