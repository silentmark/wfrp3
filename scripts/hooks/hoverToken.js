Hooks.on('hoverToken', async (token, hovered) => {
    if (!token)
        return;
    if (hovered) {
        canvas.hud.WfrpCustomToken.actorData = token.actor.data.data;
        canvas.hud.WfrpCustomToken.bind(token);
    } else {
        canvas.hud.WfrpCustomToken.clear();
    }
  });


Token.prototype.drawBars = (function() {
return function() {
    if ( !this.actor || (this.data.displayBars === CONST.TOKEN_DISPLAY_MODES.NONE) ) return;
    ["bar1", "bar2"].forEach((b, i) => {
      const bar = this.bars[b];
      const attr = this.getBarAttribute(b);
      if ( !attr || (attr.type !== "bar") ){
          return bar.visible = false;
      }
      const val = Number(attr.value);
      const pct = Math.clamped(val, 0, attr.max) / attr.max;
      let h = Math.max((canvas.dimensions.size / 12), 8);
      if ( this.data.height >= 2 ) h *= 1.6;  // Enlarge the bar for large tokens
  
      // Draw the bar
      let color = (i === 0) ? "#ff3300" : "#cf750e"
      bar.clear()
         .beginFill(0x000000, 0.5)
         .lineStyle(2, 0x000000, 0.9)
         .drawRoundedRect(0, 0, this.w, h, 3)
         .beginFill(PIXI.utils.string2hex(color), pct)
         .lineStyle(1, 0x000000, 0.8)
         .drawRoundedRect(1, 1, pct*(this.w-2), h-2, 2);
  
      // Set position
      let posY = i === 0 ? this.h - h : 0;
      bar.position.set(0, posY);
      bar.visible = true;
    });
  }
})();