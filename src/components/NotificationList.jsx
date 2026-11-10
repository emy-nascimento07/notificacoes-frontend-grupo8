// src/components/NotificationList.jsx
import NotificationCard from "./NotificationCard";

function NotificationList({ notificacoes, onMarcarComoLida, onApagar }) {
  if (notificacoes.length === 0) {
    return (
      <p className="text-gray-500 text-sm">Nenhuma notificação por aqui.</p>
    );
  }

  return (
    <div>
      {notificacoes.map((n) => (
        <NotificationCard
          key={n.id}
          notificacao={n}
          onMarcarComoLida={onMarcarComoLida}
          onApagar={onApagar}
        />
      ))}
    </div>
  );
}

export default NotificationList;