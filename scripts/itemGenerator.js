const generateItem = (level) => {
    const randRarity = Math.random();
    let rarity = "COMMON";
    let affixCount = 0;
    let rarityMult = 1;

    if (randRarity < 0.05) { rarity = "SET"; affixCount = 3; rarityMult = 5; }
    else if (randRarity < 0.10) { rarity = "LEGENDARY"; affixCount = 3; rarityMult = 4; }
    else if (randRarity < 0.25) { rarity = "EPIC"; affixCount = 2; rarityMult = 2.8; }
    else if (randRarity < 0.50) { rarity = "RARE"; affixCount = 2; rarityMult = 1.8; }

    const armorSlots = Object.keys(ITEM_DB.armors);
    const randType = Math.random();
    let type, category, slot;

    if (randType < 0.4) {
        slot = "weapon";
        const families = ["DEX", "STR_DEX", "STR"];
        category = families[Math.floor(Math.random() * families.length)];
        type = ITEM_DB.weapons[category][Math.floor(Math.random() * ITEM_DB.weapons[category].length)];
    } else if (randType < 0.55) {
        slot = "offhand";
        type = ITEM_DB.weapons.SECONDARY[Math.floor(Math.random() * ITEM_DB.weapons.SECONDARY.length)];
    } else {
        slot = armorSlots[Math.floor(Math.random() * armorSlots.length)];
        type = ITEM_DB.armors[slot][Math.floor(Math.random() * ITEM_DB.armors[slot].length)];
    }

    const qualityIdx = Math.min(ITEM_DB.qualities.length - 1, Math.floor(level / 3));
    const suffixKey = Object.keys(ITEM_DB.suffixes)[Math.floor(Math.random() * Object.keys(ITEM_DB.suffixes).length)];
    let name = `${ITEM_DB.qualities[qualityIdx]} ${type} ${ITEM_DB.suffixes[suffixKey]}`;
    
    const basePower = Math.floor((level * 8) * rarityMult + 10);
    const sellPrice = Math.floor(basePower * 2.5);

    const itemAffixes = [];
    for (let i = 0; i < affixCount; i++) {
        const aff = ITEM_DB.affixes[Math.floor(Math.random() * ITEM_DB.affixes.length)];
        const val = Math.floor((5 + Math.random() * 10) * (1 + level/5));
        itemAffixes.push({ ...aff, value: val });
    }

    return {
        id: Math.random().toString(36).substr(2, 9),
        name, slot, rarity, level,
        requirement: { stat: "STR", value: level * 2 },
        basePower, sellPrice, affixes: itemAffixes
    };
};
