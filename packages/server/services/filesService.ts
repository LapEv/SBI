import type { Request, Response } from 'express'
// import { AppConst } from '../const'
// const fs = require('fs')
const path = require('path')

declare global {
  namespace Express {
    interface Request {
      files: {
        files: any
      }
      filesName: any
    }
  }
}

export class filesService {
  uploadFiles = async (_req: Request, res: Response) => {
    const { incident, type, filesName } = _req.body
    const { files } = _req.files
    // const { filesName } = _req.filesName
    console.log(' _req = ', _req)
    // console.log(' _req = ', _req.body)
    console.log(' _reqfiles = ', _req.files)
    console.log('files  = ', files)
    console.log('filesName  = ', filesName)
    console.log('incident  = ', incident)
    console.log('type  = ', type)
    try {
      const filePath = path.join(__dirname, '../IncidentActs/')
      // const filePath = `${process.env.FILE_PATH}\\${AppConst.path.incidentsActs}\\${incident}`
      // if (fs.existsSync(filePath)) {
      //   return res.status(400).json({
      //     message: AppConst.fileNotification.errorFileExists,
      //   })
      // }

      console.log('filePath = ', filePath)
      const temp = files.map(async (item: any, index: number) => {
        console.log('item = ', item)
        const temp = await item.mv(`${filePath}${filesName[index]}`)
        console.log('temp = ', temp)
      })

      console.log('temp = ', temp)
      res.status(200).json('temp')
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({
        error: ['db error: unable to set new sla', err],
      })
    }
  }
  getFiles = (_req: Request, res: Response) => {
    res.status(200).json('item')
    // SLARepos.findAll({
    //   include: includes,
    // })
    //   .then(item => res.status(200).json(item))
    //   .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
}
