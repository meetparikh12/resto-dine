const multer = require('multer');
const {v4 : uuidv4} = require('uuid');
const ErrorHandling = require('../models/ErrorHandling');
const MIME_TYPE = {
    "image/png": 'png',
    "image/jpeg" :'jpeg',
    "image/jpg": 'jpg'
}

const fileStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'uploads/images')
    }, 
    filename: (req,file,cb) => {
        const extension = "." +MIME_TYPE[file.mimetype]
        cb(null, uuidv4() +extension)
    }
})

const fileUpload = multer({
    storage: fileStorage,
    limits: 5000*1000,
    fileFilter: (req,file,cb) => {
        const isValid = !!MIME_TYPE[file.mimetype]
        let error = isValid ? null : new ErrorHandling('Uh oh, You can only upload *.png, *.jpeg, *.jpg files', 422)
        cb(error, isValid)
    }
})

module.exports = fileUpload;