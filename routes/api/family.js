import express from 'express'


import Family from '../../models/Family'
import User from '../../models/User'
import validateFamilyInput from '../../utils/validation/createFamily'

var router = express.Router()

router.post('/family', async (req, res) =>{

    // Retrieve email from request
    const email = req.body.email

    await Family
        .findOne({ members: { $in : [email] }})
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

router.post('/create', async (req,res) => {
    // Validate inputs
    const { errors, isValid } = validateFamilyInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }

    // Retrieve email list and properly format them into array
    const { email } = req.body
    const emailList = email.split(', ')
    console.log(emailList)

    // Retrieve users 
    let records = await User.find().where('email').in(emailList).exec()





    const { name } = req.body

    let success = true

    await Family.findOne( {members: { $in : emailList } } ).exec( (err, family) => {
        if (!family) {
            const newFamily = new Family({
                members: emailList,
                name: name,

            })
            newFamily.save().then( () => {
                success = true
            })
        }
        else {
            success = false
        }
        res.json({
            create: success
        })
    })
    
})

export default router