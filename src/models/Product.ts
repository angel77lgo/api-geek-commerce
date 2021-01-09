import {sequelize} from "../database/database";
import {INTEGER, STRING} from "sequelize";

export const Product = sequelize.define('products',{
    id:{
        type: INTEGER,
        primaryKey: true
    },
    short_name:{
        type: STRING,
        allowNull: false
    },
    description:{
        type: STRING
    },
    price: {
        type: INTEGER
    },
    quantity:{
        type: INTEGER
    },
    brand:{
        type: STRING
    },
    image_url: {
        type: STRING
    },
    category_id:{
        type: INTEGER
    }
}, {
    timestamps: false
})
