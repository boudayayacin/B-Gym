const Order = require("../models/order");


const createOrder = async(req ,res)=>{
    try {
        const order =new Order({
            items: req.body.items,
            user: req.user._id,
            total,

        }) 
        const saveOrder = await order.save()
        req.user.password = undefined
        saveOrder.user = req.user
        res.status(201).json({
            message: "Order created successfully",
            order: saveOrder
        })

    } catch (error) {
        res.status(500).json({ error: error.message });   
    }
}

const getAllOrders = async(req,res)=>{
    try {
        const order = await Order.find().populate('user', '-password').populate("items.article")
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
const getAllMyOrders = async (req, res) => {
    const userId = req.user._id;
    try {
        const myOrders = await Order.find({user: userId}).populate('user', '-password').populate("items.article")
        res.status(200).json(myOrders)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const orderToDeleteId = req.params.id
        const result = await Order.deleteOne({ _id: orderToDeleteId })
        if (result.deletedCount === 1) {
            res.json({
                message: "Order deleted successfully",
                order: {
                    _id: orderToDeleteId,
                }
            })
        } else {
            res.status(404).json({error: "Order not found"})
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const getOneOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', '-password').populate("items.article")
        if (order) {
            res.status(200).json(order)
        } else {
            res.status(404).json({ error: "Order not found" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const updateOrder = async (req, res) => {
    try {
        const orderToUpdateId = req.params.id
       
            const order = await Order.findOneAndUpdate({ _id: orderToUpdateId, user: req.user._id }, { $set: req.body }, { new: true, populate: [{ path: "user", select: "-password" }] })
            if (!order) {
                res.status(404).json({error: "Order not found"})
            } else {
                res.status(200).json({
                    message: "Order updated successfully",
                    order
                })
            }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
module.exports = {
    createOrder,
    getAllOrders,
    getAllMyOrders,
    deleteOrder,
    getOneOrder,
    updateOrder
}
