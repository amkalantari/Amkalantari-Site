const APP_SUBDOMAINS = new Set([
  "agesnap",
  "fitindex",
  "loanmate",
  "passforge",
  "focuspulse",
  "qrly",
  "tiply",
  "hydratap",
  "unitly",
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const subdomain = url.hostname.toLowerCase().split(".")[0];
    const isAppDomain = APP_SUBDOMAINS.has(subdomain);
    const isMainDomain =
      url.hostname === "amkalantari.com" || url.hostname === "www.amkalantari.com";
    const isLegalRoute =
      url.pathname === "/" ||
      url.pathname === "/privacy" ||
      url.pathname === "/privacy/" ||
      url.pathname === "/terms" ||
      url.pathname === "/terms/";

    if (isAppDomain && isLegalRoute) {
      const legalUrl = new URL("/legal/", url);
      return env.ASSETS.fetch(new Request(legalUrl, request));
    }

    if (isMainDomain && (url.pathname === "/donate" || url.pathname === "/donate/")) {
      const donateUrl = new URL("/donate/", url);
      return env.ASSETS.fetch(new Request(donateUrl, request));
    }

    return env.ASSETS.fetch(request);
  },
};
