// var App = angular.module('App', ['angular-toArrayFilter']);
//
// App.controller('CEnrollCtrl', function($scope, $http) {
//   $http.get('https://whsatku.github.io/skecourses/combined.json')
//     .then(function(res){
//       console.log(res.data);
//       $scope.courses = res.data;
//     });
// });
var App = angular.module('App', ['angular-toArrayFilter', 'ui.router']);

App.controller('HomeController', function ($http) {
    var regist = this;

    $http.get('https://whsatku.github.io/skecourses/combined.json')
      .success(function(res){
        console.log(res);
        regist.courses = res;
      });
  })


App.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "home.html"
    })
    // .state('state1.list', {
    //   url: "/list",
    //   templateUrl: "partials/state1.list.html",
    //   controller: function($scope) {
    //     $scope.items = ["A", "List", "Of", "Items"];
    //   }
    // })
    .state('enroll', {
      url: "/enroll",
      templateUrl: "enroll.html"
    })
    // .state('state2.list', {
    //   url: "/list",
    //   templateUrl: "partials/state2.list.html",
    //   controller: function($scope) {
    //     $scope.items = ["A", "List", "Of", "Items"];
    //   }
    });
