var btn = document.querySelector('#btn');
var img = document.querySelector('#photo'); 

//listen for clickes
btn.addEventListener('click', function(){
    //make request
    var XHR =  new XMLHttpRequest();
    
    XHR.onreadystatechange = function(){
        if(XHR.readyState == 4 && XHR.status == 200){
           //JSON Parse turns it into something we can use
            JSON.parse(XHR.responseText)
            //this saves the message portion of the JSON.parse we  want
            //.message has the picture url we need for the pictures
           var url = JSON.parse(XHR.responseText).message; 
           //reset the image src to equal our new url 
           img.src=  url;  
        }
    }
    
    XHR.open("GET", "https://dog.ceo/api/breeds/image/random")
    XHR.send(); 


})