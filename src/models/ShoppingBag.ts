import {sequelize} from "../database/database";
import {INTEGER} from "sequelize";
import Product from "./Product";
import {User} from "./User";

const ShoppingBag = sequelize.define('shopping_bag', {
    id:{
        type: INTEGER,
        primaryKey: true,
        autoIncrement:true
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
},{
    timestamps:false
})
ShoppingBag.belongsTo(Product, {foreignKey:'product_id'});
Product.hasMany(ShoppingBag, {foreignKey:'product_id'});
ShoppingBag.belongsTo(User, {foreignKey:'user_id'});
User.hasMany(ShoppingBag, {foreignKey:'user_id'});

export default ShoppingBag;
