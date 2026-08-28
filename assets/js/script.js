/**
 * HERO HOME TECH SOLUTIONS - GLOBAL JAVASCRIPT
 */

// Global Config (Editable)
const WHATSAPP_NUMBER = "250784710788";
const DEFAULT_EMAIL = "info.herohometechs@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initWhatsAppButtons();
  initContactForm();
  replacePlaceholders();
});

/**
 * 1. Mobile Navigation Toggle
 */
function initMobileNav() {
  const toggleBtn = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
      toggleBtn.setAttribute("aria-expanded", !expanded);
      navMenu.classList.toggle("show");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("show");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }
}

/**
 * 2. WhatsApp Trigger Handlers
 */
function initWhatsAppButtons() {
  const triggers = document.querySelectorAll(".js-whatsapp-trigger");

  triggers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const defaultMsg = encodeURIComponent("Hello Hero Home Tech Solutions, I would like to inquire about your services.");
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMsg}`;
      window.open(waUrl, "_blank");
    });
  });
}

/**
 * 3. Contact Form Validation & WhatsApp Redirection
 */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  // Auto-fill service from URL param if available
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get("service") || urlParams.get("project");
  if (serviceParam) {
    const serviceSelect = document.getElementById("service");
    if (serviceSelect) {
      for (let option of serviceSelect.options) {
        if (option.value.toLowerCase().includes(serviceParam.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const name = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim() || "Not provided";
      const service = document.getElementById("service").value;
      const budget = document.getElementById("budget").value;
      const description = document.getElementById("description").value.trim();

      const formattedMessage = 
`Hello Hero Home Tech Solutions,

My name is ${name}.

I am interested in: ${service}

Project Details:
${description}

Budget Range: ${budget}
Contact Email: ${email}
Phone: ${phone}`;

      const encodedText = encodeURIComponent(formattedMessage);
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

      const successBox = document.getElementById("formSuccess");
      if (successBox) successBox.style.display = "block";

      setTimeout(() => {
        window.open(waUrl, "_blank");
      }, 1000);
    }
  });
}

function validateForm() {
  let isValid = true;

  const fields = [
    { id: "fullName", errorId: "fullNameError" },
    { id: "email", errorId: "emailError", isEmail: true },
    { id: "service", errorId: "serviceError" },
    { id: "description", errorId: "descriptionError" }
  ];

  fields.forEach(field => {
    const input = document.getElementById(field.id);
    const errorSpan = document.getElementById(field.errorId);
    const parent = input.parentElement;

    let fieldValid = true;
    if (!input.value.trim()) {
      fieldValid = false;
    } else if (field.isEmail && !validateEmail(input.value.trim())) {
      fieldValid = false;
    }

    if (!fieldValid) {
      parent.classList.add("error");
      isValid = false;
    } else {
      parent.classList.remove("error");
    }
  });

  return isValid;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * 4. Replace Config Placeholders
 */
function replacePlaceholders() {
  document.querySelectorAll(".js-placeholder-phone").forEach(el => {
    el.textContent = WHATSAPP_NUMBER;
  });
  document.querySelectorAll(".js-placeholder-email").forEach(el => {
    el.textContent = DEFAULT_EMAIL;
  });
}
