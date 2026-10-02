var slug = new URLSearchParams(location.search).get("slug");
var allGames = [];
var licenseData = {};
fetch("../content/licenses.json").then(function(r){return r.json();}).then(function(d){ licenseData = d; return fetch("../content/games.json"); }).then(function(r){return r.json();}).then(function(games){
allGames = games;
var g = null;
games.forEach(function(x){ if (x.slug === slug) g = x; });
if (!g) { document.getElementById("empty").hidden = false; return; }
document.getElementById("game").hidden = false;
document.title = g.title + " | museum";
document.getElementById("title").textContent = g.title;
document.getElementById("console").textContent = g.console;
document.getElementById("summary").textContent = g.summary;
var box = document.getElementById("controls");
g.controls.forEach(function(c){
var row = document.createElement("div");
row.className = "control-guide__row";
var a = document.createElement("span"); a.textContent = c;
var b = document.createElement("span"); b.className = "key"; b.textContent = c;
row.appendChild(a); row.appendChild(b); box.appendChild(row);
});
var lic = licenseData[g.slug] || { license: g.license, proof: g.license_proof, source_url: g.source_url, author: g.author };
document.getElementById("meta").textContent = lic.author + " | " + lic.license;
var tags = document.getElementById("tags");
g.tags.forEach(function(t){
var s = document.createElement("span"); s.className = "tag-chip"; s.textContent = t; tags.appendChild(s);
});
var licBox = document.getElementById("license");
licBox.innerHTML = "<strong>license:</strong> " + lic.license + "<br><strong>proof:</strong> " + lic.proof + "<br><strong>source:</strong> <a href=\"" + lic.source_url + "\" target=\"_blank\" rel=\"noopener\">" + lic.source_url + "</a>";
fetch("../content/" + g.slug + ".md").then(function(r){
if (!r.ok) throw new Error("not found");
return r.text();
}).then(function(md){
document.getElementById("article").innerHTML = mdToHtml(md);
}).catch(function(){
document.getElementById("article").innerHTML = "<p>article placeholder for local skeleton</p>";
});
document.getElementById("start").addEventListener("click", function(){
var frame = document.getElementById("frame");
frame.innerHTML = "";
var note = document.createElement("p");
note.style.color = "#F4F1DE";
note.textContent = "loading emulator | core: " + g.emu_core + " | console: " + g.console;
frame.appendChild(note);
setTimeout(function(){
frame.innerHTML = "";
var note2 = document.createElement("p");
note2.style.color = "#F4F1DE";
note2.textContent = "emulator lazy load placeholder | core: " + g.emu_core + " | console: " + g.console + " | rom: " + (g.rom_path || "pending");
frame.appendChild(note2);
if (g.rom_path) {
var iframe = document.createElement("iframe");
iframe.src = g.rom_path;
iframe.allow = "fullscreen";
frame.appendChild(iframe);
}
}, 800);
});
document.getElementById("report").addEventListener("click", function(){
document.getElementById("report-ok").hidden = false;
});
});
