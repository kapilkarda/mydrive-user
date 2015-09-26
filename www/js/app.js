var db = null;
var check=1;
var isOffline_main="";

angular.module('Tromke', ['ionic', 'ngCordova.plugins', 'nav.controllers', 'home.controllers','login.controllers', 'tromke.controllers', 'signup.controllers', 'forgot.controllers'])

.run(function($ionicPlatform, $rootScope, $state, $localstorage, $location, $cordovaNetwork) {
	$ionicPlatform.ready(function() {
		try{
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			  cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
			  // org.apache.cordova.statusbar required
			  StatusBar.styleLightContent();
			}

			// var type = $cordovaNetwork.getNetwork();
   //          var isOffline = $cordovaNetwork.isOffline();
   //          if(isOffline==true){
   //              alert("Internet is not connected");
   //              if(navigator.app){
   //                  navigator.app.exitApp();
   //              }else if(navigator.device){
   //                  navigator.device.exitApp();
   //              }
   //          }
			
			$ionicPlatform.registerBackButtonAction(function () {
				var hashvalue = $location.url();
				if(hashvalue=="/nav/home" || hashvalue=="/nav/tromke" || hashvalue=="/login" || hashvalue=="/signup" || hashvalue=="/forgot"){
					navigator.app.exitApp();
				} else {
					navigator.app.backHistory();
				}
			}, 100);


			cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
			    if(enabled){

			    }else{
			    	alert("Please enable your location");
			    	cordova.plugins.diagnostic.switchToLocationSettings();
			    }
			}, function(error){
			    alert("The following error occurred: "+error);
			});


		}catch(err){
			alert(err.message);
		}
	});
})
.factory('$localstorage', ['$window', function($window) {
	return {
	set: function(key, value) {
	 $window.localStorage[key] = value;
	},
	get: function(key, defaultValue) {
	 return $window.localStorage[key] || defaultValue;
	},
	setObject: function(key, value) {
	 $window.localStorage[key] = JSON.stringify(value);
	},
	getObject: function(key) {
	 return JSON.parse($window.localStorage[key] || '{}');
	}
	}
}])
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
		cache: false,
		url: '/login',
		templateUrl: 'templates/login.html',
		controller: 'loginCtrl'
  })
  .state('forgot', {
		cache: false,
		url: '/forgot',
		templateUrl: 'templates/forgot.html',
		controller: 'forgotCtrl'
  })
  .state('signup', {
		cache: false,
		url: '/signup',
		templateUrl: 'templates/signup.html',
		controller: 'signupCtrl'
  })
  .state('nav', {
		cache: false,
		url: '/nav',
		templateUrl: 'templates/nav.html',
		abstract: true,
		controller: 'navCtrl'
  })
  .state('nav.home', {
		cache: false,
		url: '/home',
		views:{
		'nav':{
			templateUrl: 'templates/home.html',
			controller: 'homeCtrl'
		}
	}
  })
  .state('nav.tromke', {
		cache: false,
		url: '/tromke',
		views:{
		'nav':{
			templateUrl: 'templates/tromke.html',
			controller: 'tromkeCtrl'
		}
	}
  })
  // if none of the above states are matched, use this as the fallback

  	var userId = localStorage.getItem("userid");
	var route_id = localStorage.getItem("RouteId");
	if(userId!=undefined && userId!=null && userId!="undefined" && userId!="null" && userId!="0" && userId!=""){
		if(route_id!=undefined && route_id!=null && route_id!="undefined" && route_id!="null" && route_id!="0" && route_id!=""){
			$urlRouterProvider.otherwise('/nav/tromke');
		}else{
			$urlRouterProvider.otherwise('/nav/home');
		}
	}else{
		$urlRouterProvider.otherwise('/login');
	}
});
