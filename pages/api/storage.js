// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const parserGeneral = require('sol2uml/lib/parserGeneral.js')
const converterClasses2Storage = require('sol2uml/lib/converterClasses2Storage.js')
const converterStorage2Dot = require('sol2uml/lib/converterStorage2Dot.js')
const writerFiles = require('sol2uml/lib/writerFiles.js')
const fs = require('fs')

export default async function handler(req, res) {
  const fileFolderAddress = req.body.address
  try {
    let { umlClasses, contractName } = await (0,
    parserGeneral.parserUmlClasses)(
      fileFolderAddress,
      '-k 1VGCERK377QSHA5EU1X3IHVV42NM6PJJAR',
    )
    const storages = (0, converterClasses2Storage.convertClasses2Storages)(
      contractName,
      umlClasses,
    )
    storages[0].address = fileFolderAddress
    const storage = storages.find((so) => so.name === contractName)
    await converterClasses2Storage.addStorageValues(
      'https://mainnet.infura.io/v3/c4981f335b804089bc59f3a13c3a2245',
      fileFolderAddress,
      storage,
    )
    const dotString = converterStorage2Dot.convertStorages2Dot(storages, '-d')
    const svg = await writerFiles.convertDot2Svg(dotString)
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(svg);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
}
