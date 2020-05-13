


fetch("https://localhost:44361/api/film")
    .then(res => res.json())
    .then(data => console.log(data)
    .catch(errorCode => console.log("ERROR")));

fetch("https://localhost:44361/api/filmstudio")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(errorCode => console.log("ERROR"));

fetch("https://localhost:44361/api/filmTrivia")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(errorCode => console.log("ERROR"));


fetch("https://localhost:44361/api/rentedFilm")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(errorCode => console.log("ERROR"));


