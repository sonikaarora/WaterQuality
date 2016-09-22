angular.module('app').
controller("dashboard", function($scope, $http,$rootScope, $ocLazyLoad,SalinityService,TemperatureService,ConductivityService,DensityService) {
	$scope.sensorNames = [];
	$http({
		data : {
			"username" : window.location.search.split('=')[1]
		},
 		method : "POST",
 		url : "/getSensorForUser",
 		
 	}).success(function (res) {
 		console.log("The return value: "+JSON.stringify(res));
 		var sensors = res.usersensors;
 		for(var i =0;i<sensors.length;i++)
 			{
 			 if(!$scope.sensorNames.contains(sensors[i].sensortype)) {
 				 $scope.sensorNames.push(sensors[i].sensortype);
 			 }
 			}
 	});

	Array.prototype.contains = function(v) {
	    for(var i = 0; i < this.length; i++) {
	        if(this[i] === v) return true;
	    }
	    return false;
	};
	
	
	$scope.salinityJsonData = SalinityService;
	$scope.densityJsonData = DensityService;
	$scope.temperatureJsonData = TemperatureService;
	$scope.conductivityJsonData = ConductivityService;
	$ocLazyLoad.load('/js/sensor.js');
	$ocLazyLoad.load('/js/leaf-demo.js');

	
	$scope.highchartsNG = {
		options : {
			chart : {
				type : 'line',
				events : {
					redraw : function() {
					}

				}
			}
		},
		series : [ {
			data : [],
			pointStart : Date.UTC(2016, 0, 1),
//			point : Date.UTC(2015, 0, 1),
			pointInterval : (24 * 3600 * 1000),
//			pointStart : Date.UTC(2011, 0, 1),
//			pointInterval : 366 * (24 * 3600 * 1000),
			name : []

		} ],
		title : {
			text : 'Water Quality'
		},
		xAxis : {
			type : 'datetime',
			labels : {
				format : '{value:%Y %b %e}'
				//format : '{value:%Y}'
			},
			title : {
				//text : 'Date'
				text : []
			},
			
		},
		yAxix : {
			categories : []
		},
		loading : false
	}

	$scope.xSeriesArray = [];
	for (var i = 0; i < $scope.salinityJsonData.features.length; i++) {
		$scope.xSeriesArray.push($scope.salinityJsonData.features[i].value)
	}
	$scope.highchartsNG.series[0].data = $scope.xSeriesArray;
	$scope.highchartsNG.series[0].name = "Salinity";
	$scope.highchartsNG.title.text = $scope.salinityJsonData.name
	


	$scope.selectedItemChanged = function() {

		if ($scope.selection == 'Salinity') {
			$scope.xSeriesArray = [];
			$scope.titleName = $scope.salinityJsonData.name;
			$scope.highchartsNG.series[0].name = "Salinity";
			
			for (var i = 0; i < $scope.salinityJsonData.features.length; i++) {
				$scope.xSeriesArray.push($scope.salinityJsonData.features[i].value)
			}

		} else if ($scope.selection == 'Temperature') {
			$scope.xSeriesArray = [];
			$scope.titleName = $scope.temperatureJsonData.name;
			$scope.highchartsNG.series[0].name = "Temperature";
			for (var i = 0; i < $scope.temperatureJsonData.features.length; i++) {
				$scope.xSeriesArray.push($scope.temperatureJsonData.features[i].value)
			}

		} else if ($scope.selection == 'Conductivity') {
			$scope.xSeriesArray = [];
			$scope.titleName = $scope.conductivityJsonData.name;
			$scope.highchartsNG.series[0].name = "Conductivity";
			for (var i = 0; i < $scope.conductivityJsonData.features.length; i++) {
				$scope.xSeriesArray.push($scope.conductivityJsonData.features[i].value)
			}
		} else if ($scope.selection == 'Density') {
			$scope.xSeriesArray = [];
			$scope.titleName = $scope.densityJsonData.name;
			$scope.highchartsNG.series[0].name = "Density";
			for (var i = 0; i < $scope.densityJsonData.features.length; i++) {
				$scope.xSeriesArray.push($scope.densityJsonData.features[i].value)
			}
		}
		
		
		
		$scope.highchartsNG.series[0].data = $scope.xSeriesArray;
		$scope.highchartsNG.title.text = $scope.titleName
		// $scope.highchartsNG.options.chart.redraw();
	}
	
	
	
});






	