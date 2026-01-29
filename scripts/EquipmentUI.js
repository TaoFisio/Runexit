const EquipmentScreen = ({ stats, equipment, inventory, onEquip, onSell, onBuy, onClose }) => {
    const [page, setPage] = React.useState(0);
    const [filterSlot, setFilterSlot] = React.useState(null);
    const [shopItems, setShopItems] = React.useState([]);
    const itemsPerPage = 20;

    // Calcolo Statistiche con protezione anti-crash
    const totalStats = Object.values(equipment).reduce((acc, item) => {
        if (!item) return acc;
        acc.power += (item.basePower || 0);
        if (item.affixes && Array.isArray(item.affixes)) {
            item.affixes.forEach(aff => {
                acc[aff.id] = (acc[aff.id] || 0) + aff.value;
            });
        }
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
    const totalPages = Math.max(1, Math.ceil(displayedItems.length / itemsPerPage));
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
        <div className="fixed inset-0 bg-black/95 z-[300] p-2 flex flex-col gap-2 font-mono text-[10px] text-white">
            <div className="flex justify-between items-center bg-zinc-900 border-b-2 border-yellow-700 p-2">
                <span className="text-yellow-500 font-bold text-lg">💰 {stats.gold}g | LVL {stats.level}</span>
                <button onClick={onClose} className="bg-red-900 px-4 py-1 border border-red-500">CHIUDI</button>
            </div>

            <div className="flex flex-col lg:flex-row gap-2 h-full overflow-hidden">
                <div className="w-full lg:w-1/5 bg-zinc-900 p-3 border border-zinc-700 overflow-y-auto">
                    <h3 className="text-yellow-500 underline mb-2 uppercase">Eroe</h3>
                    <div className="space-y-1">
                        <p>POTERE: <span className="float-right">{totalStats.power}</span></p>
                        <p>CRITICO: <span className="float-right text-orange-400">{totalStats.crit}%</span></p>
                        <p>VAMPIRISMO: <span className="float-right text-red-400">{totalStats.vampiric}%</span></p>
                        <p>MAGIC FIND: <span className="float-right text-green-400">{totalStats.magic_find}%</span></p>
                        <hr className="border-zinc-800 my-2"/>
                        <p className="text-zinc-500">FOR: {stats.STR} | DES: {stats.DEX}</p>
                    </div>

                    <h3 className="text-blue-400 underline mt-4 mb-2 uppercase text-[9px]">Mercante</h3>
                    <div className="space-y-2">
                        {shopItems.map(item => (
                            <div key={item.id} className="bg-black/40 p-1 border border-zinc-800">
                                <div className={`${item.rarity} font-bold text-[8px]`}>{item.name}</div>
                                <button onClick={() => onBuy(item)} className="w-full mt-1 bg-blue-900 py-1 uppercase text-[8px]">Compra ({item.sellPrice * 5}g)</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-2/5 bg-zinc-900 border-x border-zinc-800 relative min-h-[420px]">
                    {slots.map(s => (
                        <div key={s.id} onClick={() => setFilterSlot(filterSlot === s.id ? null : s.id)}
                            className={`absolute w-12 h-12 border flex flex-col items-center justify-center cursor-pointer
                            ${filterSlot === s.id ? 'border-blue-400 bg-blue-900/20' : 'border-zinc-700 bg-black/40'}`}
                            style={{ top: s.top, left: s.left }}>
                            <span className="text-[6px] text-zinc-500 uppercase">{s.label}</span>
                            {equipment[s.id] && <div className={`${equipment[s.id].rarity} text-[7px] text-center font-bold leading-tight`}>{equipment[s.id].name}</div>}
                        </div>
                    ))}
                </div>

                <div className="w-full lg:w-2/5 bg-zinc-900/50 p-2 border border-zinc-700 flex flex-col overflow-hidden">
                    <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1 h-full content-start">
                        {currentItems.map(item => (
                            <div key={item.id} className="bg-black/60 border border-zinc-700 p-2 flex flex-col gap-1">
                                <div className={`${item.rarity} font-bold text-[9px]`}>{item.name}</div>
                                <div className="text-green-500 text-[8px]">Pwr: +{item.basePower}</div>
                                {item.affixes?.map((af, i) => (
                                    <div key={i} className="text-[8px] text-blue-300 italic">+{af.value}% {af.name}</div>
                                ))}
                                <div className="flex gap-1 mt-1">
                                    <button onClick={() => onEquip(item)} className="bg-green-900 flex-1 py-1 text-[8px] border border-green-600">EQUIP</button>
                                    <button onClick={() => onSell(item)} className="bg-zinc-800 flex-1 py-1 text-[8px] border border-zinc-600">VENDI ({item.sellPrice}g)</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-2 p-1 bg-black text-[9px]">
                        <button onClick={() => setPage(p => Math.max(0, p-1))}>◀</button>
                        <span>PAG {page + 1}/{totalPages}</span>
                        <button onClick={() => setPage(p => Math.min(totalPages-1, p+1))}>▶</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
