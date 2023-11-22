// Select all script elements on the page
var currentURL = window.location.hostname;
var currentScripts = Array.from(document.getElementsByTagName('script'));
var filteredScripts = [];

// Function to check if the script URL already exists in the array
function isDuplicateScript(url, scriptsArray) {
    return scriptsArray.some(scriptInfo => scriptInfo.scriptUrl === url);
}

// Function to check if the script is accessible
function checkScriptAccessibility(url) {
    return fetch(url, { method: 'HEAD' })
        .then(response => !response.ok) // If the response is not ok, the script is considered inaccessible
        .catch(() => true); // Catch network errors or other issues and consider the script inaccessible
}

// Function to add script information to filteredScripts array
function addScriptInfo(scriptUrl, pageUrl) {
    filteredScripts.push({ scriptUrl: scriptUrl, pageUrl: pageUrl });
}

// Retrieve existing filteredScripts from chrome.storage.local
chrome.storage.local.get('filteredScripts', function (data) {
    filteredScripts = data.filteredScripts || [];

    // Process each script element
    Promise.all(currentScripts.map(script => {
        if (script.src && new URL(script.src).hostname !== currentURL && !isDuplicateScript(script.src, filteredScripts)) {
            return checkScriptAccessibility(script.src).then(isDeadLink => {
                if (isDeadLink) {
                    console.log('Dead JS URL:', script.src);
                    addScriptInfo(script.src, window.location.href);
                }
            });
        }
    })).then(() => {
        // Save the updated filteredScripts back to chrome.storage.local
        chrome.storage.local.set({ 'filteredScripts': filteredScripts }, function () {
        });
    });
});
