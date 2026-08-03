// ==============================
// Telegram Mini App
// ==============================

const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();

    document.body.classList.add("telegram");
}

// ==============================
// Элементы
// ==============================

const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const cityTitle = document.getElementById("cityTitle");

const cityButtons = document.querySelectorAll(".city-btn");
const transition = document.getElementById("transition");

// ==============================
// Города
// ==============================

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

let currentTimezone = "Europe/Moscow";
let currentCity = "Москва";

// ==============================
// Обновление времени
// ==============================

function updateClock() {

    const now = new Date();

    const time = now.toLocaleTimeString("ru-RU", {

        timeZone: currentTimezone,

        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"

    });

    const date = now.toLocaleDateString("ru-RU", {

        timeZone: currentTimezone,

        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"

    });

    timeElement.classList.add("update");

    timeElement.textContent = time;

    dateElement.textContent =
        date.charAt(0).toUpperCase() + date.slice(1);

    cityTitle.textContent = currentCity;

    setTimeout(() => {

        timeElement.classList.remove("update");

    }, 250);

}

// ==============================
// Анимация переключения
// ==============================

function animateTransition(button) {

    const rect = button.getBoundingClientRect();

    transition.style.left =
        rect.left + rect.width / 2 + "px";

    transition.style.top =
        rect.top + rect.height / 2 + "px";

    transition.classList.remove("active");

    void transition.offsetWidth;

    transition.classList.add("active");

}

// ==============================
// Выбор города
// ==============================

cityButtons.forEach(button => {

    button.addEventListener("click", () => {

        cityButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const city = cities[button.dataset.city];

        currentTimezone = city.timezone;
        currentCity = city.title;

        animateTransition(button);

        setTimeout(() => {

            updateClock();

        }, 220);

    });

});

// ==============================
// Первый запуск
// ==============================

updateClock();

// ==============================
// Автообновление
// ==============================

setInterval(updateClock, 1000);
