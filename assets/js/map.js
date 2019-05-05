var map;
var places;
var infoWindow;
var autocomplete;

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

    function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(14);
        search();
    }
}


}
