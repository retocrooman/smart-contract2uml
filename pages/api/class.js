// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const parserGeneral = require('sol2uml/lib/parserGeneral.js')
const converterClasses2Dot = require('sol2uml/lib/converterClasses2Dot.js')
const writerFiles = require('sol2uml/lib/writerFiles.js')
const fs = require('fs')

export default async function handler(req, res) {
  const fileFolderAddress = req.body.address
  try {
    let { umlClasses } = await (0, parserGeneral.parserUmlClasses)(
      fileFolderAddress,
      '-k 1VGCERK377QSHA5EU1X3IHVV42NM6PJJAR',
    )
    const dotString = (0, converterClasses2Dot.convertUmlClasses2Dot)(
      umlClasses,
    )
    const svg = await writerFiles.convertDot2Svg(dotString)
    fs.writeFileSync('./public/classDiagram.svg', svg)
    res.status(200).json({ svg: svg })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
}
