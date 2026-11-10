import NotificationCard from "./NotificationCard";

function NotificationList({ notificacoes, onAtualizarLista }) {
  if (notificacoes.length === 0) {
    return (
      <p className="textoBase text-sm font-bold text-gray-500 text-center py-4">
        Nenhuma notificação por aqui.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {notificacoes.map((n) => (
        <NotificationCard 
          key={n.id} 
          {...n} 
          onAtualizarLista={onAtualizarLista} // Repassa a função para o card
        />
      ))}
    </div>
  );
}

export default NotificationList;
