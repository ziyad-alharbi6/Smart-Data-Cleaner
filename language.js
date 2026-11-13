
function setText(id, english, arabic, isArabic) {
    var element = document.getElementById(id);

    if (element) {
        element.textContent = isArabic ? arabic : english;
    }
}

function setLanguage(lang) {
    var isArabic = lang === "ar";

    document.documentElement.lang = isArabic ? "ar" : "en";
    document.documentElement.dir = isArabic ? "rtl" : "ltr";

    var select = document.getElementById("languageSelect");
    if (select) {
        select.value = isArabic ? "ar" : "en";
    }

    setText("mainTitle", "Smart Data Cleaner", "منظف البيانات الذكي", isArabic);
    setText("subtitle", "Clean your data easily", "نظّف بياناتك بسهولة", isArabic);

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

    setText("loginTitle", "Login", "تسجيل الدخول", isArabic);
    setText("signupTitle", "Create Account", "إنشاء حساب جديد", isArabic);
    setText("emailLabel", "Email:", "البريد الإلكتروني:", isArabic);
    setText("passwordLabel", "Password:", "كلمة المرور:", isArabic);
    setText("nameLabel", "Full Name:", "الاسم الكامل:", isArabic);
    setText("confirmLabel", "Confirm Password:", "تأكيد كلمة المرور:", isArabic);
    setText("signupLoginLink", "Login", "تسجيل الدخول", isArabic);
    setText("noAccountText", "Don't have an account?", "ليس لديك حساب؟", isArabic);
    setText("haveAccountText", "Already have an account?", "لديك حساب بالفعل؟", isArabic);
    setText("signupLink", "Sign Up", "إنشاء حساب", isArabic);
    setText("aboutPageLink", "About Us", "من نحن", isArabic);

    setText("aboutPageTitle", "About Us", "من نحن", isArabic);
    setText("featuresTitle", "Features", "مميزات المشروع", isArabic);
    setText("aboutPara1",
        "Smart Data Cleaner is a student project designed to help users identify common problems in Excel files.",
        "Smart Data Cleaner هو مشروع جامعي يهدف إلى مساعدة المستخدمين على اكتشاف المشاكل الشائعة في ملفات Excel.",
        isArabic);
    setText("aboutPara2",
        "The website focuses on missing values, duplicate rows, formatting issues, and extra spaces.",
        "يركز المشروع على اكتشاف القيم المفقودة، والصفوف المكررة، ومشاكل التنسيق، والمسافات الزائدة.",
        isArabic);
    setText("aboutPara3",
        "Our goal is to make data cleaning easier and more understandable.",
        "هدفنا هو تسهيل عملية تنظيف البيانات وجعلها أكثر وضوحًا للمستخدم.",
        isArabic);
    setText("feature1", "Detect missing values", "اكتشاف القيم المفقودة", isArabic);
    setText("feature2", "Find duplicate rows", "العثور على الصفوف المكررة", isArabic);
    setText("feature3", "Identify formatting issues", "تحديد مشاكل التنسيق", isArabic);
    setText("feature4", "Detect extra spaces", "اكتشاف المسافات الزائدة", isArabic);

    setText("aboutExtra",
        "This project was built for the CPIS 358 course using HTML, CSS and JavaScript. The cleaning logic runs entirely in the browser, so the uploaded file never leaves the user's computer.",
        "تم بناء هذا المشروع لمقرر CPIS 358 باستخدام HTML و CSS و JavaScript. تعمل عملية التنظيف بالكامل داخل المتصفح، لذلك لا يغادر الملف المرفوع جهاز المستخدم.",
        isArabic);

    var loginButton = document.getElementById("loginButton");
    if (loginButton) {
        loginButton.value = isArabic ? "تسجيل الدخول" : "Login";
    }

    var signupButton = document.getElementById("signupButton");
    if (signupButton) {
        signupButton.value = isArabic ? "إنشاء حساب" : "Sign Up";
    }

    var emailInput = document.getElementById("email");
    if (emailInput) {
        emailInput.placeholder = isArabic ? "أدخل بريدك الإلكتروني" : "Enter your email";
    }

    var passwordInput = document.getElementById("password");
    if (passwordInput) {
        passwordInput.placeholder = isArabic ? "أدخل كلمة المرور" : "Enter your password";
    }

    var confirmInput = document.getElementById("confirmPassword");
    if (confirmInput) {
        confirmInput.placeholder = isArabic ? "أعد إدخال كلمة المرور" : "Re-enter your password";
    }

    if (document.getElementById("loginTitle")) {
        document.title = isArabic ? "تسجيل الدخول - منظف البيانات الذكي" : "Login - Smart Data Cleaner";
    }

    if (document.getElementById("signupTitle")) {
        document.title = isArabic ? "إنشاء حساب - منظف البيانات الذكي" : "Sign Up - Smart Data Cleaner";
    }

    if (document.getElementById("aboutPageTitle")) {
        document.title = isArabic ? "من نحن - منظف البيانات الذكي" : "About Us - Smart Data Cleaner";
    }

    if (typeof refreshWarnings === "function") {
        refreshWarnings();
    }

    if (typeof updateAboutToggle === "function") {
        updateAboutToggle();
    }

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

    
    sessionStorage.setItem("siteLanguage", document.documentElement.lang);
}

function changeLanguage() {
    if (document.documentElement.lang === "ar") {
        setLanguage("en");
    } else {
        setLanguage("ar");
    }
}

function changeLanguageFromSelect() {
    var select = document.getElementById("languageSelect");

    if (select) {
        setLanguage(select.value);
    }
}

function applySavedLanguage() {
    var savedLanguage = sessionStorage.getItem("siteLanguage");

    if (savedLanguage === "ar" &&
        document.documentElement.lang === "en") {
        setLanguage("ar");
    }

    localStorage.removeItem("siteLanguage");
}

window.addEventListener("DOMContentLoaded", applySavedLanguage);
window.addEventListener("pageshow", applySavedLanguage);

