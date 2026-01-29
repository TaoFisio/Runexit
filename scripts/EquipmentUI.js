const EquipmentScreen = ({ stats, equipment, inventory, onEquip, onClose }) => {
    const [page, setPage] = React.useState(0);
    const [filterSlot, setFilterSlot] = React.useState(null);
    const itemsPerPage = 20;

    // Filtra gli oggetti se un pezzo indossato è selezionato
    const displayedItems = filterSlot 
        ? inventory.filter(i => i.slot === filterSlot)
        : inventory;

    const totalPages = Math.ceil(displayedItems.length / itemsPerPage);
    const currentItems = displayedItems.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    const slots = [
        { id: 'head', label: 'Elmo', top: '2%', left: '42%' },
        { id: 'neck', label: 'Collo', top: '15%', left: '42%' },
        { id: 'torso', label: 'Busto', top: '30%', left: '42%' },
        { id: 'weapon', label: 'Arma', top: '45%', left: '10%' },
        { id: 'ring1', label: 'Anello', top: '60%', left: '15%' },
        { id: 'ring2', label: 'Anello', top: '60%', left: '70%' },
        // ... (gli altri slot rimangono uguali)
    ];

    return (
        <div className="fixed inset-0 bg-black/98 z-[300] p-4 flex flex-col md:flex-row gap-4 font-mono text-white">
            {/* Sinistra: Manichino */}
            <div className="w-full md:w-1/2 bg-zinc-900 border-2 border-yellow-800 relative h-[500px]">
                <div className="absolute top-2 left-2 text-yellow-600">CLICCA SLOT PER FILTRARE</div>
                {slots.map(s => (
                    <div key={s.id} 
                         onClick={() => setFilterSlot(s.id === filterSlot ? null : s.id)}
                         className={`absolute w-16 h-16 border ${filterSlot === s.id ? 'border-blue-500 shadow-[0_0_10px_blue]' : 'border-zinc-700'} bg-black/40 flex flex-col items-center justify-center cursor-pointer`}
                         style={{ top: s.top, left: s.left }}>
                        <span className="text-[8px] text-zinc-500">{s.label}</span>
                        {equipment[s.id] && <div className={`text-[9px] font-bold text-center ${equipment[s.id].rarity}`}>{equipment[s.id].name}</div>}
                    </div>
                ))}
            </div>

            {/* Destra: Inventario Paginato */}
            <div className="w-full md:w-1/2 flex flex-col bg-zinc-900 p-2 border-2 border-zinc-700">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl">ZAINO {filterSlot && `(${filterSlot.toUpperCase()})`}</h3>
                    <button onClick={onClose} className="bg-red-900 px-3 py-1">X</button>
                </div>

                <div className="grid grid-cols-5 gap-1 flex-grow overflow-hidden">
                    {currentItems.map(item => (
                        <div key={item.id} onClick={() => onEquip(item)} 
                             className="aspect-square bg-zinc-800 border border-zinc-600 p-1 text-[8px] hover:border-yellow-500 cursor-pointer overflow-hidden flex flex-col justify-between">
                            <div className={item.rarity}>{item.name}</div>
                            <div className="text-green-500">Pwr: {item.basePower}</div>
                            <div className="text-yellow-500 font-bold">{item.sellPrice}g</div>
                        </div>
                    ))}
                </div>

                {/* Pagina */}
                <div className="flex justify-center gap-4 mt-2">
                    <button onClick={() => setPage(p => Math.max(0, p-1))} className="bg-zinc-700 px-2">Indietro</button>
                    <span>{page + 1} / {totalPages || 1}</span>
                    <button onClick={() => setPage(p => Math.min(totalPages-1, p+1))} className="bg-zinc-700 px-2">Avanti</button>
                </div>
            </div>
        </div>
    );
};
