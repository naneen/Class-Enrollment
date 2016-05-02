// var App = angular.module('App', []);
//
// App.controller('CEnrollCtrl', function($scope, $http) {
// $http.get('https://whsatku.github.io/skecourses/combined.json')
// // $http.get('subjects/combined.json')
//      .then(function(res){
//         $scope.courses = res.data;
//       });
// });
$(document).ready(function() {
  $.getJSON('https://whsatku.github.io/skecourses/combined.json', function(data) {
        var output = "<ul>";
        var titleTag = "<div class=\"title\"><i class=\"dropdown icon\"></i>";
        var contentTag = "<div class=\"content\"><p class=\"transition hidden\">"
        for (var i in data) {
            output += titleTag + data[i].id + " - " + data[i].name.en + "</div>";
            output += contentTag + data[i].description.en + "</div>"
        }
        output+="</ul>";
        document.getElementById("list").innerHTML = output;
  });
});
