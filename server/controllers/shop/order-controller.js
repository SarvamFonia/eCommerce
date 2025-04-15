const paypal = require('../../utils/paypal')
const Order = require('../../models/Orders')
const Cart = require('../../models/Cart')
const Orders = require('../../models/Orders')
const Product = require('../../models/Product')

const createOrder = async (req, res) => {
    try {
        const {
            userId,
            cartItems,
            payerId,
            paymentId,
            orderUpdateDate,
            orderDate,
            totalAmmount,
            paymentStatus,
            paymentMethods,
            orderStatus,
            addressInfo,
            cartId
        } = req.body


        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',

            },
            redirect_urls: {
                return_url: 'http://localhost:5173/shop/paypal-return',
                cancel_url: 'http://localhost:5173/shop/paypal-cancel'
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map(item => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity,

                        }))
                    },
                    amount: {
                        currency: 'USD',
                        total: totalAmmount.toFixed(2),

                    },
                    description: 'description'
                }
            ]
        }

        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.log(error)
                return res.status(500).json({
                    success: false,
                    message: "Payment failed"
                });
            } else {
                const newOrder = Order({
                    userId,
                    cartItems,
                    payerId,
                    paymentId,
                    orderUpdateDate,
                    orderDate,
                    totalAmmount,
                    paymentStatus,
                    paymentMethods,
                    orderStatus,
                    addressInfo,
                    cartId
                })

                await newOrder.save()

                const approval_url = paymentInfo?.links.find(link => link.rel === 'approval_url').href

                res.status(201).json({
                    success: true,
                    approval_url,
                    orderId: newOrder._id
                });

            }
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

const capturePayment = async (req, res) => {
    try {
        const { paymentId, payerId, orderId } = req.body

        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order can not be found'
            })

        }

        order.paymentStatus = 'paid'
        order.orderStatus = 'confirmed'
        order.paymentId = paymentId
        order.payerId = payerId

        for(let item of order.cartItems){
            let product = await Product.findById(item.productId)

            if(!product){
                return res.status(404).json({
                    success: false,
                    message: `Not enough stock for this product ${product.title}`
                })
            }

            product.totalStock -= item.quantity;
            await product.save();
        }

        const getCartId = order.cartId;
        await Cart.findByIdAndDelete(getCartId)

        await order.save();

        res.status(200).json({
            success: true,
            message: 'Order confirmed',
            data: order
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}


const getAllOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Orders.find({ userId });
        if (!orders.length)
            return res.status(404).json({
                success: true,
                message: "No orders found!"
            })

        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

const getOrderDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const orders = await Orders.findById(id);

        if (!orders)
            return res.status(404).json({
                success: true,
                message: "Orders not found!"
            })
        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

module.exports = { createOrder, capturePayment, getAllOrdersByUser, getOrderDetails }