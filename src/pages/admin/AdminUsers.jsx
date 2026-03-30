import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import { getUsers, deleteUser } from '../../services/api/UserService';
import Swal from 'sweetalert2';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data || []);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to fetch users.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id);
        setUsers(prev => prev.filter(user => user.id !== id));
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to delete user.', 'error');
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const term = search.toLowerCase();
    const matchesSearch = user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term);
    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Users Management</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors duration-200">
          Add New User
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 w-64 text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 text-sm">
            <span className="text-gray-500 self-center">Filter by:</span>
            <select
              className="border border-gray-200 rounded-lg px-2 py-1 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
            >
              <option>All Roles</option>
              <option>Admin</option>
              <option>Customer</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Added</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-4 text-gray-500">Loading users...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-4 text-gray-500">No users found.</td></tr>
              ) : filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-700">{user.role}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3 transition-colors" title="Edit">
                      <FiEdit2 className="w-5 h-5 inline" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <FiTrash2 className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
