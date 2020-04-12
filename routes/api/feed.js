import express from 'express'
import moment from 'moment'

import Media from '../../models/Media'

var router = express.Router()

router.get('/posts', async (req, res) => {
    let pageLimit = req.body.postPer
    await Media.find().sort({$natural:-1}).limit(Number(pageLimit)).exec(function(err, posts) { 
        console.log(posts)
        console.log(pageLimit)
        if (posts) {
            return res.status(200).json({ posts: posts})
        }
        else {
            return res.status(200).json({ posts: "none"})
        }
    })
})

export default router