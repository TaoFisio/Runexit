const EquipmentScreen = ({ stats, equipment, inventory, onEquip, onSell, onBuy, onClose }) => {
    const [page, setPage] = React.useState(0);
    const [filterSlot, setFilterSlot] = React.useState(null);
    const [shopItems, setShopItems] = React.useState([]);
    const itemsPerPage = 20;

    // Genera merce del mercante basata sul livello attuale
    React.useEffect(() => {
        const rarities = ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "SET"];
        const newShop = rarities.map(r => {
            let item = generateItem(stats.level);
            item.rarity = r;
            return item;
        });
        setShopItems(newShop);
    }, [stats.level]);

    const displayedItems = filterSlot ? inventory.filter(i => i.slot === filterSlot) : inventory;
    const totalPages = Math.ceil(displayedItems.length / itemsPerPage);
    const currentItems = displayedItems.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    const slots = [
        { id: 'head', top: '5%', left: '42%', label: 'Elmo' },
        { id: 'neck', top: '16%', left: '42%', label: 'Collo' },
        { id: 'torso', top: '30%', left: '42%', label: 'Busto' },
        { id: 'shoulders', top: '25%', left: '18%', label: 'Spalle' },
        { id: 'weapon', top: '45%', left: '5%', label: 'Arma' },
        { id: 'hands', top: '45%', left: '78%', label: 'Mani' },
        { id: 'ring1', top: '62%', left: '15%', label: 'Anello 1' },
        { id: 'ring2', top: '62%', left: '70%', label: 'Anello 2' },
        { id: 'legs', top: '72%', left: '42%', label: 'Gambe' },
        { id: 'feet', top: '88%', left: '42%', label: 'Piedi' }
    ];

    return (
        <div className="fixed inset-0 bg-black/95 z-[300] p-2 flex flex-col gap-2 font-mono text-[11px]">
            {/* HEADER ECONOMIA */}
            <div className="flex justify-between items-center bg-zinc-900 border-b-2 border-yellow-700 p-2">
                <div className="flex gap-4">
                    <span className="text-yellow-500 font-bold text-lg">💰 {stats.gold}g</span>
                    <span className="text-blue-400 font-bold text-lg">LVL {stats.level}</span>
                </div>
                <button onClick={onClose} className="bg-red-900 text-white px-4 py-1 border border-red-500 uppercase">Chiudi</button>
            </div>

            <div className="flex flex-col lg:flex-row gap-2 h-full overflow-hidden">
                {/* MERCANTE (Acquisto) */}
                <div className="w-full lg:w-1/4 bg-zinc-900/50 p-2 border border-blue-900 overflow-y-auto">
                    <h3 className="text-blue-400 text-center mb-2 underline">MERCANTE</h3>
                    <div className="flex flex-col gap-2">
                        {shopItems.map(item => (
                            <div key={item.id} className="bg-black/60 p-2 border border-zinc-800">
                                <div className={`${item.rarity} font-bold`}>{item.name}</div>
                                <div className="text-zinc-500 italic">Pwr: {item.basePower}</div>
                                <button onClick={() => onBuy(item)} 
                                    className="w-full mt-1 bg-blue-900 hover:bg-blue-700 py-1 text-white">
                                    COMPRA ({item.sellPrice * 5}g)
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PERSONAGGIO (Manichino) */}
                <div className="w-full lg:w-2/4 bg-zinc-900 border-x border-zinc-800 relative min-h-[400px]">
                    {slots.map(s => (
                        <div key={s.id} onClick={() => setFilterSlot(filterSlot === s.id ? null : s.id)}
                            className={`absolute w-14 h-14 border flex flex-col items-center justify-center cursor-pointer transition-all
                            ${filterSlot === s.id ? 'border-yellow-400 bg-yellow-900/20 scale-110 z-10' : 'border-zinc-700 bg-black/40'}`}
                            style={{ top: s.top, left: s.left }}>
                            <span className="text-[7px] text-zinc-600 uppercase mb-1">{s.label}</span>
                            {equipment[s.id] && <div className={`${equipment[s.id].rarity} text-[8px] text-center leading-tight font-bold`}>{equipment[s.id].name}</div>}
                        </div>
                    ))}
                </div>

                {/* ZAINO (Paginato e Filtrato) */}
                <div className="w-full lg:w-1/4 bg-zinc-900/50 p-2 border border-zinc-700 flex flex-col">
                    <h3 className="text-center text-zinc-400 mb-2 uppercase">Zaino {filterSlot && `[${filterSlot}]`}</h3>
                    <div className="grid grid-cols-4 gap-1 flex-grow content-start">
                        {currentItems.map(item => (
                            <div key={item.id} className="aspect-square bg-black/40 border border-zinc-800 p-1 flex flex-col justify-between group overflow-hidden">
                                <div className={`${item.rarity} text-[7px] leading-tight truncate`}>{item.name}</div>
                                <div className="flex flex-col gap-1">
                                    <button onClick={() => onEquip(item)} className="bg-green-800 text-[7px] py-0.5 uppercase">Equip</button>
                                    <button onClick={() => onSell(item)} className="bg-zinc-700 text-[7px] py-0.5 text-yellow-400">${item.sellPrice}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* PAGINAZIONE */}
                    <div className="flex justify-between items-center mt-2 p-1 bg-black/40 text-[10px]">
                        <button onClick={() => setPage(p => Math.max(0, p-1))} disabled={page===0}>◀</button>
                        <span>PAG {page + 1}/{totalPages || 1}</span>
                        <button onClick={() => setPage(p => Math.min(totalPages-1, p+1))} disabled={page>=totalPages-1}>▶</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
