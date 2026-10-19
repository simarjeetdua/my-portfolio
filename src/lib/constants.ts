// Portfolio constants — personal info, projects, tech stack, etc.

export const PERSONAL_INFO = {
  name: "Simarjeet Singh Dua",
  firstName: "Simarjeet",
  role: "Full Stack Developer",
  tagline: "Building modern AI-powered web applications.",
  intro:
    "I'm a Computer Science undergraduate passionate about building scalable web applications, AI-powered products, and modern user experiences. I enjoy turning ideas into production-ready software while continuously learning new technologies.",
  email: "simarjeetdua@gmail.com",
  github: "https://github.com/simarjeetdua",
  linkedin: "https://www.linkedin.com/in/simarjeet-singh-dua-/",
  leetcode: "https://leetcode.com/u/simarjeetdua/",
  githubUsername: "simarjeetdua",
  leetcodeUsername: "simarjeetdua",
  college: "Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV)",
  degree: "B.Tech Computer Science",
  graduationYear: "2027",
  resumeUrl: "/resume.pdf",
};

export const STATS = [
  { value: "10+", label: "Projects Built" },
  { value: "20+", label: "Technologies" },
  { value: "2027", label: "B.Tech CSE" },
  { value: "Gen. Sec.", label: "Ameya Esports Club" },
];

export const ACHIEVEMENTS = [
  {
    emoji: "🏆",
    title: "10+ Full Stack Projects",
    description: "Built and shipped real-world full stack applications from idea to production.",
    color: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-500/30",
  },
  {
    emoji: "🤖",
    title: "AI-Powered Applications",
    description: "Built AI-powered apps using OpenAI, Gemini, Claude & LangChain with RAG pipelines.",
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/30",
  },
  {
    emoji: "🔐",
    title: "Secure Auth Systems",
    description: "Developed secure authentication systems using Clerk, JWT & Arcjet with rate limiting and bot protection.",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    emoji: "💳",
    title: "Payment Gateway Integration",
    description: "Integrated Razorpay & Cashfree payment gateways into production-ready applications.",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
  },
  {
    emoji: "☁️",
    title: "Cloud & DevOps Learning",
    description: "Currently learning AWS Cloud, Docker, CI/CD pipelines & System Design for scalable deployments.",
    color: "from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-500/30",
  },
  {
    emoji: "👨‍💼",
    title: "General Secretary – Ameya Esports Club",
    description: "Leading campus esports initiatives, organizing tournaments and managing club operations.",
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
  },
];

