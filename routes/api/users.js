import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import validateRegisterInput from '../../utils/validation/register'
import validateLoginInput from '../../utils/validation/login'

import stringComparison from '../../utils/comparisons/StringSimilarity'

import User from '../../models/User'
import Event from '../../models/Event'
import Spotlight from '../../models/Spotlight'

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
            console.log(req.body.algorithm)
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                ACE: req.body.ACE,
                description: req.body.description,
                algorithm: req.body.algorithm
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
                                // Checks to see if there are any new users and updates the info of previous matches
                                if (user.lastUserCount < users.length) {
                                    // Looping through list of users
                                    for (let i = 0; i < users.length; i++) {
                                        // Turns matches into object 
                                        let other = users[i].toObject()
                                        // Checks whether or match is the opposite type and is not paired
                                        if (other.ACE === 'big' ) {
                                            // Get percentage match using algorithm
                                            const percentage  = stringComparison(user.description.split('separatorString')[1], other.description.split('separatorString')[1], user.algorithm)
                                            if (percentage > 0.2){
                                                // Delete other matches to prevent too much data in one user
                                                delete other.matches
                                                delete other.matchEmailList
                                                other.percentage = percentage
                                                user.matchEmailList.push(other.email)
                                                user.matches.push(other)
                                            }
                                            
                                        }
                                    }
                                }
                                // Update latest count
                                user.lastUserCount = users.length
                            }
                            break
                        case 'big':
                            console.log('find me a little!')
                            if (!user.paired) {
                                // Checks to see if there are any new users and updates the info of previous matches
                                if (user.lastUserCount < users.length){
                                    // Looping through list of users
                                    for (let i = 0; i < users.length; i++) {
                                        // Turns matches into object 
                                        let other = users[i].toObject()
                                        // Checks whether or match is the opposite type and is not paired
                                        if (other.ACE === 'little' && !other.paired && !user.matchEmailList.includes(other.email)) {
                                            // Get percentage match using algorithm
                                            const percentage  = stringComparison(user.description.split('separatorString')[1], other.description.split('separatorString')[1], user.algorithm)
                                            if (percentage > 0.2){
                                                // Delete other matches to prevent too much data in one user
                                                delete other.matches
                                                delete other.matchEmailList
                                                other.percentage = percentage
                                                user.matchEmailList.push(other.email)
                                                user.matches.push(other)
                                            }
                                            
                                        }
                                    }
                                }
                                // Update latest count
                                user.lastUserCount = users.length
                            }
                            break
                        case 'eboard':
                            break
                    }
                 
                    user.save()
                    .then(() => {

                        let profile = user.toObject()
                        delete profile.password

                        jwt.sign(
                            payload,
                            process.env.HASH,
                            {
                                expiresIn: 31556926
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token,
                                    profile: profile
                                })
                            }
                        )
                    })
                    .catch(err => 
                        console.log(err)
                    )
                }
                else {
                    return res.status(400).json({ passwordincorrect: "Password incorrect"})
                }
        })
    })
    .catch(err => {
        return res.status(400).json({
            notFound: 'User not found, please register.'
        })
    })
})

router.get("/list",  (req, res) => {

    User.find()
        .then(users => {

            // Initialize new array to add users
            let userList = []

            users.forEach(user => {
                // Turn user into object to delete fields
                let userObj = user.toObject()
                delete userObj.password
                delete userObj.lastUserCount
                delete userObj.matches

                // Push user into array to return
                userList.push(userObj)
            })

            // Return array of users
            res.json({
                userList
            })
        })
        .catch(err => {
            console.log(err)
        })


})

router.get("/events", async (req, res) => {
    await Event.find().sort({$natural:-1}).limit(3).exec(function(err, event) { 
        if (event) {
            return res.status(200).json({ events: event})
        }
        else {
            return res.status(200).json({ events: "none"})
        }
    })
})

router.get("/spotlight", async (req, res) => {
    await Spotlight.find().sort({$natural:-1}).limit(1).exec(function(err, person) { 
        if (person) {
            return res.status(200).json({ spotlightee: person})
        }
        else {
            return res.status(200).json({ spotlightee: "none"})
        }
    })
})

router.get("/update", async (req, res) => {
    await User.findOne({ email: req.query.email }).exec(function(err, person) { 
        if (person) {
            return res.status(200).json({ list: person.recents})
        }
        else {
            return res.status(400).json({ error: "User not found."})
        }
    })
})

export default router