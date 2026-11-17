// Portfolio constants — personal info, projects, tech stack, etc.

export const PERSONAL_INFO = {
  name: "Simarjeet Singh Dua",
  firstName: "Simarjeet",
  role: "Full-Stack Developer",
  tagline: "Full-Stack Developer | Backend & Cloud Enthusiast | AI & Multi-Agent Systems",
  intro:
    "I build scalable web applications, backend systems, cloud-deployed services, and AI-powered products. Passionate about clean architecture, modern tooling, and continuous learning.",
  email: "simarjeetdua@gmail.com",
  github: "https://github.com/simarjeetdua",
  linkedin: "https://www.linkedin.com/in/simarjeet-singh-dua-/",
  leetcode: "https://leetcode.com/u/simarjeetdua/",
  githubUsername: "simarjeetdua",
  leetcodeUsername: "simarjeetdua",
  college: "Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV)",
  degree: "B.Tech Computer Science Engineering",
  graduationYear: "2027",
  resumeUrl: "/resume.pdf",
};

export const STATS = [
  { value: "10+", label: "Projects Built" },
  { value: "20+", label: "Technologies" },
  { value: "2027", label: "B.Tech CSE" },
  { value: "Gen. Sec.", label: "Ameya Esports Club" },
];

// icon: lucide icon name used in Achievements component
export const ACHIEVEMENTS = [
  {
    icon: "Layers",
    title: "10+ Full-Stack Projects",
    description:
      "Built and developed full-stack applications, implementing frontend interfaces, backend services, REST APIs, database integration, and deployment workflows.",
  },
  {
    icon: "BrainCircuit",
    title: "AI-Powered Applications",
    description:
      "Developing AI-powered applications using LLM integrations, LangChain, RAG concepts, MCP servers, and multi-agent orchestration workflows.",
  },
  {
    icon: "ShieldCheck",
    title: "Backend & Authentication Systems",
    description:
      "Implemented authentication and authorization using Clerk, JWT, and secure backend workflows with role-based access control.",
  },
  {
    icon: "CreditCard",
    title: "Payment Gateway Integration",
    description:
      "Integrated Razorpay and Cashfree payment gateways into full-stack production applications.",
  },
  {
    icon: "Cloud",
    title: "Cloud & DevOps Engineering",
    description:
      "Working with AWS, Docker, containerization, CI/CD workflows, and cloud deployment. Experience deploying containerized applications using Amazon ECR, ECS, and Application Load Balancer.",
  },
  {
    icon: "Users",
    title: "Leadership & Management",
    description:
      "General Secretary — Ameya Esports Club. Managing club activities, coordinating tournaments, and leading campus esports initiatives.",
  },
];

