function setMenuView(menuChoice) {
  document.getElementById("chosen-menu-option").style.visibility = "visible";
  switch (menuChoice) {
    case "addschool":
      document.getElementById("chosen-menu-option").innerHTML =
        '<div class="field">\n' +
        '  <div class="select">\n' +
        "    <select>\n" +
        "      <option>Select School</option>\n" +
        "      <option>Temporary for testing</option>\n" +
        "    </select>\n" +
        "  </div>\n" +
        "</div>\n" +
        '<div class="field">\n' +
        '  <label class="label">Enter your student email:</label>\n' +
        '  <div class="control">\n' +
        '    <input id="student-email" class="input" type="text" />\n' +
        "  </div>\n" +
        "</div>\n" +
        '<div class="field">\n' +
        '  <div class="control">\n' +
        '    <button class="button is-link" onclick="">Request Access</button>\n' +
        "  </div>\n" +
        "</div>";
      break;

    case "switchschool":
  }
}
