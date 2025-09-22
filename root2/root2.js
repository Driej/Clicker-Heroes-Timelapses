// Polyfill for Internet Explorer
Math.log10 = function(x) {
    return Math.log(x) / Math.LN10;
}

var userData = {};

var settingsVisible = false;

function showAdvancedClick() {
    $("#advancedSettings").toggle(100, function(){
        $("#showAdvanced").html( (settingsVisible = !settingsVisible) ? "Hide Advanced Settings" : "Show Advanced Settings");
    });
}

function setDefaults() {
    $("#minZones").val(20000);
    $("#ascTime").val(0);
    $("#QAStrat").val("perRuby");
}


function defaultClick() {
    setDefaults();
    refresh();
}

function getInputs() {
    let heroSoulsInput = $("#hero_souls").val();
    let logHeroSouls;
    if (heroSoulsInput.indexOf("e") > -1) {
        let mantissa = heroSoulsInput.substr(0, heroSoulsInput.indexOf("e"));
        let exponent = heroSoulsInput.substr(heroSoulsInput.lastIndexOf("e") + 1);
        mantissa = parseFloat(mantissa || 0);
        exponent = parseFloat(exponent || 0);
        if ((isNaN(mantissa)) || isNaN(exponent)) {
            alert("Calculation failed. logHeroSouls must be a positive number.");
            $("#hero_souls").val(150);
            return [0, 0, 0];
        }
        logHeroSouls = exponent + Math.log10(mantissa);
        mantissa = Math.pow(10, logHeroSouls % 1).toFixed(3);
        exponent = Math.floor(logHeroSouls);
        $("#hero_souls").val(mantissa + "e" + exponent);
    } else {
        logHeroSouls = parseFloat(heroSoulsInput || 0);
        $("#hero_souls").val(logHeroSouls);
    }
    if (!(logHeroSouls >= 0)) {
        alert("Calculation failed. logHeroSouls must be a positive number.");
        $("#hero_souls").val(150);
        return [-1, 0, 0];
    }

    let ancientSouls = parseFloat($("#ancient_souls").val() || 0);
    if (!(ancientSouls >= 0)) { ancientSouls = 0; }
    ancientSouls = Math.floor(ancientSouls);
    $("#ancient_souls").val(ancientSouls.toString().replace(/\+/g,''));

    let xyliqilLevel = parseFloat($("#xyliqil_level").val() || 0);
    if (!(xyliqilLevel >= 0)) { xyliqilLevel = 0; }
    xyliqilLevel = Math.floor(xyliqilLevel);
    $("#xyliqil_level").val(xyliqilLevel.toString().replace(/\+/g,''));

    let chorLevel = parseFloat($("#chor_level").val() || 0);
    if (!(chorLevel >= 0)) { chorLevel = 0; }
    if (chorLevel > 150) { chorLevel = 150; }
    chorLevel = Math.floor(chorLevel);
    $("#chor_level").val(chorLevel.toString().replace(/\+/g,''));

    let autoClickers = parseFloat($("#autoclickers").val() || 0);
    if (!(autoClickers >= 0)) { autoClickers = 0; }
    autoClickers = Math.floor(autoClickers);
    $("#autoclickers").val(autoClickers.toString().replace(/\+/g,''));
    

    let minZones = parseInt($("#minZones").val() || 1);
    if (!(minZones >= 1)) { minZones = 1; }
    $("#minZones").val(minZones);
    
    let ascTime = parseFloat($("#ascTime").val() || 0);
    if (!(ascTime >= 0)) { ascTime = 0; }
    $("#ascTime").val(ascTime);

    let QAStrat = $("#QAStrat").val();
    return {
        logHeroSouls: logHeroSouls,
        ancientSouls: ancientSouls,
        xyliqilLevel: xyliqilLevel,
        chorLevel: chorLevel,
        autoClickers: autoClickers,
        minZones: minZones,
        ascTime: ascTime,
        QAStrat: QAStrat
    }
}

function generateSeries(name, count, value) {
    const series = {};
    for (let i = 0; i < count; i++) {
      series[`${name}${i}`] = value;
    }
    return series;
  }

