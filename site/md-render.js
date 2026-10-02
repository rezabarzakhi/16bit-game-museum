function mdToHtml(md) {
  var lines = md.split(/\r?\n/);
  var html = [];
  var listMode = false;
  function closeList() { if (listMode) { html.push("</ul>"); listMode = false; } }
  lines.forEach(function(line) {
    if (/^##\s+/.test(line)) { closeList(); html.push("<h2>" + esc(line.replace(/^##\s+/, "")) + "</h2>"); }
    else if (/^#\s+/.test(line)) { closeList(); html.push("<h1>" + esc(line.replace(/^#\s+/, "")) + "</h1>"); }
    else if (/^[-*]\s+/.test(line)) {
      if (!listMode) { html.push("<ul>"); listMode = true; }
      html.push("<li>" + esc(line.replace(/^[-*]\s+/, "")) + "</li>");
    }
    else if (line.trim() === "") { closeList(); }
    else { closeList(); html.push("<p>" + esc(line) + "</p>"); }
  });
  closeList();
  return html.join("\n");
}
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
