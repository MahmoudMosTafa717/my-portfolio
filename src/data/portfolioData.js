export const PROFILE_DATA = {
  name: "Mahmoud Mostafa Saber",
  role: "Software Engineer | Full-Stack Web Developer",
  titles: [
    "Full-Stack Web Developer",
    "MERN Stack Developer",
    "React & Angular Developer",
    "AI-Powered Applications Developer",
    "Software Engineer"
  ],
  intro: "Computer Science graduate (2025) and trainee at ITI 9-month Professional Diploma, Smart Village branch (Web & UI Development Track), passionate about building scalable web applications and AI-powered solutions. Seeking opportunities to contribute as a Full-Stack Software Engineer while continuously growing technical expertise in modern web technologies.",
  stats: [
    { label: "Projects Built", value: "20+" },
    { label: "Technologies Used", value: "15+" },
    { label: "Years of Learning", value: "4" },
    { label: "Certifications", value: "3" },
  ],
  contact: {
    phone: "(+20) 106 159 8031",
    email: "mhmodmostafa127@gmail.com",
    location: "Giza, Egypt",
    linkedin: "https://linkedin.com/in/mahmoud-mostafa-saber",
    github: "https://github.com/MahmoudMosTafa717"
  }
};

export const SKILLS_DATA = [
  {
    category: "Frontend",
    items: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "React.js", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Angular", icon: "angular" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Bootstrap", icon: "bootstrap" },
      { name: "UI/UX Design Principles", icon: "uiux" }
    ]
  },
  {
    category: "State Management & Data Fetching",
    items: [
      { name: "Redux Toolkit", icon: "redux" },
      { name: "Zustand", icon: "zustand" },
      { name: "TanStack Query (React Query)", icon: "reactquery" },
      { name: "NgRx", icon: "angular" },
      { name: "RxJS", icon: "reactivex" }
    ]
  },
  {
    category: "Backend & Databases",
    items: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express.js", icon: "express" },
      { name: "REST APIs", icon: "api" },
      { name: "JWT Authentication", icon: "jwt" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Mongoose", icon: "mongoose" },
      { name: "SQL", icon: "sql" }
    ]
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Postman", icon: "postman" },
      { name: "Docker", icon: "docker" },
      { name: "Slack", icon: "slack" },
      { name: "Jira", icon: "jira" },
      { name: "Trello", icon: "trello" },
      { name: "VS Code", icon: "vscode" },
      { name: "Vite", icon: "vite" },
      { name: "Vercel", icon: "vercel" },
      { name: "Cloudflare Pages", icon: "cloudflare" }
    ]
  },
  {
    category: "Agentic AI & LLMs",
    items: [
      { name: "LLM Integration", icon: "llm" },
      { name: "Fine Tuning", icon: "finetuning" },
      { name: "Prompt Engineering", icon: "prompt" },
      { name: "RAG Systems", icon: "rag" },
      { name: "Vector Databases", icon: "vectordb" }
    ]
  },
  {
    category: "Software Engineering",
    items: [
      { name: "OOP", icon: "oop" },
      { name: "Data Structures & Algorithms", icon: "dsa" },
      { name: "Agile Methodology", icon: "agile" },
      { name: "Software Architecture Fundamentals", icon: "architecture" }
    ]
  }
];

export const PROJECTS_DATA = [
  {
    id: 1,
    title: "DiagnoTech",
    description: "Built a MERN web application for AI-powered healthcare, symptom analysis, and doctor-patient matching. Improved disease prediction accuracy by ~20% through model selection and hyperparameter tuning, integrated via a Flask API.",
    image: "/images/projects/diagnotech.png",
    tags: ["React", "Node.js", "MongoDB", "Flask", "Machine Learning"],
    github: "https://github.com/MahmoudMosTafa717/0009-DaignoTech-Project",
    demo: "https://diagnotech-frontend.vercel.app/"
  },
  {
    id: 2,
    title: "Naqla",
    description: "AI-Powered Recruitment Platform that automates CV parsing, candidate screening, and profile evaluation using generative AI and Pinecone vector search.",
    image: "/images/projects/naqla.png",
    tags: ["React", "Vite", "Node.js", "Redis", "BullMQ", "Pinecone"],
    github: "https://github.com/orgs/RecruitAIApp/repositories",
    demo: "https://naqla-recruiter.vercel.app/"
  },
  {
    id: 3,
    title: "Finance Tracker",
    description: "Full-stack finance management application with core financial workflows including transaction tracking, recurring transactions, analytics, and reporting.",
    image: "/images/projects/finance.png",
    tags: ["Angular", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/MahmoudMosTafa717/finance-tracker-pro",
    demo: "https://mohamedwael21.github.io/finance-tracker-pro/#/dashboard"
  },
  {
    id: 4,
    title: "ShopWave",
    description: "A modern e-commerce platform with robust product management, user authentication, and seamless checkout experience.",
    image: "/images/projects/shopwave.png",
    tags: ["React", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/MahmoudMosTafa717/ShopWave",
    demo: "https://shop-wave-three-nu.vercel.app/"
  }
];

export const EXPERIENCE_DATA = [
  {
    id: 1,
    role: "Node.js Backend Development Internship",
    company: "Web Masters",
    period: "07/2025 – 09/2025",
    points: [
      "Developed RESTful APIs and real-time features using Socket.IO.",
      "Collaborated with a team on databases and backend services for multiple web applications."
    ]
  },
  {
    id: 2,
    role: "Programming Instructor",
    company: "iSchool",
    period: "07/2025 – 08/2025",
    points: [
      "Delivered programming, Python, and introductory machine learning sessions to students aged 6–18 across multiple learning modules."
    ]
  },
  {
    id: 3,
    role: "Full-Stack AI Code Reviewer",
    company: "Outlier (Freelance)",
    period: "11/2024 – 04/2025",
    points: [
      "Reviewed and evaluated 50+ LLM-generated frontend and backend coding tasks.",
      "Identified issues and provided technical feedback to improve AI model reasoning, code quality, and overall performance."
    ]
  },
  {
    id: 4,
    role: "IT Specialist Summer Training",
    company: "EELU",
    period: "07/2024 – 09/2024",
    points: [
      "Gained foundational experience in networking, device configuration, and IT infrastructure management."
    ]
  }
];

export const EDUCATION_DATA = [
  {
    id: 1,
    degree: "Professional Diploma in Web & UI Development",
    institution: "Information Technology Institute (ITI), Smart Village",
    period: "10/2025 – Present",
    details: "9-Month Professional Training Program in Web & User Interface Development Track."
  },
  {
    id: 2,
    degree: "B.Sc. Computers and Information Technology",
    institution: "The Egyptian E-Learning University (EELU)",
    period: "09/2021 – 06/2025",
    details: "GPA: 3.45 / 4.0 (Very Good with Honors). Graduation Project Grade: Excellent."
  }
];
