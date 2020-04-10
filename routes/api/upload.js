import express from 'express'
import multer from 'multer'
import moment from 'moment'

import User from '../../models/User'
import Family from '../../models/Family'
import Event from '../../models/Event'

var router = express.Router()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'client/public/img')
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

    switch (purpose) {
        case 'profilePicture': {
            await User.findOne({ email: email }).then(async (user) => {
                user.headshotURL = path.substring(13)
                await user.save()
            })
            break
        }
        case 'points': {
            const caption = req.body.caption
            await Family
                .findOne({ members: { $in : [email] }})
                .then(family => {
                    const hangout = {
                        filepath: path.substring(13),
                        email: email,
                        caption: caption,
                        time: moment().format('LL')
                    }
                    family.score = family.score + 5
                    family.pictures.push(hangout)
                    family.save()
                })
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
        case 'event': {
            const newEvent = new Event({
                title: req.body.title,
                time: req.body.time,
                description: req.body.description,
                banner: path,
            })

            await newEvent.save()

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