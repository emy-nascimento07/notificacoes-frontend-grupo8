import { API_URL } from "../config";
import { useAuth } from "../context/AuthContext";

function NotificationCard({
  id,
  tipo,
  data_envio,
  assunto,
  destinatario_email,
  enviada,
  onAtualizarLista,
  createdAt,
}) {
  const { token } = useAuth();

  const dataParaExibir = data_envio || createdAt;
  const horaFormatada = dataParaExibir
    ? new Date(dataParaExibir).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--";

  // Ação de Marcar como Enviada/Lida (PUT)
  async function handleMarcarComoEnviada() {
    try {
      const resposta = await fetch(`${API_URL}/notificacoes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ enviada: true }),
      });

      if (!resposta.ok) throw new Error("Erro ao atualizar status");

      onAtualizarLista();
    } catch (erro) {
      console.error(erro.message);
      alert("Não foi possível atualizar a notificação.");
    }
  }

  // Ação de Apagar (DELETE)
  async function handleApagar() {
    if (!confirm("Tem certeza que deseja apagar esta notificação?")) return;

    try {
      const resposta = await fetch(`${API_URL}/notificacoes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resposta.ok) throw new Error("Erro ao apagar notificação");

      onAtualizarLista();
    } catch (erro) {
      console.error(erro.message);
      alert("Não foi possível apagar a notificação.");
    }
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md text-left flex justify-between items-start">
      <div>
        <div className="flex gap-2 text-xs font-mono text-gray-500 mb-2">
          <span className="bg-teal-50 text-teal-800 px-2 py-0.5 rounded uppercase font-bold">
            {tipo || "NOTIFICAÇÃO"}
          </span>

          <span>{horaFormatada}</span>

          {!enviada && (
            <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-sans">
              Pendente
            </span>
          )}
        </div>

        <h3 className="font-semibold text-base mb-1 text-gray-800">
          {assunto}
        </h3>
        <p className="text-sm text-gray-700">Para: {destinatario_email}</p>
      </div>

      <div className="flex gap-2 ml-4">
        {!enviada && (
          <button
            onClick={handleMarcarComoEnviada}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-2 py-1 rounded transition-colors"
          >
            ✓ Enviar
          </button>
        )}
        <button
          onClick={handleApagar}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-2 py-1 rounded transition-colors"
        >
          Apagar
        </button>
      </div>
    </div>
  );
}

export default NotificationCard;
