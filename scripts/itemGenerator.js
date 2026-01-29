const generateItem = (level) => {
    const randRarity = Math.random();
    let rarity = "COMMON";
    let affixCount = 0;
    let rarityMult = 1;

    if (randRarity < 0.002) { rarity = "SET"; affixCount = 3; rarityMult = 4; }
    else if (randRarity < 0.01) { rarity = "LEGENDARY"; affixCount = 3; rarityMult = 3.5; }
    else if (randRarity < 0.05) { rarity = "EPIC"; affixCount = 2; rarityMult = 2.5; }
    else if (randRarity < 0.15) { rarity = "RARE"; affixCount = 2; rarityMult = 1.8; }
    else if (randRarity < 0.40) { rarity = "UNCOMMON"; affixCount = 1; rarityMult = 1.3; }
    else { affixCount = Math.random() > 0.8 ? 1 : 0; }

    const slots = Object.keys(ITEM_DB.armors);
    const isWeapon = Math.random() > 0.6;
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

    const qualityIdx = Math.min(ITEM_DB.qualities.length - 1, Math.floor(level / 2.5));
    const quality = ITEM_DB.qualities[qualityIdx];
    const requirementValue = level * 5; 

    const suffixKey = Object.keys(ITEM_DB.suffixes)[Math.floor(Math.random() * Object.keys(ITEM_DB.suffixes).length)];
    const suffix = ITEM_DB.suffixes[suffixKey];
    let name = `${quality} ${type} ${suffix}`;
    
    if (rarity === "SET" || rarity === "LEGENDARY") {
        const lore = ITEM_DB.loreNames[Math.floor(Math.random() * ITEM_DB.loreNames.length)];
        name = `${type} ${lore} (${rarity})`;
    }

    const itemAffixes = [];
    for (let i = 0; i < affixCount; i++) {
        const aff = ITEM_DB.affixes[Math.floor(Math.random() * ITEM_DB.affixes.length)];
        const baseBonus = 5 + (Math.random() * 5);
        const finalValue = Math.floor(baseBonus * (1 + (level / 10)) * rarityMult);
        itemAffixes.push({ ...aff, value: finalValue });
    }

    return {
        id: Math.random().toString(36).substr(2, 9),
        name, slot, rarity, level,
        requirement: {
            stat: category === "DEX" ? "DEX" : (category === "STR" ? "STR" : "SAG"),
            value: requirementValue
        },
        basePower: Math.floor(level * 2 * rarityMult),
        affixes: itemAffixes,
        isTwoHanded: category === "TWO_HANDED"
    };
};
