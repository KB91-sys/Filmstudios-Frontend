
    
    var header = document.getElementById("headerContent");
    var navigation = document.getElementById("navigation");
    var content = document.getElementById("displayContainer");
    var loanPage = document.getElementById("loanParentContainer");
    var filmTitle = document.getElementById("filmTitle");
    var userTrivia = document.getElementById("userTrivia");

    var filmNameArray = [];
    

    
    if(sessionStorage.getItem("userId") !== null){
        
        var userName = sessionStorage.getItem("userId");
        
        
        LoginPage();
        
        
    }else{
        
        StartPage();
        


    }

    
    var loanPageInfoBox = document.getElementById("loanInfo");
    
    
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
                
                filmTitle = newdiv;
                
                // "Hänger på" en ny div på elementet döpt till content i index.html.
                content.appendChild(newdiv);
                
                // Hänger på placeholdern på det nya div elementet 
                content.appendChild(placeholder);
                
                newdiv.appendChild(newH2);
                
                console.log(placeholder);
                
                newH2.appendChild(document.createTextNode(filmName));
                                
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
        
    
        
        
    
    
    //Tar emot alla filmstrivia
    
    function GetFilmtrivia () {
        fetch("https://localhost:44361/api/filmTrivia")
        .then(res => res.json())
        .then( function( res ){
                
                for(i = 0;i < res.length; i++){
                    
                    var triviaText = res[i].trivia;
                    
                    var text = document.createTextNode(triviaText);
                    
                    console.log("Här är de trivia som blivit fetchade: ");
                    console.log(text);
                    
                                        
                    // Kontrollerar om det finns några filmtitlar uppe på hemsidan
                    
                    if(filmTitle === null)
                    {
                        
                        console.log("Det finns inga filmtitlar uppe på hemsidan");
                        
                    }else{
                        
                        
                        
                        newP = document.createElement('p');
                        
                        var filmTitleTextform = document.createTextNode(triviaText);
                        
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

    
    
    // STARTSIDAN
    function StartPage(){
        
        GetFilmList();
        GetFilmtrivia();
        GetUserTrivia();
        
        var newUserRegregistration = document.getElementById("newUserRegregistration");
        
        loanPage.innerHTML = " ";
        header.innerHTML = " ";
        content.innerHTML = " ";

        // HEADER //
        header.insertAdjacentHTML("afterbegin", '<h1 id="heading0">SVENSKA FILMSTUDIOS </h1><h3 id="heading1">uthyrningstjänst</h3><input id="usernameInputbox" type="text" placeholder="Username..."><input id="passwordInputbox" type="password" placeholder="Password..."><button id="loginButton">Login</button>');
        
        // NAVIGATION //
        navigation.innerHTML = " ";
        navigation.innerHTML = ('<button id="registerUser">Registrera ny användare</button>');
        
        
        
        //Input text och knapp
        var loginButton = document.getElementById("loginButton");
                
        loginButton.addEventListener("click", function () { 
            
            
            var passwordInput = document.getElementById("passwordInputbox").value;
            var nameInput = document.getElementById("usernameInputbox").value;
            
            console.log("Du har tryckt på login knappen!");
            console.log("Username: " + nameInput + " Password: " + passwordInput);
            
            
            
            fetch("users.json")
            .then(function(data){
                
                return data.json();
            
                
            })
            .then(function(jsonData){
                
                console.log(jsonData);
                
                for(i = 0; i < jsonData.length; i++){
                    
                    if(nameInput == jsonData[i].name && passwordInput == jsonData[i].password){
                        
                        
                        sessionStorage.setItem("userId", nameInput);
                        
                        localStorage.setItem("lsUserId", nameInput);

           
                        LoginPage(nameInput);
                        
                        
                    }
                    
                    
                    
                    

                }

                
                

            });
            
            console.log("Fel lösenord eller användarnamn")
            
            
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
    function LoginPage(){
        
        var name = sessionStorage.getItem("userId");
        
        GetUserTrivia();
        
        loanPage.innerHTML = " ";
        content.innerHTML = " ";
        
        GetFilmList();
        GetFilmtrivia();

        // HEADER //
        header.innerHTML = "";
        header.insertAdjacentHTML("afterbegin", '<h1 id="heading0">SVENSKA FILMSTUDIOS </h1><h3 id="heading1">uthyrningstjänst</h3><button id="logoutButton">Logout</button>');
        
        var createh2 = document.createElement('h2');
        
        createh2.setAttribute("id", "welcomeMessage");
        
        createh2.appendChild(document.createTextNode("Välkommen " + name + " Filmstudio!"));
        header.appendChild(createh2);        
        
        // NAVIGATION //
              
        navigation.innerHTML = " ";
        navigation.innerHTML = ('<button id="loanReturn">Låna/Lämna tillbaka film</button><button id="triviaButton">Skriv en trivia</button>');
        
        
        
        // LOGUT KNAPP //        
        var logout = document.getElementById("logoutButton");
        
        logout.addEventListener("click", function () {
            
            console.log("Du tryckte på logout knappen. Går tillbaka till startPage"); 
            
            sessionStorage.clear();
            
            
            StartPage();
            
        });
        
        // KNAPP FÖR ATT KOMMA TILL LÅNA/LÄMNA TILLBAKA SIDAN
        var loanReturnButton = document.getElementById("loanReturn");
        
        loanReturnButton.addEventListener("click", function () {
            
            content.innerHTML = " ";
            
            userTrivia.innerHTML = " ";
            navigation.innerHTML = " ";
            navigation.innerHTML = ('<button id="toStartpage">Tillbaka till startsidan</button><button id="loanReturn">Låna/Lämna tillbaka film</button><button id="triviaButton">Skriv en trivia</button>');
            
            
            loanPage.innerHTML = '<div id="loanInfo"><h2>Lånade filmer:</h2><div id="borrowedMovies"></div>';
            
            LoanReturnPage();                
            
        });
        
        
        
        var triviaButton = document.getElementById("triviaButton");
        
        
        
        triviaButton.addEventListener("click", function (){
            
            
            console.log("Du tryckte på 'triviaButton'.")
            
            
            AddTrivia();
            
        });
        
        
        

    }
    
    
    
    
    
    
    
    
    
    function LoanReturnPage(){
        
        var containerId = 0;
                
        for(const f of filmNameArray)
        {
            
            console.log("En eller flera titlar finns redan med i listan.");
            
            var newDiv = document.createElement('div');
            
            var newButton1 = document.createElement('button');
            var newButton2 = document.createElement('button');
            
            newButton1.innerHTML = "LÅNA";
            newButton2.innerHTML = "RETURNERA";
            
            newDiv.appendChild(document.createTextNode(f));
            newDiv.appendChild(newButton1);
            newDiv.appendChild(newButton2);
            
            
            newDiv.setAttribute("id", "availableFilmsChildContainer" + containerId++);
            newButton1.setAttribute("class", "loanButton");
            newButton2.setAttribute("class", "returnButton");
            
            
            loanPage.appendChild(newDiv);           
            
        }
    
        
                                
        lentMoviesArray = [];
        
        
        var loanButton = document.getElementsByClassName("loanButton");
        var returnButton = document.getElementsByClassName("returnButton");

        console.log("lentMoviesArray utanför metoden: " + lentMoviesArray);

        for(var i = 0; i < loanButton.length; i++){
            
            loanButton[i].addEventListener("click", function(e) 
            {                
                var borrowedMoviesContainer = document.getElementById("borrowedMovies");

                var parentElementId = e.target.parentNode.id;
                
                var filmTitleValue = document.getElementById(parentElementId).textContent;
                
                
                
                
                var filmTitleValue = filmTitleValue.replace("LÅNARETURNERA", " ");
                
                
                
                
                
                // Kontrollerar huruvida filmens namn redan ligger i lentMoviesArray
                var titleExist = lentMoviesArray.includes(filmTitleValue);
                
                console.log("lentMoviesArray: " + lentMoviesArray);

                if(titleExist == false){
                    
                    
                    // Sätter in element i array:en utanför metoden
                    lentMoviesArray.push(filmTitleValue);
                    
                    
                    
                    console.log("Array innehåll = " + lentMoviesArray);
                    
                    
                    borrowedMoviesContainer.innerHTML = " ";
                    
                    for(i = 0; i < lentMoviesArray.length; i++)
                    {
                        
                        borrowedMoviesContainer.insertAdjacentHTML("beforeend","<p>" + lentMoviesArray[i] + "</p>");
                        

                    }


                }
                




                
            });
            
            
            
            
            
            
            
            
            
            
            
            
        }
                    
        // KNAPP: RETURNERA
        for(var i = 0; i < returnButton.length; i++){

            returnButton[i].addEventListener("click", function(e){

                console.log("Du tryckte på 'returnButton' knappen")
            
                                
                var borrowedMoviesContainer = document.getElementById("borrowedMovies");

                var parentElementId = e.target.parentNode.id;
                
                var filmTitleValue = document.getElementById(parentElementId).textContent;
                                                        
                
                var filmTitleValue = filmTitleValue.replace("LÅNARETURNERA", " ");
                

                var findElement = lentMoviesArray.find(e => e == filmTitleValue);
                    
                console.log(findElement);


                const element = lentMoviesArray.indexOf(findElement)
                

                lentMoviesArray.splice(element, 1);
                
                borrowedMoviesContainer.innerHTML = " ";
                    
                for(i = 0; i < lentMoviesArray.length; i++)
                {
                    

                    borrowedMoviesContainer.insertAdjacentHTML("beforeend","<p>" + lentMoviesArray[i] + "</p>");
                    

                }



            });
        
        
        }








        // KNAPP: LÄGG TILL TRIVIA
        var triviaButton = document.getElementById("triviaButton");

        triviaButton.addEventListener("click", function (){

            
            console.log("Du tryckte på 'triviaButton'.")
                            
            AddTrivia();
        
        
        
        
        
        });

        

        // KNAPP: TILLBAKA TILL STARTSIDA  //
        var toStartpage = document.getElementById("toStartpage");
        
        toStartpage.addEventListener("click", function () {

            
            
            LoginPage();
            

        });
        
        // KNAPP: LOGUT //
        var logout = document.getElementById("logoutButton");
        
        logout.addEventListener("click", function () {
            console.log("Du tryckte på logout knappen. Går tillbaka till startPage"); 
            
            StartPage();
        });
        
        
    }
    
    
    

    // LÄGG TILL TRIVIA
    function AddTrivia() {
        
        triviaInput.innerHTML = "";
        triviaInput.innerHTML = '<div id="printTriviainputbox"><h2>LÄGG TILL TRIVIA</h2><p>Film:</p><input id="input1"></input><p>Trivia:</p><input id="input2"></input><button id="addTriviaButton">LÄGG TILL TRIVIA</button><button id="exitTriviaBox">TILLBAKA</button></div>';
        
        
        
       
                
        // LÄGGER TILL TRIVIA FRÅN ANVÄNDARINPUT

        var addTriviaButton = document.getElementById("addTriviaButton");
        var input2 = document.getElementById("input2");
        
        


        addTriviaButton.addEventListener("click", function () {

           
            
            if(input2.value.length !== 0){
                
                console.log("input2.value: " + input2.value);
                
                

                var newUsertrivia = input2.value;
                
                var newp = document.createElement('p');
                
                newp.appendChild(document.createTextNode(newUsertrivia));
                
                userTrivia.appendChild(newp);
                
                triviaInput.innerHTML = " ";
            
                

                //Lägger in i localStorage och sessionStorage
                sessionStorage.setItem("ssUserTrivia", newUsertrivia);
                localStorage.setItem("lsUserTrivia", newUsertrivia);


            }
            else{
                
                console.log("input2.value: null");

                
                alert("Du har inte skrivit in någon trivia!");
                
            }
            

            
            
            
        });


        
        // EXIT TRIVIA
        exitTriviaBox = document.getElementById("exitTriviaBox");
        
        exitTriviaBox.addEventListener("click", function () {
            
            triviaInput.innerHTML = "";
            
            
        });
        
        
    }
    
    function GetUserTrivia()
    {

        var ssUserTrivia = sessionStorage.getItem("ssUserTrivia");
                        
        console.log("ssUserTrivia: " + ssUserTrivia);
        
        newP = document.createElement('p');
               
        var ssUserTriviaTextForm = document.createTextNode(ssUserTrivia);        

        newP.appendChild(ssUserTriviaTextForm);
                
        userTrivia.appendChild(newP);

    
    
    }
    