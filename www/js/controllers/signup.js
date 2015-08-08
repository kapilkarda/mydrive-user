angular.module('signup.controllers', [])

.controller('signupCtrl', function($scope, $ionicPlatform, $state, $ionicLoading, $localstorage) {
	$ionicPlatform.ready(function(){
		try{
			var username="";
			var password="";
			var email="";
			Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
			$scope.signup={};
			//signup
			$scope.doSignupAction = function () {
				$ionicLoading.show();
				username= $scope.signup.username;
				password= $scope.signup.password;
				email= $scope.signup.email;
				
				var user = new Parse.User();
				user.set("username", username);
				user.set("password", password);
				user.set("email", email);
				user.signUp(null, {
					success: function(user) {
						$ionicLoading.hide();
						$localstorage.set("userid", user.id);
						$localstorage.set("username", user.attributes.username);
						$localstorage.set("useremail", user.attributes.email);
						$state.go('nav.home');
					},
					error: function(user, error) {
						alert(error.message);
						$scope.signup.username="";
						$scope.signup.password="";
						$scope.signup.email="";
						$ionicLoading.hide();
					}
				});
			};
		}catch(err){
			console.log(err.message);
		}
	});
})