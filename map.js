L.mapbox.accessToken = 'pk.eyJ1IjoiaHVhbmd5IiwiYSI6ImNpcDBrb241NTAyaWJ1MG00cjc1Nmcwb3UifQ.1q77Pdqwy-hMPyRDdJlfuA';

var blogURL = "/sherrywauscedu?format=json",
    geocoder = L.mapbox.geocoder('mapbox.places'),
    map = L.mapbox.map('map', 'mapbox.light', {
        maxBounds: [[-90, -180], [90, 180]],
        minZoom: 2
    }).setView([14.5, -1], 2);

L.mapbox.styleLayer('mapbox://styles/huangy/cip227euj000dbom5qn6c7ojs', {
    // This map option disables world wrapping. by default, it is false.
    continuousWorld: false,
    // This option disables loading tiles outside of the world bounds.
    noWrap: true
}).addTo(map);
// map.scrollZoom.disable();

var markerIcon = L.icon ({
    iconUrl: '/s/mapmarker.png',
    iconSize: [17, 40],
    iconAnchor: [9, 40]
});

jQuery.getJSON(blogURL, function(data) {
    var posts = data.items;
    jQuery.each(data.collection.tags, placeMarker);

    function placeMarker(i, tag) {
        // For each tag, place a marker on the map at the given location
        geocoder.query(tag, function(error, results) {
            createMarker(tag).setLatLng(results.latlng).addTo(map);
        });
    }

    function createMarker(tag) {
        // Creates a marker which aggregates all posts tagged with a given location
        var taggedPosts = jQuery.grep(posts, function(elem, i) {
            return jQuery.inArray(tag, elem.tags) >= 0;
        });
        //Add any marker magic here
        return L.marker([0, 0], {icon: markerIcon}).bindPopup(markerPopup(tag, taggedPosts));
    }

    function markerPopup(tag, taggedPosts) {
        var popupHTML = '<style> .highlight:hover {color:#365563} </style>';
        popupHTML += '<h2><b>Posts about ' + tag + '</h2></b>\n<ul>';
        jQuery.each(taggedPosts, function(i, post) {
            popupHTML += '<li><a href=' + post.fullUrl + '> ' +
                             post.title + '</a></li>\n';
        });
        return popupHTML + '</ul>';
    }
});
