import { useState } from 'react';
import Sidebar from '../shared/Sidebar';
import Header from '../shared/Header';
import { Home, AlertTriangle, Clock, FileText, Users, Wrench, Bell, Phone, LayoutDashboard } from 'lucide-react';

export default function ResidentLayout({ children, title, breadcrumb }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sections = [
    { title: 'Main', items: [
      { path: '/resident/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, exact: true },
      { path: '/resident/complaint', label: 'Raise Complaint', icon: <AlertTriangle size={20} /> },
      { path: '/resident/complaints', label: 'Complaint History', icon: <FileText size={20} />, badge: 3 },
    ]},
    { title: 'Visitors', items: [
      { path: '/resident/visitor-pass', label: 'Visitor Pass', icon: <Users size={20} /> },
      { path: '/resident/qr-guest-pass', label: 'QR Guest Pass', icon: <FileText size={20} /> },
    ]},
    { title: 'Society', items: [
      { path: '/resident/maintenance', label: 'Maintenance', icon: <Wrench size={20} /> },
      { path: '/resident/notices', label: 'Notices', icon: <Bell size={20} />, badge: 2 },
      { path: '/resident/contacts', label: 'Emergency Contacts', icon: <Phone size={20} /> },
    ]},
  ];

  return (
    <div className="app-layout">
      <Sidebar
        sections={sections}
        portalName="Resident Portal"
        portalColor="#2563EB"
        user={{ name: 'Rajesh Sharma', role: 'Flat A101 • Owner' }}
        onClose={sidebarOpen ? () => setSidebarOpen(false) : null}
      />
      <main className="main-content">
        <Header title={title} breadcrumb={breadcrumb} onMenuClick={() => setSidebarOpen(true)} />
        {children}
      </main>
    </div>
  );
}
