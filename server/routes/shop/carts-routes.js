const express = require('express')
const { addToCart, fetchCartItems, updateCartItems, deleteCartItems } = require('../../controllers/shop/shopCart-controller')

const router = express.Router()

router.post('/add', addToCart);
router.get('/get/:userId', fetchCartItems)
router.put('/update-cart', updateCartItems)
router.delete('/delete/:userId/:productId', deleteCartItems)

module.exports = router