import { createAvatar, StyleMeta } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import { setSvg } from "./main";

const options = [
  "Avataaars",
  "Bootstrap Icons",
  "Initials",
  "Avatar Illustration System",
  "Miniavs - Free Avatar Creator",
  "Notionists",
  "Open Peeps",
  "Personas by Draftbit",
];

const avatarDiceBearEl = document.querySelector(
  ".avatar-dice-bear"
) as HTMLDivElement;

const metaEl = document.querySelector(".meta") as HTMLDivElement;

const selectElement = document.querySelector(
  "#avatar-packs"
) as HTMLSelectElement;
selectElement.innerHTML = "";

options.forEach((option) => {
  const optionElement = document.createElement("option");
  optionElement.value = option as string;
  optionElement.textContent = option as string;
  selectElement.appendChild(optionElement);
});

async function generateOnLoad() {
  const str = await generateAvatar();
  avatarDiceBearEl.innerHTML = str;
  setSvg(false, str);
}

generateOnLoad();

selectElement.addEventListener("change", async () => {
  const str = await generateAvatar();
  avatarDiceBearEl.innerHTML = str;
  setSvg(false, str);
});

export async function generateAvatar() {
  let importedPack;
  let svgStr;

  switch (selectElement.value) {
    case "Avataaars":
      importedPack = (await import("@dicebear/collection")).avataaars;
      populateMeta(importedPack.meta);
      svgStr = createAvatar(importedPack, {
        seed: Math.random().toString(),
      }).toJson().svg;
      avatarDiceBearEl.innerHTML = svgStr;
      setSvg(false, svgStr);
      return svgStr;

    case "Bootstrap Icons":
      importedPack = (await import("@dicebear/collection")).icons;
      populateMeta(importedPack.meta);
      svgStr = createAvatar(importedPack, {
        seed: Math.random().toString(),
      }).toJson().svg;
      avatarDiceBearEl.innerHTML = svgStr;
      setSvg(false, svgStr);

      return svgStr;

    case "Initials":
      importedPack = (await import("@dicebear/collection")).initials;
      populateMeta(importedPack.meta);
      svgStr = createAvatar(importedPack, {
        seed: getRandomLetters(),
      }).toJson().svg;
      avatarDiceBearEl.innerHTML = svgStr;
      setSvg(false, svgStr);

      return svgStr;

    case "Avatar Illustration System":
      importedPack = (await import("@dicebear/collection")).micah;
      populateMeta(importedPack.meta);
      svgStr = createAvatar(importedPack, {
        seed: Math.random().toString(),
      }).toJson().svg;
      avatarDiceBearEl.innerHTML = svgStr;
      setSvg(false, svgStr);

      return svgStr;

    case "Miniavs - Free Avatar Creator":
      importedPack = (await import("@dicebear/collection")).miniavs;
      populateMeta(importedPack.meta);
      svgStr = createAvatar(importedPack, {
        seed: Math.random().toString(),
      }).toJson().svg;
      avatarDiceBearEl.innerHTML = svgStr;
      setSvg(false, svgStr);

      return svgStr;

    case "Notionists":
      importedPack = (await import("@dicebear/collection")).notionists;
      populateMeta(importedPack.meta);
      svgStr = createAvatar(importedPack, {
        seed: Math.random().toString(),
      }).toJson().svg;
      avatarDiceBearEl.innerHTML = svgStr;
      setSvg(false, svgStr);

      return svgStr;

    case "Open Peeps":
      importedPack = (await import("@dicebear/collection")).openPeeps;
      populateMeta(importedPack.meta);
      svgStr = createAvatar(importedPack, {
        seed: Math.random().toString(),
      }).toJson().svg;
      avatarDiceBearEl.innerHTML = svgStr;
      setSvg(false, svgStr);

      return svgStr;

    case "Personas by Draftbit":
      importedPack = (await import("@dicebear/collection")).personas;
      populateMeta(importedPack.meta);
      svgStr = createAvatar(importedPack, {
        seed: Math.random().toString(),
      }).toJson().svg;
      avatarDiceBearEl.innerHTML = svgStr;
      setSvg(false, svgStr);

      return svgStr;

    default:
      populateMeta(avataaars.meta);
      svgStr = createAvatar(avataaars, {
        seed: Math.random().toString(),
      }).toJson().svg;
      avatarDiceBearEl.innerHTML = svgStr;
      setSvg(false, svgStr);

      return svgStr;
  }
}

function populateMeta(data: StyleMeta) {
  metaEl.innerHTML = `
    <div>${data.title} by 
        <a href="${data.homepage}" target="_blank">${data.creator}</a> 
    </div>
    <div>
        Licensed under <a href="${data.license?.url}" target="_blank">${data.license?.name}</a>
    </div>
    <br>
    `;
}

function getRandomLetters(): string {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const firstLetter = letters[Math.floor(Math.random() * letters.length)];
  const secondLetter = letters[Math.floor(Math.random() * letters.length)];
  return firstLetter + secondLetter;
}
