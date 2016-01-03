'use strict';

/**
* @ngdoc function
* @name myTestAngularProjectApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the myTestAngularProjectApp
*/
angular.module('myTestAngularProjectApp')
.controller('MainCtrl', function ($scope, searchService) {

  $scope.model = {
    result: []
  }

  $scope.searchString = undefined;
  $scope.map = undefined;
  $scope.mapMarkers = [];
  $scope.querying = false;

  $scope.$watch('searchString', function() {
    if (!$scope.querying) {
      $scope.querying=true
      setTimeout($scope.search, 1000);
    }
  })

  $scope.search = function() {
    searchService.search($scope.searchString).then(
      function(response) {
        $scope.model.result = response.data;
        $scope.querying = false;
        $scope.plotPointsOnMap(response.data);
      }, function(error) {
        $scope.querying = false;
      }
    )
  }

  $scope.clearAllMarkers = function() {
    angular.forEach($scope.mapMarkers, function(val, key) {
      val.setMap(null)
    })
  }

  $scope.plotPointsOnMap = function(data) {
    $scope.clearAllMarkers();

    for (var i = 0; i < data.length; i++) {
      var point = data[i];
      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(point.latitude, point.longitude),
          title: point.name,
          map: $scope.map
      });
      $scope.mapMarkers.push(marker);
      point.marker = marker;

      var infowindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
          $scope.map.setZoom(12);
          $scope.map.setCenter(marker.getPosition());
          infowindow.setContent(marker.getTitle());
          infowindow.open($scope.map, marker);
        }
      })(marker));

      $scope.map.setCenter(marker.getPosition())
      $scope.map.setZoom(9);
    }
  }

  $scope.seeOnMap = function(item, index) {
    var marker = item.marker;
    new google.maps.event.trigger( marker, 'click' );
  }

  $scope.initMap = function() {
    var mapProp = {
      center:new google.maps.LatLng(41.8369,-87.6847),
      zoom:9,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    $scope.map=new google.maps.Map(document.getElementById("map"),mapProp);
  }

  $scope.initAnchorLinks = function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
    }
  });
  }

  $scope.initMap();
  $scope.initAnchorLinks();

});
