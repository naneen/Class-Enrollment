
var App = angular.module('App', ['ui.router']);

App.controller('HomeController', function ($http) {
    var regist = this;

    // $http.get('https://whsatku.github.io/skecourses/combined.json')
    $http.get('https://whsatku.github.io/skecourses/list.json')
      .success(function(res){
        // console.log(res);
        regist.courses = res;
      });
  })

App.controller('ListController', function ($http) {
    var list = this;

    // $http.get('https://whsatku.github.io/skecourses/combined.json')
    $http.get('https://whsatku.github.io/skecourses/combined.json')
      .success(function(res){
        list.detail = res;
        console.log(list.detail);
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
    .state('list', {
      url: "/list",
      templateUrl: "list.html"
    })
});
