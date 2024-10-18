document.addEventListener('DOMContentLoaded', function() {

    var userInput = document.querySelector('#chatbox input');
    const translateBtn = document.getElementById('translateBtn');
    const summarizeBtn = document.getElementById('summarizeBtn');
    const detailingBtn = document.getElementById('detailingBtn');

    var chatMessages = document.getElementById("chat-messages");

    const selectTag = document.querySelectorAll("select");

    const apiKey = "My-API Key";
    const apiUrl = "https://api.openai.com/v1/completions";


    // -------------------- Set Language ------------------------
    selectTag.forEach(tag => {
        tag.innerHTML = "";

        Object.keys(countries).forEach(key => {
            let option = document.createElement("option");
            option.value = key;
            option.text = countries[key];
            tag.add(option);
        });
        selectTag[0].value = "vi-VN";
    });

    translateBtn.addEventListener('click', () => handleTask('Translate'));
    summarizeBtn.addEventListener('click', () => handleTask('Summarize'));
    detailingBtn.addEventListener('click', () => handleTask('Detailing'));

    function UpdateChatbox(sender, text) {
        var messageSender = document.createElement("div");
        var messageContainer = document.createElement("div");

        // display sender
        messageSender.style.fontFamily = 'Lexend';
        messageSender.style.fontSize = '13px';

        // display message
        messageContainer.style.padding = '20px';
        messageContainer.style.backgroundColor = "#E0E0E0";
        messageContainer.style.fontFamily = "Lexend";
        messageContainer.style.fontSize = "13px";
        messageContainer.style.borderRadius = '8px';
        messageContainer.style.border = '1px';
        
        if (sender === 'You') {
            messageSender.style.color = 'green';
            messageSender.style.textAlign = 'right';
            messageContainer.style.textAlign = 'right';
            messageContainer.style.marginLeft = '10px';
        }
        else if (sender === 'TORE') {
            messageSender.style.color = 'blue';
            messageSender.style.textAlign = 'left';
            messageContainer.style.textAlign = "left";
            messageContainer.style.marginRight = '10px';
        }

        messageSender.textContent = sender;
        chatMessages.appendChild(messageSender);

        messageContainer.textContent = text;
        chatMessages.appendChild(messageContainer);

        userInput.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    function PerformTextTask(task, text) {
        let q = "";
        if (task == 'Translate') {
            q = `Translate into ${selectTag[0].value}: ${text}`
        }
        else {
            q = `${task}: ${text}`
        }

        UpdateChatbox('You', q);

        return new Promise((resolve, reject) => {
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    "model": "gpt-3.5-turbo-instruct",
                    "prompt": q,
                    "max_tokens": 100,
                    "temperature": 0
                }),
            })
            .then(response => response.json())
            .then(data => resolve(data.choices[0].text))
            .catch(error => reject(error));
        });
    }


    function handleTask(task) {
        if (task == 'Translate') {
            PerformTextTask(task, userInput.value)
            .then(result => {
                UpdateChatbox('TORE', result);
            })
            .catch(error => {
                console.error(error);
            });
        }
        else if (task == 'Summarize') {
            PerformTextTask(task, userInput.value)
            .then(result => {
                UpdateChatbox('TORE', result);
            })
            .catch(error => {
                console.error(error);
            });
        }
        else if (task == 'Detailing') {
            PerformTextTask(task, userInput.value)
            .then(result => {
                UpdateChatbox('TORE', result);
            })
            .catch(error => {
                console.error(error);
            });
        }
    }

    chrome.runtime.sendMessage({ message: "", sender: "popup" }, function(selectedText) {
        userInput.value = selectedText.message;
    });
});
