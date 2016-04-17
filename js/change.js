(function () {
    
    var text;
    
    onPageLoaded['change'] = function () {
        text = document.getElementById('change-svg-text-path');
    };
    
    onPageStart['change'] = function () {
        
        window.setTimeout(function () {
            document.getElementById('change-they').classList.add('visible');

            window.setTimeout(function () {
                document.getElementById('change-can').classList.add('visible');
                
                window.setTimeout(function () {
            
                    $(text).animate(
                    { x: 78 },
                    {
                        duration: 2000,
                        step: function(now) {
                            text.setAttribute('startOffset', now + '%');
                        }

                    }, 'easeOutBounce');

                }, 1200);
            }, 1000);
        }, 1000);
    };
})()