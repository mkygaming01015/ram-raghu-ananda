import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResidentLayout from './ResidentLayout';
import { useApp } from '../../context/AppContext';
import { UserPlus, QrCode, CheckCircle } from 'lucide-react';

export default function VisitorPass() {
  const navigate = useNavigate();
  const { generateVisitorPass } = useApp();
  const [formData, setFormData] = useState({ name: '', phone: '', purpose: '', expectedTime: '', vehicleNumber: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const purposes = ['Personal Visit', 'Plumbing Work', 'Electrical Work', 'Cleaning', 'Pest Control', 'Courier', 'Interview', 'Delivery'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      generateVisitorPass({
        visitorName: formData.name,
        name: formData.name,
        phone: formData.phone,
        purpose: formData.purpose,
        flat: 'A101',
        resident: 'Rajesh Sharma',
        expectedTime: formData.expectedTime,
        vehicleNumber: formData.vehicleNumber,
      });
      setIsSubmitting(false);
      navigate('/resident/qr-guest-pass');
    }, 600);
  };

  return (
    <ResidentLayout title="Visitor Pass Generation" breadcrumb="Home / Visitor Pass">
      <div className="page-content">
        <div style={{ maxWidth: 600 }}>
          <div className="card">
            <div className="card-header">
              <h3><UserPlus size={20} style={{ display: 'inline', marginRight: 8, color: 'var(--primary)' }} />Generate Visitor Pass</h3>
            </div>
            <div className="card-body">
              <div style={{
                background: 'var(--primary-50)', borderRadius: 8, padding: 16, marginBottom: 24,
                display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.85rem', color: 'var(--primary-dark)',
              }}>
                <QrCode size={20} />
                A QR code will be generated for quick entry at the security gate.
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Visitor Name *</label>
                  <input type="text" placeholder="Enter visitor's full name" required
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" placeholder="Mobile number" required
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Purpose of Visit *</label>
                    <select value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} required>
                      <option value="">Select purpose</option>
                      {purposes.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group">
                    <label>Expected Time</label>
                    <input type="time" value={formData.expectedTime}
                      onChange={e => setFormData({...formData, expectedTime: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Vehicle Number</label>
                    <input type="text" placeholder="e.g. MH02AB1234"
                      value={formData.vehicleNumber} onChange={e => setFormData({...formData, vehicleNumber: e.target.value})} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
                  <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Generating...' : <><CheckCircle size={18} /> Generate Pass</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ResidentLayout>
  );
}
