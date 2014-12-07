'use strict';

/**
 * @ngdoc overview
 * @name ng-app-here
 * @description
 * # ng-app-here
 *
 * Main module of the application.
 */
angular

.module('ng-app-here', [
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