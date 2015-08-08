// Ionic Starter App
//https://jsfiddle.net/sweekark/65uv38wt/3/
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var db = null;
var check=1;
var isOffline_main="";
angular.module('Tromke', ['ionic', 'nav.controllers', 'home.controllers','login.controllers', 'tromke.controllers', 'signup.controllers', 'forgot.controllers'])

.run(function($ionicPlatform, $rootScope, $state, $localstorage, $location) {
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
			
			$ionicPlatform.registerBackButtonAction(function () {
				var hashvalue = $location.url();
				if(hashvalue=="/nav/home" || hashvalue=="/login" || hashvalue=="/signup" || hashvalue=="/forgot"){
					navigator.app.exitApp();
				} else {
					navigator.app.backHistory();
				}
			}, 100);
			
			var userId = $localstorage.get("userid");
			if(userId!=undefined && userId!=null && userId!="undefined" && userId!="null" && userId!="0" && userId!=""){
				$state.go('nav.home');
			}
			
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
  $urlRouterProvider.otherwise('/login');

});
