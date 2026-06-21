import { Search, Bell, Menu } from 'lucide-react';

export default function Header({ title, breadcrumb, onMenuClick }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="hamburger-btn" onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        <div>
          <h1>{title}</h1>
          {breadcrumb && <div className="breadcrumb">{breadcrumb}</div>}
        </div>
      </div>
      <div className="header-right">
        <div className="header-search">
          <Search size={18} />
          <input type="text" placeholder="Search..." />
        </div>
        <button className="header-icon-btn">
          <Bell size={20} />
          <span className="badge">3</span>
        </button>
      </div>
    </header>
  );
}
