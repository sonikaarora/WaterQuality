
/*
 * GET home page.
 */
var ejs = require("ejs");

exports.index = function(req, res){
 // res.render('index', { title: 'Test' });
// Sonika:	 res.render('login.ejs');
	console.log("Hi");
	res.render('HomePage.ejs');
	
};

exports.login = function(req, res){
	console.log("login........");
	res.render('login.ejs');
	
};

exports.userhome = function(req, res){
	res.render('userhome.ejs');
	
};

exports.adminhome = function(req, res){
	console.log("dashboard.....");
	res.render('adminhome.ejs');
	
};

exports.signup = function(req, res){
	console.log("signup");
	res.render('register.ejs');
};

exports.map = function(req,res){
	res.render('map.ejs');
};