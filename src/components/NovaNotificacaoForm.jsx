import { useState } from "react";
import Button from "./Button";
import { API_URL } from "../../config";
import { useAuth } from "../context/AuthContext"; 

function NovaNotificacaoForm({ onAdicionar }) {
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [tipo, setTipo] = useState("confirmacao");

  const { token } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!titulo.trim()) return;

    const novaNotificacao = {
      canal,
      titulo,
      texto,
    };

    try {
      const resposta = await fetch(`${API_URL}/notificacoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(novaNotificacao),
      });

      if (!resposta.ok) {
        throw new Error("Erro ao salvar a notificação na API");
      }

      const dadoSalvo = await resposta.json();

      onAdicionar(dadoSalvo);

      setTitulo("");
      setTexto("");
    } catch (erro) {
      console.error(erro);
      alert(
        "Não foi possível salvar a notificação. Verifique sua conexão ou login.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 bg-white p-4 rounded-xl border border-gray-100 mb-6"
    >
      <h2 className="text-lg font-semibold text-gray-800">Nova Notificação</h2>

      <input
        type="text"
        placeholder="Título da notificação"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título da notificação"
        className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800"
      />

      <textarea
        placeholder="Texto ou mensagem..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Texto da notificação"
        className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800"
      />
      <select
        value={canal}
        onChange={(e) => setCanal(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800 bg-white"
      >
        <option value="PUSH">Push</option>
        <option value="EMAIL">E-mail</option>
      </select>
      <Button variant="botaoChamada">Adicionar notificação</Button>
    </form>
  );
}

export default NovaNotificacaoForm;
