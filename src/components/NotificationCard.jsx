function NotificationCard({ id, canal, hora, titulo, texto, lida, onMarcarLida, onDeletar }) {
    return (
        <div className={`border rounded-lg p-4 shadow-md transition-colors ${lida ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'}`}>
            <div className="flex gap-2 text-xs font-mono text-gray-500 mb-2 items-center justify-between">
                <div className="flex gap-2">
                    <span className="bg-teal-50 text-teal-800 px-2 py-0.5 rounded">
                        {canal}
                    </span>
                    <span>
                        {hora}
                    </span>
                    {!lida && (
                        <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-semibold">
                            não lida
                        </span>
                    )}
                </div>

                <button 
                    onClick={() => onDeletar(id)}
                    className="text-red-500 hover:text-red-700 font-sans font-medium text-xs cursor-pointer ml-auto"
                    title="Apagar notificação"
                >
                    Apagar
                </button>
            </div>
            
            <h3 className={`font-semibold text-base mb-1 ${lida ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                {titulo}
            </h3>
            <p className={`text-sm ${lida ? 'text-gray-400' : 'text-gray-700'}`}>{texto}</p>

            {!lida && (
                <div className="mt-3 flex justify-end border-t border-gray-100 pt-2">
                    <button
                        onClick={() => onMarcarLida(id)}
                        className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors cursor-pointer"> Marcar como lida
                    </button>
                </div>
            )}
        </div>
    );
}

export default NotificationCard;
