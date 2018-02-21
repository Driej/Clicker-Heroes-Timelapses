function readSave() {
	let txt = $("#savegame").val();
	let data;
	if (txt.indexOf("Fe12NAfA3R6z4k0z") > -1 || txt.substring(0, 32) == "7a990d405d2c6fb93aa8fbb0ec1a3b23") {
		if (txt.substring(0, 32) == "7a990d405d2c6fb93aa8fbb0ec1a3b23") {
			data = JSON.parse(pako.inflate(atob(txt.substring(32)), {to: 'string'}));
		} else {
			var result = txt.split("Fe12NAfA3R6z4k0z");
			txt = "";
			for (var i = 0; i < result[0].length; i += 2) {
				txt += result[0][i];
			}
			data = JSON.parse(atob(txt));
		}
		$("#hero_souls").val(data.stats.currentAscension.heroSoulsEnd);
		let outsiders = data.outsiders.outsiders;
		$("#xyliqil_level").val(outsiders[1].level);
		$("#chor_level").val(outsiders[2].level);
		refresh();
	} else if (txt)
		$("#savegame").val("");
}