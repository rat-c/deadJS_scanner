document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['filteredScripts'], function(result) {
        if (result.filteredScripts) {
            var listContainer = document.getElementById('script-list');
            result.filteredScripts.forEach(function(scriptUrl) {
                var listItem = document.createElement('p');
                listItem.textContent = scriptUrl;
                listContainer.appendChild(listItem);
            });
        }
    });

    // Add event listener for the clear button
    var clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('click', function() {
        chrome.storage.local.remove('filteredScripts', function() {
            console.log('Filtered scripts cleared');
            // Optionally, update the UI to reflect the cleared data
            var listContainer = document.getElementById('script-list');
            listContainer.innerHTML = '';
        });
    });
});