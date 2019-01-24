var markers = [];
var markersLat = [];
var markersLng = [];
var poly;
var path;
var markersCalc;
var map;

function initMap() {
    var bergen = {
        lat: 60.3888,
        lng: 5.3318
    };
    // Creating map and zooming in on Bergen.
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: bergen
    });

    google.maps.event.addListener(map, 'click', function (event) {
        placeMarker(event.latLng)
    });

    function placeMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        markers.push(marker);
        markersLat.push(marker.getPosition().lat())
        markersLng.push(marker.getPosition().lng())
    }

    poly = new google.maps.Polyline({
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3
    });
    poly.setMap(map);

    // Add a listener for the click event
    map.addListener('click', addLatLng);
    map.addListener('click', function calcMarkDist() {
        for (var i = 0; i < markers.length; i++) {
            console.log(markersCalc = calculateLength(markersLat[i],
                markersLng[i], markersLat[i + 1], markersLng[i +
                    1]))
        }
    })

    // Handles click events on a map, and adds a new point to the Polyline.
    function addLatLng(event) {
        path = poly.getPath();
        path.push(event.latLng);
        poly.setMap(map)
    }
} /** initMap */

function clearPath() {
    path.clear();
}

function permDelMarkers() {
    clearMarkers();
    clearPath();
    markers = [];
    markersLat = [];
    markersLng = [];
}

var resultBox = document.getElementById("resultBox");
const radius = 6371 //Earths radius

/** A function to convert the degrees to radians. */
function toRadians(LatLng) {
    var pi = Math.PI;
    return LatLng * (pi / 180)
}
/** A function to convert the radians to degrees. */
/** function toDegrees(radians) {
    var pi = Math.PI;
    return radians * (180/pi);
}*/

var roundResult = 0;
/** The function that calculates the length */
function calculateLength(latitude1, longitude1, latitude2, longitude2) {
    /** Using the Haversine formula to calculate. */
    var part1 = Math.sin(toRadians(latitude2 - latitude1) / 2) * Math.sin(
        toRadians(latitude2 - latitude1) / 2);
    var part2 = Math.cos(toRadians(latitude1)) * Math.cos(toRadians(latitude2));
    var part3 = Math.sin(toRadians(longitude2 - longitude1) / 2) * Math.sin(
        toRadians(longitude2 - longitude1) / 2);
    /** Puts the parts calucated in the earlier step. Together to form the equation. */
    var result1 = part1 + (part2 * part3);
    /** Arctan(x) = arcsin(x/sqrt(1+squared[x])) */
    var result2 = 2 * Math.atan2(Math.sqrt(result1), Math.sqrt(1 - result1));
    /** Takes result2 and multiplies it with the earth approximate radius. */
    var result3 = radius * result2;
    roundResult = result3;
    return roundResult;
}

function html(roundResult) {
    "use strict";
    var distance = calculateLength(latitude1, longitude1, latitude2, longitude2);
    var html = '<span>The length between the two positions is ' + Math.round(
        distance * 1000) + '~ meters.</span>';
    resultBox.innerHTML = html;
}

// Task 8

// Setting up standard variables, our dataset and places stores it.
const endpointToilets = "https://hotell.difi.no/api/json/bergen/dokart?";
const endpointPlaygrounds =
    "https://hotell.difi.no/api/json/bergen/lekeplasser?";
var container = document.getElementById('favoritList');

// closest playground.
var closestContainer = document.getElementById("closestPlay");
var closestHeader = document.createElement('H1');
var closest = document.createElement('P');
var closestIs = document.createElement('P');
var closestSelect = document.createElement('P');

