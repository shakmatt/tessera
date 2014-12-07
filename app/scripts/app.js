'use strict';

/**
 * @ngdoc overview
 * @name AngularTemplateApp
 * @description
 * # AngularTemplateApp
 *
 * Main module of the application.
 */
angular

.module('AngularTemplateApp', [
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