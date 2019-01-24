/****---------------^----------------------^---------------*****/
/*        JavaScript functions for toilets on Google Map.      */
/****---------------_----------------------_---------------*****/
/*-------------- initMap() --------------*/
// Initiates the map and configures its attributes.
const endpointToilets = "https://hotell.difi.no/api/json/bergen/dokart?";
var searchString = document.getElementById('searchInput');
var sugg = document.getElementById('olPlaces');
var listDiv = document.getElementById("places");
var map;
var pris;
var sunday;
var saturday;
var weekdays;
var stellerom;
var wheelchair;
var gender;
var pissoir;
var markers = [];
var toiletArray = [];
var request = new XMLHttpRequest();


// Function that takes in a URL as its parameter and retrieves the JSON file.
function getData(dataURL) {
    "use strict";
    request.open('GET', dataURL, true);
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var data = this.responseText;
            var jsonData = JSON.parse(data);
        }
    };
    request.send();
}


// Loads our map and retrieves the data to be displayed.
function loadMap() {
    "use strict";
    var bergen = {
        lat: 60.3958,
        lng: 5.3228
    };

    // Creating map and zooming in on Bergen.
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: bergen
    });

    // Sending request for data.
    var zhr = new XMLHttpRequest();
    zhr.open('GET', endpointToilets, true);
    zhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var data = this.responseText;
            var jsonData = JSON.parse(data);

            for (var j = 0; j < jsonData.entries.length; j++) {
                toiletArray.push(jsonData.entries[j]);
            }
            initMap();
        }
    };
    zhr.send();
}

function loadMarkers(toiletArray) {
    "use strict";
    for (var i = 0; i < toiletArray.length; i++) {
        var pos = new google.maps.LatLng(toiletArray[i].latitude,
            toiletArray[i].longitude);
        var id = toiletArray[i].id;
        // Creating Google Maps icons.
        var marker = new google.maps.Marker({
            position: pos,
            map: map,
            label: {
                text: id,
            }
        });
        // Setting marker information to match our Array.
        if (toiletArray[i].pris === "NULL") {
            pris = "Free";
        } else {
            pris = toiletArray[i].pris;
        }
        if (toiletArray[i].tid_hverdag === "NULL") {
            weekdays = "Closed";
        } else {
            weekdays = toiletArray[i].tid_hverdag;
        }
        if (toiletArray[i].tid_lordag === "NULL") {
            saturday = "Closed";
        } else {
            saturday = toiletArray[i].tid_lordag;
        }
        if (toiletArray[i].tid_sondag === "NULL") {
            sunday = "Closed";
        } else {
            sunday = toiletArray[i].tid_sondag;
        }
        if (toiletArray[i].stellerom === "NULL") {
            stellerom = "No";
        } else {
            stellerom = "Yes" +
                "<img src='media/baby.png' width='40' height='40'/>";
        }
        if (toiletArray[i].rullestol === "NULL") {
            wheelchair = "No";
        } else {
            wheelchair = "Yes" +
                "<img src='media/wheelchair.png'width='40' height='40'/>";
        }
        if (toiletArray[i].herre === "1" && toiletArray[i]
            .dame !== "1") {
            gender = "Gentlemen";
        } else if (toiletArray[i].herre && toiletArray[i]
            .dame !== "NULL") {
            gender = "Ladies and gentlemen";
        } else if (toiletArray[i].dame === "1") {
            gender = "Ladies";
        } else {
            gender = "Gender: None";
        }
        if (toiletArray[i].pissoir_only === "1") {
            pissoir = "N.B! There is only a pissoir here!";
        } else {
            pissoir = "&#32;";
        }
        // Generating marker info with the retrieved information.
        marker.info =
            "<div>" +
            "<h2>" + toiletArray[i].place + "</h2>" +
            "<p>" + "Address: " + toiletArray[i].adresse +
            "</p>" +
            "</div>" +
            "<div>" +
            "<h2>" + "Opening hours " + "</h2>" +
            "<p>" + "<b>" + "Weekdays: " + "</b>" + weekdays +
            "</p>" +
            "<p>" + "<b>" + "Saturday: " + "</b>" + saturday +
            "</p>" +
            "<p style='color: red'>" + "<b>" + "Sunday: " + "</b>" +
            sunday + "</p>" +
            "</div>" +
            "<div>" +
            "<p>" + "<b>" + "Price: " + "</b>" + pris + " NOK" +
            "</p>" +
            "<p>" + "<b>" + "Nursing room: " + "</b>" + stellerom +
            "</p>" +
            "</p>" + "<b>" + "Wheelchair compatible: " + "</b>" +
            wheelchair + "</p>" +
            "</div>" +
            "<div>" +
            "<div>" +
            "<p>" + gender + "</p>" +
            "<h3>" + pissoir + "</h3>" +
            "</div>";

        // Creates infoWindow.
        var infoWindow = new google.maps.InfoWindow({});

        // Event Listener
        marker.addListener('click', function () {
            toggleBounce(this);
            infoWindow.setContent(this.info);
            infoWindow.open(map, this);
        });
        // Push to array
        markers.push(marker);
    }
}

