/*
 * Third party
 */
//= ../../bower_components/jquery/dist/jquery.js
//= ../../bower_components/slick-carousel/slick/slick.js


/*
 * Custom
 */

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    var height = window.innerWidth / 16 * 9;
    player = new YT.Player('player', {
        height: height,
        width: '100%',
        playerVars: {
            controls: 0,
            showinfo: 0,
            iv_load_policy: 3,
            rel: 0,
            autoplay: 1,
            modestbranding: 1,
            hd: 1,
            branding: 0,
            autohide: 1,
            loop: 1,
            playlist: 'ylN_btHE_zo'
        },
        videoId: 'ylN_btHE_zo',
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    event.target.mute();
}


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



    $('#reviews-slider').slick();
});