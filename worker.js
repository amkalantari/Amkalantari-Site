const APP_SUBDOMAINS = new Set([
  "agesnap",
  "fitindex",
  "loanmate",
  "passforge",
  "focuspulse",
  "qrly",
  "tiply",
  "hydratap",
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const subdomain = url.hostname.toLowerCase().split(".")[0];
    const isAppDomain = APP_SUBDOMAINS.has(subdomain);
    const isLegalRoute =
      url.pathname === "/" ||
      url.pathname === "/privacy" ||
      url.pathname === "/privacy/" ||
      url.pathname === "/terms" ||
      url.pathname === "/terms/";

    if (isAppDomain && isLegalRoute) {
      const legalUrl = new URL("/legal/index.html", url);
      return env.ASSETS.fetch(new Request(legalUrl, request));
    }

    return env.ASSETS.fetch(request);
  },
};
