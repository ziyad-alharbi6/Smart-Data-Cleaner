function isAboutExtraShowing() {
    var extra = document.getElementById("aboutExtra");

    if (extra) {
        return extra.dataset.showing === "yes";
    }

    return false;
}

function updateAboutToggle() {
    var extra = document.getElementById("aboutExtra");
    var button = document.getElementById("aboutToggleButton");
    var isArabic = document.documentElement.lang === "ar";

    if (extra) {
        if (extra.dataset.showing === "yes") {
            extra.style.display = "block";
        } else {
            extra.style.display = "none";
        }
    }

    if (button) {
        if (isAboutExtraShowing()) {
            button.value = isArabic ? "إظهار أقل" : "Show Less";
        } else {
            button.value = isArabic ? "إظهار المزيد" : "Show More";
        }
    }
}

function toggleAboutText() {
    var extra = document.getElementById("aboutExtra");

    if (!extra) {
        return;
    }

    if (extra.dataset.showing === "yes") {
        extra.dataset.showing = "no";
    } else {
        extra.dataset.showing = "yes";
    }

    updateAboutToggle();
}

window.addEventListener("DOMContentLoaded", updateAboutToggle);