// Initiates our map.
function initMap() {
    "use strict";
    loadMarkers(toiletArray);
    for (var i = 0; i < toiletArray.length; i++) {
        document.getElementById("olPlaces").innerHTML +=
            `<li> <span style="color:white;font-weight:bold;">${toiletArray[i].id}.</span> ${toiletArray[i].plassering}, <span style="color:#46a863;";font-weight:bold;>${toiletArray[i].adresse}</span> <span style="color:black;font-weight:bold;">|</span> Open: <span style="color:orange;">[${toiletArray[i].tid_hverdag}]</span></li>`
    }
}

/** Animation for the marker when pressed. */
function toggleBounce(marker) {
    "use strict";
    if (marker.getAnimation() !== 'null') {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            marker.setAnimation(null);
        }, 1400);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            marker.setAnimation(null);
        }, 1400);
    }
}

function setMapOnAll(map) {
    "use strict";
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    "use strict";
    setMapOnAll(null);
}


// rapidSearch regEx searches
function rapidSearch() {
    "use strict";
    var searchString = document.getElementById('searchInput').value;
    // regEx expressions to be added to the search.
    var herreEx = /(gender|kjønn):(male|man|men|mann|herre|menn)/gi;
    var dameEx = /(gender|kjønn):(female|woman|ladies|lady|dame)/gi;
    var handicapEx =
        /(utility|bruker):(handicap|wheelchair|funksjonshemmet|rullestol)/gi;
    var nursingEx = /(utility|bruker):(nursing|stellerom|baby)/gi;
    var freeEx = /(price|pris):(free|gratis)/gi;
    var openNowEx = /(open:now|åpen:nå)/gi;
    var maxPriceEx =
        /(price:[0-9][0-9]|price:[0-9]|pris:[0-9][0-9]|pris:[0-9])/gi;
    var openOnEx =
        /(open|åpen):(monday|tuesday|wednesday|thursday|friday|saturday|sunday) (time|tid):([0-2][0-3]:[0-5][0-9])/gi;

    //variables for new createSearchObject
    var male = "NULL";
    var female = "NULL";
    var handicap = "NULL";
    var nurse = "NULL";
    var open = 0;
    var free = "NULL";
    var price = 12;
    var day = "";
    var time = "";
    var location = cleanString(searchString);

    //Criteria checking
    if (herreEx.test(searchString)) {
        male = "1";
    }
    if (dameEx.test(searchString)) {
        female = "1";
    }
    if (handicapEx.test(searchString)) {
        handicap = "1";
    }
    if (nursingEx.test(searchString)) {
        nurse = "1";
    }
    if (openNowEx.test(open)) {
        open = 1;
    }
    if (freeEx.test(searchString)) {
        free = "1";
    }
    if (openOnEx.test(searchString)) {
        var matchDay = searchString.match(
            /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/gi);
        day = matchDay[0];
        var matchTime = searchString.match(/[0-2][0-3]:[0-5][0-9]/);
        time = matchTime[0];
    }
    if (maxPriceEx.test(searchString)) {
        var matchPrice = searchString.match(
            /(price:[0-9][0-9]|price:[0-9]|pris:[0-9][0-9]|pris:[0-9])/gi);
        var trimPrice = matchPrice[0].match(/([0-9][0-9]|[0-9])/gi);
        price = trimPrice[0];
    } //---End criteria checking

    // New searchObject
    var searchObject = createSearchObject(male, female, handicap, nurse, open,
        free, price, day, time, location);

    //Sends object for matching
    var results = findAdvancedMatches(searchObject);
    displayAdvancedMatches(results);
}

