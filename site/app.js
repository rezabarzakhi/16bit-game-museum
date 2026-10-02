var all = [];
var activeConsole = "all";
function render() {
var q = document.getElementById("q").value.toLowerCase();
var list = document.getElementById("list");
list.innerHTML = "";
var found = 0;
all.forEach(function(g){
if (activeConsole !== "all" && g.console !== activeConsole) return;
var hay = (g.title + " " + g.tags.join(" ") + " " + g.console).toLowerCase();
if (q && hay.indexOf(q) < 0) return;
found++;
var a = document.createElement("article");
a.className = "game-card";
var link = document.createElement("a");
link.href = "./game.html?slug=" + encodeURIComponent(g.slug);
var cover = document.createElement("div");
cover.className = "game-card__cover";
if (g.cover_path) {
var img = document.createElement("img");
img.src = "./" + g.cover_path;
img.alt = g.title;
img.style.cssText = "width:100%;height:100%;object-fit:cover;image-rendering:pixelated;";
cover.appendChild(img);
}
var body = document.createElement("div");
body.className = "game-card__body";
var badge = document.createElement("span");
badge.className = "console-badge";
badge.textContent = g.console;
var h = document.createElement("h3");
h.textContent = g.title;
var p = document.createElement("p");
p.textContent = g.summary;
body.appendChild(badge); body.appendChild(h); body.appendChild(p);
a.appendChild(cover); a.appendChild(body); link.appendChild(a);
list.appendChild(link);
});
document.getElementById("empty").hidden = found > 0;
}
function buildFilters() {
var consoles = ["all"];
all.forEach(function(g){ if (consoles.indexOf(g.console) < 0) consoles.push(g.console); });
var box = document.getElementById("filters");
consoles.forEach(function(c){
var b = document.createElement("button");
b.className = "filter-btn" + (c === activeConsole ? " active" : "");
b.textContent = c;
b.addEventListener("click", function(){
activeConsole = c;
Array.prototype.forEach.call(box.children, function(x){ x.className = "filter-btn"; });
b.className = "filter-btn active";
render();
});
box.appendChild(b);
});
}
fetch("../content/games.json").then(function(r){return r.json();}).then(function(games){
all = games;
buildFilters();
render();
document.getElementById("q").addEventListener("input", render);
document.getElementById("nl").addEventListener("submit", function(e){
e.preventDefault();
document.getElementById("nl-ok").hidden = false;
document.getElementById("nl-email").value = "";
});
});
