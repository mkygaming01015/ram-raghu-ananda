import { useState, useEffect } from 'react';
import ResidentLayout from './ResidentLayout';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { AlertTriangle, Users, Wrench, Bell, FileText } from 'lucide-react';

export default function ResidentDashboard() {
  const { complaints, notices, stats } = useApp();
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 400); }, []);

  if (loading) return <ResidentLayout title="Dashboard" breadcrumb="Home / Dashboard"><div style={{ padding: 32 }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}><div style={{ width: 40, height: 40, border: '3px solid var(--gray-200)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div></div></ResidentLayout>;

  const myComplaints = complaints.filter(c => c.flatNumber === 'A101');
  const openMy = myComplaints.filter(c => c.status === 'Open' || c.status === 'In Progress').length;

  return (
    <ResidentLayout title="Dashboard" breadcrumb="Home / Dashboard">
      <div className="page-content">
        <div style={{
          background: 'linear-gradient(135deg, #2563EB, #3B82F6)',
          borderRadius: 16, padding: 32, marginBottom: 28, color: 'white',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 4 }}>Welcome back, Rajesh! 👋</h2>
            <p style={{ opacity: 0.85, fontSize: '0.9rem' }}>Flat A101 • Block A • Owner</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/resident/complaint" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '0.85rem' }}>
              <AlertTriangle size={16} /> Raise Complaint
            </Link>
            <Link to="/resident/visitor-pass" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '0.85rem' }}>
              <Users size={16} /> Visitor Pass
            </Link>
          </div>
        </div>

        <div className="stats-grid">
          <Link to="/resident/complaints" style={{ textDecoration: 'none' }}>
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-card-header">
                <div className="stat-card-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}><AlertTriangle size={24} /></div>
                {openMy > 0 && <div className="stat-card-trend down">{openMy} active</div>}
              </div>
              <div className="stat-card-value">{openMy}</div>
              <div className="stat-card-label">My Open Complaints</div>
            </div>
          </Link>
          <Link to="/resident/visitor-pass" style={{ textDecoration: 'none' }}>
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-card-header">
                <div className="stat-card-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}><Users size={24} /></div>
                <div className="stat-card-trend up">+12</div>
              </div>
              <div className="stat-card-value">{stats.visitorsToday}</div>
              <div className="stat-card-label">Visitors Today</div>
            </div>
          </Link>
          <Link to="/resident/maintenance" style={{ textDecoration: 'none' }}>
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-card-header">
                <div className="stat-card-icon" style={{ background: 'var(--info-light)', color: 'var(--info)' }}><Wrench size={24} /></div>
              </div>
              <div className="stat-card-value">₹3,750</div>
              <div className="stat-card-label">Next Due (June)</div>
            </div>
          </Link>
          <Link to="/resident/notices" style={{ textDecoration: 'none' }}>
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-card-header">
                <div className="stat-card-icon" style={{ background: 'var(--purple-light)', color: 'var(--purple)' }}><Bell size={24} /></div>
                <div className="stat-card-trend up">2 new</div>
              </div>
              <div className="stat-card-value">{notices.length}</div>
              <div className="stat-card-label">Society Notices</div>
            </div>
          </Link>
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <h3>My Recent Complaints</h3>
              <Link to="/resident/complaints" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 500 }}>View All →</Link>
            </div>
            <div className="card-body">
              {myComplaints.slice(0, 5).length === 0 ? (
                <p style={{ textAlign: 'center', padding: 20, color: 'var(--gray-400)' }}>No complaints yet</p>
              ) : myComplaints.slice(0, 5).map(c => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>#{c.id} — {c.subject}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{c.category} • {c.date}</div>
                  </div>
                  <span className={`badge badge-${c.status === 'Open' ? 'warning' : c.status === 'In Progress' ? 'info' : c.status === 'Resolved' ? 'success' : 'gray'}`}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Latest Notices</h3>
              <Link to="/resident/notices" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 500 }}>View All →</Link>
            </div>
            <div className="card-body">
              {notices.slice(0, 4).map((notice) => (
                <div key={notice.id} style={{ padding: '12px 0', borderBottom: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--gray-800)' }}>{notice.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{notice.date}</div>
                  </div>
                  <span className={`badge badge-${notice.priority === 'high' ? 'danger' : notice.priority === 'medium' ? 'warning' : 'gray'}`}>{notice.priority}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 20 }}>
          <div className="card-header"><h3>Quick Actions</h3></div>
          <div className="card-body">
            <div className="quick-actions">
              {[
                { icon: <AlertTriangle size={20} />, label: 'Raise Complaint', path: '/resident/complaint' },
                { icon: <Users size={20} />, label: 'Generate Pass', path: '/resident/visitor-pass' },
                { icon: <Wrench size={20} />, label: 'View Maintenance', path: '/resident/maintenance' },
                { icon: <Bell size={20} />, label: 'View Notices', path: '/resident/notices' },
                { icon: <FileText size={20} />, label: 'QR Guest Pass', path: '/resident/qr-guest-pass' },
              ].map((action) => (
                <Link key={action.label} to={action.path} className="quick-action-btn">{action.icon} {action.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ResidentLayout>
  );
}
