// One-time script to import teams and students data into Strapi CMS
// Run this once with: node fill_initial_data.js

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN =
  'bda54db8640e9a24eb1933481446ac55a7fd9e2743e078b9ac65f282690f78c3eb5dcf3cc6e3142129b686eb5cd0c87acc10d3d0ed27e0b1f9647122fb0c8069a9bf1b12dc96c9a0416a75cebe9f1d172dbe28c89f2b7907da052506d3ec556622e1f81a5abdda0edfd676dddd671c70a623cd67df818d563687497543ba428a';

// Validate that API token is provided
if (!STRAPI_API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required!');
  console.error(
    'Please set it in your .env file or as an environment variable.'
  );
  console.error(
    'Example: STRAPI_API_TOKEN=your_api_token_here node fill_initial_data.js'
  );
  process.exit(1);
}

// Hardcoded data from your teams.ts file
const teamsData = [
  {
    id: '1',
    name: 'CSC302-01',
    code: 'CSC302-01',
    topic: 'Can Your Phone Be Hacked? Understanding Cyber Threats',
    score: 0,
    students: [
      { id: '1', name: 'MS.CHAYADA MUANGBOONSRI', studentId: '66130500838' },
      { id: '2', name: 'MR.NUDHANA SARUTIPAISAN', studentId: '66130500843' },
      { id: '3', name: 'MS.NANNICHA PHRAEMETTA', studentId: '66130500846' },
      { id: '4', name: 'MS.PRECHAYA MAKSAP', studentId: '66130500849' },
    ],
  },
  {
    id: '2',
    name: 'CSC302-02',
    code: 'CSC302-02',
    topic: 'Cyberbullying: How Tech Can Help Prevent It',
    score: 0,
    students: [
      { id: '5', name: 'MR.MIN PAING HEIN', studentId: '66130500815' },
      { id: '6', name: 'MR.KORNTHANA KAMONNANTHIN', studentId: '66130500832' },
      {
        id: '7',
        name: 'MR.THANAKIT KEERATIPHECHNGAM',
        studentId: '66130500845',
      },
      {
        id: '8',
        name: 'MS.SIRIYAKORN DEE-UDOMVONGSA',
        studentId: '66130500857',
      },
      {
        id: '9',
        name: 'MR.SURIYA UPARIPHUTTHIPHONG',
        studentId: '66130500858',
      },
    ],
  },
  {
    id: '3',
    name: 'CSC302-03',
    code: 'CSC302-03',
    topic: 'Using GitHub Copilot in Real-World Scenarios',
    score: 0,
    students: [
      { id: '10', name: 'MR.KAMPOL SUWANNATAM', studentId: '65130500201' },
      {
        id: '11',
        name: 'MR.NONTAKORN CHATKOONSATHIEN',
        studentId: '65130500210',
      },
      { id: '12', name: 'MS.ISSADAORN KULSANTAO', studentId: '65130500227' },
      {
        id: '13',
        name: 'MR.PAVADOL DECHASIDPHAISAN',
        studentId: '65130500240',
      },
      { id: '14', name: 'MR.RATCHANON PROMSOMBUT', studentId: '65130500242' },
    ],
  },
  {
    id: '4',
    name: 'CSC302-04',
    code: 'CSC302-04',
    topic: 'Slice of Pi: Bridging Vision, Language, and Action in Robots',
    score: 0,
    students: [
      { id: '15', name: 'MS.AKARI KYAW THEIN', studentId: '66130500801' },
      { id: '16', name: 'MR.KAUNG HSET HEIN', studentId: '66130500810' },
      { id: '17', name: 'MS.NAY CHI LIN LEI', studentId: '66130500817' },
      { id: '18', name: 'MR.SAI ZAW OO', studentId: '66130500821' },
      { id: '19', name: 'MR.YE PHONE KYAW', studentId: '66130500830' },
    ],
  },
  {
    id: '5',
    name: 'CSC302-05',
    code: 'CSC302-05',
    topic: 'Autonomous AI Workflows with n8n and Agentic AI',
    score: 0,
    students: [
      { id: '20', name: 'MR.AUNG MOE LIN', studentId: '66130500803' },
      { id: '21', name: 'MR.AYE CHAN AUNG', studentId: '66130500804' },
      { id: '22', name: 'MR.KYAUK NANDA THU', studentId: '66130500813' },
      { id: '23', name: 'MR.OAKKAR MIN', studentId: '66130500819' },
      { id: '24', name: 'MR.SHINE MIN KHANT', studentId: '66130500822' },
    ],
  },
  {
    id: '6',
    name: 'CSC302-06',
    code: 'CSC302-06',
    topic: 'AI vs Human Jobs: Should We Be Worried?',
    score: 0,
    students: [
      { id: '25', name: 'MS.CHAWISA KAEWPHINIT', studentId: '66130500840' },
      { id: '26', name: 'MS.THITAPA RITNAMSUK', studentId: '66130500841' },
      { id: '27', name: 'MR.PONKRIT SUKPRASERT', studentId: '66130500852' },
      { id: '28', name: 'MR.RATTHAPHUM SONGPHROM', studentId: '66130500854' },
      { id: '29', name: 'MR.AKARADECH KONTA', studentId: '66130500859' },
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
      { id: '30', name: 'MR.ISMAIL UMAR AJINGI', studentId: '66130500809' },
      { id: '31', name: 'MR.VIKASKUMAR DUBEY', studentId: '66130500826' },
      {
        id: '32',
        name: 'MR.KITSANATORN TACHOVAROJD',
        studentId: '66130500834',
      },
      { id: '33', name: 'MR.JIRAPAT RUENGSRI', studentId: '66130500837' },
      { id: '34', name: 'MR.POCHVASIN PARINYAPRACH', studentId: '66130500851' },
    ],
  },
  {
    id: '8',
    name: 'CSC302-08',
    code: 'CSC302-08',
    topic: 'From Monolith to Microservices: Why Teams Make the Shift',
    score: 0,
    students: [
      { id: '35', name: 'MR.JIRATANUTH RAHMAN', studentId: '66130500836' },
      { id: '36', name: 'MR.THIRAWAT KONGNIL', studentId: '66130500844' },
      {
        id: '37',
        name: 'MR.PRAPANGKORN THANGSATHITYANGKUL',
        studentId: '66130500848',
      },
      { id: '38', name: 'MR.PUNYAPAT JAISUK', studentId: '66130500850' },
      { id: '39', name: 'MR.SUPAKRIT DUANGSRI', studentId: '66130500856' },
    ],
  },
  {
    id: '9',
    name: 'CSC302-09',
    code: 'CSC302-09',
    topic: 'How to create beautiful dashboard with Power BI?',
    score: 0,
    students: [
      { id: '40', name: 'MR.ANT BONE KYAW', studentId: '66130500802' },
      { id: '41', name: 'MR.HAN WIN AUNG', studentId: '66130500807' },
      { id: '42', name: 'MS.HNIN EI EI AUNG', studentId: '66130500808' },
      { id: '43', name: 'MS.KHAING ZIN THAN', studentId: '66130500812' },
      { id: '44', name: 'MR.THAW ZIN MOE MYINT', studentId: '66130500824' },
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
      {
        id: '45',
        name: 'MR.NITHIT LERTCHAROENSOMBAT',
        studentId: '65130500212',
      },
      { id: '46', name: 'MS.PANITA CHAVIKKHUNRAM', studentId: '65130500214' },
      { id: '47', name: 'MR.PONGKHUN POONSUPSOPON', studentId: '65130500216' },
      { id: '48', name: 'MR.KYAR PHAE', studentId: '65130500231' },
      { id: '49', name: 'MS.NGWE YEE PEARL OU', studentId: '66130500818' },
    ],
  },
  {
    id: '11',
    name: 'CSC302-11',
    code: 'CSC302-11',
    topic: 'Importance of Trade Secret : A Case study of Data Theft in Apple',
    score: 0,
    students: [
      { id: '50', name: 'MS.CHANASORN SRINGOEN', studentId: '65130500206' },
      {
        id: '51',
        name: 'MS.SUTHASINEE TRITHIPTRAKUL',
        studentId: '65130500225',
      },
      { id: '52', name: 'MS.ONPARIN JITMITSUMPHUN', studentId: '65130500226' },
      { id: '53', name: 'MR.SHINATHAJ CHINSKUL', studentId: '65130500238' },
      { id: '54', name: 'MS.PAVIKA MALIPAN', studentId: '65130500264' },
    ],
  },
  {
    id: '12',
    name: 'CSC302-12',
    code: 'CSC302-12',
    topic: 'Why QA is Important in the Software Development Life Cycle',
    score: 0,
    students: [
      { id: '55', name: 'MS.JIRATCHAYA SONTHIKORN', studentId: '65130500203' },
      { id: '56', name: 'MR.PITCHAYUT BUAJOY', studentId: '65130500218' },
      { id: '57', name: 'MS.WANNARATH TEMULAR', studentId: '65130500222' },
      {
        id: '58',
        name: 'MS.VARIYA CHAIMONGKOLTRAKUL',
        studentId: '65130500265',
      },
      { id: '59', name: 'MR.SWAN HTET NAING', studentId: '66130500823' },
    ],
  },
  {
    id: '13',
    name: 'CSC302-13',
    code: 'CSC302-13',
    topic: 'Intro to CTF',
    score: 0,
    students: [
      {
        id: '60',
        name: 'MS.CHANAKARN LIMPRASERTSIRI',
        studentId: '65130500205',
      },
      { id: '61', name: 'MR.NATTHANON SOMROOP', studentId: '65130500209' },
      { id: '62', name: 'MS.PAPHACHANOK POTI', studentId: '65130500215' },
      { id: '63', name: 'MS.PARAMITA SAENGHAO', studentId: '65130500217' },
      { id: '64', name: 'MS.VIRUNPAT THEERANULUK', studentId: '65130500224' },
    ],
  },
  {
    id: '14',
    name: 'CSC302-14',
    code: 'CSC302-14',
    topic: 'Teaching Python to a Machine: Getting Started with ML',
    score: 0,
    students: [
      { id: '65', name: 'MR.KIADTIKUN THANSAMAI', studentId: '65130500202' },
      {
        id: '66',
        name: 'MR.CHAYAPOL MAHATTHANACHAI',
        studentId: '65130500237',
      },
      { id: '67', name: 'MR.THANAPAT THANATAWEE', studentId: '65130500239' },
      { id: '68', name: 'MR.MANANCHAI CHANKHUONG', studentId: '65130500241' },
      {
        id: '69',
        name: 'MR.THAWATCHAI WONGBOONSIRI',
        studentId: '65130500262',
      },
    ],
  },
  {
    id: '15',
    name: 'CSC302-15',
    code: 'CSC302-15',
    topic: "Beginner's Guide to Docker",
    score: 0,
    students: [
      { id: '70', name: 'MR.CHEWIN GRERASITSIRT', studentId: '65130500207' },
      { id: '71', name: 'MR.CHOTIWET WISITWORANAT', studentId: '65130500208' },
      { id: '72', name: 'MR.NAVIN DANSAIKUL', studentId: '65130500211' },
      { id: '73', name: 'MR.PATHOMPONG CHAMCHOY', studentId: '65130500213' },
      { id: '74', name: 'MR.KAUNG MYAT TUN', studentId: '65130500250' },
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
      { id: '75', name: 'MR.MIN KHANT WUNNA', studentId: '65130500244' },
      { id: '76', name: 'MS.SU MYAT YADANAR', studentId: '65130500257' },
      { id: '77', name: 'MR.DANIEL BAWM YING', studentId: '66130500806' },
      { id: '78', name: 'MS.THIN NWE SOE', studentId: '66130500825' },
      { id: '79', name: 'MR.YE MOE', studentId: '66130500829' },
    ],
  },
  {
    id: '17',
    name: 'CSC302-17',
    code: 'CSC302-17',
    topic: 'Repair vs Replace: Sustainability in Consumer Tech',
    score: 0,
    students: [
      { id: '80', name: 'MR.RYAN LETCHMAN', studentId: '64130500256' },
    ],
  },
  {
    id: '18',
    name: 'CSC302-18',
    code: 'CSC302-18',
    topic: 'Beyond the Pen: How Digital Signatures Secure Our Digital World',
    score: 0,
    students: [
      { id: '81', name: 'MR.BADEESORN SITTIKONG', studentId: '66130500847' },
    ],
  },
  {
    id: '19',
    name: 'CSC302-19',
    code: 'CSC302-19',
    topic: 'Why Attention is All You Need: The Architecture that Changed AI',
    score: 0,
    students: [
      { id: '82', name: 'MR.DYLAN MAC YVES', studentId: '65130500245' },
    ],
  },
  {
    id: '20',
    name: 'CSC302-20',
    code: 'CSC302-20',
    topic:
      'Everyday AI and Its Vulnerabilities: From Practical Applications to Adversarial Attacks',
    score: 0,
    students: [
      { id: '83', name: 'MR.KAUNG MYAT KYAW', studentId: '65130500249' },
      { id: '84', name: 'MS.LOUIS MADISON MAGANDA', studentId: '66130500814' },
    ],
  },
  {
    id: '21',
    name: 'CSC302-21',
    code: 'CSC302-21',
    topic: 'Why Time Series Databases? Exploring InfluxDB',
    score: 0,
    students: [
      {
        id: '85',
        name: 'MS.NATTAWADEE WUTTIVORADIT',
        studentId: '66130500842',
      },
    ],
  },
];

