penpot.ui.open("Avatar Generator", `?theme=${penpot.theme}`, {
  width: 260,
  height: 460,
});

penpot.ui.onMessage<string>((message) => {
  if (message === "create-text") {
    const text = penpot.createText("Hello world!");

    if (text) {
      text.x = penpot.viewport.center.x;
      text.y = penpot.viewport.center.y;

      penpot.selection = [text];
    }
  }
});

// Update the theme in the iframe
penpot.on("themechange", (theme) => {
  penpot.ui.sendMessage({
    source: "penpot",
    type: "themechange",
    theme,
  });
});
