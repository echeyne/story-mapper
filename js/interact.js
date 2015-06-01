// handles interaction of user with map

$('#forward-arrow').click(function(){
    if (current_point < map_points.length-1) {
        changeSlide(current_point+1);
    }
});

$('#back-arrow').click(function() {
    if (current_point > 0) {
        changeSlide(current_point-1);
    }
});

function changeSlide(point_id) {
    //map.panTo([parseFloat(map_points[point_id]["geometry"]["coordinates"][1]), parseFloat(map_points[point_id]["geometry"]["coordinates"][0])]);

    map.setView([parseFloat(map_points[point_id]["geometry"]["coordinates"][1]), parseFloat(map_points[point_id]["geometry"]["coordinates"][0]), {zoom:14}, {animate:true}]);

    current_point = map_points[point_id]["properties"]["id"];

    // handle hiding/showing arrows
    if (current_point <= 0 && !(document.getElementById("back-arrow").classList.contains('disabled-arrow'))) {
        document.getElementById("back-arrow").classList.add('disabled-arrow');
    }

    if (current_point >= 1 && document.getElementById("back-arrow").classList.contains('disabled-arrow')) {
        document.getElementById("back-arrow").classList.remove('disabled-arrow');
    }

    if (current_point >= map_points.length-1 && !(document.getElementById("forward-arrow").classList.contains('disabled-arrow'))) {
        document.getElementById("forward-arrow").classList.add('disabled-arrow');
    }

    if (current_point <= map_points.length-2 && document.getElementById("forward-arrow").classList.contains('disabled-arrow')) {
        document.getElementById("forward-arrow").classList.remove('disabled-arrow');
    }

    // create nodes to add to slider div
    var headline = document.createTextNode(map_points[point_id]["properties"]["text"]["headline"]);
    var headline_node = document.createElement('h2');
    headline_node.appendChild(headline);

    var text = document.createTextNode(map_points[point_id]["properties"]["text"]["text"]);
    var text_node = document.createElement('p');
    text_node.appendChild(text);

    var image_node = document.createElement('img');
    image_node.src = map_points[point_id]["properties"]["media"]["url"];
    image_node.id = 'slider-image';
    image_node.className = 'slider-image';

    var caption = document.createTextNode(map_points[point_id]["properties"]["media"]["caption"]);
    var caption_node = document.createElement('p');
    caption_node.appendChild(caption);
    caption_node.className = 'img-caption';

    var credit = document.createTextNode(map_points[point_id]["properties"]["media"]["credit"]);
    var credit_node = document.createElement('p');
    credit_node.appendChild(credit);
    credit_node.className = 'img-credit'

    if ($('.slider-content').children().length > 0) {
        $('.slider-content').empty();
    }

    $(image_node).appendTo('.slider-content');
    $(caption_node).appendTo('.slider-content');
    $(credit_node).appendTo('.slider-content');
    $(headline_node).appendTo('.slider-content');
    $(text_node).appendTo('.slider-content');
}