function createDrop(cont) {
    "use strict";
    // XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.open('GET', endpointToilets, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var data = this.responseText;
            var jsonData = JSON.parse(data);

            // Setting up the <form> element.
            var toiletForm = document.createElement('FORM');
            toiletForm.name = 'myForm';
            toiletForm.id = 'favoritForm';

            // Setting up the <select> element.
            var formSelect = document.createElement('SELECT');
            formSelect.name = 'toilets';
            formSelect.id = 'favoritSelect';
            toiletForm.appendChild(formSelect);

            // Setting up the <option> element, adding one for every entry in our dataset.
            for (var i = 0; i < jsonData.entries.length; i++) {
                var formOptions = document.createElement('OPTION');
                formOptions.value = jsonData.entries[i].id;
                formOptions.innerHTML = jsonData.entries[i].id + ". " +
                    jsonData.entries[i].plassering + ", " + jsonData.entries[
                        i].adresse;
                formSelect.appendChild(formOptions);
            }

            // Setting up the <submit> element.
            var submit = document.createElement('INPUT');
            submit.type = 'BUTTON';
            submit.value = 'Submit';
            submit.name = 'Submit';
            // Setting up the function to be executed when the button is clicked.
            submit.onclick = function () {
                // Clear all markers on the map.
                clearMarkers();
                markers = [];
                var marker;

                // Loop through every entry in our dataset and match it with the selected <option>.
                for (var i = 0; i < jsonData.entries.length; i++) {
                    // Checks if the 'value' of our selected <option> corresponds to an 'id' in our dataset.
                    if (jsonData.entries[i].id === formSelect.options[
                            formSelect.selectedIndex].value) {
                        // If it does, we create a marker with the information contained in that object.
                        var pos = new google.maps.LatLng(jsonData.entries[
                            i].latitude, jsonData.entries[i].longitude);
                        var id = jsonData.entries[i].id;
                        var id2 = jsonData.entries[i].id;
                        var plassering = jsonData.entries[i].plassering;
                        var entryLat = jsonData.entries[i].latitude;
                        var entryLong = jsonData.entries[i].longitude;
                        var pris;
                        var sunday;
                        var saturday;
                        var weekdays;
                        var stellerom;
                        var wheelchair;
                        var gender;
                        var pissoir;
                        // Creating Google Maps marker.
                        marker = new google.maps.Marker({
                            position: pos,
                            map: map,
                            animation: google.maps.Animation.DROP,
                            label: {
                                text: id,
                            }
                        });

                        // Creating the second marker, closest playground to chosen toilet.
                        var playArray = [];
                        // Requesting playground dataset.
                        var zhr = new XMLHttpRequest();
                        zhr.open('GET', endpointPlaygrounds, true);
                        zhr.onreadystatechange = function () {
                            if (this.readyState === 4 && this.status ===
                                200) {
                                var content = this.responseText;
                                var playData = JSON.parse(content);

                                // Pushing each entry in the dataset to our new array, playArray.
                                for (var i = 0; i < playData.entries
                                    .length; i++) {
                                    playArray.push(playData.entries[
                                        i]);
                                }

                                // Sorting playArray based on the distance between the chosen toilet.
                                playArray.sort(function (a, b) {
                                    var x = calculateLength(
                                        a.latitude, a.longitude,
                                        entryLat,
                                        entryLong);
                                    var y = calculateLength(
                                        b.latitude, b.longitude,
                                        entryLat,
                                        entryLong);
                                    if (x < y) {
                                        return -1;
                                    }
                                    if (x > y) {
                                        return 1;
                                    }
                                    return 0;
                                });

                                // Sets the innerHTML value of the given paragraphs and headers to display the closest playground to selected toilet.
                                closestHeader.innerHTML =
                                    'Closest playground to:';
                                closestSelect.innerHTML =
                                    '<span style="color:white;">' +
                                    id2 + '.</span> ' + plassering;
                                closestIs.innerHTML =
                                    '<span style="color:#46a863;font-weight:bold;">is</span>';
                                closest.innerHTML =
                                    '<span style="color:white;">' +
                                    playArray[0].id + '.</span> ' +
                                    playArray[0].navn;
                                
                                var distance = calculateLength(playArray[0].latitude, playArray[0].longitude, entryLat, entryLong);
                                var html = '<span>The distance between the two positions is ' + Math.round(
                                    distance * 1000) + ' meters.</span>';
                                resultBox.innerHTML = html;

                                // Append the header and paragraph elements to our div, in respective order.
                                closestContainer.appendChild(
                                    closestHeader);
                                closestContainer.appendChild(
                                    closestSelect);
                                closestContainer.appendChild(
                                    closestIs);
                                closestContainer.appendChild(
                                    closest);

                                // Create marker based on information in the first object.
                                var pos = new google.maps.LatLng(
                                    playArray[0].latitude,
                                    playArray[0].longitude);
                                var id = playArray[0].id;

                                // Creating Google Maps marker.
                                marker = new google.maps.Marker({
                                    position: pos,
                                    map: map,
                                    animation: google.maps.Animation
                                        .DROP,
                                    label: {
                                        text: id,
                                    }
                                });
                                marker.info =
                                    "<div>" +
                                    "<h2>" + playArray[0].navn +
                                    "</h2>" +
                                    "</div>";
                                var infoWindow = new google.maps.InfoWindow({});

                                // Event Listener
                                marker.addListener('click',
                                    function () {
                                        toggleBounce(this);
                                        infoWindow.setContent(
                                            this.info);
                                        infoWindow.open(map,
                                            this);
                                    });
                                markers.push(marker);
                            }
                        };
                        zhr.send();

                        // Setting marker information to match our Array.
                        if (jsonData.entries[i].pris === "NULL") {
                            pris = "Free";
                        } else {
                            pris = jsonData.entries[i].pris;
                        }
                        if (jsonData.entries[i].tid_hverdag === "NULL") {
                            weekdays = "Closed";
                        } else {
                            weekdays = jsonData.entries[i].tid_hverdag;
                        }
                        if (jsonData.entries[i].tid_lordag === "NULL") {
                            saturday = "Closed";
                        } else {
                            saturday = jsonData.entries[i].tid_lordag;
                        }
                        if (jsonData.entries[i].tid_sondag === "NULL") {
                            sunday = "Closed";
                        } else {
                            sunday = jsonData.entries[i].tid_sondag;
                        }
                        if (jsonData.entries[i].stellerom === "NULL") {
                            stellerom = "No";
                        } else {
                            stellerom = "Yes" +
                                "<img src='media/baby.png' width='40' height='40'/>";
                        }
                        if (jsonData.entries[i].rullestol === "NULL") {
                            wheelchair = "No";
                        } else {
                            wheelchair = "Yes" +
                                "<img src='media/wheelchair.png'width='40' height='40'/>";
                        }
                        if (jsonData.entries[i].herre === "1" &&
                            jsonData.entries[i].dame !== "1") {
                            gender = "Gentlemen";
                        } else if (jsonData.entries[i].herre &&
                            jsonData.entries[i].dame !== "NULL") {
                            gender = "Ladies and gentlemen";
                        } else if (jsonData.entries[i].dame === "1") {
                            gender = "Ladies";
                        } else {
                            gender = "Gender: None";
                        }
                        if (jsonData.entries[i].pissoir_only === "1") {
                            pissoir =
                                "N.B! There is only a pissoir here!";
                        } else {
                            pissoir = "&#32;";
                        }
                        // Generating marker info with the retrieved information.
                        marker.info =
                            "<div>" +
                            "<h2>" + jsonData.entries[i].place +
                            "</h2>" +
                            "<p>" + "Address: " + jsonData.entries[i].adresse +
                            "</p>" +
                            "</div>" +
                            "<div>" +
                            "<h2>" + "Opening hours " + "</h2>" +
                            "<p>" + "<b>" + "Weekdays: " + "</b>" +
                            weekdays + "</p>" +
                            "<p>" + "<b>" + "Saturday: " + "</b>" +
                            saturday + "</p>" +
                            "<p style='color: red'>" + "<b>" +
                            "Sunday: " + "</b>" + sunday + "</p>" +
                            "</div>" +
                            "<div>" +
                            "<p>" + "<b>" + "Price: " + "</b>" + pris +
                            " NOK" + "</p>" +
                            "<p>" + "<b>" + "Nursing room: " + "</b>" +
                            stellerom + "</p>" +
                            "</p>" + "<b>" + "Wheelchair compatible: " +
                            "</b>" + wheelchair + "</p>" +
                            "</div>" +
                            "<div>" +
                            "<p>" + gender + "</p>" +
                            "<h3>" + pissoir + "</h3>" +
                            "</div>";

                        // Creates infoWindow.
                        var infoWindow = new google.maps.InfoWindow({});
                        // Event Listener
                        google.maps.event.addListener(marker, 'click',
                            function () {
                                toggleBounce(this);
                                infoWindow.setContent(this.info);
                                infoWindow.open(map, this);
                            });
                        markers.push(marker);
                    }
                }
            };
            // We then append the submit button the our form.
            toiletForm.appendChild(submit);
            // And we append the whole form to our div container.
            cont.appendChild(toiletForm);
        }
    };
    // Finally, we send the request.
    xhr.send();
}

// Adds markers to the given map, or null.
function setMapOnAll(map) {
    "use strict";
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Clears all markers on the map.
function clearMarkers() {
    "use strict";
    setMapOnAll(null);
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

// Creating the dropdown menu with entries from our dataset.
createDrop(container);