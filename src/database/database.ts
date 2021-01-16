import {Sequelize} from 'sequelize';
require('dotenv').config()

const user = process.env.DB_USER;
const database = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;
// @ts-ignore
export const sequelize = new Sequelize(database,
    user,
    password,
    {
        host: 'database',
        dialect: 'postgres',
        pool: {
            max:5,
            min:0,
            acquire: 30000,
            idle: 10000
        },
        logging: true
    })
