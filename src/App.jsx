import { Routes, Route, Navigate } from "react-router-dom"; // Adicionado o Navigate aqui
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useAuth } from "./context/AuthContext";

function RotaProtegida({ children }) {
  const { token } = useAuth();
  
  // Se não houver token, redireciona para o login de forma segura
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function App() {
  return (
    <Routes>
      {/* Rota Pública de Login */}
      <Route path="/login" element={<Login />} />
      
      {/* Rota Raiz Protegida - Apenas a Home deve ser renderizada aqui */}
      <Route
        path="/"
        element={
          <RotaProtegida>
            <Home />
          </RotaProtegida>
        }
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
