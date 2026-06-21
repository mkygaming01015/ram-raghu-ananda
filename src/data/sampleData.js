const firstNames = [
  'Rajesh','Priya','Amit','Sneha','Vikram','Meera','Suresh','Anita','Ravi','Pooja',
  'Deepak','Kavita','Manoj','Ritu','Arun','Neha','Sanjay','Divya','Rahul','Sunita',
  'Vinod','Rekha','Ashok','Geeta','Pradeep','Usha','Mohan','Savita','Kiran','Jyoti',
  'Nitin','Pallavi','Sunil','Asha','Rajiv','Manisha','Ajay','Shobha','Pankaj','Suman',
  'Dinesh','Lata','Girish','Veena','Mahesh','Indu','Surendra','Kamla','Bharat','Pushpa',
  'Devendra','Sudha','Naresh','Anjali','Gopal','Shanti','Brijesh','Saroj','Mukesh','Renu',
  'Harish','Lakshmi','Jagdish','Geetanjali','Prakash','Padma','Ramesh','Kusum','Lalit','Damini',
  'Vijay','Saroja','Tarun','Komal','Abhishek','Nandini','Kailash','Madhuri','Sanjeev','Puja',
  'Manoj','Anjum','Vijay','Chhaya','Raj','Mamta','Ashish','Anuradha','Satish','Seema',
  'Naveen','Tulika','Vishal','Neelam','Saurabh','Aarti','Gaurav','Deepika','Manish','Sapna',
  'Rakesh','Preeti','Vivek','Shilpa','Ashok','Jaya','Sachin','Monika','Anil','Neetu'
];

const lastNames = [
  'Sharma','Verma','Gupta','Singh','Kumar','Patel','Reddy','Nair','Iyer','Mishra',
  'Joshi','Rao','Desai','Tiwari','Chauhan','Malhotra','Bhat','Kapoor','Sinha','Bose',
  'Mehta','Pandey','Choudhary','Saxena','Nigam','Kulkarni','Thakur','Pillai','Menon','Das'
];

const blocks = ['A','B','C'];
const purposes = ['Personal Visit','Delivery','Maintenance','Interview','Plumbing Work','Electrical Work','Cleaning','Pest Control','Courier','Guest'];
const complaintCategories = ['Plumbing','Electrical','Security','Parking','Common Area','Lift','Water Supply','Gardening','Housekeeping','Other'];
const complaintStatuses = ['Open','In Progress','Resolved','Closed','Escalated'];
const priorities = ['Low','Medium','High','Critical'];

function generateName(index) {
  return `${firstNames[index % firstNames.length]} ${lastNames[index % lastNames.length]}`;
}

