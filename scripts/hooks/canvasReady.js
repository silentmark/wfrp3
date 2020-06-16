Hooks.on("canvasReady", (canvas) => {

  if (!(game.modules.get("fxmaster") && game.modules.get("fxmaster").active))
  {
    morrsliebActive = canvas.scene.getFlag("wfrp3", "morrslieb")
    if (morrsliebActive)
    {
      canvas.background.filters.push(CONFIG.Morrslieb)
      canvas.tiles.filters.push(CONFIG.Morrslieb)
      canvas.tokens.filters.push(CONFIG.Morrslieb)
    }
  }
})