angular.module('tromke.controllers', [])
 .controller('tromkeCtrl', function($scope, $state, $ionicPlatform, $ionicLoading, $compile, $localstorage, $interval) {
 	$ionicPlatform.ready(function(){
		try{	

			var bounds="";
			var markers=[];
			$scope.RouteId="";
			$scope.DriverId="";
			$scope.driverlat="";
			$scope.driverlong="";
			$scope.userPositionlat="";
			$scope.userPositionlong="";
			$scope.userid=$localstorage.get("userid");
			$scope.username=$localstorage.get("username");
			$scope.useremail=$localstorage.get("useremail");
			$scope.RouteId=$localstorage.get("RouteId");
			$scope.RouteName=$localstorage.get("RouteName");
			$scope.DriverId=$localstorage.get("DriverId");

			Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
			$scope.userid="Wx8FHRETFL";		
			if($scope.RouteId!=undefined && $scope.RouteId!=null && $scope.RouteId!="undefined" && $scope.RouteId!="null" && $scope.RouteId!="0" && $scope.RouteId!="" && $scope.DriverId!=undefined && $scope.DriverId!=null && $scope.DriverId!="undefined" && $scope.DriverId!="null" && $scope.DriverId!="0" && $scope.DriverId!=""){
					try{
							function success(position) {
								try{	
									$scope.userPositionlat=position.coords.latitude;
									$scope.userPositionlong=position.coords.longitude;
									// Get Location
									$scope.GetLatLong=function(){
										Parse.Cloud.run('getLatestLocation', { route: $scope.RouteId, customer:$scope.userid ,driver: $scope.DriverId }, {
											success: function(location) {
												$scope.driverlat= location.changed.location._latitude;
												$scope.driverlong= location.changed.location._longitude;
											},
											error: function(error) {
												alert("Invalid Route");
												$state.go('nav.home');
											}
										});
									}
									bounds = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
									var myOptions1 = {
										zoom: 15,
										center: bounds,
										mapTypeControl: false,
										navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
										mapTypeId: google.maps.MapTypeId.ROADMAP,
									};
										
										
										
									// Display a map on the page
									map = new google.maps.Map(document.getElementById("map"), myOptions1);
									
									// Multiple Markers
									$scope.GetLatLong();
										markers = [
											['You are Here!', $scope.userPositionlat,$scope.userPositionlong,'img/usermarker.png'],

											['Driver are Here', $scope.driverlat,$scope.driverlong,'img/busmarker.png']

										];	
										// Info Window Content

										var infoWindowContent = [

											['<div id="content"><h1 id="firstHeading" style="font-size:20px;" class="firstHeading">Your Position</h1></div>'],

											['<div id="content"><h1 id="firstHeading" style="font-size:20px;" class="firstHeading">Driver Position</h1></div>']

										];

										// Display multiple markers on a map
										var infoWindow = new google.maps.InfoWindow(), marker, i;

										// Loop through our array of markers & place each one on the map  
										for( i = 0; i < markers.length; i++ ) {
											var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
											//bounds.extend(position);
											marker = new google.maps.Marker({
												position: position,
												map: map,
												icon: markers[i][3],
												title: markers[i][0]
											});

											// Allow each marker to have an info window    
										
											google.maps.event.addListener(marker, 'click', (function(marker, i) {
												return function() {
													infoWindow.setContent(infoWindowContent[i][0]);
													infoWindow.open(map, marker);
												}
											})(marker, i));


										}
									
									$interval(function(){
										$scope.GetLatLong();
										markers = [
											['You are Here!', $scope.userPositionlat,$scope.userPositionlong,'img/usermarker.png'],

											['Driver are Here', $scope.driverlat,$scope.driverlong,'img/busmarker.png']

										];	
										// Info Window Content

										var infoWindowContent = [

											['<div id="content"><h1 id="firstHeading" style="font-size:20px;" class="firstHeading">Your Position</h1></div>'],

											['<div id="content"><h1 id="firstHeading" style="font-size:20px;" class="firstHeading">Driver Position</h1></div>']

										];

										// Display multiple markers on a map
										var infoWindow = new google.maps.InfoWindow(), marker, i;

										// Loop through our array of markers & place each one on the map  
										for( i = 0; i < markers.length; i++ ) {
											var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
											//bounds.extend(position);
											marker = new google.maps.Marker({
												position: position,
												map: map,
												icon: markers[i][3],
												title: markers[i][0]
											});

											// Allow each marker to have an info window    
										
											google.maps.event.addListener(marker, 'click', (function(marker, i) {
												return function() {
													infoWindow.setContent(infoWindowContent[i][0]);
													infoWindow.open(map, marker);
												}
											})(marker, i));


										}
									},15000);
									
								}catch(err){
									alert(err.message);
								}	
							}
						
							function error(msg) {
								console.log(arguments);
							}
							
							if (navigator.geolocation) {
								navigator.geolocation.getCurrentPosition(success, error);
								$ionicLoading.hide();
							} else {
								error('not supported');
								$ionicLoading.hide();
							}
														
					}catch(err){
						alert(err.message);
					}
			}else{
				alert("Select Route for check bus");
				$state.go('nav.home');
			}	
		}catch(err){
			alert(err.message);
		}
	});	
 });


