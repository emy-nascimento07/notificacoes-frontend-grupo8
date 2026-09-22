function FilterChip({ label, ativo, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm border ${
        ativo
          ? "bg-marca textoBase border-marca"
          : "bg-marca text-gray-500 border-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

export default FilterChip;
