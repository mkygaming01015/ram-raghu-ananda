import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';
import Pagination from '../shared/Pagination';
import EmptyState from '../shared/EmptyState';
import { Users, Filter, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function VisitorManagement() {
  const { visitors, checkoutVisitor, addToast } = useApp();
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const perPage = 12;
  const filtered = statusFilter === 'All' ? visitors : visitors.filter(v => v.status === statusFilter);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const todayStats = {
    total: visitors.length,
    checkedIn: visitors.filter(v => v.status === 'Checked In').length,
    checkedOut: visitors.filter(v => v.status === 'Checked Out').length,
    denied: visitors.filter(v => v.status === 'Denied').length,
  };

  return (
    <AdminLayout title="Visitor Management" breadcrumb="Home / Visitor Management">
      <div className="page-content">
        <div className="stats-grid" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--primary-100)', color: 'var(--primary)' }}><Users size={24} /></div>
            </div>
            <div className="stat-card-value">{todayStats.total}</div>
            <div className="stat-card-label">Total Today</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}><CheckCircle size={24} /></div>
            </div>
            <div className="stat-card-value">{todayStats.checkedIn}</div>
            <div className="stat-card-label">Currently Inside</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--gray-100)', color: 'var(--gray-600)' }}><Clock size={24} /></div>
            </div>
            <div className="stat-card-value">{todayStats.checkedOut}</div>
            <div className="stat-card-label">Checked Out</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}><XCircle size={24} /></div>
            </div>
            <div className="stat-card-value">{todayStats.denied}</div>
            <div className="stat-card-label">Denied</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Visitor Log - Today</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>{filtered.length} entries</span>
          </div>
          <div className="card-body">
            <div className="filter-bar">
              <Filter size={16} style={{ color: 'var(--gray-400)' }} />
              {['All', 'Checked In', 'Checked Out', 'Expected', 'Denied'].map(s => (
                <button key={s} className={`btn btn-sm ${statusFilter === s ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => { setStatusFilter(s); setPage(1); }}>{s}</button>
              ))}
            </div>
            {paged.length === 0 ? (
              <EmptyState icon={Users} title="No visitors found" description="No visitors match your filter." />
            ) : (
              <>
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table">
                    <thead>
                      <tr><th>ID</th><th>Entry</th><th>Visitor</th><th>Phone</th><th>Flat</th><th>Purpose</th><th>Status</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      {paged.map(v => (
                        <tr key={v.id}>
                          <td style={{ fontWeight: 600 }}>#{v.id}</td>
                          <td style={{ fontWeight: 500 }}>{v.entryTime}</td>
                          <td>{v.name}</td>
                          <td style={{ fontSize: '0.8rem' }}>{v.phone}</td>
                          <td style={{ fontWeight: 600 }}>{v.flatNumber}</td>
                          <td><span className="badge badge-info">{v.purpose}</span></td>
                          <td><span className={`badge badge-${v.status === 'Checked In' ? 'success' : v.status === 'Checked Out' ? 'gray' : v.status === 'Expected' ? 'warning' : 'danger'}`}>{v.status}</span></td>
                          <td>
                            {v.status === 'Checked In' && (
                              <button className="btn btn-outline btn-sm" style={{ fontSize: '0.7rem', padding: '4px 8px' }}
                                onClick={() => { checkoutVisitor(v.id); addToast(`${v.name} checked out`); }}>Check Out</button>
                            )}
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
