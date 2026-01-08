function sendMessage() {
    let input = document.getElementById("userInput");
    let msg = input.value.trim();
    if (msg === "") return;

    let chatBox = document.getElementById("chatBox");

    // 1️⃣ Show user message
    chatBox.innerHTML += `<div class="user">${msg}</div>`;
    input.value = "";

    // 2️⃣ Show typing indicator
    let typingDiv = document.createElement("div");
    typingDiv.className = "bot typing";
    typingDiv.innerText = "Bot is typing...";
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    // 3️⃣ Send request to backend
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "chat.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = function () {

        // 4️⃣ Force typing to stay for 1 second
        setTimeout(function () {

            // Remove typing indicator
            let typing = document.querySelector(".typing");
            if (typing) typing.remove();

            // Show real response
            chatBox.innerHTML += `<div class="bot">${xhr.responseText}</div>`;
            chatBox.scrollTop = chatBox.scrollHeight;

        }, 1000); // ← 1 second delay
    };

    xhr.send("message=" + encodeURIComponent(msg));
}

function sendMessage() {
    let input = document.getElementById("userInput");
    let msg = input.value.trim();
    if (msg === "") return;

    let chatBox = document.getElementById("chatBox");

    // 1️⃣ Show user message
    chatBox.innerHTML += `<div class="user">${msg}</div>`;
    input.value = "";

    // 2️⃣ Create typing dots
    let typingDiv = document.createElement("div");
    typingDiv.className = "typing";
    typingDiv.id = "typing";

    typingDiv.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    // 3️⃣ AJAX request
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "chat.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = function () {

        // 4️⃣ Remove typing dots
        let typing = document.getElementById("typing");
        if (typing) typing.remove();

        // 5️⃣ Show bot response
        chatBox.innerHTML += `<div class="bot">${this.responseText}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    // 6️⃣ Send message
    xhr.send("message=" + msg);
}

