angular.module('app').controller('UserSensorMonitor', function($scope,$http){
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
	
	
//	
	
});