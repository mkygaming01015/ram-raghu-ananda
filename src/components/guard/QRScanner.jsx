import { useState } from 'react';
import GuardLayout from './GuardLayout';
import { useApp } from '../../context/AppContext';
import { QrCode, Camera, Search, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function QRScanner() {
  const { scanQR, addToast } = useApp();
  const [manualCode, setManualCode] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [resultType, setResultType] = useState(null);

  const simulateScan = () => {
    setScanning(true);
    setScanResult(null);
    setTimeout(() => {
      const code = manualCode.trim() || 'VMP-1001';
      const result = scanQR(code);
      setScanResult(result.pass || { passId: code, visitorName: 'Demo Visitor', phone: '9876543210', flat: 'A101', resident: 'Rajesh Sharma', purpose: 'Personal Visit' });
      setResultType(result.status);
      setScanning(false);
      if (result.status === 'Approved') addToast('Visitor approved and entry recorded!', 'success');
      else if (result.status === 'Not Found') addToast('QR code not found in system', 'error');
      else addToast(`QR Status: ${result.status}`, 'warning');
    }, 2000);
  };

  const recentScans = [
    { code: 'VMP-1001', visitor: 'Amit Kumar', flat: 'A101', time: '10:15 AM', status: 'Approved' },
    { code: 'VMP-1002', visitor: 'Suresh Singh', flat: 'B302', time: '09:45 AM', status: 'Approved' },
    { code: 'VMP-1003', visitor: 'Priya Verma', flat: 'C104', time: '09:20 AM', status: 'Expired' },
    { code: 'VMP-1004', visitor: 'Unknown', flat: '—', time: '08:55 AM', status: 'Not Found' },
  ];

  const statusConfig = {
    'Approved': { color: 'success', icon: <CheckCircle size={40} />, bg: 'var(--success-light)', text: 'APPROVED — Entry Allowed' },
    'Already Used': { color: 'warning', icon: <AlertTriangle size={40} />, bg: 'var(--warning-light)', text: 'ALREADY USED — Pass Previously Scanned' },
    'Expired': { color: 'danger', icon: <XCircle size={40} />, bg: 'var(--danger-light)', text: 'EXPIRED — Pass No Longer Valid' },
    'Not Found': { color: 'danger', icon: <XCircle size={40} />, bg: 'var(--danger-light)', text: 'NOT FOUND — Invalid QR Code' },
  };

  return (
    <GuardLayout title="QR Scanner" breadcrumb="Home / QR Scanner">
      <div className="page-content">
        <div className="grid-2">
          <div className="card">
            <div className="card-header"><h3><Camera size={20} style={{ display: 'inline', marginRight: 8 }} />Scan QR Code</h3></div>
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div className="scanner-overlay">
                <QrCode size={32} style={{ opacity: 0.6 }} />
                <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: 8 }}>Position QR code within the frame</p>
                <div className="scanner-frame">
                  {scanning ? (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: 40, height: 40, border: '3px solid white', borderTop: '3px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
                      <p style={{ fontSize: '0.75rem', marginTop: 12 }}>Scanning...</p>
                    </div>
                  ) : (
                    <QrCode size={48} style={{ opacity: 0.3 }} />
                  )}
                </div>
                <button className="btn btn-primary" onClick={simulateScan} disabled={scanning} style={{ marginTop: 16 }}>
                  {scanning ? 'Scanning...' : 'Simulate Scan'}
                </button>
              </div>

              <div style={{ marginTop: 24, display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
                <input type="text" placeholder="Enter pass code manually..." value={manualCode}
                  onChange={e => setManualCode(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && simulateScan()}
                  style={{ padding: '10px 16px', border: '1.5px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', width: 250 }} />
                <button className="btn btn-outline btn-sm" onClick={simulateScan} disabled={scanning}>
                  <Search size={16} /> Lookup
                </button>
              </div>
            </div>
          </div>

          <div>
            {scanResult && resultType && (
              <div className="card" style={{ marginBottom: 20 }}>
                <div style={{
                  padding: 24, background: statusConfig[resultType]?.bg || 'var(--gray-100)',
                  display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid var(--gray-100)',
                }}>
                  <div style={{ color: `var(--${statusConfig[resultType]?.color || 'gray'})` }}>
                    {statusConfig[resultType]?.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--gray-900)' }}>{statusConfig[resultType]?.text}</div>
                    <span className={`badge badge-${statusConfig[resultType]?.color || 'gray'}`}>{resultType}</span>
                  </div>
                </div>
                <div className="card-body">
                  {Object.entries({
                    'Pass ID': scanResult.passId,
                    'Visitor': scanResult.visitorName || scanResult.name,
                    'Phone': scanResult.phone || '—',
                    'Flat': scanResult.flat,
                    'Resident': scanResult.resident || '—',
                    'Purpose': scanResult.purpose,
                  }).map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--gray-100)', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--gray-500)' }}>{k}</span>
                      <span style={{ fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                  {resultType === 'Not Found' && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                      <button className="btn btn-success btn-block" onClick={() => addToast('Manual entry recorded')}>Manual Entry</button>
                      <button className="btn btn-danger btn-block" onClick={() => addToast('Visitor denied', 'error')}>Deny Entry</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="card">
              <div className="card-header"><h3>Recent Scans</h3></div>
              <div className="card-body">
                {recentScans.map((scan, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{scan.visitor}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{scan.code} • {scan.time}</div>
                    </div>
                    <span className={`badge badge-${scan.status === 'Approved' ? 'success' : scan.status === 'Expired' ? 'warning' : 'danger'}`}>{scan.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </GuardLayout>
  );
}
