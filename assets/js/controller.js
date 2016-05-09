
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
  .state('report', {
    url: "/report",
    templateUrl: "confirm.html",
    controller: "ReportController",
    controllerAs: 'repCtrl'
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

App.service('MyCourseService', function($http) {
  var myserv = this;
  myserv.myNewCourses = [];
  myserv.myCourses = [];

  myserv.addCourse = function(course) {
    myserv.myNewCourses.push(
      course
    );
    myserv.myCourses.push(
      course
    );
    myserv.postCourses();
  };

  myserv.clearNewEntry = function() {
    myserv.myNewCourses.length = 0;
    console.log(myserv.myNewCourses);
  }

  myserv.dropAllCourse = function() {
    myserv.myCourses.length = 0;
    myserv.postCourses();
  }

  myserv.dropCourse = function(courseID) {
    var myCoursesID = [];
    angular.forEach(myserv.myCourses, function(c, key) {
      myCoursesID.push(c.id);
    });

    var index = myCoursesID.indexOf(courseID);
    myserv.myCourses.splice(index, 1);
    myserv.postCourses();
  };

  myserv.postCourses = function() {
    var body = { '561054048' : myserv.myCourses };
    $http.post('http://52.37.98.127:3000/v1/5610545048?pin=5048', angular.toJson(body), {
      headers : {
          'Content-Type': 'application/json'
      }
    }).success(function(data, status, headers, config) {
      // alert('success2')
    }).
    error(function(data, status, headers, config) {
      alert(data.body);
    });
  }
});

App.controller('HomeController', function ($http, MyCourseService) {
  var home = this;
  var myCourses = MyCourseService.myCourses;
  var myNewCourses = MyCourseService.myNewCourses;

  $http.get('http://52.37.98.127:3000/v1/5610545048?pin=5048')
    .success(function(res) {
      home.nrolledCourses = res;
      // console.log(home.nrolledCourses);
    });

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

App.controller('ReportController', function ($http, MyCourseService) {
  var report = this;
  report.mycourses = MyCourseService.myCourses;
  report.myNewcourses = MyCourseService.myNewCourses;

  report.dropAllCourse = function() {
    MyCourseService.dropAllCourse();
  }

  report.dropCourse = function(id) {
    MyCourseService.dropCourse(id);
  }

  report.clearNewEntry = function() {
    MyCourseService.clearNewEntry();
  }
})

App.controller('DashboardController', function ($http, MyCourseService) {
  var dashb = this;
  dashb.mycourses = MyCourseService.myCourses;

  dashb.dropAllCourse = function() {
    MyCourseService.dropAllCourse();
  }

  dashb.dropCourse = function(id) {
    MyCourseService.dropCourse(id);
  }
})
