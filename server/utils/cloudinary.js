const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dd6omh7gu',
    api_key: '244652221631115',
    api_secret: '39IjSmNkTzhwfD9qYFtpeFbDvDY'
})

const storage = new multer.memoryStorage();

const imageUploadUtils = async(file) => {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    })

    return result
}

const upload = multer({storage});

module.exports = {upload, imageUploadUtils};