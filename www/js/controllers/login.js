angular.module('login.controllers', [])

.controller('loginCtrl', function($scope, $ionicPlatform, $state, $ionicLoading, $localstorage) {
	$ionicPlatform.ready(function(){
		try{
			var username="";
			var password="";
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