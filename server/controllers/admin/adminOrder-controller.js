
const Orders = require('../../models/Orders')
const getAllOrders = async (req, res) => {
    try {
        // const { userId } = req.params;
        const orders = await Orders.find();
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

const updateOrderStatus = async(req,res) => {
    try{
        const {id} = req.params;
        const {orderStatus} = req.body;
        const order = await Orders.findById(id);
        if (!order)
            return res.status(404).json({
                success: true,
                message: "Order not found!"
            })
        await Orders.findByIdAndUpdate(id,{orderStatus})

        res.status(200).json({
            success: true,
            message: 'Order status is updated successfully'
        })

    }catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

module.exports = { getAllOrders, getOrderDetails, updateOrderStatus}