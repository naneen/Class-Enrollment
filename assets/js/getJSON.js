
var App = angular.module('App', ['ui.router']);

App.controller('HomeController', function ($http) {
  var regist = this;

  // $http.get('https://whsatku.github.io/skecourses/combined.json')
  $http.get('https://whsatku.github.io/skecourses/list.json')
  .success(function(res) {
    regist.courses = res;
  });
})

App.controller('ListController', function ($http) {
  var list = this;

  $http.get('https://whsatku.github.io/skecourses/combined.json')
  .success(function(res) {
    list.detail = res;
  });
})

App.controller('EnrollController', function ($http, $stateParams, MyCourseService) {
  var enroll = this;
  var courseID = $stateParams.courseID;
  var c = [];

  $http.get('https://whsatku.github.io/skecourses/' + courseID + '.json')
  .success(function(res) {
    enroll.course = res;
    enroll.c = res;
  });

  enroll.addCourse = function() {
    MyCourseService.addCourse(enroll.c);
  }
})

App.controller('DashboardController', function ($http, MyCourseService) {
  var dashb = this;
  dashb.mycourses = MyCourseService.myCourses;
  // dashb.mycourses = MyCourseService.getCourses();
  console.log(dashb.mycourses);
})

App.service('MyCourseService', function() {
  var myserv = this;
  myserv.myCourses = [];

  myserv.addCourse = function(courseID) {
    console.log("service");
    myserv.myCourses.push({
      id: courseID
    });
    // console.log(myserv.myCourses);
  };

  // myserv.getCourses = function() {
  //   return myserv.myCourses;
  // };
});

App.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");
  $stateProvider
  .state('home', {
    url: "/home",
    templateUrl: "home.html",
    controller: "HomeController",
    controllerAs: 'nrollCtrl'
  })
  // .state('state1.list', {
  //   url: "/list",
  //   templateUrl: "partials/state1.list.html",
  //   controller: function($scope) {
  //     $scope.items = ["A", "List", "Of", "Items"];
  //   }
  // })
  .state('enroll', {
    url: '/enroll/:courseID',
    templateUrl: "enroll.html",
    controller: "EnrollController",
    controllerAs: 'nrollCtrl'
  })
  .state('list', {
    url: "/list",
    templateUrl: "list.html",
    controller: "ListController",
    controllerAs: 'listCtrl'
  })
  .state('dashboard', {
    url: "/dashboard",
    templateUrl: "dashboard.html",
    controller: "DashboardController",
    controllerAs: 'dashCtrl'
  })
});
