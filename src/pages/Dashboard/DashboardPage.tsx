import Grid from '@mui/material/Grid2'
import BusinessIcon from '@mui/icons-material/Business'
import GroupsIcon from '@mui/icons-material/Groups'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import { ErrorAlert, PageHeader, StatCard, CardGridSkeleton } from '@/components'
import { useDashboard } from '@/hooks'
import { getErrorMessage } from '@/utils/api'

export function DashboardPage() {
  const { data, isLoading, isError, error } = useDashboard()

  const stats = [
    {
      title: 'Total Companies',
      value: data?.totalCompanies ?? 0,
      icon: <BusinessIcon />,
      color: '#2563eb',
    },
    {
      title: 'Total HR Contacts',
      value: data?.totalHrs ?? 0,
      icon: <GroupsIcon />,
      color: '#7c3aed',
    },
    {
      title: "Today's Reminders",
      value: data?.todaysReminders?.length ?? 0,
      icon: <NotificationsActiveIcon />,
      color: '#d97706',
    },
  ]

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your CRM performance"
      />

      {isError && <ErrorAlert message={getErrorMessage(error)} />}
      {isLoading && <CardGridSkeleton count={4} />}
      {!isLoading && !isError && (
        <Grid container spacing={3}>
          {stats.map((stat) => (
            <Grid key={stat.title} size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard {...stat} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}
