const router= require('express').Router();
let Retrieve = require('../models/retrieve-pred');

router.route('/:City/:Year/:Type').get((req,res)=>{
    const city = req.params.City;
    const year = req.params.Year;
    const type = req.params.Type;
    console.log("get", city, year, type);
    Retrieve.findOne({City:city, Year:year,Type:type})
    .then(City=>res.json(City))
    .catch(err=> res.status(400).json('Error: '+err));  
});

module.exports = router;