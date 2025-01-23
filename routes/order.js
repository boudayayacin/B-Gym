
const express = require("express")
const { getAllOrders, deleteOrder, createOrder, updateOrder, getOneOrder, getAllMyOrders } = require("../Controller/Order")


const router = express.Router()
require("dotenv").config

router.get('/', getAllOrders)
router.post('/', createOrder)
router.delete('/:id', deleteOrder)
router.put('/:id', updateOrder)
router.get('/:id', getOneOrder)
router.get('/myorder', getAllMyOrders)

module.exports = router