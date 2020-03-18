import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import validateRegisterInput from '../../utils/validation/register'
import validateLoginInput from '../../utils/validation/login'

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
                ACE: req.body.ACE
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
    console.log(users)
    console.log('')


    // Find user by email
    User.findOne({ email })
        .then(user => {
            // Checks if user exists
            if(!user) {
                return resizeTo.status(404).json({ emailnotfound: "Email not found"})
            }

            switch (user.ACE) {
                case 'little':
                    console.log('find me a big!')
                    users.forEach((user) => {
                        console.log(user.email)
                    })
                    break
                case 'big':
                    console.log('find me a little!')
                    users.forEach((user) => {
                        console.log(user.email)
                    })
                    break
            }

            console.log(user.ACE)
            console.log('')

            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    // Create JWT payload if user matched
                    const payload = {
                        id: user.id,
                        name: user.name
                    }

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
                }
                else {
                    return res.status(400).json({ passwordincorrect: "Password incorrect"})
                }
        })
    })
})

export default router