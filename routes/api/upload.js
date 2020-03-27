import express from 'express'
import multer from 'multer'

var router = express.Router()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage })

router.post('/', upload.single('file'), (req, res) => {
    
    const purpose = req.body.purpose
    console.log(req.file.path)

    return res.status(200).send(req.file)

})

export default router