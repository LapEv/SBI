import type { Request, Response } from 'express'
import { AddressesRepos, RegionsRepos } from '../db'

export class addressService {
  newAddress = async (_req: Request, res: Response) => {
    try {
      await AddressesRepos.create(_req.body)
      const addresses = await AddressesRepos.findAll({})
      res.status(200).json(addresses)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error: unable to set role', err] })
    }
  }

  getAddresses = (_req: Request, res: Response) => {
    console.log('Addresses')
    AddressesRepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  deleteAddress = async (_req: Request, res: Response) => {
    const data = _req.body
    try {
      const addresses = await Promise.all([
        await data.map(async (value: string) => {
          await AddressesRepos.destroy({
            where: { id: value },
          })
        }),
        await AddressesRepos.findAll({}),
      ])
      res.status(200).json(addresses[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeAddress = async (_req: Request, res: Response) => {
    const { address, coordinates, activeRolesGroup } = _req.body
    try {
      await AddressesRepos.update(activeRolesGroup, {
        address,
        coordinates,
      })
      const addresses = await AddressesRepos.findAll({})
      res.status(200).json(addresses)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  newRegion = async (_req: Request, res: Response) => {
    try {
      await RegionsRepos.create(_req.body)
      const regions = await RegionsRepos.findAll({})
      res.status(200).json(regions)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error: unable to set role', err] })
    }
  }

  getRegions = (_req: Request, res: Response) => {
    RegionsRepos.findAll({})
      .then(regions => res.status(200).json(regions))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  deleteRegion = async (_req: Request, res: Response) => {
    const data = _req.body
    try {
      const regions = await Promise.all([
        await data.map(async (value: string) => {
          await RegionsRepos.destroy({
            where: { id: value },
          })
        }),
        await RegionsRepos.findAll({}),
      ])
      res.status(200).json(regions[1])
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
  changeRegion = async (_req: Request, res: Response) => {
    const { region, id } = _req.body
    try {
      await RegionsRepos.update(id, {
        region,
      })
      const regions = await RegionsRepos.findAll({})
      res.status(200).json(regions)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      res.status(500).json({ error: ['db error', err] })
    }
  }
}
