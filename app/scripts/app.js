'use strict';

/**
 * @ngdoc overview
 * @name tesseraApp
 * @description
 * # tesseraApp
 *
 * Main module of the application.
 */
angular

.module('tesseraApp', [
	'ngResource',
	'ngRoute'
])

.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
])

.run(['$rootScope','$http',
	function ($scope, $http) {
		// App version info
		$http.get('version.json').success(function (v) {
			$scope.version = v.version;
			$scope.appName = v.name;
		});
	}
]);