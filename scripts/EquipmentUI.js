const EquipmentScreen = ({ stats, equipment, inventory, onEquip, onSell, onBuy, onClose }) => {
    const [page, setPage] = React.useState(0);
    const [filterSlot, setFilterSlot] = React.useState(null);
    const [shopItems, setShopItems] = React.useState([]);
    const itemsPerPage = 20;

    // Calcolo Statistiche Totali dall'Equipaggiamento
    const totalStats = Object.values(equipment).reduce((acc, item) => {
        if (!item) return acc;
        acc.power += item.basePower;
        item.affixes.forEach(aff => {
            acc[aff.id] = (acc[aff.id] || 0) + aff.value;
        });
        return acc;
    }, { power: 0, vampiric: 0, crit: 0, magic_find: 0, spectral: 0 });

    React.useEffect(() => {
        const rarities = ["COMMON", "RARE", "LEGENDARY", "SET"];
        setShopItems(rarities.map(r => {
            let item = generateItem(stats.level);
            item.rarity = r;
            return item;
        }));
    }, [stats.level]);

    const getEffectiveSlot = (s) => (s && s.startsWith('ring')) ? 'ring' : s;
    const displayedItems = filterSlot ? inventory.filter(i => i.slot === getEffectiveSlot(filterSlot)) : inventory;
    const currentItems = displayedItems.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    const slots = [
        { id: 'head', top: '2%', left: '42%', label: 'Elmo' },
        { id: 'neck', top: '13%', left: '42%', label: 'Amuleto' },
        { id: 'torso', top: '26%', left: '42%', label: 'Armatura' },
        { id: 'shoulders', top: '22%', left: '18%', label: 'Spalle' },
        { id: 'back', top: '22%', left: '66%', label: 'Schiena' },
        { id: 'weapon', top: '42%', left: '5%', label: 'Arma Dx' },
        { id: 'offhand', top: '42%', left: '79%', label: 'Arma Sx' },
        { id: 'gloves', top: '56%', left: '79%', label: 'Guanti' },
        { id: 'ring1', top: '60%', left: '15%', label: 'Anello 1' },
        { id: 'ring2', top: '75%', left: '15%', label: 'Anello 2' },
        { id: 'legs', top: '68%', left: '42%', label: 'Gambe' },
        { id: 'feet', top: '85%', left: '42%', label: 'Piedi' }
    ];

    return (
        <div className="fixed inset-0 bg-black/95 z-[300] p-2 flex flex-col gap-2 font-mono text-[11px] text-white">
            <div className="flex justify-between items-center bg-zinc-900 border-b-2 border-yellow-700 p-2">
                <span className="text-yellow-500 font-bold text-lg">💰 {stats.gold}g | LVL {stats.level}</span>
                <button onClick={onClose} className="bg-red-900 px-6 py-2 border border-red-500 active:scale-95">ESCI</button>
            </div>

            <div className="flex flex-col lg:flex-row gap-2 h-full overflow-hidden">
                {/* STATISTICHE PERSONAGGIO */}
                <div className="w-full lg:w-1/5 bg-zinc-900 p-3 border border-zinc-700">
                    <h3 className="text-yellow-500 underline mb-2 uppercase">Attributi Eroe</h3>
                    <div className="space-y-1 text-[10px]">
                        <p>POTERE TOT: <span className="float-right text-white">{totalStats.power}</span></p>
                        <p>VAMPIRISMO: <span className="float-right text-red-400">{totalStats.vampiric}%</span></p>
                        <p>CRITICO: <span className="float-right text-orange-400">{totalStats.crit}%</span></p>
                        <p>SCHIVATA: <span className="float-right text-blue-300">{totalStats.spectral}%</span></p>
                        <p>MAGIC FIND: <span className="float-right text-green-400">{totalStats.magic_find}%</span></p>
                        <hr className="border-zinc-800 my-2"/>
                        <p className="text-zinc-500 italic">Forza: {stats.STR} | Destr: {stats.DEX}</p>
                    </div>
                </div>

                {/* MANICHINO */}
                <div className="w-full lg:w-2/5 bg-zinc-900 border-x border-zinc-800 relative min-h-[480px]">
                    {slots.map(s => (
                        <div key={s.id} onClick={() => setFilterSlot(filterSlot === s.id ? null : s.id)}
                            className={`absolute w-14 h-14 border flex flex-col items-center justify-center cursor-pointer transition-all
                            ${filterSlot === s.id ? 'border-blue-400 bg-blue-900/20 z-10' : 'border-zinc-700 bg-black/40'}`}
                            style={{ top: s.top, left: s.left }}>
                            <span className="text-[7px] text-zinc-500 uppercase">{s.label}</span>
                            {equipment[s.id] && <div className={`${equipment[s.id].rarity} text-[8px] text-center font-bold`}>{equipment[s.id].name}</div>}
                        </div>
                    ))}
                </div>

                {/* ZAINO CON NUMERI VISIBILI */}
                <div className="w-full lg:w-2/5 bg-zinc-900/50 p-2 border border-zinc-700 flex flex-col overflow-hidden">
                    <h3 className="text-center text-zinc-400 mb-2 uppercase text-[10px]">Zaino {filterSlot && `[${filterSlot}]`}</h3>
                    <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-2 mb-2 content-start h-full">
                        {currentItems.map(item => (
                            <div key={item.id} className="bg-black/60 border border-zinc-700 p-2 flex flex-col gap-1">
                                <div className={`${item.rarity} font-bold text-[9px]`}>{item.name}</div>
                                <div className="flex justify-between text-[8px]">
                                    <span className="text-green-500">Pwr: +{item.basePower}</span>
                                    <span className="text-yellow-500">{item.sellPrice}g</span>
                                </div>
                                {item.affixes.map((af, i) => (
                                    <div key={i} className="text-[8px] text-blue-300 italic">+{af.value}% {af.name}</div>
                                ))}
                                <div className="flex gap-1 mt-1">
                                    <button onClick={() => onEquip(item)} className="bg-green-900 flex-1 text-[8px] py-1 border border-green-600">EQUIP</button>
                                    <button onClick={() => onSell(item)} className="bg-zinc-800 flex-1 text-[8px] py-1 border border-zinc-600">VENDI</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center p-2 bg-black border border-zinc-800">
                        <button onClick={() => setPage(p => Math.max(0, p-1))} className="px-3 bg-zinc-800">◀</button>
                        <span>PAG {page + 1}/{totalPages || 1}</span>
                        <button onClick={() => setPage(p => Math.min(totalPages-1, p+1))} className="px-3 bg-zinc-800">▶</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
