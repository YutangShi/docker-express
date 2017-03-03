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
	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		var bear = new Bear();	
		// create a new instance of the Bear model
		bear.name = req.body.name;
        //console.log(req)
		// set the bears name (comes from the request)
		bear.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Bear created!' });
		});
	})
	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);
			//res.json(bears);
            res.json(bears);
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
	})
	// update the bear with this id
	.put(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			bear.name = req.body.name;
			bear.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Bear updated!' });
			});
		});
	})
	// delete the bear with this id
	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
	});
 module.exports.router = router;