import { createContext, useContext, useState, useCallback } from 'react';
import { sampleData } from '../data/sampleData';

const AppContext = createContext(null);

export function useApp() {
  return useContext(AppContext);
}

let nextComplaintId = 50;
let nextVisitorPassId = 1000;
let nextVisitorLogId = 200;

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [complaints, setComplaints] = useState(sampleData.complaints);
  const [visitors, setVisitors] = useState(sampleData.visitors);
  const [visitorPasses, setVisitorPasses] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const login = useCallback((role, userData) => {
    setCurrentRole(role);
    setCurrentUser(userData);
  }, []);

  const logout = useCallback(() => {
    setCurrentRole(null);
    setCurrentUser(null);
  }, []);

  const addComplaint = useCallback((complaint) => {
    const newComplaint = {
      ...complaint,
      id: nextComplaintId++,
      date: new Date().toLocaleDateString('en-IN'),
      status: 'Open',
      assignedTo: null,
      estimatedResolution: new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-IN'),
    };
    setComplaints(prev => [newComplaint, ...prev]);
    addToast('Complaint submitted successfully!');
    return newComplaint;
  }, [addToast]);

  const updateComplaintStatus = useCallback((id, status, assignedTo) => {
    setComplaints(prev => prev.map(c =>
      c.id === id ? { ...c, status, ...(assignedTo ? { assignedTo } : {}) } : c
    ));
    addToast(`Complaint #${id} updated to ${status}`);
  }, [addToast]);

  const generateVisitorPass = useCallback((passData) => {
    const newPass = {
      ...passData,
      passId: `VMP-${++nextVisitorPassId}`,
      date: new Date().toLocaleDateString('en-IN'),
      validFrom: passData.expectedTime || '10:00 AM',
      validUntil: '11:00 PM',
      status: 'Valid',
      generatedAt: new Date().toISOString(),
    };
    setVisitorPasses(prev => [newPass, ...prev]);
    addToast('Visitor pass generated!');
    return newPass;
  }, [addToast]);

  const addVisitorEntry = useCallback((entry) => {
    const newEntry = {
      ...entry,
      id: ++nextVisitorLogId,
      entryTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      exitTime: null,
      status: 'Checked In',
    };
    setVisitors(prev => [newEntry, ...prev]);
    addToast('Visitor entry recorded!');
    return newEntry;
  }, [addToast]);

  const addDeliveryEntry = useCallback((entry) => {
    const newEntry = {
      ...entry,
      id: ++nextVisitorLogId,
      purpose: 'Delivery',
      entryTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      exitTime: null,
      status: 'Checked In',
      type: 'Delivery',
    };
    setVisitors(prev => [newEntry, ...prev]);
    addToast('Delivery entry recorded!');
    return newEntry;
  }, [addToast]);

  const approveVisitor = useCallback((id) => {
    setVisitors(prev => prev.map(v =>
      v.id === id ? { ...v, status: 'Checked In' } : v
    ));
    addToast('Visitor approved!');
  }, [addToast]);

  const denyVisitor = useCallback((id) => {
    setVisitors(prev => prev.map(v =>
      v.id === id ? { ...v, status: 'Denied' } : v
    ));
    addToast('Visitor denied', 'error');
  }, [addToast]);

  const checkoutVisitor = useCallback((id) => {
    setVisitors(prev => prev.map(v =>
      v.id === id ? { ...v, status: 'Checked Out', exitTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) } : v
    ));
    addToast('Visitor checked out');
  }, [addToast]);

  const scanQR = useCallback((code) => {
    const pass = visitorPasses.find(p => p.passId === code);
    if (pass) {
      if (pass.status === 'Used') return { status: 'Already Used', pass };
      if (pass.status === 'Expired') return { status: 'Expired', pass };
      setVisitorPasses(prev => prev.map(p =>
        p.passId === code ? { ...p, status: 'Used' } : p
      ));
      const newEntry = {
        id: ++nextVisitorLogId,
        name: pass.visitorName || pass.name,
        phone: pass.phone,
        flatNumber: pass.flat,
        residentName: pass.resident,
        purpose: pass.purpose,
        entryTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        exitTime: null,
        status: 'Checked In',
        type: 'Guest',
        vehicleNumber: pass.vehicleNumber || '',
      };
      setVisitors(prev => [newEntry, ...prev]);
      return { status: 'Approved', pass };
    }
    const todayVisitor = visitors.find(v => v.passId === code);
    if (todayVisitor) return { status: 'Already Used', pass: todayVisitor };
    return { status: 'Not Found', pass: null };
  }, [visitorPasses, visitors]);

  const value = {
    currentUser, currentRole, login, logout,
    complaints, addComplaint, updateComplaintStatus,
    visitors, visitorPasses,
    addVisitorEntry, addDeliveryEntry, approveVisitor, denyVisitor, checkoutVisitor,
    generateVisitorPass, scanQR,
    flats: sampleData.flats,
    occupiedFlats: sampleData.occupiedFlats,
    guards: sampleData.guards,
    emergencyContacts: sampleData.emergencyContacts,
    notices: sampleData.notices,
    monthlyMaintenance: sampleData.monthlyMaintenance,
    defaulterList: sampleData.defaulterList,
    stats: sampleData.stats,
    toasts, addToast,
    loading, setLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
