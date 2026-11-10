// src/components/NovaNotificacaoForm.jsx
import { useState } from "react";
import Button from "./Button";

function NovaNotificacaoForm({ onAdicionar }) {
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [canal, setCanal] = useState("PUSH");

  function handleSubmit(e) {
    e.preventDefault();
    if (!titulo.trim() || !texto.trim()) return;

    onAdicionar({
      canal,
      titulo,
      texto,
    });

    setTitulo("");
    setTexto("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título da notificação"
        className="border border-gray-200 rounded-lg px-3 py-2 outline-none"
        required
      />
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Texto da notificação"
        className="border border-gray-200 rounded-lg px-3 py-2 outline-none"
        required
      />

      <select
        value={canal}
        onChange={(e) => setCanal(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none"
      >
        <option value="PUSH">Push</option>
        <option value="EMAIL">E-mail</option>
      </select>

      <Button variant="destaque">Adicionar notificação</Button>
    </form>
  );
}

export default NovaNotificacaoForm;
