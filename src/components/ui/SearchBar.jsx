import React from "react";
import { MdSearch } from "react-icons/md";
import Input  from "./InputField";

export default function SearchBar() {
    return (
        <div className="w-full max-w-xl mx-auto relative">

            {/* Desktop & Tablet */}
            <div className="hidden lg:flex w-full">
                <Input
                    type="text"
                    placeholder="Search products..."
                    className="rounded-l-md flex-1"
                />
                <button className="bg-[#3a86ff] px-4 py-2 rounded-r-md text-white hover:bg-blue-600 transition-colors">
                    <MdSearch size={22} />
                </button>
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden w-full relative">
                <Input
                    type="text"
                    placeholder="Search..."
                    className="rounded-md w-full pr-10"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white">
                    <MdSearch size={20} />
                </button>
            </div>

        </div>
    );
}