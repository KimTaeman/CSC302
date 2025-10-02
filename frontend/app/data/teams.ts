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

export const teams: Team[] = [
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
  {
    id: '6',
    name: 'CSC302-06',
    code: 'CSC302-06',
    topic: 'AI vs Human Jobs: Should We Be Worried?',
    score: 0,
    students: [
      { id: '25', name: 'MS.CHAWISA KAEWPHINIT', studentId: 'STU025' },
      { id: '26', name: 'MS.THITAPA RITNAMSUK', studentId: 'STU026' },
      { id: '27', name: 'MR.PONKRIT SUKPRASERT', studentId: 'STU027' },
      { id: '28', name: 'MR.RATTHAPHUM SONGPHROM', studentId: 'STU028' },
      { id: '29', name: 'MR.AKARADECH KONTA', studentId: 'STU029' },
    ],
  },
  {
    id: '7',
    name: 'CSC302-07',
    code: 'CSC302-07',
    topic:
      'How AI Is Reshaping Business Across Key Sectors: Travel, Healthcare and Finance',
    score: 0,
    students: [
      { id: '30', name: 'MR.ISMAIL UMAR AJINGI', studentId: 'STU030' },
      { id: '31', name: 'MR.VIKASKUMAR DUBEY', studentId: 'STU031' },
      { id: '32', name: 'MR.KITSANATORN TACHOVAROJD', studentId: 'STU032' },
      { id: '33', name: 'MR.JIRAPAT RUENGSRI', studentId: 'STU033' },
      { id: '34', name: 'MR.POCHVASIN PARINYAPRACH', studentId: 'STU034' },
    ],
  },
  {
    id: '8',
    name: 'CSC302-08',
    code: 'CSC302-08',
    topic: 'From Monolith to Microservices: Why Teams Make the Shift',
    score: 0,
    students: [
      { id: '35', name: 'MR.JIRATANUTH RAHMAN', studentId: 'STU035' },
      { id: '36', name: 'MR.THIRAWAT KONGNIL', studentId: 'STU036' },
      {
        id: '37',
        name: 'MR.PRAPANGKORN THANGSATHITYANGKUL',
        studentId: 'STU037',
      },
      { id: '38', name: 'MR.PUNYAPAT JAISUK', studentId: 'STU038' },
      { id: '39', name: 'MR.SUPAKRIT DUANGSRI', studentId: 'STU039' },
    ],
  },
  {
    id: '9',
    name: 'CSC302-09',
    code: 'CSC302-09',
    topic: 'How to create beautiful dashboard with Power BI?',
    score: 0,
    students: [
      { id: '40', name: 'MR.ANT BONE KYAW', studentId: 'STU040' },
      { id: '41', name: 'MR.HAN WIN AUNG', studentId: 'STU041' },
      { id: '42', name: 'MS.HNIN EI EI AUNG', studentId: 'STU042' },
      { id: '43', name: 'MS.KHAING ZIN THAN', studentId: 'STU043' },
      { id: '44', name: 'MR.THAW ZIN MOE MYINT', studentId: 'STU044' },
    ],
  },
  {
    id: '10',
    name: 'CSC302-10',
    code: 'CSC302-10',
    topic:
      'Gamifying Reality: How Technology Turns Everyday Life into a Digital Quest',
    score: 0,
    students: [
      { id: '45', name: 'MR.NITHIT LERTCHAROENSOMBAT', studentId: 'STU045' },
      { id: '46', name: 'MS.PANITA CHAVIKKHUNRAM', studentId: 'STU046' },
      { id: '47', name: 'MR.PONGKHUN POONSUPSOPON', studentId: 'STU047' },
      { id: '48', name: 'MR.KYAR PHAE', studentId: 'STU048' },
      { id: '49', name: 'MS.NGWE YEE PEARL OU', studentId: 'STU049' },
    ],
  },
  {
    id: '11',
    name: 'CSC302-11',
    code: 'CSC302-11',
    topic: 'Importance of Trade Secret : A Case study of Data Theft in Apple',
    score: 0,
    students: [
      { id: '50', name: 'MS.CHANASORN SRINGOEN', studentId: 'STU050' },
      { id: '51', name: 'MS.SUTHASINEE TRITHIPTRAKUL', studentId: 'STU051' },
      { id: '52', name: 'MS.ONPARIN JITMITSUMPHUN', studentId: 'STU052' },
      { id: '53', name: 'MR.SHINATHAJ CHINSKUL', studentId: 'STU053' },
      { id: '54', name: 'MS.PAVIKA MALIPAN', studentId: 'STU054' },
    ],
  },
  {
    id: '12',
    name: 'CSC302-12',
    code: 'CSC302-12',
    topic: 'Why QA is Important in the Software Development Life Cycle',
    score: 0,
    students: [
      { id: '55', name: 'MS.JIRATCHAYA SONTHIKORN', studentId: 'STU055' },
      { id: '56', name: 'MR.PITCHAYUT BUAJOY', studentId: 'STU056' },
      { id: '57', name: 'MS.WANNARATH TEMULAR', studentId: 'STU057' },
      { id: '58', name: 'MS.VARIYA CHAIMONGKOLTRAKUL', studentId: 'STU058' },
      { id: '59', name: 'MR.SWAN HTET NAING', studentId: 'STU059' },
    ],
  },
  {
    id: '13',
    name: 'CSC302-13',
    code: 'CSC302-13',
    topic: 'Intro to CTF',
    score: 0,
    students: [
      { id: '60', name: 'MS.CHANAKARN LIMPRASERTSIRI', studentId: 'STU060' },
      { id: '61', name: 'MR.NATTHANON SOMROOP', studentId: 'STU061' },
      { id: '62', name: 'MS.PAPHACHANOK POTI', studentId: 'STU062' },
      { id: '63', name: 'MS.PARAMITA SAENGHAO', studentId: 'STU063' },
      { id: '64', name: 'MS.VIRUNPAT THEERANULUK', studentId: 'STU064' },
    ],
  },
  {
    id: '14',
    name: 'CSC302-14',
    code: 'CSC302-14',
    topic: 'Teaching Python to a Machine: Getting Started with ML',
    score: 0,
    students: [
      { id: '65', name: 'MR.KIADTIKUN THANSAMAI', studentId: 'STU065' },
      { id: '66', name: 'MR.CHAYAPOL MAHATTHANACHAI', studentId: 'STU066' },
      { id: '67', name: 'MR.THANAPAT THANATAWEE', studentId: 'STU067' },
      { id: '68', name: 'MR.MANANCHAI CHANKHUONG', studentId: 'STU068' },
      { id: '69', name: 'MR.THAWATCHAI WONGBOONSIRI', studentId: 'STU069' },
    ],
  },
  {
    id: '15',
    name: 'CSC302-15',
    code: 'CSC302-15',
    topic: "Beginner's Guide to Docker",
    score: 0,
    students: [
      { id: '70', name: 'MR.CHEWIN GRERASITSIRT', studentId: 'STU070' },
      { id: '71', name: 'MR.CHOTIWET WISITWORANAT', studentId: 'STU071' },
      { id: '72', name: 'MR.NAVIN DANSAIKUL', studentId: 'STU072' },
      { id: '73', name: 'MR.PATHOMPONG CHAMCHOY', studentId: 'STU073' },
      { id: '74', name: 'MR.KAUNG MYAT TUN', studentId: 'STU074' },
    ],
  },
  {
    id: '16',
    name: 'CSC302-16',
    code: 'CSC302-16',
    topic:
      'Non-programming opportunities in Computer Science: Find out how you can shine in CS without being a programming guru',
    score: 0,
    students: [
      { id: '75', name: 'MR.MIN KHANT WUNNA', studentId: 'STU075' },
      { id: '76', name: 'MS.SU MYAT YADANAR', studentId: 'STU076' },
      { id: '77', name: 'MR.DANIEL BAWM YING', studentId: 'STU077' },
      { id: '78', name: 'MS.THIN NWE SOE', studentId: 'STU078' },
      { id: '79', name: 'MR.YE MOE', studentId: 'STU079' },
    ],
  },
  {
    id: '17',
    name: 'CSC302-17',
    code: 'CSC302-17',
    topic: 'Repair vs Replace: Sustainability in Consumer Tech',
    score: 0,
    students: [{ id: '80', name: 'MR.RYAN LETCHMAN', studentId: 'STU080' }],
  },
  {
    id: '18',
    name: 'CSC302-18',
    code: 'CSC302-18',
    topic: 'Beyond the Pen: How Digital Signatures Secure Our Digital World',
    score: 0,
    students: [
      { id: '81', name: 'MR.BADEESORN SITTIKONG', studentId: 'STU081' },
    ],
  },
  {
    id: '19',
    name: 'CSC302-19',
    code: 'CSC302-19',
    topic: 'Why Attention is All You Need: The Architecture that Changed AI',
    score: 0,
    students: [{ id: '82', name: 'MR.DYLAN MAC YVES', studentId: 'STU082' }],
  },
  {
    id: '20',
    name: 'CSC302-20',
    code: 'CSC302-20',
    topic:
      'Everyday AI and Its Vulnerabilities: From Practical Applications to Adversarial Attacks',
    score: 0,
    students: [
      { id: '83', name: 'MR.KAUNG MYAT KYAW', studentId: 'STU083' },
      { id: '84', name: 'MS.LOUIS MADISON MAGANDA', studentId: 'STU084' },
    ],
  },
  {
    id: '21',
    name: 'CSC302-21',
    code: 'CSC302-21',
    topic: 'Why Time Series Databases? Exploring InfluxDB',
    score: 0,
    students: [
      { id: '85', name: 'MS.NATTAWADEE WUTTIVORADIT', studentId: 'STU085' },
    ],
  },
];
