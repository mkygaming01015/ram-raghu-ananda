import ResidentLayout from './ResidentLayout';
import { useApp } from '../../context/AppContext';
import { Phone, Clock } from 'lucide-react';

export default function EmergencyContacts() {
  const { emergencyContacts } = useApp();

  return (
    <ResidentLayout title="Emergency Contacts" breadcrumb="Home / Emergency Contacts">
      <div className="page-content">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {emergencyContacts.map((contact, i) => (
            <div className="contact-card" key={i}>
              <div className="contact-icon" style={{
                background: contact.role.includes('Emergency') || contact.role.includes('Police') || contact.role.includes('Fire') || contact.role.includes('Ambulance')
                  ? 'var(--danger-light)' : contact.role.includes('Security') ? 'var(--success-light)' : 'var(--primary-100)',
                color: contact.role.includes('Emergency') || contact.role.includes('Police') || contact.role.includes('Fire') || contact.role.includes('Ambulance')
                  ? 'var(--danger)' : contact.role.includes('Security') ? 'var(--success)' : 'var(--primary)',
              }}>
                <Phone size={22} />
              </div>
              <div className="contact-info">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-role">{contact.role}</div>
                <div className="contact-phone">{contact.phone}</div>
                <div className="contact-available"><Clock size={12} style={{ display: 'inline', marginRight: 4 }} />{contact.available}</div>
              </div>
              <a href={`tel:${contact.phone}`} className="btn btn-primary btn-sm">Call</a>
            </div>
          ))}
        </div>
      </div>
    </ResidentLayout>
  );
}
