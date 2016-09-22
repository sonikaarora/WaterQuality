angular.module('app').
controller("BillingController", function($scope, $http,$rootScope) {
	$http({
 		method : "GET",
 		url : "/getSensorForAllUsers",
 		
 	}).success(function (res) {
 		console.log("The return value: "+JSON.stringify(res));
 		$scope.sensors = res.usersensors;
 	});
	
	
	$scope.sendReminder = function(){
		
			 window.open("https://mail.google.com/mail/u/0/#inbox?compose=new",'heigth=300,width=300');    // may alse try $window
		 
	}

});
	
