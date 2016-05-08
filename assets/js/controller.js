
var App = angular.module('App', ['ui.router']);

App.controller('HomeController', function ($http, MyCourseService) {
  var home = this;
  var myCourses = MyCourseService.myCourses;
  // $http.get('https://whsatku.github.io/skecourses/combined.json')
  $http.get('https://whsatku.github.io/skecourses/list.json')
  .success(function(res) {
    home.courses = res;
    // console.log(res);
  });

  home.isEnrolled = function(courseID) {
    console.log("isEnrolled");
    console.log(myCourses);
    var myCoursesID = [];
    angular.forEach(myCourses, function(c, key) {
      myCoursesID.push(c.id);
    });

    if(myCoursesID.indexOf(courseID) !== -1) {
      console.log("EXIST!! : " + courseID);
      return true;
    }
      return false;
  }
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

  $http.get('https://whsatku.github.io/skecourses/' + courseID + '.json')
  .success(function(res) {
    enroll.course = res;
  });

  enroll.addCourse = function() {
    MyCourseService.addCourse(enroll.course);
  }

  enroll.dropCourse = function() {
    // MyCourseService.dropCourse(enroll.course);
  }
})

App.controller('DashboardController', function ($http, MyCourseService) {
  var dashb = this;
  dashb.mycourses = MyCourseService.myCourses;
  console.log(dashb.mycourses);
})

App.service('MyCourseService', function() {
  var myserv = this;
  myserv.myCourses = [];

  myserv.addCourse = function(c) {
    // console.log("service");
    myserv.myCourses.push(
      c
    );
    // console.log(myserv.myCourses);
  };

  myserv.dropCourse = function(courseID) {
    // console.log("dropCourse");
    // myserv.myCourses.push({
    //   id: courseID
    // });
  };
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
