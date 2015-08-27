angular.module('login.controllers', [])

.controller('loginCtrl', function($scope, $ionicPlatform, $state, $ionicLoading, $localstorage) {	
	$ionicPlatform.ready(function(){
		try{

			var userId = $localstorage.get("userid");
			var route_id = $localstorage.get("RouteId");
			if(userId!=undefined && userId!=null && userId!="undefined" && userId!="null" && userId!="0" && userId!=""){
				if(route_id!=undefined && route_id!=null && route_id!="undefined" && route_id!="null" && route_id!="0" && route_id!=""){
					$state.go('nav.tromke');
				}else{
					$state.go('nav.home');
				}
			}

			var username="";
			var password="";

			parsePlugin.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "ByN2eoTazkJea3wj9q8i8kbrO98SHbyE0tyqMib7", function() {
		        parsePlugin.getInstallationId(function(id) {
			        //alert(id);
			    }, function(e) {
			        //alert('error');
			    });
		    }, function(e) {
		        //alert('error');
		    });

			Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");

			$scope.login={};
			//Login
			$scope.doLoginAction = function () {
				$ionicLoading.show();
				username = $scope.login.email;
				password = $scope.login.password;
				Parse.User.logIn(username, password, {
					success: function(user) {
						$ionicLoading.hide();
						$localstorage.set("userid", user.id);
						$localstorage.set("username", user.attributes.username);
						$localstorage.set("useremail", user.attributes.email);
						$state.go('nav.home');
					},
					error: function(user, error) {
						alert(error.message);
						$scope.login.email="";
						$scope.login.password="";
						$ionicLoading.hide();
					}
				});
			};
		}catch(err){
			alert(err.message);
		}
	});
})