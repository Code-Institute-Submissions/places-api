var map;
var places;
var infoWindow;
var search;
var autocomplete;
var markers = [];
var markerIcon;
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
    if (selectType == 'noSelection') {
        return false;
    }
    else if (document.getElementById('autocomplete').value.length == 0){
        alert("Please enter a City!")
    }
    else {
    places.nearbySearch(search, function(results, status) {
        var iconPath = "./assets/images/icons/"
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();
            // Create a marker for each place found.
            for (var i = 0; i < results.length; i++) {

                if (selectType == 'museum') {
                    markerIcon = iconPath + "museum.png"
                }
                else if (selectType == 'zoo') {
                    markerIcon = iconPath + "zoo.png"
                }
                else if (selectType == "amusement_park") {
                    markerIcon = iconPath + "amusement-park.png"
                }
                else if (selectType == "art_gallery") {
                    markerIcon = iconPath + "art-gallery.png"
                }
                else if (selectType == "night_club") {
                    markerIcon = iconPath + "night-club.png"
                }
                else if (selectType == "campground") {
                    markerIcon = iconPath + "camp-ground.png"
                }
                else if (selectType == "lodging") {
                    markerIcon = iconPath + "hotel.png"
                }
                else if (selectType == "restaurant") {
                    markerIcon = iconPath + "restaurant.png"
                }
                else if (selectType == "meal_takeaway") {
                    markerIcon = iconPath + "takeaway.png"
                }
                else if (selectType == "cafe") {
                    markerIcon = iconPath + "coffee.png"
                }
                else if (selectType == "bar") {
                    markerIcon = iconPath + "bar.png"
                }
                else if (selectType == "airport") {
                    markerIcon = iconPath + "airport.png"
                }
                else if (selectType == "bus_station") {
                    markerIcon = iconPath + "bus.png"
                }
                else if (selectType == "train_station") {
                    markerIcon = iconPath + "train.png"
                }
                else if (selectType == "car_rental") {
                    markerIcon = iconPath + "carrental.png"
                }
                // Use marker animation to drop the icons on the map.
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
        else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            clearResults();
            clearMarkers();
            //Message if the request returns no results
            $('#myModal').modal('show');
        }
    
    });
 }
}
// add listeners so user can browse the map without changing the city 
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
// add listeners so user can browse the map without changing selection type
document.getElementById("autocomplete").addEventListener('change', clearMarkers);
document.getElementById("autocomplete").addEventListener('change', clearResults);
document.getElementById("autocomplete").addEventListener('change', search);

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

// Get details for a place. Show the information in an info window,
// anchored on the marker for the place that the user has selected.
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
    document.getElementById('iw-url').innerHTML = '<b><a  data-toggle="tooltip" title="Open In Google Maps" href="' + place.url +
        '">' + place.name + ' </a></b>';

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
            website = 'https://' + place.website + '/';
            fullUrl = website;
        }
        document.getElementById('iw-website-row').style.display = '';
        document.getElementById('iw-website').textContent = website;
    }
    else {
        document.getElementById('iw-website-row').style.display = 'none';
    }
    if (place.opening_hours) {

        var open = document.getElementById("iw-openh-row");
        // if user changes place selection, statement below will clear previous results!
        $('.iw-openh').remove();
        for (var i = 0; i < place.opening_hours.weekday_text.length; i++) {
            // Create element and append to opening_hours_div
            var content = document.createElement('td');
            content.className = 'iw-openh';
            content.innerHTML = place.opening_hours.weekday_text[i];
            open.appendChild(content);
        }
        document.getElementById('iw-openh-row').style.display = '';

    }
    else {
        document.getElementById('iw-openh-row').style.display = 'none';
    }
}
