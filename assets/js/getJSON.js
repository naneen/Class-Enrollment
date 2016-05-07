var App = angular.module('App', ['angular-toArrayFilter']);

App.controller('CEnrollCtrl', function($scope, $http) {
  $http.get('https://whsatku.github.io/skecourses/combined.json')
  // $http.get('subjects/combined.json')
    .then(function(res){
      console.log(res.data);
      $scope.courses = res.data;
    });
  // var lists = $.parseJSON('[' + courses + ']');
  // console.log(lists);
});

// App.controller('CEnrollCtrl', function($scope) {
//     $scope.names = [
//         'Jani',
//         'Carl',
//         'Margareth',
//         'Hege',
//         'Joe',
//         'Gustav',
//         'Birgit',
//         'Mary',
//         'Kai'
//     ];
// });


// $(document).ready(function() {
//   var courses = [];
//
//   $.getJSON('https://whsatku.github.io/skecourses/combined.json', function(data) {
//     var output = "<ul>";
//     var titleTag = "<div class=\"title\"><i class=\"dropdown icon\"></i>";
//     var contentTag = "<div class=\"content\"><p class=\"transition hidden\">"
//     for(var i in data) {
//       output += titleTag + data[i].id + " - " + data[i].name.en + "</div>";
//       output += contentTag + data[i].description.en + "<br><br>"
//                 + checkUndefined(data[i].credit.self, data[i].credit.lab, data[i].credit.total, data[i].credit.lecture)  + "</div>";
//
//       courses.push({
//         title: data[i].id + " - " +data[i].name.en
//       });
//     }
//     output+="</ul>";
//     document.getElementById("list").innerHTML = output;
//     searching(courses);
//   });
//
//   function checkUndefined(self, lab, total, lec) {
//     var text = "( ";
//     var keys = ["self", "lab", "total", "lecture"];
//     var value = [self, lab, total, lec];
//     for (var i in keys) {
//       if(value[i] == undefined) {
//         text += keys[i] + ": -";
//       }
//       else{
//         text += keys[i] + ": " + value[i];
//       }
//       if(i != keys.length-1) {
//         console.log(keys.length);
//         text += " , ";
//       }
//     }
//     text += " )";
//     return text;
//   }
// });
