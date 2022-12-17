import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { AutoGraph } from '@mui/icons-material'
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <Box>
      <AppBar position="static" sx={{ height: '60px' }}>
        <Toolbar>
          <AutoGraph sx={{ height: '40px', width: '40px', flexGrow: 1 }} />
          <Typography component="a" href="/" variant="h3" sx={{ flexGrow: 30 }}>
            smart-contract2uml
          </Typography>
          <SearchBar />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
