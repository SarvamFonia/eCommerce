const Product = require("../../models/Product");
const { imageUploadUtils } = require("../../utils/cloudinary");

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtils(url);

        res.json({
            success: true,
            result
        })
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: 'Error occured'
        })
    }
}


// Add a new product

const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

        const newProduct = new Product({ image, title, description, category, brand, price, salePrice, totalStock })

        await newProduct.save();
        res.status(201).json({
            success: true,
            data: newProduct
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

// Fetch all product

const fetchAllProduct = async (req, res) => {
    try {
        const listOfProducts = await Product.find({});
        res.status(200).json({
            success: true,
            data: listOfProducts
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

// Edit a product


const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
        const findProduct = await Product.findById(id)
        if (!findProduct) return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price || 0
        findProduct.salePrice = salePrice || 0
        findProduct.totalStock = totalStock || findProduct.totalStock
        findProduct.image = image || findProduct.image

        await findProduct.save()

        res.status(200).json({
            success: true,
            data: findProduct
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

// Delete a product

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id)
        if (!product) return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}


module.exports = { handleImageUpload, addProduct, fetchAllProduct, editProduct, deleteProduct }