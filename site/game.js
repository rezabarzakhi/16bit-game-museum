var slug = new URLSearchParams(location.search).get("slug");
var licenseData = {};
fetch("../content/licenses.json").then(function(r){return r.json();}).then(function(d){ licenseData = d; return fetch("../content/games.json"); }).then(function(r){return r.json();}).then(function(games){
var g = null;
games.forEach(function(x){ if (x.slug === slug) g = x; });
if (!g) { document.getElementById("empty").hidden = false; return; }
document.getElementById("game").hidden = false;
document.title = g.title + " | موزه";
document.getElementById("title").textContent = g.title;
document.getElementById("console").textContent = g.console;
document.getElementById("summary").textContent = g.summary;
if (g.cover_path) {
var cover = document.getElementById("cover");
cover.innerHTML = "<img src=\"" + g.cover_path + "\" alt=\"" + g.title + "\" style=\"width:100%;height:220px;object-fit:cover;image-rendering:pixelated;display:block;border-radius:12px;\">";
}
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
var html = "<strong>مجوز:</strong> " + lic.license + "<br><strong>مدرک:</strong> " + lic.proof + "<br><strong>منبع:</strong> <a href=\"" + lic.source_url + "\" target=\"_blank\" rel=\"noopener\">" + lic.source_url + "</a>";
if (lic.itch_url) html += "<br><strong>دانلود:</strong> <a href=\"" + lic.itch_url + "\" target=\"_blank\" rel=\"noopener\">itch.io</a>";
licBox.innerHTML = html;
fetch("../content/" + g.slug + ".md").then(function(r){
if (!r.ok) throw new Error("not found");
return r.text();
}).then(function(md){
document.getElementById("article").innerHTML = mdToHtml(md);
}).catch(function(){
document.getElementById("article").innerHTML = "<p>مقاله هنوز آماده نشده است</p>";
});
document.getElementById("start").addEventListener("click", function(){
if (g.rom_path) {
window.location.href = "./emulator/player.html?slug=" + encodeURIComponent(g.slug);
} else {
document.getElementById("frame").innerHTML = "<p style='color:#F4F1DE'>فایل بازی هنوز اضافه نشده است</p>";
}
});
document.getElementById("report").addEventListener("click", function(){
document.getElementById("report-ok").hidden = false;
});
});
