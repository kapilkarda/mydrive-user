angular.module('home.controllers', [])

.controller('homeCtrl', function($scope, $state, $ionicPlatform, $ionicPopup, $localstorage, $ionicLoading, $timeout) {
	$ionicPlatform.ready(function(){
		try{ 	
			$scope.userid=$localstorage.get("userid");
			$scope.username=$localstorage.get("username");
			$scope.useremail=$localstorage.get("useremail");
			$scope.RouteId=$localstorage.get("RouteId");
			$scope.buttondisabled=true;
			Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
			$scope.userid="Wx8FHRETFL";
			$scope.CheckedRoutes={};
			// An alert dialog
			$scope.showAlert = function(msg) {
				var alertPopup = $ionicPopup.alert({
					title: msg,
					//template: 'It might taste good'
				});
				alertPopup.then(function(res) {
					//console.log('Thank you for not eating my delicious ice cream cone');
				});
			};
			
			$scope.RoutesLists = [];
			$scope.GetRoute=function(){
				$scope.nodata=true;
				$ionicLoading.show();
				var Route = Parse.Object.extend("Route");
				var query = new Parse.Query(Route);
				var pointer = new Parse.Object("Customer");
				pointer.id = $scope.userid  // hardcoded for now later we will change it and should be got from the app.
				query.equalTo("customer",pointer)
				query.find({
					success: function (routes) {
						$scope.nodata=false;
						$ionicLoading.hide();
						$scope.RoutesLists = routes;
					},
					error: function (error) {
						$ionicLoading.hide();
						// The request failed
					}
				});
				$timeout(function() {
					$ionicLoading.hide();
				}, 3000);
			}
			$scope.GetRoute();
			
			$scope.Check= function(id){
				$scope.buttondisabled=false;
			}
			
			$scope.GoToMap= function(){
				$localstorage.set("RouteName", $scope.CheckedRoutes.Route.attributes.name);
				$localstorage.set("RouteId", $scope.CheckedRoutes.Route.id);
				$localstorage.set("DriverId", $scope.CheckedRoutes.Route.attributes.driver.id);
				$state.go('nav.tromke');
			}

		}catch(err){
			alert(err.message);
		}
	});	
})


