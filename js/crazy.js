function crazy() {

    var interval,
        index = 0,
        letters = document.querySelectorAll('#crazy-crazy span');
    
    function showLetter() {
        
        // show letter
        var letter = letters[index++]; 
        letter.classList.add('visible');
        
        console.log(letter);
        
        // clear interval if finished
        if (index >= letters.length) {
            window.clearInterval(interval);
        }
        
    }
    
    interval = window.setInterval(showLetter, 1500);
    
}
