import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { BarChart3, Download } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

export default function ReportsAnalytics() {
  const { complaints, monthlyMaintenance, stats, flats, visitors, defaulterList, guards, addToast } = useApp();

  const complaintTrend = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'New', data: [18, 22, 15, 20, 25, complaints.length], borderColor: '#EF4444', backgroundColor: '#EF444420', tension: 0.4, fill: true, pointRadius: 4 },
      { label: 'Resolved', data: [15, 20, 18, 19, 22, complaints.filter(c => c.status === 'Resolved').length], borderColor: '#10B981', backgroundColor: '#10B98120', tension: 0.4, fill: true, pointRadius: 4 },
    ],
  };

  const blockOccupancy = {
    labels: ['A', 'B', 'C'],
    datasets: [
      { label: 'Occupied', data: [flats.filter(f => f.block === 'A' && f.status === 'Occupied').length, flats.filter(f => f.block === 'B' && f.status === 'Occupied').length, flats.filter(f => f.block === 'C' && f.status === 'Occupied').length], backgroundColor: '#3B82F6', borderRadius: 4 },
      { label: 'Vacant', data: [flats.filter(f => f.block === 'A' && f.status === 'Vacant').length, flats.filter(f => f.block === 'B' && f.status === 'Vacant').length, flats.filter(f => f.block === 'C' && f.status === 'Vacant').length], backgroundColor: '#E5E7EB', borderRadius: 4 },
    ],
  };

  const maintenanceTrend = {
    labels: monthlyMaintenance.map(m => m.month),
    datasets: [{ label: 'Collection %', data: monthlyMaintenance.map(m => Math.round((m.collected / m.target) * 100)), borderColor: '#8B5CF6', backgroundColor: '#8B5CF620', fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#8B5CF6' }],
  };

  const categoryPie = {
    labels: ['Plumbing', 'Electrical', 'Security', 'Parking', 'Common Area', 'Lift', 'Other'],
    datasets: [{ data: [8, 6, 4, 3, 5, 2, 5], backgroundColor: ['#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#06B6D4', '#6B7280'] }],
  };

  return (
    <AdminLayout title="Reports & Analytics" breadcrumb="Home / Reports & Analytics">
      <div className="page-content">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20, gap: 8 }}>
          <button className="btn btn-outline btn-sm" onClick={() => addToast('PDF report downloaded!')}><Download size={14} /> Export PDF</button>
          <button className="btn btn-primary btn-sm" onClick={() => addToast('Excel report downloaded!')}><Download size={14} /> Export Excel</button>
        </div>

        <div className="stats-grid" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-card-header"><div className="stat-card-icon" style={{ background: 'var(--primary-100)', color: 'var(--primary)' }}><BarChart3 size={24} /></div></div>
            <div className="stat-card-value">{flats.length}</div>
            <div className="stat-card-label">Total Flats</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header"><div className="stat-card-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}><BarChart3 size={24} /></div></div>
            <div className="stat-card-value">{Math.round((flats.filter(f => f.status === 'Occupied').length / flats.length) * 100)}%</div>
            <div className="stat-card-label">Occupancy Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header"><div className="stat-card-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}><BarChart3 size={24} /></div></div>
            <div className="stat-card-value">{complaints.length}</div>
            <div className="stat-card-label">Total Complaints</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header"><div className="stat-card-icon" style={{ background: 'var(--purple-light)', color: 'var(--purple)' }}><BarChart3 size={24} /></div></div>
            <div className="stat-card-value">{visitors.length}</div>
            <div className="stat-card-label">Visitors Today</div>
          </div>
        </div>

        <div className="grid-2" style={{ marginBottom: 20 }}>
          <div className="card">
            <div className="card-header"><h3>Complaint Trend (2026)</h3></div>
            <div className="card-body">
              <div className="chart-container" style={{ height: 260 }}>
                <Line data={complaintTrend} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { usePointStyle: true } } }, scales: { y: { beginAtZero: true, grid: { color: '#f3f4f6' } }, x: { grid: { display: false } } } }} />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><h3>Block-wise Occupancy</h3></div>
            <div className="card-body">
              <div className="chart-container" style={{ height: 260 }}>
                <Bar data={blockOccupancy} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { usePointStyle: true } } }, scales: { y: { beginAtZero: true, stacked: true, grid: { color: '#f3f4f6' } }, x: { stacked: true, grid: { display: false } } } }} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid-2" style={{ marginBottom: 20 }}>
          <div className="card">
            <div className="card-header"><h3>Monthly Collection Rate (%)</h3></div>
            <div className="card-body">
              <div className="chart-container" style={{ height: 260 }}>
                <Line data={maintenanceTrend} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false, min: 70, max: 100, grid: { color: '#f3f4f6' } }, x: { grid: { display: false } } } }} />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><h3>Complaint Categories</h3></div>
            <div className="card-body">
              <div className="chart-container" style={{ height: 260 }}>
                <Doughnut data={categoryPie} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { padding: 12, usePointStyle: true, font: { size: 11 } } } }, cutout: '60%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>Summary Statistics</h3></div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              {[
                ['Total Flats', `${flats.length}`, 'var(--primary)'],
                ['Occupied', `${flats.filter(f => f.status === 'Occupied').length} (${Math.round((flats.filter(f => f.status === 'Occupied').length / flats.length) * 100)}%)`, 'var(--success)'],
                ['Active Residents', '1,320', 'var(--info)'],
                ['Open Complaints', `${complaints.filter(c => c.status === 'Open' || c.status === 'In Progress').length}`, 'var(--warning)'],
                ['Resolved This Month', `${complaints.filter(c => c.status === 'Resolved').length}`, 'var(--success)'],
                ['Collection Rate', `${stats.collectionRate}%`, 'var(--primary)'],
                ['Total Revenue', `₹${(stats.totalRevenue / 100000).toFixed(1)}L`, 'var(--purple)'],
                ['Collected', `₹${(stats.collectedAmount / 100000).toFixed(1)}L`, 'var(--success)'],
                ['Pending', `₹${(stats.pendingAmount / 100000).toFixed(1)}L`, 'var(--danger)'],
                ['Total Guards', `${guards.length}`, 'var(--gray-600)'],
                ['Visitors Today', `${visitors.length}`, 'var(--info)'],
                ['Defaulters', `${defaulterList.length}`, 'var(--danger)'],
              ].map(([label, value, color]) => (
                <div key={label} style={{ padding: 16, borderRadius: 8, border: '1px solid var(--gray-100)', background: `${color}05` }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
