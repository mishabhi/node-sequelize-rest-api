import {Sequelize} from 'sequelize'
import {Project} from '../domain/project.domain'

const db = 'project-management'
const username = 'postgres'
const password = 'Test@123'

export const dbConfig = new Sequelize(db, username, password, {
  dialect: "postgres",
  host: 'localhost',
  port: 5432,
});