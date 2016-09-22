
/*
 * GET users listing.
 */
//var mongoURL = "mongodb://localhost:27017/waterqualitydb";
var mongoURL = "mongodb://admin:admin@ds045054.mlab.com:45054/locations";
var mongo = require("./mongo");

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.userLogin = function(req,res){
	var emailaddress = req.param("emailaddress");
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");;
	var password = req.param("password");
	var phone = req.param("phone");
	var role = req.param("role");
	var plan = req.param("plan");
	console.log(password +" is the object");
	var json_responses;
	
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');

		coll.insert({emailaddress: emailaddress, firstname:firstname,lastname:lastname, password:password, phone:phone, role:role, plan:plan }, function(err, result){
			if (result) {
				console.log("inserted successfully....");
				json_responses = {"statusCode" : 200,"emailaddress":emailaddress,"role":role };
				res.send(json_responses);
			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		});
	});
	};
	
exports.getUsers = function(req,res){
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('login');
	
	coll.find({role:'user'}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"userprofile":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
};

exports.getHubs = function(req,res){
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('hubs');
	
	coll.find({}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"hubs":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
};

exports.getSensorsForHub = function(req,res){
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo in getSensorsForHub at: ' + mongoURL);
	var coll = mongo.collection('sensor');
	var hubname = req.param("hub");
	var locationname = req.param("location");
	console.log('hub...........', hubname);
	console.log('location...........', locationname);
	coll.find({"hub":hubname,"location":locationname}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found in getSensorsForHub:', result);
	        json_responses = {"statusCode" : 200,"sensors":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
};

exports.getSensors = function(req,res){
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('sensor');
	
	coll.find({}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"sensors":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
};

exports.getAdmins = function(req,res){
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('login');
	
	coll.find({role:'admin'}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"adminprofile":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
};

exports.getData = function(req,res){
	// These two variables come from the form on
	// the views/login.hbs page
	console.log("Inside User.js");
	var json_responses ={};

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('schoolData');
		//db.schools.find({earn:{$gt:0}},{name:1, earn:1})
		console.log("The data in the collection is: "+coll);
		//coll.find({cost:{$gt:0}},{name:1, cost:1, comp:1, earn:1}).toArray(function(err, user){
		//coll.find({array:{$elemMatch:{"name" : "University of North Carolina at Chapel Hill"}}}).toArray(function(err, user){
		coll.find({"array.cost":{$gt:0}},{"array.name":1, "array.cost":1, "array.Comp":1, "array.earn":1}).toArray(function(err, user){
			if (user) {
				console.log(user.length);
				json_responses.statusCode = 200;
				json_responses.schools=user;
				//json_responses = {"statusCode" : 200};
				console.log("From user.js find function"+json_responses);
				res.send(json_responses);
				
			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		});
	});
};	

exports.addSensor = function(req,res){
	var sensorname = req.param("sensorname");
	var sensordescription = req.param("sensordescription");
	var sensortype = req.param("sensortype");;
	var hub = req.param("hub");
	var status = req.param("status");
	var location = req.param("location");
	var json_responses;
	
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('sensor');

		coll.insert({sensorname: sensorname, sensordescription:sensordescription,sensortype:sensortype, hub:hub, status:status, location:location}, function(err, result){
			if (result) {
				console.log("inserted successfully....");
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		});
	});
	}

exports.updateAdmins = function(req,res)
{
	var id = req.param("id");
	var email = req.param("emailaddress");
	var name = req.param("firstname");
	var last = req.param("lastname");
	var ph = req.param("phone");
	var ObjectId = require('mongodb').ObjectID;
	var json_responses;
	mongo.connect(mongoURL, function(){
		var coll = mongo.collection('login');

		coll.update({_id:ObjectId(id)},{$set:{emailaddress:email,firstname:name,lastname:last,phone:ph}}, function(err, result){
			if (result) {
				console.log("inserted successfully....");
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		});
	});
	
	
}

exports.deleteSensor = function(req,res)
{

	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('sensor');
	var id = req.param("_id");
	var ObjectId = require('mongodb').ObjectID;
	
	console.log("id to be deleted........."+id);
	
	coll.remove({"_id" : ObjectId(id)}, function(err, result) {
          if (err) {
              console.log(err);
          }
          console.log(result);
          coll.find({}).toArray(function (err, result) {
    	      if (err) {
    	        console.log(err);
    	      } else if (result.length) {
    	        console.log('Found:', result);
    	        json_responses = {"statusCode" : 200,"sensors":result};
    			res.send(json_responses);
    	      } else {
    	        console.log('No document(s) found with defined "find" criteria!');
    	      }
    	      //Close connection
    	   //   db.close();
    	    });
      });
	});
};

exports.deleteUser = function(req,res){

	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('login');
	var id = req.param("_id");
	var ObjectId = require('mongodb').ObjectID;
	
	console.log("id to be deleted........."+id);
	
	coll.remove({"_id" : ObjectId(id)}, function(err, result) {
          if (err) {
              console.log(err);
          }
          console.log(result);
          coll.find({role: 'user'}).toArray(function (err, result) {
    	      if (err) {
    	        console.log(err);
    	      } else if (result.length) {
    	        console.log('Found:', result);
    	        json_responses = {"statusCode" : 200,"users":result};
    			res.send(json_responses);
    	      } else {
    	        console.log('No document(s) found with defined "find" criteria!');
    	      }
    	      //Close connection
    	   //   db.close();
    	    });
      });
	});
};

exports.updateSensorStatus = function(req,res){
	var id = req.param("_id");
	var sensorstatus = req.param("status");
	var type = req.param("type");
	var loc = req.param("location");
	
	console.log("id:................",id);
	console.log("sensorstatus:................",sensorstatus);
	console.log("type........",type);
	console.log("loc........",loc);
	
	var ObjectId = require('mongodb').ObjectID;
	var json_responses;
	mongo.connect(mongoURL, function(){
		var coll = mongo.collection('sensor');

		coll.update({_id:ObjectId(id)},{$set:{status:sensorstatus}}, function(err, result){
			if (result) {
				console.log("inserted successfully...status.");
				json_responses = {"statusCode" : 200};
				
				
				mongo.collection('usersensors').find({sensortype:type,location: loc}).toArray(function (err, result) {
					
					if(result.length > 0)
					{
						var id = result[0]._id;
						console.log("id................",id);
						
						mongo.collection('usersensors').update({_id:ObjectId(id)},{$set:{status:sensorstatus}}, function(err, result){
							
					});
					}
					
				});
					
				}
				
				
				
				//res.send(json_responses);
			
		});
	});
};

exports.getLocations = function(req,res){
	
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('sensor');
	var type = req.param("sensortype");
	
	coll.find({sensortype:type}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"locations":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
	
};

exports.getHubsForUsers = function(req,res){
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('sensor');
	var type = req.param("sensortype");
	var loc = req.param("location");
	
	coll.find({sensortype:type,location:loc}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"hubs":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
}
	
exports.addSensorForUser = function(req,res){
	var user = req.param("username");
	var name = req.param("sensorname");
	var type = req.param("sensortype");;
	var hb = req.param("hub");
	var lc = req.param("location");
	var use = req.param("usage");
	var amt = req.param("amount");
	var sts = req.param("status");
	var json_responses;
	
	console.log("sensor name...........",name);
	
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('usersensors');

		coll.insert({username: user, sensorname:name,sensortype:type, hub:hb, location:lc, usage:use,amount:amt,status:sts}, function(err, result){
			if (result) {
				console.log("inserted successfully....");
				json_responses = {"statusCode" : 200, "sensorname":name,"sensortype":type, "hub":hb, "location":lc,"status":sts };
				res.send(json_responses);
			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		});
	});
};


exports.getSensorForUser = function(req,res){
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('usersensors');
	var name = req.param("username");
	
	coll.find({username:name}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"usersensors":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
};

exports.getSensorForAllUsers = function(req,res){
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('usersensors');
	
	coll.find({}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"usersensors":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
};

exports.deleteSensorForUser = function(req,res){

	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('usersensors');
	var id = req.param("_id");
	var user = req.param("user");
	var ObjectId = require('mongodb').ObjectID;
	
	console.log("id to be deleted........."+id);
	
	coll.remove({"_id" : ObjectId(id)}, function(err, result) {
          if (err) {
              console.log(err);
          }
          console.log(result);
          coll.find({"username": user}).toArray(function (err, result) {
    	      if (err) {
    	        console.log(err);
    	      } else if (result.length) {
    	        console.log('Found:', result);
    	        json_responses = {"statusCode" : 200,"sensors":result};
    			res.send(json_responses);
    	      } else {
    	        console.log('No document(s) found with defined "find" criteria!');
    	      }
    	      //Close connection
    	   //   db.close();
    	    });
      });
	});
};


exports.getSensorData = function(req,res){

	var latitude = req.getparam("lat");
	var longitude = req.getparam("long");
	var time = req.getparam("time");
	var type = req.getparam("type");
	var url = "http://erddap.cencoos.org/erddap/tabledap/cencoos_monterey.json?type,time,latitude,longitude"

	http.get(url,function(res){


	var body ='';

	res.on('data',function(chunk){

	body+=chunk;

	});



	res.on('end',function(){

	var data =JSON.Stringify(body);



	var first = body.substring(body.indexOf("\n")+1);

	var second = body.substring(body.indexOf("\n")+1);

	var third = second.substring(second.indexOf("\n")+1);

	body = first+ third;

	var converter = require("csvtojson").Converter;

	converter = new Converter({});

	converter.fromString(body,function(err,jsondata){

	var insertData = function(db,callback){

	db.collection('SensorData').insert(jsondata,function(err,doc){

	  if(doc != null){

	  console.log(doc);

	   

	mongo.connect(mongoURL, function(){

	console.log('Connected to mongo at: ' + mongoURL);

	var coll = mongo.collection('usersensors');



	coll.insert({username: user, sensorname:name,sensortype:type, hub:hb, location:lc, usage:use,amount:amt,status:sts}, function(err, result){

	if (result) {

	console.log("inserted successfully....");

	json_responses = {"statusCode" : 200, "sensorname":name,"sensortype":type, "hub":hb, "location":lc,"status":sts };

	res.send(json_responses);

	} else {

	console.log("returned false");

	json_responses = {"statusCode" : 401};

	res.send(json_responses);


	}

	});

	});

	  }

	  else{

	  console.log("---Error Handling---");

	  }

	});



	}



	});



	});

	});



	};

	