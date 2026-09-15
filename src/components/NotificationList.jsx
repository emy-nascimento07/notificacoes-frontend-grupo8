import NotificationCard from "./NotificationCard";

function NotificationList({ notificacoes }) {
    if (notificacoes.length === 0) {
        return (
        <p className="textoBase text-sm font-bold">Nenhuma notificação por aqui.</p>
        );
    }

    return (
        <div>
            {notificacoes.map((n) => (
                <NotificationCard key={n.id} {...n} />
            ))}
        </div>
    );
}

export default NotificationList;