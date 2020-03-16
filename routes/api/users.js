import express, { router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import validateRegisterInput from '../../validation/register'
import validateLoginInput from '../../validation/login'

import User from '../../models/User'

router.post("register", (req, res) => {
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
                password: req.body.password
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