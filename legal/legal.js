const apps = {
  agesnap: {
    name: "AgeSnap",
    initials: "AS",
    accent: "#ff7657",
    rgb: "255, 118, 87",
  },
  fitindex: {
    name: "FitIndex BMI",
    initials: "FI",
    accent: "#7ee081",
    rgb: "126, 224, 129",
  },
  loanmate: {
    name: "LoanMate",
    initials: "LM",
    accent: "#63a9ff",
    rgb: "99, 169, 255",
  },
  passforge: {
    name: "PassForge",
    initials: "PF",
    accent: "#b88cff",
    rgb: "184, 140, 255",
  },
  focuspulse: {
    name: "FocusPulse",
    initials: "FP",
    accent: "#ffcc5c",
    rgb: "255, 204, 92",
  },
  qrly: {
    name: "QRly",
    initials: "QR",
    accent: "#43d9c2",
    rgb: "67, 217, 194",
  },
  tiply: {
    name: "Tiply",
    initials: "TP",
    accent: "#ff83bb",
    rgb: "255, 131, 187",
  },
  hydratap: {
    name: "HydraTap",
    initials: "HT",
    accent: "#51c9ff",
    rgb: "81, 201, 255",
  },
};

const hostnameKey = window.location.hostname.toLowerCase().split(".")[0];
const queryKey = new URLSearchParams(window.location.search).get("app");
const queryDocument = new URLSearchParams(window.location.search).get("document");
const app = apps[hostnameKey] || apps[queryKey] || apps.agesnap;
const documentType =
  window.location.pathname.startsWith("/terms") || queryDocument === "terms"
    ? "terms"
    : "privacy";

document.documentElement.style.setProperty("--accent", app.accent);
document.documentElement.style.setProperty("--accent-rgb", app.rgb);
document.title = `${documentType === "terms" ? "Terms of Service" : "Privacy Policy"} — ${app.name}`;

document.querySelectorAll("[data-app-name]").forEach((element) => {
  element.textContent = app.name;
});

document.querySelectorAll("[data-app-initials]").forEach((element) => {
  element.textContent = app.initials;
});

document.querySelectorAll("[data-document]").forEach((element) => {
  element.classList.toggle("active", element.dataset.document === documentType);
});

document.querySelectorAll("[data-document-link]").forEach((element) => {
  element.classList.toggle("active", element.dataset.documentLink === documentType);
});

document.querySelector("#year").textContent = new Date().getFullYear();
