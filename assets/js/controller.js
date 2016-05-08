
var App = angular.module('App', ['ui.router']);

App.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/login");
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
  .state('dashboardNav', {
    url: "/myCourses",
    templateUrl: "dashboardNav.html",
    controller: "DashboardController",
    controllerAs: 'dashCtrl'
  })
  .state('login', {
    url: "/login",
    templateUrl: "login.html",
    controller: "LoginController",
    controllerAs: 'loginCtrl'
  })
});

App.service('MyCourseService', function() {
  var myserv = this;
  myserv.myCourses = [];

  myserv.addCourse = function(course) {
    myserv.myCourses.push(
      course
    );
  };

  myserv.dropAllCourse = function() {
    myserv.myCourses.length = 0;
  }

  myserv.dropCourse = function(courseID) {
    console.log("drop");
    console.log(courseID);
    var myCoursesID = [];
    angular.forEach(myserv.myCourses, function(c, key) {
      myCoursesID.push(c.id);
    });

    var index = myCoursesID.indexOf(courseID);
    myserv.myCourses.splice(index, 1);
    console.log(myserv.myCourses.length);
  };
});

App.controller('HomeController', function ($http, MyCourseService) {
  var home = this;
  var myCourses = MyCourseService.myCourses;
  // $http.get('https://whsatku.github.io/skecourses/combined.json')
  $http.get('https://whsatku.github.io/skecourses/list.json')
  .success(function(res) {
    home.courses = res;
  });

  home.isEnrolled = function(courseID) {
    var myCoursesID = [];
    angular.forEach(myCourses, function(c, key) {
      myCoursesID.push(c.id);
    });

    if(myCoursesID.indexOf(courseID) !== -1) {
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
})

App.controller('DashboardController', function ($http, MyCourseService) {
  var dashb = this;
  dashb.mycourses = MyCourseService.myCourses;

  dashb.dropAllCourse = function() {
    MyCourseService.dropAllCourse();
  }

  dashb.dropCourse = function() {
    MyCourseService.dropCourse();
  }
})
