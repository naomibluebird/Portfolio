import { useEffect, useRef, useState } from "react";
import "./App.css";

/* =========================
   PROJECT DATA
========================= */

const projects = [
  {
    name: "JobConnect",
    type: "Full-stack recruitment platform",
    status: "Completed",
    desc: "A recruitment platform designed around the job search and hiring workflow, connecting employers with candidates through job listings and applications.",
    problem:
      "The goal is to simplify the process of discovering opportunities and managing applications for both candidates and employers.",
    features: [
      "Job listing and search",
      "Candidate applications",
      "Employer job management",
      "Responsive user interface",
      "Application workflow",
    ],
    tags: ["React", "JavaScript", "PHP", "MySQL"],
    role: "Full-stack developer",
  },

  {
    name: "Student Focus",
    type: "Productivity application",
    status: "In development",
    desc: "A student productivity application designed to help users organize tasks, schedules, notes, and focused study sessions.",
    problem:
      "Students often have several deadlines, classes, and tasks competing for their attention. Student Focus brings those activities into one simple workspace.",
    features: [
      "Task management",
      "Weekly schedule",
      "Focus timer",
      "Notes",
      "Local data persistence",
      "Urgency and deadline indicators",
    ],
    tags: ["React", "JavaScript", "CSS", "Browser storage"],
    role: "Frontend developer",
  },

  {
    name: "Booking System",
    type: "Booking management application",
    status: "Completed",
    desc: "A web application designed around scheduling, booking forms, data management, and user workflows.",
    problem:
      "Manual booking processes can make scheduling difficult to manage. This project explores a more structured digital booking workflow.",
    features: [
      "Booking forms",
      "Schedule management",
      "Data management",
      "User input validation",
      "CRUD functionality",
    ],
    tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    role: "Full-stack developer",
  },

  {
    name: "Service Marketplace",
    type: "Multi-user service platform",
    status: "Completed",
    desc: "A service marketplace concept focused on connecting customers with service providers through listings, profiles, and request workflows.",
    problem:
      "The platform explores how customers and service providers can discover each other and interact through a structured online marketplace.",
    features: [
      "Service listings",
      "User workflows",
      "Provider profiles",
      "Request management",
      "Responsive interface",
    ],
    tags: ["React", "JavaScript", "CSS"],
    role: "Full-stack developer",
  },
];

/* =========================
   SKILLS
========================= */

const skillGroups = {
  frontend: {
    label: "Frontend",
    description:
      "Building responsive interfaces and interactive user experiences.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Bootstrap"],
  },

  backend: {
    label: "Backend",
    description:
      "Working with application logic, databases, and server-side functionality.",
    skills: ["PHP", "MySQL", "Node.js", "Express.js", "REST APIs"],
  },

  tools: {
    label: "Tools & Platforms",
    description: "Tools I use to build, manage, and deploy web applications.",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Firebase"],
  },
};

/* =========================
   CERTIFICATES
   (folder name must match public/Certificates exactly)
========================= */

const certificates = [
  {
    title: "Full-Stack Development",
    image: "/Certificates/full-stack-development.jpg",
  },
  {
    title: "Systems Demonstration Support",
    image: "/Certificates/ait-certificate.jpg",
  },
];

/* =========================
   NAV
========================= */

const navSections = ["work", "about", "skills", "certificates"];

/* =========================
   APP
========================= */

