angular.module('tromke.controllers', [])
 .controller('tromkeCtrl', function($scope, $state, $ionicPlatform, $cordovaGeolocation, $ionicLoading, $compile, $localstorage, $interval, $ionicHistory) {
 	$ionicPlatform.ready(function(){
		try{	

			var bounds="";
			var markers=[];
			var markers1=[];
			var loadonetime=1;
			var map;

			$ionicHistory.clearHistory();
			
			$scope.RouteId="";
			$scope.DriverId="";
			$scope.driverlat="";
			$scope.driverlong="";
			$scope.userPositionlat="";
			$scope.userPositionlong="";
			$scope.isloc = "";
			$scope.userid = $localstorage.get("userid");
			$scope.username = $localstorage.get("username");
			$scope.useremail = $localstorage.get("useremail");
			$scope.RouteId = $localstorage.get("RouteId");
			$scope.RouteName = $localstorage.get("RouteName");
			$scope.DriverId = $localstorage.get("DriverId");
			$scope.noroute = true;
	

			Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
			
			//$scope.userid="Wx8FHRETFL";		


			// Get Location
			$scope.driverlat = "";
			$scope.driverlong = "";
			$scope.loadAgain = 0;
			$scope.mapStatus = 0;
			$scope.noroute=false;


			$scope.GetLatLong=function(check){
				Parse.Cloud.run('getLatestLocation', { route: $scope.RouteId, customer:$scope.userid ,driver: $scope.DriverId }, {
					success: function(location) {
						if(location.trip=="undefined" || location.trip==undefined){

							$scope.driverlat = location.changed.location._latitude;
							$scope.driverlong = location.changed.location._longitude;

							/*var posOptions = {timeout: 10000, enableHighAccuracy: false};
						 	$cordovaGeolocation
						    	.getCurrentPosition(posOptions)
						    	.then(function (position) {
						    		$scope.userPositionlat=position.coords.latitude;
									$scope.userPositionlong=position.coords.longitude;	
						    		$scope.googleMapLoad(1);
						    		$ionicLoading.hide();
						   		}, function(err) {
						   			$scope.googleMapLoad(0);
						   			$ionicLoading.hide();
						    	});*/
							
							if($scope.noroute==false){
								$scope.noroute = true;
								
								document.getElementById('map').style.visibility = "visible";

								loadMap();
							}else{
								$scope.loadMarkerPoint($scope.driverlat, $scope.driverlong);
								$scope.noroute = true;
							}

						}else{
							$scope.noroute = false;

							document.getElementById('map').style.visibility = "hidden";

							$ionicLoading.hide();
							$scope.mapStatus=0;
						}
					},
					error: function(error) {
						$scope.noroute = false;

						document.getElementById('map').style.visibility = "hidden";

						$ionicLoading.hide();
					}
				});
			}


			function loadMap(){
				var centerPos = new google.maps.LatLng($scope.driverlat, $scope.driverlong);
				var myOptions1 = {
					zoom: 16,
					center: centerPos,
					mapTypeControl: false,
					navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
					mapTypeId: google.maps.MapTypeId.ROADMAP,
				};
				//bounds = new google.maps.LatLngBounds();
				map = new google.maps.Map(document.getElementById("map"), myOptions1);
				$scope.loadMarkerPoint($scope.driverlat, $scope.driverlong);

				console.log("Load Map");
			}

			function ClearAllIntervals() {
				var i = $localstorage.get("interval");
				if(i!="undefined" && i!=undefined && i!=null && i!="null" && i!=""){
			  		window.clearInterval(i);
			  	}
			}

			ClearAllIntervals();

			if($scope.RouteId!=undefined && $scope.RouteId!=null && $scope.RouteId!="undefined" && $scope.RouteId!="null" && $scope.RouteId!="0" && $scope.RouteId!="" && $scope.DriverId!=undefined && $scope.DriverId!=null && $scope.DriverId!="undefined" && $scope.DriverId!="null" && $scope.DriverId!="0" && $scope.DriverId!=""){
				$ionicLoading.show();

				$scope.GetLatLong(1);

				var getInterval = setInterval(function(){
					console.log("data");
					$scope.loadAgain = 0;
					$scope.GetLatLong(0);
				},5000);

				$localstorage.set("interval", getInterval);

			}else{
				$state.go('nav.home');
			}


			// Display multiple markers on a map
			var infoWindow = new google.maps.InfoWindow(), marker;

			$scope.loadMarkerPoint = function(lat,lng){
				
				markers = [];
				
				markers = [
					['Driver are Here', $scope.driverlat,$scope.driverlong,'img/car1.png']
				];	

				var infoWindowContent = [
					['<div id="content"><h1 id="firstHeading" style="font-size:20px;" class="firstHeading">Driver Position</h1></div>']
				];
			

				deleteMarkers();

				// Loop through our array of markers & place each one on the map  
				for(var i = 0; i < markers.length; i++ ) {

					loadonetime=0;

					var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
					//bounds.extend(position);

					var icon = markers[i][3];
					var title = markers[i][0];

					var marker = new google.maps.Marker({
						position: position,
						map: map,
						icon: markers[i][3],
						title: markers[i][0]
					});

					setTimeout(function(){
						map.setCenter(position);
					},1000);
					
					markers1.push(marker);

					pushMarker(marker, infoWindowContent[i][0]);
	
					// Allow each marker to have an info window
					
					if($scope.loadAgain==1){
						//map.fitBounds(bounds);
					}
				}

				$ionicLoading.hide();
			}

			function pushMarker(marker, content){
				google.maps.event.addListener(marker, 'click', (function(marker, content){
					return function() {
						infoWindow.setContent(content);
						infoWindow.open(map, marker);
					}
				})(marker, content));
			}


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
			console.log(err.message);
		}
	});	
 });


