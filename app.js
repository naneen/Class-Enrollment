var App = angular.module('App', []);

App.controller('TodoCtrl', function($scope, $http) {
$http.get('subjects/combined.json')
     .then(function(res){
        $scope.courses = res.data;
      });
});
