document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['filteredScripts'], function(result) {
        if (result.filteredScripts) {
            var listContainer = document.getElementById('script-list');
            result.filteredScripts.forEach(function(scriptInfo) {
				
                // Create a paragraph element to hold the script URL
                var listItem = document.createElement('p');
                listItem.textContent = `${scriptInfo.scriptUrl}`;

                // Set the title attribute for the tooltip with the source URL
                listItem.title = `Source: ${scriptInfo.pageUrl}`;

                // Append the listItem to the listContainer
                listContainer.appendChild(listItem);
            });
        }
    });

    // Add event listener for the clear button
    var clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('click', function() {
        chrome.storage.local.remove('filteredScripts', function() {
            console.log('Filtered scripts cleared');
            var listContainer = document.getElementById('script-list');
            listContainer.innerHTML = '';
        });
    });
});
