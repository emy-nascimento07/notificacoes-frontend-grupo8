function Button({ children, variant = 'primario', onClick }) {
    const estilos = {
        primario: 'bg-botaoLogin text-textoBase',
        botaoChamada: 'bg-botaoChamada text-textoBase',
        botaoCancelar: 'bg-botaoCancelar text-textoBase',
    };

    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded ${estilos[variant]}`}
        >
            {children}
        </button>
    );
}

export default Button;