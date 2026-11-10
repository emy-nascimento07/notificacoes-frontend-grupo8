import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../../config";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    try {
      const resposta = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      
      if (!resposta.ok) throw new Error("E-mail ou senha incorretos.");
      
      const { token } = await resposta.json();
      login(token);
      navigate("/");
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto w-full sm:max-w-md">
        {/* Título condizente com a identidade da Central de Notificações */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Central de Notificações
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Faça login para gerenciar seus alertas
        </p>
      </div>

      <div className="mt-8 sm:mx-auto w-full sm:max-w-md p-4 sm:p-0">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 rounded-xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Endereço de e-mail
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@empresa.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-marca focus:border-transparent transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
                Sua senha
              </label>
              <input
                id="senha"
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-marca focus:border-transparent transition-all text-sm"
              />
            </div>

            {erro && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm font-medium text-center">{erro}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={carregando}
                className="w-full bg-marca hover:bg-opacity-90 disabled:opacity-50 text-white rounded-lg px-4 py-2.5 font-semibold text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-marca"
              >
                {carregando ? "Autenticando..." : "Entrar na plataforma"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
