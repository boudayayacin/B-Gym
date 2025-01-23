const express = require('express')

const router = express.Router()
const cloudinary = require('../utililites/cloudinary-config')
const upload = require('../utililites/multer-config')

router.post('/upload', upload.single('photo', function(req,res){

    cloudinary.uploader.upload(req.file.path , function(err , result){
        
        if (err){
            console.log(err)
            return res.stauts(500).json({
                success: false ,
                message: "Error"
            })
        }
        res.stauts(200).json({
            success: true ,
            message:'Uploaded',
            data: result
    
        })
    })
}))
module.exports = router