var appVar = angular.module('app', [ "ngRoute", "highcharts-ng","oc.lazyLoad"]);

appVar.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		controller : 'HomeController',
		templateUrl : '/templates/admin/AdminHomeContent.ejs'
	}).when('/admin', {
		controller : 'AdminController',
		templateUrl : '/templates/admin/Admin.ejs'
	}).when('/user', {
		controller : 'UserController',
		templateUrl : '/templates/admin/Users.ejs'
	}).when('/sensor', {
		controller : 'adminSensorCtrl',
		templateUrl : '/templates/admin/Sensors.ejs'
	}).when('/hubmanagement', {
		controller : 'hubManagementCtrl',
		templateUrl : '/templates/admin/HubManagement.ejs'
	}).when('/awddashboard', {
		controller : 'AddRemoveController',
		templateUrl : '/templates/admin/AWSDashboard.ejs'
	}).when('/billing', {
		controller : 'BillingController',
		templateUrl : '/templates/admin/Billing.ejs'
	}).otherwise({
		controller : 'HomeController',
		templateUrl : '/templates/admin/AdminHomeContent.ejs'
	});
} ]);

appVar.controller("TabsCtrl", function($scope, $http,$rootScope) {
	
	$rootScope.tabs = [ {
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


appVar.controller("HomeController", function($scope,$ocLazyLoad) {
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
		
		$ocLazyLoad.load('/js/sensor.js');
		$ocLazyLoad.load('/js/leaf-demo.js');
		$scope.count = 0;
		
	};

});

appVar.controller('UserController', function($scope,$http){
	  $http({
	 		method : "GET",
	 		url : "/getUsers",
	 		
	 	}).success(function (res) {
	 		console.log("The return value: "+JSON.stringify(res));
	 		$scope.userprofile = res.userprofile;
	 	});
	  
	  $scope.deleteUser = function(index,data){

	    	 $http({
	 	 		method : "POST",
	 	 		url : "/deleteUser",
	 	 		data : {
	 	 			"_id" : data._id
	 	 			}
	 	 	}).success(function (res) {
	 	 		console.log("The return value: "+JSON.stringify(res));
	 	 		$scope.userprofile = res.users;
	 	 	
	 	 	});
	    	
	    
	  }
});

appVar.controller('AdminController', function($scope,$http){
	
	 $http({
	 		method : "GET",
	 		url : "/getAdmins",
	 		
	 	}).success(function (res) {
	 		console.log("The return value: "+JSON.stringify(res));
	 		$scope.adminuserprofile = res.adminprofile;
	 		//$scope.adminuserprofile.push({ selected: {}});
	 		
	 	});
	 
	 $scope.rowSelected = { selected: {}};
	 

	    // gets the template to ng-include for a table row / item
	    $scope.getTemplate = function (contact) {
	        if (contact._id === $scope.rowSelected.selected._id) return 'edit';
	        else return 'display';
	    };

	    $scope.editContact = function (contact) {
	    	$scope.rowSelected.selected = angular.copy(contact);
	    };

	    $scope.saveContact = function (idx) {
	        console.log("Saving contact");
	        $scope.adminuserprofile[idx] = angular.copy($scope.rowSelected.selected);
	        $http({
		 		method : "POST",
		 		url : "/updateAdmins",
		 		data : {
		 			"id" :  $scope.adminuserprofile[idx]._id,
		 			"emailaddress":$scope.adminuserprofile[idx].emailaddress,
		 			"firstname":$scope.adminuserprofile[idx].firstname,
		 			"lastname":$scope.adminuserprofile[idx].lastname,
		 			"phone":$scope.adminuserprofile[idx].phone
		 			},
		 	}).success(function (res) {
		 		console.log("The return value: "+JSON.stringify(res));
		 		$scope.adminuserprofile = res.adminprofile;
		 		 $http({
		 	 		method : "GET",
		 	 		url : "/getAdmins",
		 	 		
		 	 	}).success(function (res) {
		 	 		console.log("The return value: "+JSON.stringify(res));
		 	 		$scope.adminuserprofile = res.adminprofile;
		 	 		//$scope.adminuserprofile.push({ selected: {}});
		 	 		
		 	 	});
		 		
		 	});
	        
	        $scope.reset();
	    };

	    $scope.reset = function () {
	    	$scope.rowSelected.selected = {};
	    };
	    
//	    $rootScope.$on('$routeChangeStart', function () {
//            alert('refresh');
//        });
//	
});


