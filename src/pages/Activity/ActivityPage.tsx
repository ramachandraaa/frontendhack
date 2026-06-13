import TimelineIcon from '@mui/icons-material/Timeline'
import {
  EmptyState,
  ErrorAlert,
  PageHeader,
  TimelineFeed,
  TimelineSkeleton,
} from '@/components'
import { useActivity } from '@/hooks'
import { getErrorMessage } from '@/utils/api'
import { formatDateTime } from '@/utils/date'

export function ActivityPage() {
  const { data = [], isLoading, isError, error } = useActivity()

  return (
    <>
      <PageHeader
        title="Activity Feed"
        subtitle="Latest interactions across your CRM"
      />

      {isError && <ErrorAlert message={getErrorMessage(error)} />}
      {isLoading && <TimelineSkeleton count={6} />}
      {!isLoading && !isError && data.length === 0 && (
        <EmptyState
          title="No activity yet"
          description="Updates and interactions will appear here."
          icon={<TimelineIcon sx={{ fontSize: 48 }} />}
        />
      )}
      {!isLoading && data.length > 0 && (
        <TimelineFeed
          items={data.map((item) => ({
            id: item.id,
            title: item.user ?? 'User',
            subtitle: [item.company, item.hr].filter(Boolean).join(' · ') || undefined,
            timestamp: item.timestamp,
            content: `${item.updateText} · ${formatDateTime(item.timestamp)}`,
          }))}
        />
      )}
    </>
  )
}
