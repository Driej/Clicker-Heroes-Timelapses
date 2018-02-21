// Polyfill for Internet Explorer
Math.log10 = (x) => Math.log(x) / Math.LN10;

function getInputs(): number {
    let logHeroSouls = parseInt($("#hero_souls").val() || 0);
    if ( !(logHeroSouls > 0) ) {
        alert("Calculation failed. logHeroSouls must be a positive number.");
        return 0;
    }
    return logHeroSouls;
}

let costThousand = Math.log10(1.07) * 1000;
let dogcog = 10;
let heroCosts: { [name: string]: number } = {
    Samurai: 0,
    Atlas: 55 + costThousand - dogcog,
    Terra: 70 + costThousand - dogcog,
    Phthalo: 85 + costThousand - dogcog,
    Orntchya: 100 + costThousand - dogcog,
    Lilin: 115 + costThousand - dogcog,
    Cadmia: 130 + costThousand - dogcog,
    Alabaster: 145 + costThousand - dogcog,
    Astrea: 160 + costThousand - dogcog,
    Chiron: 175 + costThousand - dogcog,
    Moloch: 190 + costThousand - dogcog,
    BomberMax: 205 + costThousand - dogcog,
    Gog: 220 + costThousand - dogcog,
    Wepwawet: 235 + costThousand - dogcog,
    BettyClicker: 235 + costThousand * 1.5 - dogcog,
    KingMidas: 235 + costThousand * 2 - dogcog,
    Wepwawet2: 235 + costThousand * 5 - dogcog,
    Tsuchi: 500 - dogcog,
    Skogur: 1000 - dogcog,
    Moeru: 2000 - dogcog,
    Zilar: 4000 - dogcog,
    Madzi: 8000 - dogcog,
    Xavira0: 14000 - dogcog,
    Xavira1: 18408 - dogcog,
    Xavira2: 19436 - dogcog,
    Xavira3: 21493 - dogcog,
    Xavira4: 22522 - dogcog,
    Xavira5: 23873 - dogcog,
    Cadu0: 25500 - dogcog,
    Ceus1: 27204.2591 - dogcog,
    Cadu1: 28908.5182 - dogcog,
    Ceus2: 30789.08 - dogcog,
    Cadu2: 32845.9444 - dogcog,
    Ceus3: 35079.1115 - dogcog,
    Cadu3: 37473.8894 - dogcog,
    Ceus4: 40044.97 - dogcog,
    Cadu4: 42777.6613 - dogcog,
    Maw0: 45500 - dogcog,
    Maw1: 48761.5993 - dogcog,
    Maw2: 52184.8094 - dogcog,
    Maw3: 55784.3222 - dogcog,
    Maw4: 59545.4457 - dogcog,
    Maw5: 63497.5683 - dogcog,
    Maw6: 67611.2927 - dogcog,
    Yachiyll: 76627.945 - dogcog,
    Yachiyl2: 81432.1926 - dogcog,
    Yachiyl3: 86398.0511 - dogcog,
    Yachiyl4: 91540.2122 - dogcog,
    Yachiyl5: 96858.6759 - dogcog,
    Yachiyl6: 102338.7505 - dogcog,
};
let heroCosts1: { [name: string]: number } = {
    Samurai: 5 - dogcog,
    Atlas: 55 - dogcog,
    Terra: 70 - dogcog,
    Phthalo: 85 - dogcog,
    Orntchya: 100 - dogcog,
    Lilin: 115 - dogcog,
    Cadmia: 130 - dogcog,
    Alabaster: 145 - dogcog,
    Astrea: 160 - dogcog,
    Chiron: 175 - dogcog,
    Moloch: 190 - dogcog,
    BomberMax: 205 - dogcog,
    Gog: 220 - dogcog,
    Wepwawet: 235 - dogcog,
    BettyClicker: Math.log10(20000) - dogcog,
    KingMidas: Math.log10(4e12) - dogcog,
    Wepwawet2: 235 - dogcog,
    Tsuchi: 500 - dogcog,
    Skogur: 1000 - dogcog,
    Moeru: 2000 - dogcog,
    Zilar: 4000 - dogcog,
    Madzi: 8000 - dogcog,
    Xavira0: 14000 - dogcog,
    Xavira1: 18406.5667 - dogcog,
    Xavira2: 19435.9989 - dogcog,
    Xavira3: 21492.8633 - dogcog,
    Xavira4: 22521.2955 - dogcog,
    Xavira5: 23872.9493 - dogcog,
    Cadu0: 25500 - dogcog,
    Ceus1: 25500 - dogcog,
    Cadu1: 25500 - dogcog,
    Ceus2: 25500 - dogcog,
    Cadu2: 25500 - dogcog,
    Ceus3: 25500 - dogcog,
    Cadu3: 25500 - dogcog,
    Ceus4: 25500 - dogcog,
    Cadu4: 25500 - dogcog,
    Maw0: 45500 - dogcog,
    Maw1: 45500 - dogcog,
    Maw2: 45500 - dogcog,
    Maw3: 45500 - dogcog,
    Maw4: 45500 - dogcog,
    Maw5: 45500 - dogcog,
    Maw6: 45500 - dogcog,
    Yachiyll: 72000 - dogcog,
    Yachiyl2: 72000 - dogcog,
    Yachiyl3: 72000 - dogcog,
    Yachiyl4: 72000 - dogcog,
    Yachiyl5: 72000 - dogcog,
    Yachiyl6: 72000 - dogcog,
};
let heroBaseDps: { [name: string]: number } = {
    Samurai: 5.2858,
    Atlas: 47.4251,
    Terra: 60.2924,
    Phthalo: 73.1598,
    Orntchya: 86.0271,
    Lilin: 98.8944,
    Cadmia: 111.7618,
    Alabaster: 124.6290,
    Astrea: 137.4965,
    Chiron: 149.4965,
    Moloch: 163.2312,
    BomberMax: 175.9437,
    Gog: 188.9871,
    Wepwawet: 201.7295,
    BettyClicker: 11.0038,
    KingMidas: 18.7950,
    Wepwawet2: 201.7295,
    Tsuchi: 427.7516,
    Skogur: 848.7439,
    Moeru: 1681.6906,
    Zilar: 3336.7651,
    Madzi: 6634.3194,
    Xavira0: 11683.4585,
    Xavira1: 12306.4585,
    Xavira2: 12954.4585,
    Xavira3: 13627.4585,
    Xavira4: 14475.4585,
    Xavira5: 15348.4585,
    Cadu0: 26446.3258,
    Ceus1: 26446.1931,
    Cadu1: 26446.3258,
    Ceus2: 26446.1931,
    Cadu2: 26446.3258,
    Ceus3: 26446.1931,
    Cadu3: 26446.3258,
    Ceus4: 26446.1931,
    Cadu4: 26446.3258,
    Maw0: 61732.0604,
    Maw1: 63730.0604,
    Maw2: 65828.0604,
    Maw3: 68026.0604,
    Maw4: 70324.0604,
    Maw5: 72722.0604,
    Maw6: 75220.0604,
    Yachiyll: 101491.9278,
    Yachiyl2: 104389.9278,
    Yachiyl3: 107387.9278,
    Yachiyl4: 110485.9278,
    Yachiyl5: 113683.9278,
    Yachiyl6: 116981.9278,
};