export const FEATURED_PROJECTS = [
  {
    id: "worklance",
    title: "WorkLance",
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
    techStack: [
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "OpenAI",
      "Clerk",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/simarjeetdua/WorkLance-AI-Powered-jobHunt",
    liveUrl: "https://work-lance-ai-powered-job-hunt.vercel.app/",
    color: "from-violet-600 to-blue-600",
    accentColor: "violet",
  },
  {
  id: "prepflow",
  title: "PrepFlow - AI-Powered Student Assessment Mock Test Platform",
  repoName: "PrepFlow-AI-Powered-Student-Assessment-Mock-Test-Platform",
  description:
    "An AI-powered student assessment platform that helps students practice mock tests, answer questions, track their performance, and review results through a centralized dashboard with an integrated AI assistant.",
  features: [
    "AI-powered study assistant",
    "Interactive mock tests",
    "Timed assessment sessions",
    "Student authentication",
    "Automated result tracking",
    "Performance dashboard",
    "AI-chat for study assistance",
  ],
  techStack: [
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mistral AI",
    "REST API",
  ],
  githubUrl:
    "https://github.com/simarjeetdua/PrepFlow-AI-Powered-Student-Assessment-Mock-Test-Platform",
  liveUrl: "#",
  color: "from-violet-600 to-blue-600",
  accentColor: "violet",
  status: "Deploying Very Soon",
},
  {
    id: "crm-application",
    title: "CRM Application",
    repoName: "CRM-Booking-System",
    description:
      "A full-stack Customer Relationship Management application for managing customers, leads, and business workflows through a centralized platform. Features secure authentication, RESTful APIs, database operations, and Razorpay payment gateway integration.",
    features: [
      "Customer & lead management",
      "User authentication & authorization",
      "CRUD operations & RESTful APIs",
      "Dashboard & data management",
      "Search & filtering",
      "Razorpay payment gateway",
      "Secure payment workflow",
      "Responsive frontend",
    ],
    techStack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Razorpay",
    ],
    highlight: "💳 Razorpay Integration",
    githubUrl: "https://github.com/simarjeetdua/CRM-Booking-System",
    liveUrl: "https://crm-booking-system.vercel.app/",
    color: "from-rose-600 to-orange-500",
    accentColor: "rose",
  },
  {
    id: "realtime-user-editor",
    title: "Real-Time User Editor",
    repoName: "docker-user-editor",
    description:
      "A real-time collaborative user editor with live content synchronization across connected clients. Dockerized and deployed to AWS using Amazon ECR and Amazon ECS — demonstrating production-grade cloud and DevOps capabilities.",
    features: [
      "Real-time collaborative editing",
      "Multi-user live synchronization",
      "Backend event handling",
      "User & session management",
      "Dockerized application",
      "AWS ECR container registry",
      "AWS ECS deployment",
      "Responsive interface",
    ],
    techStack: [
      "Node.js",
      "Express.js",
      "Socket.IO",
      "Docker",
      "AWS ECR",
      "AWS ECS",
    ],
    highlight: "☁️ AWS • Docker • ECR • ECS",
    githubUrl: "https://github.com/simarjeetdua/docker-user-editor",
    liveUrl: "http://docker-user-editor-alb-367699530.eu-north-1.elb.amazonaws.com/?username=simarjeet%20dua",
    color: "from-sky-600 to-indigo-600",
    accentColor: "sky",
  },
];

export const OTHER_PROJECTS = [
  {
    id: "restaurant",
    title: "Restaurant Management System",
    repoName: "Restaurant-Management-System",
    description:
      "A full-stack restaurant management system for handling orders, tables, menus, and staff operations efficiently.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB"],
    githubUrl: "https://github.com/simarjeetdua/Restaurant-Management-System",
    liveUrl: null,
    emoji: "🍽️",
  },
  {
    id: "crm-booking",
    title: "CRM Booking System",
    repoName: "CRM-Booking-System",
    description:
      "A customer relationship management platform with booking workflows, client tracking, and appointment scheduling.",
    techStack: ["React", "Node.js", "MongoDB", "Express.js"],
    githubUrl: "https://github.com/simarjeetdua/CRM-Booking-System",
    liveUrl: null,
    emoji: "📋",
  },
  {
    id: "ai-multi-chat",
    title: "AI Multi Chat App",
    repoName: "AI-Multi-Chat-App",
    description:
      "A multi-provider AI chat application supporting OpenAI, Gemini, and Claude in a unified premium interface.",
    techStack: ["Next.js", "OpenAI", "Gemini", "TypeScript"],
    githubUrl: "https://github.com/simarjeetdua/AI-Multi-Chat-App",
    liveUrl: null,
    emoji: "🤖",
  },
  {
    id: "blog-generator",
    title: "Blog Generator",
    repoName: "Blog-Generator",
    description:
      "AI-powered blog content generator that creates high-quality, SEO-optimized articles using modern LLMs.",
    techStack: ["Next.js", "OpenAI", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/simarjeetdua/Blog-Generator",
    liveUrl: null,
    emoji: "✍️",
  },
  {
    id: "face-auth",
    title: "Face Authentication App",
    repoName: "Face-Authentication-App",
    description:
      "Face recognition-based authentication system using computer vision for secure, password-free logins.",
    techStack: ["Python", "OpenCV", "React", "Node.js"],
    githubUrl: "https://github.com/simarjeetdua/Face-Authentication-App",
    liveUrl: null,
    emoji: "👁️",
  },
  {
    id: "code-locker",
    title: "Code Locker",
    repoName: "Code-Locker",
    description:
      "A secure code snippet manager with password protection, categories, and quick-access for developer workflows.",
    techStack: ["React", "Node.js", "MongoDB", "Express.js"],
    githubUrl: "https://github.com/simarjeetdua/Code-Locker",
    liveUrl: null,
    emoji: "🔐",
  },
  {
    id: "weather-app",
    title: "Weather Application",
    repoName: "Weather-Application",
    description:
      "A real-time weather application with location-based forecasts, hourly data, and a clean modern UI.",
    techStack: ["React", "JavaScript", "Weather API", "CSS"],
    githubUrl: "https://github.com/simarjeetdua/Weather-Application",
    liveUrl: null,
    emoji: "🌤️",
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    repoName: "my-portfolio",
    description:
      "This very portfolio — a premium developer portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/simarjeetdua/my-portfolio",
    liveUrl: null,
    emoji: "🌐",
  },
];

