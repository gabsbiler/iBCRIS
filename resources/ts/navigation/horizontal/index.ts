
export default [
  {
    title: 'Dashboard',
    to: { name: 'index' },
    icon: { icon: 'mdi-home-outline' },
  },
  {
    title: 'Users',
    icon: { icon: 'mdi-account-outline' },
    to: {name: 'system-users'}
  },
  {
    title: 'Records',
    to: { name: 'household' },
    icon: { icon: 'mdi-clipboard-outline' },
  },
  {
    title: 'Reports',
    icon: { icon: 'mdi-chart-pie-outline' },
    to: {name: 'reports'}
  },
  {
    title: 'Settings',
    icon: {icon: 'mdi-playlist-check'},
    children: [
      {title: 'Look ups / Indicators', to: 'lookup-indicators' },
      {title: 'Mass Upload', to: 'mass-upload' },
      {title: 'Record Batch', to: 'containers' },
    ]
  }
  
] as HorizontalNavItems
