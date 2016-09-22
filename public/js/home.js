var appVar = angular.module('app', [ "ngRoute", "highcharts-ng","oc.lazyLoad"]);

appVar.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		controller : 'HomeController',
		templateUrl : '/templates/HomeContent.ejs'
	}).when('/sensorcontroller', {
		controller : 'SensorController',
		templateUrl : '/templates/SensorController.ejs'
	}).when('/dashboard', {
		controller : 'dashboard',
		templateUrl : '/templates/DashBoard.ejs'
	}).when('/sensormonitor', {
		controller : 'UserSensorMonitor',
		templateUrl : '/templates/SensorMonitor.ejs'
	}).when('/location', {
		controller : 'location',
		templateUrl : '/templates/Location.ejs'
	}).when('/billing', {
		controller : 'UserBillingController',
		templateUrl : '/templates/UserBilling.ejs'
	}).otherwise({
		controller : 'HomeController',
		templateUrl : '/templates/HomeContent.ejs'
	});
	
	
} ]);

appVar.controller("TabsCtrl", function($scope, $http) {
	$scope.tabs = [ {
		link : '#/home',
		label : 'Home',
		className : 'hometab'
	},

	];

	$scope.removeTab = function(index) {
		if (index != 0) {
			$scope.tabs.splice(index, 1);
		}
	};

	$scope.showIcon = function(index) {
		if (index != 0) {
			return true;
		} else {
			return false;
		}
	}
});

appVar.controller("SensorMonitorController", function($scope) {
	$scope.addPoints = function() {
		var seriesArray = $scope.highchartsNG.series
		var rndIdx = Math.floor(Math.random() * seriesArray.length);
		seriesArray[rndIdx].data = seriesArray[rndIdx].data
				.concat([ 1, 10, 20 ])
	};

	$scope.addSeries = function() {
		var rnd = []
		for (var i = 0; i < 10; i++) {
			rnd.push(Math.floor(Math.random() * 20) + 1)
		}
		$scope.highchartsNG.series.push({
			data : rnd
		})
	}

	$scope.removeRandomSeries = function() {
		var seriesArray = $scope.highchartsNG.series
		var rndIdx = Math.floor(Math.random() * seriesArray.length);
		seriesArray.splice(rndIdx, 1)
	}

	$scope.options = {
		type : 'line'
	}

	$scope.swapChartType = function() {
		if (this.highchartsNG.options.chart.type === 'line') {
			this.highchartsNG.options.chart.type = 'bar'
		} else {
			this.highchartsNG.options.chart.type = 'line'
		}
	}

	$scope.highchartsNG = {
		options : {
			chart : {
				type : 'bar'
			}
		},
		series : [ {
			data : [ 10, 15, 12, 8, 7 ]
		} ],
		title : {
			text : 'Hello'
		},
		loading : false
	}

});

appVar.controller("HomeController", function($scope) {
	$scope.addTab = function(linkName, name) {
		var tab = {
			link : linkName,
			label : name,
			className : 'hometab'
		}
		var tabPresent = false;
		for (i = 0; i < $scope.tabs.length; i++) {
			if (angular.equals($scope.tabs[i], tab)) {
				tabPresent = true;
			}

		}
		if (tabPresent == false) {
			$scope.tabs.push(tab);
			$scope.activeTab = tab;

		}
		tabPresent = false;

	};

});

