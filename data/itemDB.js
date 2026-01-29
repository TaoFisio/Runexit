const ITEM_DB = {
    weapons: {
        DEX: ["Pugnale", "Coltello", "Kriss", "Stiletto", "Wakizashi", "Main Gauche", "Tantō", "Stiletto", "Dirk", "Kukri"],
        STR_DEX: ["Spada", "Stocco", "Scimitarra", "Katana", "Falcione", "Gladio", "Spada Lunga", "Broadsword", "Schiavona", "Rapier"],
        STR: ["Accetta", "Tomahawk", "Francisca", "Labrys", "Ascia da guerra", "Ascia Vichinga", "Bardica", "Lochaber", "Mazza", "Stella del Mattino", "Martello", "Maglio"],
        TWO_HANDED: ["Picca", "Alabarda", "Voulge", "Naginata", "Falce", "Glaive", "Zweihänder", "Claymore", "Flamberga", "Ascia Bipenne"]
    },
    armors: {
        head: ["Bacinetto", "Celata", "Bigoncia", "Elmo Chiuso", "Grancelata"],
        shoulders: ["Coprispalla", "Guardastanche", "Spalliere", "Spallacci"],
        torso: ["Tunica", "Cuoio Borchiato", "Cotta di Maglia", "Corazza a Piastre", "Armatura Completa"],
        back: ["Straccio", "Mantello", "Cappa", "Drappo"],
        hands: ["Manopole", "Bracciali", "Guanti d'Arme"],
        legs: ["Braghe", "Cosciali", "Schinieri", "Gambali"],
        feet: ["Calzari", "Stivali di Cuoio", "Sabatons", "Calzature"],
        neck: ["Collana", "Sigillo", "Amuleto"],
        ring: ["Anello", "Fede", "Band"]
    },
    qualities: ["Scheggiato", "Rovinato", "Comune", "Raffinato", "Affilato", "Eccelso", "Supremo", "Divino"],
    suffixes: {
        STR: "della Forza",
        DEX: "della Destrezza",
        SAG: "della Saggezza",
        VIT: "della Vita",
        CRIT: "della Violenza",
        DMG: "della Distruzione"
    },
    affixes: [
        { id: "vampiric", name: "Vampirico", bonus: "Life Steal" },
        { id: "leech", name: "Logorante", bonus: "Stamina Regen" },
        { id: "magic_find", name: "della Ricerca", bonus: "Loot Quality" },
        { id: "greedy", name: "Avido", bonus: "Gold Drop" },
        { id: "spectral", name: "Spettrale", bonus: "Dodge Chance" }
    ],
    loreNames: ["di Tyrael", "di Deckard", "di Leoric", "di Diablo", "di Adria", "di Malthael"]
};
