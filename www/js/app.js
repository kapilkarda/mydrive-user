// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('prottapp', ['ionic', 'nav.controllers', 'home.controllers','login.controllers', 'tromke.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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
  });
})

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
