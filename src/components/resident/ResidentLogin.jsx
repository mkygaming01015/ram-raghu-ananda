import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Building2, Mail, Lock, ArrowRight } from 'lucide-react';

export default function ResidentLogin() {
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login('resident', { name: 'Rajesh Sharma', role: 'Flat A101 • Owner' });
    navigate('/resident/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-left" style={{ background: 'linear-gradient(135deg, #1e40af 0%, #2563EB 50%, #3B82F6 100%)' }}>
        <div className="society-icon"><Building2 size={48} /></div>
        <h1>Ram Raghu Ananda</h1>
        <p>Phase 2 — Resident Portal</p>
        <p style={{ marginTop: 16, fontSize: '0.85rem', opacity: 0.7 }}>Manage your home, raise complaints, track visitors and more</p>
      </div>
      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to your resident account</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input type="email" placeholder="resident@example.com" style={{ paddingLeft: 42 }} />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input type="password" placeholder="Enter your password" style={{ paddingLeft: 42 }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--gray-600)', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: 'var(--primary)' }} /> Remember me
              </label>
              <a href="#" style={{ color: 'var(--primary)', fontWeight: 500 }}>Forgot Password?</a>
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">Sign In <ArrowRight size={18} /></button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.85rem', color: 'var(--gray-500)' }}>Demo: Click Sign In directly</p>
          <div style={{ textAlign: 'center', marginTop: 16 }}><Link to="/" style={{ color: 'var(--gray-400)', fontSize: '0.85rem' }}>← Back to Portal Selection</Link></div>
        </div>
      </div>
    </div>
  );
}