function generatePhone() {
  const prefixes = ['98','97','96','91','90','88','89','87','86','85','84','83','82','81','80','79','78','77','76','75','74','73','72','71','70'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  let num = prefix;
  for (let i = 0; i < 8; i++) num += Math.floor(Math.random() * 10);
  return num;
}

function generateFlats() {
  const flats = [];
  let id = 1;
  const unitsPerFloor = 8;
  const floorsPerBlock = 20;
  for (const block of blocks) {
    for (let floor = 1; floor <= floorsPerBlock && flats.length < 480; floor++) {
      for (let unit = 1; unit <= unitsPerFloor && flats.length < 480; unit++) {
        flats.push({
          id: id++,
          flatNumber: `${block}${floor}${String(unit).padStart(2, '0')}`,
          block,
          floor,
          unit,
          type: unit <= 2 ? '3BHK' : unit <= 5 ? '2BHK' : '1BHK',
          status: Math.random() > 0.12 ? 'Occupied' : 'Vacant',
          ownerName: generateName(id),
          ownerPhone: generatePhone(),
          tenantName: Math.random() > 0.6 ? generateName(id + 50) : null,
          tenantPhone: Math.random() > 0.6 ? generatePhone() : null,
          maintenancePaid: Math.random() > 0.13,
          pendingAmount: 0,
        });
        if (!flats[flats.length - 1].maintenancePaid) {
          flats[flats.length - 1].pendingAmount = [2500, 3750, 5000, 7500, 10000][Math.floor(Math.random() * 5)];
        }
      }
    }
  }
  return flats;
}

const flats = generateFlats();
const occupiedFlats = flats.filter(f => f.status === 'Occupied');

function generateVisitors(count) {
  const visitors = [];
  const statuses = ['Checked In','Checked Out','Expected','Denied'];
  const companies = ['BlueDart','DTDC','FedEx','Swiggy','Zomato','Amazon','Flipkart','Delhivery','Professional Courier','India Post'];
  const visitTypes = ['Guest','Delivery','Service','Official'];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const flat = occupiedFlats[Math.floor(Math.random() * occupiedFlats.length)];
    const hour = 7 + Math.floor(Math.random() * 14);
    const minute = Math.floor(Math.random() * 60);
    const entryTime = new Date(now);
    entryTime.setHours(hour, minute, 0, 0);
    const isDelivery = Math.random() > 0.55;
    const status = i < 85 ? 'Checked Out' : i < 130 ? 'Checked In' : i < 142 ? 'Expected' : 'Denied';
    visitors.push({
      id: i + 1,
      name: generateName(i + 200),
      phone: generatePhone(),
      purpose: isDelivery ? 'Delivery' : purposes[Math.floor(Math.random() * purposes.length)],
      flatNumber: flat.flatNumber,
      residentName: flat.ownerName,
      vehicleNumber: Math.random() > 0.6 ? `MH${Math.floor(Math.random() * 50) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9000) + 1000}` : '',
      entryTime: entryTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      exitTime: status === 'Checked Out' ? new Date(entryTime.getTime() + (Math.random() * 3 + 0.5) * 3600000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : null,
      company: isDelivery ? companies[Math.floor(Math.random() * companies.length)] : null,
      items: isDelivery ? Math.floor(Math.random() * 5) + 1 : 0,
      status,
      type: visitTypes[Math.floor(Math.random() * visitTypes.length)],
      idProof: Math.random() > 0.3 ? 'Aadhaar' : 'PAN',
      photo: null,
    });
  }
  return visitors;
}

function generateComplaints() {
  const complaints = [];
  const subjects = {
    'Plumbing': ['Water leakage from ceiling','Bathroom pipe burst','Kitchen sink clogged','Toilet flush not working','Water pressure low in bathroom'],
    'Electrical': ['Power socket not working','Frequent power cuts in flat','MCB tripping repeatedly','AC wiring issue','Light fixture replacement needed'],
    'Security': ['Unknown person roaming on floor','Main gate not closing properly','CCTV camera not working','Stray dogs in compound','Visitor not being verified'],
    'Parking': ['Unknown car in my parking spot','Parking area lights not working','Visitor parking full','Two-wheeler parking violation','Parking bay marking faded'],
    'Common Area': ['Corridor lights off','Staircase cleaning pending','Elevator lobby needs painting','Rooftop access locked','Garden area overgrown'],
    'Lift': ['Lift stopped between floors','Lift making unusual noise','Lift door not closing fully','Emergency alarm not working','Lift capacity exceeded warning'],
    'Water Supply': ['No water supply in morning','Water tank overflows','Water color is brown','Sump pump not working','Water filter needs replacement'],
    'Gardening': ['Trees need trimming','Garden sprinklers broken','Dry leaves not cleaned','Flower beds damaged','Garden fence broken'],
    'Housekeeping': ['Staircase not swept today','Dustbins overflowing','Corridor cobwebs not removed','Lobby area dirty','Elevator buttons sticky'],
  };

  for (let i = 0; i < 45; i++) {
    const cat = complaintCategories[Math.floor(Math.random() * complaintCategories.length)];
    const subList = subjects[cat] || ['General issue reported', 'Miscellaneous maintenance needed', 'Other society issue'];
    const flat = occupiedFlats[Math.floor(Math.random() * occupiedFlats.length)];
    const daysAgo = Math.floor(Math.random() * 60);
    const statusIdx = i < 23 ? Math.floor(Math.random() * 3) : Math.floor(Math.random() * 2) + 3;
    complaints.push({
      id: i + 1,
      flatNumber: flat.flatNumber,
      residentName: flat.ownerName,
      category: cat,
      subject: subList[Math.floor(Math.random() * subList.length)],
      description: `Issue reported from flat ${flat.flatNumber}. Needs immediate attention.`,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status: complaintStatuses[statusIdx],
      date: new Date(Date.now() - daysAgo * 86400000).toLocaleDateString('en-IN'),
      assignedTo: Math.random() > 0.4 ? ['Ramesh (Plumber)','Suresh (Electrician)','Prakash (Carpenter)','Vinod (Painter)'][Math.floor(Math.random() * 4)] : null,
      estimatedResolution: new Date(Date.now() + (Math.random() * 7 + 1) * 86400000).toLocaleDateString('en-IN'),
    });
  }
  return complaints;
}

function generateNotices() {
  return [
    { id: 1, title: 'Annual General Meeting Notice', category: 'Meeting', date: '2026-06-20', content: 'The Annual General Meeting of Ram Raghu Ananda Phase 2 will be held on June 28, 2026 at 6:00 PM in the Community Hall. All flat owners are requested to attend. Agenda includes annual budget review, election of committee members, and discussion on proposed amenities.', priority: 'high', author: 'Society Secretary' },
    { id: 2, title: 'Water Supply Maintenance Schedule', category: 'Maintenance', date: '2026-06-19', content: 'Water supply will be interrupted on June 23, 2026 from 10:00 AM to 4:00 PM due to overhead tank cleaning and pipe maintenance. Residents are requested to store water accordingly.', priority: 'medium', author: 'Maintenance Team' },
    { id: 3, title: 'New Visitor Policy Implementation', category: 'Policy', date: '2026-06-18', content: 'Effective July 1, 2026, all visitors must be pre-registered through the society app or by calling the security desk. Unregistered visitors will not be allowed entry after 10:00 PM. Delivery personnel will be issued temporary passes at the gate.', priority: 'high', author: 'Security Committee' },
    { id: 4, title: 'Rainwater Harvesting System Upgrade', category: 'Infrastructure', date: '2026-06-17', content: 'The society is upgrading the rainwater harvesting system. Work will begin on June 25 and is expected to complete by July 10. Minor disruptions in parking area Block C and D are expected.', priority: 'low', author: 'Infrastructure Committee' },
    { id: 5, title: 'Monthly Maintenance Bill - June 2026', category: 'Finance', date: '2026-06-15', content: 'Monthly maintenance bills for June 2026 have been generated. 1BHK: ₹2,500 | 2BHK: ₹3,750 | 3BHK: ₹5,000 | 4BHK: ₹7,500. Due date: June 30, 2026. Late payment penalty of ₹500 after due date.', priority: 'medium', author: 'Treasurer' },
    { id: 6, title: 'Fire Safety Drill Announcement', category: 'Safety', date: '2026-06-14', content: 'A fire safety drill will be conducted on June 26, 2026 at 7:00 AM. All residents are requested to participate. Fire department officials will guide through emergency procedures. Assembly point: Main parking area.', priority: 'high', author: 'Safety Committee' },
    { id: 7, title: 'Gym Equipment Maintenance', category: 'Amenities', date: '2026-06-12', content: 'The gym will remain closed on June 22, 2026 for annual equipment maintenance and servicing. New treadmill expected to be installed by end of month.', priority: 'low', author: 'Amenities Committee' },
    { id: 8, title: 'Parking Space Allotment Update', category: 'Policy', date: '2026-06-10', content: 'As per the recent committee meeting, 15 new covered parking spaces have been allotted. Residents who applied for parking in the last quarter can check their allotment status at the society office.', priority: 'medium', author: 'Parking Committee' },
  ];
}

function generateGuards() {
  const shifts = ['6 AM - 2 PM', '2 PM - 10 PM', '10 PM - 6 AM'];
  return [
    { id: 1, name: 'Raj Kumar Yadav', phone: '9876543210', shift: shifts[0], gate: 'Main Gate', status: 'On Duty', experience: '5 years', joinDate: '2021-03-15' },
    { id: 2, name: 'Suresh Singh Rajput', phone: '9876543211', shift: shifts[1], gate: 'Main Gate', status: 'On Duty', experience: '3 years', joinDate: '2023-06-01' },
    { id: 3, name: 'Vikram Thapa', phone: '9876543212', shift: shifts[2], gate: 'Main Gate', status: 'On Duty', experience: '7 years', joinDate: '2019-01-10' },
    { id: 4, name: 'Mohammed Irfan', phone: '9876543213', shift: shifts[0], gate: 'Side Gate', status: 'On Duty', experience: '2 years', joinDate: '2024-02-15' },
    { id: 5, name: 'Dhananjay Patil', phone: '9876543214', shift: shifts[1], gate: 'Side Gate', status: 'On Leave', experience: '4 years', joinDate: '2022-08-20' },
    { id: 6, name: 'Anil Kumar Sharma', phone: '9876543215', shift: shifts[2], gate: 'Side Gate', status: 'On Duty', experience: '6 years', joinDate: '2020-05-01' },
    { id: 7, name: 'Prakash Jadhav', phone: '9876543216', shift: shifts[0], gate: 'Parking', status: 'On Duty', experience: '1 year', joinDate: '2025-01-10' },
    { id: 8, name: 'Ravi Shankar Dubey', phone: '9876543217', shift: shifts[1], gate: 'Parking', status: 'Off Duty', experience: '3 years', joinDate: '2023-11-01' },
  ];
}

function generateEmergencyContacts() {
  return [
    { name: 'Raj Kumar Yadav', role: 'Head Security', phone: '9876543210', available: '24/7' },
    { name: 'Sunil Mehta', role: 'Society Secretary', phone: '9876001234', available: '9 AM - 6 PM' },
    { name: 'Vikram Verma', role: 'Society Treasurer', phone: '9876001235', available: '10 AM - 5 PM' },
    { name: 'Ramesh Kumar', role: 'Maintenance Supervisor', phone: '9876001236', available: '8 AM - 8 PM' },
    { name: 'Municipal Corporation', role: 'Water Supply', phone: '1916', available: '24/7' },
    { name: 'Maharashtra State Electricity', role: 'Electricity Board', phone: '1912', available: '24/7' },
    { name: 'Fire Brigade', role: 'Emergency', phone: '101', available: '24/7' },
    { name: 'Police Control Room', role: 'Emergency', phone: '100', available: '24/7' },
    { name: 'Ambulance', role: 'Medical Emergency', phone: '108', available: '24/7' },
    { name: 'Apollo Hospital', role: 'Nearest Hospital', phone: '020-25671234', available: '24/7' },
    { name: 'Gas Emergency', role: 'Mahanagar Gas', phone: '1800-233-6111', available: '24/7' },
    { name: 'Plumber - Suresh', role: 'Society Vendor', phone: '9876001401', available: '8 AM - 7 PM' },
  ];
}

function generateDefaulterList() {
  const defaulters = occupiedFlats.filter(f => !f.maintenancePaid).map((f, i) => ({
    id: i + 1,
    flatNumber: f.flatNumber,
    block: f.block,
    ownerName: f.ownerName,
    ownerPhone: f.ownerPhone,
    pendingMonths: Math.floor(Math.random() * 6) + 1,
    pendingAmount: f.pendingAmount,
    lastPayment: new Date(Date.now() - (Math.floor(Math.random() * 180) + 30) * 86400000).toLocaleDateString('en-IN'),
    status: f.pendingAmount > 5000 ? 'Critical' : f.pendingAmount > 3000 ? 'Warning' : 'Overdue',
    noticesSent: Math.floor(Math.random() * 4),
  }));
  return defaulters.sort((a, b) => b.pendingAmount - a.pendingAmount);
}

function generateMonthlyMaintenance() {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return months.map((m, i) => ({
    month: m,
    target: 1800000 + Math.floor(Math.random() * 200000),
    collected: Math.floor((1500000 + Math.random() * 300000) * (0.75 + Math.random() * 0.2)),
    defaulters: 40 + Math.floor(Math.random() * 30),
  }));
}

export const sampleData = {
  flats,
  occupiedFlats,
  visitors: generateVisitors(160),
  complaints: generateComplaints(),
  notices: generateNotices(),
  guards: generateGuards(),
  emergencyContacts: generateEmergencyContacts(),
  defaulterList: generateDefaulterList(),
  monthlyMaintenance: generateMonthlyMaintenance(),
  stats: {
    totalFlats: 480,
    activeResidents: 1320,
    openComplaints: 23,
    visitorsToday: 146,
    collectionRate: 87,
    totalRevenue: 1843200,
    collectedAmount: 1603584,
    pendingAmount: 239616,
  },
};
