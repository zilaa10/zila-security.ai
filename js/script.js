// =========================
// ZILA AI CHATBOT
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const chatBody = document.getElementById("chatBody");
  const chatInput = document.getElementById("chatInput");

  // FUNGSI TAMPILKAN PESAN BOT
  function botMessage(text) {
    chatBody.innerHTML += `
      <div class="chat-bot">
        <img src="./assets/zila-ai.png" alt="ZILA AI">
        <span>${text}</span>
      </div>
    `;
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // FUNGSI TAMPILKAN PESAN USER
  function userMessage(text) {
    chatBody.innerHTML += `
      <div class="chat-user">
        <span>${text}</span>
      </div>
    `;
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // RESPON OTOMATIS BOT (Hanya tentang ZILA Security)
  const botReplies = [
    "ZILA Token is protected by military-grade encryption.",
    "Each ZILA block is cryptographically linked for maximum integrity.",
    "AI-powered monitoring protects the network 24/7.",
    "ZILA uses multi-layer blockchain security protocols.",
    "Advanced security measures keep ZILA token safe and reliable."
  ];

  // AUTO DETECT BAHASA
  const userLang = navigator.language || navigator.userLanguage;
  let lang = "en";
  if (userLang.startsWith("id")) lang = "id";

  const botIntro = {
    en: "Hello! I'm ZILA AI. How can I help you today?",
    id: "Halo! Saya ZILA AI. Ada yang bisa saya bantu?"
  };

  // TAMPILKAN INTRO BOT
  botMessage(botIntro[lang] || botIntro.en);

  // KIRIM PESAN USER & BOT
  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    userMessage(text);
    chatInput.value = "";

    setTimeout(() => {
      const reply = botReplies[Math.floor(Math.random() * botReplies.length)];
      botMessage(reply);
    }, 600);
  }

  // ENTER KEY
  chatInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });

  // IKON KIRIM (PESAWAT KERTAS)
  const sendButton = document.createElement("div");
  sendButton.id = "chatSend";
  sendButton.innerHTML = "✈️";
  document.body.appendChild(sendButton);

  sendButton.addEventListener("click", sendMessage);

  // TOGGLE CHATBOT
  const toggle = document.getElementById("chat-toggle");
  toggle.addEventListener("click", () => {
    const chat = document.getElementById("chatbot");
    chat.classList.toggle("active");
  });
});