export const FEATURED_PROJECTS = [
  {
    id: "worklance",
    title: "WorkLance",
    subtitle: "AI-Powered Freelancing Platform",
    repoName: "WorkLance-AI-Powered-jobHunt",
    description:
      "AI-powered freelancing platform connecting clients and freelancers with smart matching, real-time messaging, project dashboards, and portfolio management.",
    features: [
      "AI-powered job matching",
      "Real-time messaging",
      "Client & freelancer dashboards",
      "Portfolio management",
      "Secure authentication",
      "Payment integration",
    ],
    techStack: ["Next.js", "React", "Node.js", "MongoDB", "OpenAI", "Clerk", "Tailwind CSS"],
    githubUrl: "https://github.com/simarjeetdua/WorkLance-AI-Powered-jobHunt",
    liveUrl: "https://work-lance-ai-powered-job-hunt.vercel.app/",
    accent: "indigo",
  },
  {
    id: "prepflow",
    title: "PrepFlow",
    subtitle: "AI-Powered Student Assessment Platform",
    repoName: "PrepFlow-AI-Powered-Student-Assessment-Mock-Test-Platform",
    description:
      "An AI-powered student assessment platform that enables students to practice mock tests, track performance, review results, and interact with an intelligent learning assistant.",
    features: [
      "AI-powered study assistant",
      "Interactive mock tests",
      "Timed assessment sessions",
      "Student authentication",
      "Automated result tracking",
      "Performance dashboard",
    ],
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Mistral AI", "REST APIs"],
    githubUrl:
      "https://github.com/simarjeetdua/PrepFlow-AI-Powered-Student-Assessment-Mock-Test-Platform",
    liveUrl: "https://prep-flow-ai-powered-student-assess.vercel.app/",
    accent: "blue",
  },
  {
    id: "crm-application",
    title: "CRM Application",
    subtitle: "Full-Stack CRM with Payment Integration",
    repoName: "CRM-Booking-System",
    description:
      "A full-stack Customer Relationship Management application for managing customers, leads, and business workflows. Features secure authentication, RESTful APIs, and Razorpay payment gateway integration.",
    features: [
      "Customer & lead management",
      "User authentication & authorization",
      "CRUD operations & RESTful APIs",
      "Dashboard & data management",
      "Search & filtering",
      "Razorpay payment gateway",
    ],
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Razorpay"],
    highlight: "Razorpay Integration",
    githubUrl: "https://github.com/simarjeetdua/CRM-Booking-System",
    liveUrl: "https://crm-booking-system.vercel.app/",
    accent: "violet",
  },
  {
    id: "realtime-user-editor",
    title: "Real-Time User Editor",
    subtitle: "Containerized & AWS-Deployed Collaboration Tool",
    repoName: "docker-user-editor",
    description:
      "A real-time collaborative user editor with live content synchronization across connected clients. Dockerized and deployed to AWS using Amazon ECR and ECS — demonstrating production-grade cloud and DevOps capabilities.",
    features: [
      "Real-time collaborative editing",
      "Multi-user live synchronization",
      "Backend event handling",
      "User & session management",
      "Dockerized application",
      "AWS ECR + ECS deployment",
    ],
    techStack: ["Node.js", "Express.js", "Socket.IO", "Docker", "AWS ECR", "AWS ECS"],
    highlight: "AWS · Docker · ECR · ECS",
    githubUrl: "https://github.com/simarjeetdua/docker-user-editor",
    liveUrl:
      "http://docker-user-editor-alb-367699530.eu-north-1.elb.amazonaws.com/?username=simarjeet%20dua",
    accent: "sky",
  },
];

export const TECH_CATEGORIES = [
  {
    label: "Languages",
    items: [
      { name: "C",          logo: "https://cdn.simpleicons.org/c/00599C" },
      { name: "C++",        logo: "https://cdn.simpleicons.org/cplusplus/00599C" },
      { name: "Python",     logo: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "HTML5",      logo: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "CSS3",       logo: "https://cdn.simpleicons.org/css3/1572B6" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React.js",      logo: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Next.js",       logo: "https://cdn.simpleicons.org/nextdotjs/000000" },
      { name: "Tailwind CSS",  logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "shadcn/ui",     logo: "https://cdn.simpleicons.org/shadcnui/000000" },
      { name: "Framer Motion", logo: "https://cdn.simpleicons.org/framer/0055FF" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js",    logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "Express.js", logo: "https://cdn.simpleicons.org/express/000000" },
      { name: "REST APIs",  logo: "https://cdn.simpleicons.org/postman/FF6C37" },
      { name: "Socket.IO",  logo: "https://cdn.simpleicons.org/socketdotio/010101" },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "MySQL",   logo: "https://cdn.simpleicons.org/mysql/4479A1" },
    ],
  },
  {
    label: "AI & Agents",
    items: [
      { name: "Mistral AI",          logo: "https://cdn.simpleicons.org/mistral/FF7000" },
      { name: "OpenAI API",          logo: "https://cdn.simpleicons.org/openai/412991" },
      { name: "Google Gemini",       logo: "https://cdn.simpleicons.org/googlegemini/8E75B2" },
      { name: "LangChain",           logo: "https://cdn.simpleicons.org/langchain/1C3C3C" },
      { name: "RAG",                 logo: null, fallback: "🔍" },
      { name: "MCP Servers",         logo: null, fallback: "⚙️" },
      { name: "Multi-Agent Systems", logo: null, fallback: "🤖" },
      { name: "Prompt Engineering",  logo: null, fallback: "💬" },
    ],
  },
  {
    label: "Auth & Security",
    items: [
      { name: "Clerk", logo: "https://cdn.simpleicons.org/clerk/6C47FF" },
      { name: "JWT",   logo: "https://cdn.simpleicons.org/jsonwebtokens/000000" },
      { name: "bcrypt", logo: null, fallback: "🔐" },
      { name: "RBAC",   logo: null, fallback: "🛡️" },
    ],
  },
  {
    label: "Payments",
    items: [
      { name: "Razorpay", logo: "https://cdn.simpleicons.org/razorpay/528FF0" },
      { name: "Cashfree", logo: null, fallback: "💰" },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "AWS",         logo: "https://cdn.simpleicons.org/amazonaws/FF9900" },
      { name: "Docker",      logo: "https://cdn.simpleicons.org/docker/2496ED" },
      { name: "Amazon ECR",  logo: "https://cdn.simpleicons.org/amazonaws/FF9900" },
      { name: "Amazon ECS",  logo: "https://cdn.simpleicons.org/amazonaws/FF9900" },
      { name: "GitHub Actions", logo: "https://cdn.simpleicons.org/githubactions/2088FF" },
      { name: "CI/CD",       logo: null, fallback: "🔄" },
    ],
  },
  {
    label: "Dev Tools",
    items: [
      { name: "Git",        logo: "https://cdn.simpleicons.org/git/F05032" },
      { name: "GitHub",     logo: "https://cdn.simpleicons.org/github/181717" },
      { name: "VS Code",    logo: "https://cdn.simpleicons.org/visualstudiocode/007ACC" },
      { name: "Postman",    logo: "https://cdn.simpleicons.org/postman/FF6C37" },
      { name: "Cloudinary", logo: "https://cdn.simpleicons.org/cloudinary/3448C5" },
      { name: "Jira",       logo: "https://cdn.simpleicons.org/jira/0052CC" },
    ],
  },
];

