import express from 'express'


import Family from '../../models/Family'
import validateFamilyInput from '../../utils/validation/createFamily'

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

router.post("/create", (req,res) => {
    const { errors, isValid } = validateFamilyInput(req.body)

    // Valid inputs
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const { email } = req.body
    const { name } = req.body


    const newFamily = new Family({
        members: email,
        name: name
    })
    newFamily.save().then( () => {
        res.json({
            status: 'success'
        })
    })


    return res.status(200)


})

export default router