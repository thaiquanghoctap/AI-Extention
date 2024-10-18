function getSelectedText() {
    let selectedText = '';

    // window.getSelection
    if (window.getSelection) {
        selectedText = window.getSelection().toString();
    }
    // document.getSelection
    else if (document.getSelection) {
        selectedText = document.getSelection().toString();
    }
    // document.selection
    else if (document.selection) {
        selectedText =
            document.selection.createRange().text;
    } else return "";

    return selectedText;
}

let selectedText = ""


document.addEventListener('mouseup', function() {
    selectedText = getSelectedText()
        // Gửi thông điệp tới background.js
    chrome.runtime.sendMessage({ message: selectedText, sender: "content_script" }, function(response) {});

});