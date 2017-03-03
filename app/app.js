const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const morgan     = require('morgan');
const path = require('path');
const mongoose = require( 'mongoose' );
const mysql = require('mysql');
const exphbs  = require('express-handlebars');

const bear = require('./routers/bear');
const webbear = require('./routers/webbear');
const member = require('./routers/member');

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    //layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');

//put js,css and image files in public folder
app.use(express.static(path.join(__dirname, 'public')));

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text()); 
app.use(bodyParser.json());

var MONGO_DB;
var DOCKER_DB = process.env.DB_PORT;
if ( DOCKER_DB ) {
  MONGO_DB = DOCKER_DB.replace( 'tcp', 'mongodb' ) + '/myapp';
} else {
  MONGO_DB = process.env.MONGODB;
}
mongoose.connect(MONGO_DB);
mongoose.connection.once('connected', function() {
	console.log("Connected to database : " +MONGO_DB)
});

app.use('/api', bear.router);
app.use('/web', webbear.router);
app.use('/member', member.router);

app.listen(process.env.PORT || 3000);
module.exports = app;

