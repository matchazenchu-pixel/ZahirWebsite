// Zahir Accounting Surabaya — main.js
(function () {
  "use strict";

  // Tahun otomatis di footer
  document.querySelectorAll("[data-tahun]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Tema gelap/terang (toggle navbar + persistensi localStorage)
  var KUNCI_TEMA = "tema-zahir";
  function terapkanTema(gelap) {
    document.body.classList.toggle("dark", gelap);
    document.querySelectorAll(".tema-toggle").forEach(function (btn) {
      btn.setAttribute("aria-label", gelap ? "Ganti ke tema terang" : "Ganti ke tema gelap");
    });
  }
  var temaAwal = "terang";
  try {
    temaAwal = localStorage.getItem(KUNCI_TEMA) || "terang";
  } catch (e) {}
  terapkanTema(temaAwal === "gelap");
  document.querySelectorAll(".tema-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var gelap = !document.body.classList.contains("dark");
      terapkanTema(gelap);
      try {
        localStorage.setItem(KUNCI_TEMA, gelap ? "gelap" : "terang");
      } catch (e) {}
    });
  });

  // Navbar: efek blur saat scroll
  var navbar = document.querySelector(".navbar");
  if (navbar) {
    var onScroll = function () {
      navbar.classList.toggle("scrolled", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Menu mobile
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Dropdown di mobile: klik judul membuka daftar produk
    document.querySelectorAll(".dropdown > a.nav-link").forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.matchMedia("(max-width: 820px)").matches) {
          e.preventDefault();
          link.parentElement.classList.toggle("open");
        }
      });
    });
    // Tutup menu setelah memilih tautan
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (a.closest(".dropdown") && a.classList.contains("nav-link")) return;
        menu.classList.remove("open");
        toggle.classList.remove("open");
      });
    });
  }

  // Animasi reveal saat elemen masuk layar
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  // FAQ accordion
  document.querySelectorAll(".acc-item button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement;
      var body = item.querySelector(".acc-body");
      var buka = item.classList.contains("buka");

      document.querySelectorAll(".acc-item.buka").forEach(function (it) {
        it.classList.remove("buka");
        it.querySelector(".acc-body").style.maxHeight = null;
      });

      if (!buka) {
        item.classList.add("buka");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });

  // Formulir Permintaan Demo & Presentasi:
  // tanpa backend — pesan dirangkai lalu dibuka lewat WhatsApp.
  var form = document.getElementById("form-demo");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ambil = function (nama) {
        var el = form.querySelector('[name="' + nama + '"]');
        return el ? el.value.trim() : "";
      };
      var pesan =
        "Halo Zahir Surabaya, saya ingin meminta demo & presentasi.\n\n" +
        "*Nama Perusahaan:* " + ambil("perusahaan") + "\n" +
        "*Contact Person:* " + ambil("kontak") + "\n" +
        "*Email:* " + ambil("email") + "\n" +
        "*No. Telp/HP:* " + ambil("telepon") + "\n" +
        "*Jenis Usaha:* " + ambil("jenis") + "\n" +
        "*Alamat:* " + ambil("alamat");
      var url = "https://wa.me/628117577444?text=" + encodeURIComponent(pesan);
      window.open(url, "_blank");
    });
  }
  // ===== Form keluhan via tombol WhatsApp mengambang =====
  var ADMIN_WA = "628117577444";
  var FONNTE_TOKEN = ""; // Opsional: isi token Fonnte agar keluhan terkirim langsung ke WA admin

  function bikinModalKeluhan() {
    if (document.getElementById("modal-keluhan")) return;
    var wrap = document.createElement("div");
    wrap.id = "modal-keluhan";
    wrap.className = "modal-wa";
    wrap.hidden = true;
    wrap.innerHTML =
      '<div class="modal-backdrop" data-tutup></div>' +
      '<aside class="modal-kotak" role="dialog" aria-modal="true" aria-label="Chat WhatsApp dengan admin">' +
      '<div class="wa-panel-head">' +
      '<div class="modal-wa-ikon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div>' +
      '<div><h3>Tim Zahir Surabaya</h3><p><span class="wa-dot"></span> Online · biasanya membalas cepat</p></div>' +
      '<button type="button" class="modal-tutup" data-tutup aria-label="Tutup">&times;</button>' +
      '</div>' +
      '<div class="wa-panel-body">' +
      '<div class="wa-bubble">Halo 👋<br>Ada yang bisa kami bantu? Ceritakan keluhan atau pertanyaan Anda di bawah.</div>' +
      '<form id="form-keluhan">' +
      '<div class="modal-baris">' +
      '<label for="keluhan-nama">Nama<input id="keluhan-nama" name="nama" autocomplete="name" required placeholder="Nama Anda"></label>' +
      '<label for="keluhan-kontak">No. HP/WA<input id="keluhan-kontak" name="kontak" autocomplete="tel" required placeholder="08xxxxxxxxxx"></label>' +
      "</div>" +
      "<label for=\"keluhan-jenis\">Jenis pesan<select id=\"keluhan-jenis\" name=\"jenis\"><option>Keluhan</option><option>Butuh Bantuan</option><option>Pertanyaan</option><option>Lainnya</option></select></label>" +
      "<label for=\"keluhan-pesan\">Pesan<textarea id=\"keluhan-pesan\" name=\"pesan\" rows=\"3\" required placeholder=\"Tulis pesan Anda...\"></textarea></label>" +
      '<button type="submit" class="modal-kirim"><span>Kirim via WhatsApp</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>' +
      '<p class="modal-status" hidden aria-live="polite"></p>' +
      "</form>" +
      '</div>' +
      '<div class="wa-panel-foot">Aman &amp; privat · WhatsApp 0811-7577-444</div>' +
      "</aside>";
    document.body.appendChild(wrap);

    wrap.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-tutup")) tutupKeluhan();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !wrap.hidden) tutupKeluhan();
    });
    wrap.querySelector("#form-keluhan").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.target;
      var status = wrap.querySelector(".modal-status");
      var tampil = function (teks) { status.hidden = false; status.textContent = teks; };
      var pesan =
        "*Pesan dari website Zahir Surabaya*\n" +
        "Jenis: " + f.jenis.value + "\n" +
        "Nama: " + f.nama.value + "\n" +
        "Kontak: " + f.kontak.value + "\n\n" +
        f.pesan.value;
      var kirimWa = function () {
        window.open("https://wa.me/" + ADMIN_WA + "?text=" + encodeURIComponent(pesan), "_blank");
        tampil("✓ WhatsApp terbuka — tinggal tekan kirim, pesan Anda sampai ke admin.");
      };
      if (FONNTE_TOKEN) {
        status.hidden = false;
        status.textContent = "Mengirim ke admin...";
        fetch("https://api.fonnte.com/send", {
          method: "POST",
          headers: { "Authorization": FONNTE_TOKEN },
          body: new URLSearchParams({ target: ADMIN_WA, message: pesan })
        })
          .then(function (r) { return r.json(); })
          .then(function (res) {
            if (res && res.status === true) {
              f.reset();
              tampil("✓ Terkirim! Admin sudah menerima notifikasi di WhatsApp.");
            } else {
              kirimWa();
            }
          })
          .catch(function () { kirimWa(); });
      } else {
        kirimWa();
      }
    });
  }
  function tutupKeluhan() {
    var m = document.getElementById("modal-keluhan");
    if (m) m.hidden = true;
  }
  var waFloat = document.querySelector(".wa-float");
  if (waFloat) {
    waFloat.addEventListener("click", function (e) {
      e.preventDefault();
      bikinModalKeluhan();
      var m = document.getElementById("modal-keluhan");
      m.hidden = false;
      var input = m.querySelector("input");
      if (input) input.focus();
    });
  }
  // Pencarian unduhan (halaman Download)
  var cariDl = document.getElementById("cari-download");
  if (cariDl) {
    cariDl.addEventListener("input", function () {
      var q = this.value.trim().toLowerCase();
      document.querySelectorAll(".acc-item").forEach(function (item) {
        item.style.display = item.textContent.toLowerCase().indexOf(q) !== -1 ? "" : "none";
      });
    });
  }
})();