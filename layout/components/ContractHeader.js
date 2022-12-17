import React from 'react'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'

const ContractHeader = () => {
  const router = useRouter()
  const address = router.query.address

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ height: '40px', color: 'secondary', justifyContent: 'center' }}
      >
        <Toolbar>
          <Typography variant="h4" sx={{ color: 'white', flexGrow: 20 }}>
            contract
          </Typography>
          <Typography variant="h5" sx={{ color: 'white', flexGrow: 1 }}>
            <Link href={'/contract/info?address=' + address}>Info</Link>
          </Typography>
          <Typography variant="h5" sx={{ color: 'white', flexGrow: 1 }}>
            <Link href={'/contract/useCase?address=' + address}>UseCase</Link>
          </Typography>
          <Typography variant="h5" sx={{ color: 'white', flexGrow: 1 }}>
            <Link href={'/contract/classDiagram?address=' + address}>
              ClassDiagram
            </Link>
          </Typography>
          <Typography variant="h5" sx={{ color: 'white', flexGrow: 1 }}>
            <Link href={'/contract/storage?address=' + address}>Storage</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default ContractHeader
