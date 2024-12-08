penpot.ui.open("Avatar Generator", `?theme=${penpot.theme}`, {
  width: 270,
  height: 540,
});

penpot.ui.onMessage<{ type: string; data: string }>((message) => {
  console.log("AAAAA");
  console.log(message.type);
  console.log(message.data);
  if (message.type === "insert") {
    const path = penpot.createShapeFromSvg(message.data);

    if (path) {
      path.x = penpot.viewport.center.x;
      path.y = penpot.viewport.center.y;
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
