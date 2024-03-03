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
        /* eslint-disable @typescript-eslint/no-explicit-any */
        files: any
      }
      filesName: any
      /* eslint-enable @typescript-eslint/no-explicit-any */
    }
  }
}

export class filesService {
  uploadFiles = async (_req: Request, res: Response) => {
    const { incident, type, filesName, id_incFiles } = _req.body
    const { files } = _req.files
    try {
      const typeDir = type === 'IncidentActs' ? type : ''
      if (files.constructor !== Array) {
        const filePath = path.join(
          __dirname,
          `../Files/${typeDir}/${incident}/${filesName}`
        )
        if (!fs.existsSync(filePath)) {
          files.mv(filePath)
        }
        const uploadedFiles = [
          {
            name: filesName,
            size: files.size,
            mimetype: files.mimetype,
            path: `${typeDir}/${incident}/${filesName}`,
            id_incFiles,
          },
        ]
        await FilesRepos.bulkCreate(uploadedFiles)
        res.status(200).json(uploadedFiles)
        return
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const uploadedFiles = files.map((item: any, index: number) => {
        /* eslint-enable @typescript-eslint/no-explicit-any */
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({
        error: ['db error: unable to get files: ', err],
      })
    }
  }
}
