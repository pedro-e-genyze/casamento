(function () {
  "use strict";

  // ---------- Mobile nav ----------
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // ---------- Pix modal ----------
  var modal = document.getElementById("pixModal");
  var modalItem = document.getElementById("pixModalItem");
  var modalPrice = document.getElementById("pixModalPrice");
  var modalClose = document.getElementById("pixModalClose");
  var modalCopy = document.getElementById("pixModalCopy");
  var modalKey = document.getElementById("pixModalKey");

  var buyButtons = document.querySelectorAll(".product-buy");

  function formatBRL(value) {
    var n = parseFloat(value);
    if (isNaN(n)) return value;
    return "R$ " + n.toFixed(2).replace(".", ",");
  }

  function openModal(name, price) {
    modalItem.textContent = name;
    modalPrice.textContent = formatBRL(price);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  buyButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".product-card");
      openModal(card.dataset.name, card.dataset.price);
    });
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (modal && modal.classList.contains("open") && e.key === "Escape") closeModal();
  });

  if (modalCopy && modalKey) {
    modalCopy.addEventListener("click", function () {
      var key = modalKey.textContent.trim();
      navigator.clipboard.writeText(key).then(function () {
        var original = modalCopy.textContent;
        modalCopy.textContent = "Copiado!";
        setTimeout(function () {
          modalCopy.textContent = original;
        }, 2000);
      });
    });
  }
})();
