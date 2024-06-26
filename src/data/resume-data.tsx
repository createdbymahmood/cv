import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Mahmood Bagheri",
  initials: "MB",
  location: "Worldwide",
  locationLink: "https://www.google.com",
  about:
    "Frontend Engineer focused on building products with extra attention to detail",
  summary:
    "Experienced Frontend Engineer with 5 years of expertise in building performant and scalable web applications using React and TypeScript. Passionate about crafting intuitive and engaging user interfaces that deliver exceptional user experiences. Proven ability to collaborate effectively within agile environments, translating complex requirements into elegant and maintainable code. Eager to contribute to innovative projects and continuously expand my skillset within the ever-evolving world of frontend development.",
  avatarUrl: "https://avatars.githubusercontent.com/u/40164360?v=4",
  contact: {
    email: "createdbymahmood@gmail.com",
    tel: "+989334319058",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/createdbymahmood",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/createdbymahmood",
        icon: LinkedInIcon,
      },
      {
        name: "X",
        url: "https://x.com/madebymahmood",
        icon: XIcon,
      },
    ],
  },
  education: [
    {
      school: "Azad university of Mashhad",
      degree: "Bachelor's Degree in Software Engineering",
      start: "2016",
      end: "2021",
    },
  ],
  work: [
    {
      company: "ATA Software Group",
      link: "https://heylama.com",
      badges: ["Part-Time"],
      title: "Technical Consultant",
      start: "Oct 2023",
      end: "Present",
      achievements: [
        "Provided comprehensive technical guidance in React and TypeScript, ensuring adherence to best practices and industry standards.",
        "Led the architectural design and implementation of complex frontend projects, driving the adoption of modern development frameworks and tools.",
        "Ensured code quality through rigorous code reviews, fostering a culture of clean, maintainable, and efficient code.",
        "Kept the team informed of the latest trends and advancements in frontend technologies, facilitating the continuous improvement of our development practices.",
        "Introduced and advocated for the adoption of new tools and methodologies, such as state management libraries, testing frameworks and build tools.",
      ],
    },
    {
      company: "Heylama",
      link: "https://heylama.com",
      badges: ["Full-Time", "Contract with Agileful"],
      title: "Frontend Engineer",
      start: "Jul 2021",
      end: "Sep 2023",
      achievements: [
        "Designed and implemented a scalable architecture for multiple frontend applications, resulting in a 30% reduction in maintenance costs.",
        "Implemented a design system based on Material UI which reduced the design and development time for new features by 30%, resulting in faster time-to-market.",
        "Developed over 200 Zeplin/Figma screens using React and TypeScript.",
        "Implemented code generator tools, resulting in a 90% reduction in the time it takes to generate React Query and API call code compared to manual coding.",
        "Refactored all Create-React-App based applications to Vite, which resulted in an 5x reduction in build time and a 30% increase in overall efficiency.",
        "Established clear communication channels and regular check-ins with team members resulting in increased productivity metrics by 15%.",
        "Organized regular team knowledge-sharing sessions that resulted in a significant improvement in team morale and a more productive and cohesive work environment.",
      ],
    },
    {
      company: "Agileful",
      link: "",
      badges: ["Full-Time", "Remote"],
      title: "Frontend Engineer",
      start: "Jan 2021",
      end: "Sep 2023",
      achievements: [
        "Primarily responsible for delivering 3 cutting edge client-side applications powered by React and TypeScript with a strong focus on user experience and performance.",
        "Improved the whole frontend chapter's productivity by building a React boilerplate; reduced products' development time by 10%.",
        "Upgraded frontend project’s build systems; Enhanced development environments speed up to 70% faster.",
        "Built, documented, and maintained reusable code using Storybook; Facilitated new developer’s onboarding by 10%.",
        "Enabled developers to focus more on complex programming tasks by eliminating the need for repetitive and mundane tasks.",
      ],
    },
    {
      company: "Rectified AI",
      link: "",
      badges: ["Full-Time", "Remote"],
      title: "Frontend Developer",
      start: "Sep 2019",
      end: "Jan 2021",
      achievements: [
        "Refactored a React app from class-flow based to TypeScript hook-based, resulting in a 20% reduction in the number of lines of code.",
        "Implemented a comprehensive testing framework using Cypress which caused detect and fix issues earlier in the development process, resulting in a 40% reduction in time spent on debugging and maintenance.",
        "Increased accessibility for non-native speakers through the implementation of i18n.",
        "Significantly decreased the number of errors introduced during manual coding, resulting in reduction of time required to generate Apollo client hooks from GraphQL specs by 90%.",
      ],
    },
    {
      company: "Freelance",
      link: "",
      badges: ["Full-Time"],
      title: "Frontend Developer",
      start: "May 2018",
      end: "Sep 2019",
      achievements: [
        "Developed responsive and optimized web applications using HTML, CSS, and JavaScript.",
        "Collaborated with clients to understand their business needs and translate them into functional front-end designs.",
        "Utilized frameworks and libraries such as Vue and JQuery to create interactive user interfaces and enhance user experience.",
        "Worked with back-end developers to integrate front-end functionality with server-side web application logic.",
      ],
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React/Next.js/Remix",
    "Node.js",
    "GraphQL",
    "SCSS/TailwindCSS/CSS-in-JS",
    "Test Driven Development",
    "Agile Methodologies/Scrum",
    "End-to-End Testing",
    "Mentorship",
    "PWA (Progressive Web Applications)",
    "CI/CD",
    "Git",
    "Webpack, Babel, Rollup",
    "CRA, Vite",
    "GraphQL, Apollo Client",
    "REST APIs, React Query, Orval",
    "ESLint, Prettier",
    "Workbox",
    "Material UI, Ant Design, TailwindCSS",
    "Styled-Components, Emotion, JSS",
    "Internationalization (i18next, React-Intl)",
    "Jest, Enzyme, React Testing Library, Cypress",
    "Storybook, Docz, Styleguidist",
    "Turborepo, NX, Lerna",
    "Redux, Zustand",
    "Formik, React Hook Form",
    "Github Actions",
  ],
  projects: [
    /*  {
      title: "Consultly",
      techStack: [
        "Side Project",
        "TypeScript",
        "Next.js",
        "Vite",
        "GraphQL",
        "WebRTC",
      ],
      description: "A platform to build and grow your online business",
      logo: ConsultlyLogo,
      link: {
        label: "consultly.com",
        href: "https://consultly.com/",
      },
    }, */
  ],
} as const;
