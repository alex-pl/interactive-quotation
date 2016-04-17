onPageStart['do'] = do_init;

function do_init()
{
    var do_that = document.getElementById('do-that');
    var do_do = document.getElementById('do-do');
    
    setTimeout(function () 
        {
            do_that.classList.add('do-left-animation'); 
        }, 
        1000);
     
    setTimeout(function () 
        {
            do_do.classList.add('do-right-animation'); 
        }, 
        2000);
        
    window.setTimeout(showNextPage, 9500);
}