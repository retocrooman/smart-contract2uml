import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const Bottom = () => {
  return (
    <Box>
      <AppBar position="static" sx={{ height: '7vh' }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 10 }}>
            スマートコントラクトをUML化するプラットフォーム
          </Typography>
          <Typography
            component="a"
            href="https://github.com/retocrooman/smart-contract2uml"
            variant="h5"
            sx={{ color: 'white', flexGrow: 1 }}
          >
            Github
          </Typography>
          <Typography
            component="a"
            href="https://twitter.com/retocrooman"
            variant="h5"
            sx={{ color: 'white', flexGrow: 1 }}
          >
            Twitter
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Bottom
