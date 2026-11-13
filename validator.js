function isArabicPage() {
    return document.documentElement.lang === "ar";
}

function message(english, arabic) {
    if (isArabicPage()) {
        return arabic;
    }
    return english;
}

function showWarning(fieldId, messageId, text) {
    var field = document.getElementById(fieldId);
    var box = document.getElementById(messageId);

    if (field) {
        field.style.border = "2px solid red";
    }

    if (box) {
        box.innerHTML = text;
        box.style.display = "block";
        box.style.color = "red";
    }
}

function showValid(fieldId, messageId) {
    var field = document.getElementById(fieldId);
    var box = document.getElementById(messageId);

    if (field) {
        field.style.border = "2px solid green";
    }

    if (box) {
        box.innerHTML = "";
        box.style.display = "none";
    }
}

function clearWarning(fieldId, messageId) {
    var field = document.getElementById(fieldId);
    var box = document.getElementById(messageId);

    if (field) {
        field.style.border = "";
    }

    if (box) {
        box.innerHTML = "";
        box.style.display = "none";
    }
}

function isEmpty(value) {
    if (value === "") {
        return true;
    }
    return false;
}

function isValidEmail(email) {
    var at = email.indexOf("@");
    var dot = email.lastIndexOf(".");

    if (at < 1) {
        return false;
    }

    if (at !== email.lastIndexOf("@")) {
        return false;
    }

    if (email.indexOf(" ") !== -1) {
        return false;
    }

    if (dot < at + 2) {
        return false;
    }

    if (dot === email.length - 1) {
        return false;
    }

    return true;
}

function isValidPassword(password) {
    if (password.length < 6) {
        return false;
    }
    return true;
}

function checkEmailField(fieldId, messageId) {
    var value = document.getElementById(fieldId).value;

    if (isEmpty(value)) {
        showWarning(fieldId, messageId,
            message("Please enter your email.",
                    "يرجى إدخال بريدك الإلكتروني."));
    } else if (!isValidEmail(value)) {
        showWarning(fieldId, messageId,
            message("Please enter a valid email, like name@example.com",
                    "يرجى إدخال بريد إلكتروني صحيح، مثل name@example.com"));
    } else {
        showValid(fieldId, messageId);
    }
}

function checkPasswordField(fieldId, messageId) {
    var value = document.getElementById(fieldId).value;

    if (isEmpty(value)) {
        showWarning(fieldId, messageId,
            message("Please enter your password.",
                    "يرجى إدخال كلمة المرور."));
    } else if (!isValidPassword(value)) {
        showWarning(fieldId, messageId,
            message("Password must be at least 6 characters.",
                    "يجب أن تكون كلمة المرور 6 أحرف على الأقل."));
    } else {
        showValid(fieldId, messageId);
    }
}

function checkNameField(fieldId, messageId) {
    var value = document.getElementById(fieldId).value;

    if (isEmpty(value)) {
        showWarning(fieldId, messageId,
            message("Please enter your full name.",
                    "يرجى إدخال اسمك الكامل."));
    } else if (value.length < 3) {
        showWarning(fieldId, messageId,
            message("Name must be at least 3 characters.",
                    "يجب أن يكون الاسم 3 أحرف على الأقل."));
    } else {
        showValid(fieldId, messageId);
    }
}

function checkConfirmField(fieldId, messageId) {
    var password = document.getElementById("password").value;
    var confirm = document.getElementById(fieldId).value;

    if (isEmpty(confirm)) {
        showWarning(fieldId, messageId,
            message("Please confirm your password.",
                    "يرجى تأكيد كلمة المرور."));
    } else if (confirm !== password) {
        showWarning(fieldId, messageId,
            message("Passwords do not match.",
                    "كلمتا المرور غير متطابقتين."));
    } else {
        showValid(fieldId, messageId);
    }
}

function refreshOne(fieldId, messageId, checker) {
    var box = document.getElementById(messageId);

    if (box && box.innerHTML !== "") {
        checker(fieldId, messageId);
    }
}

function refreshWarnings() {
    refreshOne("email", "emailError", checkEmailField);
    refreshOne("password", "passwordError", checkPasswordField);
    refreshOne("name", "nameError", checkNameField);
    refreshOne("confirmPassword", "confirmError", checkConfirmField);
}

function validateLogin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var ok = true;

    clearWarning("email", "emailError");
    clearWarning("password", "passwordError");

    if (isEmpty(email)) {
        showWarning("email", "emailError",
            message("Please enter your email.",
                    "يرجى إدخال بريدك الإلكتروني."));
        ok = false;
    } else if (!isValidEmail(email)) {
        showWarning("email", "emailError",
            message("Please enter a valid email, like name@example.com",
                    "يرجى إدخال بريد إلكتروني صحيح، مثل name@example.com"));
        ok = false;
    } else {
        showValid("email", "emailError");
    }

    if (isEmpty(password)) {
        showWarning("password", "passwordError",
            message("Please enter your password.",
                    "يرجى إدخال كلمة المرور."));
        ok = false;
    } else {
        showValid("password", "passwordError");
    }

    if (ok === false) {
        return false;
    }

    alert(message("Login successful!", "تم تسجيل الدخول بنجاح!"));

    if (typeof setLoggedIn === "function") {
        setLoggedIn(email);
    }

    window.location.href = "index.html";
    return true;
}

function validateSignup() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirm = document.getElementById("confirmPassword").value;
    var ok = true;

    clearWarning("name", "nameError");
    clearWarning("email", "emailError");
    clearWarning("password", "passwordError");
    clearWarning("confirmPassword", "confirmError");

    if (isEmpty(name)) {
        showWarning("name", "nameError",
            message("Please enter your full name.",
                    "يرجى إدخال اسمك الكامل."));
        ok = false;
    } else if (name.length < 3) {
        showWarning("name", "nameError",
            message("Name must be at least 3 characters.",
                    "يجب أن يكون الاسم 3 أحرف على الأقل."));
        ok = false;
    } else {
        showValid("name", "nameError");
    }

    if (isEmpty(email)) {
        showWarning("email", "emailError",
            message("Please enter your email.",
                    "يرجى إدخال بريدك الإلكتروني."));
        ok = false;
    } else if (!isValidEmail(email)) {
        showWarning("email", "emailError",
            message("Please enter a valid email, like name@example.com",
                    "يرجى إدخال بريد إلكتروني صحيح، مثل name@example.com"));
        ok = false;
    } else {
        showValid("email", "emailError");
    }

    if (isEmpty(password)) {
        showWarning("password", "passwordError",
            message("Please enter a password.",
                    "يرجى إدخال كلمة المرور."));
        ok = false;
    } else if (!isValidPassword(password)) {
        showWarning("password", "passwordError",
            message("Password must be at least 6 characters.",
                    "يجب أن تكون كلمة المرور 6 أحرف على الأقل."));
        ok = false;
    } else {
        showValid("password", "passwordError");
    }

    if (isEmpty(confirm)) {
        showWarning("confirmPassword", "confirmError",
            message("Please confirm your password.",
                    "يرجى تأكيد كلمة المرور."));
        ok = false;
    } else if (confirm !== password) {
        showWarning("confirmPassword", "confirmError",
            message("Passwords do not match.",
                    "كلمتا المرور غير متطابقتين."));
        ok = false;
    } else {
        showValid("confirmPassword", "confirmError");
    }

    if (ok === false) {
        return false;
    }

    alert(message("Account created successfully!",
                  "تم إنشاء الحساب بنجاح!"));

    if (typeof setLoggedIn === "function") {
        setLoggedIn(name);
    }

    window.location.href = "index.html";
    return true;
}
