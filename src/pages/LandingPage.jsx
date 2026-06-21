import { Link } from 'react-router-dom';
import { Building2, Shield, Settings } from 'lucide-react';

export default function LandingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a5f 0%, #2563EB 50%, #3B82F6 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{
          width: 90, height: 90, borderRadius: 20, background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', border: '2px solid rgba(255,255,255,0.2)',
        }}>
          <Building2 size={44} color="white" />
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: 8 }}>
          Ram Raghu Ananda
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500, letterSpacing: '0.05em' }}>
          PHASE 2 — Society Management System
        </p>
        <div style={{
          marginTop: 16, display: 'flex', gap: 32, justifyContent: 'center',
          color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem',
        }}>
          <span>480 Flats</span>
          <span>•</span>
          <span>1320+ Residents</span>
          <span>•</span>
          <span>24/7 Security</span>
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24, maxWidth: 1000, width: '100%',
      }}>
        {[
          {
            icon: <Building2 size={32} />,
            title: 'Resident Portal',
            desc: 'Manage your flat, raise complaints, generate visitor passes, and stay updated with society notices.',
            color: '#3B82F6',
            bgGrad: 'linear-gradient(135deg, #3B82F6, #2563EB)',
            link: '/resident/login',
          },
          {
            icon: <Shield size={32} />,
            title: 'Guard Portal',
            desc: 'Track visitor entries, manage deliveries, scan QR passes, and handle security operations.',
            color: '#10B981',
            bgGrad: 'linear-gradient(135deg, #10B981, #059669)',
            link: '/guard/login',
          },
          {
            icon: <Settings size={32} />,
            title: 'Admin Dashboard',
            desc: 'Complete society management with analytics, reports, maintenance tracking, and resident oversight.',
            color: '#8B5CF6',
            bgGrad: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
            link: '/admin/login',
          },
        ].map((portal) => (
          <Link key={portal.title} to={portal.link} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 16, padding: '40px 32px',
              cursor: 'pointer', transition: 'all 0.3s ease',
              textAlign: 'center',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                background: portal.bgGrad, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px', color: 'white',
                boxShadow: `0 8px 24px ${portal.color}40`,
              }}>
                {portal.icon}
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>
                {portal.title}
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 24 }}>
                {portal.desc}
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 24px', borderRadius: 8,
                background: 'rgba(255,255,255,0.2)', color: 'white',
                fontSize: '0.875rem', fontWeight: 600,
              }}>
                Enter Portal →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p style={{
        marginTop: 48, color: 'rgba(255,255,255,0.4)',
        fontSize: '0.75rem',
      }}>
        © 2026 Ram Raghu Ananda Phase 2. Society Management System v2.0
      </p>
    </div>
  );
}
