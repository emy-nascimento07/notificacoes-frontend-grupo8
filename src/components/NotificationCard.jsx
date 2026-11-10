// src/components/NotificationCard.jsx
function NotificationCard({ notificacao, onMarcarComoLida, onApagar }) {
  // Pegamos todas as variações de nomes que o seu banco de dados pode ter salvado
  const {
    id,
    canal,
    hora,
    titulo,
    title,
    texto,
    mensagem,
    text,
    description,
    lida,
    status,
  } = notificacao;

  // Define o título e a descrição baseado no que vier preenchido da API
  const exibirTitulo = titulo || title || "Notificação sem título";
  const exibirConteudo =
    texto || mensagem || text || description || "Sem conteúdo";

  // Verifica se está lida (aceitando boolean ou string 'LIDA'/'lida')
  const estaLida = lida === true || status?.toUpperCase() === "LIDA";

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-4 mb-4 flex justify-between items-center ${estaLida ? "opacity-50" : ""}`}
    >
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-1.5 flex-wrap">
          <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-bold">
            {canal || "GERAL"}
          </span>
          {hora && <span>{hora}</span>}
          {!estaLida && (
            <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-semibold">
              não lida
            </span>
          )}
        </div>
        <h3
          className={`font-bold text-gray-800 text-base mb-0.5 truncate ${estaLida ? "line-through text-gray-400" : ""}`}
        >
          {exibirTitulo}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">{exibirConteudo}</p>
      </div>

      <div className="flex gap-2 shrink-0">
        {!estaLida && (
          <button
            onClick={() => onMarcarComoLida(id)}
            className="bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
          >
            Marcar lida
          </button>
        )}
        <button
          onClick={() => onApagar(id)}
          className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default NotificationCard;