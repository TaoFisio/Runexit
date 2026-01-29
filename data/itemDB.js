const ITEM_DB = {
    weapons: {
        DEX: ["Pugnale", "Coltello", "Kriss", "Stiletto", "Wakizashi"],
        STR_DEX: ["Spada", "Stocco", "Scimitarra", "Katana", "Gladio"],
        STR: ["Accetta", "Mazza", "Stella del Mattino", "Martello", "Maglio"],
        SECONDARY: ["Scudo di Legno", "Brocchello", "Egida", "Scudo a Goccia", "Grimorio"]
    },
    armors: {
        head: ["Bacinetto", "Celata", "Elmo Chiuso"],
        shoulders: ["Coprispalla", "Spallacci"],
        torso: ["Cotta di Maglia", "Corazza a Piastre"],
        back: ["Mantello", "Cappa"],
        gloves: ["Manopole", "Guanti d'Arme"], // Cambiato da hands a gloves
        legs: ["Schinieri", "Gambali"],
        feet: ["Calzari", "Sabatons"],
        neck: ["Collana", "Amuleto"],
        ring: ["Anello", "Fede"]
    },
    qualities: ["Rovinato", "Comune", "Raffinato", "Eccelso", "Divino"],
    suffixes: {
        STR: "della Forza", DEX: "della Destrezza", SAG: "della Saggezza", VIT: "della Vita"
    },
    affixes: [
        { id: "vampiric", name: "Vampirico", bonus: "Life Steal" },
        { id: "crit", name: "Letale", bonus: "Crit Chance" },
        { id: "magic_find", name: "della Ricerca", bonus: "Loot Quality" },
        { id: "spectral", name: "Spettrale", bonus: "Dodge" }
    ],
    loreNames: ["di Tyrael", "di Leoric", "di Diablo"]
};
