var slug = new URLSearchParams(location.search).get("slug");
fetch("../content/games.json").then(function(r){return r.json();}).then(function(games){
var g = null;
games.forEach(function(x){ if (x.slug === slug) g = x; });
if (!g) { document.getElementById("empty").hidden = false; return; }
document.getElementById("game").hidden = false;
document.getElementById("title").textContent = g.title;
document.getElementById("summary").textContent = g.summary;
var box = document.getElementById("controls");
g.controls.forEach(function(c){
var row = document.createElement("div");
row.className = "control-guide__row";
var a = document.createElement("span"); a.textContent = c;
var b = document.createElement("span"); b.className = "key"; b.textContent = c;
row.appendChild(a); row.appendChild(b); box.appendChild(row);
});
document.getElementById("meta").textContent = g.author + " | " + g.license;
var tags = document.getElementById("tags");
g.tags.forEach(function(t){
var s = document.createElement("span"); s.className = "tag-chip"; s.textContent = t; tags.appendChild(s);
});
document.getElementById("start").addEventListener("click", function(){
document.getElementById("frame").innerHTML = "emulator lazy load placeholder";
});
});
