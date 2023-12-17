import type { HorizontalNavItems } from '@layouts/types'

export default [
  {
    title: 'Dashboard',
    to: { name: 'index' },
    icon: { icon: 'mdi-home-outline' },
  },
  {
    title: 'Users',
    icon: { icon: 'mdi-account-outline' },
  },
  {
    title: 'Records',
    to: { name: 'household' },
    icon: { icon: 'mdi-clipboard-outline' },
  },
  {
    title: 'Reports',
    icon: { icon: 'mdi-chart-pie-outline' },
  },
  {
    title: 'Settings',
    icon: {icon: 'mdi-playlist-check'},
    children: [
      {title: 'Look ups / Indicators', to: 'lookup-indicators' },
      {title: 'Mass Upload', to: 'mass-upload' },
    ]
  }
  
] as HorizontalNavItems
