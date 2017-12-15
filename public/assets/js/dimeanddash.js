
$(document).ready(function(){
  $(".main-item li").draggable({helper:"clone"});

  $(".user-items").droppable({drop:function(event,ui){
    $("#test").append($("<li></li>").text(ui.draggable.text()));
  }});
});

console.log("hello world");

$(".move-button").click (function(){
    console.log("The button was clicked.");
});
