import { useState } from "react";
import { API_URL } from "../config";
import { useAuth } from "../context/AuthContext";

function NovaNotificacaoForm({ onAdicionar }) {
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [tipo, setTipo] = useState("confirmacao");

  const { token } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    // Validação simples para não enviar campos vazios
    if (!titulo.trim() || !texto.trim()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const novaNotificacao = {
      titulo,
      texto,
      tipo,
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

      if (!resposta.ok) throw new Error("Erro ao criar notificação");

      const dadosSalvos = await resposta.json();

      onAdicionar(dadosSalvos);

      // Limpa os campos após o sucesso
      setTitulo("");
      setTexto("");
      setTipo("confirmacao");
    } catch (erro) {
      console.error(erro.message);
      alert("Não foi possível salvar a notificação.");
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
        className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand"
      />

      <textarea
        placeholder="Texto ou mensagem..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand resize-none h-20"
      />

      <div className="flex gap-4 items-center">
        <label className="text-sm text-gray-600 font-medium">Tipo:</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border border-gray-200 rounded-lg px-2 py-1 bg-white"
        >
          <option value="confirmacao">Confirmação</option>
          <option value="lembrete">Lembrete</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold transition-colors mt-2"
      >
        Criar Notificação
      </button>
    </form>
  );
}

export default NovaNotificacaoForm;
