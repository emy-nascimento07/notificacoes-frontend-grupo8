// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);

    try {
      const resposta = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!resposta.ok) throw new Error("Credenciais inválidas");

      const dados = await resposta.json();
      login(dados.token);
      navigate("/");
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-md flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-center text-gray-800">
          Entrar no Sistema
        </h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="border border-gray-200 rounded-lg px-3 py-2 outline-none"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            className="border border-gray-200 rounded-lg px-3 py-2 outline-none"
            required
          />
        </div>

        {erro && (
          <p className="text-red-600 text-sm bg-red-50 p-2 rounded-md">
            {erro}
          </p>
        )}

        <button className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
