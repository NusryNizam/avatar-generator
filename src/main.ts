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
const diceBearTab = document.querySelector("#diceBear") as HTMLButtonElement;
const multiAvatarTab = document.querySelector(
  "#multiAvatar"
) as HTMLButtonElement;

const generateButton = document.querySelector("#generate") as HTMLButtonElement;
const insertButton = document.querySelector("#insert") as HTMLButtonElement;

let multiAvatarSvg = "";
let diceBearSvg = "";

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

const handleInsert = () => {
  if (
    multiAvatarSvg &&
    multiAvatarTab.getAttribute("aria-selected") === "true"
  ) {
    parent.postMessage(
      {
        type: "insert",
        data: multiAvatarSvg,
      },
      "*"
    );

    return;
  }

  if (diceBearSvg && diceBearTab.getAttribute("aria-selected") === "true") {
    parent.postMessage(
      {
        type: "insert",
        data: diceBearSvg,
      },
      "*"
    );

    return;
  }
};

insertButton.addEventListener("click", handleInsert);

const handleGenerate = debounce(() => {
  axiosInstance
    .get(Math.random().toString())
    .then((e) => {
      multiAvatarEl.innerHTML = e.data;
      setSvg(true, e.data);
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

export function setSvg(isMultiAvatar = true, data: string) {
  if (isMultiAvatar) {
    multiAvatarSvg = data;
    return;
  }

  diceBearSvg = data;
}
