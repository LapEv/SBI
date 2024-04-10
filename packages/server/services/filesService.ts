import type { Request, Response } from 'express'
import { FilesRepos } from '../db'
import * as fs from 'fs'
import * as path from 'path'
import dotenv from 'dotenv'
import { FileArray, UploadedFile } from 'express-fileupload'
dotenv.config()

export class filesService {
  uploadFiles = async (_req: Request, res: Response) => {
    const { incident, type, filesName, id_incFiles } = _req.body
    const { files } = _req.files as FileArray
    const typeDir = type === 'IncidentActs' ? type : ''
    const pathFiles =
      process.env.NODE_ENV === 'development'
        ? path.join(__dirname, `../Files/${typeDir}/${incident}/${filesName}`)
        : `process.env.FILE_PATH/${typeDir}/${incident}/${filesName}`
    try {
      if (files.constructor !== Array) {
        const file = files as UploadedFile
        if (!fs.existsSync(pathFiles)) {
          file.mv(pathFiles)
        }
        const uploadedFiles = [
          {
            name: filesName,
            size: file.size,
            mimetype: file.mimetype,
            path: `${typeDir}/${incident}/${filesName}`,
            id_incFiles,
          },
        ]
        await FilesRepos.bulkCreate(uploadedFiles)
        res.status(200).json(uploadedFiles)
        return
      }
      const uploadedFiles = files.map((item: UploadedFile, index: number) => {
        const filePath =
          process.env.NODE_ENV === 'development'
            ? path.join(
                __dirname,
                `../Files/${typeDir}/${incident}/${filesName[index]}`,
              )
            : `process.env.FILE_PATH/${typeDir}/${incident}/${filesName[index]}`
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
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getFiles = async (_req: Request, res: Response) => {
    try {
      const files = await FilesRepos.findAll({})
      res.status(200).json(files)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
}