export const TECH_CATEGORIES = [
  {
    label: "Languages",
    items: [
      { name: "C++", icon: "⚙️", color: "#00599C" },
      { name: "Python", icon: "🐍", color: "#3776AB" },
      { name: "JavaScript", icon: "🟨", color: "#F7DF1E" },
      { name: "TypeScript", icon: "🔷", color: "#3178C6" },
      { name: "HTML", icon: "🌐", color: "#E34F26" },
      { name: "CSS", icon: "🎨", color: "#1572B6" },
      { name: "LaTeX", icon: "📄", color: "#008080" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React", icon: "⚛️", color: "#61DAFB" },
      { name: "Next.js", icon: "▲", color: "#FFFFFF" },
      { name: "Tailwind CSS", icon: "🎨", color: "#38BDF8" },
      { name: "shadcn/ui", icon: "🧩", color: "#A855F7" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", icon: "🟩", color: "#68A063" },
      { name: "Express.js", icon: "🚀", color: "#888888" },
      { name: "REST APIs", icon: "🔗", color: "#FF6C37" },
      { name: "JWT Auth", icon: "🔑", color: "#F7DF1E" },
      { name: "Password Hashing", icon: "🔒", color: "#6366F1" },
      { name: "RBAC", icon: "🛡️", color: "#EF4444" },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "MongoDB", icon: "🍃", color: "#47A248" },
      { name: "MySQL", icon: "🐬", color: "#4479A1" },
      { name: "PostgreSQL", icon: "🐘", color: "#336791" },
    ],
  },
  {
    label: "AI",
    items: [
      { name: "OpenAI API", icon: "🤖", color: "#412991" },
      { name: "Gemini API", icon: "✨", color: "#8B5CF6" },
      { name: "Claude API", icon: "🧠", color: "#D97706" },
      { name: "LangChain", icon: "🦜", color: "#1C3C3C" },
      { name: "Prompt Eng.", icon: "💬", color: "#A855F7" },
      { name: "RAG", icon: "🔍", color: "#3B82F6" },
    ],
  },
  {
    label: "Auth & Security",
    items: [
      { name: "Clerk", icon: "🔑", color: "#7C3AED" },
      { name: "JWT", icon: "🔐", color: "#F7DF1E" },
      { name: "Arcjet", icon: "🛡️", color: "#EF4444" },
      { name: "Protected Routes", icon: "🚧", color: "#6366F1" },
      { name: "Rate Limiting", icon: "⏱️", color: "#F59E0B" },
      { name: "Bot Protection", icon: "🤺", color: "#10B981" },
    ],
  },
  {
    label: "Payments",
    items: [
      { name: "Razorpay", icon: "💳", color: "#528FF0" },
      { name: "Cashfree", icon: "💰", color: "#00C853" },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "AWS", icon: "☁️", color: "#FF9900" },
      { name: "GCP", icon: "🌐", color: "#4285F4" },
      { name: "CI/CD", icon: "🔄", color: "#2088FF" },
    ],
  },
  {
    label: "Dev Tools",
    items: [
      { name: "Git", icon: "🌿", color: "#F05032" },
      { name: "GitHub", icon: "🐙", color: "#FFFFFF" },
      { name: "VS Code", icon: "💙", color: "#007ACC" },
      { name: "Postman", icon: "📬", color: "#FF6C37" },
      { name: "Cloudinary", icon: "🖼️", color: "#3448C5" },
      { name: "Inngest", icon: "⚡", color: "#A855F7" },
      { name: "Jira", icon: "📋", color: "#0052CC" },
    ],
  },
];

