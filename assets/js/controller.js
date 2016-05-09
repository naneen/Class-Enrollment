
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
  .state('confirm', {
    url: "/confirm",
    templateUrl: "confirm.html",
    controller: "ConfirmController",
    controllerAs: 'confCtrl'
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
  myserv.myNewCourses = [];
  myserv.myCourses = [];

  myserv.addCourse = function(course) {
    myserv.myNewCourses.push(
      course
    );
    console.log(myserv.myNewCourses);
  };

  myserv.removeAllCourse = function() {
    myserv.myNewCourses.length = 0;
  }

  myserv.removeCourse = function(courseID) {
    console.log("drop");
    console.log(courseID);
    var myCoursesID = [];
    angular.forEach(myserv.myNewCourses, function(c, key) {
      myCoursesID.push(c.id);
    });

    var index = myCoursesID.indexOf(courseID);
    myserv.myNewCourses.splice(index, 1);
    console.log(myserv.myNewCourses.length);
  };

  myserv.confirmEnroll = function() {
    angular.forEach(myserv.myNewCourses, function(c, key) {
      myserv.myCourses.push(c);
    });
    myserv.removeAllCourse();
  }

  myserv.dropAllCourse = function() {
    myserv.myCourses.length = 0;
  }

  myserv.dropCourse = function(courseID) {
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
  var myNewCourses = MyCourseService.myNewCourses;
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
    angular.forEach(myNewCourses, function(c, key) {
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
    // console.log(enroll.course);
    MyCourseService.addCourse(enroll.course);
  }
})

App.controller('ConfirmController', function ($http, MyCourseService) {
  var conf = this;
  conf.mycourses = MyCourseService.myNewCourses;
  console.log(conf.mycourses);

  conf.removeAllCourse = function() {
    MyCourseService.removeAllCourse();
  }

  conf.removeCourse = function() {
    MyCourseService.removeCourse();
  }

  conf.confirmEnroll = function() {
    MyCourseService.confirmEnroll();
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
