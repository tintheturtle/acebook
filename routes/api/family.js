import express from 'express'

// import Family from '../../models/Family'

var router = express.Router()

router.get('/', (req, res) =>{
    res.json({
        family: true,
    })
})

export default router