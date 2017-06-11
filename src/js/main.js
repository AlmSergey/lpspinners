/*
 * Third party
 */
//= ../../bower_components/jquery/dist/jquery.js


/*
 * Custom
 */
$( document ).ready(function() {
   var menuDisplayPoint = 700;
   var menuFiller = $(".menu-filler");
   var menu = $("#menu");

   $(window).scroll(function () {

       var toTop = $(this).scrollTop();

       if (toTop > menu.outerHeight()+20) {
           menu.css("top", -menu.outerHeight());
       } else if (toTop <= menu.outerHeight()+20) {
           menu.css("position","static");
           menuFiller.hide();
       }

       if (toTop > menuDisplayPoint) {
           menuFiller.show();
           menu.css("position","fixed");
           menu.css("top","0");
       } else if (toTop <= menuDisplayPoint) {

           menu.css("top", -menu.outerHeight());
       }


   })
});