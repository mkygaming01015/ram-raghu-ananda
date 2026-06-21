import ResidentLayout from './ResidentLayout';
import { useApp } from '../../context/AppContext';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function MaintenanceStatus() {
  const { monthlyMaintenance } = useApp();

  const monthlyData = [
    { month: 'January 2026', amount: 3750, status: 'Paid', date: '05/01/2026' },
    { month: 'February 2026', amount: 3750, status: 'Paid', date: '03/02/2026' },
    { month: 'March 2026', amount: 3750, status: 'Paid', date: '04/03/2026' },
    { month: 'April 2026', amount: 3750, status: 'Paid', date: '02/04/2026' },
    { month: 'May 2026', amount: 3750, status: 'Paid', date: '05/05/2026' },
    { month: 'June 2026', amount: 3750, status: 'Pending', date: 'Due: 30/06/2026' },
  ];

  const totalPaid = monthlyData.filter(m => m.status === 'Paid').reduce((sum, m) => sum + m.amount, 0);
  const pending = monthlyData.filter(m => m.status === 'Pending').reduce((sum, m) => sum + m.amount, 0);

  return (
    <ResidentLayout title="Maintenance Status" breadcrumb="Home / Maintenance Status">
      <div className="page-content">
        <div className="stats-grid" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}><CheckCircle size={24} /></div>
            </div>
            <div className="stat-card-value">₹{totalPaid.toLocaleString('en-IN')}</div>
            <div className="stat-card-label">Total Paid (2026)</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}><Clock size={24} /></div>
            </div>
            <div className="stat-card-value">₹{pending.toLocaleString('en-IN')}</div>
            <div className="stat-card-label">Pending Amount</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--primary-100)', color: 'var(--primary)' }}><AlertTriangle size={24} /></div>
            </div>
            <div className="stat-card-value">83%</div>
            <div className="stat-card-label">Payment Rate</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Monthly Maintenance Details</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>2BHK • ₹3,750/month</span>
          </div>
          <div className="card-body">
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead><tr><th>Month</th><th>Amount</th><th>Status</th><th>Date</th><th>Action</th></tr></thead>
                <tbody>
                  {monthlyData.map((m, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{m.month}</td>
                      <td style={{ fontWeight: 600 }}>₹{m.amount.toLocaleString('en-IN')}</td>
                      <td><span className={`badge badge-${m.status === 'Paid' ? 'success' : 'warning'}`}>{m.status}</span></td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{m.date}</td>
                      <td>
                        {m.status === 'Pending' ? (
                          <button className="btn btn-primary btn-sm" onClick={() => {}}>Pay Now</button>
                        ) : (
                          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--primary)' }}>Receipt</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 20 }}>
          <div className="card-header"><h3>Maintenance Breakdown</h3></div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              {[
                ['Sinking Fund', '₹750', 'var(--primary)'],
                ['Repair Fund', '₹1,250', 'var(--success)'],
                ['Water Charges', '₹500', 'var(--info)'],
                ['Electricity (Common)', '₹600', 'var(--warning)'],
                ['Security Charges', '₹400', 'var(--purple)'],
                ['Housekeeping', '₹250', 'var(--danger)'],
              ].map(([name, amount, color]) => (
                <div key={name} style={{ padding: 16, borderRadius: 8, border: `1px solid ${color}20`, background: `${color}08` }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginBottom: 4 }}>{name}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color }}>{amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ResidentLayout>
  );
}
