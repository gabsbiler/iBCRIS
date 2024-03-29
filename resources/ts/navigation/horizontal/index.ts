
export default [
  {
    title: 'Dashboard',
    to: { name: 'index' },
    icon: { icon: 'mdi-home-outline' },
    action: 'Access',
    subject: 'Dashboard'
  },
  {
    title: 'Users',
    icon: { icon: 'mdi-account-outline' },
    to: {name: 'system-users'},
    action: 'Access',
    subject: 'Users'
  },
  {
    title: 'Records',
    to: { name: 'household' },
    icon: { icon: 'mdi-clipboard-outline' },
    action: 'Access',
    subject: 'Records'
  },
  {
    title: 'Reports',
    icon: { icon: 'mdi-chart-pie-outline' },
    children: [
      {
        title: 'Count of Indicators', 
        to: { name: 'reports-indicators' },
        action: 'Access',
        subject: 'Reports'
      },
      {
        title: 'Age Distribution', 
        to: {name: 'reports-distribution'},
        action: 'Access',
        subject: 'Reports'
      },
      {
        title: 'RBI', 
        to: {name: 'reports-rbi'},
        action: 'Access',
        subject: 'Reports'
      },
      {
        title: 'Death Records', 
        to: {name: 'reports-death'},
        action: 'Access',
        subject: 'Reports'
      },
      {
        title: 'Customize List Reports', 
        to: {name: 'reports-custom'},
        action: 'Access',
        subject: 'Reports'
      },
      {
        title: 'Customize Count Reports', 
        to: {name: 'reports-count'},
        action: 'Access',
        subject: 'Reports'
      },
    ]
  },
  {
    title: 'Settings',
    icon: {icon: 'mdi-playlist-check'},
    children: [
      {
        title: 'Look ups / Indicators', 
        to: 'lookup-indicators',
        action: 'Access',
        subject: 'Lookups'
      },
      {
        title: 'Mass Upload', 
        to: 'mass-upload' ,
        action: 'Access',
        subject: 'MassUpload'
      },
      {
        title: 'Record Batch', 
        to: 'containers',
        action: 'Access',
        subject: 'RecordBatch'
      },
      {
        title: 'Barangay', 
        to: 'barangay',
        action: 'Access',
        subject: 'RecordBatch'
      },
    ]
  }
  
] as HorizontalNavItems