let dogcog = 10;
let heroCosts = {
    Samurai: -10000,
    Dread0: 55 - dogcog,
    Dread1: 84.3544 - dogcog,
    Dread2: 128.4301 - dogcog,
    Dread3: 216.5814 - dogcog,
    Dread4: 290.0408 - dogcog,
    Atlas0: 450 - dogcog,
    Atlas1: 523.4301 - dogcog,
    Atlas2: 729.1165 - dogcog,
    Atlas3: 964.1867 - dogcog,
    Atlas4: 1184.5651 - dogcog,
    Terra0: 1700 - dogcog,
    Terra1: 1993.8084 - dogcog,
    Terra2: 2654.9434 - dogcog,
    Terra3: 3462.9973 - dogcog,
    Terra4: 4050.6728 - dogcog,
    Potato0: 4900 - dogcog,
    Potato1: 5313.8855 - dogcog,
    Potato2: 5727.8123 - dogcog,
    Potato3: 6141.7932 - dogcog,
    Potato4: 6721.2368 - dogcog,
    Banana0: 7000 - dogcog,
    Banana1: 7496.6708 - dogcog,
    Banana2: 8158.9538 - dogcog,
    Banana3: 8738.4514 - dogcog,
    Banana4: 9276.5563 - dogcog,
    Lilin0: 9600 - dogcog,
    Lilin1: 11007.3099 - dogcog,
    Lilin2: 11855.8599 - dogcog,
    Lilin3: 12373.2685 - dogcog,
    Lilin4: 13408.0856 - dogcog,
    Cadmia0: 14000 - dogcog,
    Alabaster0: 16000 - dogcog,
    Astraea0: 17000 - dogcog,
    Cadmia1: 17715.438 - dogcog,
    Alabaster1: 18388.4769 - dogcog,
    Astraea1: 19229.2415 - dogcog,
    Cadmia2: 20103.9679 - dogcog,
    Alabaster2: 21307.7913 - dogcog,
    Astraea2: 22307.7913 - dogcog,
    Cadmia3: 23554.0667  - dogcog,
    Alabaster3: 24757.8901 - dogcog,
    Astraea3: 26023.2823 - dogcog,
    Cadmia4: 27269.5578 - dogcog,
    Alabaster4: 28738.7734 - dogcog,
    Astraea4: 30534.95 - dogcog,
    Chiron: 33002.9708 - dogcog,
    Moloch: 55002.9708 - dogcog,
    BomberMax: 75002.1303 - dogcog,
    Gog: 97002.9708 - dogcog,
    Wepwawet: 125001.5441 - dogcog,
    BettyClicker: Math.log10(20000) - dogcog,
    KingMidas: Math.log10(4e12) - dogcog,
    Wepwawet2: 144286.9211 - dogcog,
    Tsuchi0: 150000 - dogcog,
    Tsuchi1: 153777.2725 - dogcog,
    Tsuchi2: 160198.7642 - dogcog,
    Tsuchi3: 166771.3499 - dogcog,
    Tsuchi4: 171530.8084 - dogcog,
    Skogur0: 175000 - dogcog,
    Skogur1: 182554.6206 - dogcog,
    Skogur2: 197664.0129 - dogcog,
    Skogur3: 212773.4051 - dogcog,
    Skogur4: 220328.1013 - dogcog,
    Moeru0: 250000 - dogcog,
    Moeru1: 258310.0902 - dogcog,
    Moeru2: 274552.6869 - dogcog,
    Moeru3: 285884.7311 - dogcog,
    Moeru4: 300616.3886 - dogcog,
    Zilar0: 315000 - dogcog,
    Zilar1: 326331.9687 - dogcog,
    Zilar2: 345218.7090 - dogcog,
    Zilar3: 367882.7974 - dogcog,
    Zilar4: 390546.8858 - dogcog,
    Madzi0: 420000 - dogcog,
    Madzi1: 431331.9687 - dogcog,
    Madzi2: 450218.709 - dogcog,
    Madzi3: 472882.7974 - dogcog,
    Madzi4: 495546.8858 - dogcog,
    Xavira0: 510000 - dogcog,
    Xavira1: 574769.7866 - dogcog,
    Xavira2: 596359.7443 - dogcog,
    Xavira3: 521226.6916 - dogcog,
    Xavira4: 522953.8882 - dogcog,
    Xavira5: 527271.8798 - dogcog,
    Cadu0: 700000 - dogcog,
    Ceus1: 742748.0298 - dogcog,
    Cadu1: 773405.7697 - dogcog,
    Ceus2: 816585.6851 - dogcog,
    Cadu2: 855447.6089 - dogcog,
    Ceus3: 894309.5327 - dogcog,
    Cadu3: 941807.4395 - dogcog,
    Ceus4: 967715.3887 - dogcog,
    Cadu4: 1002259.321 - dogcog,
    Maw0: 1050000 - dogcog,
    Maw1: 1114769.7866 - dogcog,
    Maw2: 1179539.6597 - dogcog,
    Maw3: 1244309.5327 - dogcog,
    Maw4: 1309079.4057 - dogcog,
    Maw5: 1373849.2787 - dogcog,
    Maw6: 1438619.1517 - dogcog,
    Yachiyl0: 1475000 - dogcog,
    Yachiyl1: 1604539.6597 - dogcog,
    Yachiyl2: 1751351.1372 - dogcog,
    Yachiyl3: 1898163.0839 - dogcog,
    Yachiyl4: 2044974.7961 - dogcog,
    Yachiyl5: 2200422.4913 - dogcog,
    Yachiyl6: 2373142.1527 - dogcog,
    Yachiyl7: 2519953.8648 - dogcog
};

let heroCosts1 = {
    Samurai: 5 - dogcog,
    Dread: 55 - dogcog,
    Atlas: 450 - dogcog,
    Terra: 1700 - dogcog,
    Potato: 4900 - dogcog,
    Banana: 7000 - dogcog,
    Lilin: 9600 - dogcog,
    Cadmia: 14000 - dogcog,
    Alabaster: 16000 - dogcog,
    Astrea: 17000 - dogcog,
    Chiron: 33000 - dogcog,
    Moloch: 55000 - dogcog,
    BomberMax: 75000 - dogcog,
    Gog: 97000 - dogcog,
    Wepwawet: 125000 - dogcog,
    BettyClicker: Math.log10(20000) - dogcog,
    KingMidas: Math.log10(4e12) - dogcog,
    Tsuchi: 150000 - dogcog,
    Skogur: 175000 - dogcog,
    Moeru: 250000 - dogcog,
    Zilar: 315000 - dogcog,
    Madzi: 420000 - dogcog,
    Xavira: 510000 - dogcog,
    Cadu: 700000 - dogcog,
    Ceus: 700000 - dogcog,
    Maw: 1050000 - dogcog,
    Yachiyl: 1475000 - dogcog,
};

let gog = 43.64;

