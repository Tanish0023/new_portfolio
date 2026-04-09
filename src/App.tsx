import { useState, useEffect } from "react"
import { ThemeProvider } from "./components/theme-provider"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail, Terminal, Globe, ExternalLink,
  Briefcase, Code2, ChevronRight, ChevronLeft, Fingerprint, Layers, Cpu, Loader2, GraduationCap
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Reusable Custom Animations
const fadeUp: any = {
  hidden: { opacity: 0, y: 40, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
}
const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}
const popIn: any = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

// Background Orbs
const Background = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-background">
      {/* Immersive cinematic background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,16,24,0)_0%,rgba(0,0,0,0.5)_100%)] z-[1]"></div>

      {/* Super glowing gradient backdrop */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/15 rounded-full mix-blend-screen filter blur-[120px] opacity-70 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/15 rounded-full mix-blend-screen filter blur-[120px] opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-blue-600/15 rounded-full mix-blend-screen filter blur-[120px] opacity-70 animate-blob animation-delay-4000"></div>

      {/* Sleek mesh overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-50 z-[2]"></div>
    </div>
  )
}

// Beautiful Floating Navbar
const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="px-6 py-3 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex gap-8 pointer-events-auto items-center">
        <a href="#experience" className="text-sm font-semibold text-white/60 hover:text-primary transition-all hover:scale-105 active:scale-95">Experience</a>
        <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
        <a href="#education" className="text-sm font-semibold text-white/60 hover:text-primary transition-all hover:scale-105 active:scale-95">Education</a>
        <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
        <a href="#projects" className="text-sm font-semibold text-white/60 hover:text-primary transition-all hover:scale-105 active:scale-95">Projects</a>
        <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
        <a href="#skills" className="text-sm font-semibold text-white/60 hover:text-primary transition-all hover:scale-105 active:scale-95">Skills</a>
      </div>
    </motion.nav>
  )
}

// Project Card Component
const ProjectCard = ({ project }: { project: any }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Preload next image
    const nextIdx = (currentImage + 1) % project.images.length;
    const img = new Image();
    img.src = project.images[nextIdx];
  }, [currentImage, project.images]);

  useEffect(() => {
    const rawInterval = import.meta.env.VITE_CAROUSEL_INTERVAL;
    const intervalTime = rawInterval !== undefined ? Number(rawInterval) : 5000;
    if (intervalTime <= 0 || project.images.length <= 1) return;

    const timer = setInterval(() => setCurrentImage((prev) => (prev + 1) % project.images.length), intervalTime);
    return () => clearInterval(timer);
  }, [project.images.length]);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % project.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUp}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden bg-card/20 backdrop-blur-2xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative transition-all hover:bg-card/30 duration-500 rounded-[2rem] flex flex-col md:flex-row w-full group">

        {/* Glow behind card on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

        {/* Slideshow Side */}
        <div className="relative w-full md:w-1/2 h-72 md:h-auto min-h-[300px] md:min-h-[420px] overflow-hidden bg-black/20 flex items-center justify-center border-r border-white/5 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/5 animate-pulse">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              )}
              <motion.img
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: loading ? 0 : 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                src={project.images[currentImage]}
                onLoad={() => setLoading(false)}
                className="w-[calc(100%-3rem)] h-[calc(100%-3rem)] object-contain rounded-xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 pointer-events-none"
                onError={(e) => {
                  setLoading(false);
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=600';
                }}
              />
            </motion.div>
          </AnimatePresence>

          {project.images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
              <Button variant="secondary" size="icon" onClick={prevImage} className="rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md border-0 h-12 w-12 shadow-xl hover:scale-110 transition-transform">
                <ChevronLeft className="h-6 w-6 ml-[-2px]" />
              </Button>
              <Button variant="secondary" size="icon" onClick={nextImage} className="rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md border-0 h-12 w-12 shadow-xl hover:scale-110 transition-transform">
                <ChevronRight className="h-6 w-6 mr-[-2px]" />
              </Button>
            </div>
          )}

          {/* Mac-style pagination dots */}
          {project.images.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
              <div className="flex bg-black/40 backdrop-blur-md px-3 py-2 rounded-full gap-2">
                {project.images.map((_: any, i: number) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImage ? "w-6 bg-primary" : "w-1.5 bg-white/40"}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-20">
          <h3 className="text-3xl font-extrabold tracking-tight mb-4 text-white group-hover:text-primary transition-colors duration-500">
            {project.name}
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 flex-1">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tech.map((t: string, i: number) => (
              <motion.div key={t} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.05 }} viewport={{ once: true }}>
                <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary hover:bg-primary/20 font-medium px-3 py-1 shadow-sm">
                  {t}
                </Badge>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noreferrer" className="group/link flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white transition-colors">
                <div className="p-2 rounded-full bg-white/5 group-hover/link:bg-white/10 transition-colors">
                  <Terminal className="h-4 w-4" />
                </div>
                Source Code
              </a>
            )}
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noreferrer" className="group/link flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white transition-colors">
                <div className="p-2 rounded-full bg-white/5 group-hover/link:bg-white/10 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </div>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function App() {
  const env = import.meta.env
  useEffect(() => {
    // Force dark mode strictly per user request
    document.documentElement.classList.add("dark");
  }, []);

  const projects = [
    {
      name: "Smart Recruitment System",
      desc: "Built an AI-powered recruitment platform with automated resume parsing and semantic candidate-job matching, reducing hiring time.",
      tech: ["React", "TypeScript", "GraphQL", "Django", "DRF", "PostgreSQL", "Redis", "Celery", "spaCy", "sentence-transformers"],
      images: ["/job/image-1.png", "/job/image-2.png", "/job/image-3.png", "/job/image-4.png", "/job/image-5.png", "/job/image-6.png", "/job/image-7.png", "/job/image-8.png", "/job/image-9.png"],
      links: { github: "https://github.com/Tanish0023/smart-recruitment", live: "https://job.tanishportfolio.in/" }
    },
    {
      name: "LMS Platform",
      desc: "Comprehensive Learning Management System supporting advanced role-based access for students and instructors. Features include secure payments processing via Stripe, custom progress tracking, and optimized video delivery using MUX infrastructure.",
      tech: ["Next.js", "React", "TypeScript", "MongoDB", "Stripe", "MUX"],
      images: ["/lms/image-1.png", "/lms/image-2.png", "/lms/image-3.png", "/lms/image-4.png", "/lms/image-5.png", "/lms/image-6.png", "/lms/image-7.png"],
      links: { github: "https://github.com/Tanish0023/lms-platform", live: "https://lms-platform.tanishportfolio.in/" }
    },
    {
      name: "Event Finder",
      desc: "Modern Event Search Platform built with ReactJS for beautiful dynamic SSR event fetching. Seamlessly integrated with Ticketmaster API and Google Geolocation APIs for pinpoint accuracy. Supported by a robust Django backend.",
      tech: ["ReactJS", "Django REST", "Ticketmaster API"],
      images: ["/event-finder/image-1.png", "/event-finder/image-2.png", "/event-finder/image-3.png", "/event-finder/image-4.png"],
      links: { github: "https://github.com/Tanish0023/hotsprings-assignment", live: undefined }
    },
    {
      name: "Web Wallet",
      desc: "Fast, minimal Solana-based Wallet App guaranteeing secure storage of mnemonic phrases and key pairs. Embedded with custom faucet integration to seamlessly allow users to test receiving SOL on network.",
      tech: ["Next.js", "Tailwind CSS", "Solana", "Web3"],
      images: ["/wallet/image-1.png", "/wallet/image-2.png", "/wallet/image-3.png", "/wallet/image-4.png", "/wallet/image-5.png", "/wallet/image-6.png"],
      links: { github: "https://github.com/Tanish0023/DAPPs", live: "https://tanish-dapps.vercel.app/" }
    }
  ];

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Background />
      <Navbar />

      <div className="min-h-screen text-foreground selection:bg-primary/30 relative z-10 transition-colors duration-500 overflow-x-hidden font-sans">

        <main className="container mx-auto px-6 pt-32 pb-24 max-w-6xl">

          {/* --- HERO SECTION --- */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center sm:items-start text-center sm:text-left pt-10 pb-32"
          >
            <motion.div variants={popIn} className="mb-10 rounded-full p-[1px] bg-gradient-to-r from-primary via-purple-500 to-blue-500 inline-block drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <div className="rounded-full bg-black/60 backdrop-blur-3xl px-6 py-2.5 text-sm font-semibold tracking-wide border border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                  Open to new opportunities
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-6xl sm:text-8xl lg:text-[7.5rem] font-[900] tracking-tighter mb-8 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] pb-2 leading-[0.95]"
            >
              Hello, I'm <br className="hidden sm:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x bg-[length:200%_auto] drop-shadow-[0_0_20px_rgba(168,85,247,0.3)] mt-5">
                Tanish Aggarwal.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl font-light mb-12">
              A Full-stack developer building scaling, production-grade web applications using <span className="text-white font-medium drop-shadow-md">React, Next.js, and Django</span>, with a profound focus on performance optimization & pristine architecture.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center sm:justify-start gap-5">
              {[
                { icon: Terminal, label: "GitHub", href: env.VITE_GITHUB_LINK },
                { icon: Globe, label: "LinkedIn", href: env.VITE_LINKEDIN_LINK },
                { icon: Code2, label: "Codolio", href: env.VITE_CODOLIO_LINK },
                { icon: Mail, label: env.VITE_EMAIL || "Email", href: `mailto:${env.VITE_EMAIL}` },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  href={item.href} target="_blank" rel="noreferrer"
                  className="group flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-primary/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300"
                >
                  <item.icon className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                  <span className="font-semibold text-white/90 group-hover:text-white transition-colors tracking-wide">{item.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.section>

          {/* --- WORK EXPERIENCE (TIMELINE) --- */}
          <section id="experience" className="space-y-16 pb-32 pt-10 scroll-m-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="flex flex-col gap-2">
              <div className="flex items-center gap-4 text-5xl font-extrabold tracking-tight text-white mb-2">
                <Briefcase className="h-10 w-10 text-primary" /> Experience
              </div>
              <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-primary to-transparent"></div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="relative pl-8 md:pl-0">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-white/10 to-transparent transform -translate-x-1/2"></div>
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-white/10 to-transparent"></div>

              {/* Timeline Item */}
              <div className="relative flex flex-col md:flex-row justify-between items-center w-full mb-8">
                {/* Left Side (Empty on Desktop, Dates on Mobile) */}
                <div className="hidden md:flex w-5/12 justify-end pr-12">
                  <div className="text-right">
                    <p className="text-3xl font-extrabold text-white">Hotspring</p>
                    <p className="text-primary font-medium mt-1">Full Stack Developer Intern</p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-[-37px] md:left-[50%] w-6 h-6 rounded-full bg-primary border-4 border-background transform md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>

                {/* Right Side (Content) */}
                <div className="w-full md:w-5/12 md:pl-12 pt-2 md:pt-0">
                  <div className="md:hidden mb-4">
                    <p className="text-3xl font-extrabold text-white">Hotspring</p>
                    <p className="text-primary font-medium mt-1">Full Stack Developer Intern</p>
                  </div>
                  <Badge variant="outline" className="mb-6 bg-white/5 backdrop-blur-md border-white/10 text-white/80 py-1.5 px-4 shadow-xl">May 2025 – Present</Badge>
                  <Card className="bg-card/20 backdrop-blur-xl border-white/10 shadow-2xl hover:border-primary/30 transition-colors duration-500 rounded-3xl">
                    <CardContent className="p-8">
                      <ul className="space-y-5 text-muted-foreground">
                        {[
                          "Optimized asset-heavy pages (rendering, pagination, filtering), reducing page load time by 35%.",
                          "Built asset filtering, conversion tracking, and UI state updates, improving user engagement by 25%.",
                          "Resolved data ingestion and production issues via server log analysis, reducing failures by 20%.",
                          "Improved application stability by fixing edge-case bugs and implementing proper error handling across frontend and backend."
                        ].map((bullet, i) => (
                          <li key={i} className="flex items-start gap-4 group/item">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 group-hover/item:bg-primary group-hover/item:scale-150 transition-all shrink-0"></div>
                            <span className="leading-relaxed text-base group-hover/item:text-white transition-colors">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </section>

          {/* --- EDUCATION --- */}
          <section id="education" className="space-y-16 pb-32 pt-10 scroll-m-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="flex flex-col gap-2">
              <div className="flex items-center gap-4 text-5xl font-extrabold tracking-tight text-white mb-2">
                <GraduationCap className="h-10 w-10 text-primary" /> Education
              </div>
              <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-primary to-transparent"></div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="relative pl-8 md:pl-0">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-white/10 to-transparent transform -translate-x-1/2"></div>
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-white/10 to-transparent"></div>

              {/* Timeline Item (B.Tech) */}
              <div className="relative flex flex-col md:flex-row justify-between items-center w-full mb-16">
                {/* Left Side */}
                <div className="hidden md:flex w-5/12 justify-end pr-12">
                  <div className="text-right">
                    <p className="text-3xl font-extrabold text-white">Sharda University</p>
                    <p className="text-primary font-medium mt-1">B.Tech. in CSE</p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-[-37px] md:left-[50%] w-6 h-6 rounded-full bg-primary border-4 border-background transform md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>

                {/* Right Side */}
                <div className="w-full md:w-5/12 md:pl-12 pt-2 md:pt-0">
                  <div className="md:hidden mb-4">
                    <p className="text-3xl font-extrabold text-white">Sharda University</p>
                    <p className="text-primary font-medium mt-1">B.Tech. in CSE</p>
                  </div>
                  <Badge variant="outline" className="mb-6 bg-white/5 backdrop-blur-md border-white/10 text-white/80 py-1.5 px-4 shadow-xl">2023 – 2027</Badge>
                  <Card className="bg-card/20 backdrop-blur-xl border-white/10 shadow-2xl hover:border-primary/30 transition-colors duration-500 rounded-3xl">
                    <CardContent className="p-8">
                      <p className="text-muted-foreground leading-relaxed text-base italic">Specializing in Computer Science and Engineering with a strong focus on core technical concepts and modern development practices.</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary px-3 py-1 text-sm font-bold">GPA: 8.89</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Timeline Item (12th) */}
              <div className="relative flex flex-col md:flex-row justify-between items-center w-full mb-8">
                {/* Left Side (Empty for reverse timeline feel or just switch) */}
                <div className="hidden md:flex w-5/12 md:order-2 justify-start pl-12">
                  <div className="text-left">
                    <p className="text-3xl font-extrabold text-white">Class 12th</p>
                    <p className="text-primary font-medium mt-1">CBSE Board</p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-[-37px] md:left-[50%] w-6 h-6 rounded-full bg-primary border-4 border-background transform md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>

                {/* Right Side (Card on Left for desktop) */}
                <div className="w-full md:w-5/12 md:order-1 md:pr-12 pt-2 md:pt-0 text-left md:text-right">
                  <div className="md:hidden mb-4 text-left">
                    <p className="text-3xl font-extrabold text-white">Class 12th</p>
                    <p className="text-primary font-medium mt-1">CBSE Board</p>
                  </div>
                  <Badge variant="outline" className="mb-6 bg-white/5 backdrop-blur-md border-white/10 text-white/80 py-1.5 px-4 shadow-xl">2022 – 2023</Badge>
                  <Card className="bg-card/20 backdrop-blur-xl border-white/10 shadow-2xl hover:border-primary/30 transition-colors duration-500 rounded-3xl text-left">
                    <CardContent className="p-8">
                      <p className="text-muted-foreground leading-relaxed text-base italic">Completed senior secondary education with a focus on Science (PCM).</p>
                      <div className="mt-4 flex flex-wrap gap-2 md:justify-end">
                        <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary px-3 py-1 text-sm font-bold">Percentage: 93.8%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </section>

          {/* --- PROJECTS --- */}
          <section id="projects" className="space-y-16 pb-32 pt-10 scroll-m-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="flex flex-col gap-2">
              <div className="flex items-center gap-4 text-5xl font-extrabold tracking-tight text-white mb-2">
                <Fingerprint className="h-10 w-10 text-primary" /> Featured Projects
              </div>
              <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-primary to-transparent"></div>
            </motion.div>

            <div className="flex flex-col gap-16">
              {projects.map((project, idx) => (
                <ProjectCard key={idx} project={project} />
              ))}
            </div>
          </section>

          {/* --- SKILLS --- */}
          <section id="skills" className="space-y-16 pb-20 pt-10 scroll-m-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="flex flex-col gap-2">
              <div className="flex items-center gap-4 text-5xl font-extrabold tracking-tight text-white mb-2">
                <Cpu className="h-10 w-10 text-primary" /> Technical Arsenal
              </div>
              <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-primary to-transparent"></div>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Languages", icon: Code2, skills: ["JavaScript", "TypeScript", "Python", "Java", "C++"] },
                { title: "Frameworks", icon: Layers, skills: ["React", "Next.js", "Node.js", "Express", "Django", "DRF", "Tailwind CSS"] },
                { title: "Databases", icon: Cpu, skills: ["MongoDB", "MySQL", "Prisma", "PostgreSQL"] },
                { title: "DevOps & Cloud", icon: Terminal, skills: ["Git", "Docker", "Vercel", "AWS", "GraphQL"] },
                { title: "Web3", icon: Fingerprint, skills: ["Foundry", "Solidity", "Ethers.js", "Solana"] },
                { title: "Soft Skills", icon: Briefcase, skills: ["Problem Solving", "Team Collaboration", "Time Management"] }
              ].map((category, idx) => (
                <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={idx}>
                  <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-full">
                    <Card className="bg-card/20 backdrop-blur-xl border-white/10 shadow-xl hover:shadow-[0_10px_40px_rgba(168,85,247,0.15)] hover:border-primary/40 transition-all duration-500 rounded-3xl h-full group">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors text-white/70">
                            <category.icon className="h-5 w-5" />
                          </div>
                          <h4 className="text-xl font-bold text-white tracking-tight">{category.title}</h4>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                          {category.skills.map((skill) => (
                            <div key={skill} className="border border-white/10 bg-white/5 text-white/80 hover:text-white hover:border-primary/50 hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 text-sm py-2 px-4 rounded-xl cursor-default">
                              {skill}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* --- FOOTER --- */}
          <motion.footer initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center py-16 mt-20 relative">
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <p className="text-base text-white/50 flex justify-center items-center gap-2 font-medium tracking-wide">
              Built with precision & passion <ChevronRight className="h-4 w-4 text-primary mx-1" /> Tanish Aggarwal
            </p>
          </motion.footer>

        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
