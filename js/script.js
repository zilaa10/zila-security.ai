// =========================
// 1. SERVICE WORKER (PWA)
// =========================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

// =========================
// 2. NAVBAR ACTIVE STATE
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const current = location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
});

// =========================
// 3. CHATBOT TOGGLE (FLOATING BUTTON)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.createElement("div");
  toggle.id = "chat-toggle";
  toggle.innerHTML = "⋮";
  document.body.appendChild(toggle);

  const chatbot = document.getElementById("chatbot");
  toggle.addEventListener("click", () => {
    chatbot.classList.toggle("active");
  });
});

// =========================
// 4. CHATBOT AUTO REPLY (PALING BAWAH)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("chatInput");
  const body = document.getElementById("chatBody");

  if (!input || !body) return; // safety

  const replies = [
    "ZILA Token uses military-grade encryption to secure all transactions.",
    "Each blockchain block is cryptographically linked for maximum integrity.",
    "ZILA applies multi-layer security protocols to prevent attacks.",
    "AI-powered monitoring protects the network 24/7.",
    "ZILA blockchain has no single point of failure.",
    "Advanced security protocols keep ZILA token safe and reliable."
  ];

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = type === "user" ? "chat-user" : "chat-bot";
    msg.textContent = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && input.value.trim() !== "") {
      const userText = input.value.trim();
      addMessage(userText, "user");
      input.value = "";

      setTimeout(() => {
        const reply = replies[Math.floor(Math.random() * replies.length)];
        addMessage(reply, "bot");
      }, 600);
    }
  });
});
