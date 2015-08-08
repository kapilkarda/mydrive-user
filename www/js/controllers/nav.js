angular.module('nav.controllers', [])

.controller('navCtrl', function($scope, $ionicPlatform, $state, $localstorage, $ionicLoading) {
	$ionicPlatform.ready(function(){
		try{
			$scope.username=$localstorage.get("userid");
			$scope.username=$localstorage.get("username");
			$scope.useremail=$localstorage.get("useremail");
			Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
			//Logout
			$scope.doLogoutAction = function () {
				$ionicLoading.show();
				Parse.User.requestPasswordReset($scope.useremail, {
					success: function(user) {
						$ionicLoading.hide();
						$localstorage.set("username", "");
						$localstorage.set("useremail", "");
						$localstorage.set("userid", "");
						$state.go('login');
					},
					error: function(error) {
						alert(error.message);
						$ionicLoading.hide();
					}
				});
			};
		}catch(err){
			console.log(err.message);
		}
	});
	
})