import express from 'express'
import moment from 'moment'

import Media from '../../models/Media'

var router = express.Router()

router.get('/posts', async (req, res) => {
    await Media.find().sort({$natural:-1}).exec(function(err, posts) { 
        if (posts) {
            return res.status(200).json({ posts: posts})
        }
        else {
            return res.status(200).json({ posts: "none"})
        }
    })
})

export default router