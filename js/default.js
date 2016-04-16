$(function () {

    $.get('html/crazy.html', function (html) {
        $('main').append(html);
    });
    
});
