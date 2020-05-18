

GetFilmList();
GetFilmtrivia();

var display = document.getElementById("displayContainer");




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
                
                // Skapar ett nytt 'div' och 'h2' element
                var newdiv = document.createElement('div');
                var newH2 = document.createElement('h2');

                

                newdiv.setAttribute("id", "filmTitle");


                // "Hänger på" en ny div på elementet döpt till displayContainer i index.html.
                display.appendChild(newdiv);



                // Hänger på placeholdern på det nya div elementet 
                display.appendChild(placeholder);

                newdiv.appendChild(newH2);

                console.log(placeholder);
                
                newH2.appendChild(document.createTextNode(data));

                
            }

        });
        
        
}






//Tar emot alla filmstudios

function GetFilmstudio () {

    fetch("https://localhost:44361/api/filmstudio")
        .then(res => res.json())
        .then(data => console.log(data));
        
        
    }
    
    



    function GetFilmtrivia () {
        //Tar emot alla filmstrivia
        fetch("https://localhost:44361/api/filmTrivia")
        .then(res => res.json())
        .then( function( res ){
            
            for(i = 0;i < res.length; i++){

                var triviaText = res[i].trivia;

                var text = document.createTextNode(triviaText);

                console.log("Här är de trivia som blivit fetchade: ");
                console.log(text);


                // Kontrollerar om det finns några filmtitlar uppe på hemsidan
                var filmTitle = document.getElementById("filmTitle");
                
                if(filmTitle === null){


                    console.log("Det finns inga filmtitlar uppe på hemsidan");
                    
                }else{
                    
                    

                    newP = document.createElement('p');

                    var filmTitleTextform = document.createTextNode(triviaText);

                    console.log(filmTitleTextform);
                    
                    filmTitle.appendChild(newP);

                    newP.appendChild(filmTitleTextform);
                    



                }
                
                
                
                
                
                
                
                


            }





        });



}


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
    
    
    // STARTSIDAN
    function StartPage(){
        
        
        
        var newUserRegFlexContainer = document.getElementById("newUserRegFlexContainer");
        
        
        header.innerHTML = " ";
        
        // HEADER //
        header.insertAdjacentHTML("afterbegin", '<h1 id="heading0">SVENSKA FILMSTUDIOS </h1><h3 id="heading1">uthyrningstjänst</h3><input id="usernameInputbox" type="text" placeholder="Username..."><input id="passwordInputbox" type="password" placeholder="Password..."><button id="loginButton">Login</button>');
        
        // NAVIGATION //
        navigation.innerHTML = " ";
        navigation.innerHTML = ('<button id="registerUser">Registrera ny användare</button>');
        


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
                    else{

                        
                        //header.insertAdjacentHTML("beforeend", '<h4 style="color:white;">Fel lösenord eller användarnamnn</h4>');

                        console.log("Fel lösenord eller användarnamn")
                    }


                }




            });
                       
            
        });
        
        var registerButton = document.getElementById("registerUser");

        registerButton.addEventListener("click", function () {
        
            console.log("Du tryckte på 'Registrera ny användare'");
            
        
            newUserRegFlexContainer.innerHTML = ""; 
            newUserRegFlexContainer.innerHTML = '<div id="nameInput"><h2>REGISTRERA NY ANVÄNDARE</h2><p>Förnamn: </p><input></dinput ><p>Efternamn:</p><input></input><p>Användarnamn: </p><input></input ><p>Lösenord:</p><input></input><button>REGISTRERA</button><button id="backToPage">GÅ TILLBAKA</button>';
                
            var backButton = document.getElementById("backToPage");


            backButton.addEventListener("click", function () {

                console.log("Du tryckte på 'Gå tillbaka' knappen.");
                newUserRegFlexContainer.innerHTML = " ";
                StartPage();
        


            });


        })



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
        navigation.innerHTML = " ";
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
    
    function CreateNewUser(){
        
        
    }



    var newUserRegFlexContainer;
    
    

    