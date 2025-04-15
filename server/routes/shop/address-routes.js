const express = require('express');
const { addAddress, fetchAddress, deleteAddress, editAddress } = require('../../controllers/shop/address-controller');

const router = express.Router();

router.post('/add', addAddress)
router.get('/get/:userId', fetchAddress)
router.delete('/delete/:userId/:addressId', deleteAddress)
router.put('/update/:userId/:addressId', editAddress)

module.exports = router