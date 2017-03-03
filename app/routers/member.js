const express = require('express');

var connection = require('../mysql_connect');
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'welcome to our api!' });   
});

router.route('/member')
	.get(function(req, res) {
        connection.query('SELECT * FROM `member`', function(err, rows, fields){
            if(err) throw err;
            
            var senddata = { 
                title: 'my other page',
                bears: rows
            };
            res.render('home/index',senddata);
        });
	});

 module.exports.router = router;