function App() {
  const [openProject, setOpenProject] = useState(null);
  const [activeTab, setActiveTab] = useState("frontend");
  const [flippedCerts, setFlippedCerts] = useState({});
  const [activeSection, setActiveSection] = useState("home");

  const tabBtnRefs = useRef({});
  const underlineRef = useRef(null);

  /* SKILLS TAB UNDERLINE */

  useEffect(() => {
    const btn = tabBtnRefs.current[activeTab];

    if (btn && underlineRef.current) {
      underlineRef.current.style.width = `${btn.offsetWidth}px`;
      underlineRef.current.style.transform = `translateX(${btn.offsetLeft}px)`;
    }
  }, [activeTab]);

  /* NAV ACTIVE SECTION
     "home" is observed too, so no nav link is highlighted
     while the hero is on screen. */

  useEffect(() => {
    const ids = ["home", ...navSections];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  /* PROJECT ACCORDION */

  const toggleProject = (index) => {
    setOpenProject((current) => (current === index ? null : index));
  };

  /* CERTIFICATE FLIP */

  const toggleCertFlip = (index) => {
    setFlippedCerts((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
  };

  return (
    <div className="portfolio">
      {/* NAVIGATION */}

      <nav className="top">
        <div className="wrap navbar">
          <div className="logo">
            Nahomi<span>.</span>
          </div>

          <div className="nav-links">
            {navSections.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeSection === id ? "active" : ""}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>

          <a href="#contact" className="nav-cta">
            Let's talk
          </a>
        </div>
      </nav>

      <main className="wrap">
        {/* HERO */}

        <section id="home" className="hero">
          <div className="hero-blob" />

          <div className="hero-inner">
            <p className="eyebrow">Available for remote freelance work</p>

            <h1>Full-stack developer building web apps that are easy to use.</h1>

            <p className="lede">
              I'm a Computer Science graduate who builds with React, PHP and
              MySQL. My projects include a recruitment platform, a booking
              system, and a student productivity app.
            </p>

            <div className="btn-row">
              <a href="#work" className="btn primary">
                View my work
              </a>

              <a href="#contact" className="btn ghost">
                Contact me
              </a>
            </div>
          </div>

          <div className="pill-row">
            {["React", "JavaScript", "PHP", "MySQL"].map((technology) => (
              <span key={technology} className="pill">
                {technology}
              </span>
            ))}
          </div>
        </section>

        {/* PROJECTS */}

        <section id="work" className="block">
          <div className="heading">
            <p className="eyebrow">Selected Work</p>

            <h2>Things I've built.</h2>

            <p>
              Real applications, experiments, and systems built around
              practical problems.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <button
                key={project.name}
                className={`project-row ${openProject === index ? "open" : ""}`}
                aria-expanded={openProject === index}
                onClick={() => toggleProject(index)}
              >
                <div className="project-row-top">
                  <span className="project-idx">0{index + 1}</span>

                  <div className="project-main">
                    <div className="project-title-line">
                      <h3>{project.name}</h3>

                      <span
                        className={`project-status ${
                          project.status === "Completed"
                            ? "completed"
                            : "development"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="project-type">{project.type}</p>
                  </div>

                  <span className="chevron">
                    {openProject === index ? "−" : "+"}
                  </span>
                </div>

                <div className="project-panel">
                  <div className="project-panel-inner">
                    <div className="project-detail-grid">
                      <div>
                        <span className="detail-label">THE PROJECT</span>
                        <p>{project.desc}</p>
                      </div>

                      <div>
                        <span className="detail-label">THE PROBLEM</span>
                        <p>{project.problem}</p>
                      </div>
                    </div>

                    <div className="feature-section">
                      <span className="detail-label">FEATURES</span>

                      <div className="feature-list">
                        {project.features.map((feature) => (
                          <span key={feature}>
                            <span>↗</span>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="project-bottom">
                      <div>
                        <span className="detail-label">TECH STACK</span>

                        <div className="tags">
                          {project.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="detail-label">MY ROLE</span>
                        <p className="role">{project.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ABOUT */}

        <section id="about" className="block">
          <div className="heading">
            <p className="eyebrow">About Me</p>

            <h2>Developer with a practical mindset.</h2>
          </div>

          <div className="about-grid">
            <div />

            <div>
              <p>
                I'm a Computer Science graduate and web developer who enjoys
                turning ideas into practical, easy-to-use applications.
              </p>

              <p>
                My projects have given me experience working with interfaces,
                user workflows, data management, dashboards, scheduling, and
                responsive web design.
              </p>

              <p>
                I'm interested in remote freelance and contract opportunities
                where I can contribute to real products, collaborate with a
                team, and continue growing as a developer.
              </p>
            </div>
          </div>

          <div className="about-highlights">
            <div className="about-card">
              <span>01</span>
              <h3>Problem Solver</h3>
              <p>
                I enjoy turning messy ideas into clear, usable application
                workflows.
              </p>
            </div>

            <div className="about-card">
              <span>02</span>
              <h3>User Focused</h3>
              <p>
                I care about making interfaces simple, responsive, and easy to
                understand.
              </p>
            </div>

            <div className="about-card">
              <span>03</span>
              <h3>Always Learning</h3>
              <p>
                Currently expanding my JavaScript stack with Node.js, Express,
                and modern APIs.
              </p>
            </div>
          </div>
        </section>

        {/* SKILLS */}

        <section id="skills" className="block">
          <div className="heading">
            <p className="eyebrow">Technical Skills</p>

            <h2>Tools I work with.</h2>
          </div>

          <div className="tabs">
            {Object.keys(skillGroups).map((tab) => (
              <button
                key={tab}
                ref={(element) => {
                  tabBtnRefs.current[tab] = element;
                }}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}

            <div className="tab-underline" ref={underlineRef} />
          </div>

          <div className="tab-panel active">
            <div className="skill-intro">
              <span className="skill-counter">
                0{Object.keys(skillGroups).indexOf(activeTab) + 1}
              </span>

              <div>
                <h3>{skillGroups[activeTab].label}</h3>
                <p>{skillGroups[activeTab].description}</p>
              </div>
            </div>

            <div className="skill-chips">
              {skillGroups[activeTab].skills.map((skill) => (
                <div className="skill-chip" key={skill}>
                  <span className="skill-dot" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATES */}

        <section id="certificates" className="block">
          <div className="heading">
            <p className="eyebrow">Certifications & Experience</p>

            <h2>Learning and real-world experience.</h2>

            <p>Hover or tap a card to view the certificate.</p>
          </div>

          <div className="cert-grid">
            {certificates.map((certificate, index) => (
              <div
                key={certificate.title}
                className={`cert-flip ${flippedCerts[index] ? "flipped" : ""}`}
                tabIndex={0}
                onClick={() => toggleCertFlip(index)}
              >
                <div className="cert-flip-inner">
                  <div className="cert-face cert-front">
                    <div className="cert-badge">🎓</div>

                    <div>
                      <h3>{certificate.title}</h3>
                      <p className="hint">Hover to view certificate →</p>
                    </div>
                  </div>

                  <div className="cert-face cert-back">
                    <img
                      src={certificate.image}
                      alt={`${certificate.title} certificate`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}

        <section id="contact" className="block">
          <div className="contact-box">
            <p className="eyebrow center">Get In Touch</p>

            <h2>
              Let's build
              <br />
              something useful.
            </h2>

            <p className="lede">
              I'm available for remote freelance and contract web development
              opportunities.
            </p>

            <div className="contact-grid">
              <div className="contact-item">
                <span>Email</span>

                <a href="mailto:naomiwondessen@gmail.com">
                  naomiwondessen@gmail.com
                </a>
              </div>

              <div className="contact-item">
                <span>Phone</span>

                <a href="tel:+251946331806">+251 946331806</a>
              </div>

              {/* Add GitHub / LinkedIn here once you have real links:

              <div className="contact-item">
                <span>GitHub</span>
                <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
                  github.com/yourusername
                </a>
              </div>
              */}
            </div>

            <div className="contact-buttons">
              <a href="mailto:naomiwondessen@gmail.com" className="btn primary">
                Send me an email →
              </a>

              <a href="tel:+251946331806" className="btn ghost">
                Call me
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap" />
    </div>
  );
}

export default App;
