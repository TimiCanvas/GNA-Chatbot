document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("send-button");
    const userMessageInput = document.getElementById("user-message");
    const chatOutput = document.getElementById("chat-output");

    sendButton.addEventListener("click", sendMessage);
    userMessageInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = userMessageInput.value.trim();
        if (userMessage === "") {
            return;
        }

        // Add user message to chat
        addMessageToChat(userMessage, "user-message");
        userMessageInput.value = "";

        // Send message to the Flask server
        fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                addMessage
