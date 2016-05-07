// var App = angular.module('App', ['angular-toArrayFilter']);
//
// App.controller('CEnrollCtrl', function($scope, $http) {
//   $http.get('https://whsatku.github.io/skecourses/combined.json')
//     .then(function(res){
//       console.log(res.data);
//       $scope.courses = res.data;
//     });
// });

angular.module('App', ['angular-toArrayFilter'])
  .controller('HomeController', function ($http) {
    var regist = this;

    $http.get('https://whsatku.github.io/skecourses/combined.json')
      .success(function(res){
        console.log(res);
        regist.courses = res;
      });
  })
