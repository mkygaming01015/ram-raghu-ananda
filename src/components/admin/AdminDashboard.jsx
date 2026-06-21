import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Building2, Users, AlertTriangle, Footprints, TrendingUp } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

export default function AdminDashboard() {
  const { stats, complaints, visitors, monthlyMaintenance } = useApp();
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 400); }, []);

  if (loading) return <AdminLayout title="Dashboard" breadcrumb="Home / Dashboard"><div style={{ padding: 32 }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}><div style={{ width: 40, height: 40, border: '3px solid var(--gray-200)', borderTopColor: '#7C3AED', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div></div></AdminLayout>;

  const complaintCatData = {
    labels: ['Plumbing', 'Electrical', 'Security', 'Parking', 'Common Area', 'Lift', 'Other'],
    datasets: [{ data: [8, 6, 4, 3, 5, 2, 5], backgroundColor: ['#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#06B6D4', '#6B7280'], borderWidth: 0 }],
  };

  const maintenanceData = {
    labels: monthlyMaintenance.map(m => m.month),
    datasets: [
      { label: 'Collected', data: monthlyMaintenance.map(m => m.collected / 100000), backgroundColor: '#3B82F680', borderColor: '#3B82F6', borderWidth: 2, borderRadius: 4 },
      { label: 'Target', data: monthlyMaintenance.map(m => m.target / 100000), backgroundColor: '#E5E7EB80', borderColor: '#D1D5DB', borderWidth: 2, borderRadius: 4 },
    ],
  };

  const visitorTrendData = {
    labels: Array.from({ length: 30 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - 29 + i); return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }); }),
    datasets: [{ label: 'Visitors', data: Array.from({ length: 30 }, () => 120 + Math.floor(Math.random() * 60)), borderColor: '#3B82F6', backgroundColor: '#3B82F620', fill: true, tension: 0.4, pointRadius: 0, pointHoverRadius: 4 }],
  };

  const recentActivity = [
    { color: 'var(--danger)', text: `Critical complaint: ${complaints.find(c => c.priority === 'Critical')?.subject || 'Lift malfunction in Block B'}`, time: '10 min ago' },
    { color: 'var(--success)', text: 'Maintenance bill collected from 12 flats today', time: '1 hour ago' },
    { color: 'var(--primary)', text: 'New resident registered: Flat K205', time: '2 hours ago' },
    { color: 'var(--warning)', text: 'Visitor denied: Unregistered delivery person', time: '3 hours ago' },
    { color: 'var(--info)', text: 'Guard shift change: Evening shift started', time: '4 hours ago' },
  ];

  return (
    <AdminLayout title="Dashboard Overview" breadcrumb="Home / Dashboard">
      <div className="page-content">
        <div style={{
          background: 'linear-gradient(135deg, #7C3AED, #8B5CF6)',
          borderRadius: 16, padding: 32, marginBottom: 28, color: 'white',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Admin Overview</h2>
            <p style={{ opacity: 0.85 }}>Ram Raghu Ananda Phase 2 • Last updated: Just now</p>
          </div>
          <Link to="/admin/reports" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>View Reports</Link>
        </div>

        <div className="stats-grid">
          {[
            { icon: <Building2 size={24} />, value: '480', label: 'Total Flats', color: '#3B82F6', bg: '#EFF6FF', trend: '+2', trendDir: 'up', link: '/admin/residents' },
            { icon: <Users size={24} />, value: '1,320', label: 'Active Residents', color: '#10B981', bg: '#D1FAE5', trend: '+15', trendDir: 'up', link: '/admin/residents' },
            { icon: <AlertTriangle size={24} />, value: complaints.filter(c => c.status === 'Open' || c.status === 'In Progress').length.toString(), label: 'Open Complaints', color: '#F59E0B', bg: '#FEF3C7', trend: '-3', trendDir: 'up', link: '/admin/complaints' },
            { icon: <Footprints size={24} />, value: visitors.length.toString(), label: 'Visitors Today', color: '#06B6D4', bg: '#CFFAFE', trend: '+18', trendDir: 'up', link: '/admin/visitors' },
            { icon: <TrendingUp size={24} />, value: '87%', label: 'Collection Rate', color: '#8B5CF6', bg: '#EDE9FE', trend: '+2%', trendDir: 'up', link: '/admin/maintenance' },
          ].map((stat, i) => (
            <Link key={i} to={stat.link} style={{ textDecoration: 'none' }}>
              <div className="stat-card" style={{ cursor: 'pointer' }}>
                <div className="stat-card-header">
                  <div className="stat-card-icon" style={{ background: stat.bg, color: stat.color }}>{stat.icon}</div>
                  <div className={`stat-card-trend ${stat.trendDir}`}>{stat.trend}</div>
                </div>
                <div className="stat-card-value">{stat.value}</div>
                <div className="stat-card-label">{stat.label}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid-2" style={{ marginBottom: 20 }}>
          <div className="card">
            <div className="card-header"><h3>Complaint Categories</h3></div>
            <div className="card-body">
              <div className="chart-container" style={{ height: 260 }}>
                <Doughnut data={complaintCatData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { padding: 12, usePointStyle: true, font: { size: 11 } } } }, cutout: '65%' }} />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><h3>Maintenance Collection (₹ Lakhs)</h3></div>
            <div className="card-body">
              <div className="chart-container" style={{ height: 260 }}>
                <Bar data={maintenanceData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { usePointStyle: true, font: { size: 11 } } } }, scales: { y: { beginAtZero: true, grid: { color: '#f3f4f6' } }, x: { grid: { display: false } } } }} />
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header"><h3>Visitor Trend (Last 30 Days)</h3></div>
          <div className="card-body">
            <div className="chart-container" style={{ height: 220 }}>
              <Line data={visitorTrendData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false, grid: { color: '#f3f4f6' } }, x: { grid: { display: false }, ticks: { maxTicksLimit: 10, font: { size: 10 } } } } }} />
            </div>
          </div>
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="card-header"><h3>Recent Activity</h3></div>
            <div className="card-body">
              {recentActivity.map((item, i) => (
                <div className="activity-item" key={i}>
                  <div className="activity-dot" style={{ background: item.color }} />
                  <div>
                    <div className="activity-text">{item.text}</div>
                    <div className="activity-time">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-header"><h3>Quick Overview</h3></div>
            <div className="card-body">
              {[
                { label: 'Occupancy Rate', value: '88%', bar: 88, color: 'var(--success)' },
                { label: 'Maintenance Collection', value: '87%', bar: 87, color: 'var(--primary)' },
                { label: 'Complaint Resolution', value: '72%', bar: 72, color: 'var(--warning)' },
                { label: 'Visitor Approval Rate', value: '95%', bar: 95, color: 'var(--info)' },
                { label: 'Guard Attendance', value: '100%', bar: 100, color: 'var(--purple)' },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.85rem' }}>
                    <span style={{ fontWeight: 500, color: 'var(--gray-700)' }}>{item.label}</span>
                    <span style={{ fontWeight: 600, color: item.color }}>{item.value}</span>
                  </div>
                  <div className="maintenance-progress">
                    <div className="maintenance-progress-fill" style={{ width: `${item.bar}%`, background: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
