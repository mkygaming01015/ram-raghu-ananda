import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';
import { Shield, Phone, Clock } from 'lucide-react';

export default function GuardDirectory() {
  const { guards } = useApp();

  return (
    <AdminLayout title="Guard Directory" breadcrumb="Home / Guard Directory">
      <div className="page-content">
        <div className="stats-grid" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}><Shield size={24} /></div>
            </div>
            <div className="stat-card-value">{guards.length}</div>
            <div className="stat-card-label">Total Guards</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}><Shield size={24} /></div>
            </div>
            <div className="stat-card-value">{guards.filter(g => g.status === 'On Duty').length}</div>
            <div className="stat-card-label">On Duty</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}><Clock size={24} /></div>
            </div>
            <div className="stat-card-value">{guards.filter(g => g.status === 'On Leave').length}</div>
            <div className="stat-card-label">On Leave</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>Guard Roster</h3></div>
          <div className="card-body">
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Phone</th><th>Gate</th><th>Shift</th><th>Experience</th><th>Joined</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {guards.map(g => (
                    <tr key={g.id}>
                      <td style={{ fontWeight: 600 }}>G{String(g.id).padStart(3, '0')}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>
                            {g.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span style={{ fontWeight: 500 }}>{g.name}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.8rem' }}>{g.phone}</td>
                      <td>{g.gate}</td>
                      <td style={{ fontSize: '0.8rem' }}>{g.shift}</td>
                      <td>{g.experience}</td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{g.joinDate}</td>
                      <td><span className={`badge badge-${g.status === 'On Duty' ? 'success' : g.status === 'On Leave' ? 'warning' : 'gray'}`}>{g.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 20 }}>
          <div className="card-header"><h3>Shift Schedule</h3></div>
          <div className="card-body">
            <div className="grid-3">
              {['6 AM - 2 PM', '2 PM - 10 PM', '10 PM - 6 AM'].map((shift, i) => (
                <div key={i} style={{ padding: 20, borderRadius: 8, border: '1px solid var(--gray-200)', background: 'var(--gray-50)' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 12, color: 'var(--gray-800)' }}>{shift}</div>
                  {guards.filter(g => g.shift === shift).map(g => (
                    <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: '0.85rem' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: g.status === 'On Duty' ? 'var(--success)' : 'var(--gray-300)' }} />
                      {g.name} — {g.gate}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
