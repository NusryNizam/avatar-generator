import { axiosInstance } from "./api";
import { debounce } from "./utils";
import "./style.css";
import "./loader.css";

// get the current theme from the URL
const searchParams = new URLSearchParams(window.location.search);
document.body.dataset.theme = searchParams.get("theme") ?? "light";

const avatarEl = document.querySelector(".avatar") as HTMLDivElement;
const generateButton = document.querySelector("#generate") as HTMLButtonElement;
const multiAvatarButton = document.querySelector(
  "#multiAvatar"
) as HTMLButtonElement;
const diceBearButton = document.querySelector("#diceBear") as HTMLButtonElement;

multiAvatarButton.onclick = () => {
  diceBearButton.setAttribute("aria-selected", "false");
  multiAvatarButton.setAttribute("aria-selected", "true");
};

diceBearButton.onclick = () => {
  multiAvatarButton.setAttribute("aria-selected", "false");
  diceBearButton.setAttribute("aria-selected", "true");
};

generateButton.addEventListener("click", () => {
  // send message to plugin.ts
  // parent.postMessage("create-text", "*");
  generateButton.disabled = true;
  generateButton.innerHTML = `<div class="loader center " id="loader"></div>`;
  handleGenerate();
});

const handleGenerate = debounce(() => {
  console.log("Generating...");
  axiosInstance
    .get(Math.random().toString())
    .then((e) => {
      console.log(e.data);
      avatarEl.innerHTML = e.data;
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

// FIXME: Uncomment after dev
// handleGenerate();
