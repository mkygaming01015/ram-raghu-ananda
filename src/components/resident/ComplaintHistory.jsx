import { useState } from 'react';
import ResidentLayout from './ResidentLayout';
import { useApp } from '../../context/AppContext';
import Pagination from '../shared/Pagination';
import EmptyState from '../shared/EmptyState';
import { FileText } from 'lucide-react';

export default function ComplaintHistory() {
  const { complaints } = useApp();
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const perPage = 10;
  const statusColors = { 'Open': 'warning', 'In Progress': 'info', 'Resolved': 'success', 'Closed': 'gray', 'Escalated': 'danger' };
  const priorityColors = { 'Low': 'gray', 'Medium': 'warning', 'High': 'danger', 'Critical': 'danger' };

  const myComplaints = complaints;
  const filtered = filter === 'All' ? myComplaints : myComplaints.filter(c => c.status === filter);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <ResidentLayout title="Complaint History" breadcrumb="Home / Complaint History">
      <div className="page-content">
        <div className="card">
          <div className="card-header">
            <h3>My Complaints</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>{filtered.length} complaints</span>
          </div>
          <div className="card-body">
            <div className="filter-bar">
              {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map(s => (
                <button key={s} className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => { setFilter(s); setPage(1); }}>{s}</button>
              ))}
            </div>
            {paged.length === 0 ? (
              <EmptyState icon={FileText} title="No complaints found" description={filter !== 'All' ? `No ${filter.toLowerCase()} complaints.` : 'You haven\'t raised any complaints yet.'} />
            ) : (
              <>
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table">
                    <thead>
                      <tr><th>ID</th><th>Category</th><th>Subject</th><th>Priority</th><th>Status</th><th>Date</th><th>Assigned To</th></tr>
                    </thead>
                    <tbody>
                      {paged.map(c => (
                        <tr key={c.id}>
                          <td style={{ fontWeight: 600 }}>#{c.id}</td>
                          <td>{c.category}</td>
                          <td style={{ maxWidth: 200 }}>{c.subject}</td>
                          <td><span className={`badge badge-${priorityColors[c.priority]}`}>{c.priority}</span></td>
                          <td><span className={`badge badge-${statusColors[c.status]}`}>{c.status}</span></td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{c.date}</td>
                          <td style={{ fontSize: '0.8rem' }}>{c.assignedTo || '—'}</td>
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
    </ResidentLayout>
  );
}