let heroBaseDps = {
    Samurai: 5.2858,
    Dread0: 48.1173,
    Dread1: 49.1173,
    Dread2: 52.1173,
    Dread3: 57.1173,
    Dread4: 57.1173,
    Atlas0: 398.9848,
    Atlas1: 401.9848,
    Atlas2: 406.9848,
    Atlas3: 413.9848,
    Atlas4: 413.9848,
    Terra0: 1530.8521,
    Terra1: 1533.8521,
    Terra2: 1538.8521,
    Terra3: 1545.8521,
    Terra4: 1545.8521,
    Potato0: 4497.7194,
    Potato1: 4595.7194,
    Potato2: 4695.7194,
    Potato3: 4795.7194,
    Potato4: 4795.7194,
    Banana0: 7167.5867,
    Banana1: 7265.5867,
    Banana2: 7365.5867,
    Banana3: 7465.5867,
    Banana4: 7465.5867,
    Lilin0: 10431.4541,
    Lilin1: 10529.4541,
    Lilin2: 10629.4541,
    Lilin3: 10729.4541,
    Lilin4: 10729.4541,
    Cadmia0: 15215.3214,
    Alabaster0: 18141.1886,
    Astraea0: 19632.0561,
    Cadmia1: 15513.3214,
    Alabaster1: 18439.1886,
    Astraea1: 19930.0561,
    Cadmia2: 15813.3214,
    Alabaster2: 18739.1886,
    Astraea2: 20230.0561,
    Cadmia3: 16113.3214,
    Alabaster3: 19039.1886,
    Astraea3: 20530.0561,
    Cadmia4: 16113.3214,
    Alabaster4: 19039.1886,
    Astraea4: 20530.0561,
    Chiron: 44106.9326,
    Moloch: 77006.7908,
    BomberMax: 107982.6582,
    Gog: 146342.4688 + gog,
    Wepwawet: 193960.3929 + gog,
    BettyClicker: 2.9894 + 102998 + gog,
    KingMidas: 9.4796 + 107998 + gog,
    Wepwawet2: 193960.3929 + gog,
    Tsuchi0: 235994.2601 + gog,
    Tsuchi1: 236992.2601 + gog,
    Tsuchi2: 237990.2601 + gog,
    Tsuchi3: 238988.2601 + gog,
    Tsuchi4: 238988.2601 + gog,
    Skogur0: 289394.1274 + gog,
    Skogur1: 291392.1274 + gog,
    Skogur2: 293390.1274 + gog,
    Skogur3: 295388.1274 + gog,
    Skogur4: 2953988.1274 + gog,
    Moeru0: 455593.995 + gog,
    Moeru1: 458091.995 + gog,
    Moeru2: 460589.995 + gog,
    Moeru3: 463087.995 + gog,
    Moeru4: 463087.995 + gog,
    Zilar0: 607593.8623 + gog,
    Zilar1: 610591.8623 + gog,
    Zilar2: 613589.8623 + gog,
    Zilar3: 616587.8623 + gog,
    Zilar4: 616587.8623 + gog,
    Madzi0: 859593.7297 + gog,
    Madzi1: 863091.7287 + gog,
    Madzi2: 866589.7287 + gog,
    Madzi3: 870087.7287 + gog,
    Madzi4: 870087.7287 + gog,
    Xavira0: 1080993.597 + gog,
    Xavira1: 1085991.597 + gog,
    Xavira2: 1090989.597 + gog,
    Xavira3: 1095987.597 + gog,
    Xavira4: 1100985.597 + gog,
    Xavira5: 1100985.597 + gog,
    Cadu0: 1566544.4643 + gog,
    Ceus1: 1571542.4285 + gog,
    Cadu1: 1576542.4643 + gog,
    Ceus2: 1581540.4285 + gog,
    Cadu2: 1586540.4643 + gog,
    Ceus3: 1591538.4285 + gog,
    Cadu3: 1596538.4643 + gog,
    Ceus4: 1591538.4285 + gog,
    Cadu4: 1596538.4643 + gog,
    Maw0: 2486593.1989 + gog,
    Maw1: 2496591.1989 + gog,
    Maw2: 2507589.1989 + gog,
    Maw3: 2519587.1989 + gog,
    Maw4: 2532585.1989 + gog,
    Maw5: 2546583.1989 + gog,
    Maw6: 2546583.1989 + gog,
    Yachiyl0: 3677116.0663 + gog,
    Yachiyl1: 3705114.0663 + gog,
    Yachiyl2: 3734112.0663 + gog,
    Yachiyl3: 3764110.0663 + gog,
    Yachiyl4: 3795108.0663 + gog,
    Yachiyl5: 3827106.0663 + gog,
    Yachiyl6: 3860104.0663 + gog,
    Yachiyl7: 3860104.0663 + gog
};

let heroDamageMult = {
    Samurai: 4,
    Dread0: 4,
    Dread1: 4,
    Dread2: 4,
    Dread3: 4,
    Dread4: 4.25,
    Atlas0: 4.25,
    Atlas1: 4.25,
    Atlas2: 4.25,
    Atlas3: 4.25,
    Atlas4: 4.5,
    Terra0: 4.5,
    Terra1: 4.5,
    Terra2: 4.5,
    Terra3: 4.5,
    Terra4: 4.75,
    Potato0: 9.5,
    Potato1: 9.5,
    Potato2: 9.5,
    Potato3: 9.5,
    Potato4: 10.5,
    Banana0: 10.5,
    Banana1: 10.5,
    Banana2: 10.5,
    Banana3: 10.5,
    Banana4: 11.5,
    Lilin0: 11.5,
    Lilin1: 11.5,
    Lilin2: 11.5,
    Lilin3: 11.5,
    Lilin4: 12.5,
    Cadmia0: 75,
    Alabaster0: 75,
    Astraea0: 75,
    Cadmia1: 75,
    Alabaster1: 75,
    Astraea1: 75,
    Cadmia2: 75,
    Alabaster2: 75,
    Astraea2: 75,
    Cadmia3: 75,
    Alabaster3: 75,
    Astraea3: 75,
    Cadmia4: 80,
    Alabaster4: 85,
    Cadmia4: 90,
    Chiron: 250,
    Moloch: 300,
    BomberMax: 350,
    Gog: 444,
    Wepwawet: 500,
    BettyClicker: 4,
    KingMidas: 4,
    Wepwawet2: 500,
    Tsuchi0: 2500,
    Tsuchi1: 2500,
    Tsuchi2: 2500,
    Tsuchi3: 2500,
    Tsuchi4: 5000,
    Skogur0: 5000,
    Skogur1: 5000,
    Skogur2: 5000,
    Skogur3: 5000,
    Skogur4: 10000,
    Moeru0: 10000,
    Moeru1: 10000,
    Moeru2: 10000,
    Moeru3: 10000,
    Moeru4: 15000,
    Zilar0: 15000,
    Zilar1: 15000,
    Zilar2: 15000,
    Zilar3: 15000,
    Zilar4: 20000,
    Madzi0: 20000,
    Madzi1: 20000,
    Madzi2: 20000,
    Madzi3: 20000,
    Madzi4: 25000,
    Xavira0: 150000,
    Xavira1: 150000,
    Xavira2: 150000,
    Xavira3: 150000,
    Xavira4: 150000,
    Xavira5: 175000,
    Cadu0: 200000,
    Ceus1: 200000,
    Cadu1: 200000,
    Ceus2: 200000,
    Cadu2: 200000,
    Ceus3: 200000,
    Cadu3: 200000,
    Ceus4: 250000,
    Cadu4: 300000,
    Maw0: 300000,
    Maw1: 300000,
    Maw2: 300000,
    Maw3: 300000,
    Maw4: 300000,
    Maw5: 300000,
    Maw6: 400000,
    Yachiyl0: 500000,
    Yachiyl1: 500000,
    Yachiyl2: 500000,
    Yachiyl3: 500000,
    Yachiyl4: 500000,
    Yachiyl5: 500000,
    Yachiyl6: 500000,
    Yachiyl6: 500000,
    Yachiyl7: 1000000
};

