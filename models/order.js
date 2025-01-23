const { ref, required } = require("joi");
const { default: mongoose } = require("mongoose");


const OrderItemsSchema = new mongoose.Schema ({
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
        required: true 
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},{_id: false})

const OrderSchemma = new mongoose.Schema({
    items : [OrderItemsSchema] ,

    total: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    }
},{timestamps: true})

const Order = mongoose.model("Order", OrderSchemma)

module.exports = Order