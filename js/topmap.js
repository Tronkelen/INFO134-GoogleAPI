/****---------------^----------------------^---------------*****/
/*           JavaScript functions for top 5 Google Map.        */
/****---------------_----------------------_---------------*****/
/*-------------- initMap() --------------*/
// Initiates the map and configures its attributes.
function initMap() {
    "use strict";
    var bergen = {
        lat: 60.3888,
        lng: 5.3318
    };
    var bryggen = {
        lat: 60.3972,
        lng: 5.3229
    };
    var akvariet = {
        lat: 60.3998,
        lng: 5.3040
    };
    var ulriken = {
        lat: 60.3740,
        lng: 5.3639
    };
    var bergenhus = {
        lat: 60.3999,
        lng: 5.3188
    };
    var floybanen = {
        lat: 60.3964,
        lng: 5.3285
    };


    var infoBryggen =
        '<div id="content">' +
        '<p> Bryggen is one of Bergens and Norways main attractions. Bryggen was built' +
        ' after the great fire in 1702 and is included on UNESCOs World Heritage List.</p>' +
        '<p> The very first buildings in Bergen were situated at Bryggen,' +
        ' which has been a vibrant and important area of the city for many centuries.</p>' +
        '<p>Bryggen has been ravaged by many fires, the great fire of 1702 in particular.' +
        ' It reduced the whole of the city to ashes. The area was rebuilt on the foundations that had been there since the 12th century, which means that Bryggen is basically unchanged despite the passing centuries.</p>' +
        '</div>';
    // Source https://en.visitbergen.com/things-to-do/bryggen-in-bergen-p878553 */

    var infoAkvariet =
        '<div id="content">' +
        '<p> Akvariet in Bergen. </p>' + '</div>';

    var infoFloybanen =
        '<div id="content">' +
        '<p> Fløibanen in Bergen. Fløibanen is the experience that no visitors to Bergen should be without. It is one of Norway’s most famous attractions, and you will find it in the heart of Bergen, only 150 meters from Fisketorget and Bryggen.</p>';
    // Source http://floyen.no/en/ */  

    var infoBergenhus =
        '<div id="content">' +
        '<p> Bergenhus in Bergen. </p>';

    var infoUlriken =
        '<div id="content">' +
        '<p> Ulriken in Bergen. </p>';

    var infoWindow1 = new google.maps.InfoWindow({
        content: infoBryggen
    });

    var infoWindow2 = new google.maps.InfoWindow({
        content: infoAkvariet
    });

    var infoWindow3 = new google.maps.InfoWindow({
        content: infoUlriken
    });

    var infoWindow4 = new google.maps.InfoWindow({
        content: infoBergenhus
    });

    var infoWindow5 = new google.maps.InfoWindow({
        content: infoFloybanen
    });

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: bergen
    });
    var marker1 = new google.maps.Marker({
        position: bryggen,
        map: map
    });
    var marker2 = new google.maps.Marker({
        position: akvariet,
        map: map
    });
    var marker3 = new google.maps.Marker({
        position: ulriken,
        map: map
    });
    var marker4 = new google.maps.Marker({
        position: bergenhus,
        map: map
    });
    var marker5 = new google.maps.Marker({
        position: floybanen,
        map: map
    });

    marker1.addListener('click', function () {
        infoWindow1.open(map, marker1);
    });

    marker2.addListener('click', function () {
        infoWindow2.open(map, marker2);
    });

    marker3.addListener('click', function () {
        infoWindow3.open(map, marker3);
    });

    marker4.addListener('click', function () {
        infoWindow4.open(map, marker4);
    });

    marker5.addListener('click', function () {
        infoWindow5.open(map, marker5);
    });

}