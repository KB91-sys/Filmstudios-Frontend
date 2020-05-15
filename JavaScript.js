
getFilmList();


//Funktionen för att ta emot alla filmer
function getFilmList(){
    fetch("https://localhost:44361/api/film")
        .then(function (fetchedData){
            return fetchedData.json();        
        })
        .then(function (jsonForm) {
            
            console.log("filmList", jsonForm)
            
            for(i = 0; i < jsonForm.length; i++){
                
                console.log(jsonForm[i].name); 
                
                var data = jsonForm[i].name;
                
                
                var placeholder = document.createElement('img');
                placeholder.src = "./PlaceHolders/JurassicPark1.jpg";
                

                // Skapar ett nytt 'div' element
                var newdiv = document.createElement('div');

                
                var display = document.getElementById("displayContainer");

                // "Hänger på" en ny div på elementet döpt till displayContainer i index.html.
                display.appendChild(newdiv);

                // Hänger på placeholdern på det nya div elementet 
                newdiv.appendChild(placeholder);

                console.log(placeholder);
                
                // Gör om den "fetchade" json datan och sätter in den i det nya div elementet,
                // som nu förljdaktligen är inne i elementet benämnt displayContainer.
                newdiv.appendChild(document.createTextNode(data));
                
                /*
                printedFilmList.insertAdjacentHTML("beforeend", jsonForm[i].name);
                */

            }

        });
        
        
}


//Tar emot alla filmstudios
fetch("https://localhost:44361/api/filmstudio")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(errorCode => console.log("ERROR"));

    //Tar emot alla filmstrivia
fetch("https://localhost:44361/api/filmTrivia")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(errorCode => console.log("ERROR"));

    //Tar emot alla lånade filmer
fetch("https://localhost:44361/api/rentedFilm")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(errorCode => console.log("ERROR"));







// LOGIN KOD

// NOTIS: InnerHTML ersätter allt med nytt material. Kan vara bra att använda när man vill ta bort en vy
// insertadjacenthtml = dela upp och lägga till nytt innehåll i en vy

var logedInPage = document.getElementById("logedinContent");




var loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", function() { 
        
        
    var passwordInput = document.getElementById("passwordInputbox").value;
    var usernameInput = document.getElementById("usernameInputbox").value;
    
    console.log("Du har tryckt på login knappen!")
    console.log("Username: " + usernameInput + " Password: " + passwordInput);
    
    
} );
    
    
    
    
    
    
