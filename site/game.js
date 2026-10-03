(function(){
  var slug = new URLSearchParams(location.search).get("slug");
  var licenseData = {};
  fetch("../content/licenses.json").then(function(r){return r.json();}).then(function(d){
    licenseData = d.games || d;
    return fetch("../content/games.json");
  }).then(function(r){return r.json();}).then(function(games){
    var g = null;
    games.forEach(function(x){ if (x.slug === slug) g = x; });
    if (!g) {
      document.getElementById("empty").hidden = false;
      return;
    }
    document.getElementById("game").hidden = false;
    document.title = g.title + " | سوپر شانزده بیت";
    document.getElementById("title").textContent = g.title;
    document.getElementById("console").textContent = g.console;
    document.getElementById("summary").textContent = g.summary;
    if (g.cover_path) {
      var cover = document.getElementById("cover");
      cover.innerHTML = "<img src=\"./" + g.cover_path + "\" alt=\"" + g.title + "\">";
    }
    var box = document.getElementById("controls");
    var ctrlHtml = "";
    if (g.controls && g.controls.length) {
      ctrlHtml = g.controls.map(function(c){ return "<div class=\"control-guide__row\"><span>" + c + "</span><span class=\"key\" dir=\"ltr\">BTN</span></div>"; }).join("");
    }
    box.innerHTML = ctrlHtml;
    var lic = licenseData[g.slug] || {};
    var licBox = document.getElementById("license");
    var html = "";
    html += "<strong>مجوز:</strong> " + (lic.license || g.license || "نامشخص") + "<br>";
    var proof = lic.proof && lic.proof.note ? lic.proof.note : lic.proof;
    if (proof) html += "<strong>مدرک:</strong> " + proof + "<br>";
    if (g.source_url) html += "<strong>منبع:</strong> <a href=\"" + g.source_url + "\" target=\"_blank\" rel=\"noopener\">کد منبع</a><br>";
    if (lic.proof && lic.proof.source) html += "<strong>سند:</strong> <a href=\"" + lic.proof.source + "\" target=\"_blank\" rel=\"noopener\">پیوند مدرک</a><br>";
    if (g.itch_url) html += "<strong>صفحه بازی:</strong> <a href=\"" + g.itch_url + "\" target=\"_blank\" rel=\"noopener\">itch.io</a>";
    licBox.innerHTML = html;
    var meta = document.getElementById("meta");
    if (meta) meta.textContent = (g.author ? "سازنده: " + g.author + " | " : "") + (g.published ? "انتشار: " + g.published : "");
    var tags = document.getElementById("tags");
    if (tags && g.tags) {
      tags.innerHTML = g.tags.map(function(t){ return "<span class=\"tag-chip\">" + t + "</span>"; }).join("");
    }
    fetch("../content/" + g.slug + ".md").then(function(r){
      if (!r.ok) throw new Error("not found");
      return r.text();
    }).then(function(md){
      var renderFn = window.renderMarkdown || (typeof mdToHtml !== "undefined" ? mdToHtml : null);
      document.getElementById("article").innerHTML = renderFn ? renderFn(md) : "<pre>" + md + "</pre>";
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
    var report = document.getElementById("report");
    if (report) report.addEventListener("click", function(){
      document.getElementById("report-ok").hidden = false;
    });
  });
})();
