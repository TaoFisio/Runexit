const EquipmentScreen = ({ stats, equipment, inventory, onEquip, onClose }) => {
    const slots = [
        { id: 'head', label: 'Elmo', top: '2%', left: '42%' },
        { id: 'neck', label: 'Collo', top: '15%', left: '42%' },
        { id: 'torso', label: 'Busto', top: '30%', left: '42%' },
        { id: 'shoulders', label: 'Spalle', top: '25%', left: '20%' },
        { id: 'back', label: 'Schiena', top: '25%', left: '65%' },
        { id: 'weapon', label: 'Mano Dx', top: '45%', left: '10%' },
        { id: 'hands', label: 'Mani', top: '45%', left: '75%' },
        { id: 'ring1', label: 'Anello 1', top: '60%', left: '15%' },
        { id: 'ring2', label: 'Anello 2', top: '60%', left: '70%' },
        { id: 'legs', label: 'Gambe', top: '70%', left: '42%' },
        { id: 'feet', label: 'Piedi', top: '85%', left: '42%' }
    ];

    return (
        <div className="fixed inset-0 bg-black/98 z-[300] p-6 flex flex-col md:flex-row gap-6 font-mono">
            <div className="w-full md:w-1/2 bg-zinc-900 border-2 border-yellow-800 relative min-h-[500px]">
                <h3 className="text-center text-yellow-600 text-xl p-2 border-b border-yellow-900">EQUIPAGGIAMENTO EROE</h3>
                {slots.map(s => (
                    <div key={s.id} className="absolute w-20 h-20 border border-zinc-700 bg-black/40 flex flex-col items-center justify-center text-[9px]"
                         style={{ top: s.top, left: s.left }}>
                        <span className="text-zinc-500 uppercase">{s.label}</span>
                        {equipment[s.id] ? (
                            <div className={`text-center font-bold px-1 ${equipment[s.id].rarity}`}>{equipment[s.id].name}</div>
                        ) : <span className="text-zinc-800">VUOTO</span>}
                    </div>
                ))}
            </div>

            <div className="w-full md:w-1/2 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl text-white underline">ZAINO</h3>
                    <button onClick={onClose} className="bg-red-900 text-white px-6 py-2 border-2 border-red-500 active:scale-90">CHIUDI</button>
                </div>
                <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-2">
                    {inventory.map(item => (
                        <div key={item.id} onClick={() => onEquip(item)} className="bg-zinc-800 p-3 border-l-4 border-zinc-600 hover:border-yellow-500 cursor-pointer">
                            <div className={`font-bold text-sm ${item.rarity}`}>{item.name}</div>
                            <div className="text-[10px] text-zinc-400">REQ: {item.requirement.value} {item.requirement.stat}</div>
                            <div className="text-green-500 text-xs mt-1">POTERE: +{item.basePower}</div>
                            {item.affixes.map((af, i) => <div key={i} className="text-[9px] text-blue-400">{af.name} +{af.value}%</div>)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