heroCosts["Cadmia0"] += Math.log10(1.13) * 25600;

function findBestHero(logGold) {
    let bestHero;
    let heroType = "old";
    for (let s in heroCosts) {
        if (heroCosts.hasOwnProperty(s)) {
            if (heroCosts[s] <= logGold) {
                bestHero = s;
                if (s === "Samurai") { heroType = "PreRanger"; }
                if (s === "Dread0") { heroType = "Rangers1"; }
                if (s === "Potato0") { heroType = "Rangers2"; }
                if (s === "Cadmia0") { heroType = "Rangers3"; }
                if (s === "Chiron") { heroType = "0.24"; }
                if (s === "BettyClicker") { heroType = "PreRanger"; }
                if (s === "Wepwewat2") { heroType = "0.24"; }
                if (s === "Tsuchi0") { heroType = "e3"; }
                if (s === "Xavira0") { heroType = "e10"; }
                if (s === "Yachiyl7") { heroType = "inf"; }
            }
        }
    }
    return [bestHero, heroType];
}

function findNextHero(currentHero) {
    if (currentHero === "Dorothy5") return false;
    let logGold = heroCosts[currentHero];
    let nextHero;
    let heroType = "old";
    for (let s in heroCosts) {
        if (heroCosts.hasOwnProperty(s)) {
            if (s === "Xavira0") { heroType = "e10"; }
            if (s === "Rose0") { heroType = "e11"; }
            if (heroCosts[s] > logGold) {
                if (s !== "Dorothy1" && s !== "Dorothy2" && s !== "dorothy4") {
                    nextHero = s;
                    break;
                }
            }
        }
    }
    return [nextHero, heroType];
}

function findHeroDps(bestHero, heroLevel, heroType, gilds) {
    let baseDps = heroBaseDps[bestHero] + Math.log10(heroLevel);
    let damageMultiplier = heroDamageMult[bestHero];
    let dpsMultiplier25 = Math.log10(damageMultiplier) * Math.floor(Math.max(heroLevel - 175, 0) / 25);
    let dpsMultiplier1000 = (heroType !== "PreRanger")
        ? 0
        : Math.log10(10 / damageMultiplier) * Math.min(Math.floor(heroLevel / 1000), 8);
    let gildDps = Math.log10(gilds);
    return baseDps + dpsMultiplier25 + dpsMultiplier1000 + gildDps;
}

let cacheHp140 = Math.log10(1.55) * 139 + 1;
let hp141 = 1 + Math.log10(1.145) + cacheHp140;
let hp5000 = 1 + Math.log10(1.55) * 139 + Math.log10(1.145) * 4860;
let hp200k = Math.log10(1.24) + 25409;

function getHPScale(zone, ancientSouls) {
    if (zone >= 3500000 && ancientSouls >= 2850000) {
        let scale = 4;
        let hp = Math.log10(scale) * (zone - 3500000) + Math.log10(9.4248) + 1387072;
    } else if (zone >= 3000000 && ancientSouls >= 1950000) {
        let scale = 3.6;
        let hp = Math.log10(scale) * (zone - 3000000) + Math.log10(5.2965) + 1108920;
    } else if (zone >= 2500000 && ancientSouls >= 1200000) {
        let scale = 3.3;
        let hp = Math.log10(scale) * (zone - 2500000) + Math.log10(5.679) + 849662;
    } else if (zone >= 2000000 && ancientSouls >= 825000) {
        let scale = 3;
        let hp = Math.log10(scale) * (zone - 2000000) + Math.log10(1.339575) + 611100;
    } else if (zone >= 1500000 && ancientSouls >= 666000) {
        let scale = 2.65;
        let hp = Math.log10(scale) * (zone - 1500000) + Math.log10(1.54889) + 399477;
    } else if (zone >= 1400000 && ancientSouls >= 485000) {
        let scale = 2.45;
        let hp = Math.log10(scale) * (zone - 1400000) + Math.log10(3.8159) + 360560;
    } else if (zone >= 1200000 && ancientSouls >= 350000) {
        let scale = 2.3;
        let hp = Math.log10(scale) * (zone - 1200000) + Math.log10(1.03383) + 288215;
    } else if (zone >= 1000000 && ancientSouls >= 240000) {
        let scale = 2.1;
        let hp = Math.log10(scale) * (zone - 1000000) + Math.log10(1.430715) + 223772;
    } else if (zone >= 500000 && ancientSouls >= 190000) {
        let scale = 1.95;
        let hp = Math.log10(scale) * (zone - 500000) + Math.log10(7.0781) + 78755;
    } else if (zone >= 480000 && ancientSouls >= 145000) {
        let scale = 1.85;
        let hp = Math.log10(scale) * (zone - 480000) + Math.log10(2.60225) + 73412;
    } else if (zone >= 380000 && ancientSouls >= 102000) {
        let scale = 1.75;
        let hp = Math.log10(scale) * (zone - 380000) + Math.log10(4.0788) + 49108;
    } else if (zone >= 370000 && ancientSouls >= 65000) {
        let scale = 1.65;
        let hp = Math.log10(scale) * (zone - 370000) + Math.log10(5.9055) + 46933;
    } else if (zone >= 360000 && ancientSouls >= 40000) {
        let scale = 1.55;
        let hp = Math.log10(scale) * (zone - 360000) + Math.log10(2.84635) + 45030;
    } else if (zone >= 250000 && ancientSouls >= 18000) {
        let scale = 1.45;
        let hp = Math.log10(scale) * (zone - 250000) + Math.log10(9.421132) + 27279;
    }
}

