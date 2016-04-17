onPageStart['think'] = think_init;

function think_init()
{
    var think_cloud = document.getElementById('think-cloud');
    
    
    setTimeout(function () 
        {
            think_cloud.classList.add('think-cloud-animation'); 
        }, 
        800);
}