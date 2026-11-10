function Button({ children, variant = "primario", onClick }) {
  const estilos = {
    primario: "bg-marca text-black",
    destaque: "bg-destaque text-black",
  };
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold ${estilos[variant]}`}
    >
      {children}
    </button>
  );
}
export default Button;