function findHighestZone(totalDps) {
    if (totalDps === Infinity) return 2 ** 31 - 1;
    if (totalDps < hp141) {
        return 130;
    } else if (totalDps <= hp5000) {
        return 5000;
    } else if (totalDps < hp200k) {
        let logHealth = hp500;
        this.zone = 199999;
        for (let z = 501; z < 200000; z++) {
            logHealth += Math.log10(1.145 + 0.001 * Math.floor((z - 1) / 500));
            if (logHealth >= totalDps) {
                this.zone = z;
                break;
            }
        }
    } else {
        this.zone = Math.min((totalDps - hp200k) / Math.log10(1.545) + 200000, 2 ** 31 - 1);
    }
    let bossMultiplier = Math.floor(this.zone / 500) * 0.4 + 5;
    this.zone -= Math.log(bossMultiplier) / Math.log(1.545);
    return Math.floor(this.zone);
}

function findHighestIdleZone(logHeroSouls, heroDps, xyliqilLevel, autoClickers) {
    let ancientDps = logHeroSouls * 2.4 + Math.log10(1.5) * 2 * xyliqilLevel -1.4457374595558059145523937994475;
    let totalDps = heroDps + ancientDps;
    if (autoClickers <= 2e9) {
        totalDps += Math.log10(1.5) * autoClickers;
    }
    return findHighestZone(totalDps);
}

function findHighestActiveZone(logHeroSouls, heroDps) {
    let ancientDps = logHeroSouls * 2.9 -1.8159188043029278373206243377068;
    let totalDps = heroDps + ancientDps;
    return findHighestZone(totalDps);
}

function getMonsterGold(level, logHeroSouls) {
    let ancientGold = logHeroSouls * 1.5 -1.1105440342413657683046916147778;
    if (level < 140) {
        return Math.log10(1.6) * (level - 1) + ancientGold - Math.log10(15);
    } else {
        return Math.log10(1.15) * (level - 140) + Math.log10(1.6) * 139 + ancientGold - Math.log10(15);
    }
}

function getHeroLevel(logGold, bestHero, heroType) {
    let nameShort = bestHero.substring(0, bestHero.length - 1);
    let baseCost = heroCosts1[nameShort]
        ? heroCosts1[nameShort]
        : heroCosts1[bestHero];

    let costMultiplier = 1.07;
    if (heroType === "Rangers2") {
        costMultiplier = 1.1;
    } else if (heroType === "Rangers3") {
        costMultiplier = 1.13;
    } else if (heroType === "0.24") {
        costMultiplier = 1.16;
    } else if (heroType === "e3") {
        costMultiplier = 1.19;
    } else if (heroType === "e10") {
        costMultiplier = 1.22;
    } else if (heroType === "inf") {
        costMultiplier = 1.055;
    }

    let heroLevel = Math.floor((logGold - baseCost) / Math.log10(costMultiplier));
    heroLevel = Math.max(1, heroLevel);
    return heroLevel;
}

function getZoneRequired(currentHero, useActive, logCps, logXylBonus) {
    let goldRequired = heroCosts[currentHero] - Math.log10(1.15 / 0.15)
        - (useActive ? logCps : logXylBonus)
        - (userData.logHeroSouls * 1.5 -1.1105440342413657683046916147778)
        - Math.log10(1.6 / 1.15) * 139;
    let zoneRequired = Math.floor(goldRequired / Math.log10(1.15));
    return zoneRequired;
}

function getNextTL(startingZone) {
    let zonesGained = userData.highestZone - startingZone;
    let duration;
    let rubyCost;
    if (zonesGained <= userData.minZones) {
        return [false, zonesGained];
    }
    let needed = Infinity;
    if (userData.endZone) {
        if (startingZone > userData.endZone) {
            return [false, zonesGained];
        } else {
            needed = userData.endZone - startingZone;
        }
    }
    if ((zonesGained >= 360000) && (userData.minZones <= 756000) && (needed >= 252000)) {
        duration = "168h";
        zonesGained = Math.min(756000, zonesGained);
        rubyCost = 100;
    } else if ((zonesGained >= 144000) && (userData.minZones <= 216000) && (needed >= 108000)) {
        duration = "48h";
        zonesGained = Math.min(216000, zonesGained);
        rubyCost = 60;
    } else if ((zonesGained >= 72000) && (userData.minZones <= 108000) && (needed >= 36000)) {
        duration = "24h";
        zonesGained = Math.min(108000, zonesGained);
        rubyCost = 40;
    } else if (userData.minZones <= 36000) {
        duration = "8h";
        zonesGained = Math.min(36000, zonesGained);
        rubyCost = 20;
    } else {
        return [false, zonesGained];
    }
    userData.highestZone = startingZone + zonesGained;

    return [duration, zonesGained, rubyCost];
}

