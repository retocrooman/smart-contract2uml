import { useEffect, useState } from 'react'
import Image from 'next/image'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ContractHeader from '../../../layout/components/ContractHeader'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'

const ContractClassDiagram = () => {
  const router = useRouter()
  const address = router.query.address

  const [svg, setSvg] = useState("")

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    init()
  }, [address])

  const init = async () => {
    if (!address) return
    try {
      const res = await fetch('/api/class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address: address }),
      })
      const data = await res.text()
      setSvg(data)
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
        <Box  width="100%" height="700px" style={{ padding: 1, overflow: 'scroll' }}>
          <div
            dangerouslySetInnerHTML={{ __html: svg }}
            style={{transform: 'scale(0.5)', transformOrigin: 'top left'}}
          />
        </Box>
      </Box>
    </>
  )
}

export default ContractClassDiagram
