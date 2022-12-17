import { useContext } from 'react'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { SearchQueryContext } from '../../context/SearchQueryContext'

const SearchBar = () => {
  const router = useRouter()
  const { searchQuery, setSearchQuery } = useContext(SearchQueryContext)

  const onSubmit = (e) => {
    if (searchQuery.length == 42) {
      e.preventDefault()
      router.push(`/contract/info?address=${searchQuery}`)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ backgroundColor: 'white', borderRadius: 1 }}>
          <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
              setSearchQuery(e.target.value)
            }}
            label="Search by Address / Token"
            variant="filled"
            placeholder="Search..."
            size="small"
            sx={{
              width: '500px',
            }}
          />
        </Box>
        <IconButton type="submit">
          <SearchIcon sx={{ height: '30px', width: '30px', color: 'white' }} />
        </IconButton>
      </div>
    </form>
  )
}

export default SearchBar
