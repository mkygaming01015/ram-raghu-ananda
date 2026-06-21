import { useState } from 'react';
import GuardLayout from './GuardLayout';
import { useApp } from '../../context/AppContext';
import EmptyState from '../shared/EmptyState';
import { Search } from 'lucide-react';

export default function FlatSearch() {
  const { flats } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    setResults(flats.filter(f =>
      f.flatNumber.toLowerCase().includes(q) ||
      f.ownerName.toLowerCase().includes(q) ||
      f.block.toLowerCase() === q
    ).slice(0, 20));
  };

  return (
    <GuardLayout title="Flat Search" breadcrumb="Home / Flat Search">
      <div className="page-content">
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-body">
            <div style={{ display: 'flex', gap: 12, maxWidth: 500 }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input type="text" placeholder="Search by flat number, resident name, or block..." value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  style={{ paddingLeft: 42, width: '100%', padding: '12px 16px 12px 42px', border: '1.5px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }} />
              </div>
              <button className="btn btn-success" onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="card">
            <div className="card-header">
              <h3>Search Results</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>{results.length} results found</span>
            </div>
            <div className="card-body">
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead><tr><th>Flat</th><th>Block</th><th>Type</th><th>Owner</th><th>Phone</th><th>Tenant</th><th>Status</th></tr></thead>
                  <tbody>
                    {results.map(f => (
                      <tr key={f.id}>
                        <td style={{ fontWeight: 600 }}>{f.flatNumber}</td>
                        <td>{f.block}</td>
                        <td><span className="badge badge-primary">{f.type}</span></td>
                        <td>{f.ownerName}</td>
                        <td style={{ fontSize: '0.8rem' }}>{f.ownerPhone}</td>
                        <td style={{ fontSize: '0.8rem' }}>{f.tenantName || '—'}</td>
                        <td><span className={`badge badge-${f.status === 'Occupied' ? 'success' : 'gray'}`}>{f.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : query ? (
          <div className="card">
            <EmptyState icon={Search} title="No results found" description="Try searching with a different flat number or name" />
          </div>
        ) : null}
      </div>
    </GuardLayout>
  );
}
