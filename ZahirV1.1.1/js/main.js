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
    wrap.hidden = true;
    wrap.innerHTML =
      '<div class="modal-backdrop" data-tutup></div>' +
      '<div class="modal-kotak" role="dialog" aria-modal="true" aria-label="Form keluhan dan bantuan">' +
      '<button type="button" class="modal-tutup" data-tutup aria-label="Tutup">&times;</button>' +
      '<h3>Ada keluhan atau butuh bantuan?</h3>' +
      '<p class="modal-sub">Tulis singkat saja — pesan Anda langsung diteruskan ke tim Zahir Surabaya.</p>' +
      '<form id="form-keluhan">' +
      '<div class="modal-baris">' +
      '<label>Nama<input name="nama" required placeholder="Nama Anda"></label>' +
      '<label>No. HP/WA<input name="kontak" required placeholder="08xxxxxxxxxx"></label>' +
      "</div>" +
      "<label>Jenis pesan<select name=\"jenis\"><option>Keluhan</option><option>Butuh Bantuan</option><option>Pertanyaan</option><option>Lainnya</option></select></label>" +
      "<label>Pesan<textarea name=\"pesan\" rows=\"4\" required placeholder=\"Tulis keluhan atau pertanyaan Anda...\"></textarea></label>" +
      '<button type="submit" class="modal-kirim">Kirim ke Admin</button>' +
      '<p class="modal-status" hidden></p>' +
      "</form></div>";
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
})();