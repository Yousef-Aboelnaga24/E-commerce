import React from "react";
import Input from "../ui/InputField";
import { MdSearch } from "react-icons/md";

export default function SearchBar({ value, onChange, onSearch, className }) {
    return (
        <div className={`relative ${className}`}>
            <Input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-12 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 text-gray-900"
                value={value}
                onChange={onChange}
                onKeyDown={onSearch}
            />
            <button
                onClick={onSearch}
                className="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
            >
                <MdSearch size={20} />
            </button>
        </div>
    );
}