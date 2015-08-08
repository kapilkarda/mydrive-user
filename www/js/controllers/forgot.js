angular.module('forgot.controllers', [])

.controller('forgotCtrl', function($scope, $ionicPlatform, $state, $ionicLoading, $localstorage) {
	$ionicPlatform.ready(function(){
		try{
			var email="";
			Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
			$scope.forgot={};
			//forgot
			$scope.doforgotAction = function () {
				$ionicLoading.show();
				email = $scope.forgot.email;
				Parse.User.requestPasswordReset(email, {
					success: function(user) {
						$ionicLoading.hide();
						alert("Reset Password Link has been Sent on Your Mail");
					},
					error: function(error) {
						alert(error.message);
						$scope.forgot.email="";
						$ionicLoading.hide();
					}
				});
			};
		}catch(err){
			console.log(err.message);
		}
	});
})