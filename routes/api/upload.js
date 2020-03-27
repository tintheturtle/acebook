import express from 'express'
import multer from 'multer'

import User from '../../models/User'

var router = express.Router()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'client/public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage })

router.post('/', upload.single('file'), async (req, res) => {
    
    const purpose = req.body.purpose
    const path = req.file.path
    const email = req.body.email
    console.log(email, purpose, path)

    switch (purpose) {
        case 'profilePicture': {
            await User.findOne({ email: email }).then(async (user) => {
                user.headshotURL = path.substring(13)
                await user.save()
                console.log(user.headshotURL)
            })
            break
        }
        case 'points': {
            const caption = req.body.caption
            console.log(caption)
            break
        }
        case 'misc': {
            console.log('Misc')
            break
        }
        case 'spotlight': {
            console.log('Spotlight')
            break
        }
        default: {
            console.log('Default case activated')
            break
        }
    }


    return res.status(200).send(req.file)

})

export default router