Hooks.on('renderHeadsUpDisplay', async (app, html, data) => {
	html.append('<template id="wfrp-token-overlay"></template>');
	canvas.hud.WfrpCustomToken = new WfrpCustomTokeHUD();
})