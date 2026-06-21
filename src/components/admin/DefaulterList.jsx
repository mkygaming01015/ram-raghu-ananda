import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';
import Pagination from '../shared/Pagination';
import EmptyState from '../shared/EmptyState';
import { AlertCircle, Phone, Download } from 'lucide-react';

export default function DefaulterList() {
  const { defaulterList, addToast } = useApp();
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const perPage = 10;
  const filtered = filter === 'All' ? defaulterList : defaulterList.filter(d => d.status === filter);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPending = defaulterList.reduce((sum, d) => sum + d.pendingAmount, 0);

  return (
    <AdminLayout title="Defaulter List" breadcrumb="Home / Defaulter List">
      <div className="page-content">
        <div className="stats-grid" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}><AlertCircle size={24} /></div>
            </div>
            <div className="stat-card-value">{defaulterList.length}</div>
            <div className="stat-card-label">Total Defaulters</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}><AlertCircle size={24} /></div>
            </div>
            <div className="stat-card-value">₹{totalPending.toLocaleString('en-IN')}</div>
            <div className="stat-card-label">Total Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}><AlertCircle size={24} /></div>
            </div>
            <div className="stat-card-value">{defaulterList.filter(d => d.status === 'Critical').length}</div>
            <div className="stat-card-label">Critical Cases</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Defaulters ({filtered.length})</h3>
            <button className="btn btn-outline btn-sm" onClick={() => addToast('Report exported as Excel!')}><Download size={14} /> Export</button>
          </div>
          <div className="card-body">
            <div className="filter-bar">
              {['All', 'Critical', 'Warning', 'Overdue'].map(s => (
                <button key={s} className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => { setFilter(s); setPage(1); }}>{s}</button>
              ))}
            </div>
            {paged.length === 0 ? (
              <EmptyState icon={AlertCircle} title="No defaulters found" description="No defaulters match your filter." />
            ) : (
              <>
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table">
                    <thead>
                      <tr><th>Flat</th><th>Owner</th><th>Phone</th><th>Months</th><th>Pending</th><th>Last Payment</th><th>Notices</th><th>Status</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      {paged.map(d => (
                        <tr key={d.id}>
                          <td style={{ fontWeight: 600 }}>{d.flatNumber}</td>
                          <td>{d.ownerName}</td>
                          <td style={{ fontSize: '0.8rem' }}>{d.ownerPhone}</td>
                          <td style={{ fontWeight: 500 }}>{d.pendingMonths} mo</td>
                          <td style={{ fontWeight: 600, color: 'var(--danger)' }}>₹{d.pendingAmount.toLocaleString('en-IN')}</td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{d.lastPayment}</td>
                          <td>{d.noticesSent}</td>
                          <td><span className={`badge badge-${d.status === 'Critical' ? 'danger' : d.status === 'Warning' ? 'warning' : 'gray'}`}>{d.status}</span></td>
                          <td>
                            <div style={{ display: 'flex', gap: 4 }}>
                              <button className="btn btn-ghost btn-sm" style={{ color: 'var(--primary)' }}><Phone size={14} /></button>
                              <button className="btn btn-ghost btn-sm" style={{ color: 'var(--warning)' }} onClick={() => addToast(`Reminder sent to ${d.ownerName}`)}>Remind</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination totalItems={filtered.length} itemsPerPage={perPage} currentPage={page} onPageChange={setPage} />
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