function getSoftCap(options, startingZone, logCps, logXylBonus, gilds) {
    userData.timelapseZoneMax = startingZone;
    let activeAdvantage = userData.xyliqilLevel >= 156;
    let useActive = activeAdvantage > 0;
    if (!useActive && !options.test) { console.log("Idle is better than active."); }
    
    let goldRequired = false;
    do {
        let logGold = getMonsterGold(startingZone, userData.logHeroSouls);
        logGold += Math.log10(1.15 / 0.15);
        logGold += useActive ? logCps : 0;
        if (logGold >= heroCosts["BomberMax"] + .8405) logGold += 98;
        let IEsucks = findBestHero(logGold);
        let bestHero = IEsucks[0];
        let heroType = IEsucks[1];
        let heroLevel = getHeroLevel(logGold, bestHero, heroType);
        let heroDps = findHeroDps(bestHero, heroLevel, heroType, gilds);
        let combo = Math.log10(Math.max((startingZone - userData.timelapseZoneMax) / 2.25, 1)) + logCps;
        combo = Math.min(combo, 307);
        userData.highestZone = useActive
            ? findHighestActiveZone(userData.logHeroSouls, heroDps + combo + logCps)
            : findHighestIdleZone(userData.logHeroSouls, heroDps, userData.xyliqilLevel, userData.autoClickers);
        userData.highestZone = userData.highestZone - userData.highestZone % 5 + 4;

        zonesGained = userData.highestZone - startingZone;
        if (zonesGained <= 10) {
            return [startingZone, bestHero, heroLevel];
        } else {
            startingZone = userData.highestZone;
        }
    } while (zonesGained > 10);
}

