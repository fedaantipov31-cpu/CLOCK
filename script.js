// ==============================
// TELEGRAM
// ==============================

const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
    document.body.classList.add("telegram");
}


// ==============================
// ЭКРАНЫ
// ==============================

const homeScreen = document.getElementById("homeScreen");
const clockScreen = document.getElementById("clockScreen");

const gmailButton = document.getElementById("gmailButton");
const clockButton = document.getElementById("clockButton");
const thirdButton = document.getElementById("thirdButton");
const backButton = document.getElementById("backButton");


// При старте всегда показываем главное меню

homeScreen.classList.add("active");
clockScreen.classList.remove("active");


// ==============================
// GMAIL
// ==============================

gmailButton.addEventListener("click", () => {

    const gmailURL = "https://mail.google.com/";

    if (tg && typeof tg.openLink === "function") {
        tg.openLink(gmailURL);
    } else {
        window.open(gmailURL, "_blank", "noopener,noreferrer");
    }

});


// ==============================
// ОТКРЫТЬ ЧАСЫ
// ==============================

clockButton.addEventListener("click", () => {

    homeScreen.classList.remove("active");
    clockScreen.classList.add("active");

    updateClock();

});


// ==============================
// НАЗАД
// ==============================

backButton.addEventListener("click", () => {

    clockScreen.classList.remove("active");
    homeScreen.classList.add("active");

});


// ==============================
// ТРЕТЬЯ КНОПКА
// ==============================

thirdButton.addEventListener("click", () => {
    // Пока ничего не делает
});


// ==============================
// ЭЛЕМЕНТЫ ЧАСОВ
// ==============================

const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const cityTitle = document.getElementById("cityTitle");

const cityButtons = document.querySelectorAll(".city-btn");
const transition = document.getElementById("transition");


// ==============================
// ГОРОДА
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
// ОБНОВЛЕНИЕ ВРЕМЕНИ
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

    cityTitle.textContent = currentCity;
    timeElement.textContent = time;

    dateElement.textContent =
        date.charAt(0).toUpperCase() + date.slice(1);

}


// ==============================
// АНИМАЦИЯ
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
// ВЫБОР ГОРОДА
// ==============================

cityButtons.forEach(button => {

    button.addEventListener("click", () => {

        const city = cities[button.dataset.city];

        if (!city) return;

        cityButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        animateTransition(button);

        setTimeout(() => {

            currentTimezone = city.timezone;
            currentCity = city.title;

            updateClock();

        }, 1300);

    });

});


// ==============================
// АВТООБНОВЛЕНИЕ
// ==============================

setInterval(() => {

    if (clockScreen.classList.contains("active")) {
        updateClock();
    }

}, 1000);


// Подготовить время,
// но не открывать экран часов

updateClock();
