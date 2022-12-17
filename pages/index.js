import Image from 'next/image'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ArrowRight } from '@mui/icons-material'

export default function Home() {
  return (
    <>
      <Typography variant="h4">ClassDiagram</Typography>
      <Box sx={{ padding: 1, minHeight: '80vh' }}>
        <div
          style={{
            padding: 150,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Image src="/ethereum.svg" width="500" height="500" />
          <ArrowRight sx={{ width: '200px', height: '200px' }} />
          <Image src="/uml.svg" width="500" height="500" />
        </div>
      </Box>
    </>
  )
}
