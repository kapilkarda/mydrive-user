angular.module('nav.controllers', [])

.controller('navCtrl', function($scope, $ionicPlatform, $state, $localstorage, $ionicLoading) {
	$ionicPlatform.ready(function(){
		try{
			$scope.username=$localstorage.get("userid");
			$scope.username=$localstorage.get("username");
			$scope.useremail=$localstorage.get("useremail");
			var route_id=$localstorage.get("RouteId");

			Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");

			function ClearAllIntervals() {
				var i = $localstorage.get("interval");
				if(i!="undefined" && i!=undefined && i!=null && i!="null" && i!=""){
			  		window.clearInterval(i);
			  	}
			}
			
			//Logout
			$scope.doLogoutAction = function () {
				$ionicLoading.show();
				Parse.User.requestPasswordReset($scope.useremail, {
					success: function(user) {
						$ionicLoading.hide();
						$localstorage.set("username", "");
						$localstorage.set("useremail", "");
						$localstorage.set("userid", "");
						$localstorage.set("RouteId", "");
						$localstorage.set("RouteName", "");
						$localstorage.set("DriverId", "");
						ClearAllIntervals();
						$state.go('login');
					},
					error: function(error) {
						alert(error.message);
						$ionicLoading.hide();
					}
				});
			};

			$scope.gotoTromke = function(){
				if(route_id!=undefined && route_id!=null && route_id!="undefined" && route_id!="null" && route_id!="0" && route_id!=""){
					$state.go('nav.tromke');
				}else{
					$state.go('nav.home');
				}
			}

		}catch(err){
			console.log(err.message);
		}
	});
	
})