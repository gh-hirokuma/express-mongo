$("select").hide();
$(".wrap").hover(function(){
  $("select").show();
},function(){
  $("select").hide();
});
$("select").click(function(){
  $(".value").html( $("option:selected").text());
  $("select").hide();
});
