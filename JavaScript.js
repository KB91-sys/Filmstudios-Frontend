


    var header = document.getElementById("headerContent");
    var navigation = document.getElementById("navigation");
    var content = document.getElementById("displayContainer");
    var loanPage = document.getElementById("loanParentContainer");
    
    
    // Kollar om användaren är inloggad genom att söka genom localstorage
    if(localStorage.getItem("userId") !== null)
    {
        
        var name = localStorage.getItem("userId");
        
        LoginPage(name);
        
    }
    else{
        
        StartPage();
        
    }
    
    
    var loanPageInfoBox = document.getElementById("loanInfo");
    
    
    var filmNameArray = [];
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
                
                var filmName = jsonForm[i].name;
                
                var placeholder = document.createElement('img');
                placeholder.src = "./PlaceHolders/JurassicPark1.jpg";
                
                // Skapar ett nytt 'div' och 'h2' element
                var newdiv = document.createElement('div');
                var newH2 = document.createElement('h2');                
                
                newdiv.setAttribute("id", "filmTitle");
                
                // "Hänger på" en ny div på elementet döpt till content i index.html.
                content.appendChild(newdiv);
                
                // Hänger på placeholdern på det nya div elementet 
                content.appendChild(placeholder);
                
                newdiv.appendChild(newH2);
                
                console.log(placeholder);
                
                newH2.appendChild(document.createTextNode(filmName));
                               
               
                console.log(filmNameArray)

                var filmExist = filmNameArray.includes(filmName);

                if(filmExist == false){
                        

                    console.log("Film/filmer som lagts till i listan: " + filmName + "\n");

                    filmNameArray.push(filmName);
                

                }
                
                
                
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
    


    // STARTSIDAN
    function StartPage(){
        
        GetFilmList();
        GetFilmtrivia();
        
        
        var newUserRegregistration = document.getElementById("newUserRegregistration");
        
        loanPage.innerHTML = " ";
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
        




        // REGISTRERINGSFUNKTIONEN
        var registerButton = document.getElementById("registerUser");

        registerButton.addEventListener("click", function () {
        
            console.log("Du tryckte på 'Registrera ny användare'");
            
        
            newUserRegregistration.innerHTML = ""; 
            newUserRegregistration.innerHTML = '<div id="nameInput"><h2>REGISTRERA NY ANVÄNDARE</h2><p>Förnamn: </p><input></dinput ><p>Efternamn:</p><input></input><p>Användarnamn: </p><input></input ><p>Lösenord:</p><input></input><button>REGISTRERA</button><button id="backToPage">GÅ TILLBAKA</button>';
                
            var backButton = document.getElementById("backToPage");


            backButton.addEventListener("click", function () {

                console.log("Du tryckte på 'Gå tillbaka' knappen.");
                newUserRegregistration.innerHTML = " ";
                StartPage();
        


            });


        })



    }
    



        
    // INLOGGAD ANVÄNDARES VY
    function LoginPage(usernameInput){
        
        
        header.innerHTML = " ";
        loanPage.innerHTML = " ";
        
        GetFilmList();
        GetFilmtrivia();
        
        

        // HEADER //
        header.insertAdjacentHTML("afterbegin", '<h1 id="heading0">SVENSKA FILMSTUDIOS </h1><h3 id="heading1">uthyrningstjänst</h3><button id="logoutButton">Logout</button>');
        
        var createh2 = document.createElement('h2');

        createh2.setAttribute("id", "welcomeMessage");

        createh2.appendChild(document.createTextNode("Välkommen " + usernameInput));
        header.appendChild(createh2);        
        
        // NAVIGATION //
        
        navigation.innerHTML = " ";
        navigation.innerHTML = ('<button id="loanReturn">Låna/Lämna tillbaka film</button><button id="triviaButton">Skriv en trivia</button>');
        
        
        
        // LOGUT KNAPP //        
        var logout = document.getElementById("logoutButton");
        
        logout.addEventListener("click", function () {
            console.log("Du tryckte på logout knappen. Går tillbaka till startPage"); 
            
            localStorage.clear();
            
            StartPage();
        
        
        
        });
        
        // KNAPP FÖR ATT KOMMA TILL LÅNA/LÄMNA TILLBAKA SIDAN
        var loanReturnButton = document.getElementById("loanReturn");
        
        loanReturnButton.addEventListener("click", function () {
            
            content.innerHTML = " ";

            loanPage.innerHTML = '<div id="loanInfo"><p>[BIOGRAF]</p><div id="borrowedMovies"><p id="borrowedMovies" >Lånade filmer:</p></div></div>';
             
            //'<div id="availableFilmsParentContainer"></div>';
            
            LoanReturnPage();                
            
        });
        
        
        
    }
    
    
    
    
    





   
    // Hämtar data från GetFilmList metoden och sätter in den i loanReturn (lånsidan) elementet
    function LoanReturnPage(){
        
        var i = 0;

        for(const f of filmNameArray)
        {
            i++;

            console.log("En eller flera titlar finns redan med i listan.");
            
            var newDiv = document.createElement('div');
            
            var newButton1 = document.createElement('button');
            var newButton2 = document.createElement('button');
                
            newButton1.innerHTML = "LÅNA";
            newButton2.innerHTML = "RETURNERA";
            
            newDiv.appendChild(document.createTextNode(f));
            newDiv.appendChild(newButton1);
            newDiv.appendChild(newButton2);
            
            
            newDiv.setAttribute("id", "availableFilmsChildContainer" + i);
            newButton1.setAttribute("class", "loanButton");
            newButton2.setAttribute("class", "returnButton");


            loanPage.appendChild(newDiv);           
        
        }
        
    
       var loanButton = document.getElementsByClassName("loanButton");
       
        for(var i = 0; i < loanButton.length; i++){

            loanButton[i].addEventListener("click", function(e) 
            {
                var parentElementId = e.target.parentNode.id;

                console.log(parentElementId);
                
                var getTextvalue = document.getElementById(parentElementId).textContent;

                console.log(getTextvalue);

                var getFilmtitle = getTextvalue.replace("LÅNARETURNERA", "");

                console.log(getFilmtitle);
                
                
                newdiv = document.createElement('div');

                newdiv.insertAdjacentHTML("afterbegin", getFilmtitle);

                var borrowedMovies = document.getElementById("borrowedMovies");
                
                borrowedMovies.appendChild(newdiv);

            });

        }

        // LOGUT KNAPP //        
        var logout = document.getElementById("logoutButton");
        
        logout.addEventListener("click", function () {
            console.log("Du tryckte på logout knappen. Går tillbaka till startPage"); 
            
            localStorage.clear();
            
            StartPage();
        
        
        
        });
        

    }
    


    
    //Skapar ny användare
    
    function CreateNewUser(){
        
        
    }




    function WriteTrivia(){

        newUserRegregistration.innerHTML = '<div id="nameInput"><h2>REGISTRERA NY ANVÄNDARE</h2><p>Förnamn: </p><input></dinput ><p>Efternamn:</p><input></input></div>';




    }
