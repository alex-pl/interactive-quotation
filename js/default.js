var pageCallbacks = {}, // deprecated, use onPageStart instead!
    onPageLoaded = {},
    //onPageVisible = {},
    onPageStart = {},
    //onPageStop = {},
    onPageHidden = {},
    
    showNextPage;

$(function () {
    
    var pages = ['intro', 'because', 'crazy', 'think', 'change', 'world', 'ones', 'do', 'overview'],
        i = 0;

    function loadNextPage(resolve) {
        $.get('html/' + pages[i] + '.html')
        .then(function (html) {
            $('main').append(html);
            typeof onPageLoaded[pages[i]] == 'function' && onPageLoaded[pages[i]]();
            
            i++;
            
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
    
    var activePage = 0;
    
    function setActivePage() {
        // set active page
        var hash = window.location.hash.substr(1);
        
        // hide old page
        document.getElementsByClassName(pages[activePage])[0].classList.remove('active');
        typeof onPageHidden[pages[activePage]] == 'function' && onPageHidden[pages[activePage]]();
        
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (page === hash) {
                activePage = i;
                break;
            }
        }
        
        document.getElementsByClassName(page)[0].classList.add('active');
        
        // start page script if available
        typeof onPageStart[pages[i]] == 'function' && onPageStart[pages[i]]();
        typeof pageCallbacks[pages[i]] == 'function' && pageCallbacks[pages[i]]();
    }
    
    function scaleDefaultContent() {
        var container = $('.default-content'),
        
            contentHeight = container.height(),
            windowHeight = $(window).height();
        
        container.css('transform', 'scale(' + (windowHeight / contentHeight) + ')');
    }
    
    function initialize() {    
        setActivePage();
        window.addEventListener('hashchange', setActivePage, false);
        
        scaleDefaultContent();
        window.addEventListener('resize', scaleDefaultContent, false);
    }
    
    showNextPage = function () {
        
        // hide old page
        document.getElementsByClassName(pages[activePage])[0].classList.remove('active');
        typeof onPageHidden[pages[activePage]] == 'function' && onPageHidden[pages[activePage]]();
        
        // select next page
        if (++activePage >= pages.length) {
            activePage = 0;
        }
        
        // show new page
        document.getElementsByClassName(pages[activePage])[0].classList.add('active');
        // start page script if available
        typeof onPageStart[pages[activePage]] == 'function' && onPageStart[pages[activePage]]();
        typeof pageCallbacks[pages[activePage]] == 'function' && pageCallbacks[pages[activePage]]();
        
    };
    
    loadPages().then(initialize);
    
});


function ChangeGlobalColors(event)
{
    var screenWidth = $(document).width();
    var screenHeight = $(document).height();
    var x = event.clientX;
    var y = event.clientY;
    
    var hue = x / screenWidth;
    var saturation = (y + screenHeight) / (screenHeight + screenHeight);
    
    var rgbMedium = hsv2rgb(hue, saturation - 0.35, 1);
    var rgbDark = hsv2rgb(hue, saturation, 1);
    var rgbDarker = hsv2rgb(hue, saturation, 0.5);
    
    var colorMedium = 'rgb(' + rgbMedium.r + ', ' + rgbMedium.g + ', ' + rgbMedium.b + ')';
    var colorDark = 'rgb(' + rgbDark.r + ', ' + rgbDark.g + ', ' + rgbDark.b + ')';
    var colorDarker = 'rgb(' + rgbDarker.r + ', ' + rgbDarker.g + ', ' + rgbDarker.b + ')';
    
    // noch für die anderen farbklassen implementieren
    
    
    
    // Apply style
    var elements;
    
    // Medium
    elements = document.getElementsByClassName('background-color-medium');
    for (var i = 0; i < elements.length; i++)
    {
        elements[i].style.fill = colorMedium;
        elements[i].style.backgroundColor = colorMedium;
    }   
    
    elements = document.getElementsByClassName('text-color-medium');
    for (var i = 0; i < elements.length; i++)
    {
        elements[i].style.stroke = colorMedium;
        elements[i].style.color = colorMedium;
    }   
    
    // Dark
    elements = document.getElementsByClassName('background-color-dark');
    for (var i = 0; i < elements.length; i++)
    {
        elements[i].style.fill = colorDark;
        elements[i].style.backgroundColor = colorDark;
    }   
    
    elements = document.getElementsByClassName('text-color-dark');
    for (var i = 0; i < elements.length; i++)
    {
        elements[i].style.stroke = colorDark;
        elements[i].style.color = colorDark;
    }  
    
    // Darker
    elements = document.getElementsByClassName('background-color-darker');
    for (var i = 0; i < elements.length; i++)
    {
        elements[i].style.fill = colorDarker;
        elements[i].style.backgroundColor = colorDarker;
    }   
    
    elements = document.getElementsByClassName('text-color-darker');
    for (var i = 0; i < elements.length; i++)
    {
        elements[i].style.stroke = colorDarker;
        elements[i].style.color = colorDarker;
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