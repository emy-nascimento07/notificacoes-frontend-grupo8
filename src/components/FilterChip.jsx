function FilterChip({ label, ativo, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm border ${
        ativo
          ? "bg-gray-500 text-white border-gray-500"
          : "bg-white text-gray-500 border-gray-200"
      }`}
    >
      {label}
    </button>
  );
}
export default FilterChip;
