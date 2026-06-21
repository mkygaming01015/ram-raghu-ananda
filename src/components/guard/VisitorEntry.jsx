import { useState } from 'react';
import GuardLayout from './GuardLayout';
import { useApp } from '../../context/AppContext';
import { UserPlus, CheckCircle } from 'lucide-react';

export default function VisitorEntry() {
  const { addVisitorEntry, flats } = useApp();
  const [formData, setFormData] = useState({ name: '', phone: '', purpose: '', flat: '', vehicle: '', idProof: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const purposes = ['Personal Visit', 'Delivery', 'Maintenance', 'Interview', 'Plumbing Work', 'Electrical Work', 'Cleaning', 'Pest Control'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const flat = flats.find(f => f.flatNumber === formData.flat);
    setTimeout(() => {
      addVisitorEntry({
        name: formData.name,
        phone: formData.phone,
        purpose: formData.purpose,
        flatNumber: formData.flat,
        residentName: flat?.ownerName || 'Unknown',
        vehicleNumber: formData.vehicle,
        type: 'Guest',
        idProof: formData.idProof,
      });
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 600);
  };

  if (showSuccess) {
    return (
      <GuardLayout title="Visitor Entry" breadcrumb="Home / Visitor Entry">
        <div className="page-content" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="card" style={{ maxWidth: 450, textAlign: 'center', padding: 48 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle size={36} color="var(--success)" />
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 8 }}>Entry Recorded!</h2>
            <p style={{ color: 'var(--gray-500)', marginBottom: 24, fontSize: '0.9rem' }}>Visitor entry has been logged successfully.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => { setShowSuccess(false); setFormData({ name: '', phone: '', purpose: '', flat: '', vehicle: '', idProof: '' }); }}>Log Another</button>
            </div>
          </div>
        </div>
      </GuardLayout>
    );
  }

  return (
    <GuardLayout title="Visitor Entry" breadcrumb="Home / Visitor Entry">
      <div className="page-content">
        <div style={{ maxWidth: 650 }}>
          <div className="card">
            <div className="card-header">
              <h3><UserPlus size={20} style={{ display: 'inline', marginRight: 8, color: 'var(--success)' }} />Log Visitor Entry</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group">
                    <label>Visitor Name *</label>
                    <input type="text" placeholder="Full name" required value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" placeholder="Mobile number" required value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group">
                    <label>Flat Number *</label>
                    <select required value={formData.flat} onChange={e => setFormData({...formData, flat: e.target.value})}>
                      <option value="">Select flat</option>
                      {flats.filter(f => f.status === 'Occupied').slice(0, 50).map(f => (
                        <option key={f.id} value={f.flatNumber}>{f.flatNumber} - {f.ownerName}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Purpose *</label>
                    <select required value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})}>
                      <option value="">Select purpose</option>
                      {purposes.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group">
                    <label>Vehicle Number</label>
                    <input type="text" placeholder="e.g. MH02AB1234" value={formData.vehicle}
                      onChange={e => setFormData({...formData, vehicle: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>ID Proof</label>
                    <select value={formData.idProof} onChange={e => setFormData({...formData, idProof: e.target.value})}>
                      <option value="">Select ID</option>
                      <option value="Aadhaar">Aadhaar Card</option>
                      <option value="PAN">PAN Card</option>
                      <option value="Driving License">Driving License</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
                  <button type="button" className="btn btn-outline" onClick={() => setFormData({ name: '', phone: '', purpose: '', flat: '', vehicle: '', idProof: '' })}>Clear</button>
                  <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                    {isSubmitting ? 'Recording...' : <><CheckCircle size={18} /> Record Entry</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </GuardLayout>
  );
}
