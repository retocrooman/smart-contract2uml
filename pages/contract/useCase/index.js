import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { commentMap } from '../../../constant/comment'
import ContractHeader from '../../../layout/components/ContractHeader'

const urlFront =
  'https://api.etherscan.io/api?module=contract&action=getsourcecode&address='
const urlBack = '&apikey=' + process.env.REACT_APP_ETHERSCAN_API

const ContractUseCase = () => {
  const router = useRouter()
  const address = router.query.address

  const [abis, setAbis] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    init()
  }, [address])

  useEffect(() => {
    createData()
  }, [abis])

  const init = async () => {
    if (!address) return
    try {
      const response = await fetch(urlFront + address + urlBack)
      const data = await response.json()
      if (data.status != 1) return
      const array = JSON.parse(data.result[0].ABI)
      const abis = array.filter((abi) => abi.type === 'function')
      console.log(abis)
      setAbis(abis)
    } catch (error) {
      console.log(error)
    }
  }

  function createData() {
    const data = abis.map(({ name, stateMutability, inputs, outputs }) => {
      const inputsString = inputs
        .map(
          (input) =>
            input.internalType +
            ': ' +
            (input.name !== '' ? input.name : 'hoge'),
        )
        .toString()
        .replace(/"/g, '')
        .replace(/,/g, ',  ')
      const outputsString = outputs
        .map(
          (output) =>
            output.internalType +
            ': ' +
            (output.name !== '' ? output.name : 'hoge'),
        )
        .toString()
        .replace(/"/g, '')
        .replace(/,/g, ',  ')
      let comment = ''
      try {
        comment = commentMap[address]['function'][name]
      } catch (e) {
        comment = 'unset'
      }
      return {
        name,
        stateMutability,
        inputsString,
        outputsString,
        comment,
      }
    })
    setRows(data)
  }

  return (
    <>
      <ContractHeader />
      <Box style={{ padding: 20 }}>
        <Typography variant="h4">UseCase</Typography>
        <Box sx={{ padding: 1, minHeight: '75vh' }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>function name</TableCell>
                  <TableCell align="right">stateMutability</TableCell>
                  <TableCell align="right">inputs</TableCell>
                  <TableCell align="right">outputs</TableCell>
                  <TableCell align="right">comment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.stateMutability}</TableCell>
                    <TableCell align="right">{row.inputsString}</TableCell>
                    <TableCell align="right">{row.outputsString}</TableCell>
                    <TableCell align="right">{row.comment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  )
}

export default ContractUseCase
