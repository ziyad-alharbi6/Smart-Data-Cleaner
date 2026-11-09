
function setText(id, english, arabic, isArabic) {
    var element = document.getElementById(id);

    if (element) {
        element.textContent = isArabic ? arabic : english;
    }
}

function changeLanguage() {
    var isArabic = document.documentElement.lang === "en";

    document.documentElement.lang = isArabic ? "ar" : "en";
    document.documentElement.dir = isArabic ? "rtl" : "ltr";

    setText("mainTitle", "Smart Data Cleaner", "منظف البيانات الذكي", isArabic);
    setText("subtitle", "Clean your data easily", "نظّف بياناتك بسهولة", isArabic);
    setText("languageButton", "العربية", "English", isArabic);

    setText("aboutLink", "About Project", "عن المشروع", isArabic);
    setText("loginLink", "Login", "تسجيل الدخول", isArabic);
    setText("uploadTitle", "Upload Your Dataset", "رفع ملف البيانات", isArabic);
    setText("fileLabel", "Select your Excel file:", "اختر ملف Excel:", isArabic);
    setText("checkTitle", "Choose what you want to check:", "اختر المشاكل التي تريد فحصها:", isArabic);
    setText("aboutTitle", "What is Smart Data Cleaner?", "ما هو منظف البيانات الذكي؟", isArabic);
    setText("aboutText",
        "Smart Data Cleaner is a web application that helps users detect common data quality problems in Excel files.",
        "منظف البيانات الذكي هو موقع يساعد المستخدمين على اكتشاف مشاكل جودة البيانات الشائعة في ملفات Excel.",
        isArabic);

    setText("homeLink", "Home", "الرئيسية", isArabic);
    setText("resultsTitle", "Analysis Results", "نتائج التحليل", isArabic);
var fileNameElement = document.getElementById("fileName");

if (fileNameElement) {
    var savedFileName = sessionStorage.getItem("uploadedFileName") || "test.xlsx";

    if (isArabic) {
        fileNameElement.textContent = "اسم الملف: " + savedFileName;
    } else {
        fileNameElement.textContent = "File name: " + savedFileName;
    }
}    setText("summaryTitle", "Dataset Summary", "ملخص البيانات", isArabic);
    
    var rowsLabel = document.getElementById("rowsLabel");
    var columnsLabel = document.getElementById("columnsLabel");

    if (rowsLabel && columnsLabel) {
        var rows = sessionStorage.getItem("totalRows") || "0";
        var columns = sessionStorage.getItem("totalColumns") || "0";

        rowsLabel.textContent =
            (isArabic ? "عدد الصفوف: " : "Total Rows: ") + rows;

        columnsLabel.textContent =
            (isArabic ? "عدد الأعمدة: " : "Total Columns: ") + columns;
    }

    setText("issuesTitle", "Issues Detected", "المشاكل المكتشفة", isArabic);
    setText("issueType", "Issue Type", "نوع المشكلة", isArabic);
    setText("countTitle", "Count", "العدد", isArabic);

    setText("missingLabel", "Missing Values", "القيم المفقودة", isArabic);
    setText("duplicateLabel", "Duplicate Rows", "الصفوف المكررة", isArabic);
    setText("formatLabel", "Formatting Issues", "مشاكل التنسيق", isArabic);
    setText("spacesLabel", "Extra Spaces", "المسافات الزائدة", isArabic);

    var analyzeButton = document.getElementById("analyzeButton");
    if (analyzeButton) {
        analyzeButton.value = isArabic ? "تحليل البيانات" : "Analyze Data";
    }

    var cleanButton = document.getElementById("cleanButton");
    if (cleanButton) {
        cleanButton.value = isArabic ? "تنظيف البيانات" : "Clean Data";
    }

    var details = document.getElementById("detailsSection");
    var detailsButton = document.getElementById("detailsButton");

    
    if (details && detailsButton) {
        if (details.style.display === "none") {
            detailsButton.textContent = isArabic ? "إظهار التفاصيل" : "Show Details";
        } else {
            detailsButton.textContent = isArabic ? "إخفاء التفاصيل" : "Hide Details";
        }
    }
    
    var statusMessage = document.getElementById("statusMessage");
    
    // Translate cleaning message when language changes
    var statusMessage = document.getElementById("statusMessage");

    if (statusMessage && statusMessage.dataset.cleaned === "yes") {
        var missing = statusMessage.dataset.missing;
        var duplicates = statusMessage.dataset.duplicates;
        var formatting = statusMessage.dataset.formatting;
        var spaces = statusMessage.dataset.spaces;

        if (isArabic) {
            statusMessage.textContent =
                "تم تجهيز الملف | الصفوف ذات القيم المفقودة المحذوفة: " +
                missing +
                " | الصفوف المكررة المحذوفة: " +
                duplicates +
                " | مشاكل نوع البيانات المعالجة: " +
                formatting +
                " | الخلايا التي تم تنظيف مسافاتها: " +
                spaces;
        } else {
            statusMessage.textContent =
                "File prepared | Missing rows removed: " +
                missing +
                " | Duplicates removed: " +
                duplicates +
                " | Type issues handled: " +
                formatting +
                " | Spaces cleaned: " +
                spaces;
        }
    }

    
    localStorage.setItem("siteLanguage", document.documentElement.lang);
}

window.addEventListener("DOMContentLoaded", function() {
    var savedLanguage = localStorage.getItem("siteLanguage");

    if (savedLanguage === "ar" &&
        document.documentElement.lang === "en") {
        changeLanguage();
    }
});

