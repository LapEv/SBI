import { ModelCtor, Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { Repository } from './types/Repository'
import { users } from './models/users'
import { roles } from './models/roles'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost', //2048-postgresql-для докера localhost - для npm run dev:ssr
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
}

export const sequelize = new Sequelize(sequelizeOptions)

export const Roles = sequelize.define('Roles', roles, {})
export const Users = sequelize.define('Users', users, {})

Users.hasMany(Roles, { foreignKey: 'id' })
Roles.belongsTo(Users, { foreignKey: 'id', targetKey: 'id' })

export const userRepos = new Repository(Users as ModelCtor)
export const roleRepos = new Repository(Roles as ModelCtor)

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully!')

    // const themes = await themeRepos.getAll()
    // themeData.map(async data => {
    //   const find = themes.findIndex(
    //     value => value.dataValues.theme === data.theme
    //   )
    //   if (find < 0) {
    //     const resTheme = await themeRepos.create(data)
    //     const newTopic = { ...data.topic, id_theme: resTheme.id }
    //     const resTopic = await topicRepos.create(newTopic)
    //     const newComment = {
    //       ...data.comment,
    //       id_topic: resTopic.id,
    //       id_theme: resTheme.id,
    //     }
    //     await commentRepos.create(newComment)
    //   }
    // })
  } catch (error) {
    console.error('Unable to connect to the database: ', error)
  }
}
