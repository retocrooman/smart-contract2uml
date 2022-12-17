import React, { useEffect, useState, useContext } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ContractHeader from '../../../layout/components/ContractHeader'
import { useRouter } from 'next/router'
import { commentMap } from '../../../constant/comment'

const urlFront =
  'https://api.etherscan.io/api?module=contract&action=getsourcecode&address='
const urlBack = '&apikey=' + process.env.REACT_APP_ETHERSCAN_API

const ContractInfo = () => {
  const router = useRouter()
  const address = router.query.address

  const [info, setInfo] = useState({})
  const [comment, setComment] = useState('')

  useEffect(() => {
    init()
  }, [address])

  const init = async () => {
    if (!address) return
    try {
      const response = await fetch(urlFront + address + urlBack)
      const data = await response.json()
      if (data.status != 1) return
      setInfo(data.result[0])
    } catch (error) {
      console.log(error)
    }
    try {
      const comment = commentMap[address]['comment']
      setComment(comment)
    } catch (error) {
      setComment('')
    }
  }

  const makeInfoString = (infoName, str) => {
    if (str === undefined || str == '') return <></>
    return (
      <>
        <Typography variant="h6">{'<' + infoName + '>'}</Typography>
        <Typography variant="h6">{str}</Typography>
      </>
    )
  }

  const checkOptimizationUsed = (str) => {
    if (str == 1) return 'true'
    else return 'false'
  }

  const checkProxy = (str) => {
    if (str == 1) return 'true'
    else return 'false'
  }

  return (
    <>
      <ContractHeader />
      <Box style={{ padding: 20 }}>
        <Typography variant="h4">Info</Typography>
        <Box sx={{ padding: 1, minHeight: '75vh' }}>
          {makeInfoString('Address', address)}
          {makeInfoString('ContractName', info.ContractName)}
          {makeInfoString('CompilerVersion', info.CompilerVersion)}
          {makeInfoString('ConstructArguments', info.ConstructArguments)}
          {makeInfoString('LicenseType', info.LicenseType)}
          {makeInfoString(
            'OptimizationUsed',
            checkOptimizationUsed(info.OptimizationUsed),
          )}
          {makeInfoString('Runs', info.Runs)}
          {makeInfoString('Proxy', checkProxy(info.Proxy))}
          {makeInfoString('Implementation', info.Implementation)}
          {makeInfoString('Library', info.Library)}
          {makeInfoString('EVMVersion', info.EVMVersion)}
          {makeInfoString('SwarmSource', info.SwarmSource)}
          {makeInfoString('Comment', comment)}
        </Box>
      </Box>
    </>
  )
}

export default ContractInfo
