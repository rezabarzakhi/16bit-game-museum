var all = [];
function render(f) {
var list = document.getElementById("list");
list.innerHTML = "";
var found = 0;
all.forEach(function(g){
var hay = (g.title + " " + g.tags.join(" ")).toLowerCase();
if (f && hay.indexOf(f.toLowerCase()) < 0) return;
found++;
var a = document.createElement("article");
a.className = "game-card";
var link = document.createElement("a");
link.href = "./game.html?slug=" + encodeURIComponent(g.slug);
var cover = document.createElement("div");
cover.className = "game-card__cover";
var body = document.createElement("div");
body.className = "game-card__body";
var h = document.createElement("h3");
h.textContent = g.title;
var p = document.createElement("p");
p.textContent = g.summary;
body.appendChild(h); body.appendChild(p);
a.appendChild(cover); a.appendChild(body); link.appendChild(a);
list.appendChild(link);
});
document.getElementById("empty").hidden = found > 0;
}
fetch("../content/games.json").then(function(r){return r.json();}).then(function(games){
all = games; render("");
document.getElementById("q").addEventListener("input", function(e){ render(e.target.value); });
});
