import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ToastContainer from './components/shared/Toast';
import LandingPage from './pages/LandingPage';
import ResidentLogin from './components/resident/ResidentLogin';
import ResidentDashboard from './components/resident/ResidentDashboard';
import RaiseComplaint from './components/resident/RaiseComplaint';
import ComplaintHistory from './components/resident/ComplaintHistory';
import VisitorPass from './components/resident/VisitorPass';
import QRGuestPass from './components/resident/QRGuestPass';
import MaintenanceStatus from './components/resident/MaintenanceStatus';
import SocietyNotices from './components/resident/SocietyNotices';
import EmergencyContacts from './components/resident/EmergencyContacts';
import GuardLogin from './components/guard/GuardLogin';
import GuardDashboard from './components/guard/GuardDashboard';
import FlatSearch from './components/guard/FlatSearch';
import GuardResidentDirectory from './components/guard/GuardResidentDirectory';
import VisitorEntry from './components/guard/VisitorEntry';
import DeliveryEntry from './components/guard/DeliveryEntry';
import QRScanner from './components/guard/QRScanner';
import VisitorApproval from './components/guard/VisitorApproval';
import GuardEmergencyContacts from './components/guard/GuardEmergencyContacts';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ComplaintManagement from './components/admin/ComplaintManagement';
import VisitorManagement from './components/admin/VisitorManagement';
import MaintenanceDashboard from './components/admin/MaintenanceDashboard';
import DefaulterList from './components/admin/DefaulterList';
import AdminResidentDirectory from './components/admin/AdminResidentDirectory';
import GuardDirectory from './components/admin/GuardDirectory';
import ReportsAnalytics from './components/admin/ReportsAnalytics';

function App() {
  return (
    <AppProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/resident/login" element={<ResidentLogin />} />
        <Route path="/resident/dashboard" element={<ResidentDashboard />} />
        <Route path="/resident/complaint" element={<RaiseComplaint />} />
        <Route path="/resident/complaints" element={<ComplaintHistory />} />
        <Route path="/resident/visitor-pass" element={<VisitorPass />} />
        <Route path="/resident/qr-guest-pass" element={<QRGuestPass />} />
        <Route path="/resident/maintenance" element={<MaintenanceStatus />} />
        <Route path="/resident/notices" element={<SocietyNotices />} />
        <Route path="/resident/contacts" element={<EmergencyContacts />} />
        <Route path="/guard/login" element={<GuardLogin />} />
        <Route path="/guard/dashboard" element={<GuardDashboard />} />
        <Route path="/guard/flat-search" element={<FlatSearch />} />
        <Route path="/guard/directory" element={<GuardResidentDirectory />} />
        <Route path="/guard/visitor-entry" element={<VisitorEntry />} />
        <Route path="/guard/delivery-entry" element={<DeliveryEntry />} />
        <Route path="/guard/qr-scanner" element={<QRScanner />} />
        <Route path="/guard/visitor-approval" element={<VisitorApproval />} />
        <Route path="/guard/contacts" element={<GuardEmergencyContacts />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/complaints" element={<ComplaintManagement />} />
        <Route path="/admin/visitors" element={<VisitorManagement />} />
        <Route path="/admin/maintenance" element={<MaintenanceDashboard />} />
        <Route path="/admin/defaulters" element={<DefaulterList />} />
        <Route path="/admin/residents" element={<AdminResidentDirectory />} />
        <Route path="/admin/guards" element={<GuardDirectory />} />
        <Route path="/admin/reports" element={<ReportsAnalytics />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
