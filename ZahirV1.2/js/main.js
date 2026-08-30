// Zahir Accounting Surabaya — main.js
(function () {
  "use strict";

  // Tahun otomatis di footer
  document.querySelectorAll("[data-tahun]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
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
})();