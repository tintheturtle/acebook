import express from 'express'
import Family from '../../models/Family'

var router = express.Router()

router.post('/', async (req, res) =>{

    // Retrieve email from request
    const email = req.body.email

    await Family
        .findOne({ member: [email]})
        .then(family => {
            let object = null
            if (!family) {
                object = 'You have not been assigned a family.'
            }
            else {
                object = family
            }
            res.json({
                family: object
            })
        })
        .catch(err => {
            console.log(err)
        })
})

export default router