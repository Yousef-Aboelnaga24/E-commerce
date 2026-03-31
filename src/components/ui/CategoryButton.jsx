import React from "react";

export default function CategoryButton({ name, selected, onClick }) {
  return (
    <button
      className={`whitespace-nowrap px-3 py-2 rounded-lg ${
        selected ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
      }`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
}