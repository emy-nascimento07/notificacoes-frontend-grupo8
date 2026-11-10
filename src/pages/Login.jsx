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
      const { token } = await resposta.json();
      login(token);
      navigate("/");
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    // Alterado de <div> para <main> para corrigir o erro de acessibilidade
    <main className="min-h-screen w-screen flex items-center justify-center bg-fundo">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 flex flex-col gap-4 bg-white rounded-xl border border-gray-100 shadow-sm"
      >
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-textoBase">Acessar Conta</h1>
          <p className="text-sm text-gray-500">Insira suas credenciais abaixo</p>
        </div>

        <div className="flex flex-col gap-1">
          {/* Corrigido: Removido o caractere '隔' que estava após a classe */}
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplo@email.com"
            className="border border-gray-200 rounded-lg px-3 py-2 text-textoBase focus:outline-none focus:border-botaoLogin"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="senha" className="text-sm font-medium text-gray-600">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="••••••••"
            className="border border-gray-200 rounded-lg px-3 py-2 text-textoBase focus:outline-none focus:border-botaoLogin"
            required
          />
        </div>

        {erro && (
          <p className="text-red-600 text-sm bg-red-50 p-2 rounded-lg text-center font-medium">
            {erro}
          </p>
        )}

        <button 
          type="submit"
          className="bg-botaoLogin hover:brightness-95 text-textoBase rounded-lg px-4 py-2.5 font-semibold transition-all mt-2 cursor-pointer"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

export default Login;
