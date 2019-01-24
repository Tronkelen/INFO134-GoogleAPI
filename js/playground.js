/** Address of the dataset */
const endpoint = "https://hotell.difi.no/api/json/bergen/lekeplasser?";
/** Using the fetch API. Fetching the dataset from the endpoint. Then make it json, then push the data into array lekeplasser */
var xhr = new XMLHttpRequest();
var jsonData;
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var data = this.responseText;
        jsonData = JSON.parse(data);
        initMap();
    }
}
xhr.open('GET', endpoint, true)
xhr.send();

function initMap() {
    var bergen = {
        lat: 60.3888,
        lng: 5.3318
    };
    // Creating map and zooming in on Bergen.
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: bergen
    });
    setTimeout(makeMarkers, 140)

    function makeMarkers() {
        for (var i = 0; i < jsonData.entries.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(jsonData.entries[i].latitude,
                    jsonData.entries[i].longitude),
                map: map,
                animation: google.maps.Animation.DROP,
            })
            marker.info =
                "<div>" +
                "<h2>" + jsonData.entries[i].navn + "</h2>" +
                "</div>";
            var infoWindow = new google.maps.InfoWindow({});

            // Event Listener
            marker.addListener('click', function () {
                toggleBounce(this);
                infoWindow.setContent(this.info);
                infoWindow.open(map, this);
            });

            function toggleBounce(marker) {
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
        }
    }

}