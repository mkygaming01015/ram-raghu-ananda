import { useState } from 'react';
import Sidebar from '../shared/Sidebar';
import Header from '../shared/Header';
import { LayoutDashboard, Search, Users, UserPlus, Package, QrCode, CheckCircle, Phone } from 'lucide-react';

export default function GuardLayout({ children, title, breadcrumb }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sections = [
    { title: 'Operations', items: [
      { path: '/guard/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, exact: true },
      { path: '/guard/flat-search', label: 'Flat Search', icon: <Search size={20} /> },
      { path: '/guard/directory', label: 'Resident Directory', icon: <Users size={20} /> },
    ]},
    { title: 'Visitor Management', items: [
      { path: '/guard/visitor-entry', label: 'Visitor Entry', icon: <UserPlus size={20} /> },
      { path: '/guard/delivery-entry', label: 'Delivery Entry', icon: <Package size={20} /> },
      { path: '/guard/qr-scanner', label: 'QR Scanner', icon: <QrCode size={20} /> },
      { path: '/guard/visitor-approval', label: 'Visitor Approval', icon: <CheckCircle size={20} />, badge: 5 },
    ]},
    { title: 'Info', items: [
      { path: '/guard/contacts', label: 'Emergency Contacts', icon: <Phone size={20} /> },
    ]},
  ];

  return (
    <div className="app-layout">
      <Sidebar
        sections={sections}
        portalName="Guard Portal"
        portalColor="#10B981"
        user={{ name: 'Raj Kumar Yadav', role: 'Main Gate • On Duty' }}
        onClose={sidebarOpen ? () => setSidebarOpen(false) : null}
      />
      <main className="main-content">
        <Header title={title} breadcrumb={breadcrumb} onMenuClick={() => setSidebarOpen(true)} />
        {children}
      </main>
    </div>
  );
}
