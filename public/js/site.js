$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $('[data-toggle="tooltip"]').tooltip('toggleEnabled');
  });
});