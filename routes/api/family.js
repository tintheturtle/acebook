import express from 'express'
import moment from 'moment'

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
                object = false
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

    // Retrieve users 
    let records = await User.find().where('email').in(emailList).exec()

    // Process members, remove password and other match information
    let objArray = []
    records.forEach(user => {
        let member = user.toObject()
        delete member.matches
        delete member.password
        delete member.matchEmailList
        objArray.push(member)
    })

    const { name } = req.body

    let success = true

    await Family.findOne( {members: { $in : emailList } } ).exec( (err, family) => {
        if (!family) {
            const newFamily = new Family({
                members: emailList,
                name: name,
                memberObjects: objArray,
                time: moment().format('LL')
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