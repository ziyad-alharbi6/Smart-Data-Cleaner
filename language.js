
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
    setText("rowsLabel", "Total Rows: 1000", "عدد الصفوف: 1000", isArabic);
    setText("columnsLabel", "Total Columns: 8", "عدد الأعمدة: 8", isArabic);
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

    if (statusMessage && statusMessage.textContent !== "") {
        if (isArabic) {
            statusMessage.textContent =
                " لم يتم تعديل أي بيانات";
        } else {
            statusMessage.textContent =
                " No data has been changed";
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

