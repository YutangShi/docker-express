const express = require('express');
var router = express.Router();
const Bear     = require('../models/bear');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    // console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'welcome to our api!' });   
});

router.route('/bears')
	// get all the bears (accessed at GET http://localhost:3000/api/bears)
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);
			//res.json(bears);
            var senddata = { 
                title: 'my other page',
                bears: bears
            };
            res.render('home/index',senddata);
		});
	});

router.route('/bears/:bear_id')
	// get the bear with that id
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	});
 module.exports.router = router;