class WfrpCustomTokeHUD extends BasePlaceableHUD {

	static get defaultOptions() {
		const options = super.defaultOptions;
		options.classes = options.classes.concat(["wfrp-token-overlay"]);
		options.template = "systems/wfrp3/templates/token-overlay.html";
		options.id = "wfrp-token-overlay";
		return options;
	}

	getData() {
		const data = super.getData();
		data.stats = [];
		if (parseInt(canvas.hud.WfrpCustomToken.actorData.state.fatigue.value) > 0) {
			data.stats.push({
				icon: '&#xf5c8',
				value: canvas.hud.WfrpCustomToken.actorData.state.fatigue.value +  '/' + canvas.hud.WfrpCustomToken.actorData.state.fatigue.max
			});
		}
		if (parseInt(canvas.hud.WfrpCustomToken.actorData.state.stress.value) > 0) {
			data.stats.push({
				icon: '&#xf579',
				value: canvas.hud.WfrpCustomToken.actorData.state.stress.value +  '/' + canvas.hud.WfrpCustomToken.actorData.state.stress.max
			});
		}		
		if (parseInt(canvas.hud.WfrpCustomToken.actorData.state.magicPower.value) > 0) {
			data.stats.push({
				icon: '&#xf6e8',
				value: canvas.hud.WfrpCustomToken.actorData.state.magicPower.value +  '/' + canvas.hud.WfrpCustomToken.actorData.state.magicPower.max
			});
		}
		data.combat = []; 
		data.combat.push({
			icon: '&#xf6de',
			value: canvas.hud.WfrpCustomToken.actorData.state.damage.value
		});	
		data.combat.push({
			icon: '&#xf505',
			value: canvas.hud.WfrpCustomToken.actorData.state.defence.value
		});
		data.combat.push({
			icon: '&#xf0e3',
			value: canvas.hud.WfrpCustomToken.actorData.state.criticalDamage.value
		});
		data.combat.push({
			icon: '&#xf3ed',
			value: canvas.hud.WfrpCustomToken.actorData.state.soak.value
		});
		return data;
	}

	setPosition() {
		if (!this.object) return;

		const fontSize = canvas.grid.size / 5;
		const position = {
      		height: this.object.h + 40,
      		left: this.object.x,
			top: this.object.y - 40,
			"font-size": fontSize - 5 + "px",
			"grid-template-rows": fontSize * 3 + "px " + fontSize * 5 + "px",
  			width: this.object.w
			};
		this.element.css(position);
  }
}
