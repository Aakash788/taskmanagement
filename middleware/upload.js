const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Middleware function
const uploadMiddleware = (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            // Handle error
            return res.status(400).json({ error: 'File upload failed' });
        }
        next();
    });
};

module.exports = uploadMiddleware;