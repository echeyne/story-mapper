// create a div to store the map
var mapDiv = document.createElement('div');
mapDiv.id = 'map';
mapDiv.className = 'map'
document.getElementsByTagName('body')[0].appendChild(mapDiv);

// SETTING UP THE LAYOUT OF THE SLIDER
var map_height = $('.map').height();
var map_width = $('.map').width();

// slider arrows
var back_slider = document.createElement('img');
back_slider.src = 'images/back-arrow.png';
back_slider.id = 'back-arrow';
back_slider.className = 'back-arrow disabled-arrow';

var forward_slider = document.createElement('img');
forward_slider.src = 'images/forward-arrow.png';
forward_slider.id = 'forward-arrow';
forward_slider.className = 'forward-arrow';

// div to store content of slides
var sliderDiv = document.createElement('div');
sliderDiv.id = 'slider-content';
sliderDiv.className = 'slider-content';

// every time the window is resized check the dimensions
$(window).on('resize', function(){
    var win = $(this);
    if (win.width() <= 700) {
        mobileLayout();
    }
    if (win.width() > 700) {
        if (json_content['storymap']['layout'] == 'left') {
            leftLayout();
        } else {
            topLayout();
        }
    }
});

if (json_content['storymap']['layout'] == 'left') {
    leftLayout();
} else {
    topLayout();
}

document.getElementById('map').appendChild(sliderDiv);
document.getElementById('map').appendChild(forward_slider);
document.getElementById('map').appendChild(back_slider);

function leftLayout() {
    sliderDiv.classList.add('left-layout');
    sliderDiv.style.right = 0;
    sliderDiv.style.height = '100%';
    sliderDiv.style.width = '40%';
    sliderDiv.style.paddingLeft = "10%";
    forward_slider.style.top = '50%';
    back_slider.style.top = '50%';
}

function topLayout() {
    sliderDiv.classList.add('top-layout');
    sliderDiv.style.height = map_height/2  + 'px';
    sliderDiv.style.width = '100%   ';
    sliderDiv.style.top = "50%";
    forward_slider.style.top = '75%';
    back_slider.style.top = '75%';
}

function mobileLayout() {
    sliderDiv.classList.add('mobile-layout');
    if (json_content['storymap']['layout'] == 'left') {
        sliderDiv.classList.remove('left-layout')
    } else {
        sliderDiv.classList.remove('top-layout');
    }

    sliderDiv.style.height = map_height/2  + 'px';
    sliderDiv.style.width = '100%   ';
    sliderDiv.style.top = '0';
    sliderDiv.style.position = 'relative';
    forward_slider.style.top = '75%';
    back_slider.style.top = '75%';
    document.getElementById('map').style.height = '150px';

    document.getElementById('map').removeChild(sliderDiv);
    document.getElementById('map').removeChild(forward_slider);
    document.getElementById('map').removeChild(back_slider);

    $(sliderDiv).after('#map');
    //document.getElementById('slider-content').appendChild(forward_slider);
    //document.getElementById('slider-content').appendChild(back_slider);

}