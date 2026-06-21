import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Shield, User, Lock, ArrowRight } from 'lucide-react';

export default function GuardLogin() {
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login('guard', { name: 'Raj Kumar Yadav', role: 'Main Gate • On Duty' });
    navigate('/guard/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-left" style={{ background: 'linear-gradient(135deg, #065f46 0%, #059669 50%, #10B981 100%)' }}>
        <div className="society-icon"><Shield size={48} /></div>
        <h1>Ram Raghu Ananda</h1>
        <p>Phase 2 — Guard Portal</p>
        <p style={{ marginTop: 16, fontSize: '0.85rem', opacity: 0.7 }}>Security operations, visitor management and access control</p>
      </div>
      <div className="login-right">
        <div className="login-card">
          <h2>Guard Login</h2>
          <p className="subtitle">Sign in to access guard operations</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Guard ID</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input type="text" placeholder="Enter Guard ID" style={{ paddingLeft: 42 }} />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input type="password" placeholder="Enter password" style={{ paddingLeft: 42 }} />
              </div>
            </div>
            <button type="submit" className="btn btn-success btn-block btn-lg" style={{ marginTop: 8 }}>Sign In <ArrowRight size={18} /></button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.85rem', color: 'var(--gray-500)' }}>Demo: Click Sign In directly</p>
          <div style={{ textAlign: 'center', marginTop: 16 }}><Link to="/" style={{ color: 'var(--gray-400)', fontSize: '0.85rem' }}>← Back to Portal Selection</Link></div>
        </div>
      </div>
    </div>
  );
}
