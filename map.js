mapboxgl.accessToken = 'pk.eyJ1IjoiaHVhbmd5IiwiYSI6ImNpcDBrb241NTAyaWJ1MG00cjc1Nmcwb3UifQ.1q77Pdqwy-hMPyRDdJlfuA';

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/light-v9', //stylesheet location
    center: [0, 0], // starting position
    zoom: 3 // starting zoom
});