function findBestHero(logHeroSouls: number, startingZone: number): [ string, boolean ] {
    let logGold = logHeroSouls * 1.5 + Math.log10(1.15) * startingZone;
    let bestHero;
    let newHero = false;
    for (let s in heroCosts) {
        if (heroCosts.hasOwnProperty(s)) {
            if (heroCosts[s] < logGold) {
                bestHero = s;
                if (s === "Xavira0") { newHero = true; }
            }
        }
    }
    return [bestHero, newHero];
}

function findHeroDps(bestHero: string, heroLevel: number, newHero: boolean = false): number {
    let baseDps = heroBaseDps[bestHero];
    let dpsMultiplier25 = Math.log10(newHero ? 4.5 : 4) * Math.floor(Math.max(heroLevel - 175, 0) / 25);
    let dpsMultiplier1000 = Math.log10(2.5) * Math.floor(heroLevel / 1000);
    return baseDps + dpsMultiplier25 + dpsMultiplier1000;
}

let hp500 = 1 + Math.log10(1.55) * 139 + Math.log10(1.145) * 360;
let hp200k1 = Math.log10(1.24) + 25409;

function findHighestIdleZone(logHeroSouls: number, heroDps: number): number {
    let ancientDps = logHeroSouls * 2.4;
    let totalDps = heroDps + ancientDps;
    if (totalDps < 50) { return 0; } else if (totalDps < hp200k1) {
        let logHealth = hp500;
        this.zone = 200001;
        for (let z = 501; z < 200001; z++) {
            logHealth += Math.log10(1.145 + 0.001 * Math.floor((z - 1) / 500));
            if (logHealth >= totalDps) {
                this.zone = z;
                break;
            }
        }
    } else {
        this.zone = (totalDps - hp200k1) / Math.log10(1.545) + 200001;
    }
    return Math.floor(this.zone);
}

