var map;
var places;
var infoWindow;
var search;
var autocomplete;
var markers = [];
var markerIcon;
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');


function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 54.5260, lng: 15.2551 },
        zoom: 3,
        mapTypeId: "roadmap",
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true,
        gestureHandling: 'cooperative'
    });

    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('info-content')
    });

    // Create the autocomplete object and associate it with the UI input control.

    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (
            document.getElementById('autocomplete')), {
            types: ['(cities)']
        });
    places = new google.maps.places.PlacesService(map);

    // Add a DOM event listener to react when the user selects a new place.

    autocomplete.addListener('place_changed', onPlaceChanged);
}
// Search for places in the selected city, within the viewport of the map.
function search() {
    var selectType = document.getElementById("selectType").value;
    var search = {
        bounds: map.getBounds(),
        types: [selectType],
    };
    places.nearbySearch(search, function(results, status) {
        var iconPath = "./assets/images/icons/"
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();
            // Create a marker for each place found.
            for (var i = 0; i < results.length; i++) {
                // Country Does not return anything (as intended) fix with a default value 
                if (selectType == 'country') {
                    document.getElementById("selectType").addEventListener('enter', clearMarkers);
                    document.getElementById("selectType").addEventListener('enter', clearResults);
                }
                else if (selectType == 'museum') {
                    markerIcon = iconPath + "museum.png"
                 //   markerIcon = "./assets/images/icons/museum.png"
                }
                else if (selectType == 'zoo') {
                    markerIcon = iconPath + "zoo.png"
                   // markerIcon = "./assets/images/icons/zoo.png"
                }
                else if (selectType == "amusement_park") {
                    markerIcon = iconPath + "amusement_park.png"
                   // markerIcon = "./assets/images/icons/amusement-park.png"
                }
                else if (selectType == "art_gallery") {
                    markerIcon = iconPath + "art-gallery.png"
                   // markerIcon = "./assets/images/icons/art-gallery.png"
                }
                else if (selectType == "night_club") {
                    markerIcon = iconPath + "night-club.png"
                    // markerIcon = "./assets/images/icons/night-club.png"
                }
                else if (selectType == "campground") {
                    markerIcon = iconPath + "camp-ground.png"
                   // markerIcon = "./assets/images/icons/camp-ground.png"
                }
                else if (selectType == "lodging") {
                    markerIcon = iconPath + "hotel.png"
                   // markerIcon = "./assets/images/icons/hotel.png"
                }
                else if (selectType == "restaurant") {
                    markerIcon = iconPath + "restaurant.png"
                  //  markerIcon = "./assets/images/icons/restaurant.png"
                }
                else if (selectType == "meal_takeaway") {
                    markerIcon = iconPath + "takeaway.png"
                  //  markerIcon = "./assets/images/icons/takeaway.png"
                }
                else if (selectType == "cafe") {
                    markerIcon = iconPath + "coffee.png"
                  //  markerIcon = "./assets/images/icons/coffee.png"
                }
                else if (selectType == "bar") {
                    markerIcon = iconPath + "bar.png"
                 //   markerIcon = "./assets/images/icons/bar.png"
                }
                else if (selectType == "airport") {
                    markerIcon = iconPath + "airport.png"
                  //  markerIcon = "./assets/images/icons/airport.png"
                }
                else if (selectType == "bus_station") {
                    markerIcon = iconPath + "bus.png"
                  //  markerIcon = "./assets/images/icons/bus.png"
                }
                else if (selectType == "train_station") {
                    markerIcon = iconPath + "train.png"
                 //   markerIcon = "./assets/images/icons/train.png"
                }
                else if (selectType == "car_rental") {
                    markerIcon = iconPath + "carrental.png"
                //    markerIcon = "./assets/images/icons/carrental.png"
                }
                // old markers (Delete when finished )
                /* var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
                 var markerIcon = MARKER_PATH + markerLetter + '.png';*/
                // Use marker animation to drop the icons incrementally on the map.
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: {
                        url: markerIcon
                    }
                });
                // If the user clicks a place marker, show the details of that place
                // in an info window.
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
                addResult(results[i], i);
            }
        }
    });
}
document.getElementById("selectType").addEventListener('change', clearMarkers);
document.getElementById("selectType").addEventListener('change', clearResults);
document.getElementById("selectType").addEventListener('change', search);

function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(13);
        search();
    }
    else {
        document.getElementById('autocomplete').placeholder = 'Enter a City!'
    };
}
document.getElementById("autocomplete").addEventListener('enter', clearMarkers);
document.getElementById("autocomplete").addEventListener('enter', clearResults);

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}


function dropMarker(i) {
    return function() {
        markers[i].setMap(map);
    };
}

function addResult(result, i) {
    var results = document.getElementById('results');
    // var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
    //    var markerIcon = MARKER_PATH + markerLetter + '.png';

    var tr = document.createElement('tr');
    tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
    tr.onclick = function() {
        google.maps.event.trigger(markers[i], 'click');
    };

    var iconTd = document.createElement('td');
    var nameTd = document.createElement('td');
    var icon = document.createElement('img');
    icon.src = markerIcon;
    icon.setAttribute('class', 'placeIcon');
    icon.setAttribute('className', 'placeIcon');
    var name = document.createTextNode(result.name);
    iconTd.appendChild(icon);
    nameTd.appendChild(name);
    tr.appendChild(iconTd);
    tr.appendChild(nameTd);
    results.appendChild(tr);
}

function clearResults() {
    var results = document.getElementById('results');
    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}

// Get the place details for a place. Show the information in an info window,
// anchored on the marker for the place that the user selected.
function showInfoWindow() {
    var marker = this;
    places.getDetails({ placeId: marker.placeResult.place_id },
        function(place, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
            }
            infoWindow.open(map, marker);
            buildIWContent(place);
        });
}

// Load the place information into the HTML elements used by the info window.
function buildIWContent(place) {

    document.getElementById('iw-icon').innerHTML = '<img class="resultIcon" ' +
        'src="' + place.icon + '"/>';
    document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
        '">' + place.name + '</a></b>';
    document.getElementById('iw-address').textContent = place.vicinity;

    if (place.formatted_phone_number) {
        document.getElementById('iw-phone-row').style.display = '';
        document.getElementById('iw-phone').textContent =
            place.formatted_phone_number;
    }
    else {
        document.getElementById('iw-phone-row').style.display = 'none';
    }

    // Assign a five-star rating to the hotel, using a black star ('&#10029;')
    // to indicate the rating the hotel has earned, and a white star ('&#10025;')
    // for the rating points not achieved.
    if (place.rating) {
        var ratingHtml = '';
        for (var i = 0; i < 5; i++) {
            if (place.rating < (i + 0.5)) {
                ratingHtml += '&#10025;';
            }
            else {
                ratingHtml += '&#10029;';
            }
            document.getElementById('iw-rating-row').style.display = '';
            document.getElementById('iw-rating').innerHTML = ratingHtml;
        }
    }
    else {
        document.getElementById('iw-rating-row').style.display = 'none';
    }

    // The regexp isolates the first part of the URL (domain plus subdomain)
    // to give a short URL for displaying in the info window.
    if (place.website) {
        var fullUrl = place.website;
        var website = hostnameRegexp.exec(place.website);
        if (website === null) {
            website = 'http://' + place.website + '/';
            fullUrl = website;
        }
        document.getElementById('iw-website-row').style.display = '';
        document.getElementById('iw-website').textContent = website;
    }
    else {
        document.getElementById('iw-website-row').style.display = 'none';


    }
}
