import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize('geek_commerce',
    'postgres',
    'postgres',
    {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max:5,
            min:0,
            acquire: 30000,
            idle: 10000
        },
        logging: true
    })