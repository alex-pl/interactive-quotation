$(function () {
    
    var pages = ['crazy', 'world'],
        i = 0;

    function loadNext() {
        $.get('html/' + pages[i++] + '.html')
        .then(function (html) {
            $('body').html(html);
            
            if (i < pages.length) {
                loadNext();
            }
        });
    }
    
    loadNext();
    
});
