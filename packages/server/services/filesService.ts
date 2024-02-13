import type { Request, Response } from 'express'
// import { AppConst } from '../const'
const fs = require('fs')
const path = require('path')

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
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
    try {
      const typeDir = type === 'IncidentActs' ? type : ''
      files.map((item: any, index: number) => {
        const filePath = path.join(
          __dirname,
          `../Files/${typeDir}/${incident}/${filesName[index]}`
        )
        console.log('filePath = ', filePath)

        if (!fs.existsSync(filePath)) {
          console.log('item = ', item)
          item.mv(filePath)
        }
      })

      // https://www.dhiwise.com/post/how-to-implement-react-mui-file-upload-in-your-applications
      // https://www.bezkoder.com/material-ui-file-upload/
      res.status(200).json('ok')
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({
        error: ['db error: unable to upload files', err],
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
