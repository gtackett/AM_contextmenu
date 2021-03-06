(function() {
  function amContextMenu_contribute() {
    var prefs = Services.prefs.getBranch("extensions.amcontextmenu.");

    // Get and return contribution URL from pref
    var url = Services.urlFormatter.formatURL(prefs.getCharPref("contributionURL"));

    // Load donation page on first installation only
    // Check connection first
    //BrowserOffline.toggleOfflineStatus(); // offline test

    if (prefs.getBoolPref("firstRun") && navigator.onLine) {
      var req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.onreadystatechange = function (aEvent) {
        if ((req.readyState == 4) && (req.status == 200)) {
          prefs.setBoolPref("firstRun", false);
          if (Application.id == "{3550f703-e582-4d05-9a08-453d09bdfdc6}") {
            openContentTab(url, "tab", "^https?:");
          } else {
            switchToTabHavingURI(url, true);
          }
        }
      }
      req.send(null);
    }
  }

  addEventListener("load", amContextMenu_contribute, false);
  removeEventListener("unload", amContextMenu_contribute, false);

})()
