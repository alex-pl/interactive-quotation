onPageStart['ones'] = ones_init;

function ones_init()
{
    var ones_are = document.getElementById('ones-are');
    var ones_the = document.getElementById('ones-the');
    var ones_ones = document.getElementById('ones-ones');
    
    
    setTimeout(function () 
        {
            ones_are.classList.add('ones-animation'); 
        }, 
        500);
     
    setTimeout(function () 
        {
            ones_the.classList.add('ones-animation'); 
        }, 
        2000);
        
    setTimeout(function () 
        {
            ones_ones.classList.add('ones-animation'); 
        }, 
        3500);
        
    
    window.setTimeout(showNextPage, 5500);
}