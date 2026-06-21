import { useState } from 'react';
import GuardLayout from './GuardLayout';
import { useApp } from '../../context/AppContext';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function VisitorApproval() {
  const { visitors, approveVisitor, denyVisitor, checkoutVisitor, addToast } = useApp();
  const [filter, setFilter] = useState('Expected');
  const filtered = visitors.filter(v => v.status === filter).slice(0, 20);

  const handleApprove = (id) => {
    approveVisitor(id);
  };
  const handleDeny = (id) => {
    denyVisitor(id);
  };

  return (
    <GuardLayout title="Visitor Approval" breadcrumb="Home / Visitor Approval">
      <div className="page-content">
        <div className="stats-grid" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}><Clock size={24} /></div>
            </div>
            <div className="stat-card-value">{visitors.filter(v => v.status === 'Expected').length}</div>
            <div className="stat-card-label">Pending Approval</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}><CheckCircle size={24} /></div>
            </div>
            <div className="stat-card-value">{visitors.filter(v => v.status === 'Checked In').length}</div>
            <div className="stat-card-label">Checked In</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}><XCircle size={24} /></div>
            </div>
            <div className="stat-card-value">{visitors.filter(v => v.status === 'Denied').length}</div>
            <div className="stat-card-label">Denied</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>Visitor Approval Queue</h3></div>
          <div className="card-body">
            <div className="tab-bar">
              {['Expected', 'Checked In', 'Denied'].map(s => (
                <button key={s} className={`tab-item ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
                  {s} ({visitors.filter(v => v.status === s).length})
                </button>
              ))}
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead><tr><th>Time</th><th>Visitor</th><th>Phone</th><th>Flat</th><th>Purpose</th><th>Actions</th></tr></thead>
                <tbody>
                  {filtered.map(v => (
                    <tr key={v.id}>
                      <td style={{ fontWeight: 500 }}>{v.entryTime}</td>
                      <td>{v.name}</td>
                      <td style={{ fontSize: '0.8rem' }}>{v.phone}</td>
                      <td style={{ fontWeight: 600 }}>{v.flatNumber}</td>
                      <td><span className="badge badge-info">{v.purpose}</span></td>
                      <td>
                        {filter === 'Expected' ? (
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button className="btn btn-success btn-sm" onClick={() => handleApprove(v.id)}>
                              <CheckCircle size={14} /> Approve
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeny(v.id)}>
                              <XCircle size={14} /> Deny
                            </button>
                          </div>
                        ) : filter === 'Checked In' ? (
                          <button className="btn btn-outline btn-sm" onClick={() => { checkoutVisitor(v.id); addToast(`${v.name} checked out`); }}>
                            Check Out
                          </button>
                        ) : (
                          <span className="badge badge-danger">Denied</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={6} style={{ textAlign: 'center', padding: 32, color: 'var(--gray-400)' }}>No visitors in this category</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </GuardLayout>
  );
}
