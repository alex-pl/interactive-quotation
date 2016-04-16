var pageCallbacks = {};

$(function () {
    
    var pages = ['crazy', 'world'],
        i = 0;

    function loadNextPage(resolve) {
        $.get('html/' + pages[i++] + '.html')
        .then(function (html) {
            $('main').append(html);
            
            if (i < pages.length) {
                loadNextPage(resolve);
            } else {
                resolve();
            }
        });
    }

    function loadPages() {
        return new Promise(function (resolve) {
            loadNextPage(resolve);
        });
    }
    
    function initialize() {
        // set active page
        var activePage = 0,
            hash = window.location.hash.substr(1);
        
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (page === hash) {
                activePage = i;
                break;
            }
        }
        
        document.getElementsByClassName(page)[0].classList.add('active');
        
        // start page script if available
        typeof pageCallbacks[pages[i]] == 'function' && pageCallbacks[pages[i]]();
    }
    
    loadPages().then(initialize)
    
    
});


function ChangeGlobalColors(event)
{
    var screenWidth = $(document).width();
    var screenHeight = $(document).height();
    var x = event.clientX;
    var y = event.clientY;
    
    var hue = x / screenWidth;
    var saturation = y / screenHeight;
    
    var rgb = hsv2rgb(hue, 1, 1);
    //alert(rgb.r + ' ' + rgb.g + ' ' + rgb.b);
    var color = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
    
    // Apply style
    var elements = document.getElementsByClassName('background-color-dark');
    
    for (var i = 0; i < elements.length; i++)
    {
        elements[i].style.fill = color;
        elements[i].style.backgroundColor = color;
    }   
}

// http://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
function hsv2rgb(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

// http://stackoverflow.com/questions/8022885/rgb-to-hsv-color-in-javascript
function rgb2hsv () {
    var rr, gg, bb,
        r = arguments[0] / 255,
        g = arguments[1] / 255,
        b = arguments[2] / 255,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c) {
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        }else if (g === v) {
            h = (1 / 3) + rr - bb;
        }else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}