// Helper function to make requests to Strapi
async function makeStrapiRequest(endpoint, method = 'GET', data = null) {
  const url = `${STRAPI_URL}/api/${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const options = {
    method,
    headers,
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify({ data });
  }

  console.log(`${method} ${url}`);
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorBody = await response.text();
    console.log('Error response body:', errorBody);
    throw new Error(
      `Failed to ${method} ${endpoint}: ${response.status} ${response.statusText}\nError: ${errorBody}`
    );
  }

  return response.json();
}

// Helper function to create or get existing record
async function createStrapiRecord(endpoint, data) {
  return makeStrapiRequest(endpoint, 'POST', data);
}

// Helper function to check if team exists by code
async function findTeamByCode(code) {
  try {
    const result = await makeStrapiRequest(`teams?filters[code][$eq]=${code}`);
    return result.data.length > 0 ? result.data[0] : null;
  } catch (error) {
    console.log(`Could not check for existing team ${code}:`, error.message);
    return null;
  }
}

// Helper function to check if student exists by studentId
async function findStudentByStudentId(studentId) {
  try {
    const result = await makeStrapiRequest(
      `students?filters[studentId][$eq]=${studentId}`
    );
    return result.data.length > 0 ? result.data[0] : null;
  } catch (error) {
    console.log(
      `Could not check for existing student ${studentId}:`,
      error.message
    );
    return null;
  }
}

// Main import function
async function importData() {
  console.log('🚀 Starting data import to Strapi...');

  try {
    // Step 1: Create all students first (or get existing ones)
    console.log('📚 Creating students...');
    const studentIdMap = new Map(); // Map old IDs to new Strapi IDs

    for (const team of teamsData) {
      for (const student of team.students) {
        if (!studentIdMap.has(student.id)) {
          try {
            // Check if student already exists
            const existingStudent = await findStudentByStudentId(
              student.studentId
            );

            if (existingStudent) {
              // Store the documentId for Strapi v5 compatibility
              studentIdMap.set(student.id, existingStudent.documentId);
              console.log(
                `🔄 Found existing student: ${student.name} (ID: ${existingStudent.documentId})`
              );
            } else {
              const result = await createStrapiRecord('students', {
                name: student.name,
                studentId: student.studentId,
              });
              studentIdMap.set(student.id, result.data.documentId);
              console.log(
                `✅ Created student: ${student.name} (ID: ${result.data.documentId})`
              );
            }
          } catch (error) {
            console.error(
              `❌ Failed to process student ${student.name}:`,
              error.message
            );
          }
        }
      }
    }

    console.log(`\n📊 Created ${studentIdMap.size} students`);

    // Step 2: Create teams (without students first) or get existing ones
    console.log('\n🏆 Creating teams...');
    let teamsCreated = 0;
    let teamsFound = 0;
    const teamIdMap = new Map(); // Map old team IDs to new Strapi IDs

    for (const team of teamsData) {
      try {
        // Check if team already exists
        const existingTeam = await findTeamByCode(team.code);

        if (existingTeam) {
          teamIdMap.set(team.id, existingTeam.documentId);
          teamsFound++;
          console.log(
            `🔄 Found existing team: ${team.name} (ID: ${existingTeam.documentId})`
          );
        } else {
          const result = await createStrapiRecord('teams', {
            name: team.name,
            code: team.code,
            topic: team.topic,
            score: team.score,
            // Don't include students here - we'll update them separately
          });

          teamIdMap.set(team.id, result.data.documentId);
          teamsCreated++;
          console.log(
            `✅ Created team: ${team.name} (ID: ${result.data.documentId})`
          );
        }
      } catch (error) {
        console.error(`❌ Failed to process team ${team.name}:`, error.message);
      }
    }

    // Step 3: Update students with their team relationships
    console.log('\n🔗 Linking students to teams...');
    let studentsLinked = 0;

    for (const team of teamsData) {
      const teamStrapiId = teamIdMap.get(team.id);
      if (!teamStrapiId) {
        console.log(
          `⚠️ Team ${team.name} was not created, skipping student linking`
        );
        continue;
      }

      for (const student of team.students) {
        const studentStrapiId = studentIdMap.get(student.id);
        if (!studentStrapiId) {
          console.log(`⚠️ Student ${student.name} was not created, skipping`);
          continue;
        }

        try {
          // Update the student to link them to their team
          await makeStrapiRequest(`students/${studentStrapiId}`, 'PUT', {
            team: teamStrapiId,
          });

          studentsLinked++;
          console.log(`✅ Linked ${student.name} to ${team.name}`);
        } catch (error) {
          console.error(
            `❌ Failed to link student ${student.name} to team ${team.name}:`,
            error.message
          );
        }
      }
    }

    console.log(`\n🎉 Import completed!`);
    console.log(`📊 Summary:`);
    console.log(`   - Students processed: ${studentIdMap.size}`);
    console.log(`   - Teams created: ${teamsCreated}`);
    console.log(`   - Teams found (existing): ${teamsFound}`);
    console.log(`   - Students linked to teams: ${studentsLinked}`);
    console.log(
      `   - Total records processed: ${
        studentIdMap.size + teamsCreated + teamsFound
      }`
    );
  } catch (error) {
    console.error('💥 Import failed:', error);
  }
}

// Run the import
importData();