export const EXPLORING_ITEMS = [
  {
    emoji: "☁️",
    title: "AWS Cloud",
    description:
      "Learning cloud infrastructure, deployment, storage, networking, and scalable architectures on Amazon Web Services.",
    color: "from-orange-500/20 to-yellow-500/20",
    borderColor: "border-orange-500/30",
  },
  {
    emoji: "🐳",
    title: "Docker",
    description:
      "Containerizing applications for consistent development environments and seamless deployment across platforms.",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    emoji: "⚡",
    title: "System Design",
    description:
      "Exploring scalable software architectures, distributed systems, caching strategies, and high-availability design.",
    color: "from-yellow-500/20 to-amber-500/20",
    borderColor: "border-yellow-500/30",
  },
  {
    emoji: "🤖",
    title: "AI Agents",
    description:
      "Building autonomous AI agents with tool-calling, memory, and multi-step reasoning using LangChain and LLM APIs.",
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
  },
  {
    emoji: "🧠",
    title: "Large Language Models",
    description:
      "Diving deep into LLM internals, fine-tuning, RAG pipelines, and building intelligent AI-powered features.",
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
  },
  {
    emoji: "🚀",
    title: "CI/CD",
    description:
      "Learning automated deployment workflows, GitHub Actions, continuous integration, and DevOps best practices.",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
  },
];

export const NAV_ITEMS = [
  { label: "Home", href: "#home", emoji: "🏠" },
  { label: "About", href: "#about", emoji: "👨" },
  { label: "Projects", href: "#projects", emoji: "🚀" },
  { label: "Tech Stack", href: "#tech-stack", emoji: "🛠" },
  { label: "Exploring", href: "#exploring", emoji: "🌱" },
  { label: "LeetCode", href: "#leetcode", emoji: "🧩" },
  { label: "Contact", href: "#contact", emoji: "📬" },
];

export const COMMAND_ITEMS = [
  { label: "Go to Home", action: "scroll", target: "#home", shortcut: "H" },
  { label: "Go to About", action: "scroll", target: "#about", shortcut: "A" },
  { label: "Go to Projects", action: "scroll", target: "#projects", shortcut: "P" },
  { label: "Go to Tech Stack", action: "scroll", target: "#tech-stack", shortcut: "T" },
  { label: "Go to LeetCode", action: "scroll", target: "#leetcode", shortcut: "L" },
  { label: "Go to Contact", action: "scroll", target: "#contact", shortcut: "C" },
  { label: "Open GitHub Profile", action: "link", target: "https://github.com/simarjeetdua", shortcut: "⌘G" },
  { label: "Open LinkedIn", action: "link", target: "https://www.linkedin.com/in/simarjeet-singh-dua-/", shortcut: "⌘L" },
  { label: "Download Resume", action: "download", target: "/resume.pdf", shortcut: "⌘R" },
  { label: "Send Email", action: "link", target: "mailto:simarjeetdua@gmail.com", shortcut: "⌘E" },
];
