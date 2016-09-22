
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

var mongo = require('mongodb');
var monk = require('monk');
//var db = monk('mongodb://localhost:27017/waterqualitydb');
var db = "mongodb://admin:admin@ds045054.mlab.com:45054/locations";

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/userLogin', user.userLogin);

app.get('/', routes.index);
//app.post('/login', routes.home);

app.post('/login', function(req, res) {
    var user_id = req.body.userSelection;
    var name = req.body.username;
    
    console.log("body.........................",req.body.name);
    if(user_id == 'User')
    	{
    	console.log("indide user..........");
    	res.redirect('/userhomepage/?username='+name);
    	//res.redirect('/userhomepage');
    	}
    else if(user_id == 'Admin')
    	{
    	console.log("indide admin user..........");
    	res.redirect('/adminhomepage');
    	}
    
});

app.post('/addSensor' , user.addSensor);

app.get('/getSensors', user.getSensors);

app.post('/deleteSensor', user.deleteSensor);

//app.post('/login', routes.home);
app.get('/userhomepage',routes.userhome);

app.get('/adminhomepage',routes.adminhome);

app.get('/login', routes.login);

app.get('/signup', routes.signup);

app.get('/getUsers', user.getUsers);

app.get('/getAdmins', user.getAdmins);

app.get('/getHubs', user.getHubs);

app.post('/getSensorsForHub', user.getSensorsForHub);

app.post('/updateAdmins', user.updateAdmins);

app.post('/deleteUser', user.deleteUser);

app.post('/updateSensorStatus', user.updateSensorStatus);

app.post('/getLocations' , user.getLocations);

app.post('/getHubsForUsers', user.getHubsForUsers);

app.post('/addSensorForUser', user.addSensorForUser);

app.post('/getSensorForUser', user.getSensorForUser);

app.post('/deleteSensorForUser', user.deleteSensorForUser);

app.get('/getSensorForAllUsers', user.getSensorForAllUsers);

app.get('/getSensorData', user.getSensorData);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
