const apps = {
  agesnap: {
    name: "AgeSnap",
    initials: "AS",
    accent: "#3ddc84",
    rgb: "61, 220, 132",
  },
  fitindex: {
    name: "FitIndex BMI",
    initials: "FI",
    accent: "#3ddc84",
    rgb: "61, 220, 132",
  },
  loanmate: {
    name: "LoanMate",
    initials: "LM",
    accent: "#3ddc84",
    rgb: "61, 220, 132",
  },
  passforge: {
    name: "PassForge",
    initials: "PF",
    accent: "#3ddc84",
    rgb: "61, 220, 132",
  },
  focuspulse: {
    name: "FocusPulse",
    initials: "FP",
    accent: "#3ddc84",
    rgb: "61, 220, 132",
  },
  qrly: {
    name: "QRly",
    initials: "QR",
    accent: "#3ddc84",
    rgb: "61, 220, 132",
  },
  tiply: {
    name: "Tiply",
    initials: "TP",
    accent: "#3ddc84",
    rgb: "61, 220, 132",
  },
  hydratap: {
    name: "HydraTap",
    initials: "HT",
    accent: "#3ddc84",
    rgb: "61, 220, 132",
  },
  unitly: {
    name: "Unitly",
    initials: "UN",
    accent: "#3ddc84",
    rgb: "61, 220, 132",
  },
};

const hostnameKey = window.location.hostname.toLowerCase().split(".")[0];
const queryKey = new URLSearchParams(window.location.search).get("app");
const queryDocument = new URLSearchParams(window.location.search).get("document");
const app = apps[hostnameKey] || apps[queryKey] || apps.agesnap;
const appKey = apps[hostnameKey] ? hostnameKey : apps[queryKey] ? queryKey : "agesnap";
const documentType =
  window.location.pathname.startsWith("/terms") || queryDocument === "terms"
    ? "terms"
    : "privacy";

document.documentElement.style.setProperty("--accent", app.accent);
document.documentElement.style.setProperty("--accent-rgb", app.rgb);
const termsTitle = appKey === "unitly" ? "Terms of Use" : "Terms of Service";
document.title = `${documentType === "terms" ? termsTitle : "Privacy Policy"} — ${app.name}`;

document.querySelectorAll("[data-app-name]").forEach((element) => {
  element.textContent = app.name;
});

document.querySelectorAll("[data-app-initials]").forEach((element) => {
  element.textContent = app.initials;
});

document.querySelectorAll("[data-document]").forEach((element) => {
  const scope = element.dataset.appScope || "default";
  const matchesApp = scope === appKey || (scope === "default" && appKey !== "unitly");
  element.classList.toggle(
    "active",
    matchesApp && element.dataset.document === documentType,
  );
});

document.querySelectorAll("[data-document-link]").forEach((element) => {
  element.classList.toggle("active", element.dataset.documentLink === documentType);
});

if (appKey === "unitly") {
  document.querySelector("[data-draft-notice]").hidden = true;
  document.querySelector("[data-last-updated]").textContent = "June 2026";
  document.querySelector("[data-terms-label]").textContent = "Terms of Use";
}

document.querySelector("#year").textContent = new Date().getFullYear();
