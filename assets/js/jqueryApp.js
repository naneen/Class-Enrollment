$(document).ready(function() {
  $('.button').on('click', function() {
    $('.button').dimmer('show');
  });

  $('.ui.accordion').accordion('refresh');
});


// $('.ui .item').on('click', function() {
//   $('.ui .item').removeClass('active');
//   $(this).addClass('active');
// });
