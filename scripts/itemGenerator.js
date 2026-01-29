const generateItem = (level) => {
    const randRarity = Math.random();
    let rarity = "COMMON";
    let affixCount = 0;
    let rarityMult = 1;

    if (randRarity < 0.02) { rarity = "SET"; affixCount = 3; rarityMult = 5; }
    else if (randRarity < 0.05) { rarity = "LEGENDARY"; affixCount = 3; rarityMult = 4; }
    else if (randRarity < 0.12) { rarity = "EPIC"; affixCount = 2; rarityMult = 2.8; }
    else if (randRarity < 0.30) { rarity = "RARE"; affixCount = 2; rarityMult = 1.8; }
    else if (randRarity < 0.60) { rarity = "UNCOMMON"; affixCount = 1; rarityMult = 1.4; }

    const slots = Object.keys(ITEM_DB.armors);
    const isWeapon = Math.random() > 0.45; 
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
    const suffixKey = Object.keys(ITEM_DB.suffixes)[Math.floor(Math.random() * Object.keys(ITEM_DB.suffixes).length)];
    
    let name = `${quality} ${type} ${ITEM_DB.suffixes[suffixKey]}`;
    if (rarity === "SET" || rarity === "LEGENDARY") {
        name = `${type} ${ITEM_DB.loreNames[Math.floor(Math.random() * ITEM_DB.loreNames.length)]}`;
    }

    // POTERE SCALATO: Livello incide pesantemente
    const basePower = Math.floor((level * 8) * rarityMult + (Math.random() * 5));
    // VENDITA: Basata su potere e rarità
    const sellPrice = Math.floor((basePower * 2) + (level * 5));

    const itemAffixes = [];
    for (let i = 0; i < affixCount; i++) {
        const aff = ITEM_DB.affixes[Math.floor(Math.random() * ITEM_DB.affixes.length)];
        const val = Math.floor((5 + (Math.random() * 10)) * (1 + level/5) * (rarityMult/2));
        itemAffixes.push({ ...aff, value: val });
    }

    return {
        id: Math.random().toString(36).substr(2, 9),
        name, slot, rarity, level,
        requirement: {
            stat: category === "DEX" ? "DEX" : (category === "STR" ? "STR" : "SAG"),
            value: level * 3 + 5
        },
        basePower, sellPrice, affixes: itemAffixes
    };
};
