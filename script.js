// ==========================================
// TELEGRAM
// ==========================================

const tg = window.Telegram?.WebApp;

if (tg) {

    tg.ready();

    tg.expand();

    document.body.classList.add("telegram");
}


// ==========================================
// SCREENS
// ==========================================

const homeScreen =
    document.getElementById("homeScreen");

const clockScreen =
    document.getElementById("clockScreen");


const gmailButton =
    document.getElementById("gmailButton");

const clockButton =
    document.getElementById("clockButton");

const thirdButton =
    document.getElementById("thirdButton");

const backButton =
    document.getElementById("backButton");


// ==========================================
// GMAIL
// ==========================================

gmailButton.addEventListener("click", () => {

    const gmailURL =
        "https://mail.google.com/";

    // Если сайт открыт внутри Telegram
    if (tg && typeof tg.openLink === "function") {

        tg.openLink(gmailURL);

    } else {

        // Обычный браузер
        window.open(
            gmailURL,
            "_blank",
            "noopener,noreferrer"
        );
    }

});


// ==========================================
// OPEN CLOCK
// ==========================================

clockButton.addEventListener("click", () => {

    homeScreen.classList.remove("active");

    clockScreen.classList.add("active");

    updateClock();

});


// ==========================================
// BACK
// ==========================================

backButton.addEventListener("click", () => {

    clockScreen.classList.remove("active");

    homeScreen.classList.add("active");

});


// ==========================================
// THIRD BUTTON
// Пока ничего не делает
// ==========================================

thirdButton.addEventListener("click", () => {

    // Намеренно пусто

});


// ==========================================
// CLOCK
// ==========================================

const timeElement =
    document.getElementById("time");

const dateElement =
    document.getElementById("date");

const cityTitle =
    document.getElementById("cityTitle");

const cityButtons =
    document.querySelectorAll(".city-btn");

const transition =
    document.getElementById("transition");


// ==========================================
// CITIES
// ==========================================

const cities = {

    moscow: {

        title: "Москва",

        timezone:
            "Europe/Moscow"

    },

    petersburg: {

        title:
            "Санкт-Петербург",

        timezone:
            "Europe/Moscow"

    },

    valday: {

        title: "Валдай",

        timezone:
            "Europe/Moscow"

    },

    london: {

        title: "Лондон",

        timezone:
            "Europe/London"

    },

    milan: {

        title: "Милан",

        timezone:
            "Europe/Rome"

    }

};


// ==========================================
// CURRENT CITY
// ==========================================

let currentTimezone =
    "Europe/Moscow";

let currentCity =
    "Москва";


// ==========================================
// UPDATE TIME
// ==========================================

function updateClock() {

    const now =
        new Date();


    const time =
        now.toLocaleTimeString(
            "ru-RU",
            {

                timeZone:
                    currentTimezone,

                hour:
                    "2-digit",

                minute:
                    "2-digit",

                second:
                    "2-digit"

            }
        );


    const date =
        now.toLocaleDateString(
            "ru-RU",
            {

                timeZone:
                    currentTimezone,

                weekday:
                    "long",

                year:
                    "numeric",

                month:
                    "long",

                day:
                    "numeric"

            }
        );


    cityTitle.textContent =
        currentCity;


    timeElement.textContent =
        time;


    dateElement.textContent =
        date.charAt(0).toUpperCase()
        +
        date.slice(1);

}


// ==========================================
// TRANSITION
// ==========================================

function animateTransition(button) {

    const rect =
        button.getBoundingClientRect();


    transition.style.left =
        rect.left
        +
        rect.width / 2
        +
        "px";


    transition.style.top =
        rect.top
        +
        rect.height / 2
        +
        "px";


    transition.classList.remove(
        "active"
    );


    void transition.offsetWidth;


    transition.classList.add(
        "active"
    );

}


// ==========================================
// CITY CLICK
// ==========================================

cityButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {


            const city =
                cities[
                    button.dataset.city
                ];


            if (!city) {
                return;
            }


            cityButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            animateTransition(
                button
            );


            // Пока экран коричневый,
            // меняем город

            setTimeout(() => {

                currentTimezone =
                    city.timezone;

                currentCity =
                    city.title;

                updateClock();

            }, 1300);

        }
    );

});


// ==========================================
// EVERY SECOND
// ==========================================

setInterval(() => {

    if (
        clockScreen.classList.contains(
            "active"
        )
    ) {

        updateClock();

    }

}, 1000);


// Первоначальное время

updateClock();
