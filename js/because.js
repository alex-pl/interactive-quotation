onPageStart['because'] = because_init;

function because_init()
{
    var letter_b = document.getElementById('because-letter-B');
    var letter_e1 = document.getElementById('because-letter-E1');
    var letter_c = document.getElementById('because-letter-C');
    var letter_a = document.getElementById('because-letter-A');
    var letter_u = document.getElementById('because-letter-U');
    var letter_s = document.getElementById('because-letter-S');
    var letter_e2 = document.getElementById('because-letter-E2');

    var because_the = document.getElementById('because-the');
    var because_ones = document.getElementById('because-ones');
    var because_that = document.getElementById('because-that');
    var because_are = document.getElementById('because-are');
        
    var because_start = 800;
    var because_offset = 100;
    
    var because_the_start = 2000;
    var because_ones_start = 2300;
    var because_that_start = 3300;
    var because_are_start = 3900;
    
    
    setTimeout(function () 
        {
            letter_b.classList.add('because-letter-animation'); 
        }, 
        because_start + because_offset * 0);
    setTimeout(function () 
        {
            letter_e1.classList.add('because-letter-animation'); 
        }, 
        because_start + because_offset * 1);
    setTimeout(function () 
        {
            letter_c.classList.add('because-letter-animation'); 
        }, 
        because_start + because_offset * 2);
    setTimeout(function () 
        {
            letter_a.classList.add('because-letter-animation'); 
        }, 
        because_start + because_offset * 3);
    setTimeout(function () 
        {
            letter_u.classList.add('because-letter-animation'); 
        }, 
        because_start + because_offset * 4);
    setTimeout(function () 
        {
            letter_s.classList.add('because-letter-animation'); 
        }, 
        because_start + because_offset * 5);
    setTimeout(function () 
        {
            letter_e2.classList.add('because-letter-animation'); 
        }, 
        because_start + because_offset * 6);
        
        
    setTimeout(function () 
        {
            because_the.classList.add('because-plop-animation'); 
        }, 
        because_the_start);
        
    setTimeout(function () 
        {
            because_ones.classList.add('because-plop-animation'); 
        }, 
        because_ones_start);
        
    setTimeout(function () 
        {
            because_that.classList.add('because-plop-animation'); 
        }, 
        because_that_start);
        
    setTimeout(function () 
        {
            because_are.classList.add('because-plop-animation'); 
        }, 
        because_are_start);
}