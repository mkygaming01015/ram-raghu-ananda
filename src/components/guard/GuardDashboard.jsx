import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GuardLayout from './GuardLayout';
import { useApp } from '../../context/AppContext';
import { Users, UserCheck, Clock, AlertTriangle, UserPlus, QrCode } from 'lucide-react';

export default function GuardDashboard() {
  const { visitors } = useApp();
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 400); }, []);

  const todayVisitors = visitors.slice(0, 20);
  const checkedIn = visitors.filter(v => v.status === 'Checked In').length;
  const pendingApproval = visitors.filter(v => v.status === 'Expected').length;
  const denied = visitors.filter(v => v.status === 'Denied').length;

  if (loading) return <GuardLayout title="Guard Dashboard" breadcrumb="Home / Dashboard"><div style={{ padding: 32 }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}><div style={{ width: 40, height: 40, border: '3px solid var(--gray-200)', borderTopColor: 'var(--success)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div></div></GuardLayout>;

  return (
    <GuardLayout title="Guard Dashboard" breadcrumb="Home / Dashboard">
      <div className="page-content">
        <div style={{
          background: 'linear-gradient(135deg, #059669, #10B981)',
          borderRadius: 16, padding: 32, marginBottom: 28, color: 'white',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Security Dashboard</h2>
            <p style={{ opacity: 0.85 }}>Main Gate • Shift: 6 AM - 2 PM</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/guard/visitor-entry" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
              <UserPlus size={16} /> New Entry
            </Link>
            <Link to="/guard/qr-scanner" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
              <QrCode size={16} /> Scan QR
            </Link>
          </div>
        </div>

        <div className="stats-grid">
          <Link to="/guard/visitor-approval" style={{ textDecoration: 'none' }}>
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-card-header">
                <div className="stat-card-icon" style={{ background: 'var(--primary-100)', color: 'var(--primary)' }}><Users size={24} /></div>
              </div>
              <div className="stat-card-value">{visitors.length}</div>
              <div className="stat-card-label">Total Visitors Today</div>
            </div>
          </Link>
          <Link to="/guard/visitor-approval" style={{ textDecoration: 'none' }}>
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-card-header">
                <div className="stat-card-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}><UserCheck size={24} /></div>
              </div>
              <div className="stat-card-value">{checkedIn}</div>
              <div className="stat-card-label">Currently Inside</div>
            </div>
          </Link>
          <Link to="/guard/visitor-approval" style={{ textDecoration: 'none' }}>
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-card-header">
                <div className="stat-card-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}><Clock size={24} /></div>
              </div>
              <div className="stat-card-value">{pendingApproval}</div>
              <div className="stat-card-label">Pending Approval</div>
            </div>
          </Link>
          <Link to="/guard/visitor-approval" style={{ textDecoration: 'none' }}>
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-card-header">
                <div className="stat-card-icon" style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}><AlertTriangle size={24} /></div>
              </div>
              <div className="stat-card-value">{denied}</div>
              <div className="stat-card-label">Denied / Flagged</div>
            </div>
          </Link>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header"><h3>Recent Entries</h3></div>
          <div className="card-body">
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead><tr><th>Time</th><th>Visitor</th><th>Phone</th><th>Purpose</th><th>Flat</th><th>Status</th></tr></thead>
                <tbody>
                  {todayVisitors.map(v => (
                    <tr key={v.id}>
                      <td style={{ fontWeight: 500 }}>{v.entryTime}</td>
                      <td>{v.name}</td>
                      <td style={{ fontSize: '0.8rem' }}>{v.phone}</td>
                      <td><span className="badge badge-info">{v.purpose}</span></td>
                      <td style={{ fontWeight: 600 }}>{v.flatNumber}</td>
                      <td><span className={`badge badge-${v.status === 'Checked In' ? 'success' : v.status === 'Checked Out' ? 'gray' : v.status === 'Expected' ? 'warning' : 'danger'}`}>{v.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </GuardLayout>
  );
}
