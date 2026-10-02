fetch("../content/games.json").then(function(r){return r.json();}).then(function(games){
var list = document.getElementById("list");
games.forEach(function(g){
var a = document.createElement("article");
a.className = "game-card";
a.innerHTML = "<div class=game-card__cover></div><div class=game-card__body><h3></h3><p></p></div>";
a.querySelector("h3").textContent = g.title;
a.querySelector("p").textContent = g.summary;
list.appendChild(a);
});
});
