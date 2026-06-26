export type Office = {
  id: string;
  name: string;
  department: string;
  floor: number;
  room: string;
  description: string;
  services: string[];
  hours: string;
  contact: string;
  email: string;
  head: string;
  coords: { x: number; y: number };
};

export const departments = [
  "Civil Registry",
  "Treasury",
  "Assessor",
  "Health",
  "Engineering",
  "Social Welfare",
  "Mayor's Office",
  "Business Permits",
];

export const offices: Office[] = [
  {
    id: "civil-registry",
    name: "Civil Registry Office",
    department: "Civil Registry",
    floor: 1,
    room: "Room 101",
    description: "Handles birth, marriage, and death certificates and related civil documents.",
    services: ["Birth Certificate", "Marriage Certificate", "Death Certificate", "CENOMAR", "Late Registration"],
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    contact: "(02) 8123-4501",
    email: "civilregistry@gov.ph",
    head: "Atty. Maria Santos",
    coords: { x: 22, y: 68 },
  },
  {
    id: "treasury",
    name: "Treasury Office",
    department: "Treasury",
    floor: 1,
    room: "Room 105",
    description: "Collection of taxes, fees, and other government revenues.",
    services: ["Real Property Tax", "Business Tax", "Community Tax Certificate", "Payments"],
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    contact: "(02) 8123-4502",
    email: "treasury@gov.ph",
    head: "Mr. Roberto Cruz",
    coords: { x: 70, y: 68 },
  },
  {
    id: "business-permits",
    name: "Business Permits & Licensing",
    department: "Business Permits",
    floor: 2,
    room: "Room 201",
    description: "Issuance and renewal of business permits and licenses.",
    services: ["New Business Permit", "Renewal", "Closure", "Mayor's Permit"],
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    contact: "(02) 8123-4503",
    email: "bplo@gov.ph",
    head: "Engr. Liza Mendoza",
    coords: { x: 22, y: 30 },
  },
  {
    id: "assessor",
    name: "Assessor's Office",
    department: "Assessor",
    floor: 2,
    room: "Room 205",
    description: "Property appraisal and tax declaration.",
    services: ["Tax Declaration", "Property Assessment", "Transfer of Ownership"],
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    contact: "(02) 8123-4504",
    email: "assessor@gov.ph",
    head: "Mr. Antonio Reyes",
    coords: { x: 70, y: 30 },
  },
  {
    id: "health",
    name: "City Health Office",
    department: "Health",
    floor: 1,
    room: "Room 110",
    description: "Public health services, vaccinations, and medical certificates.",
    services: ["Medical Certificate", "Vaccination", "Health Card", "Sanitary Permit"],
    hours: "Mon–Fri, 7:00 AM – 5:00 PM",
    contact: "(02) 8123-4505",
    email: "health@gov.ph",
    head: "Dr. Jenny Lim",
    coords: { x: 46, y: 50 },
  },
  {
    id: "engineering",
    name: "Engineering Office",
    department: "Engineering",
    floor: 3,
    room: "Room 301",
    description: "Building permits, inspections, and infrastructure planning.",
    services: ["Building Permit", "Occupancy Permit", "Inspection"],
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    contact: "(02) 8123-4506",
    email: "engineering@gov.ph",
    head: "Engr. Paolo Garcia",
    coords: { x: 25, y: 40 },
  },
  {
    id: "social-welfare",
    name: "Social Welfare & Development",
    department: "Social Welfare",
    floor: 2,
    room: "Room 210",
    description: "Assistance programs for individuals and families in need.",
    services: ["Financial Assistance", "Solo Parent ID", "Senior Citizen ID", "PWD ID"],
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    contact: "(02) 8123-4507",
    email: "swd@gov.ph",
    head: "Ms. Carmen Dela Cruz",
    coords: { x: 68, y: 40 },
  },
  {
    id: "mayors-office",
    name: "Mayor's Office",
    department: "Mayor's Office",
    floor: 3,
    room: "Room 305",
    description: "Office of the City Mayor.",
    services: ["Endorsements", "Certifications", "Public Inquiries"],
    hours: "Mon–Fri, 9:00 AM – 5:00 PM",
    contact: "(02) 8123-4500",
    email: "mayor@gov.ph",
    head: "Hon. Eduardo Villanueva",
    coords: { x: 70, y: 50 },
  },
];

export const stats = {
  totalOffices: offices.length,
  totalQRCodes: offices.length,
  totalVisitors: 12847,
  todayVisitors: 342,
  mostVisited: [
    { name: "Civil Registry Office", visits: 3421 },
    { name: "Business Permits & Licensing", visits: 2890 },
    { name: "Treasury Office", visits: 2154 },
    { name: "City Health Office", visits: 1876 },
    { name: "Assessor's Office", visits: 1432 },
  ],
  weeklyTrend: [120, 180, 240, 220, 310, 280, 342],
};

export function getOffice(id: string) {
  return offices.find((o) => o.id === id);
}
