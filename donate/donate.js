const walletAddress = "0x570c6d501669d915F9bE626c097A0482BeD9354D";
const copyButton = document.querySelector("[data-copy-address]");
const copyLabel = document.querySelector("[data-copy-label]");
const toast = document.querySelector("[data-toast]");
let toastTimer;

document.querySelector("#year").textContent = new Date().getFullYear();

const showCopiedState = () => {
  copyButton.classList.add("copied");
  copyLabel.textContent = "Address copied";
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    copyButton.classList.remove("copied");
    copyLabel.textContent = "Copy wallet address";
    toast.classList.remove("visible");
  }, 2400);
};

const copyWithFallback = () => {
  const input = document.createElement("textarea");
  input.value = walletAddress;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();
  return copied;
};

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(walletAddress);
    showCopiedState();
  } catch {
    if (copyWithFallback()) {
      showCopiedState();
      return;
    }

    copyLabel.textContent = "Press and hold the address";
  }
});
