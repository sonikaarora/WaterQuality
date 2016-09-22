var appVar = angular.module('app', []);

appVar.controller('regCtrl',function($scope,$http){
	
	$scope.registration = function(){
     var emailaddress = $scope.user.emailaddress;
     var firstname = $scope.user.firstname;
     var lastname = $scope.user.lastname;
     var password = $scope.user.password;
     var phone = $scope.user.phone;
     var role = $scope.user.role;
     var plan = $scope.user.plan;
     $http({
 		method : "POST",
 		url : "/userLogin",
 		data : {
 			"emailaddress" : emailaddress,
 			"firstname": firstname,
 			"lastname": lastname,
 			"password" : password,
 			"phone" : phone,
 			"role" : role,
 			"plan" : plan
 			}
 	}).success(function (res) {
 		console.log("The return value: "+JSON.stringify(res));
 		if(res)
 		{ 
 			console.log("successfully loggedin");
 			//var data = res.username;
 		
 			console.log("role is: "+ res.role);
 			if(res.role == "user")
 			//$("#success-alert1").show();
	            //$("#success-alert1").fadeTo(2000, 1000).slideUp(1000, function(){
	            window.location.assign("/userhomepage");
 			
 			else
 				window.location.assign("/adminhomepage");
	            //});
 		  		
 		}
 		else
 		{
 			console.log("Auhentication failure after success");
 		}
 		
 		}).error(function (error){
 		console.log("error while login: " +error);
 	});
	};
	
	$scope.checkUserRole = function()
	{
		if($scope.user!= undefined && $scope.user.role == "user")
			{
			return false;
			}
		else
			{
			return true;
			}
	}
});