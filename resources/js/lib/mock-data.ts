export type Office = {
  id: string;
  name: string;
  department: string;
  services: string[];
  description: string;
  hours: string;
  contact: string;
  floor: number;
  room: string;
  coords: { x: number; y: number };
};

export const offices: Office[] = [
  {
    id: 'civil-registry',
    name: 'Civil Registry Office',
    department: 'Civil Registry',
    services: ['Birth certificates', 'Marriage certificates', 'Death certificates'],
    description: 'Handles birth, marriage, and death certificates and related civil documents.',
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM',
    contact: '(02) 8123-4501',
    floor: 1,
    room: 'Room 101',
    coords: { x: 30, y: 35 },
  },
  {
    id: 'treasury',
    name: 'Treasury Office',
    department: 'Treasury',
    services: ['Tax payments', 'Revenue collection'],
    description: 'Collection of taxes, fees, and other government revenues.',
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM',
    contact: '(02) 8123-4502',
    floor: 1,
    room: 'Room 105',
    coords: { x: 70, y: 35 },
  },
  {
    id: 'business-permits',
    name: 'Business Permits & Licensing',
    department: 'Assessor',
    services: ['Permit issuance', 'License renewals'],
    description: 'Issuance and renewal of business permits and licenses.',
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM',
    contact: '(02) 8123-4503',
    floor: 2,
    room: 'Room 201',
    coords: { x: 30, y: 60 },
  },
  {
    id: 'assessor',
    name: "Assessor's Office",
    department: 'Assessor',
    services: ['Property assessment', 'Tax appraisal'],
    description: 'Provides property assessments and related tax appraisal services.',
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM',
    contact: '(02) 8123-4504',
    floor: 2,
    room: 'Room 205',
    coords: { x: 70, y: 60 },
  },
  {
    id: 'health',
    name: 'City Health Office',
    department: 'Health',
    services: ['Health permits', 'Public health information'],
    description: 'Public health services and permit assistance for the community.',
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM',
    contact: '(02) 8123-4505',
    floor: 1,
    room: 'Room 110',
    coords: { x: 30, y: 20 },
  },
  {
    id: 'engineering',
    name: 'Engineering Office',
    department: 'Engineering',
    services: ['Infrastructure planning', 'Building permits'],
    description: 'Handles engineering reviews, infrastructure planning, and permits.',
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM',
    contact: '(02) 8123-4506',
    floor: 3,
    room: 'Room 301',
    coords: { x: 70, y: 30 },
  },
  {
    id: 'social-welfare',
    name: 'Social Welfare & Development',
    department: 'Social Welfare',
    services: ['Support programs', 'Community assistance'],
    description: 'Administers welfare programs, community support, and social services.',
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM',
    contact: '(02) 8123-4507',
    floor: 2,
    room: 'Room 210',
    coords: { x: 70, y: 70 },
  },
];

export function getOffice(id: string | undefined) {
  return offices.find((office) => office.id === id);
}
