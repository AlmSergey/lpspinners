/*
 * Third party
 */
//= ../../bower_components/jquery/dist/jquery.js
//= ../../bower_components/slick-carousel/slick/slick.js

/*
 * jQuery vendor plugins
 */
//= ./vendor/jquery.fancybox.js
//= ../../bower_components/jquery.maskedinput/dist/jquery.maskedinput.js

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

   function floatMenu() {
       if(window.innerWidth > 768) {
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
           });
       } else {
           $(window).off('scroll');
       }
   }

    floatMenu();

    $(window).resize(function () {
        $("#player").css("height", window.innerWidth / 16 * 9 );
        floatMenu();
    });



    $('#reviews-slider').slick({
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>'
    });



    $.fancybox.defaults.buttons = [
        'thumbs',
        'close'
    ];


    $('#callbackSend').click(function() {
        var fields = {
            phone: $('#callbackPhone').val(),
            name: $('#callbackName').val()
        };

        var error = false;

        console.log(fields.phone);
        console.log(fields.name);

        if( fields.phone === '') {
            $('#callbackPhone').addClass('error');
            error = true;
        }

        if( fields.name === '') {
            $('#callbackName').addClass('error');
            error = true;
        }

        if (!error) {
            jQuery.ajax({
                url: '../callback.php',
                data: fields,
                success: function (data) {
                    $("#callbackFbox .succes").show();
                    $("#senderName").text(fields.name)
                }
            });
        }


    });


   // $("input[type=phone]").mask('+38(999)999-99-99',{placeholder:"+38(___)___-__-__"});

    var cart = {};
    var total = 0;

    function totalCount() {
        total = 0;
        $.each(cart, function (i,v) {


            total = total + +v.price * +v.quantity;
        });
        $(".order-total_price").text(total + ' грн');
    }

    $(".addtocart").click(function() {
        var product = $(this).parent().parent();

        if (cart[product.attr("id")] !== undefined) {
            $("#cart").find('#'+ product.attr("id")).find(".more").trigger('click');
        } else {

        var productFields = {
            title: product.find('h4').text(),
            img: product.find(".product_img-holder a").html(),
            price: product.find(".product_price span").text(),
            quantity: 1
        };

        cart[product.attr("id")] = productFields;


        $("#cart").append('' +
            '<div class="order-product" id="' + product.attr("id") + '">' +
            '<div class="order-product_img">' +
            productFields.img +
            '</div>' +
            '<div class="order-product_title">' + productFields.title + '</div>' +
            '<div class="order-product_counter">' +
            '<div class="less arrow"></div>' +
            '<div class="quantity">1</div>' +
            '<div class="more arrow"></div>' +
            '</div>' +
            '<div class="order-product_price">' + productFields.price + '</div>' +
            '<div class="remove">' +
            '<svg viewBox="0 0 11 12"><path d="M2.5 12h6c.825 0 1.5-.58 1.5-1.286V3H1v7.714C1 11.42 1.675 12 2.5 12zm.667-1h4.666C8.475 11 9 10.55 9 10V3H2v7c0 .55.525 1 1.167 1zM8 1L7 0H4L3 1h5zM3 3h1v7H3V3zm2 0h1v7H5V3zm2 0h1v7H7V3zM0 1.5c0-.276.23-.5.5-.5h10c.276 0 .5.232.5.5V2H0v-.5z" fill-rule="evenodd"></path></svg>' +
            '</div></div>');

        $(".less").click(function () {
            var quant = $(this).parent().find(".quantity");
            if (quant.text() == 1) {
                return false;
            } else {
                quant.text(+quant.text() - 1);
            }
            cart['' + $(this).parent().parent().attr("id") + ''].quantity--;
            console.log(cart);
            totalCount();
        });

        $(".more").click(function () {
            var quant = $(this).parent().find(".quantity");
            quant.text(+quant.text() + 1);
            cart['' + $(this).parent().parent().attr("id") + ''].quantity++;
            console.log(cart);
            totalCount();
        });

            totalCount();


        }
    });

    $('#orderSend').click(function() {

        var order = '';
        $.each(cart, function (i,v) {
            order += v.title + ' (' + v.quantity + ')<br>'
        });

        var fields = {
            phone: $('#orderPhone').val(),
            name: $('#orderName').val(),
            order: order
        };

        var error = false;

        console.log(fields.phone);
        console.log(fields.name);

        if( fields.phone === '') {
            $('#orderPhone').addClass('error');
            error = true;
        }

        if( fields.name === '') {
            $('#orderName').addClass('error');
            error = true;
        }

        if (!error) {
            jQuery.ajax({
                url: '../order.php',
                data: fields,
                success: function (data) {
                    $("#orderFbox .succes").show();
                    $("#clientName").text(fields.name);
                }
            });
        }


    });

    $("#orderBuymore").click(function () {
        $.fancybox.close('all');
    });

    $(".menu-holder a, .footer-menu-holder a").click(function (e) {
        e.preventDefault();

        var target = $(this).attr("href");
        var body = $("html, body");
        $.fancybox.close('all');
        body.stop().animate({scrollTop: $(target).offset().top-70+'px'});

    })
});