import { useState, useEffect } from "react";
import { API_URL } from "../config";
import NovaNotificacaoForm from "../components/NovaNotificacaoForm";
import FilterBar from "../components/FilterBar";
import NotificationList from "../components/NotificationList";

function Home() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtro, setFiltro] = useState("todas");

  async function buscarNotificacoes() {
    try {
      const resposta = await fetch(`${API_URL}/notificacoes`);
      if (!resposta.ok) throw new Error("Erro ao buscar notificações");

      const dados = await resposta.json();
      setNotificacoes(dados); 
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarNotificacoes();
  }, []);

  const notificacoesVisiveis = notificacoes.filter((n) => {
    if (filtro === "todas") return true;

    const tipoNotificacao = (n.tipo || "").toLowerCase();

    if (filtro === "push" || filtro === "confirmacao")
      return tipoNotificacao === "confirmacao";
    if (filtro === "email" || filtro === "lembrete")
      return tipoNotificacao === "lembrete";

    return true;
  });

  function adicionarNotificacao(nova) {
    setNotificacoes((atual) => [nova, ...atual]);
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Central de Notificações</h1>

      <NovaNotificacaoForm onAdicionar={adicionarNotificacao} />

      <div className="flex gap-2 mb-4">
        <FilterBar filtroAtual={filtro} onFiltroChange={setFiltro} />
      </div>

      <div className="flex flex-col gap-3">
        {carregando && (
          <p className="text-gray-500 text-center py-4">Carregando notificações...</p>
        )}

        {erro && (
          <p className="text-red-600 text-center py-4">
            Não foi possível carregar. Tente novamente.
          </p>
        )}

        {!carregando && !erro && (
          <NotificationList 
            notificacoes={notificacoesVisiveis} 
            onAtualizarLista={buscarNotificacoes} 
          />
        )}
      </div>
    </div>
  );
}

export default Home;
