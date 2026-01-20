/* =========================
   ZILA GLOBAL SCRIPT
   ========================= */

// SERVICE WORKER REGISTER (PWA)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(err => {
      console.log("SW registration failed:", err);
    });
  });
}

// SIMPLE NAVBAR ACTIVE STATE
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const current = location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
});

// LIGHT PERFORMANCE MODE (LOW-END HP)
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
  document.body.classList.add("low-end");
}
