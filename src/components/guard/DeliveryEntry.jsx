import { useState } from 'react';
import GuardLayout from './GuardLayout';
import { useApp } from '../../context/AppContext';
import { Package, CheckCircle } from 'lucide-react';

export default function DeliveryEntry() {
  const { addDeliveryEntry, flats } = useApp();
  const [formData, setFormData] = useState({ courier: '', company: '', flat: '', items: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const companies = ['BlueDart', 'DTDC', 'FedEx', 'Swiggy', 'Zomato', 'Amazon', 'Flipkart', 'Delhivery', 'Professional Courier', 'India Post', 'Dunzo'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const flat = flats.find(f => f.flatNumber === formData.flat);
    setTimeout(() => {
      addDeliveryEntry({
        name: formData.courier,
        phone: '—',
        purpose: 'Delivery',
        flatNumber: formData.flat,
        residentName: flat?.ownerName || 'Unknown',
        company: formData.company,
        items: formData.items,
        notes: formData.notes,
        vehicleNumber: '',
        type: 'Delivery',
      });
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 600);
  };

  if (showSuccess) {
    return (
      <GuardLayout title="Delivery Entry" breadcrumb="Home / Delivery Entry">
        <div className="page-content" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="card" style={{ maxWidth: 450, textAlign: 'center', padding: 48 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle size={36} color="var(--success)" />
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 8 }}>Delivery Recorded!</h2>
            <p style={{ color: 'var(--gray-500)', marginBottom: 24, fontSize: '0.9rem' }}>Delivery entry has been logged successfully.</p>
            <button className="btn btn-primary" onClick={() => { setShowSuccess(false); setFormData({ courier: '', company: '', flat: '', items: '', notes: '' }); }}>Log Another</button>
          </div>
        </div>
      </GuardLayout>
    );
  }

  return (
    <GuardLayout title="Delivery Entry" breadcrumb="Home / Delivery Entry">
      <div className="page-content">
        <div style={{ maxWidth: 650 }}>
          <div className="card">
            <div className="card-header">
              <h3><Package size={20} style={{ display: 'inline', marginRight: 8, color: 'var(--info)' }} />Log Delivery Entry</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group">
                    <label>Courier Person Name *</label>
                    <input type="text" placeholder="Name" required value={formData.courier}
                      onChange={e => setFormData({...formData, courier: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Company *</label>
                    <select required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}>
                      <option value="">Select company</option>
                      {companies.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
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
                    <label>Number of Items *</label>
                    <input type="number" placeholder="Items count" min="1" required value={formData.items}
                      onChange={e => setFormData({...formData, items: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Additional Notes</label>
                  <textarea placeholder="Any special instructions..." rows={3} value={formData.notes}
                    onChange={e => setFormData({...formData, notes: e.target.value})} />
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setFormData({ courier: '', company: '', flat: '', items: '', notes: '' })}>Clear</button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Recording...' : <><CheckCircle size={18} /> Record Delivery</>}
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
