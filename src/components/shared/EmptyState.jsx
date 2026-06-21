import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, title = 'No data found', description = 'There are no records to display.', action }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center' }}>
      <div style={{
        width: 72, height: 72, borderRadius: 16, background: 'var(--gray-100)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
      }}>
        <Icon size={32} color="var(--gray-400)" />
      </div>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: 6 }}>{title}</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--gray-400)', maxWidth: 360 }}>{description}</p>
      {action && <div style={{ marginTop: 20 }}>{action}</div>}
    </div>
  );
}
