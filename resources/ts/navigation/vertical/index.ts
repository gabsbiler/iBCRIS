import type { VerticalNavItems } from '@/@layouts/types'

export default [
  {
    title: 'Dashboard',
    to: { name: 'index' },
    icon: { icon: 'mdi-view-dashboard' },
  },
  {
    title: 'Look ups / Indicators',
    to: { name: 'lookup-indicators' },
    icon: { icon: 'mdi-file-document-outline' },
  },
  {
    title: 'Household',
    to: { name: 'household' },
    icon: { icon: 'mdi-file-document-outline' },
  },
  {
    title: 'Mass Upload',
    to: { name: 'mass-upload' },
    icon: { icon: 'mdi-file-document-outline' },
  },
  // {
  //   title: 'System Users',
  //   to: { name: 'system-users' },
  //   icon: { icon: 'mdi-account-cog-outline' },
  // },
] as VerticalNavItems
