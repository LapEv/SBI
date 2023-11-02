// import type { Request, Response } from 'express'
// import { AddressesRepos, RegionsRepos } from '../db'

export class clientService {
  // newAddress = async (_req: Request, res: Response) => {
  //   try {
  //     await AddressesRepos.create({ ..._req.body, active: true })
  //     const addresses = await AddressesRepos.findAll({where: { active: true }})
  //     res.status(200).json(addresses)
  //     /* eslint-disable @typescript-eslint/no-explicit-any */
  //   } catch (err: any) {
  //     /* eslint-enable @typescript-eslint/no-explicit-any */
  //     res
  //       .status(500)
  //       .json({ error: ['db error: unable to set new address', err] })
  //   }
  // }
  // getAllAddresses = (_req: Request, res: Response) => {
  //   AddressesRepos.findAll({})
  //     .then(item => res.status(200).json(item))
  //     .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  // }
  // getAddresses = (_req: Request, res: Response) => {
  //   AddressesRepos.findAll({
  //     where: { active: true },
  //   })
  //     .then(addresses => {
  //       res.status(200).json(addresses)
  //     })
  //     .catch(err => res.status(500).json({ error: ['db error', err] }))
  // }
  // deleteAddress = async (_req: Request, res: Response) => {
  //   const { selectedAddresses } = _req.body
  //   try {
  //     const addresses = await Promise.all([
  //       await selectedAddresses.map(async (value: string) => {
  //         await AddressesRepos.update(value, {
  //           active: false,
  //         })
  //       }),
  //       await AddressesRepos.findAll({where: { active: true }}),
  //     ])
  //     res.status(200).json(addresses[1])
  //     /* eslint-disable @typescript-eslint/no-explicit-any */
  //   } catch (err: any) {
  //     /* eslint-enable @typescript-eslint/no-explicit-any */
  //     res.status(500).json({ error: ['db error', err] })
  //   }
  // }
  // fullDeleteAddress = async (_req: Request, res: Response) => {
  //   const { selectedAddresses } = _req.body
  //   try {
  //     const addresses = await Promise.all([
  //       await selectedAddresses.map(async (value: string) => {
  //         await AddressesRepos.destroy({
  //           where: { id: value },
  //         })
  //       }),
  //       await AddressesRepos.findAll({}),
  //     ])
  //     res.status(200).json(addresses[1])
  //     /* eslint-disable @typescript-eslint/no-explicit-any */
  //   } catch (err: any) {
  //     /* eslint-enable @typescript-eslint/no-explicit-any */
  //     res.status(500).json({ error: ['db error', err] })
  //   }
  // }
  // pullAddressFromArchive = async (_req: Request, res: Response) => {
  //   const { selectedAddresses } = _req.body
  //   try {
  //     await AddressesRepos.update(selectedAddresses, {
  //       active: true,
  //     })
  //     const users = await AddressesRepos.findAll({
  //       where: { active: true },
  //     })
  //     res.status(200).json(users)
  //     /* eslint-disable @typescript-eslint/no-explicit-any */
  //   } catch (err: any) {
  //     /* eslint-enable @typescript-eslint/no-explicit-any */
  //     res.status(500).json({ error: ['db error', err] })
  //   }
  // }
  // changeAddress = async (_req: Request, res: Response) => {
  //   const { newAddress, id } = _req.body
  //   try {
  //     await AddressesRepos.update(id, newAddress)
  //     const addresses = await AddressesRepos.findAll({where: { active: true }})
  //     res.status(200).json(addresses)
  //     /* eslint-disable @typescript-eslint/no-explicit-any */
  //   } catch (err: any) {
  //     /* eslint-enable @typescript-eslint/no-explicit-any */
  //     res.status(500).json({ error: ['db error', err] })
  //   }
  // }
}
