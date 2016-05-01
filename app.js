var App = angular.module('App', []);

App.controller('CEnrollCtrl', function($scope, $http) {
$http.get('https://whsatku.github.io/skecourses/combined.json')
// $http.get('subjects/combined.json')
     .then(function(res){
        $scope.courses = res.data;
      });
});
