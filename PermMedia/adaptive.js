
function adaptive() {
    var width;
    var isDomChanged = false;
    var iconActive = 0;
    var authText;
    var authTextDeleted = false;
    var isSectionMoved = false;
    var isSelected600 = false;
    function openE() {
        $(".address, .phone, .email").addClass("hide").removeAttr("style");
        switch (iconActive) {
            case 0: $(".address").removeClass("hide"); break;
            case 1: $(".phone").removeClass("hide"); break;
            case 2: $(".email").removeClass("hide"); break;
            default:
                break;
        }
    }
    function adaptMethod() {
        width = window.innerWidth;
        if (width <= 1000 && !isDomChanged) {
            $("nav.topmenu > ul").removeClass("wrapper");
            $("nav.topmenu").addClass("wrapper");
            $("body .layout_1 > header").prepend("<div class='show_full'><p>Полная версия сайта</p></div>");
            $("nav.topmenu").prepend("<div class='menu_btn'>Меню</div>");
            $("nav.topmenu").append(
                "<div class='mob_btns'><div class='mob_addr'></div><div class='mob_phone'></div><div class='mob_email'></div></div>"
                );
            $(".address").after($("<p class='email'></p>"));
            $(".email").append($(".address > a"));
            
            openE();
            $(".mob_btns > div").eq(iconActive).addClass("hover");
            $(".mob_btns > div").hover(function () {
                $(".mob_btns > div").removeClass("hover");
                $(this).addClass("hover");
            }, function () {
                $(this).removeClass("hover");
                $(".mob_btns > div").eq(iconActive).addClass("hover");
            });
            $(".mob_btns > div").on('click', function () {
                $(".mob_btns > div").removeClass("hover");
                iconActive = $(this).index();
                openE();
                $(this).addClass("hover");
            });
            $("span.hasUl").on('click', function () {
                if ($(this).hasClass("alreadyClicked") == false) {
                    $(this).addClass("alreadyClicked");
                    $(this).addClass("rotate");
                }
                else {
                    if ($(this).parent("li").children("ul").hasClass("hide")) {
                        $(this).parent("li").children("ul").removeClass("hide");
                        $(this).addClass("rotate");
                    }
                    else {
                        $(this).parent("li").children("ul").addClass("hide");
                        $(this).removeClass("rotate");
                    }
                }
            });
            $(".show_full p").on('click', function () {
                document.cookie = "needMobile=false; max-age=86400; path=/";
                location.reload(true);
            });
            $(".menu_btn").on('click', function () {
                $("nav.topmenu > ul").slideToggle(200);
            });
            isDomChanged = true;
        }
        if (width <= 700 && !isSectionMoved) {
            $("main").prepend($("main > .main"));
            isSectionMoved = true;
        }
        if (width > 700 && isSectionMoved) {
            $("main").prepend($("main > aside"));
            isSectionMoved = false;
        }
        if (width <= 600 && !isSelected600) {
            $(".middle_side").after($(".right_side"));
            isSelected600 = true;
        }
        if (width > 600 && isSelected600) {
            $(".middle_side").before($(".right_side"));
            isSelected600 = false;
        }
        if (width <= 320 && !authTextDeleted && !$(".auth > a").eq(0).hasClass("logged")) {
            authText = $(".auth > a").text();
            $(".auth > a").text("");
            $("body .layout_1 > header, .auth, .auth a").addClass("logOut");
            authTextDeleted = true;
        }
        if (width > 320 && authTextDeleted && !$(".auth > a").eq(0).hasClass("logged")) {
            $(".auth > a").text(authText);
            $("body .layout_1 > header, .auth, .auth a").removeClass("logOut");
            authTextDeleted = false;
        }
        //Приводим код в исходное состояние
        if (width > 1000 && isDomChanged) {
            $("nav.topmenu").removeClass("wrapper");
            $("nav.topmenu > ul").addClass("wrapper");
            $("span.hasUl").off('click');
            $("nav.topmenu > ul").removeAttr("style");
            $(".menu_btn").off('click');
            $(".show_full p").off('click');
            $(".show_full").remove();
            $(".menu_btn").remove();
            $(".mob_btns").remove();
            $(".address, .phone, .email").removeClass("hide");
            $(".address").append($(".email > a"));
            $(".email").remove();
            handler("transformSMIC");
            isDomChanged = false;
        }
    }

    adaptMethod();
    $(window).resize(function () {
        adaptMethod();
        handler("getNewsSize");
    });
    window.onbeforeunload = function () {    }
    
}