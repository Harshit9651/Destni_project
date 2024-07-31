
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECREAT,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Folder name in Cloudinary
        format: async (req, file) => {
            const extension = file.mimetype.split('/')[1];
            return ['png', 'jpg', 'jpeg', 'pdf'].includes(extension) ? extension : 'jpg';
        }, // supports promises as well
        public_id: (req, file) => file.originalname,
    },
    allowedFormats: ['png', 'jpg', 'jpeg', 'pdf'],
});

const upload = multer({ storage: storage });

module.exports = {
    cloudinary,
    upload,
};
