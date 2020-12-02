const router= require('express').Router();
let Retrieve = require('../models/retrieve-pred');

router.route('/').get((req,res)=>{
    const city = req.body.City;
    const year = req.body.Year;
    const type = req.body.Type;
    Retrieve.findOne({City:city, Year:year,Type:type})
    .then(City=>res.json(City))
    .catch(err=> res.status(400).json('Error: '+err));  
});

module.exports = router;