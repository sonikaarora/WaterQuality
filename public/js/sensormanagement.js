angular.module('app').controller('adminSensorCtrl', function($scope,$http,$ocLazyLoad){
	 
	$http({
 		method : "GET",
 		url : "/getSensors",
 		
 	}).success(function (res) {
 		console.log("The return value: "+JSON.stringify(res));
 		$scope.sensorList = res.sensors;
 	});
	
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
			  if(item.location == $scope.sensor.location)
				  {
				  $scope.hubsList.push(item.hubname);
				  }
			});
		
	};
	
	$scope.pageSize = 5;
    $scope.currentPage = 1;
    $scope.hublist = [];
    $scope.hublist.push('hub1');
    $scope.hublist.push('hub2');
    $scope.hublist.push('hub3');
    $scope.hublist.push('hub4');
    $scope.hublist.push('hub5');
   
    
    $scope.addSensor = function(){
    	var sensorName = $scope.sensor.name;
    	var sensorDescription = $scope.sensor.description;
    	var sensorType = $scope.sensor.type;
    	var hub = $scope.sensor.hub;
    	var status = $scope.sensor.status;
    	var location = $scope.sensor.location;
    	
    	 $http({
    	 		method : "POST",
    	 		url : "/addSensor",
    	 		data : {
    	 			"sensorname" : sensorName,
    	 			"sensordescription": sensorDescription,
    	 			"sensortype": sensorType,
    	 			"hub" : hub,
    	 			"status" : "true",
    	 			"location" : location,
    	 			"status": "true"
    	 			}
    	 	}).success(function (res) {
    	 		console.log("The return value: "+JSON.stringify(res));
    	 		$http({
    	 	 		method : "GET",
    	 	 		url : "/getSensors",
    	 	 		
    	 	 	}).success(function (res) {
    	 	 		console.log("The return value: "+JSON.stringify(res));
    	 	 		$scope.sensorList = res.sensors;
    	 	 	});
    	 		
    	 		
    	 		}).error(function (error){
    	 		console.log("error while login: " +error);
    	 	});
    	};	
    	
    $scope.deleteSensor = function(index,data){
    	 $http({
 	 		method : "POST",
 	 		url : "/deleteSensor",
 	 		data : {
 	 			"_id" : data._id
 	 			}
 	 	}).success(function (res) {
 	 		console.log("The return value: "+JSON.stringify(res));
 	 		$scope.sensorList = res.sensors;
 	 	
 	 	});
    	
    }
    	
});