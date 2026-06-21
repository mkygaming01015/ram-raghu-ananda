import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Settings, Mail, Lock, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login('admin', { name: 'Sunil Mehta', role: 'Society Secretary' });
    navigate('/admin/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-left" style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #7C3AED 50%, #8B5CF6 100%)' }}>
        <div className="society-icon"><Settings size={48} /></div>
        <h1>Ram Raghu Ananda</h1>
        <p>Phase 2 — Admin Dashboard</p>
        <p style={{ marginTop: 16, fontSize: '0.85rem', opacity: 0.7 }}>Complete society management, analytics, and oversight</p>
      </div>
      <div className="login-right">
        <div className="login-card">
          <h2>Admin Login</h2>
          <p className="subtitle">Sign in to admin dashboard</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input type="email" placeholder="admin@ramraghu.com" style={{ paddingLeft: 42 }} />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input type="password" placeholder="Enter password" style={{ paddingLeft: 42 }} />
              </div>
            </div>
            <button type="submit" className="btn btn-lg btn-block" style={{ background: '#7C3AED', color: 'white', marginTop: 8 }}>Sign In <ArrowRight size={18} /></button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.85rem', color: 'var(--gray-500)' }}>Demo: Click Sign In directly</p>
          <div style={{ textAlign: 'center', marginTop: 16 }}><Link to="/" style={{ color: 'var(--gray-400)', fontSize: '0.85rem' }}>← Back to Portal Selection</Link></div>
        </div>
      </div>
    </div>
  );
}
