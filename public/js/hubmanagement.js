angular.module('app').controller('hubManagementCtrl', function($scope,$http){
	
	$scope.sensorinfo = [];
	$http({
 		method : "GET",
 		url : "/getHubs",
 		
 	}).success(function (res) {
 		console.log("The return value: "+JSON.stringify(res));
 		$scope.hubsData = res.hubs;
 	});
	
	
	$scope.populateHubs = function(){
		$scope.hubsList = [];
		angular.forEach($scope.hubsData, function(item) {
			  if(item.location == $scope.locationName)
				  {
				  $scope.hubsList.push(item.hubname);
				  }
			});
		
	};
	
	$scope.showSensors = function(){
		var hub = $scope.hubName;
		var location = $scope.locationName;
	
		$http({
			data : {
	 			"hub" : hub,
	 			"location": location
	 			},
	 		method : "POST",
	 		url : "/getSensorsForHub",
	 		
	 	}).success(function (res) {
	 		console.log("The return value: "+JSON.stringify(res));
	 		$scope.sensorinfo.push(res.sensors[0]);
	 		
	 		
	 	});
		
		
		
	};
	
	$scope.changeStatus = function() {
		console.log("inside..");
	}
	
	$scope.changeStatus = function(index) {
		$scope.sensorinfo[index].status = !$scope.sensorinfo[index].status
		$http({
			data : {
				"_id" : $scope.sensorinfo[index]._id,
	 			"status": $scope.sensorinfo[index].status,
	 			"type": $scope.sensorinfo[index].sensortype,
	 			"location": $scope.locationName
	 			},
	 		method : "POST",
	 		url : "/updateSensorStatus",
	 		
	 	}).success(function (res) {
	 		console.log("The return value: "+JSON.stringify(res));
	 		//$scope.sensorinfo = res.sensors;
	 	});
	}
	
});