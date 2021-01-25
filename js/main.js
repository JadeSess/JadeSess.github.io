const helloWords = () => {
    let charPosition = 0;
    let wordPosition = 0;
    const greetings = ["¡Hola!", "안녕!", "What's Poppin?", "こんにちは。", "Howdy!", "Bonjour!", "Hi!"];
    const charSpeed = 150;
    const nextWordSpeed = 1500;

    let typeWriter =  () => {
        if (charPosition === 0) {
            $("#hello").html("");
        };

        if (charPosition < greetings[wordPosition].length) {
            const prev = $("#hello").html();
            const next = prev + greetings[wordPosition].charAt(charPosition);
            $("#hello").html(next);
            charPosition += 1;
            setTimeout(typeWriter, charSpeed);
        } else {
            charPosition = 0;
            wordPosition = (wordPosition + 1) === greetings.length ? 0 : wordPosition + 1;
            setTimeout(typeWriter, nextWordSpeed);
        }
    };
    typeWriter();
}

const isInView = section => {
    var elementTop = $(section).offset().top;
    var elementBottom = elementTop + $(section).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

const getActiveSection = dots => {
    for (let i = 0; i < dots.length; i++ ) {
        const section = Object.keys(dots[i])[0];
        if (isInView(section)) {
            return i
        }
    }
    return 0;
}

const updateSideMenu = () => {
    const dots = [{ "#landing": "#landing-dot" },
                    { "#about": "#about-dot" },
                    { "#skills": "#skills-dot" },
                    { "#projects": "#projects-dot" },
                    { "#art": "#art-dot" },
                    { "#speaking": "#speaking-dot" }];

    const activeSection = getActiveSection(dots);
    $(".side-menu-container").find(".active").removeClass("active");

    const key = Object.keys(dots[activeSection])[0];
    const dot = dots[activeSection][key];

    $(dot).addClass('active');
}

window.addEventListener("load", () => {
    $.get("/common/navbar.html", (data) => {
        $("#navbar").html(data);
    });
    $.get("/common/footer.html", (data) => {
        $("#footer").html(data);
    });

    $(document).ready(() => {
        $(".loading").delay(0).animate({ opacity: 0 }, 700);
        setTimeout(() => {
            $(".loading").addClass('d-none');
            $(".content").removeClass('d-none');

            $("#landing-left").delay(500).animate({ opacity: 1 }, 200);
            $("#landing-left").delay(0).animate({ "padding-left": "8%" }, 700);

            $("#landing-right").delay(1000).animate({ opacity: 1 }, 500);
            $(".side-menu-container").delay(1000).animate({ right: 20 }, 500);

            $(".content").delay(500).animate({ opacity: 1 }, 500);

            setTimeout(()=> {
                helloWords();
            }, 2000)
        }, 700)

        updateSideMenu();

        $('body').scroll(() => {
            if(window.location.pathname.includes("index.html") || window.location.pathname.length <= 1) {
                updateSideMenu();
            }
        });

        $('.scroll-down').click (() => {
            let new_height = $('#about').offset().top + $('#about').offset().top / 20;
            $('html, body').animate({scrollTop: new_height}, 'slow');
            return false;
        });
    });
});
