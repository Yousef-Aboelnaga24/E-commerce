import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../admin/AdminSidebar';
import AdminHeader from '../admin/AdminHeader';

function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
