import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import NovaNotificacaoForm from "./components/NovaNotificacaoForm";
import FilterBar from "./components/FilterBar";
import NotificationList from "./components/NotificationList";

const notificacoesIniciais = [
  {
    id: 1,
    canal: "PUSH",
    hora: "14:32",
    titulo: "Inscrição confirmada",
    texto: "Seu lugar está garantido.",
    lida: false,
  },
  {
    id: 2,
    canal: "EMAIL",
    hora: "13:10",
    titulo: "Evento amanhã",
    texto: "Não esqueça o notebook.",
    lida: true,
  },
];

function App() {
  const [filtro, setFiltro] = useState("todas");
  const [notificacoes, setNotificacoes] = useState(notificacoesIniciais);

  const notificacoesVisiveis = notificacoes.filter((n) => {
    if (filtro === "todas") return true;
    if (filtro === "push") return n.canal === "PUSH";
    if (filtro === "email") return n.canal === "EMAIL";
  });

  function adicionarNotificacao(nova) {
    setNotificacoes((atual) => [nova, ...atual]);
  }

  // function handleEnviarTeste() {
  //   const teste = {
  //     id: Date.now(),
  //     canal: 'PUSH',
  //     hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  //     titulo: 'Notificação de Teste',
  //     texto: 'Esta é uma notificação criada pelo botão de teste.',
  //     lida: false,
  //   };
  //   adicionarNotificacao(teste);
  // }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Central de Notificações</h1>

      <div className="flex gap-2 mb-4">
        <FilterBar filtroAtual={filtro} onFiltroChange={setFiltro} />
      </div>

      <div className="flex flex-col gap-3">
        <NotificationList notificacoes={notificacoesVisiveis} />
      </div>

      <NovaNotificacaoForm onAdicionar={adicionarNotificacao} />

      {/* <div className="mt-6 flex justify-center">
        <Button variant="botaoChamada" onClick={handleEnviarTeste}>
          Enviar notificação de teste
        </Button>
      </div> */}
    </div>
  );
}

export default App;
