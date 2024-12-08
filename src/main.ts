import { axiosInstance } from "./api";
import { debounce } from "./utils";
import "./style.css";
import "./loader.css";
import { generateAvatar } from "./diceBear";

// get the current theme from the URL
const searchParams = new URLSearchParams(window.location.search);
document.body.dataset.theme = searchParams.get("theme") ?? "light";

const multiAvatarEl = document.querySelector(".multi-avatar") as HTMLDivElement;
const diceBearContentEl = document.querySelector(
  ".dice-bear-content"
) as HTMLDivElement;
const generateButton = document.querySelector("#generate") as HTMLButtonElement;
const diceBearTab = document.querySelector("#diceBear") as HTMLButtonElement;
const multiAvatarTab = document.querySelector(
  "#multiAvatar"
) as HTMLButtonElement;

multiAvatarTab.onclick = () => {
  diceBearTab.setAttribute("aria-selected", "false");
  multiAvatarTab.setAttribute("aria-selected", "true");
  diceBearContentEl.style.display = "none";
  multiAvatarEl.style.display = "block";
};

diceBearTab.onclick = () => {
  multiAvatarTab.setAttribute("aria-selected", "false");
  diceBearTab.setAttribute("aria-selected", "true");
  multiAvatarEl.style.display = "none";
  diceBearContentEl.style.display = "block";
};

generateButton.addEventListener("click", async () => {
  // send message to plugin.ts
  // parent.postMessage("create-text", "*");

  if (multiAvatarTab.getAttribute("aria-selected") === "true") {
    generateButton.disabled = true;
    generateButton.innerHTML = `<div class="loader center " id="loader"></div>`;
    handleGenerate();
  } else {
    await generateAvatar();
  }
});

const handleGenerate = debounce(() => {
  console.log("Generating...");
  axiosInstance
    .get(Math.random().toString())
    .then((e) => {
      console.log(e.data);
      multiAvatarEl.innerHTML = e.data;
    })
    .catch((e) => console.log("Error: ", e))
    .finally(() => {
      generateButton.disabled = false;
      generateButton.innerHTML = "Generate";
    });
}, 1000);

// Listen plugin.ts messages
window.addEventListener("message", (event) => {
  if (event.data.source === "penpot") {
    document.body.dataset.theme = event.data.theme;
  }
});

handleGenerate();
