// Handle language
const browserLanguage = chrome.i18n.getUILanguage();
if (browserLanguage.includes("fr")){
  document.getElementById("deactivateVideoProposalsText").innerHTML = "Désactiver les propositions de vidéos:";
  document.getElementById("disableShortsText").innerHTML = "Désactiver les YouTube Shorts:";
  document.getElementById("showOnlySubscribedText").innerHTML = "Afficher uniquement les vidéos<br/>d'abonnement sur la page d'accueil:";}
else if (browserLanguage.includes("en")){
  document.getElementById("deactivateVideoProposalsText").innerHTML = "Deactivate Video Proposals:";
  document.getElementById("disableShortsText").innerHTML = "Disable YouTube Shorts:";
  document.getElementById("showOnlySubscribedText").innerHTML = "Show Only Subscription<br/>Videos on Home Page:";
}
else if (browserLanguage.includes("es")){
  document.getElementById("deactivateVideoProposalsText").innerHTML = "Desactivar propuestas de videos:";
  document.getElementById("disableShortsText").innerHTML = "Desactivar YouTube Shorts:";
  document.getElementById("showOnlySubscribedText").innerHTML = "Mostrar solo videos de suscripción<br/>en la página de inicio:";}
else if (browserLanguage.includes("ru")){
  document.getElementById("deactivateVideoProposalsText").innerHTML = "Отключить предложения видео:";
  document.getElementById("disableShortsText").innerHTML = "Отключить YouTube Shorts:";
  document.getElementById("showOnlySubscribedText").innerHTML = "Показывать только видео<br/>подписок на главной странице:";}

// register modifications
function saveOptions(e) {
    const checkbox = e.target;
    chrome.storage.local.set({ [checkbox.id]: checkbox.checked });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab.url.includes("youtube.com")) {
            chrome.tabs.reload(activeTab.id);
        }
    });
}
const checkboxes = document.querySelectorAll('input[type=checkbox]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', saveOptions);
});
// get the stored value
chrome.storage.local.get(null, (result) => {
    checkboxes.forEach(checkbox => {
        checkbox.checked = result.hasOwnProperty(checkbox.id) ? result[checkbox.id] : true;
        if (!result.hasOwnProperty(checkbox.id)){
          chrome.storage.local.set({ [checkbox.id]: true });
        }
    });
});
