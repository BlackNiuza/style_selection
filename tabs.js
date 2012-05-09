//使所有页面加载插件content_scripts
function executeScript(tabId, jsFiles){
  //debugger;
  for (var i=0;i<jsFiles.length;i++) {
    chrome.tabs.executeScript(
      tabId,
      {file:jsFiles[i],allFrames:true});
  };
}

function loadContentScriptInAllTabs() {
  //debugger;
  var jsFiles = ['content_script.js','command.js'];
  chrome.windows.getAll({'populate': true}, function(windows) {
    //debugger;
    for (var i = 0; i < windows.length; i++) {
      var tabs = windows[i].tabs;
      for (var j = 0; j < tabs.length; j++) {
      	executeScript(tabs[j].id,jsFiles);
      }
    }
  });
}
