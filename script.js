// ==========================================
// TELEGRAM MINI APP
// ==========================================

const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();

    document.body.classList.add("telegram");
}


// ==========================================
// ЭКРАНЫ
// ==========================================

const homeScreen =
    document.getElementById("homeScreen");

const clockScreen =
    document.getElementById("clockScreen");


// ==========================================
// ГЛАВНЫЕ КНОПКИ
// ==========================================

const gmailButton =
    document.getElementById("gmailButton");

const clockButton =
    document.getElementById("clockButton");

const thirdButton =
    document.getElementById("thirdButton");

const backButton =
    document.getElementById("backButton");


// ==========================================
// ПРИ ЗАПУСКЕ ПОКАЗЫВАЕМ ГЛАВНОЕ МЕНЮ
// ==========================================

homeScreen.classList.add("active");
clockScreen.classList.remove("active");


// ==========================================
// GMAIL — ВСЕГДА ОДНО И ТО ЖЕ ОКНО
// ==========================================

const gmailURL = "https://mail.google.com/";

gmailButton.addEventListener("click", () => {

    window.open(
        gmailURL,
        "gmailWindow"
    );

});

    // --------------------------------------
    // ЕСЛИ ОТКРЫТО В TELEGRAM
    // --------------------------------------

    if (
        tg &&
        typeof tg.openLink === "function"
    ) {

        tg.openLink(gmailURL);

        return;
    }


    // --------------------------------------
    // ЕСЛИ ОТКРЫТО В ОБЫЧНОМ БРАУЗЕРЕ
    // --------------------------------------

    // Если Gmail уже открыт —
    // просто переключаемся на это окно

    if (
        gmailWindow &&
        !gmailWindow.closed
    ) {

        gmailWindow.focus();

        return;
    }


    // Если Gmail ещё не открыт —
    // создаём окно

    gmailWindow = window.open(
        gmailURL,
        "gmailWindow"
    );

});


// ==========================================
// ОТКРЫТЬ МИРОВЫЕ ЧАСЫ
// ==========================================

clockButton.addEventListener("click", () => {

    homeScreen.classList.remove("active");

    clockScreen.classList.add("active");

    updateClock();

});


// ==========================================
// НАЗАД В ГЛАВНОЕ МЕНЮ
// ==========================================

backButton.addEventListener("click", () => {

    clockScreen.classList.remove("active");

    homeScreen.classList.add("active");

});


// ==========================================
// ТРЕТЬЯ КНОПКА
// ==========================================

thirdButton.addEventListener("click", () => {

    // Пока ничего не делает

});


// ==========================================
// ЭЛЕМЕНТЫ ЧАСОВ
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
// ГОРОДА
// ==========================================

const cities = {

    moscow: {

        title: "Москва",

        timezone: "Europe/Moscow"

    },


    petersburg: {

        title: "Санкт-Петербург",

        timezone: "Europe/Moscow"

    },


    valday: {

        title: "Валдай",

        timezone: "Europe/Moscow"

    },


    london: {

        title: "Лондон",

        timezone: "Europe/London"

    },


    milan: {

        title: "Милан",

        timezone: "Europe/Rome"

    }

};


// ==========================================
// ТЕКУЩИЙ ГОРОД
// ==========================================

let currentTimezone =
    "Europe/Moscow";

let currentCity =
    "Москва";


// ==========================================
// ОБНОВЛЕНИЕ ВРЕМЕНИ
// ==========================================

function updateClock() {

    const now = new Date();


    // ВРЕМЯ

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


    // ДАТА

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


    // НАЗВАНИЕ ГОРОДА

    cityTitle.textContent =
        currentCity;


    // ВРЕМЯ

    timeElement.classList.add(
        "update"
    );


    timeElement.textContent =
        time;


    // ДАТА

    dateElement.textContent =
        date.charAt(0).toUpperCase()
        +
        date.slice(1);


    // Убираем небольшую анимацию цифр

    setTimeout(() => {

        timeElement.classList.remove(
            "update"
        );

    }, 250);

}


// ==========================================
// КОРИЧНЕВАЯ АНИМАЦИЯ
// ==========================================

function animateTransition(button) {

    const rect =
        button.getBoundingClientRect();


    // Центр нажатой кнопки

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


    // Сбрасываем предыдущую анимацию

    transition.classList.remove(
        "active"
    );


    // Принудительный перезапуск CSS animation

    void transition.offsetWidth;


    // Запускаем

    transition.classList.add(
        "active"
    );

}


// ==========================================
// НАЖАТИЕ НА ГОРОД
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


            // --------------------------------
            // АКТИВНАЯ КНОПКА
            // --------------------------------

            cityButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            // --------------------------------
            // КОРИЧНЕВАЯ АНИМАЦИЯ
            // --------------------------------

            animateTransition(
                button
            );


            // --------------------------------
            // МЕНЯЕМ ГОРОД,
            // ПОКА ЭКРАН КОРИЧНЕВЫЙ
            // --------------------------------

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
// АВТООБНОВЛЕНИЕ КАЖДУЮ СЕКУНДУ
// ==========================================

setInterval(() => {

    // Обновляем только тогда,
    // когда пользователь находится
    // на экране часов

    if (
        clockScreen.classList.contains(
            "active"
        )
    ) {

        updateClock();

    }

}, 1000);


// ==========================================
// ПЕРВОЕ ОБНОВЛЕНИЕ
// ==========================================

updateClock();
