import {sequelize} from "../database/database";
import {INTEGER, STRING} from "sequelize";
import {Category} from "./Category";

const Product = sequelize.define('products',{
    id:{
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
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
// Product.belongsTo(Category)
Product.belongsTo(Category,{foreignKey:'category_id'})
Category.hasMany(Product, {foreignKey:'category_id'})

export default Product;