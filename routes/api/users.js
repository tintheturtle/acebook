import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import validateRegisterInput from '../../utils/validation/register'
import validateLoginInput from '../../utils/validation/login'

import stringComparison from '../../utils/comparisons/StringSimilarity'

import User from '../../models/User'

var router = express.Router()

router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)

    // Valid inputs
    if (!isValid) {
        return res.status(400).json(errors)
    }

    // Checking if user already exists
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" })
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                ACE: req.body.ACE,
                description: req.body.description
            })
            
            // Hash password 
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })
})

router.post("/login", async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    // Validation check
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email
    const password = req.body.password

    const users  = await User.find({})

    // Find user by email
    User.findOne({ email })
        .then(user => {
            // Checks if user exists
            if(!user) {
                return resizeTo.status(404).json({ emailnotfound: "Email not found"})
            }

            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    // Create JWT payload if user matched
                    const payload = {
                        id: user.id,
                        name: user.email
                    }

                    switch (user.ACE) {
                        case 'little':
                            console.log('find me a big!')
                            if (!user.paired) {
                                for (let i = user.lastUserCount; i < users.length; i++) {
                                    let other = users[i].toObject()
                                    if (other.ACE === 'big' && !other.paired) {
                                        const percentage  = stringComparison(user.description, other.description)
                                        if (percentage > 0.5){
                                            delete other.matches
                                            other.percentage = percentage
                                            user.matches.push(other)
                                        }
                                        
                                    }
                                }
                                user.lastUserCount = users.length
                            }
                            user.lastUserCount = users.length
                            break
                        case 'big':
                            console.log('find me a little!')
                            if (!user.paired) {
                                for (let i = user.lastUserCount; i < users.length; i++) {
                                    let other = users[i].toObject()
                                    if (other.ACE === 'little' && !other.paired) {
                                        const percentage  = stringComparison(user.description, other.description)
                                        if (percentage > 0.5){
                                            delete other.matches
                                            other.percentage = percentage
                                            user.matches.push(other)
                                        }
                                    }
                                }
                                user.lastUserCount = users.length
                            }
                            break
                    }
                 
                    user.save()
                    .then(() => {
                        jwt.sign(
                            payload,
                            process.env.secretOrKey,
                            {
                                expiresIn: 31556926
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                })
                            }
                        )
                    })
                    .catch(err => console.log(err))
                }
                else {
                    return res.status(400).json({ passwordincorrect: "Password incorrect"})
                }
        })
    })
})

router.post("/dashboard", (req, res) => {

    const email = req.body.name
    User.findOne({ email })
        .then((user) => {
            console.log(user)
            return res.json({
                success: true
            })
        })
        .catch(err => console.log(err))
})

export default router