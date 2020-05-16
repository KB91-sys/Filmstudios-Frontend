
GetFilmList();


//Funktionen för att ta emot alla filmer
function GetFilmList(){
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
    .then(data => console.log(data));
    

    //Tar emot alla filmstrivia
fetch("https://localhost:44361/api/filmTrivia")
    .then(res => res.json())
    .then(data => console.log(data));

    //Tar emot alla lånade filmer
fetch("https://localhost:44361/api/rentedFilm")
    .then(res => res.json())
    .then(data => console.log(data));







    
    

    
    
    // NOTIS: InnerHTML ersätter allt med nytt material. Kan vara bra att använda när man vill ta bort en vy
    // insertadjacenthtml = dela upp och lägga till nytt innehåll i en vy
    
    var header = document.getElementById("headerContent");
    var navigation = document.getElementById("navigation");



    // Kollar om användaren är inloggad genom att söka genom localstorage
    if(localStorage.getItem("userId") !== null)
    {

        var name = localStorage.getItem("userId");

        LoginPage(name);
    }
    else{
                
        StartPage();
        
    }
    
    
    
    //localStorage.clear();
    
    // STARTSIDAN
    function StartPage(){
        
        header.innerHTML = "";
        
        // HEADER //
        header.insertAdjacentHTML("afterbegin", '<h1 id="heading0">SVENSKA FILMSTUDIOS </h1><h3 id="heading1">uthyrningstjänst</h3><input id="usernameInputbox" type="text" placeholder="Username...">    <input id="passwordInputbox" type="password" placeholder="Password..."><button id="loginButton">Login</button>');
        
        // NAVIGATION //
        navigation.innerHTML = "";
        navigation.innerHTML = ('<h3 id="registerUser">Registrera ny användare</h3>');
        
        //Input text och knapp
        var loginButton = document.getElementById("loginButton");
                
        loginButton.addEventListener("click", function () { 
            
            
            var passwordInput = document.getElementById("passwordInputbox").value;
            var usernameInput = document.getElementById("usernameInputbox").value;
            
            console.log("Du har tryckt på login knappen!");
            console.log("Username: " + usernameInput + " Password: " + passwordInput);
            
            
            
            fetch("users.json")
            .then(function(data){
                
                return data.json();
            
            
            })
            .then(function(jsonData){

                console.log(jsonData);

                for(i = 0; i < jsonData.length; i++){

                    if(usernameInput == jsonData[i].userName && passwordInput == jsonData[i].password){


                        localStorage.setItem("userId", usernameInput);
                        
                        LoginPage(usernameInput);
                        

                    }



                }




            });
                       
            
        });
        
        
        
        
    }
    
        
    // INLOGGAD ANVÄNDARES VY
    function LoginPage(usernameInput){
        
        header.innerHTML = " ";


        // HEADER //
        header.insertAdjacentHTML("afterbegin", '<h1 id="heading0">SVENSKA FILMSTUDIOS </h1><h3 id="heading1">uthyrningstjänst</h3><button id="logoutButton">Logout</button>');
        
        var createh2 = document.createElement('h2');
        createh2.appendChild(document.createTextNode("Välkommen " + usernameInput));
        header.appendChild(createh2);        
        
        // NAVIGATION //
        navigation.innerHTML = "";
        navigation.innerHTML = ('<h3>Låna film</h3><h3>Lämna tillbaka film</h3><h3>Skriv en trivia</h3>');
        
        
        var logout = document.getElementById("logoutButton");

        // LOGUT KNAPP //        
        logout.addEventListener("click", function () {
            console.log("Du tryckte på logout knappen. Går tillbaka till startPage"); 
            
            localStorage.clear();
            
            StartPage();
        
        
        
        });
        
        
        
        
    }
    
    
    

    
    //Skapar ny användare
    
    function createNewUser(){
        
        
        
        
    }
    