angular.module('app').
controller("UserBillingController", function($scope, $http) {
	$http({
		data : {
 			"username" : window.location.search.split('=')[1]
			},
 		method : "POST",
 		url : "/getSensorForUser",
 		
 	}).success(function (res) {
 		console.log("The return value: "+JSON.stringify(res));
 		$scope.sensors = res.usersensors;
 	});
	
	
	$scope.payBill = function(){
		
			// window.open("paybill.ejs");    // may alse try $window
		 
	}
});
	