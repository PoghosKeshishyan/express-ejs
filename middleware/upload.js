const multer = require('multer');
const path = require('path');

// Set up storage for the images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
