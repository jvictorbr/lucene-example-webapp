'use strict';

/**
 * @ngdoc service
 * @name myTestAngularProjectApp.searchService
 * @description
 * # searchService
 * Service in the myTestAngularProjectApp.
 */
angular.module('myTestAngularProjectApp')
  .service('searchService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	  
	  return {
	  	
		  search: function(query) { 
			  return $http({
				  url: 'http://localhost:8080/business/query?q='+query+'*',
				  method: 'GET',
				  dataType: 'jsonp',
				  data: ''
			  })
		  }
		
	  }
	  
	  
  });
