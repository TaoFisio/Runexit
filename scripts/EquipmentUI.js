const EquipmentScreen = ({ stats, equipment = {}, inventory = [], onEquip, onSell, onBuy, onClose, onSellAll }) => {
    const [page, setPage] = React.useState(0);
    const [filterSlot, setFilterSlot] = React.useState(null);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [favorites, setFavorites] = React.useState(new Set());
    const itemsPerPage = 20;

    // Colori Rarità (Aggiornato SET in Rosso)
    const rarityColor = {
        COMMON: 'text-zinc-400', UNCOMMON: 'text-green-400', RARE: 'text-blue-400',
        EPIC: 'text-purple-400', LEGENDARY: 'text-orange-400', SET: 'text-red-500 font-bold'
    };

    // Gestione Lucchetto
    const toggleFavorite = (e, id) => {
        e.stopPropagation();
        const newFavs = new Set(favorites);
        if (newFavs.has(id)) newFavs.delete(id);
        else newFavs.add(id);
        setFavorites(newFavs);
    };

    const getEffectiveSlot = (s) => (s && s.startsWith('ring')) ? 'ring' : s;
    const safeInventory = Array.isArray(inventory) ? inventory : [];
    const displayedItems = filterSlot 
        ? safeInventory.filter(i => i && i.slot === getEffectiveSlot(filterSlot)) 
        : safeInventory;

    const totalPages = Math.max(1, Math.ceil(displayedItems.length / itemsPerPage));
    const currentItems = displayedItems.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    const slots = [
        { id: 'head', top: '2%', left: '42%', label: 'Elmo' },
        { id: 'neck', top: '13%', left: '42%', label: 'Collo' },
        { id: 'torso', top: '26%', left: '42%', label: 'Busto' },
        { id: 'shoulders', top: '22%', left: '15%', label: 'Spalle' },
        { id: 'back', top: '22%', left: '69%', label: 'Schiena' },
        { id: 'weapon', top: '42%', left: '5%', label: 'Arma Dx' },
        { id: 'offhand', top: '42%', left: '79%', label: 'Arma Sx' },
        { id: 'gloves', top: '58%', left: '79%', label: 'Guanti' },
        { id: 'ring1', top: '60%', left: '15%', label: 'Anello 1' },
        { id: 'ring2', top: '75%', left: '15%', label: 'Anello 2' },
        { id: 'legs', top: '68%', left: '42%', label: 'Gambe' },
        { id: 'feet', top: '85%', left: '42%', label: 'Piedi' }
    ];

    return (
        <div className="fixed inset-0 bg-black/98 z-[500] p-2 flex flex-col gap-2 font-mono text-white overflow-hidden">
            {/* TOP BAR */}
            <div className="flex justify-between items-center bg-zinc-900 border-b border-yellow-700 p-2 shrink-0">
                <div className="flex gap-4 items-center">
                    <span className="text-yellow-500 font-bold">💰 {stats.gold}g</span>
                    <button onClick={() => onSellAll(favorites)} className="bg-orange-950 text-orange-400 border border-orange-700 px-2 py-1 text-[10px] active:bg-orange-800">
                        VENDI NON PROTETTI
                    </button>
                </div>
                <button onClick={onClose} className="bg-red-900 px-6 py-1 border border-red-500">CHIUDI</button>
            </div>

            <div className="flex flex-col lg:flex-row gap-2 flex-grow overflow-hidden">
                {/* MANNEQUIN */}
                <div className="w-full lg:w-2/3 bg-zinc-900 border border-zinc-800 relative min-h-[450px]">
                    {slots.map(s => (
                        <div key={s.id} onClick={() => setFilterSlot(filterSlot === s.id ? null : s.id)}
                            className={`absolute w-14 h-14 border flex flex-col items-center justify-center transition-all
                            ${filterSlot === s.id ? 'border-blue-400 bg-blue-900/20' : 'border-zinc-800 bg-black/40'}`}
                            style={{ top: s.top, left: s.left }}>
                            <span className="text-[6px] text-zinc-500 uppercase">{s.label}</span>
                            {equipment[s.id] && <div className={`${rarityColor[equipment[s.id].rarity]} text-[7px] text-center font-bold leading-none`}>{equipment[s.id].name}</div>}
                        </div>
                    ))}

                    {/* POPUP CONFRONTO */}
                    {selectedItem && (
                        <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                            <div className="flex flex-col md:flex-row gap-4 max-w-full">
                                {/* Attuale */}
                                <div className="border border-zinc-700 p-3 bg-zinc-900 w-48">
                                    <p className="text-[8px] text-zinc-500 mb-2 uppercase">Equipaggiato</p>
                                    {equipment[selectedItem.slot] ? (
                                        <>
                                            <p className={`${rarityColor[equipment[selectedItem.slot].rarity]} font-bold`}>{equipment[selectedItem.slot].name}</p>
                                            <p className="text-green-500 text-sm">Pwr: {equipment[selectedItem.slot].basePower}</p>
                                        </>
                                    ) : <p className="text-zinc-600">Vuoto</p>}
                                </div>
                                {/* Nuovo */}
                                <div className="border-2 border-yellow-600 p-3 bg-zinc-900 w-48 shadow-[0_0_20px_rgba(200,150,0,0.2)]">
                                    <p className="text-[8px] text-yellow-600 mb-2 uppercase">Nuovo Oggetto</p>
                                    <p className={`${rarityColor[selectedItem.rarity]} font-bold`}>{selectedItem.name}</p>
                                    <p className="text-green-500 text-sm">Pwr: {selectedItem.basePower}</p>
                                    <div className="mt-2 space-y-1">
                                        {selectedItem.affixes?.map((af, i) => (
                                            <p key={i} className="text-blue-300 text-[9px]">+{af.value}% {af.name}</p>
                                        ))}
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <button onClick={() => {onEquip(selectedItem); setSelectedItem(null);}} className="flex-1 bg-green-700 py-2 text-[10px]">INDOSSA</button>
                                        {!favorites.has(selectedItem.id) && (
                                            <button onClick={() => {onSell(selectedItem); setSelectedItem(null);}} className="flex-1 bg-zinc-700 py-2 text-[10px]">VENDI</button>
                                        )}
                                    </div>
                                    <button onClick={() => setSelectedItem(null)} className="w-full mt-2 text-[8px] text-zinc-500">ANNULLA</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* INVENTORY */}
                <div className="w-full lg:w-1/3 bg-zinc-900/50 border border-zinc-800 flex flex-col overflow-hidden">
                    <div className="grid grid-cols-4 gap-1 p-2 overflow-y-auto flex-grow content-start">
                        {currentItems.map(item => (
                            <div key={item.id} onClick={() => setSelectedItem(item)}
                                className={`aspect-square bg-black border p-1 relative flex flex-col justify-between
                                ${filterSlot && item.slot === getEffectiveSlot(filterSlot) ? 'border-blue-500 bg-blue-900/10' : 'border-zinc-800'}`}>
                                <div className={`${rarityColor[item.rarity]} text-[7px] font-bold leading-tight truncate`}>{item.name}</div>
                                <div className="flex justify-between items-end">
                                    <span className="text-[7px] text-green-700">+{item.basePower}</span>
                                    <button onClick={(e) => toggleFavorite(e, item.id)} className="text-[10px]">
                                        {favorites.has(item.id) ? '🔒' : '🔓'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between bg-black p-2 text-[10px] border-t border-zinc-800">
                        <button onClick={() => setPage(p => Math.max(0, p-1))}>Indietro</button>
                        <span className="text-zinc-500">PAG {page + 1}/{totalPages}</span>
                        <button onClick={() => setPage(p => Math.min(totalPages-1, p+1))}>Avanti</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
