import {sequelize} from "../database/database";
import {INTEGER} from "sequelize";

const ShoppingBag = sequelize.define('shopping_bag', {
    id:{
        type: INTEGER,
        primaryKey: true
    },
    product_id:{
        type: INTEGER
    },
    user_id: {
        type: INTEGER
    },
    quantity:{
        type: INTEGER
    },
    total: {
        type:INTEGER
    }
})
