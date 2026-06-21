import { useState } from 'react';
import ResidentLayout from './ResidentLayout';
import { useApp } from '../../context/AppContext';
import { Bell, ChevronDown, ChevronUp } from 'lucide-react';

export default function SocietyNotices() {
  const { notices } = useApp();
  const [expandedId, setExpandedId] = useState(null);
  const categoryColors = { Meeting: 'primary', Maintenance: 'warning', Policy: 'info', Infrastructure: 'purple', Finance: 'success', Safety: 'danger', Amenities: 'gray' };

  return (
    <ResidentLayout title="Society Notices" breadcrumb="Home / Notices">
      <div className="page-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {notices.map((notice) => (
            <div key={notice.id} className="notice-card" onClick={() => setExpandedId(expandedId === notice.id ? null : notice.id)}>
              <div className="notice-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: notice.priority === 'high' ? 'var(--danger-light)' : notice.priority === 'medium' ? 'var(--warning-light)' : 'var(--gray-100)',
                  }}>
                    <Bell size={18} style={{ color: notice.priority === 'high' ? 'var(--danger)' : notice.priority === 'medium' ? 'var(--warning)' : 'var(--gray-500)' }} />
                  </div>
                  <div>
                    <div className="notice-title">{notice.title}</div>
                    <div className="notice-date">{notice.date} • {notice.author}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className={`badge badge-${categoryColors[notice.category] || 'gray'}`}>{notice.category}</span>
                  <span className={`badge badge-${notice.priority === 'high' ? 'danger' : notice.priority === 'medium' ? 'warning' : 'gray'}`}>{notice.priority}</span>
                  {expandedId === notice.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>
              {expandedId === notice.id && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--gray-100)' }}>
                  <p className="notice-content">{notice.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ResidentLayout>
  );
}