export const EXPLORING_ITEMS = [
  {
    icon: "Cloud",
    title: "AWS Cloud Architecture",
    description:
      "Learning cloud infrastructure, services, networking, and scalable deployment patterns on Amazon Web Services.",
    status: "Active",
  },
  {
    icon: "Container",
    title: "Docker & Containerization",
    description:
      "Containerizing applications for consistent environments. Already deployed containerized apps using ECR and ECS.",
    status: "Applied in projects",
  },
  {
    icon: "Network",
    title: "System Design",
    description:
      "Exploring scalable software architectures, distributed systems, caching strategies, and high-availability design.",
    status: "Active",
  },
  {
    icon: "Server",
    title: "MCP Server Development",
    description:
      "Building Model Context Protocol servers that expose tools and resources to AI agents for real-world integrations.",
    status: "Active",
  },
  {
    icon: "BrainCircuit",
    title: "Multi-Agent AI Systems",
    description:
      "Designing multi-agent orchestration workflows where autonomous AI agents collaborate to complete complex tasks.",
    status: "Active",
  },
  {
    icon: "GitBranch",
    title: "CI/CD & DevOps",
    description:
      "Learning automated deployment workflows, GitHub Actions, continuous integration, and DevOps engineering practices.",
    status: "Active",
  },
];

export const NAV_ITEMS = [
  { label: "Home",        href: "#home" },
  { label: "About",       href: "#about" },
  { label: "Projects",    href: "#projects" },
  { label: "Tech Stack",  href: "#tech-stack" },
  { label: "Exploring",   href: "#exploring" },
  { label: "LeetCode",    href: "#leetcode" },
  { label: "Contact",     href: "#contact" },
];

export const COMMAND_ITEMS = [
  { label: "Go to Home",        action: "scroll", target: "#home",       shortcut: "H" },
  { label: "Go to About",       action: "scroll", target: "#about",      shortcut: "A" },
  { label: "Go to Projects",    action: "scroll", target: "#projects",   shortcut: "P" },
  { label: "Go to Tech Stack",  action: "scroll", target: "#tech-stack", shortcut: "T" },
  { label: "Go to LeetCode",    action: "scroll", target: "#leetcode",   shortcut: "L" },
  { label: "Go to Contact",     action: "scroll", target: "#contact",    shortcut: "C" },
  { label: "Open GitHub Profile", action: "link",   target: "https://github.com/simarjeetdua",                       shortcut: "⌘G" },
  { label: "Open LinkedIn",       action: "link",   target: "https://www.linkedin.com/in/simarjeet-singh-dua-/",     shortcut: "⌘L" },
  { label: "Download Resume",     action: "download", target: "/resume.pdf",                                         shortcut: "⌘R" },
  { label: "Send Email",          action: "link",   target: "mailto:simarjeetdua@gmail.com",                         shortcut: "⌘E" },
];

// kept for backward compat — no longer rendered
export const OTHER_PROJECTS: never[] = [];
