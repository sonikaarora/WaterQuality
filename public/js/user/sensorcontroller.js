angular.module('app').controller('SensorController', function($scope,$http){
	$scope.sensorList = [];
	$http({
			data : {
 			"username" : window.location.search.split('=')[1]
			},
	 		method : "POST",
	 		url : "/getSensorForUser",
	 		
	 	}).success(function (res) {
	 		console.log("The return value: "+JSON.stringify(res));
	 		$scope.sensorList = res.usersensors;
	 	});
	

	$scope.populateHubs = function(){
		$scope.hubsList = [];
		var type = $scope.sensor.type;
		var loc = $scope.sensor.location;
		$scope.hubstatus = false;
		$http({
			data : {
	 			"sensortype" : type,
	 			"location" : loc
	 			},
	 		method : "POST",
	 		url : "/getHubsForUsers",
	 		
	 	}).success(function (res) {
	 		console.log("The return value: "+JSON.stringify(res));
	 		var data = res.hubs;
	 		for(var i =0;i<data.length;i++)
 			{
	 			$scope.hubsList.push(data[i].hub);
 			}
	 	});
		
	};
	
	$scope.populateLocations = function(){
		$scope.locationData = [];
		$scope.locationStatus = false;
		var type = $scope.sensor.type;
		
		$http({
			data : {
	 			"sensortype" : type
	 			},
	 		method : "POST",
	 		url : "/getLocations",
	 		
	 	}).success(function (res) {
	 		console.log("The return value: "+JSON.stringify(res));
	 		var data = res.locations;
	 		for(var i =0;i<data.length;i++)
	 			{
	 				$scope.locationData.push(data[i].location);
	 			}
	 	});
		
		
		
	}
	
	$scope.addSensor = function(){

		var username = window.location.search.split('=')[1];
    	var sensorType = $scope.sensor.type;
    	var hub = $scope.sensor.hub;
    	var location = $scope.sensor.location;
    	
    	 $http({
    	 		method : "POST",
    	 		url : "/addSensorForUser",
    	 		data : {
    	 			"username" : username,
    	 			"sensorname" : $scope.sensor.type + ($scope.sensorList.length+1),
    	 			"sensortype": sensorType,
    	 			"hub" : hub,
    	 			"location" : location,
    	 			"usage" : 0,
    	 			"amount": 12,
    	 			"status": true
    	 			}
    	 	}).success(function (res) {
    	 		console.log("The return value: "+JSON.stringify(res));
    	 		$scope.sensorList.push(res);
    	 		
    	 		}).error(function (error){
    	 		console.log("error while login: " +error);
    	 	});
    	
	};
	
	$scope.deleteSensor = function(index,data){
		var username = window.location.search.split('=')[1];
   	 $http({
	 		method : "POST",
	 		url : "/deleteSensorForUser",
	 		data : {
	 			"_id" : data._id,
	 			"user": username
	 			}
	 	}).success(function (res) {
	 		console.log("The return value: "+JSON.stringify(res));
	 		$scope.sensorList = res.sensors;
	 	
	 	});
 	
 };
 
 $scope.cancel = function(){
	 
 };
});