const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");

chatInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    chatBody.innerHTML += `<div>You: ${chatInput.value}</div>`;
    chatBody.innerHTML += `<div>ZILA-AI: Security confirmed.</div>`;
    chatInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
  }
});
