/**	
	* Template Name: IO
	* Version: 1.0	
	* Template Scripts
	* Author: Kan SEO
	* Author URI: http://www.khoaseo.com/

	Custom JS	
	
**/

jQuery(function ($) {

    $('.slide-main').slick({
        autoplay: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
    });

    $('.slide-partner').slick({
        centerMode: true,
        infinite: true,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
		{
		    breakpoint: 768,
		    settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '10px',
		        slidesToShow: 3
		    }
		},
		{
		    breakpoint: 480,
		    settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '10px',
		        slidesToShow: 2
		    }
		}
        ]
    });

    var height = window.innerHeight ? window.innerHeight : $(window).height(),
        heightH = $('.navbar-default').height(),
        heightB = $('.footer-home').height();

    $('#navbar-menu').on('show.bs.collapse', function () {
        $('.dropdown-search').animate({
            opacity: 0,
            right: '-50px'
        }, 'fast', 'linear', function () {

        });
        $(".full-nav").css("height", height - heightH);

    });
    //$('#wrap-middle').css('margin-top', heightH);
    //$('#main').css('margin-top', heightH);
    //$('#wrap-middle').css('height', height - heightH - heightB);

    //$(window).resize(function () {
    //    var height = window.innerHeight ? window.innerHeight : $(window).height(),
    //    heightH = $('.navbar-default').height(),
    //    heightB = $('.footer-home').height();
    //    $('#wrap-middle').css('margin-top', heightH);
    //    $('#main').css('margin-top', heightH);
    //    $('#wrap-middle').css('height', height - heightH - heightB);
    //});



    $('#navbar-menu').on('hide.bs.collapse', function () {
        $('.dropdown-search').animate({
            opacity: 1,
            right: '0'
        }, 'fast', 'linear', function () {

        });
    });

    $(".navbar-toggle").click(function () {
        if ($("#navbar-menu").hasClass("in")) {
            return $("body").removeClass("no-scroll");
        } else {
            return $("body").addClass("no-scroll");
        }

    });



    $('.form-group-radio input[type="radio"]:checked').closest('label').addClass('checked'); //Radio form chon bank
    $(document).on('click', '.form-group-radio input[type="radio"]', function () {
        if ($('.form-group-radio input[type="radio"]').is(':not(:checked)')) {
            $('.form-group-radio input[type="radio"]').parent('label').removeClass('checked');
        }
        if ($('.form-group-radio input[type="radio"]').is(':checked')) {
            $('.form-group-radio input[type="radio"]:checked').closest('label').addClass('checked');
        }
        $('.form-group-radio input[type="radio"]:checked').closest('.wrap').siblings('.wrap').find('.list-option-collapse').collapse('hide');
    });


    //$('.signup input[type="checkbox"]').click(function () {
    //    if ($(this).is(':checked')) {
    //        $('#Modal1').modal('show');
    //    } else {
    //        $('#Modal1').modal('hide');
    //    }
    //});

    //$('#Modal1').on('hidden.bs.modal', function (e) {
    //    $('.signup input[type="checkbox"]').prop('checked', false);
    //})

    $('.backlink').on("click", function () {
        $('.payment-method li').removeClass('active');
    });

    $(document).on("input", ".numeric", function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    $('.img-code').on('click', function () {
        $('.img-code').attr('src', '/ma-an-ninh?' + (new Date().getTime()));
    });
});


function shareFace() {
    var url = "https://www.facebook.com/sharer.php?u=" + window.location.href;
    window.open(url, '', 'location=1,status=1,scrollbars=1,width=650,height=450');
}
function shareGoogle() {
    var url = "https://plus.google.com/share?url=" + window.location.href;
    window.open(url, '', 'location=1,status=1,scrollbars=1,width=650,height=450');
}