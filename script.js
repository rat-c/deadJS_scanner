console.log('OK - Script initiated.');

// Select all script elements on the page
var currentURL = window.location.hostname;
var currentScripts = document.getElementsByTagName('script');
var filteredScripts = [];

// Function to check if the script URL already exists in the array
function isDuplicateScript(url, scriptsArray) {
    return scriptsArray.includes(url);
}

// Retrieve existing filteredScripts from chrome.storage.local
chrome.storage.local.get('filteredScripts', function (data) {
    filteredScripts = data.filteredScripts || [];

    // Loop through the script elements & check if the script has a src attribute (i.e., it's not inline JavaScript)
    for (var i = 0; i < currentScripts.length; i++) {
        if (currentScripts[i].src) {

            // Compare the script's domain with the current domain
            var scriptUrl = new URL(currentScripts[i].src);
            if (scriptUrl.hostname !== currentURL) {

                // Check if the script URL is a duplicate, and log if not
                if (!isDuplicateScript(currentScripts[i].src, filteredScripts)) {
                    console.log('External JS URL:', currentScripts[i].src);
                    filteredScripts.push(currentScripts[i].src);
                }
            }
        }
    }

    // Save the updated filteredScripts back to chrome.storage.local
    chrome.storage.local.set({ 'filteredScripts': filteredScripts }, function () {
        console.log('External scripts saved');
    });

    console.log('OK - Scripts ended.');
});
