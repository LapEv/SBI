import type { Request, Response } from 'express'
import { FilesRepos } from '../db'
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
    const { incident, type, filesName, id_incFiles } = _req.body
    const { files } = _req.files
    console.log('files = ', files)
    console.log('id_incFiles = ', id_incFiles)
    try {
      const typeDir = type === 'IncidentActs' ? type : ''
      const uploadedFiles = files.map((item: any, index: number) => {
        const filePath = path.join(
          __dirname,
          `../Files/${typeDir}/${incident}/${filesName[index]}`
        )
        if (!fs.existsSync(filePath)) {
          item.mv(filePath)
        }
        return {
          name: filesName[index],
          size: item.size,
          mimetype: item.mimetype,
          path: `${typeDir}/${incident}/${filesName[index]}`,
          id_incFiles,
        }
      })
      console.log('uploadedFiles = ', uploadedFiles)
      await FilesRepos.bulkCreate(uploadedFiles)
      res.status(200).json(uploadedFiles)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({
        error: ['db error: unable to upload files: ', err],
      })
    }
  }
  getFiles = async (_req: Request, res: Response) => {
    try {
      const files = await FilesRepos.findAll({})
      res.status(200).json(files)
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({
        error: ['db error: unable to get files: ', err],
      })
    }
  }
}
