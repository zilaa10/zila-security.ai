const langData = {
  en: {
    home: "Home",
    security: "Security",
    heroTitle: "Military-Grade Blockchain Security",
    heroDesc: "Advanced encryption and AI-powered defense",
    sec1Title: "Advanced Encryption",
    sec1Desc: "Military-grade cryptography",
    sec2Title: "Secure Block Validation",
    sec2Desc: "Each block reinforces the next",
    sec3Title: "AI Security Layer",
    sec3Desc: "Real-time AI protection"
  },
  id: {
    home: "Beranda",
    security: "Keamanan",
    heroTitle: "Keamanan Blockchain Tingkat Militer",
    heroDesc: "Enkripsi canggih dan perlindungan AI",
    sec1Title: "Enkripsi Tingkat Militer",
    sec1Desc: "Keamanan aset & transaksi",
    sec2Title: "Validasi Blok Aman",
    sec2Desc: "Setiap blok saling menguatkan",
    sec3Title: "Lapisan Keamanan AI",
    sec3Desc: "Perlindungan real-time"
  }
};

document.getElementById("langSwitcher").onchange = e => {
  const lang = e.target.value;
  document.querySelectorAll("[data-lang]").forEach(el => {
    el.textContent = langData[lang][el.dataset.lang];
  });
};
