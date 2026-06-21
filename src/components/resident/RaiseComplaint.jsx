import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResidentLayout from './ResidentLayout';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, Upload, CheckCircle } from 'lucide-react';

export default function RaiseComplaint() {
  const { addComplaint } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ category: '', priority: 'Medium', subject: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const categories = ['Plumbing', 'Electrical', 'Security', 'Parking', 'Common Area', 'Lift', 'Water Supply', 'Gardening', 'Housekeeping', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      addComplaint({
        flatNumber: 'A101',
        residentName: 'Rajesh Sharma',
        category: formData.category,
        priority: formData.priority,
        subject: formData.subject,
        description: formData.description,
      });
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 800);
  };

  if (showSuccess) {
    return (
      <ResidentLayout title="Complaint Submitted" breadcrumb="Home / Complaint Success">
        <div className="page-content" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="card" style={{ maxWidth: 500, textAlign: 'center', padding: 48 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle size={36} color="var(--success)" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>Complaint Submitted!</h2>
            <p style={{ color: 'var(--gray-500)', marginBottom: 24, fontSize: '0.9rem' }}>Your complaint has been registered. You'll receive updates as it progresses.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => navigate('/resident/complaints')}>View Complaint History</button>
              <button className="btn btn-outline" onClick={() => { setShowSuccess(false); setFormData({ category: '', priority: 'Medium', subject: '', description: '' }); }}>Raise Another</button>
            </div>
          </div>
        </div>
      </ResidentLayout>
    );
  }

  return (
    <ResidentLayout title="Raise Complaint" breadcrumb="Home / Raise Complaint">
      <div className="page-content">
        <div style={{ maxWidth: 700 }}>
          <div className="card">
            <div className="card-header">
              <h3><AlertTriangle size={20} style={{ display: 'inline', marginRight: 8, color: 'var(--warning)' }} />New Complaint</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group">
                    <label>Flat Number</label>
                    <input type="text" value="A101" disabled style={{ background: 'var(--gray-50)' }} />
                  </div>
                  <div className="form-group">
                    <label>Resident Name</label>
                    <input type="text" value="Rajesh Sharma" disabled style={{ background: 'var(--gray-50)' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group">
                    <label>Category *</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required>
                      <option value="">Select category</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Priority *</label>
                    <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                      {['Low', 'Medium', 'High', 'Critical'].map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <input type="text" placeholder="Brief description of the issue" value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Description *</label>
                  <textarea placeholder="Provide detailed description of the complaint..." value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})} rows={5} required />
                </div>
                <div className="form-group">
                  <label>Attach Photo (Optional)</label>
                  <div style={{ border: '2px dashed var(--gray-200)', borderRadius: 8, padding: 32, textAlign: 'center', cursor: 'pointer', color: 'var(--gray-400)' }}>
                    <Upload size={32} style={{ marginBottom: 8 }} />
                    <div style={{ fontSize: '0.875rem' }}>Click to upload or drag and drop</div>
                    <div style={{ fontSize: '0.75rem', marginTop: 4 }}>PNG, JPG up to 5MB</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : <><CheckCircle size={18} /> Submit Complaint</>}
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
