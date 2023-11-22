document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['filteredScripts'], function(result) {
        if (result.filteredScripts) {
            var listContainer = document.getElementById('script-list');
            result.filteredScripts.forEach(function(scriptInfo) {
				
				// Create an anchor element for the clickable script URL
				var listItem = document.createElement('a');
				listItem.href = scriptInfo.redirectUrl; // Set the redirect URL as the href
				listItem.textContent = `${scriptInfo.scriptUrl}`;
				listItem.target = '_blank'; // Open in a new tab
				listItem.style.display = 'block'; // Style to display as block for better readability
				
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