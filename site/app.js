var all = [];
var activeConsole = "all";
function isGbc(g) {
  return (g.console || "").indexOf("Color") >= 0;
}
function render() {
var q = document.getElementById("q").value.toLowerCase();
var list = document.getElementById("list");
list.innerHTML = "";
var found = 0;
var first = null;
all.forEach(function(g){
if (activeConsole !== "all" && g.console !== activeConsole) return;
var hay = (g.title + " " + g.tags.join(" ") + " " + g.console).toLowerCase();
if (q && hay.indexOf(q) < 0) return;
found++;
if (!first) first = g;
var a = document.createElement("article");
a.className = "game-card";
var link = document.createElement("a");
link.href = "./game.html?slug=" + encodeURIComponent(g.slug);
var grip = document.createElement("div");
grip.className = "game-card__grip";
var cover = document.createElement("div");
cover.className = "game-card__cover";
if (g.cover_path) {
var img = document.createElement("img");
img.src = "./" + g.cover_path;
img.alt = g.title;
img.loading = "lazy";
cover.appendChild(img);
}
var label = document.createElement("div");
label.className = "game-card__label" + (isGbc(g) ? " game-card__label--gbc" : "");
var badge = document.createElement("span");
badge.className = "console-badge";
badge.textContent = g.console;
var h = document.createElement("h3");
h.textContent = g.title;
var p = document.createElement("p");
p.textContent = g.summary;
label.appendChild(badge); label.appendChild(h); label.appendChild(p);
a.appendChild(grip); a.appendChild(cover); a.appendChild(label); link.appendChild(a);
list.appendChild(link);
});
document.getElementById("empty").hidden = found > 0;
var fc = document.getElementById("featured-cover");
var fn = document.getElementById("featured-name");
var fs = document.getElementById("featured-start");
if (first) {
  if (fc && first.cover_path) { fc.src = "./" + first.cover_path; fc.alt = first.title; }
  if (fn) fn.textContent = first.title;
  if (fs) {
    fs.style.cursor = "pointer";
    fs.onclick = function(){ window.location.href = "./game.html?slug=" + encodeURIComponent(first.slug); };
  }
} else {
  if (fn) fn.textContent = "";
}
}
function buildFilters() {
var consoles = ["all"];
all.forEach(function(g){ if (consoles.indexOf(g.console) < 0) consoles.push(g.console); });
var box = document.getElementById("filters");
box.innerHTML = "";
consoles.forEach(function(c){
var b = document.createElement("button");
b.className = "filter-btn" + (c === activeConsole ? " active" : "");
b.textContent = c === "all" ? "همه" : c;
b.type = "button";
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
var reset = document.getElementById("reset");
if (reset) reset.addEventListener("click", function(){
  activeConsole = "all";
  document.getElementById("q").value = "";
  buildFilters();
  render();
});
document.getElementById("nl").addEventListener("submit", function(e){
e.preventDefault();
document.getElementById("nl-ok").hidden = false;
document.getElementById("nl-email").value = "";
});
});
