angular.module('app').
controller("location", function($scope, $http,$rootScope, $ocLazyLoad,SalinityService,TemperatureService,ConductivityService,DensityService) {
	
	$ocLazyLoad.load('/js/sensor.js');
	$ocLazyLoad.load('/js/leaf-demo.js');
	
	$rootScope.$on('$routeChangeStart', function () {
	    
		$ocLazyLoad.load('/js/sensor.js');
		$ocLazyLoad.load('/js/leaf-demo.js');
    });

	
	
})
	