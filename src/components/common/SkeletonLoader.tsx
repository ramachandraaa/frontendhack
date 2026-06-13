import { Card, CardContent, Skeleton, Stack } from '@mui/material'

interface TableSkeletonProps {
  rows?: number
}

export function TableSkeleton({ rows = 6 }: TableSkeletonProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1.5}>
          {Array.from({ length: rows }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={48} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export function CardGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <Stack direction="row" flexWrap="wrap" gap={2}>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} sx={{ width: 260 }}>
          <CardContent>
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="rounded" height={60} sx={{ mt: 1 }} />
          </CardContent>
        </Card>
      ))}
    </Stack>
  )
}

export function TimelineSkeleton({ count = 5 }: { count?: number }) {
  return (
    <Stack spacing={2}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} variant="rounded" height={72} />
      ))}
    </Stack>
  )
}
