const courses = [
    {
        id: '1',
        code: 'CS101',
        title: 'Introduction to Computer Science',
        description: 'Fundamental concepts of computer science: programming basics, problem solving, and computational thinking.',
        credits: 3,
        level: 'Undergraduate',
        prerequisites: [],
        topics: ['Programming', 'Algorithms basics', 'Data types', 'Control flow'],
        durationWeeks: 12,
        img_url: 'https://picsum.photos/seed/CS101/300/160'
    },
    {
        id: '2',
        code: 'CS102',
        title: 'Data Structures',
        description: 'Design, analysis, and implementation of data structures: arrays, lists, stacks, queues, trees, graphs, and hash tables.',
        credits: 3,
        level: 'Undergraduate',
        prerequisites: ['CS101'],
        topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Hashing'],
        durationWeeks: 12,
        img_url: 'https://picsum.photos/seed/CS102/300/160'
    },
    {
        id: '3',
        code: 'CS201',
        title: 'Algorithms',
        description: 'Algorithm design and analysis: complexity, sorting, searching, greedy, divide and conquer, dynamic programming.',
        credits: 3,
        level: 'Undergraduate',
        prerequisites: ['CS102'],
        topics: ['Complexity', 'Sorting', 'Graph algorithms', 'DP', 'Greedy algorithms'],
        durationWeeks: 12,
        img_url: 'https://picsum.photos/seed/CS201/300/160'
    },
    {
        id: '4',
        code: 'CS210',
        title: 'Computer Organization & Architecture',
        description: 'Basics of digital logic, CPU architecture, memory hierarchy, instruction sets, and assembly language.',
        credits: 3,
        level: 'Undergraduate',
        prerequisites: ['CS101'],
        topics: ['Binary', 'CPU', 'Caches', 'Pipelining', 'Assembly'],
        durationWeeks: 12,
        img_url: 'https://picsum.photos/seed/CS210/300/160'
    },
    {
        id: '5',
        code: 'CS230',
        title: 'Operating Systems',
        description: 'Principles of operating systems: processes, threads, scheduling, synchronization, memory management, and file systems.',
        credits: 4,
        level: 'Undergraduate',
        prerequisites: ['CS210', 'CS201'],
        topics: ['Processes', 'Concurrency', 'Virtual memory', 'File systems'],
        durationWeeks: 14,
        img_url: 'https://picsum.photos/seed/CS230/300/160'
    },
    {
        id: '6',
        code: 'CS240',
        title: 'Databases',
        description: 'Relational databases, SQL, schema design, transactions, indexing, and basics of NoSQL.',
        credits: 3,
        level: 'Undergraduate',
        prerequisites: ['CS102'],
        topics: ['SQL', 'ER modeling', 'Transactions', 'Indexing', 'Normalization'],
        durationWeeks: 12,
        img_url: 'https://picsum.photos/seed/CS240/300/160'
    },
    {
        id: '7',
        code: 'CS300',
        title: 'Software Engineering',
        description: 'Software development lifecycle, requirements, design patterns, testing, version control, and team practices.',
        credits: 3,
        level: 'Undergraduate',
        prerequisites: ['CS102'],
        topics: ['SDLC', 'UML', 'Design patterns', 'Testing', 'CI/CD'],
        durationWeeks: 12,
        img_url: 'https://picsum.photos/seed/CS300/300/160'
    },
    {
        id: '8',
        code: 'CS320',
        title: 'Computer Networks',
        description: 'Network models, protocols, routing, transport, and network security basics.',
        credits: 3,
        level: 'Undergraduate',
        prerequisites: ['CS210'],
        topics: ['OSI/TCP-IP', 'Routing', 'TCP/UDP', 'HTTP', 'Sockets'],
        durationWeeks: 12,
        img_url: 'https://picsum.photos/seed/CS320/300/160'
    },
    {
        id: '9',
        code: 'CS410',
        title: 'Machine Learning',
        description: 'Supervised and unsupervised learning methods, model evaluation, and practical ML pipelines.',
        credits: 4,
        level: 'Undergraduate',
        prerequisites: ['CS201', 'MATH201'],
        topics: ['Regression', 'Classification', 'Clustering', 'Model evaluation', 'Feature engineering'],
        durationWeeks: 14,
        url: 'https://example.edu/cs410',
        img_url: 'https://picsum.photos/seed/CS410/300/160'
    },
    {
        id: '10',
        code: 'CS430',
        title: 'Artificial Intelligence',
        description: 'Foundations of AI: search, knowledge representation, reasoning, planning, and basic NLP.',
        credits: 3,
        level: 'Undergraduate',
        prerequisites: ['CS201'],
        topics: ['Search', 'Heuristics', 'Logic', 'Planning', 'Intro NLP'],
        durationWeeks: 12,
        img_url: 'https://picsum.photos/seed/CS430/300/160'
    },
    {
        id: '11',
        code: 'CS450',
        title: 'Computer Security',
        description: 'Principles of computer security, cryptography basics, secure coding, and system hardening.',
        credits: 3,
        level: 'Undergraduate',
        prerequisites: ['CS230'],
        topics: ['Cryptography', 'Vulnerabilities', 'Secure design', 'Authentication'],
        durationWeeks: 12,
        img_url: 'https://picsum.photos/seed/CS450/300/160'
    },
    {
        id: '12',
        code: 'CS500',
        title: 'Advanced Topics in Computing (Graduate Seminar)',
        description: 'Rotating graduate-level topics covering advanced research areas such as distributed systems, deep learning, and formal methods.',
        credits: 3,
        level: 'Graduate',
        prerequisites: [],
        topics: ['Distributed systems', 'Deep learning', 'Formal verification', 'Research methods'],
        durationWeeks: 12,
        img_url: 'https://picsum.photos/seed/CS500/300/160'
    }
];

export default courses;