// JavaScript Document for the custom data set.
const endpoint =
    "https://hotell.difi.no/api/json/mattilsynet/smilefjes/tilsyn?page=10&query=bergen";
var input = document.getElementById('searchField');
var restaList = [];
var lastColumn = -1;

// Reloads the content of our table.
function loadTable() {
    "use strict";
    var rList = document.getElementById("restaurantList");

    var karakter1;
    var karakter2;
    var karakter3;
    var karakter4;

    var vGood =
        "<span style='color:green; font-weight:bold;'>Very good</span><br><img src='media/smilyRating/happy.png' alt='Very good' style='width:20%;height:auto;'>";
    var good =
        "<span style='color:#59a82f;'>Good</span><br><img src='media/smilyRating/happy.png' alt='Good' style='width:20%;height:auto;'>";
    var medi =
        "<span style='color:#e25f22;'>Dissatisfactory</span><br><img src='media/smilyRating/medium.png' alt='Dissatisfactory' style='width:20%;height:auto;'>";
    var bad =
        "<span style='color:red;'>Absolutly horrifying</span><br><img src='media/smilyRating/sad.png' alt='Absolutely horrifying' style='width:20%;height:auto;'>";
    var noEntry =
        "<span style='color:grey;'>No entry</span><br><img src='media/smilyRating/sad.png' alt='Absolutely horrifying' style='width:20%;height:auto;'>";

    for (var j = 0; j < restaList.length; j++) {
        if (restaList[j].karakter1 === "0") {
            karakter1 = vGood;
        } else if (restaList[j].karakter1 === "1") {
            karakter1 = good;
        } else if (restaList[j].karakter1 === "2") {
            karakter1 = medi;
        } else if (restaList[j].karakter1 === "3") {
            karakter1 = bad;
        } else if (restaList[j].karakter1 === "") {
            karakter1 = noEntry;
        }

        if (restaList[j].karakter2 === "0") {
            karakter2 = vGood;
        } else if (restaList[j].karakter2 === "1") {
            karakter2 = good;
        } else if (restaList[j].karakter2 === "2") {
            karakter2 = medi;
        } else if (restaList[j].karakter2 === "3") {
            karakter2 = bad;
        } else if (restaList[j].karakter2 === "") {
            karakter2 = noEntry;
        }


        if (restaList[j].karakter3 === "0") {
            karakter3 = vGood;
        } else if (restaList[j].karakter3 === "1") {
            karakter3 = good;
        } else if (restaList[j].karakter3 === "2") {
            karakter3 = medi;
        } else if (restaList[j].karakter3 === "3") {
            karakter3 = bad;
        } else if (restaList[j].karakter3 === "") {
            karakter3 = noEntry;
        }

        if (restaList[j].karakter4 === "0") {
            karakter4 = vGood;
        } else if (restaList[j].karakter4 === "1") {
            karakter4 = good;
        } else if (restaList[j].karakter4 === "2") {
            karakter4 = medi;
        } else if (restaList[j].karakter4 === "3") {
            karakter4 = bad;
        } else if (restaList[j].karakter4 === "") {
            karakter4 = noEntry;
        }

        var karakterTall1 = parseInt(restaList[j].karakter1);
        var karakterTall2 = parseInt(restaList[j].karakter2);
        var karakterTall3 = parseInt(restaList[j].karakter3);
        var karakterTall4 = parseInt(restaList[j].karakter4);

        if (restaList[j].karakter1 === "") {
            karakterTall1 = 4;
        }

        if (restaList[j].karakter2 === "") {
            karakterTall2 = 4;
        }

        if (restaList[j].karakter3 === "") {
            karakterTall3 = 4;
        }

        if (restaList[j].karakter4 === "") {
            karakterTall4 = 4;
        }

        var karakterTall = karakterTall1 + karakterTall2 +
            karakterTall3 +
            karakterTall4;

        var karakterTallString;

        if (karakterTall < 3) {
            karakterTallString =
                "<span style='color:green; font-weight:bold;'>Very good</span><br><img src='media/smilyRating/happy.png' alt='Very good' style='width:20%;height:auto;'>";
        } else if (karakterTall < 5) {
            karakterTallString =
                "<span style='color:#59a82f;'>Good</span><br><img src='media/smilyRating/happy.png' alt='Good' style='width:20%;height:auto;'>";
        } else if (karakterTall < 8) {
            karakterTallString =
                "<span style='color:#e25f22;'>Dissatisfactory</span><br><img src='media/smilyRating/medium.png' alt='Dissatisfactory' style='width:20%;height:auto;'>";
        } else if (karakterTall >= 8) {
            karakterTallString =
                "<span style='color:red;'>Absolutly horrifying</span><br><img src='media/smilyRating/sad.png' alt='Absolutely horrifying' style='width:20%;height:auto;'>";
        }

        var table = document.getElementsByTagName('tbody')[0];
        var dateObj = restaList[j].dato;
        var newDate = dateObj.substring(0, 2) + "/" + dateObj.substring(
                2, 4) +
            "/" + dateObj.substring(4, 8);

        table.innerHTML +=
            `
				<tr>
				    <td>
				        <span style="color:white;">${restaList[j].navn}</span>
				    </td>
				    <td>
				        <span style="color:grey;font-style:italic;">${restaList[j].adrlinje1}, ${restaList[j].postnr}, ${restaList[j].poststed}</span>
				    </td>
				    <td>
                        <span style="color:#aabfa8;"> ${newDate} </span>
				    </td>
				    <td sort-order="${karakterTall1}" style="text-align:center;">
				        ${karakter1}
                    </td>
                    <td sort-order="${karakterTall2}" style="text-align:center;">
                        ${karakter2}
                    </td>
                    <td sort-order="${karakterTall3}" style="text-align:center;">
                        ${karakter3}
                    </td>
                    <td sort-order="${karakterTall4}" style="text-align:center;">
                        ${karakter4}
                    </td>
                    <td sort-order="${karakterTall}" style="text-align:center;">
                         (${karakterTall})<br> ${karakterTallString}
                    </td>
                </tr>
        `;
        var listItem = document.createElement('TR');
        rList.appendChild(listItem);
    }
}

