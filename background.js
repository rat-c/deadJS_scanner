chrome.webRequest.onCompleted.addListener(
    function(details) {
        if (details.type === "script" && details.statusCode !== 200) {
            console.error("Script failed to load:", details.url);
            // Add your notification code here
        }
    },
    { urls: ["<all_urls>"] }
);