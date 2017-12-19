
function handler(param) {

    //Меняем выпадающее меню, если оно выходит за пределы экрана
    function trasformSubMenuInCase() {
        var wrapperWidth = $(".wrapper").eq(0).outerWidth();
        var widthSide = ($(window).outerWidth() - 1000) / 2;
        var innerUlWidth;
        var ulLeft;
        $("nav.topmenu > ul > li > ul").each(function () {
            ulLeft = $(this).parent("li").offset().left;
            innerUlWidth = $(this).width();
            if ((ulLeft - widthSide + innerUlWidth) > wrapperWidth) {
                if ($(this).hasClass("ulRTL") == false) {
                    $(this).addClass("ulRTL");
                }
            }
        });
    }
    function getNewsSize() {
        $("#news_slider").css('height', $('#news_slider .news_wrapper > article').eq(0).outerHeight() + $('#news_slider .news_wrapper > article').eq(1).outerHeight());
        $("#news_slider .news_wrapper").css({ position: "relative" });
    }

    if (param == "transformSMIC") {
        trasformSubMenuInCase();
    }
    else if (param == "getNewsSize") {
        getNewsSize();
    }
    else {
        //Новостной слайдер
        getNewsSize();
        var current = 0;
        var top = 0;
        $(".nextNews").on('click', function () {
            if (current < $('#news_slider .news_wrapper > article').length - 2) {
                var currentHeight;
                currentHeight = $('#news_slider .news_wrapper > article').eq(current).outerHeight() + 1;
                top = top + currentHeight;
                $("#news_slider .news_wrapper").animate({ top: -top }, 500);
                current++;
            }
        });
        $(".prevNews").on('click', function () {
            if (current > 0) {
                var currentHeight;
                currentHeight = $('#news_slider .news_wrapper > article').eq(current - 1).outerHeight() + 1;
                top = top - currentHeight;
                $("#news_slider .news_wrapper").animate({ top: -top }, 500);
                current--;
            }
        });

        //Добавление стрелки вниз на пунктах меню
        $("nav.topmenu > ul > li").has("ul").children("a").after("<span class='hasUl'></span>");

        //Обрезка текста, выходящего за пределы блока
        $(".wordWrap, .desc p").each(function () {
            $(this).dotdotdot({
                ellipsis: '...',
                watch: 'window'
            });
        });

        //Меняем ширину обложки дочерних пунктов меню, если их количество <= 3
        $("nav.topmenu > ul > li > ul").each(function () {
            if ($(this).children("li").length <= 3) {
                $(this).addClass("ulLt3");
                $(this).children("li").addClass("liLt3");
            }
        });

        //Блоку auth присваиваем класс logged при авторизации
        $("a.logged").parent("div.auth").addClass("logged");

        if (window.innerWidth > 1000) {
            trasformSubMenuInCase();
        }
        if (getCookie("needMobile") == "false") {
            $("body").prepend('<div class="goMobile"><div class="wrapper"><span>Перейти на мобильную версию</span></div></div>');
            $(".goMobile span").click(function () {
                document.cookie = "needMobile=true; max-age=86400; path=/";
                location.reload(true);
            });
        }
    }
}