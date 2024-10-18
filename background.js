let selectedText

// Lắng nghe thông điệp từ content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Kiểm tra xem thông điệp có được gửi từ content script không
    if (message.sender === "content_script" && message.message != "") {
        selectedText = message;
        // Phản hồi cho content script (có thể không cần thiết)
    } else if (message.sender === "popup") {
        // Gửi thông điệp tới popup.js
        //chrome.runtime.sendMessage({ dataFromContentScript: message.dataFromContentScript });
        sendResponse({ message: selectedText.message, sender: selectedText.sender });
    }
});