function refresh (test: boolean = false, logHeroSouls: number = 0) {
    let minimumZoneGain = 8200;
    // Inputs
    if (!test) {
        this.logHeroSouls = getInputs();
    } else { this.logHeroSouls = logHeroSouls; }
    if (this.logHeroSouls === 0) { return false; }

    let	startingZone = 0;
    let	timelapses = [];
    let zonesGained;
    let rubyCost = 0;

    do {
        let [bestHero, newHero] = findBestHero(this.logHeroSouls, startingZone);
        let heroLevel = Math.floor((this.logHeroSouls * 1.5 + Math.log10(1.15) * startingZone - heroCosts1[bestHero]) / Math.log10(1.07));
        let heroDps = findHeroDps(bestHero, heroLevel, newHero);
        let highestZone = findHighestIdleZone(this.logHeroSouls, heroDps);

        zonesGained = highestZone - startingZone;
        let duration;
        if (zonesGained < minimumZoneGain) { break; }
        if (zonesGained > 144000) {
            duration = 48;
            zonesGained = Math.min(216000, zonesGained);
            rubyCost += 30;
        } else if (zonesGained > 72000) {
            duration = 24;
            zonesGained = Math.min(108000, zonesGained);
            rubyCost += 20;
        } else {
            duration = 8;
            zonesGained = Math.min(36000, zonesGained);
            rubyCost += 10;
        }
        highestZone = startingZone + zonesGained;

        if (bestHero === "Wepwawet2") { bestHero = "Wepwawet"; }

        timelapses.push({
            duration,
            bestHero,
            heroLevel,
            zone: highestZone,
            zoneDisplay: highestZone.toLocaleString() + " (+" + zonesGained.toLocaleString() + ")",
        });

        startingZone = highestZone;
    } while (zonesGained >= minimumZoneGain);

    // Test log
    if (test) {
        return (JSON.stringify({
            logHeroSouls: this.logHeroSouls,
            rubyCost,
            timelapses,
        }));
    }

    // Display results
    let toappend = "";
    for (let t = 0; t < timelapses.length; t++) {
        let row = timelapses[t];
        toappend += "<tr><td>" + row.duration + "h</td><td>" + row.bestHero + "</td><td>" + row.heroLevel.toLocaleString() + "</td><td>" + row.zoneDisplay + "</td>";
    }
    $("#TimelapsesTable tbody").html(toappend);
    $("#RubyCost").html("Total Rubies: " + rubyCost);
    let canQA = (timelapses.length > 0)
                ? timelapses[timelapses.length - 1].zone < 1e7 // Change to 1e6 when patch e11 hits
                : true;
    if ((rubyCost > 50) && canQA) {
        $("#Recommend").html("Recommended Action: Use Quick Ascension");
    } else if (rubyCost > 0) {
        $("#Recommend").html("Recommended Action: Use Timelapses as shown above");
    } else {
        $("#Recommend").html("Recommended Action: Save your rubies");
    }
    $("#RubyCost").html("Total Rubies: " + rubyCost);
}

function test(): void {
    let cases = [100, 250, 500, 750, 1000, 2000, 3000, 4000, 5000, 7500, 10000, 12500, 15000, 17500, 20000, 22500];
    let readout = "[\n";
    for (let i = 0; i < cases.length; i++) {
        readout += "	" + refresh(true, cases[i]) + ",\n";
    }
    readout = readout.slice(0, -2);
    readout += "\n]";
    console.log(readout);
}

$("#hero_souls").keyup((ev): void => {
    if (ev.which === 13) { refresh(); }
});
