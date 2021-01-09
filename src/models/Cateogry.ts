import {INTEGER, STRING} from 'sequelize';
import {sequelize} from "../database/database";

export const Category = sequelize.define('categories',{
    id:{
        type: INTEGER,
        primaryKey: true
    },
    name:{
        type: STRING
    }
}, {
    timestamps: false
})