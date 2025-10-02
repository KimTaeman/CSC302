// Student interface to match Strapi Student content type
export interface Student {
  id: string;
  name: string;
  studentId: string;
}

// Team interface to match Strapi Team content type with Student relationship
export interface Team {
  id: string;
  name: string;
  code: string;
  topic: string;
  score: number;
  students: Student[]; // Changed from members: string[] to students: Student[]
}

module.exports = [
  {
    id: '1',
    name: 'CSC302-01',
    code: 'CSC302-01',
    topic: 'Can Your Phone Be Hacked? Understanding Cyber Threats',
    score: 0,
    students: [
      { id: '1', name: 'MS.CHAYADA MUANGBOONSRI', studentId: 'STU001' },
      { id: '2', name: 'MR.NUDHANA SARUTIPAISAN', studentId: 'STU002' },
      { id: '3', name: 'MS.NANNICHA PHRAEMETTA', studentId: 'STU003' },
      { id: '4', name: 'MS.PRECHAYA MAKSAP', studentId: 'STU004' },
    ],
  },
  {
    id: '2',
    name: 'CSC302-02',
    code: 'CSC302-02',
    topic: 'Cyberbullying: How Tech Can Help Prevent It',
    score: 0,
    students: [
      { id: '5', name: 'MR.MIN PAING HEIN', studentId: 'STU005' },
      { id: '6', name: 'MR.KORNTHANA KAMONNANTHIN', studentId: 'STU006' },
      { id: '7', name: 'MR.THANAKIT KEERATIPHECHNGAM', studentId: 'STU007' },
      { id: '8', name: 'MS.SIRIYAKORN DEE-UDOMVONGSA', studentId: 'STU008' },
      { id: '9', name: 'MR.SURIYA UPARIPHUTTHIPHONG', studentId: 'STU009' },
    ],
  },
  {
    id: '3',
    name: 'CSC302-03',
    code: 'CSC302-03',
    topic: 'Using GitHub Copilot in Real-World Scenarios',
    score: 0,
    students: [
      { id: '10', name: 'MR.KAMPOL SUWANNATAM', studentId: 'STU010' },
      { id: '11', name: 'MR.NONTAKORN CHATKOONSATHIEN', studentId: 'STU011' },
      { id: '12', name: 'MS.ISSADAORN KULSANTAO', studentId: 'STU012' },
      { id: '13', name: 'MR.PAVADOL DECHASIDPHAISAN', studentId: 'STU013' },
      { id: '14', name: 'MR.RATCHANON PROMSOMBUT', studentId: 'STU014' },
    ],
  },
  {
    id: '4',
    name: 'CSC302-04',
    code: 'CSC302-04',
    topic: 'Slice of Pi: Bridging Vision, Language, and Action in Robots',
    score: 0,
    students: [
      { id: '15', name: 'MS.AKARI KYAW THEIN', studentId: 'STU015' },
      { id: '16', name: 'MR.KAUNG HSET HEIN', studentId: 'STU016' },
      { id: '17', name: 'MS.NAY CHI LIN LEI', studentId: 'STU017' },
      { id: '18', name: 'MR.SAI ZAW OO', studentId: 'STU018' },
      { id: '19', name: 'MR.YE PHONE KYAW', studentId: 'STU019' },
    ],
  },
  {
    id: '5',
    name: 'CSC302-05',
    code: 'CSC302-05',
    topic: 'Autonomous AI Workflows with n8n and Agentic AI',
    score: 0,
    students: [
      { id: '20', name: 'MR.AUNG MOE LIN', studentId: 'STU020' },
      { id: '21', name: 'MR.AYE CHAN AUNG', studentId: 'STU021' },
      { id: '22', name: 'MR.KYAUK NANDA THU', studentId: 'STU022' },
      { id: '23', name: 'MR.OAKKAR MIN', studentId: 'STU023' },
      { id: '24', name: 'MR.SHINE MIN KHANT', studentId: 'STU024' },
    ],
  },
  // Adding just a few teams for now to test the structure - you can add more later
];
