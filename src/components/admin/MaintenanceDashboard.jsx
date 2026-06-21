import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Wrench, TrendingUp } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function MaintenanceDashboard() {
  const { stats, monthlyMaintenance } = useApp();

  const collectionDonut = {
    labels: ['Collected', 'Pending'],
    datasets: [{ data: [stats.collectedAmount, stats.pendingAmount], backgroundColor: ['#3B82F6', '#E5E7EB'], borderWidth: 0 }],
  };

  const wingData = {
    labels: ['Block A', 'Block B', 'Block C'],
    datasets: [{ label: 'Collection %', data: [89, 86, 87], backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'], borderRadius: 6 }],
  };

  return (
    <AdminLayout title="Maintenance Dashboard" breadcrumb="Home / Maintenance Dashboard">
      <div className="page-content">
        <div className="stats-grid" style={{ marginBottom: 28 }}>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--primary-100)', color: 'var(--primary)' }}><Wrench size={24} /></div>
            </div>
            <div className="stat-card-value">₹{(stats.totalRevenue / 100000).toFixed(1)}L</div>
            <div className="stat-card-label">Total Revenue (Monthly)</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}><TrendingUp size={24} /></div>
            </div>
            <div className="stat-card-value">₹{(stats.collectedAmount / 100000).toFixed(1)}L</div>
            <div className="stat-card-label">Collected</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}><Wrench size={24} /></div>
            </div>
            <div className="stat-card-value">₹{(stats.pendingAmount / 100000).toFixed(1)}L</div>
            <div className="stat-card-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'var(--purple-light)', color: 'var(--purple)' }}><TrendingUp size={24} /></div>
            </div>
            <div className="stat-card-value">{stats.collectionRate}%</div>
            <div className="stat-card-label">Collection Rate</div>
          </div>
        </div>

        <div className="grid-2" style={{ marginBottom: 20 }}>
          <div className="card">
            <div className="card-header"><h3>Collection Overview</h3></div>
            <div className="card-body">
              <div className="chart-container" style={{ height: 280 }}>
                <Doughnut data={collectionDonut} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true } } }, cutout: '70%' }} />
              </div>
              <div style={{ textAlign: 'center', marginTop: -180, marginBottom: 100 }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{stats.collectionRate}%</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>Collected</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><h3>Block-wise Collection Rate (%)</h3></div>
            <div className="card-body">
              <div className="chart-container" style={{ height: 280 }}>
                <Bar data={wingData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100, grid: { color: '#f3f4f6' } }, x: { grid: { display: false } } } }} />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>Monthly Breakdown</h3></div>
          <div className="card-body">
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead><tr><th>Month</th><th>Target</th><th>Collected</th><th>Collection %</th><th>Defaulters</th></tr></thead>
                <tbody>
                  {monthlyMaintenance.map((m, i) => {
                    const pct = Math.round((m.collected / m.target) * 100);
                    return (
                      <tr key={i}>
                        <td style={{ fontWeight: 500 }}>{m.month} 2026</td>
                        <td>₹{(m.target / 100000).toFixed(1)}L</td>
                        <td style={{ fontWeight: 600 }}>₹{(m.collected / 100000).toFixed(1)}L</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div className="maintenance-progress" style={{ width: 80, height: 6 }}>
                              <div className="maintenance-progress-fill" style={{ width: `${pct}%`, background: pct >= 90 ? 'var(--success)' : pct >= 80 ? 'var(--warning)' : 'var(--danger)' }} />
                            </div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{pct}%</span>
                          </div>
                        </td>
                        <td style={{ color: 'var(--danger)', fontWeight: 500 }}>{m.defaulters}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
