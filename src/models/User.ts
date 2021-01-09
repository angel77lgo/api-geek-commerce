import {ENUM, INTEGER, STRING} from "sequelize";
import {sequelize} from '../database/database';

export const User = sequelize.define('users',{
    id:{
        type: INTEGER,
        primaryKey: true
    },
    first_name:{
        type: STRING
    },
    last_name:{
        type: STRING
    },
    username: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: STRING,
        allowNull: false
    },
    role_type: {
        type: ENUM
    }
},{
    timestamps: false,
})

