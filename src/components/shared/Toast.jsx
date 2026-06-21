import { useApp } from '../../context/AppContext';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const icons = {
  success: <CheckCircle size={18} />,
  error: <XCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  info: <Info size={18} />,
};

const colors = {
  success: { bg: '#059669', border: '#047857' },
  error: { bg: '#DC2626', border: '#B91C1C' },
  warning: { bg: '#D97706', border: '#B45309' },
  info: { bg: '#0891B2', border: '#0E7490' },
};

export default function ToastContainer() {
  const { toasts } = useApp();
  if (!toasts.length) return null;

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {toasts.map(toast => {
        const c = colors[toast.type] || colors.success;
        return (
          <div key={toast.id} style={{
            background: c.bg, color: 'white', padding: '14px 20px',
            borderRadius: 10, boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            display: 'flex', alignItems: 'center', gap: 10,
            fontSize: '0.875rem', fontWeight: 500, minWidth: 280,
            animation: 'toastSlideIn 0.3s ease',
            borderLeft: `4px solid ${c.border}`,
          }}>
            {icons[toast.type] || icons.success}
            <span style={{ flex: 1 }}>{toast.message}</span>
          </div>
        );
      })}
      <style>{`@keyframes toastSlideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
    </div>
  );
}
