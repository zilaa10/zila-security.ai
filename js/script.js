// =========================
// LANGUAGE DETECT & Three.js
// =========================
const userLang = navigator.language || navigator.userLanguage;
let lang = "en";
if(userLang.startsWith("id")) lang = "id";

// Three.js background
// (semua kode three-bg.js tetap dipanggil)
