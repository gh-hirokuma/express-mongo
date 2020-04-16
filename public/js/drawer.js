$(document).ready(function(){
  $('#open_nav').on('click', function(){
    $('#nav').removeClass('hidden');
  });
  $('#close_nav').on('click', function(){
    $('#nav').addClass('hidden');
  });
});

