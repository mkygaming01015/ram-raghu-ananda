import { useState } from 'react';
import GuardLayout from './GuardLayout';
import { useApp } from '../../context/AppContext';
import Pagination from '../shared/Pagination';
import { Search } from 'lucide-react';

export default function GuardResidentDirectory() {
  const { flats } = useApp();
  const [search, setSearch] = useState('');
  const [block, setBlock] = useState('All');
  const [page, setPage] = useState(1);
  const perPage = 15;

  let filtered = flats.filter(f => f.status === 'Occupied');
  if (block !== 'All') filtered = filtered.filter(f => f.block === block);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(f => f.flatNumber.toLowerCase().includes(q) || f.ownerName.toLowerCase().includes(q));
  }
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <GuardLayout title="Resident Directory" breadcrumb="Home / Resident Directory">
      <div className="page-content">
        <div className="card">
          <div className="card-header">
            <h3>All Residents</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>{filtered.length} entries</span>
          </div>
          <div className="card-body">
            <div className="filter-bar">
              <div style={{ position: 'relative', flex: 1, maxWidth: 300 }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input type="text" placeholder="Search residents..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                  style={{ paddingLeft: 36, width: '100%' }} />
              </div>
              <select value={block} onChange={e => { setBlock(e.target.value); setPage(1); }}>
                <option value="All">All Blocks</option>
                {['A', 'B', 'C'].map(b => <option key={b} value={b}>Block {b}</option>)}
              </select>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead><tr><th>Flat</th><th>Type</th><th>Owner</th><th>Phone</th><th>Tenant</th></tr></thead>
                <tbody>
                  {paged.map(f => (
                    <tr key={f.id}>
                      <td style={{ fontWeight: 600 }}>{f.flatNumber}</td>
                      <td><span className="badge badge-primary">{f.type}</span></td>
                      <td>{f.ownerName}</td>
                      <td style={{ fontSize: '0.8rem' }}>{f.ownerPhone}</td>
                      <td style={{ fontSize: '0.8rem' }}>{f.tenantName || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={filtered.length} itemsPerPage={perPage} currentPage={page} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </GuardLayout>
  );
}
