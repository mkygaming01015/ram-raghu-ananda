import { useNavigate } from 'react-router-dom';
import ResidentLayout from './ResidentLayout';
import { useApp } from '../../context/AppContext';
import { Download, Share2, AlertCircle } from 'lucide-react';
import { shareContent } from '../../utils/capacitor';

export default function QRGuestPass() {
  const navigate = useNavigate();
  const { visitorPasses, addToast } = useApp();
  const latestPass = visitorPasses[0];

  if (!latestPass) {
    return (
      <ResidentLayout title="QR Guest Pass" breadcrumb="Home / QR Guest Pass">
        <div className="page-content" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="card" style={{ maxWidth: 450, textAlign: 'center', padding: 60 }}>
            <AlertCircle size={48} color="var(--gray-300)" style={{ marginBottom: 16 }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: 8 }}>No Pass Generated</h3>
            <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginBottom: 24 }}>Generate a visitor pass first to see the QR code.</p>
            <button className="btn btn-primary" onClick={() => navigate('/resident/visitor-pass')}>Generate Visitor Pass</button>
          </div>
        </div>
      </ResidentLayout>
    );
  }

  const passData = latestPass;
  const hash = passData.passId.split('').reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0);
  const abs = Math.abs(hash);

  return (
    <ResidentLayout title="QR Guest Pass" breadcrumb="Home / QR Guest Pass">
      <div className="page-content" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="qr-container">
          <div style={{ marginBottom: 8, fontSize: '0.75rem', color: 'var(--gray-400)', fontWeight: 600, letterSpacing: '0.05em' }}>
            RAM RAGHU ANANDA PHASE 2
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>GUEST PASS</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 24 }}>Show this QR code at the security gate</p>

          <div className="qr-code-box">
            <svg viewBox="0 0 200 200" width="160" height="160">
              <rect width="200" height="200" fill="white"/>
              <rect x="10" y="10" width="50" height="50" rx="4" fill="#1F2937"/>
              <rect x="16" y="16" width="38" height="38" rx="2" fill="white"/>
              <rect x="22" y="22" width="26" height="26" rx="2" fill="#1F2937"/>
              <rect x="140" y="10" width="50" height="50" rx="4" fill="#1F2937"/>
              <rect x="146" y="16" width="38" height="38" rx="2" fill="white"/>
              <rect x="152" y="22" width="26" height="26" rx="2" fill="#1F2937"/>
              <rect x="10" y="140" width="50" height="50" rx="4" fill="#1F2937"/>
              <rect x="16" y="146" width="38" height="38" rx="2" fill="white"/>
              <rect x="22" y="152" width="26" height="26" rx="2" fill="#1F2937"/>
              {Array.from({ length: 15 }, (_, i) => {
                const x = 70 + (i % 5) * 14;
                const y = 70 + Math.floor(i / 5) * 14;
                const show = ((abs >> i) & 1) || ((abs + i * 7) % 3 === 0);
                return show ? <rect key={`c${i}`} x={x} y={y} width="10" height="10" fill="#1F2937" rx="1"/> : null;
              })}
              {Array.from({ length: 20 }, (_, i) => {
                const show = ((abs * 3 + i * 11) % 4 !== 0);
                return show ? <rect key={`t${i}`} x={70 + (i % 5) * 14} y={10 + Math.floor(i / 5) * 10} width="10" height="8" fill="#1F2937" rx="1"/> : null;
              })}
              {Array.from({ length: 20 }, (_, i) => {
                const show = ((abs * 7 + i * 13) % 4 !== 0);
                return show ? <rect key={`b${i}`} x={70 + (i % 5) * 14} y={140 + Math.floor(i / 5) * 10} width="10" height="8" fill="#1F2937" rx="1"/> : null;
              })}
              {Array.from({ length: 14 }, (_, i) => {
                const show = ((abs * 5 + i * 9) % 3 !== 0);
                return show ? <rect key={`l${i}`} x={10 + Math.floor(i / 5) * 10} y={70 + (i % 5) * 14} width="8" height="10" fill="#1F2937" rx="1"/> : null;
              })}
              {Array.from({ length: 14 }, (_, i) => {
                const show = ((abs * 11 + i * 3) % 3 !== 0);
                return show ? <rect key={`r${i}`} x={140 + Math.floor(i / 5) * 10} y={70 + (i % 5) * 14} width="8" height="10" fill="#1F2937" rx="1"/> : null;
              })}
              <text x="100" y="104" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#2563EB">RA</text>
            </svg>
          </div>

          <div style={{
            background: 'var(--primary-50)', borderRadius: 8, padding: '8px 16px',
            marginBottom: 20, fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600,
          }}>
            Pass ID: {passData.passId}
          </div>

          <div className="qr-details">
            {[
              ['Visitor', passData.visitorName || passData.name],
              ['Phone', passData.phone],
              ['Purpose', passData.purpose],
              ['Flat', `${passData.flat} (${passData.resident})`],
              ['Date', passData.date],
              ['Valid From', passData.validFrom],
              ['Valid Until', passData.validUntil],
              ['Status', passData.status],
            ].map(([label, value]) => (
              <div className="detail-row" key={label}>
                <span className="detail-label">{label}</span>
                <span className="detail-value">{value}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24, width: '100%' }}>
            <button className="btn btn-outline btn-block" style={{ flex: 1 }} onClick={() => addToast('Pass downloaded!')}>
              <Download size={16} /> Download
            </button>
            <button className="btn btn-primary btn-block" style={{ flex: 1 }} onClick={() => shareContent('Visitor Pass', `Pass ID: ${passData.passId} | Visitor: ${passData.visitorName || passData.name} | Flat: ${passData.flat}`, window.location.href)}>
              <Share2 size={16} /> Share Pass
            </button>
          </div>
        </div>
      </div>
    </ResidentLayout>
  );
}
