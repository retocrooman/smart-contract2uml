import { useEffect, useContext } from 'react'
import Image from 'next/image'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ContractHeader from '../../../layout/components/ContractHeader'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'

const ContractClassDiagram = () => {
  const router = useRouter()
  const address = router.query.address

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    init()
  }, [address])

  const init = async () => {
    if (!address) return
    try {
      await fetch('/api/class', {
        method: 'POST',
        body: JSON.stringify({ address: address }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  const onClick = () => {
    router.reload()
  }

  return (
    <>
      <ContractHeader />
      <Box style={{ padding: 20 }}>
        <Typography variant="h4">ClassDiagram</Typography>
        <Button onClick={onClick}>reload</Button>
        <Box style={{ padding: 1, overflow: 'auto' }}>
          <Image
            src="/classDiagram.svg"
            alt="classDiagram"
            width="2400"
            height="700"
          />
        </Box>
      </Box>
    </>
  )
}

export default ContractClassDiagram