// Loads the content of our table.
function initTable() {
    "use strict";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', endpoint, true);
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var data = this.responseText;
            var jsonData = JSON.parse(data);
            // Logging the retrieved objects to our array variable.

            for (var i = 0; i < jsonData.entries.length; i++) {
                restaList.push(jsonData.entries[i]);
            }

            loadTable();
        }
    };
    xhr.send();
}

function hasClass(element, name) {
    "use strict";
    return (' ' + element.className + ' ').indexOf(' ' + name+ ' ') > -1;
}

var sortIcon = document.createElement("I");
sortIcon.className = 'fas fa-sort-down';

// Sort function for our table. Takes two parameters, the given table index to sort and which sort method to be used.
function columnSort(argColumn, argSortType) {
    "use strict";
    var table = document.getElementById("tables");
    var tableBody = table.getElementsByTagName("tbody")[0];
    var tableHead = table.getElementsByTagName("thead")[0];
    var headRows = tableHead.getElementsByTagName("tr")[0];
    var tableRows = tableBody.getElementsByTagName("tr");
    var headData;

    // Sorting array to hold the table rows.
    var sortingRow = [];

    for (var i = 0; i < tableRows.length; i++) {
        // RegEx to escape tags.
        var tableData = tableRows[i].getElementsByTagName("td")[
                argColumn].innerHTML
            .replace(/<[^>]*>/g, "");
        var tableData2 = tableRows[i].getElementsByTagName("td")[
            argColumn];
        
        headData = headRows.getElementsByTagName('th')[
            argColumn];

        sortingRow[i] = {};
        sortingRow[i].oldTableIndex = i;

        if (argSortType === 'DATE') {
            sortingRow[i].value = convertDate(tableData);
        } else if (argSortType === 'STRING') {
            sortingRow[i].value = tableData.substr(0, 25);
        } else if (argSortType === 'INTEGER') {
            sortingRow[i].value = tableData.replace(/[^0-9]+/g, "");
        } else if (argSortType === 'SCORE') {
            sortingRow[i].value = tableData2.getAttribute(
                'sort-order');
        }
    }
    
    headData.appendChild(sortIcon);
    
    if(hasClass(sortIcon, 'fas fa-sort-up')) {
        sortIcon.className = 'fas fa-sort-down';
    } else if(hasClass(sortIcon, 'fas fa-sort-down')) {
        sortIcon.className = 'fas fa-sort-up';      
    }
    
    if (argColumn === lastColumn) {
        sortingRow.reverse();
    } else {
        lastColumn = argColumn;
        if (argSortType === 'DATE') {
            sortingRow.sort(sortInt);
        } else if (argSortType === 'STRING') {
            sortingRow.sort(sortString);
        } else if (argSortType === 'INTEGER') {
            sortingRow.sort(sortInt);
        } else if (argSortType === 'SCORE') {
            sortingRow.sort(sortInt);
        }
    }
    
    var newTbody = document.createElement('tbody');

    for (var j = 0; j < sortingRow.length; j++) {
        newTbody.appendChild(tableRows[sortingRow[j].oldTableIndex].cloneNode(
            true));
    }
    
    table.replaceChild(newTbody, tableBody);
    
}

// Function to sort dates based on the given order (m/d/y). Breaks up the strings at each '/' and compares them respectivly.
function convertDate(dateValue) {
    "use strict";
    dateValue = dateValue.toLowerCase();
    // Replaces everything not a number between 0-9 with ":".
    dateValue = dateValue.replace(/[^0-9]+/g, ":");

    // Split our date in to three at ":".
    var date = dateValue.split(":");

    // Seperate the string in to three variables, respectively.
    var day = date[0];
    var month = date[1];
    var year = date[2];

    // Parse our year string to integer. If it's lower than 100, we add 2000.
    year = parseInt(year);
    if (year < 100) {
        year = parseInt(year) + 2000;
    }

    // Return date in reverse order.
    return "" + String(year) + "" + String(month) + "" + String(day) + "";
}

// Function to compare number values of a column. Evaluates both ints and float.
function sortInt(a, b) {
    "use strict";
    var x;
    var y;

    if (a.value) {
        x = a.value;
    } else {
        x = parseFloat(a.value);
    }

    if (b.value) {
        y = b.value;
    } else {
        y = parseFloat(b.value);
    }

    return x - y;
}

// Function to compare text values of a column. Regular string sort.
function sortString(a, b) {
    "use strict";
    var x = a.value;
    var y = b.value;
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
}

// Filters the table using the given text string.
function searchTable() {
    "use strict";
    var searchQuery = input.value.toUpperCase();
    var table = document.getElementById('tables');
    var tableBody = table.getElementsByTagName('tbody')[0];
    var tableRow = tableBody.getElementsByTagName('tr');

    for (var i = 0; i < tableRow.length; i++) {
        if (tableRow) {
            if (tableRow[i].innerHTML.toUpperCase().indexOf(
                    searchQuery) > -1) {
                tableRow[i].style.display = "";
            } else {
                tableRow[i].style.display = "none";
            }
        }
    }
}

// Adding event listener for the search box.

input.addEventListener('change', searchTable);
input.addEventListener('keyup', searchTable);


// Calling to load the table.
initTable();