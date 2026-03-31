import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getCategories, createCategory, deleteCategory, updateCategory } from "../../services/api/CategoryService";

export default function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: "" });
    const [submitting, setSubmitting] = useState(false);
    const [editCategory, setEditCategory] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const data = await getCategories();
                setCategories(data || []);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchCategories();
    }, []);

    const handleCreateCategory = async () => {
        if (!newCategory.name.trim()) {
            Swal.fire("Warning", "Category name cannot be empty!", "warning");
            return;
        }
        setSubmitting(true);
        try {
            const data = await createCategory(newCategory);
            Swal.fire("Success", "Category created successfully!", "success");
            setCategories(prev => [data.data, ...prev]);
            setNewCategory({ name: "" });
        } catch (error) {
            let message = error.response?.data?.message || "Something went wrong!";
            Swal.fire("Error", message, "error");
        }
        setSubmitting(false);
    };

    const handleUpdateCategory = async () => {
        if (!editCategory.name.trim()) {
            Swal.fire("Warning", "Category name cannot be empty!", "warning");
            return;
        }
        setSubmitting(true);
        try {
            const data = await updateCategory(editCategory.id, { name: editCategory.name });
            Swal.fire("Success", "Category updated successfully!", "success");
            setCategories(prev => prev.map(cat => cat.id === editCategory.id ? data.data : cat));
            setEditCategory(null);
        } catch (error) {
            let message = error.response?.data?.message || "Something went wrong!";
            Swal.fire("Error", message, "error");
        }
        setSubmitting(false);
    };

    const handleDeleteCategory = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (confirm.isConfirmed) {
            try {
                await deleteCategory(id);
                setCategories(prev => prev.filter(cat => cat.id !== id));
                Swal.fire("Deleted!", "Category has been deleted.", "success");
            } catch (error) {
                let message = error.response?.data?.message || "Failed to delete category!";
                Swal.fire("Error", message, "error");
            }
        }
    };

    return (
        <div className="p-6 bg-white shadow rounded">
            <h2 className="text-3xl font-bold mb-6">Manage Categories</h2>

            {/* Add Category */}
            <div className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder={editCategory ? "Update Category Name" : "New Category Name"}
                    value={editCategory ? editCategory.name : newCategory.name}
                    onChange={e => editCategory
                        ? setEditCategory({ ...editCategory, name: e.target.value })
                        : setNewCategory({ name: e.target.value })
                    }
                    className="pl-2 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 w-64 text-md flex-1"
                />
                {editCategory ? (
                    <>
                        <button
                            onClick={handleUpdateCategory}
                            disabled={submitting}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {submitting ? "Updating..." : "Update Category"}
                        </button>
                        <button
                            onClick={() => setEditCategory(null)}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleCreateCategory}
                        disabled={submitting}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                    >
                        {submitting ? "Adding..." : "Add Category"}
                    </button>
                )}
            </div>

            {/* Categories Table */}
            {loading ? (
                <p>Loading categories...</p>
            ) : categories.length === 0 ? (
                <p>No categories found.</p>
            ) : (
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {categories.map((cat, index) => (
                            <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6 text-sm font-medium text-gray-900">{index + 1}</td>
                                <td className="py-4 px-6 text-sm text-gray-500">{cat.name}</td>
                                <td className="py-4 px-6 flex justify-end gap-2">
                                    {/* Update Button */}
                                    <button
                                        onClick={() => setEditCategory(cat)}
                                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Update
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDeleteCategory(cat.id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}