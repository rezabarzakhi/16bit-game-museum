(function(){
  var slug = new URLSearchParams(location.search).get("slug");
  var licenseData = {};
  fetch("../content/licenses.json").then(function(r){return r.json();}).then(function(d){ licenseData = d; return fetch("../content/games.json"); }).then(function(r){return r.json();}).then(function(games){
    var g = null;
    games.forEach(function(x){ if (x.slug === slug) g = x; });
    if (!g) { document.getElementById("title").textContent = "بازی پیدا نشد"; return; }
    document.getElementById("title").textContent = g.title;
    document.getElementById("console").textContent = g.console;
    document.getElementById("summary").textContent = g.summary;
    if (g.cover_path) {
      var cover = document.getElementById("cover");
      cover.innerHTML = "<img src=\"./" + g.cover_path + "\" alt=\"" + g.title + "\" style=\"width:100%;height:220px;object-fit:cover;image-rendering:pixelated;display:block;border-radius:12px;\">";
    }
    var box = document.getElementById("controls");
    var ctrlHtml = "";
    if (g.controls && g.controls.length) {
      ctrlHtml = g.controls.map(function(c){ return "<span class=\"tag\">" + c + "</span>"; }).join(" ");
    }
    box.innerHTML = ctrlHtml;
    var lic = licenseData[g.slug] || {};
    var licBox = document.getElementById("license-box");
    var html = "";
    html += "<strong>مجوز:</strong> " + (lic.license || g.license || "نامشخص") + "<br>";
    if (lic.proof) html += "<strong>مدرک:</strong> " + lic.proof + "<br>";
    if (g.source_url) html += "<strong>منبع:</strong> <a href=\"" + g.source_url + "\" target=\"_blank\" rel=\"noopener\">کد منبع</a><br>";
    if (lic.itch_url || g.itch_url) html += "<strong>صفحه بازی:</strong> <a href=\"" + (lic.itch_url || g.itch_url) + "\" target=\"_blank\" rel=\"noopener\">itch.io</a>";
    licBox.innerHTML = html;
    fetch("../content/" + g.slug + ".md").then(function(r){
      if (!r.ok) throw new Error("not found");
      return r.text();
    }).then(function(md){
      document.getElementById("article").innerHTML = window.renderMarkdown ? window.renderMarkdown(md) : "<pre>" + md + "</pre>";
    }).catch(function(){
      document.getElementById("article").innerHTML = "<p>مقاله‌ای ثبت نشده است.</p>";
    });
    document.getElementById("start").addEventListener("click", function(){
      if (g.rom_path) {
        window.location.href = "./emulator/player.html?slug=" + encodeURIComponent(g.slug);
      } else {
        alert("فایل بازی هنوز اضافه نشده است.");
      }
    });
  });
})();
