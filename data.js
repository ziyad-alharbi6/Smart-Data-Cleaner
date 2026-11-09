
function validateExcel() {
    var file = document.getElementById("excelFile").value;
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var error = document.getElementById("errorMessage");
    var selected = false;

    if (file === "") {
        showError("Please select an Excel file.");
        return false;
    }

    if (!file.toLowerCase().endsWith(".xlsx") &&
        !file.toLowerCase().endsWith(".xls")) {
        showError("Only Excel files are allowed.");
        return false;
    }

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selected = true;
        }
    }

    if (selected === false) {
        showError("Please select at least one option.");
        return false;
    }

    
    var selectedOptions = [];

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedOptions.push(checkboxes[i].value);
        }
    }

    
    // Save selected issues
    sessionStorage.setItem(
        "selectedOptions",
        JSON.stringify(selectedOptions)
    );

    // Save Excel file name
    var fileName = document.getElementById("excelFile").files[0].name;
    sessionStorage.setItem("uploadedFileName", fileName);

    error.textContent = "";
    return true;


    error.textContent = "";
    return true;

}


function showError(message) {
    var error = document.getElementById("errorMessage");
    var isArabic = document.documentElement.lang === "ar";

    if (isArabic) {
        if (message === "Please select an Excel file.") {
            message = "الرجاء اختيار ملف Excel.";
        } else if (message === "Only Excel files are allowed.") {
            message = "يسمح فقط بملفات Excel.";
        } else if (message === "Please select at least one option.") {
            message = "الرجاء اختيار مشكلة واحدة على الأقل.";
        }
    }

    error.textContent = message;
    error.style.color = "red";
}


var uploadForm = document.getElementById("uploadForm");

if (uploadForm) {
    uploadForm.onsubmit = function(event) {
        if (validateExcel() === false) {
            event.preventDefault();
        }
    };
}


function toggleDetails() {
    var details = document.getElementById("detailsSection");
    var button = document.getElementById("detailsButton");
    var isArabic = document.documentElement.lang === "ar";

    if (details.style.display === "none") {
        details.style.display = "block";

        if (isArabic) {
            button.textContent = "إخفاء التفاصيل";
        } else {
            button.textContent = "Hide Details";
        }
    } else {
        details.style.display = "none";

        if (isArabic) {
            button.textContent = "إظهار التفاصيل";
        } else {
            button.textContent = "Show Details";
        }
    }
}

function cleanData() {
    var message = document.getElementById("statusMessage");
    var isArabic = document.documentElement.lang === "ar";

    if (isArabic) {
        message.textContent = "  لم يتم تعديل أي بيانات";
    } else {
        message.textContent = " No data has been changed";
    }

    message.style.color = "green";
}

function showSelectedIssues() {

    var saved = sessionStorage.getItem("selectedOptions");

    if (saved === null) {
        return;
    }

    var selectedOptions = JSON.parse(saved);

    var issues = ["missing", "duplicates", "formatting", "spaces"];

    for (var i = 0; i < issues.length; i++) {

        var row = document.getElementById("row-" + issues[i]);

        if (row) {
            if (selectedOptions.includes(issues[i])) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    }
}

if (document.getElementById("detailsSection")) {
    showSelectedIssues();
}
function showFileName() {
    var fileName = sessionStorage.getItem("uploadedFileName");
    var element = document.getElementById("fileName");

    if (element && fileName) {
        var isArabic = document.documentElement.lang === "ar";

        element.textContent = isArabic
            ? "اسم الملف: " + fileName
            : "File name: " + fileName;
    }
}

showFileName();



