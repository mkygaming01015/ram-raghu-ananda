import { NavLink, useNavigate } from 'react-router-dom';
import { Building2, X, LogOut } from 'lucide-react';

export default function Sidebar({ sections, portalName, portalColor, user, onClose }) {
  const navigate = useNavigate();
  const handleLogout = () => navigate('/');

  return (
    <>
      <div className={`sidebar-overlay ${onClose ? 'open' : ''}`} onClick={onClose} />
      <aside className="sidebar" style={onClose ? { position: 'fixed' } : {}}>
        <button className="sidebar-close-btn" onClick={onClose}><X size={20} /></button>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon" style={{ background: `${portalColor}15`, color: portalColor }}>
              <Building2 size={22} />
            </div>
            <div>
              <h3>{portalName}</h3>
              <span>Ram Raghu Ananda P2</span>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {sections.map((section) => (
            <div key={section.title} className="nav-section">
              {section.title && <div className="nav-section-title">{section.title}</div>}
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  end={item.exact}
                  onClick={onClose}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      marginLeft: 'auto', background: 'var(--danger)', color: 'white',
                      fontSize: '0.65rem', padding: '2px 6px', borderRadius: 10, fontWeight: 700,
                    }}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="avatar" style={{ background: `${portalColor}20`, color: portalColor }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="user-info">
              <div className="user-name">{user?.name || 'User'}</div>
              <div className="user-role">{user?.role || 'Member'}</div>
            </div>
            <button onClick={handleLogout} style={{
              background: 'none', border: 'none', color: 'var(--gray-400)',
              cursor: 'pointer', padding: 4,
            }} title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
