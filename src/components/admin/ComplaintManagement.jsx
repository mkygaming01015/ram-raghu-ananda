import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';
import Pagination from '../shared/Pagination';
import EmptyState from '../shared/EmptyState';
import { AlertTriangle, Filter } from 'lucide-react';

export default function ComplaintManagement() {
  const { complaints, updateComplaintStatus } = useApp();
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [page, setPage] = useState(1);
  const perPage = 10;
  const statusColors = { 'Open': 'warning', 'In Progress': 'info', 'Resolved': 'success', 'Closed': 'gray', 'Escalated': 'danger' };
  const priorityColors = { 'Low': 'gray', 'Medium': 'warning', 'High': 'danger', 'Critical': 'danger' };
  const guards = ['Ramesh (Plumber)', 'Suresh (Electrician)', 'Prakash (Carpenter)', 'Vinod (Painter)'];

  let filtered = complaints;
  if (statusFilter !== 'All') filtered = filtered.filter(c => c.status === statusFilter);
  if (categoryFilter !== 'All') filtered = filtered.filter(c => c.category === categoryFilter);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const stats = {
    total: complaints.length,
    open: complaints.filter(c => c.status === 'Open').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
  };

  return (
    <AdminLayout title="Complaint Management" breadcrumb="Home / Complaint Management">
      <div className="page-content">
        <div className="stats-grid" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--gray-100)', color: 'var(--gray-600)' }}><AlertTriangle size={24} /></div>
            </div>
            <div className="stat-card-value">{stats.total}</div>
            <div className="stat-card-label">Total Complaints</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}><AlertTriangle size={24} /></div>
            </div>
            <div className="stat-card-value">{stats.open}</div>
            <div className="stat-card-label">Open</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--info-light)', color: 'var(--info)' }}><AlertTriangle size={24} /></div>
            </div>
            <div className="stat-card-value">{stats.inProgress}</div>
            <div className="stat-card-label">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}><AlertTriangle size={24} /></div>
            </div>
            <div className="stat-card-value">{stats.resolved}</div>
            <div className="stat-card-label">Resolved</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>All Complaints</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>{filtered.length} results</span>
          </div>
          <div className="card-body">
            <div className="filter-bar">
              <Filter size={16} style={{ color: 'var(--gray-400)' }} />
              <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
                <option value="All">All Status</option>
                {['Open','In Progress','Resolved','Closed','Escalated'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setPage(1); }}>
                <option value="All">All Categories</option>
                {[...new Set(complaints.map(c => c.category))].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            {paged.length === 0 ? (
              <EmptyState icon={AlertTriangle} title="No complaints found" description="No complaints match your filters." />
            ) : (
              <>
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table">
                    <thead>
                      <tr><th>ID</th><th>Flat</th><th>Category</th><th>Subject</th><th>Priority</th><th>Status</th><th>Date</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {paged.map(c => (
                        <tr key={c.id}>
                          <td style={{ fontWeight: 600 }}>#{c.id}</td>
                          <td style={{ fontWeight: 600 }}>{c.flatNumber}</td>
                          <td>{c.category}</td>
                          <td style={{ maxWidth: 160, fontSize: '0.8rem' }}>{c.subject}</td>
                          <td><span className={`badge badge-${priorityColors[c.priority]}`}>{c.priority}</span></td>
                          <td><span className={`badge badge-${statusColors[c.status]}`}>{c.status}</span></td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{c.date}</td>
                          <td>
                            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                              {c.status === 'Open' && (
                                <>
                                  <button className="btn btn-sm btn-outline" style={{ fontSize: '0.7rem', padding: '4px 8px' }}
                                    onClick={() => updateComplaintStatus(c.id, 'In Progress', guards[Math.floor(Math.random() * guards.length)])}>Assign</button>
                                  <button className="btn btn-sm btn-success" style={{ fontSize: '0.7rem', padding: '4px 8px' }}
                                    onClick={() => updateComplaintStatus(c.id, 'Resolved')}>Resolve</button>
                                </>
                              )}
                              {c.status === 'In Progress' && (
                                <button className="btn btn-sm btn-success" style={{ fontSize: '0.7rem', padding: '4px 8px' }}
                                  onClick={() => updateComplaintStatus(c.id, 'Resolved')}>Resolve</button>
                              )}
                              {(c.status === 'Resolved' || c.status === 'Closed') && (
                                <button className="btn btn-sm btn-outline" style={{ fontSize: '0.7rem', padding: '4px 8px' }}
                                  onClick={() => updateComplaintStatus(c.id, 'Open')}>Reopen</button>
                              )}
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
