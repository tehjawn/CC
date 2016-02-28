'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', function($scope,$position) {
  	$scope.notifications = [
	  	{
	  		caller: "Crystal",
	  		time: "5:58 PM",
	  		message: "Hi there!"
	  	},
	  	{
	  		caller: "Crystal",
	  		time: "5:58 PM",
	  		message: "Hi there!"
	  	},
	  	{
	  		caller: "Crystal",
	  		time: "5:58 PM",
	  		message: "Hi there!"
	  	}
  	];
  });
