angular.module('tromke.controllers', [])
 .controller('tromkeCtrl', function($scope, $state, $ionicPlatform, $ionicLoading, $compile, $localstorage, $interval) {
 	$ionicPlatform.ready(function(){
		try{	

			var bounds="";
			var markers=[];
			var markers1=[];
			var loadonetime=1;

			$scope.RouteId="";
			$scope.DriverId="";
			$scope.driverlat="";
			$scope.driverlong="";
			$scope.userPositionlat="";
			$scope.userPositionlong="";
			$scope.isloc = "";
			$scope.userid=$localstorage.get("userid");
			$scope.username=$localstorage.get("username");
			$scope.useremail=$localstorage.get("useremail");
			$scope.RouteId=$localstorage.get("RouteId");
			$scope.RouteName=$localstorage.get("RouteName");
			$scope.DriverId=$localstorage.get("DriverId");
			$scope.noroute = true;

			Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
			
			$scope.userid="Wx8FHRETFL";		


			// Get Location
			$scope.driverlat = "";
			$scope.driverlong = "";
			$scope.loadAgain = 0;

			$scope.GetLatLong=function(check){
				Parse.Cloud.run('getLatestLocation', { route: $scope.RouteId, customer:$scope.userid ,driver: $scope.DriverId }, {
					success: function(location) {
						if(location.trip){
							$scope.driverlat = location.changed.location._latitude;
							$scope.driverlong = location.changed.location._longitude;
							if (navigator.geolocation) {
								navigator.geolocation.getCurrentPosition(success, error);
								$ionicLoading.hide();
							} else {
								error('not supported');
								$ionicLoading.hide();
							}

							if(check==1){
								$scope.loadAgain = 1;
								var centerPos = new google.maps.LatLng($scope.driverlat, $scope.driverlong);
								var myOptions1 = {
									zoom: 7,
									center: centerPos,
									mapTypeControl: false,
									navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
									mapTypeId: google.maps.MapTypeId.ROADMAP,
								};
								bounds = new google.maps.LatLngBounds();
								map = new google.maps.Map(document.getElementById("map"), myOptions1);	
							}
						}else{
							$scope.noroute = false;
							$ionicLoading.hide();
						}
					},
					error: function(error) {
						$scope.noroute = false;
						$ionicLoading.hide();
					}
				});
			}

			function success(position) {
				try{	
					$scope.userPositionlat=position.coords.latitude;
					$scope.userPositionlong=position.coords.longitude;	
					
					$scope.googleMapLoad(position.coords.latitude, position.coords.longitude, 1);	

					$interval(function(){
						$scope.loadAgain = 0;
						$scope.GetLatLong(0);
					},15000);
									
				}catch(err){
					alert(err.message);
				}	
			}
		
			function error(msg) {
				alert("Please Enable your GPS");
				$scope.googleMapLoad(12.9667, 77.5667, 0);
			}
			
			if($scope.RouteId!=undefined && $scope.RouteId!=null && $scope.RouteId!="undefined" && $scope.RouteId!="null" && $scope.RouteId!="0" && $scope.RouteId!="" && $scope.DriverId!=undefined && $scope.DriverId!=null && $scope.DriverId!="undefined" && $scope.DriverId!="null" && $scope.DriverId!="0" && $scope.DriverId!=""){
				$ionicLoading.show();
				$scope.GetLatLong(1);
			}else{
				//alert("Select Route for check bus");
				$state.go('nav.home');
			}


			$scope.googleMapLoad = function(lat,lng, isloc){
				try{

					if($scope.loadAgain==1){
						var GLOBE_WIDTH = 256; // a constant in Google's map projection
						var minLat = $scope.driverlat;
						var minLng= $scope.driverlong;
						var maxLat = lat;
						var maxLng = lng;

						if(minLat>maxLat){
							minLat = lat;
							maxLat = $scope.driverlat;
						}

						if(minLng>maxLng){
							minLng = lng;
							maxLng = $scope.driverlong;
						}

						var west = minLng;
						var east = maxLng;
						var north = maxLat;
						var south = minLat;

						var delta = 0;
						var angle = east - west;
						if (angle < 0) {
						    angle += 360;
						}
						var angle2 = north - south;
						if (angle2 > angle){
							angle = angle2;
							delta = 3;
						}
						var zoomfactor = Math.round(Math.log(960 * 360 / angle / GLOBE_WIDTH) / Math.LN2);
						
						if(map){
							map.setZoom(zoomfactor);
						}
					}
					
					$scope.isloc = isloc;
					$scope.loadMarkerPoint($scope.driverlat, $scope.driverlong);

				}catch(err){
					console.log(err.message);
				}
			}

			$scope.loadMarkerPoint = function(lat,lng){
				var isloc = $scope.isloc;
				
				markers = [];
				
				markers = [
					['You are Here!', $scope.userPositionlat,$scope.userPositionlong,'img/usermarker.png'],
					['Driver are Here', $scope.driverlat,$scope.driverlong,'img/car.jpg']
				];	

				// Info Window Content
				var infoWindowContent = [
					['<div id="content"><h1 id="firstHeading" style="font-size:20px;" class="firstHeading">Your Position</h1></div>'],
					['<div id="content"><h1 id="firstHeading" style="font-size:20px;" class="firstHeading">Driver Position</h1></div>']
				];
			
				// Display multiple markers on a map
				var infoWindow = new google.maps.InfoWindow(), marker, i;


				deleteMarkers();

				// Loop through our array of markers & place each one on the map  
				for( i = 0; i < markers.length; i++ ) {

					loadonetime=0;

					var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
					bounds.extend(position);

					var icon = markers[i][3];
					var title = markers[i][0];

					var marker = new google.maps.Marker({
						position: position,
						map: map,
						icon: markers[i][3],
						title: markers[i][0]
					});

					markers1.push(marker);
	
					// Allow each marker to have an info window
					google.maps.event.addListener(marker, 'click', (function(marker, i) {
						return function() {
							infoWindow.setContent(infoWindowContent[i][0]);
							infoWindow.open(map, marker);
						}
					})(marker, i));

					if($scope.loadAgain==1){
						map.fitBounds(bounds);
					}

				}
			}

			var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
		        this.setZoom(14);
		        google.maps.event.removeListener(boundsListener);
		    });

			// Sets the map on all markers in the array.
			function setMapOnAll(data) {
			  	for (var i = 0; i < markers1.length; i++) {
			   		markers1[i].setMap(data);
			  	}	
			}

			// Removes the markers from the map, but keeps them in the array.
			function clearMarkers() {
			  	setMapOnAll(null);
			}

			// Deletes all markers in the array by removing references to them.
			function deleteMarkers() {
			  	clearMarkers();
			  	markers1 = [];
			}

		}catch(err){
			alert(err.message);
		}
	});	
 });


