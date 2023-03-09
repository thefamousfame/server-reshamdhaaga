const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    add_time:{
        type: Date,
        default: Date.now
    },
    id:{
        type: String,
        required: true,
        unique: true
    },
    product_type:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        trim: true
    },
    photos:{
        type: Array,
        required: true
    },
    instagram_link:{
        type: String
    }
    
} )

// new collection
const product = new mongoose.model("products", productSchema)

module.exports = product