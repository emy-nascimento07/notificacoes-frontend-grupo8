// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import FilterBar from "../components/FilterBar";
import NotificationList from "../components/NotificationList";
import NovaNotificacaoForm from "../components/NovaNotificacaoForm";

function Home() {
  const [filtro, setFiltro] = useState("todas");
  const [notificacoes, setNotificacoes] = useState([]);
  const { token, logout } = useAuth();

  async function buscarNotificacoes() {
    try {
      const resposta = await fetch(`${API_URL}/notificacoes`);
      if (resposta.ok) {
        const dados = await resposta.json();
        setNotificacoes(dados);
      }
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    }
  }

  useEffect(() => {
    buscarNotificacoes();
  }, []);

  async function adicionarNotificacao(nova) {
    try {
      const resposta = await fetch(`${API_URL}/notificacoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Enviando tanto 'texto' quanto 'mensagem' caso o banco exija um ou outro
        body: JSON.stringify({
          canal: nova.canal,
          titulo: nova.titulo,
          texto: nova.texto,
          mensagem: nova.texto,
        }),
      });

      if (resposta.ok) {
        buscarNotificacoes();
      } else {
        console.error("Erro na resposta do servidor ao adicionar");
      }
    } catch (error) {
      console.error("Erro ao adicionar:", error);
    }
  }

  async function marcarComoLida(id) {
    try {
      const resposta = await fetch(`${API_URL}/notificacoes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lida: true }),
      });

      if (resposta.ok) {
        buscarNotificacoes();
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  }

  async function apagarNotificacao(id) {
    try {
      const resposta = await fetch(`${API_URL}/notificacoes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resposta.ok) {
        buscarNotificacoes();
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  }

  const notificacoesVisiveis = notificacoes.filter((n) => {
    if (filtro === "todas") return true;
    if (filtro === "push") return n.canal?.toUpperCase() === "PUSH";
    if (filtro === "email") return n.canal?.toUpperCase() === "EMAIL";
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="flex justify-between items-center mb-6 border-b pb-2">
        <h1 className="text-2xl font-bold">Central de Notificações</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-red-600 transition"
        >
          Sair
        </button>
      </header>

      <NovaNotificacaoForm onAdicionar={adicionarNotificacao} />

      <FilterBar filtroAtual={filtro} onFiltroChange={setFiltro} />

      <NotificationList
        notificacoes={notificacoesVisiveis}
        onMarcarComoLida={marcarComoLida}
        onApagar={apagarNotificacao}
      />
    </div>
  );
}

export default Home;
