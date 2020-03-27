import express from 'express'

// import Family from '../../models/Family'

var router = express.Router()

router.get('/', (req, res) =>{
    console.log("Hello Family")
})

export default router