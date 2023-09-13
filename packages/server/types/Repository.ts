import type {
  Attributes,
  WhereAttributeHashValue,
  FindOptions,
  WhereOptions,
  DestroyOptions,
} from 'sequelize'
import type { Model, ModelCtor } from 'sequelize-typescript'
import type { MakeNullishOptional } from 'sequelize/types/utils'

export class Repository<T extends Model<T>> {
  model: ModelCtor<T>

  constructor(model: ModelCtor<T>) {
    this.model = model
  }

  public async create(
    value: MakeNullishOptional<T['_creationAttributes']>
  ): Promise<T> {
    return this.model.create(value)
  }

  public async findOrCreate(
    id: WhereAttributeHashValue<Attributes<T>['id']> | undefined,
    values: MakeNullishOptional<T['_creationAttributes']>
  ) {
    return this.model.findOrCreate({
      where: { id },
      defaults: {
        ...values,
      },
    })
  }

  public async update(
    id: WhereAttributeHashValue<Attributes<T>['id']> | undefined,
    values: MakeNullishOptional<T['_creationAttributes']>
  ): Promise<[affectedCount: number]> {
    return this.model.update(values, { where: { id } })
  }

  public async getAll(
    options?: FindOptions<Attributes<T>> | undefined
  ): Promise<T[]> {
    if (options) return this.model.findAll(options)
    else return this.model.findAll()
  }
  public async findAll(options: FindOptions<Attributes<T>>): Promise<T[]> {
    return this.model.findAll(options)
  }

  public async get(
    id: WhereAttributeHashValue<Attributes<T>['id']> | undefined
  ): Promise<T | null> {
    return this.model.findOne({ where: { id } })
  }

  public async delete(
    id: WhereAttributeHashValue<Attributes<T>['id']> | undefined
  ): Promise<number> {
    return this.model.destroy({ where: { id } })
  }

  public async destroy(
    options: DestroyOptions<Attributes<T>>
  ): Promise<number> {
    return this.model.destroy(options)
  }

  public async drop(options: DestroyOptions<Attributes<T>>): Promise<void> {
    return this.model.drop(options)
  }

  public async createOrDestroy(
    searchParameters: WhereOptions<Attributes<T>>,
    body: MakeNullishOptional<T['_creationAttributes']>
  ): Promise<T | null> {
    const data = await this.model.findOne({ where: searchParameters })

    if (data) {
      await data.destroy()

      return null
    } else {
      const res = await this.create(body)
      return res
    }
  }
}