// Event listeners for the searches
searchString.addEventListener('keyup', rapidSearch);

//Cleans a string for words with ":" in them, and removes spaces from start of the string
function cleanString(dirtyString) {
    "use strict";
    var regEx = /(([\s]?)[æøåa-z0-9-]*:[æøåa-z0-9-]+([\s]?))/gi;
    var cleanString = dirtyString.replace(regEx, "");
    return cleanString;
}

var legends = document.getElementById("legContainer");

// Opens the advanced search options.
function openAdvanced() {
    "use strict";
    var x = document.getElementById("advanced");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

//Function used to create search objects
function createSearchObject(male, female, handicap, nurse, open, free, price,
    day, time, location) {
    "use strict";

    // Instanciating a new searchObject with parameters
    var searchObject = {
        herre: male,
        dame: female,
        rullestol: handicap,
        stellerom: nurse,
        isOpen: openNow(open),
        gratis: free,
        makspris: price,
        dag: day,
        tid: time,
        lokasjon: location
    };
    return searchObject;
}

// Advanced search functionality.
function advancedSearch() {
    "use strict";
    //Checkboxes to variables 1 or 0
    var male = +document.getElementById('male-check').checked;
    var female = +document.getElementById('female-check').checked;
    var handicap = +document.getElementById('handicap-check').checked;
    var nurse = +document.getElementById('nurse-check').checked;
    var free = +document.getElementById('free-check').checked;
    var open = +document.getElementById('open-check').checked;
    //Fields/Dropdowns
    var price = document.getElementById('max-price').value;
    var day = document.getElementById('day').options[document.getElementById(
        'day').selectedIndex].text.toLowerCase();
    var time = document.getElementById('time').value;
    var location = document.getElementById('advanced-location').value;

    //create searchObject with search specifications
    var searchObject = createSearchObject(ifTrue(male), ifTrue(female), ifTrue(
            handicap), ifTrue(nurse), open, ifTrue(free), price, day, time,
        location);

    //Sends object for matching
    var results = findAdvancedMatches(searchObject);
    //Display the results
    displayAdvancedMatches(results);
}

//Matches a searchObject to the dataset, and returns list of all matches
function findAdvancedMatches(searchObject) {
    "use strict";
    var results = [];
    for (var i = 0; i < toiletArray.length; i++) {
        var facts = 0;

        //Checking facts - facts get incremented if criteria are met, or if criteria is not specified
        if (toiletArray[i].herre === searchObject.herre || (searchObject.herre ===
                "NULL")) {
            facts++;
        }
        if (toiletArray[i].dame === searchObject.dame || (searchObject.dame ===
                "NULL")) {
            facts++;
        }
        if (toiletArray[i].rullestol === searchObject.rullestol || (
                searchObject.rullestol === "NULL")) {
            facts++;
        }
        if (toiletArray[i].stellerom === searchObject.stellerom || (
                searchObject.stellerom === "NULL")) {
            facts++;
        }
        if (parseInt(toiletArray[i].pris) <= parseInt(searchObject.makspris) ||
            toiletArray[i].pris === "NULL" || toiletArray[i] === '0') {
            facts++;
        }
        if (searchObject.isOpen !== "NULL") {
            //Returns getDay() as number: 0-Sunday 1-Monday ... 6-Saturday
            var d = searchObject.isOpen.getDay();
            var h = searchObject.isOpen.getHours();
            var time = toiletArray[i];

            //Checks whether an entry is open given specific day and hour.
            facts += timeChecker(d, h, time);
        } else {
            facts++;
        }
        
        if (searchObject.gratis === '1') {
            if (toiletArray[i].pris === "NULL" || toiletArray[i].pris ===
                "0") {
                facts++;
            }
        } else {
            facts++;
        }

        if ((searchObject.dag !== "") || (searchObject.tid !== "")) {
            var day = 3;
            var hour = 12;

            if (searchObject.dag === "sunday") {
                day = 0;
            } else if (searchObject.dag === "saturday") {
                day = 6;
            } else {
                day = 3;
            }
            if (searchObject.tid !== "") {
                var hourmin = searchObject.tid;
                hour = hourmin.substring(0, 2);
            }
            // Send formated info to the timechecker to return 1 for match, 0 for mismatch.
            facts += timeChecker(day, hour, toiletArray[i]);
        } else {
            facts++;
        }
        
        if (searchObject.lokasjon !== "") {
            //Searching for matches between string in location searchfield and entries.place, .plassering or .adresse
            var placeEx = new RegExp(searchObject.lokasjon, 'gi');
            if (placeEx.test(toiletArray[i].plassering) || placeEx.test(
                    toiletArray[i].place) || placeEx.test(toiletArray[i].adresse)) {
                facts++;
            }
        } else {
            facts++;
        }

        //Checks if all criteria is met, adds to results if we have a match.
        if (facts === 9) {
            results.push(toiletArray[i]);
        }

    }
    //Print out result objects.
    return results;
}


//function returns 1 if toilet entry(time) is open given day and hour of search/ else 0
function timeChecker(day, hour, entry) {
    "use strict";

    var open;
    var closingH;
    var openingH;

    if (day === 0) {
        //check sunday time
        open = entry.tid_sondag;
        closingH = open.substring(8, 10);
        openingH = open.substring(0, 2);

        return compareTime(hour, openingH, closingH);
    } else if (day === 6) {
        //check saturday time
        open = entry.tid_lordag;
        closingH = open.substring(8, 10);
        openingH = open.substring(0, 2);

        return compareTime(hour, openingH, closingH);
    } else if (6 > day > 0) {
        //check weekday time
        open = entry.tid_hverdag;
        closingH = open.substring(8, 10);
        openingH = open.substring(0, 2);

        return compareTime(hour, openingH, closingH);
    }
    return 0;
}

//Returns 1 if hour is inbetween closing hour and opening hour, 0 if not
function compareTime(hour, openingH, closingH) {
    "use strict";
    var fact = 0;

    if (openingH === "NU") {
        return fact;
    }
    if ((openingH <= hour) && (hour <= closingH)) {
        fact++;
    }
    return fact;
}

//Transform time to timeobject or "Null"
function openNow(time) {
    "use strict";
    var d = "NULL";
    if (time > 0) {
        d = new Date();
        return d;
    } else {
        return d;
    }
}

//Transform information from check to return "NULL", instead of 0.
function ifTrue(checkElement) {
    "use strict";
    if (checkElement > 0) {
        return "1";
    } else {
        return "NULL";
    }
}

//Displays the search results
function displayAdvancedMatches(searchResults) {
    "use strict";
    clearMarkers();
    markers = [];
    const html = searchResults.map(place => {
        return `
		<li> <span style="color:white;font-weight:bold;">${place.id}.</span> ${place.plassering}, <span style="color:#46a863;";font-weight:bold;>${place.adresse}</span> <span style="color:black;font-weight:bold;">|</span> Open: <span style="color:orange;">[${place.tid_hverdag}]</span></li>
		`;
    }).join('');
    sugg.innerHTML = html;
    loadMarkers(searchResults);
}