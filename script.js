// ===== Canvas Background Animation =====
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function initParticles() {
  particles = [];
  const count = Math.min(90, Math.floor((W * H) / 16000));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      a: Math.random() * 0.5 + 0.3
    });
  }
}
initParticles();
window.addEventListener("resize", initParticles);

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(126, 224, 138, ${0.18 * (1 - dist / 130)})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.fillStyle = "rgba(3, 10, 6, 0.35)";
  ctx.fillRect(0, 0, W, H);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(126, 224, 138, ${p.a})`;
    ctx.shadowColor = "rgba(126, 224, 138, 0.9)";
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  drawLines();
  requestAnimationFrame(animate);
}
animate();

// ===== BRAND SCRAMBLE =====
(function () {
  const el = document.getElementById("brandLetters");
  if (!el) return;

  const FINAL_TEXT = "SYNTAX";
  const GLYPHS = "#$*!@%&?=+<>/\\|~^";

  function randomGlyph() {
    return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  }

  let scrambleTimer = null;
  let nextTimeout = null;

  function scrambleOnce() {
    let frame = 0;
    const totalFrames = 24;
    const interval = 50;

    clearInterval(scrambleTimer);
    scrambleTimer = setInterval(() => {
      frame++;
      let out = "";
      for (let i = 0; i < FINAL_TEXT.length; i++) {
        const lockPoint = Math.floor((frame / totalFrames) * FINAL_TEXT.length);
        if (i < lockPoint) {
          out += FINAL_TEXT[i];
        } else {
          out += randomGlyph();
        }
      }
      el.textContent = out;

      if (frame >= totalFrames) {
        clearInterval(scrambleTimer);
        el.textContent = FINAL_TEXT;
        scheduleNext();
      }
    }, interval);
  }

  function scheduleNext() {
    clearTimeout(nextTimeout);
    nextTimeout = setTimeout(() => {
      scrambleOnce();
    }, 4000);
  }

  scrambleOnce();
})();
// ===== LANGUAGE SWITCH (ID / EN) =====
(function () {
  const btn = document.getElementById("langBtn");
  const label = document.getElementById("langLabel");
  if (!btn || !label) return;

  const TRANSLATIONS = {
    id: {
      productTitle: "BinnX! PREMIUM MODULE ANDROID/MOBILADOR",
      desc: "SYX MODULE — Premium Generasi Terbaru. Dengan Fitur Optimalisasi Gpu, Cpu, Hardware, Cache Cleaning, Sensi Optimize, Fast Touch, Drag Smooth, Fps Optimalisasi. Support Android Device & Mobilador",
      btnVip: "LIHAT VIP",
      btnFree: "DOWNLOAD FREE",
      btnChannel: "SALURAN INFO BINNX",
      statVersion: "Version",
      statTier: "VIP Tier",
      statTrust: "Trust",
      statActive: "Always Active",
      featuresTitle: "KEUNTUNGAN MODULE SYNTAX?",
      f1name: "Cleaning Cache Otomatis",
      f1desc: "Membersihkan cache sistem game free fire mendalam, peforma lebih bersih dan optimal, loading lebih cepat, fps lebih ringan dari biasanya.",
      f1tag: "Deep Clean",
      f2name: "Up Peformance Android",
      f2desc: "Meningkatkan peforma device secara extrame, dari Gpu, Cpu, hingga hardware, sehingga permainan menjadi lebih smooth.",
      f2tag: "Boost",
      f3name: "Rendering Akurat",
      f3desc: "Menyesuaikan rendering dan resolusi secara otomatis dan akurat, tampilan lebih tajam, visual game dioptimalkan sesuai dengan hardware.",
      f3tag: "Auto",
      f4name: "Drag Smooth",
      f4desc: "Mengoptimalkan touch screen, melicinkan layar secara extrame, optimize crosshair, meningkatkan akurasi aim, mendapatkan headshot secara natural.",
      f4tag: "Smooth",
      f5name: "Sensi Optimizer",
      f5desc: "Meningkatkan sensitivity game secara signifikan, dari sensivity weapon, hingga sensivity touch screen.",
      f5tag: "Presisi",
      orderTitle: "CARA ORDER",
      o1: "Pilih Module Vip Yang Sesuai Dengan Anda.",
      o2: "Klik Buy Now, Transfer Melalui QRIS Yang Sudah Di Tampilkan, Lalu Screenshot Bukti Transfer Nya.",
      o3: "Klik Whatsapp Atau Telegram Yang Ada Di Bawah QRIS, Konfrimasi Ke Admin Dengan Menyebutkan Produk Module Yang Di Beli Dan Kirim Juga Bukti Transfer Ke Chat Admin.",
      o4: "Tunggu Admin Membalas Chat. !!Jangan Spam Admin!!. Tunggu Sampai Admin Mengirin File Module Nya.",
      orderFooter: "Fast Response • Proses Cepat Aman Dan Terpercaya",
      vipTitle: "MODULE VIP",
      vipSub: "Tiap Level Module Berbeda Fitur Di Semua Level Support Android 11+ & Mobilador.",
      stepsTitle: "EASY IN 4 STEPS",
      stepsSub: "Dari unduh sampai siap main hanya dalam hitungan menit. Tanpa skill teknis, tanpa root.",
      s1: "Unduh File Module Yang Sudah Anda Beli Lalu Buka Melalui Aplikasi MT Manager Atau Zachiver Dan Ekstrak File Module Nya",
      s2: "Buka Isi File Yang Berjudul \"Command\" Setelah Anda Klik Di Dalamnya Ada Code Untuk Run Di Brevent Atau Termux Lalu Anda Salin",
      s3: "Setelah Anda Salin, Kalian Jalankan Dulu Brevent Nya Melalui Proses Debug Nirkabel Yang Ada Di Opsi Devoloper Device Android Kalian",
      s4: "Jika Sudah Aktif Brevent Nya Kalian Klik Garis Tiga Di Pojok Kiri Atas, Setelah Kalian Klik Cari Teks Dengan Bertuliskan Command Dan Klik Lalu Langkah Terakhir Kalian Tempel Code Yang Kalian Salin Tadi Dan Klik Tanda Run di Sebelah Kanan Nya Dan Kalian Tinggal Buka Free Fire Nya Dan Bermain!",
      trustLine1: "MENGAPA",
      trustLine2: "KAMI",
      trustLine3: "TERPERCAYA",
      trustSub: "Kepercayaan Buyer Terhadap Kami Bukan Hanya Kebetulan, Tapi Kepercayaan, Mungkin Ada Buyer Yang Masih Ragu Ragu Tapi Kami Tidak Memaksa Orang Lain Untuk Membeli Produk Kami.",
      t1name: "Bukan Cheat — Legal",
      t1desc: "Module Vip Adalah Optimalisasi Device Untuk Android Atau Bisa Di Sebut Peningkatan Peforma, Bekerja Di Sistem Device Bukan Di Sistem Game.",
      t1tag: "SAFE FOR YOUR MAIN ACCOUNT",
      t2name: "Touch Drag Smooth",
      t2desc: "Teknologi Fast Touch Langsung Aktif Saat Kalian Run Module, Memberikan Pelicin Extra Secara Signifikan.",
      t3name: "Tidak Bisa Di Jual Belikan",
      t3desc: "Module Kami Sudah Khusus Kami Buat Untuk VIP, Module Sudah Kita Jadikan Encrypted, Tidak Bisa Di Edit, Atau Di Rename.",
      contactLabel: "— CONTACT",
      contactTitle: "CONTACT DEVOLOPER",
      contactSub: "Chat Admin If There Is A Disruption, Active 24 Hours 7 Days",
      whyTitle: "MENGAPA MEMILIH SYX?",
      whyText: "Module SYX bukan produk cheat yang bisa memberikan headshot secara instan karna script shell yang di run di brevent ataupun termux tidak akan menembus sistem game free fire",
      smart: "-BE SMART BUYER-",
      supportBtn: "SUPPORT",
      popupTes: "TesTimoni"
    },
    en: {
      productTitle: "BinnX! PREMIUM MODULE ANDROID/MOBILADOR",
      desc: "SYX MODULE — Latest Premium Generation. With GPU, CPU, Hardware Optimization, Cache Cleaning, Sensi Optimize, Fast Touch, Drag Smooth, FPS Optimization. Support Android Device & Mobilador",
      btnVip: "SEE VIP",
      btnFree: "DOWNLOAD FREE",
      btnChannel: "BINNX INFO CHANNEL",
      statVersion: "Version",
      statTier: "VIP Tier",
      statTrust: "Trust",
      statActive: "Always Active",
      featuresTitle: "WHY MODULE SYNTAX?",
      f1name: "Automatic Cache Cleaning",
      f1desc: "Deep cleans the free fire game system cache, for cleaner and more optimal performance, faster loading, lighter FPS than usual.",
      f1tag: "Deep Clean",
      f2name: "Android Performance Boost",
      f2desc: "Extremely boosts device performance, from GPU, CPU, to hardware, so gameplay becomes smoother.",
      f2tag: "Boost",
      f3name: "Accurate Rendering",
      f3desc: "Automatically and accurately adjusts rendering and resolution, sharper visuals, game visuals optimized according to hardware.",
      f3tag: "Auto",
      f4name: "Drag Smooth",
      f4desc: "Optimizes touch screen, extremely smooths the screen, optimizes crosshair, improves aim accuracy, gets natural headshots.",
      f4tag: "Smooth",
      f5name: "Sensi Optimizer",
      f5desc: "Significantly boosts game sensitivity, from weapon sensitivity, to touch screen sensitivity.",
      f5tag: "Precision",
      orderTitle: "HOW TO ORDER",
      o1: "Choose the VIP Module that suits you.",
      o2: "Click Buy Now, Transfer via the QRIS shown, then Screenshot your Transfer Proof.",
      o3: "Click WhatsApp or Telegram below the QRIS, Confirm to Admin by mentioning the Module Product you bought and send the Transfer Proof to Admin's chat.",
      o4: "Wait for Admin to reply. !!Don't Spam Admin!!. Wait until Admin sends the Module File.",
      orderFooter: "Fast Response • Fast, Safe & Trusted Process",
      vipTitle: "VIP MODULE",
      vipSub: "Each Module Level Has Different Features. All Levels Support Android 11+ & Mobilador.",
      stepsTitle: "EASY IN 4 STEPS",
      stepsSub: "From download to ready-to-play in just minutes. No tech skills needed, no root required.",
      s1: "Download the Module File you purchased, open it via MT Manager or ZArchiver and Extract the Module File",
      s2: "Open the file titled \"Command\", inside it there is Code to run in Brevent or Termux, then Copy it",
      s3: "After copying, run Brevent first via the Wireless Debugging process in your Android Developer Options",
      s4: "If Brevent is active, click the three lines at the top left corner, then find the text titled Command and click it, then finally paste the Code you copied and click the Run button on the right side, and you can open Free Fire and play!",
      trustLine1: "WHY",
      trustLine2: "WE ARE",
      trustLine3: "TRUSTED",
      trustSub: "Buyer trust in us is not a coincidence, it's trust. Some buyers may still hesitate, but we don't force anyone to buy our products.",
      t1name: "Not Cheat — Legal",
      t1desc: "VIP Module is Device Optimization for Android, or can be called Performance Enhancement. It works in the Device System, not the Game System.",
      t1tag: "SAFE FOR YOUR MAIN ACCOUNT",
      t2name: "Touch Drag Smooth",
      t2desc: "Fast Touch Technology activates immediately when you Run the Module, providing significant Extra Smoothness.",
      t3name: "Cannot Be Resold",
      t3desc: "Our Module is specially made for VIP. The Module is Encrypted, cannot be Edited or Renamed.",
      contactLabel: "— CONTACT",
      contactTitle: "CONTACT DEVELOPER",
      contactSub: "Chat Admin If There Is A Disruption, Active 24 Hours 7 Days",
      whyTitle: "WHY CHOOSE SYX?",
      whyText: "SYX Module is not a cheat product that gives instant headshots because shell scripts run in brevent or termux cannot penetrate the free fire game system",
      smart: "-BE SMART BUYER-",
      supportBtn: "SUPPORT",
      popupTes: "Testimonials"
    }
  };

  let currentLang = "id";

  function setText(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }
  function setDataText(selector, text) {
    const el = document.querySelector(selector);
    if (el) {
      el.textContent = text;
      el.setAttribute("data-text", text);
    }
  }

  function applyLang(lang) {
    const t = TRANSLATIONS[lang];

    setText(".product-title", t.productTitle);
    setText(".desc", t.desc);

    const actionBtns = document.querySelectorAll(".btn-action span");
    if (actionBtns[0]) actionBtns[0].textContent = t.btnVip;
    if (actionBtns[1]) actionBtns[1].textContent = t.btnFree;
    if (actionBtns[2]) actionBtns[2].textContent = t.btnChannel;

    const statLabels = document.querySelectorAll(".stat-label");
    if (statLabels[0]) statLabels[0].textContent = t.statVersion;
    if (statLabels[1]) statLabels[1].textContent = t.statTier;
    if (statLabels[2]) statLabels[2].textContent = t.statTrust;
    if (statLabels[3]) statLabels[3].textContent = t.statActive;

    setDataText(".features-title", t.featuresTitle);

    const fNames = document.querySelectorAll(".feature-name");
    const fDescs = document.querySelectorAll(".feature-desc");
    const fTags  = document.querySelectorAll(".feature-tag");
    if (fNames[0]) fNames[0].textContent = t.f1name;
    if (fNames[1]) fNames[1].textContent = t.f2name;
    if (fNames[2]) fNames[2].textContent = t.f3name;
    if (fNames[3]) fNames[3].textContent = t.f4name;
    if (fNames[4]) fNames[4].textContent = t.f5name;
    if (fDescs[0]) fDescs[0].textContent = t.f1desc;
    if (fDescs[1]) fDescs[1].textContent = t.f2desc;
    if (fDescs[2]) fDescs[2].textContent = t.f3desc;
    if (fDescs[3]) fDescs[3].textContent = t.f4desc;
    if (fDescs[4]) fDescs[4].textContent = t.f5desc;
    if (fTags[0]) fTags[0].textContent = t.f1tag;
    if (fTags[1]) fTags[1].textContent = t.f2tag;
    if (fTags[2]) fTags[2].textContent = t.f3tag;
    if (fTags[3]) fTags[3].textContent = t.f4tag;
    if (fTags[4]) fTags[4].textContent = t.f5tag;

    setDataText(".cara-order-title", t.orderTitle);
    const oTexts = document.querySelectorAll(".order-text");
    if (oTexts[0]) oTexts[0].textContent = t.o1;
    if (oTexts[1]) oTexts[1].textContent = t.o2;
    if (oTexts[2]) oTexts[2].textContent = t.o3;
    if (oTexts[3]) oTexts[3].textContent = t.o4;
    setText(".order-footer-text", t.orderFooter);

    setDataText(".vip-title", t.vipTitle);
    setText(".vip-sub", t.vipSub);

    setDataText(".steps-title", t.stepsTitle);
    setText(".steps-sub", t.stepsSub);
    const stepTexts = document.querySelectorAll(".step-text");
    if (stepTexts[0]) stepTexts[0].textContent = t.s1;
    if (stepTexts[1]) stepTexts[1].textContent = t.s2;
    if (stepTexts[2]) stepTexts[2].textContent = t.s3;
    if (stepTexts[3]) stepTexts[3].textContent = t.s4;

    const trustSpans = document.querySelectorAll(".trust-title span");
    if (trustSpans[0]) trustSpans[0].textContent = t.trustLine1;
    if (trustSpans[1]) trustSpans[1].textContent = t.trustLine2;
    if (trustSpans[2]) trustSpans[2].textContent = t.trustLine3;
    setText(".trust-sub", t.trustSub);

    const tNames = document.querySelectorAll(".trust-name");
    const tDescs = document.querySelectorAll(".trust-desc");
    const tTags  = document.querySelectorAll(".trust-tag");
    if (tNames[0]) tNames[0].textContent = t.t1name;
    if (tNames[1]) tNames[1].textContent = t.t2name;
    if (tNames[2]) tNames[2].textContent = t.t3name;
    if (tDescs[0]) tDescs[0].textContent = t.t1desc;
    if (tDescs[1]) tDescs[1].textContent = t.t2desc;
    if (tDescs[2]) tDescs[2].textContent = t.t3desc;
    if (tTags[0]) tTags[0].textContent = t.t1tag;

    setText(".contact-label", t.contactLabel);
    setDataText(".contact-title", t.contactTitle);
    setText(".contact-sub", t.contactSub);

    setDataText(".why-title", t.whyTitle);
    const whyP = document.querySelector(".why p");
    if (whyP) whyP.textContent = t.whyText;
    setText(".smart", t.smart);

    const supportBtn = document.getElementById("supportBtn");
    if (supportBtn) supportBtn.textContent = t.supportBtn;
    const popupLink = document.querySelector(".support-link");
    if (popupLink) popupLink.textContent = t.popupTes;

    label.textContent = lang.toUpperCase();
  }

  btn.addEventListener("click", () => {
    currentLang = currentLang === "id" ? "en" : "id";
    applyLang(currentLang);
  });
})();
// ===== SUPPORT POPUP =====
(function () {
  const btn = document.getElementById("supportBtn");
  const popup = document.getElementById("supportPopup");
  if (!btn || !popup) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    popup.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!popup.contains(e.target) && e.target !== btn) {
      popup.classList.remove("active");
    }
  });
})();

// ===== LIHAT VIP — scroll ke produk =====
(function () {
  const btn = document.getElementById("btnLihatVip");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const target = document.getElementById("products");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();

// ===== Modal Payment =====
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalProduct = document.getElementById("modalProduct");
const modalPrice = document.getElementById("modalPrice");
const tgLink = document.getElementById("tgLink");
const waLink = document.getElementById("waLink");

const TG_BASE = "https://t.me/BinnXxT";
const WA_BASE = "https://wa.me/6283823978564";

document.querySelectorAll(".buy").forEach(btn => {
  btn.addEventListener("click", () => {
    const product = btn.dataset.product;
    const price = btn.dataset.price;

    modalProduct.textContent = "Produk: " + product;
    modalPrice.textContent = "Harga: " + price;

    const msg = encodeURIComponent(
      `Confirm Payment to admin\nberikan detail bukti transfer dan sebutkan produk apa yang di beli\n\nProduk: ${product}\nHarga: ${price}`
    );

    tgLink.href = TG_BASE + "?text=" + msg;
    waLink.href = WA_BASE + "?text=" + msg;

    modal.classList.add("active");
  });
});

closeModal.addEventListener("click", () => modal.classList.remove("active"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});