function formatTime(durationSeconds) {
    let hours = Math.floor(durationSeconds / 3600);
    let duration;
    if (hours < 72) {
        let minutes = Math.floor((durationSeconds - (hours * 3600)) / 60);
        let seconds = durationSeconds - hours * 3600 - minutes * 60;
        if (hours   < 10) { hours   = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        duration = hours + ":" + minutes + ":" + seconds;
    } else {
        let dl = durationSeconds;
        let years = Math.floor(dl / 31557600);
        dl -= years * 31557600;
        let days = Math.floor(dl / 86400);
        dl -= days * 86400;
        hours = dl / 3600;
        duration = (years > 0 ? years.toLocaleString() + "y " : "") + days + "d " + hours.toFixed(2) + "h";
    }
    return duration;
}

function refresh(options) {
    if (options === undefined || options === null) options = {};
    if (options.test) {
        userData = Object.assign({}, options);
    } else {
        console.clear();
        userData = getInputs();
    }

    if (userData.logHeroSouls < 0) { return false; }
    
    if (options.data) {
        userData.data = options.data;
        userData.heroSoulsInput = options.heroSoulsInput;
        userData.useOnAscend = options.useOnAscend;
        let kumaLevel = userData.data.ancients.ancients[21].level;
        let kumaEffect = 8 * (1 - Math.exp(-0.025 * kumaLevel));
        let borbLevel = userData.data.outsiders.outsiders[6].level;
        let mpzReduction = kumaEffect * (1 + borbLevel / 8);
        userData.borbLimit = Math.floor((mpzReduction - 8) * 10) * 500;
    }
    
    if (!options.test) console.log(userData);
    
    
    let logCps = Math.min(Math.max(1 + Math.log10(userData.autoClickers), 1 + (userData.autoClickers - 1) * Math.log10(1.5)), Math.log10(1.7976931348623157) + 308);
    let logXylBonus = Math.log10(1.5) * userData.xyliqilLevel;
    
    let activeAdvantage = userData.logHeroSouls * 0.5 + logCps -0.3701813447471219227682305382593 - Math.log10(1.5) * 3.3895 * userData.xyliqilLevel;
    if (userData.autoClickers <= 2e9) {
        activeAdvantage -= Math.log10(1.5) * userData.autoClickers;
    } else {
        if (!options.test)
            console.log("Too many ACs, Nogardnit's scaling is broken past 2e9 ACs.");
    }
    let useActive = activeAdvantage > 0;
    if (!useActive && !options.test) { console.log("Idle is better than active."); }

    let previousHZT = (userData.logHeroSouls - 5) / Math.log10(1.25) * 5;
    let gilds = Math.max(1, Math.floor(previousHZT / 10) - 9);
    let baseHeroSouls = userData.logHeroSouls;
    userData.logHeroSouls += Math.log10(1 / 0.95) * userData.chorLevel - 2;

    let startingZone = 40;
    let timelapses = [];
    let zonesGained = 0;
    let rubyCost = 0;
    let currentHero;
    let revivedTLs = false;
    let logGold;
    
    if (userData.ascTime) {
        let endZone = getSoftCap(options, startingZone, logCps, logXylBonus, gilds)[0];
        let equivalentZones = userData.ascTime * 8050;
        if (userData.borbLimit && endZone > userData.borbLimit) {
            let remainder = endZone % 500;
            let mpz = Math.floor((endZone - userData.borbLimit) / 500) / 10 + 2;
            let monsters = (mpz - 2) * remainder / 1.083 + 1;
            if (monsters <= equivalentZones) {
                endZone -= remainder;
                equivalentZones -= monsters;
            } else {
                endZone -= (equivalentZones / monsters) * remainder;
                equivalentZones = 0;
            }
            mpz -= 0.1;
            while (mpz > 2) {
                let monsters = (mpz - 2) * 500 / 1.083 + 500;
                if (monsters <= equivalentZones) {
                    endZone -= 500;
                    equivalentZones -= monsters;
                } else {
                    endZone -= (equivalentZones / monsters) * 500;
                    equivalentZones = 0;
                    break;
                }
                mpz -= 0.1;
            }
        }
        endZone -= equivalentZones;
        userData.endZone = Math.max(1, Math.floor(endZone));
    }
    
    do {
        if (!revivedTLs) {
            logGold = getMonsterGold(startingZone, userData.logHeroSouls)
            let idleGoldExtra = startingZone > 140
                ? Math.log10(1.15 / 0.15)
                : Math.log10(1.6 / 0.6);
            idleGoldExtra += logXylBonus;
            let activeGoldExtra = logCps + 1;
            logGold += Math.max(idleGoldExtra, activeGoldExtra);
        }
        let IEsucks = findBestHero(logGold);
        let bestHero = IEsucks[0];
        let heroType = IEsucks[1];
        let heroLevel = getHeroLevel(logGold, bestHero, heroType);
        let heroDps = findHeroDps(bestHero, heroLevel, heroType, gilds);
        userData.highestZone = findHighestIdleZone(userData.logHeroSouls, heroDps, userData.xyliqilLevel, userData.autoClickers);
        userData.highestZone = userData.highestZone - userData.highestZone % 5 + 4;
        
        if (!revivedTLs) {
            currentHero = bestHero;
        }
        
        IEsucks = getNextTL(startingZone);
        if (IEsucks[0]) {
            if (bestHero === "Wepwawet2") { bestHero = "Wepwawet"; }
            zonesGained = IEsucks[1];
            timelapses.push({
                duration: IEsucks[0],
                bestHero: bestHero,
                heroLevel: heroLevel,
                zone: userData.highestZone,
                zoneDisplay: userData.highestZone.toLocaleString() + " (+" + IEsucks[1].toLocaleString() + ")",
            });
            rubyCost += IEsucks[2];
            startingZone = userData.highestZone;
            revivedTLs = false;
        } else {
            if (revivedTLs) {
                timelapses.pop();
                startingZone = timelapses[0] && timelapses[timelapses.length-1].zone || 40;;
                break;
            } else {
                if (userData.endZone) { break; }
                let IEsucks = findNextHero(bestHero);
                if (!IEsucks) { break; }
                let nextHero = IEsucks[0];
                zoneRequired = getZoneRequired(nextHero, useActive, logCps, logXylBonus);
                logGold = heroCosts[nextHero];
                if (zoneRequired >= userData.borbLimit) { break; }
                let softCap = getSoftCap(options, startingZone, logCps, logXylBonus, gilds)[0];
                if (zoneRequired >= softCap) { break; }
                revivedTLs = true;
                let zonesGained = zoneRequired - startingZone;
                if (zonesGained <= 0) { break; }
                let durationSeconds = Math.ceil(zonesGained / 8050 * 3600);
                let duration = formatTime(durationSeconds);
                timelapses.push({
                    duration: duration + " (wait)",
                    bestHero: bestHero,
                    heroLevel: heroLevel,
                    zone: zoneRequired,
                    zoneDisplay: zoneRequired.toLocaleString() + " (+" + zonesGained.toLocaleString() + ")",
                });
                startingZone = zoneRequired;
            }
        }
        if (userData.borbLimit && startingZone > (userData.borbLimit + 499)) { break; }
    } while (revivedTLs || zonesGained >= userData.minZones);

    userData.timelapseZoneMax = startingZone;
    
    let IEsucks = getSoftCap(options, startingZone, logCps, logXylBonus, gilds);
    let softCap = IEsucks[0];
    let bestHero = IEsucks[1];
    let heroLevel = IEsucks[2];
    
    let goldRequired = false;
    if (bestHero !== currentHero) {
        currentHero = bestHero;
        goldRequired = true;
    }
    
    let durationSeconds;
    if (userData.borbLimit && userData.highestZone > (userData.borbLimit + 499)) {
        if (userData.borbLimit > 0) {
            let flatZones = userData.borbLimit - userData.timelapseZoneMax;
            let n = userData.highestZone - userData.borbLimit;
            let highZones = n + (n * n) / 10830;
            let zonesTraveled = flatZones + highZones;
            durationSeconds = Math.ceil(zonesTraveled / 8050 * 3600);
        } else {
            let a = highestZone - userData.borbLimit;
            let zonesA = a + (a * a) * 10830;
            let b = -userData.borbLimit;
            let zonesB = b + (b * b) * 10830;
            let zonesTraveled = zonesA - zonesB;
            durationSeconds = Math.ceil(zonesTraveled / 8050 * 3600);
        }
    } else {
        let activeZonesGained = softCap - userData.timelapseZoneMax;
        durationSeconds = Math.ceil(activeZonesGained / 8050 * 3600);
    }
    let duration = formatTime(durationSeconds);
    if (bestHero === "Wepwawet2") { bestHero = "Wepwawet"; }
    timelapses.push({
        duration: duration,
        bestHero: bestHero,
        heroLevel: heroLevel,
        zone: userData.highestZone,
        zoneDisplay: userData.highestZone.toLocaleString() + " (max zone)",
    });

    // Test log
    if (options.test) {
        return (JSON.stringify({
            logHeroSouls: baseHeroSouls,
            xyliqilLevel: userData.xyliqilLevel,
            chorLevel: userData.chorLevel,
            autoClickers: userData.autoClickers,
            rubyCost: rubyCost,
            timelapses: timelapses,
        }));
    }

    // Display results
    let toappend = "";
    let t = 0;
    if (timelapses[4] && timelapses[4].duration === "168h") {
        if (!$("#tls").is(":checked")) {
            for (let d = 4; d < timelapses.length; d++) {
                if (timelapses[d].duration === "168h") {
                    t = d;
                }
            }
            timelapses[t].duration += " x" + (t + 1);
        }
        timelapses[t].zoneDisplay = timelapses[t].zone.toLocaleString() + " (+" + (timelapses[t].zone - 40).toLocaleString() + ")";
    }
    for (t; t < timelapses.length; t++) {
        let row = timelapses[t];
        let heroLevel;
        if (row.heroLevel !== Infinity && row.heroLevel >= 1e21) {
            let s = row.heroLevel.toString();
            heroLevel = s.substr(0,5) + "e" + s.substr(s.indexOf("+"));
        } else {
            heroLevel = row.heroLevel.toLocaleString();
        }
        let title = "";
        if (t === (timelapses.length - 1)) {
            if (goldRequired) {
                let zoneRequired = getZoneRequired(currentHero, useActive, logCps, logXylBonus);
                if (zoneRequired <= userData.timelapseZoneMax) {
                    title = "Unlocked immediately after the last timelapse.";
                } else {
                    let zonesTraveled;
                    if (userData.borbLimit && (userData.borbLimit + 499) <= zoneRequired) {
                        let flatZones = userData.borbLimit - userData.timelapseZoneMax;
                        let n = zoneRequired - userData.borbLimit;
                        let highZones = n + (n * n) / 10830;
                        zonesTraveled = flatZones + highZones;
                    } else {
                        zonesTraveled = zoneRequired - userData.timelapseZoneMax;
                    }
                    
                    let hoursRequired = zonesTraveled / 8050;
                    let h = Math.floor(hoursRequired);
                    let m = Math.round((hoursRequired - h) * 60);
                    if (m < 10) m = "0" + m;
                    let time = h + ":" + m;
                    title = "Reachable at around zone " + zoneRequired.toLocaleString() + " which is " + time + " hours in.";
                }
            } else if (timelapses.length > 1 && timelapses[timelapses.length - 1]) {
                if (timelapses[timelapses.length - 2].bestHero === currentHero) {
                    title = "Unlocked during timelapses.";
                } else {
                    title = "Unlocked immediately after the last timelapse.";
                }
            }
        }
        toappend += "<tr title='" + title + "'><td>" + row.duration + "</td><td>" + row.bestHero + "</td><td>" + heroLevel + "</td><td>" + row.zoneDisplay + "</td>";
    }
    $("#TimelapsesTable tbody").html(toappend);
    $("#RubyCost").html("Total Rubies: " + rubyCost.toLocaleString());
    
    let numTLs = timelapses.length - 1;
    let altAction = false;
    userData.highestZone = timelapses[numTLs].zone;
    if (userData.data) {
        altAction = checkAncients();
    } else {
        $("#ancientCheckResults").parent().hide();
        $('html, body').animate({
            scrollTop: ($('#results').offset().top)
        },200);
    }
    
    // Recommended action
    let action;
    if (altAction) {
        action = altAction;
    } else if(numTLs === 0) {
        action = "Save your rubies.";
    } else if(previousHZT > 1e6) {
        action = "Use Timelapses as shown above.";
    } else if(userData.QAStrat === "perRuby"){
        let rubyCostTL = rubyCost - numTLs * 20; //consider mercenaries (estimated 20 rubies per TL)
        let maxZoneTL = timelapses[numTLs - 1].zone;
        let zonesPerRubyTL = maxZoneTL / rubyCostTL;
        let zonesPerRubyQA = previousHZT / 500;
        if(zonesPerRubyTL > zonesPerRubyQA) {
            action = "Use Timelapses as shown above.";
        } else {
            action = "Use Quick Ascension.";
        }
    } else {
        let maxZoneTL = timelapses[numTLs - 1].zone;
        if(maxZoneTL > previousHZT) {
            action = "Use Timelapses as shown above.";
        } else {
            action = "Use Quick Ascension.";
        }
    }
    $("#Recommend").html("Recommended: " + action);
}

function test() {
    let readout = "[\n";
    let options = {
        test: true,
        xyliqilLevel: 0,
        chorLevel: 0,
        autoClickers: 0,
        minZones: 20000,
        ascTime: 0
    }
    for (let i = 100; i < 2e5; i *= 2) {
        options.logHeroSouls = i;
        readout += "    " + refresh(options) + ",\n";
    }
    options.logHeroSouls = 1000;
    for (let i = 100; i < 1e7; i *= 10) {
        options.xyliqilLevel = i;
        readout += "    " + refresh(options) + ",\n";
    }
    options.xyliqilLevel = 0;
    for (let i = 50; i < 200; i += 50) {
        options.chorLevel = i;
        readout += "    " + refresh(options) + ",\n";
    }
    options.chorLevel = 0;
    for (let i = 1; i < 1e12; i *= 100) {
        options.autoClickers = i;
        readout += "    " + refresh(options) + ",\n";
    }
    readout = readout.slice(0, -2);
    readout += "\n]";
    $("#savegame").val(readout);
}

function enterKey(ev) {
    if (ev.which === 13) refresh();
}

function changeTheme() {
    if ($("#dark").is(":checked")) {
        $("#theme-light").prop("disabled", true);
        $("#theme-dark").prop("disabled", false);
    } else {
        $("#theme-light").prop("disabled", false);
        $("#theme-dark").prop("disabled", true);
    }
    if (localStorage) localStorage.setItem("darkmode", $("#dark").is(":checked"));
}

$(setDefaults);

$(function() {
    if (localStorage) {
        $("#dark").prop("checked", localStorage.getItem("darkmode")==="true");
        
        if (localStorage.getItem("tlsState") === "checked") {
            $("#tls").prop("checked", true);
        }

        $("#tls").change(function() {
            if ($(this).is(":checked")) {
                localStorage.setItem("tlsState", "checked");
            } else {
                localStorage.setItem("tlsState", "unchecked");
            }
        });
    }

    $('.collapsible .title').click(function(){
        $(this).parent().find('.content').toggle();
    });
    
    $("#hero_souls").keyup(enterKey);

    $("#xyliqil_level").keyup(enterKey);

    $("#chor_level").keyup(enterKey);

    $("#autoclickers").keyup(enterKey);

    $("#minZones").keyup(enterKey);
    
    $("#ascTime").keyup(enterKey);
});