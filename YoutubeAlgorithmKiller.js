function delete_html(getElementType, getElementValue, includeCondition){
  var elements = ((getElementType == "TagName")? document.getElementsByTagName(getElementValue) : document.getElementsByClassName(getElementValue))
  for (var i = 0; i < elements.length; i++) {
    if (includeCondition == null || elements[i].outerHTML.includes(includeCondition))
    {
      elements[i].outerHTML = ""
    }
  }
}

function get_checkbox_value(id_value, result){
  if (!result.hasOwnProperty(id_value)){
    chrome.storage.local.set({ [id_value]: true });
  }
  return result.hasOwnProperty(id_value) ? result[id_value] : true;
}

function all_action(){
  const urlsub = "https://www.youtube.com/feed/subscriptions"
  const urlmainpage = "https://www.youtube.com/"
  const urlquery = "search_query"
  const urlvideos = "https://www.youtube.com/watch?v="
  const trend = "trending"
  const history = "history"
  const returntomainpage = "https://www.youtube.com/?bp="
  const creatorpage = "https://www.youtube.com/@"

  chrome.storage.local.get(null, (result) => {
    disableShorts = get_checkbox_value("disableShorts", result)
    deactivateVideoProposals = get_checkbox_value("deactivateVideoProposals", result)
    showOnlySubscribed = get_checkbox_value("showOnlySubscribed", result)
  });

  if(showOnlySubscribed && (window.location.href == urlmainpage||window.location.href.includes(returntomainpage)))
  {
    window.location.assign(urlsub)
  }
  if (disableShorts)
  {
    // remove link to short in the left menu
    var icon_short = "M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86l-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"
    var icon_short_small = "M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86l-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"
    var icon_short_main = "M17.77,10.32l-1.2-.5L18,9.06a3.74,3.74,0,0,0-3.5-6.62L6,6.94a3.74,3.74,0,0,0,.23,6.74l1.2.49L6,14.93a3.75,3.75,0,0,0,3.5,6.63l8.5-4.5a3.74,3.74,0,0,0-.23-6.74Z"
    delete_html("TagName", "ytd-guide-entry-renderer", icon_short)
    delete_html("TagName", "ytd-mini-guide-entry-renderer", icon_short_small)
    if (window.location.href == urlmainpage||window.location.href.includes(returntomainpage)||window.location.href == urlsub||window.location.href.includes(creatorpage)){
      // remove short section in the urlmainpage, urlsub, creatorpage
      delete_html("TagName", "ytd-rich-section-renderer", icon_short_main)
    }
    else if (window.location.href.includes("shorts"))
    {
      window.location.assign(urlsub)
    }
    else if (window.location.href.includes(urlquery)||window.location.href.includes(trend)||window.location.href.includes(history))
    {
      // remove short section in the urlquery
      delete_html("TagName", "ytd-reel-shelf-renderer", null)
      // remove short videos in the urlquery
      delete_html("TagName", "ytd-video-renderer", 'overlay-style="SHORTS"')
    }
    else if (window.location.href == urlsub)
    {
      // remove short videos in the urlsub
      delete_html("TagName", "ytd-grid-video-renderer", 'href="/shorts/')
    }
  }

  if (deactivateVideoProposals)
  {
    if (window.location.href.includes(urlquery))
    {
      // remove proposal sections in the urlquery
      delete_html("TagName", "ytd-shelf-renderer", null)
    }
    else if (window.location.href.includes(urlvideos))
    {
      // remove right column videos in the urlvideos
      delete_html("TagName", "ytd-watch-next-secondary-results-renderer", null)
      // remove endscreen videos in the urlvideos
      delete_html("ClassName", "ytp-endscreen-content", null)
    }
  }
}

function observeDOM(targetNode, callback) {
  const config = { childList: true, subtree: true };
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        callback();
        break;
      }
    }
  });
  observer.observe(targetNode, config);
}

const targetNode = document.getElementById('content');
observeDOM(targetNode, all_action);
