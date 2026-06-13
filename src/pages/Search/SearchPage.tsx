import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import BusinessIcon from '@mui/icons-material/Business'
import PersonIcon from '@mui/icons-material/Person'
import { EmptyState, ErrorAlert, PageHeader } from '@/components'
import { useSearch } from '@/hooks'
import { getErrorMessage } from '@/utils/api'
import { companyDetailsPath, hrProfilePath } from '@/routes/paths'
import type { SearchResult } from '@/types'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { data = [], isFetching, isError, error } = useSearch(query)

  const handleSelect = (result: SearchResult) => {
    if (result.type === 'company' && result.companyId) {
      navigate(companyDetailsPath(result.companyId))
    } else if (result.hrContactId) {
      navigate(hrProfilePath(result.hrContactId))
    }
  }

  return (
    <>
      <PageHeader title="Search" subtitle="Find companies and HR contacts" />

      <TextField
        fullWidth
        placeholder="Search company name, HR name, email, mobile..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 3, maxWidth: 560 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {isError && <ErrorAlert message={getErrorMessage(error)} />}
      {query.length >= 2 && !isFetching && data.length === 0 && (
        <EmptyState title="No results" description="Try a different search term." />
      )}
      {data.length > 0 && (
        <Card>
          <List disablePadding>
            {data.map((result) => (
              <ListItem key={`${result.type}-${result.id}`} disablePadding divider>
                <CardActionArea onClick={() => handleSelect(result)} sx={{ px: 2, py: 1 }}>
                  <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      {result.type === 'company' ? (
                        <BusinessIcon color="primary" />
                      ) : (
                        <PersonIcon color="secondary" />
                      )}
                      <ListItemText
                        primary={result.label}
                        secondary={result.subtitle}
                      />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </ListItem>
            ))}
          </List>
        </Card>
      )}
      {query.length < 2 && (
        <Typography color="text.secondary">Type at least 2 characters to search.</Typography>
      )}
    </>
  )
}
