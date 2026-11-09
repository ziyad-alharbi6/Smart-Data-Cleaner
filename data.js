
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

    
    sessionStorage.setItem(
        "selectedOptions",
        JSON.stringify(selectedOptions)
    );

    var fileName = document.getElementById("excelFile").files[0].name;
    sessionStorage.setItem("uploadedFileName", fileName);

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
    uploadForm.onsubmit = async function(event) {
        event.preventDefault();

        if (validateExcel() === false) {
            return;
        }

        await readExcelFile();

        if (sessionStorage.getItem("totalRows") !== null) {
            window.location.href = "results.html";
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

    if (typeof XLSX === "undefined") {
        message.textContent = isArabic
            ? "تعذر تحميل مكتبة Excel."
            : "Excel library could not be loaded.";
        message.style.color = "red";
        return;
    }

    var savedData = sessionStorage.getItem("excelRows");
    var savedOptions = sessionStorage.getItem("selectedOptions");

    if (!savedData || !savedOptions) {
        message.textContent = isArabic
            ? "لا توجد بيانات لتنظيفها."
            : "No data available for cleaning.";
        message.style.color = "red";
        return;
    }

    try {
        var rows = JSON.parse(savedData);
        var options = JSON.parse(savedOptions);

        var cleanedRows = [];

        for (var i = 0; i < rows.length; i++) {
            cleanedRows.push(rows[i].slice());
        }

        var spacesCleaned = 0;
        var formattingFixed = 0;
        var missingRemoved = 0;
        var duplicatesRemoved = 0;

        if (options.includes("spaces")) {
            for (var i = 1; i < cleanedRows.length; i++) {
                for (var j = 0; j < cleanedRows[i].length; j++) {
                    var cell = cleanedRows[i][j];

                    if (typeof cell === "string") {
                        var newCell = cell.trim();

                        if (cell !== newCell) {
                            cleanedRows[i][j] = newCell;
                            spacesCleaned++;
                        }
                    }
                }
            }
        }

        if (options.includes("formatting")) {
            var totalColumns = cleanedRows[0].length;

            for (var j = 0; j < totalColumns; j++) {
                var numberCount = 0;
                var textCount = 0;

                for (var i = 1; i < cleanedRows.length; i++) {
                    var cell = cleanedRows[i][j];

                    if (cell !== "" && cell != null) {
                        if (typeof cell === "number") {
                            numberCount++;
                        } else if (typeof cell === "string") {
                            textCount++;
                        }
                    }
                }

                for (var i = 1; i < cleanedRows.length; i++) {
                    var cell = cleanedRows[i][j];

                    if (cell === "" || cell == null) {
                        continue;
                    }

                    // Numeric column: replace invalid text with blank
                    if (numberCount > textCount &&
                        typeof cell === "string") {

                        var converted = Number(cell);

                        cleanedRows[i][j] =
                            cell.trim() !== "" &&
                            Number.isFinite(converted)
                            ? converted : "";

                        formattingFixed++;
                    }

                    else if (textCount > numberCount &&
                             typeof cell === "number") {
                        cleanedRows[i][j] = String(cell);
                        formattingFixed++;
                    }
                }
            }
        }

        if (options.includes("missing")) {
            var withoutMissing = [];
            withoutMissing.push(cleanedRows[0]);

            var totalColumns = cleanedRows[0].length;

            for (var i = 1; i < cleanedRows.length; i++) {
                var hasMissing = false;

                for (var j = 0; j < totalColumns; j++) {
                    var cell = cleanedRows[i][j];

                    if (cell === "" || cell === null ||
                        cell === undefined) {
                        hasMissing = true;
                        break;
                    }
                }

                if (hasMissing) {
                    missingRemoved++;
                } else {
                    withoutMissing.push(cleanedRows[i]);
                }
            }

            cleanedRows = withoutMissing;
        }

        if (options.includes("duplicates")) {
            var uniqueRows = [];
            uniqueRows.push(cleanedRows[0]);

            var seen = new Set();

            for (var i = 1; i < cleanedRows.length; i++) {
                var rowKey = JSON.stringify(cleanedRows[i]);

                if (seen.has(rowKey)) {
                    duplicatesRemoved++;
                } else {
                    seen.add(rowKey);
                    uniqueRows.push(cleanedRows[i]);
                }
            }

            cleanedRows = uniqueRows;
        }

        var worksheet = XLSX.utils.aoa_to_sheet(cleanedRows);
        var workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook, worksheet, "Cleaned Data"
        );

        var originalName =
            sessionStorage.getItem("uploadedFileName") || "data.xlsx";

        var newFileName =
            "cleaned_" +
            originalName.replace(/\.(xlsx|xls)$/i, "") +
            ".xlsx";

        XLSX.writeFile(workbook, newFileName);

        
        if (isArabic) {
            message.textContent =
                "تم تجهيز الملف | الصفوف ذات القيم المفقودة المحذوفة: " +
                missingRemoved +
                " | الصفوف المكررة المحذوفة: " +
                duplicatesRemoved +
                " | مشاكل نوع البيانات المعالجة: " +
                formattingFixed +
                " | الخلايا التي تم تنظيف مسافاتها: " +
                spacesCleaned;
        } else {
            message.textContent =
                "File prepared | Missing rows removed: " +
                missingRemoved +
                " | Duplicates removed: " +
                duplicatesRemoved +
                " | Type issues handled: " +
                formattingFixed +
                " | Spaces cleaned: " +
                spacesCleaned;
        }
        
        // Save cleaning numbers for language switching
        message.dataset.cleaned = "yes";
        message.dataset.missing = missingRemoved;
        message.dataset.duplicates = duplicatesRemoved;
        message.dataset.formatting = formattingFixed;
        message.dataset.spaces = spacesCleaned;


        message.style.color = "green";



    } catch (error) {
        message.textContent = isArabic
            ? "حدث خطأ أثناء تنظيف الملف."
            : "An error occurred while cleaning the file.";

        message.style.color = "red";
        console.error(error);
    }
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

async function readExcelFile() {
    sessionStorage.removeItem("totalRows");
    var fileInput = document.getElementById("excelFile");

    if (!fileInput || !fileInput.files.length) {
        return;
    }

    if (typeof XLSX === "undefined") {
        showError("Excel library could not be loaded.");
        return;
    }

    try {
        var file = fileInput.files[0];
        var fileData = await file.arrayBuffer();

        var workbook = XLSX.read(fileData, { type: "array" });

        var firstSheet = workbook.Sheets[workbook.SheetNames[0]];

        var rows = XLSX.utils.sheet_to_json(firstSheet, {
            header: 1,
            defval: ""
        });
        
        sessionStorage.setItem(
            "excelRows",
            JSON.stringify(rows)
        );

        
console.log("Excel Data:", rows);
console.log("First 7 Rows:", rows.slice(0, 7));


        var totalRows = Math.max(rows.length - 1, 0);
        var totalColumns = 0;

        for (var i = 0; i < rows.length; i++) {
            if (rows[i].length > totalColumns) {
                totalColumns = rows[i].length;
            }
        }

        sessionStorage.setItem("totalRows", totalRows);
        sessionStorage.setItem("totalColumns", totalColumns);
        
        // Count missing values
        var missingValues = 0;

        for (var i = 1; i < rows.length; i++) {
            for (var j = 0; j < totalColumns; j++) {

                if (rows[i][j] === "" ||
                    rows[i][j] === null ||
                    rows[i][j] === undefined) {
                    missingValues++;
                }
            }
        }

        sessionStorage.setItem("missingValues", missingValues);
        
        var duplicateRows = 0;

        for (var i = 1; i < rows.length; i++) {

            for (var j = 1; j < i; j++) {

                var isDuplicate = true;

                for (var k = 0; k < totalColumns; k++) {

                    if (rows[i][k] !== rows[j][k]) {
                        isDuplicate = false;
                        break;
                    }
                }

                if (isDuplicate) {
                    duplicateRows++;
                    break;
                }
            }
        }

        sessionStorage.setItem("duplicateRows", duplicateRows);
        
        var extraSpaces = 0;

        for (var i = 1; i < rows.length; i++) {
            for (var j = 0; j < totalColumns; j++) {

                var cell = rows[i][j];

                if (typeof cell === "string") {
                    if (cell !== cell.trim()) {
                        extraSpaces++;
                    }
                }
            }
        }

        sessionStorage.setItem("extraSpaces", extraSpaces);
        
        var formattingIssues = 0;

        for (var j = 0; j < totalColumns; j++) {

            var numberCount = 0;
            var textCount = 0;

            // Count numbers and text in each column
            for (var i = 1; i < rows.length; i++) {
                var cell = rows[i][j];

                if (cell !== "" && cell !== null &&
                    cell !== undefined) {

                    if (typeof cell === "number") {
                        numberCount++;
                    } else if (typeof cell === "string") {
                        textCount++;
                    }
                }
            }

            if (numberCount > textCount) {
                formattingIssues += textCount;
            } else if (textCount > numberCount) {
                formattingIssues += numberCount;
            }
        }

        sessionStorage.setItem(  "formattingIssues",formattingIssues);        
    console.log("Missing:", missingValues);
    console.log("Duplicates:", duplicateRows);
    console.log("Formatting:", formattingIssues);
    console.log("Spaces:", extraSpaces);


    } catch (error) {
        showError("Unable to read the Excel file.");
        console.error(error);
    }
}


function showRealResults() {

    if (!document.getElementById("resultsTitle")) {
        return;
    }

    var totalRows = sessionStorage.getItem("totalRows");
    var totalColumns = sessionStorage.getItem("totalColumns");

    if (totalRows === null) {
        return;
    }

    var isArabic = document.documentElement.lang === "ar";

    var rowsLabel = document.getElementById("rowsLabel");
    var columnsLabel = document.getElementById("columnsLabel");

    if (rowsLabel) {
        rowsLabel.textContent =
            (isArabic ? "عدد الصفوف: " : "Total Rows: ") + totalRows;
    }

    if (columnsLabel) {
        columnsLabel.textContent =
            (isArabic ? "عدد الأعمدة: " : "Total Columns: ") + totalColumns;
    }

    var counts = {
        "missingCount": "missingValues",
        "duplicateCount": "duplicateRows",
        "formattingCount": "formattingIssues",
        "spacesCount": "extraSpaces"
    };

    for (var id in counts) {

        var element = document.getElementById(id);
        var value = sessionStorage.getItem(counts[id]);

        if (element) {
            element.textContent = value === null ? "0" : value;
        } else {
            console.log("Missing HTML ID:", id);
        }
    }
}


function showSelectedIssues() {
    var saved = sessionStorage.getItem("selectedOptions");

    if (!saved) {
        return;
    }

    var selected = JSON.parse(saved);

    var issues = {
        missing: "missingCount",
        duplicates: "duplicateCount",
        formatting: "formattingCount",
        spaces: "spacesCount"
    };

    for (var issue in issues) {
        var countCell = document.getElementById(issues[issue]);

        if (countCell) {
            var row = countCell.closest("tr");

            if (row) {
                if (selected.includes(issue)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            }
        }
    }
}

showRealResults();
showSelectedIssues();





