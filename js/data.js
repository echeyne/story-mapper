// gets information from user's json file --> assume it is called map.json

var map;
var coords_array = [];
var current_point = -1; // -1 because map is not focused on any points to begin with
var map_points = [];

//$.getJSON("map.json", function(json) {
//    var json_content = json;
//}).done(function(json) {
//    var slides_array = [];
//
//    for (var i=0; i<json["storymap"]["slides"].length; i++) {
//        slides_array.push(json["storymap"]["slides"][i]);
//    }
//
//    createMap(createGeoJSON(slides_array));
//
//});

var slides_array = [];
for (var i=0; i<json_content["storymap"]["slides"].length; i++) {
    slides_array.push(json_content["storymap"]["slides"][i]);
}

createMap(createGeoJSON(slides_array));

// create a GeoJson containing all points and lines connecting points
function createGeoJSON(slides_array) {
    var features = [];

    for (var i=0; i<slides_array.length; i++) {

        var lon = slides_array[i]["location"]["lon"];
        var lat = slides_array[i]["location"]["lat"];

        var currFeature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [lon, lat]
            },
            "properties": {
                "id": i,
                "text": {
                    "headline": slides_array[i]["text"]["headline"],
                    "text": slides_array[i]["text"]["text"]
                },
                "media": {
                    "url": slides_array[i]["media"]["url"],
                    "caption": slides_array[i]["media"]["caption"],
                    "credit": slides_array[i]["media"]["credit"]
                }
            }
        };

        features.push(currFeature);
        map_points[i] = currFeature;

        // if not currently at the first point create a line from one point to another
        if (coords_array.length > 0) {
            currFeature = { "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [coords_array[coords_array.length-1][1], coords_array[coords_array.length-1][0]], [lon, lat]
                    ]
                }
            }
            features.push(currFeature);
        }

        coords_array.push([lat, lon]);
    }

    return mapFeatures = {
        "type": "FeatureCollection",
        "features" : features
    };
}

function createMap(mapFeatures) {
    map = L.map('map');

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'emilymillard.m3a5d7j0',
        accessToken: 'pk.eyJ1IjoiZW1pbHltaWxsYXJkIiwiYSI6Imo1TERwV2MifQ.hivsz8wfoT-yZpkfZoN62A'
    }).addTo(map);

    var layer = L.geoJson(mapFeatures, {
        onEachFeature: onEachFeature
    }).addTo(map);

    // make zoom of map fit all of the markers
    var bounds = new L.LatLngBounds(coords_array);
    map.fitBounds(bounds);
}

function onEachFeature(feature, layer) {
    layer.on('click', function (e) {
        console.log("layer click");
        changeSlide(feature["properties"]["id"]);
    });
}

// disable dragging when the user's mouse enters the slider container
document.getElementById('slider-content').addEventListener('mouseover', function () {
    map.dragging.disable();
    map.scrollWheelZoom.disable();
});

// re-enable dragging when the the user's cursor leaves the slider container
document.getElementById('slider-content').addEventListener('mouseout', function () {
    map.dragging.enable();
    map.scrollWheelZoom.enable();
});
