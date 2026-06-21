import { useState } from 'react';
import Sidebar from '../shared/Sidebar';
import Header from '../shared/Header';
import { LayoutDashboard, AlertTriangle, Users, Wrench, AlertCircle, BookUser, Shield, BarChart3, ChevronRight } from 'lucide-react';

export default function AdminLayout({ children, title, breadcrumb }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sections = [
    { title: 'Overview', items: [
      { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, exact: true },
    ]},
    { title: 'Management', items: [
      { path: '/admin/complaints', label: 'Complaints', icon: <AlertTriangle size={20} />, badge: 23 },
      { path: '/admin/visitors', label: 'Visitors', icon: <Users size={20} /> },
      { path: '/admin/maintenance', label: 'Maintenance', icon: <Wrench size={20} /> },
      { path: '/admin/defaulters', label: 'Defaulter List', icon: <AlertCircle size={20} /> },
    ]},
    { title: 'Directory', items: [
      { path: '/admin/residents', label: 'Resident Directory', icon: <BookUser size={20} /> },
      { path: '/admin/guards', label: 'Guard Directory', icon: <Shield size={20} /> },
    ]},
    { title: 'Reports', items: [
      { path: '/admin/reports', label: 'Reports & Analytics', icon: <BarChart3 size={20} /> },
    ]},
  ];

  return (
    <div className="app-layout">
      <Sidebar
        sections={sections}
        portalName="Admin Dashboard"
        portalColor="#7C3AED"
        user={{ name: 'Sunil Mehta', role: 'Society Secretary' }}
        onClose={sidebarOpen ? () => setSidebarOpen(false) : null}
      />
      <main className="main-content">
        <Header title={title} breadcrumb={breadcrumb} onMenuClick={() => setSidebarOpen(true)} />
        {children}
      </main>
    </div>
  );
}
