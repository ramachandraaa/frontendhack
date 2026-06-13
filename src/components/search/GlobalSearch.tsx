import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Autocomplete,
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import BusinessIcon from '@mui/icons-material/Business'
import PersonIcon from '@mui/icons-material/Person'
import { useSearch } from '@/hooks'
import { companyDetailsPath, hrProfilePath } from '@/routes/paths'
import type { SearchResult } from '@/types'

export function GlobalSearch() {
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const { data = [], isFetching } = useSearch(input)

  const handleSelect = (
    _: React.SyntheticEvent,
    value: string | SearchResult | null,
  ) => {
    if (!value || typeof value === 'string') return
    if (value.type === 'company' && value.companyId) {
      navigate(companyDetailsPath(value.companyId))
    } else if (value.hrContactId) {
      navigate(hrProfilePath(value.hrContactId))
    }
    setInput('')
  }

  return (
    <Autocomplete
      freeSolo
      options={data}
      loading={isFetching}
      inputValue={input}
      onInputChange={(_, value) => setInput(value)}
      onChange={handleSelect}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.label
      }
      isOptionEqualToValue={(option, value) => option.id === value.id && option.type === value.type}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={`${option.type}-${option.id}`}>
          <Box display="flex" alignItems="center" gap={1}>
            {option.type === 'company' ? (
              <BusinessIcon fontSize="small" color="primary" />
            ) : (
              <PersonIcon fontSize="small" color="secondary" />
            )}
            <Box>
              <Box fontWeight={600}>{option.label}</Box>
              {option.subtitle && (
                <Box fontSize={12} color="text.secondary">
                  {option.subtitle}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search companies, HR, email, mobile..."
          size="small"
          sx={{ minWidth: { xs: 180, md: 320 } }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {isFetching ? <CircularProgress color="inherit" size={18} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      noOptionsText={input.length < 2 ? 'Type at least 2 characters' : 'No results found'}
    />
  )
}
