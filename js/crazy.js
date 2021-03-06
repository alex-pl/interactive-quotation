'use strict';

(function () {

    var letters,
        
        videoWidth,
        videoHeight,
        marginTop,
        marginLeft,
        streaming = false,
        video = null,
        not_supported = 'Der Zugriff auf die Webcam ist fehlgeschlagen. Bitte verwenden Sie für den Zugriff auf die Fotofunktion eine aktuelle Version von Firefox, Chrome, Opera oder Edge und stellen sie sicher, dass keine zweite Anwendung auf die Webcam zugreift.';

    function init() {
        
        letters = document.querySelectorAll('#crazy-crazy span');
        
        video = document.getElementById('crazy-video');
        
        navigator.getMedia = (navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia);

        if (typeof navigator.getMedia === 'undefined') {
            window.alert(not_supported);
            window.close();
            return;
        }
        
        navigator.getMedia(
            {
                video: true,
                audio: false
            },
            function (stream) {
                if (navigator.mozGetUserMedia) {
                    video.mozSrcObject = stream;
                } else {
                    var vendorURL = window.URL || window.webkitURL;
                    video.src = vendorURL.createObjectURL(stream);
                }
                
                video.onloadedmetadata = function (e) {
                    video.play();
                };
            },
            function (err) {
                window.alert(not_supported);
                window.close();
                window.console.error(err);
            }
        );

        video.addEventListener('canplay', function (ev) {
            if (!streaming) {
                
                var videoRatio = video.videoWidth / video.videoHeight,
                    //photoRatio = width / height;
                
//                if (videoRatio > photoRatio) {
//                    // video width > photo width => video height is important
//                    videoHeight = height;
//                    videoWidth = videoRatio * height;
//                    
//                    marginLeft = - (videoWidth - width) / 2;
//                    marginTop = 0;
//                    
//                } else {
//                    // video width is important
//                    videoWidth = width;
//                    videoHeight = videoRatio * width;
//                }
//                
//                video.setAttribute('width', videoWidth);
//                video.setAttribute('height', videoHeight);
//                
//                video.style.marginTop = marginTop + 'px';
//                video.style.marginLeft = marginLeft + 'px';
                
                streaming = true;
            }
        }, false);
    
    }
    
    function start() {
        var interval,
            index = 0;

        function showLetter() {
            // show letter
            var letter = letters[index++]; 
            letter.classList.add('visible');

            // clear interval if finished
            if (index >= letters.length) {
                window.clearInterval(interval);
                startEnough();
            }
        }

        interval = window.setInterval(showLetter, 100);
    }
    
    function startEnough() {
        document.getElementById('crazy-enough').classList.add('visible');
        
        window.setTimeout(showNextPage, 10000);
    }
    
    function reset() {
        for (var i = 0; i < letters.length; i++) {
            var letter = letters[i];
            letter.classList.remove('visible');
        }
    }

    onPageLoaded['crazy'] = init;
    onPageStart['crazy'] = start;
    onPageHidden['crazy'] = reset;

})();
