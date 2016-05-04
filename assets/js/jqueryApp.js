$(document).ready(function() {
  $('.button').on('click', function() {
    $('.button').dimmer('show');
  });

  $('.ui.accordion').accordion('refresh');

  // $('.ui.search').search('get result', 'cat');
  
});

function searching(courses) {
  $('.ui.search').search({
      source: courses
  });
}
