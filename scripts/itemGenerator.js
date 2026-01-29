const generateItem = (level) => {
    const randRarity = Math.random();
    let rarity = "COMMON";
    let affixCount = 0;
    let rarityMult = 1;

    // Sistema rarità migliorato
    if (randRarity < 0.01) { rarity = "SET"; affixCount = 3; rarityMult = 5; }
    else if (randRarity < 0.03) { rarity = "LEGENDARY"; affixCount = 3; rarityMult = 4; }
    else if (randRarity < 0.10) { rarity = "EPIC"; affixCount = 2; rarityMult = 3; }
    else if (randRarity < 0.25) { rarity = "RARE"; affixCount = 2; rarityMult = 2; }
    else if (randRarity < 0.50) { rarity = "UNCOMMON"; affixCount = 1; rarityMult = 1.5; }

    const slots = Object.keys(ITEM_DB.armors);
    // Aumentata probabilità accessori (anelli/collane)
    const isWeapon = Math.random() > 0.5; 
    let type, category, slot;

    if (isWeapon) {
        slot = "weapon";
        const families = Object.keys(ITEM_DB.weapons);
        category = families[Math.floor(Math.random() * families.length)];
        type = ITEM_DB.weapons[category][Math.floor(Math.random() * ITEM_DB.weapons[category].length)];
    } else {
        slot = slots[Math.floor(Math.random() * slots.length)];
        type = ITEM_DB.armors[slot][Math.floor(Math.random() * ITEM_DB.armors[slot].length)];
    }

    const qualityIdx = Math.min(ITEM_DB.qualities.length - 1, Math.floor(level / 3));
    const quality = ITEM_DB.qualities[qualityIdx];
    
    // Nomi dinamici
    const suffixKey = Object.keys(ITEM_DB.suffixes)[Math.floor(Math.random() * Object.keys(ITEM_DB.suffixes).length)];
    let name = `${quality} ${type} ${ITEM_DB.suffixes[suffixKey]}`;
    if (rarity === "SET" || rarity === "LEGENDARY") {
        name = `${type} ${ITEM_DB.loreNames[Math.floor(Math.random() * ITEM_DB.loreNames.length)]}`;
    }

    // CALCOLO POTERE REALE
    const basePower = Math.floor((level * 5) * rarityMult + (Math.random() * level));
    const sellPrice = Math.floor(basePower * 2.5);

    const itemAffixes = [];
    for (let i = 0; i < affixCount; i++) {
        const aff = ITEM_DB.affixes[Math.floor(Math.random() * ITEM_DB.affixes.length)];
        // Il bonus affisso ora scala seriamente con livello e rarità
        const val = Math.floor((5 + (Math.random() * 10)) * (1 + level/10) * (rarityMult/2));
        itemAffixes.push({ ...aff, value: val });
    }

    return {
        id: Math.random().toString(36).substr(2, 9),
        name, slot, rarity, level,
        requirement: {
            stat: category === "DEX" ? "DEX" : (category === "STR" ? "STR" : "SAG"),
            value: level * 4
        },
        basePower,
        sellPrice,
        affixes: itemAffixes
    };
};
