export default {
  name: 'lead',
  title: 'Contact Leads',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'requestType',
      title: 'Request Type',
      type: 'string',
      options: {
        list: ['Consulting', 'Mentoring', 'Speaking', 'Project', 'Other']
      }
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'receivedAt',
      title: 'Received at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
}
