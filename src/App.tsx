import { useState, useEffect } from "react"
import { ModeToggle } from "./components/mode-toggle"
import { ThemeProvider } from "./components/theme-provider"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail, Terminal, Globe, ExternalLink,
  Briefcase, Code2, ChevronRight, ChevronLeft
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

// Variants
const fadeInUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

// Background Orbs
const Background = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-background">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob animation-delay-4000"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
    </div>
  )
}

// Project Card Component with Slideshow
const ProjectCard = ({ project }: { project: any }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const rawInterval = import.meta.env.VITE_CAROUSEL_INTERVAL;
    const intervalTime = rawInterval !== undefined ? Number(rawInterval) : 5000;

    if (intervalTime <= 0 || project.images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % project.images.length);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [project.images.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % project.images.length);
  };
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <motion.div variants={fadeInUp} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden bg-card/40 backdrop-blur-xl border-border/40 shadow-2xl relative transition-all hover:border-primary/40 duration-500 rounded-[2rem] flex flex-col md:flex-row w-full group">
        {/* Slideshow Side */}
        <div className="relative w-full md:w-1/2 h-72 md:h-auto min-h-[300px] md:min-h-[400px] overflow-hidden bg-muted/5 flex items-center justify-center border-r border-border/10">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={project.images[currentImage]}
              className="absolute inset-0 m-auto w-[calc(100%-2.5rem)] h-[calc(100%-2.5rem)] object-contain rounded-xl drop-shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=600';
              }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-r from-background/5 to-transparent mix-blend-overlay z-10 pointer-events-none"></div>

          {project.images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <Button variant="secondary" size="icon" onClick={prevImage} className="rounded-full bg-background/50 hover:bg-background/90 backdrop-blur-md shadow-md border-0">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="secondary" size="icon" onClick={nextImage} className="rounded-full bg-background/50 hover:bg-background/90 backdrop-blur-md shadow-md border-0">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
          {/* Indicators */}
          {project.images.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
              {project.images.map((_: any, i: number) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImage ? "w-6 bg-primary" : "w-1.5 bg-primary/30"}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h3 className="text-3xl font-bold tracking-tight mb-4 text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            {project.name}
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t: string) => (
              <Badge key={t} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-0 font-medium px-3 py-1">
                {t}
              </Badge>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap gap-6 pt-6 border-t border-border/40">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                <Terminal className="h-5 w-5" /> Source Code
              </a>
            )}
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="h-5 w-5" /> Live Demo
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

  const projects = [
    {
      name: "LMS Platform",
      desc: "Comprehensive Learning Management System supporting advanced role-based access for students and instructors. Features include secure payments processing via Stripe, custom progress tracking, and optimized video delivery using MUX infrastructure.",
      tech: ["Next.js", "React", "TypeScript", "MongoDB", "Stripe", "MUX"],
      images: ["/lms/image-1.png", "/lms/image-2.png", "/lms/image-3.png", "/lms/image-4.png", "/lms/image-5.png", "/lms/image-6.png", "/lms/image-7.png"],
      links: {
        github: "https://github.com/Tanish0023/lms-platform",
        live: "https://lms-platform.tanishportfolio.in/"
      }
    },
    {
      name: "Event Finder",
      desc: "Modern Event Search Platform built with ReactJS for beautiful dynamic SSR event fetching. Seamlessly integrated with Ticketmaster API and Google Geolocation APIs for pinpoint accuracy. Supported by a robust Django backend.",
      tech: ["ReactJS", "Django REST", "Ticketmaster API"],
      images: ["/event-finder/image-1.png", "/event-finder/image-2.png", "/event-finder/image-3.png", "/event-finder/image-4.png"],
      links: {
        github: "https://github.com/Tanish0023/hotsprings-assignment",
        live: undefined
      }
    },
    {
      name: "Web Wallet",
      desc: "Fast, minimal Solana-based Wallet App guaranteeing secure storage of mnemonic phrases and key pairs. Embedded with custom faucet integration to seamlessly allow users to test receiving SOL on network.",
      tech: ["Next.js", "Tailwind CSS", "Solana", "Web3"],
      images: ["/wallet/image-1.png", "/wallet/image-2.png", "/wallet/image-3.png", "/wallet/image-4.png", "/wallet/image-5.png", "/wallet/image-6.png"],
      links: {
        github: "https://github.com/Tanish0023/DAPPs",
        live: "https://tanish-dapps.vercel.app/"
      }
    }
  ];

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Background />
      <div className="min-h-screen text-foreground selection:bg-primary/30 relative z-10 transition-colors duration-500 overflow-x-hidden">
        <ModeToggle />

        <main className="container mx-auto px-6 py-24 max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-32"
          >
            {/* Hero Section */}
            <motion.section variants={fadeInUp} className="flex flex-col items-center sm:items-start text-center sm:text-left pt-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8 p-1 rounded-full bg-gradient-to-r from-primary/50 to-purple-500/50 inline-block drop-shadow-lg"
              >
                <div className="rounded-full bg-background/90 backdrop-blur-xl px-6 py-2 text-sm font-medium tracking-wide border border-border/50">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                    Available for new opportunities ✨
                  </span>
                </div>
              </motion.div>

              <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-primary/80 drop-shadow-sm pb-2">
                Tanish Aggarwal
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl font-light mb-12">
                Full-stack developer experienced in building and scaling production-grade web applications using <span className="text-foreground font-medium">React, Next.js, and Django</span>, with a strong focus on performance optimization & clean architecture.
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                {[
                  { icon: Terminal, label: "GitHub", href: env.VITE_GITHUB_LINK },
                  { icon: Globe, label: "LinkedIn", href: env.VITE_LINKEDIN_LINK },
                  { icon: Code2, label: "Codolio", href: env.VITE_CODOLIO_LINK },
                  { icon: Mail, label: env.VITE_EMAIL || "Email", href: `mailto:${env.VITE_EMAIL}` },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={item.href} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card/50 backdrop-blur-md border border-border/50 hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/5 transition-all"
                  >
                    <item.icon className="h-4 w-4 text-primary" /> <span className="font-medium">{item.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.section>

            {/* Work Experience */}
            <motion.section variants={fadeInUp} className="space-y-10 relative">
              <div className="flex items-center gap-4 text-4xl font-bold tracking-tight">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary"><Briefcase className="h-8 w-8" /></div>
                Experience
              </div>

              <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Card className="overflow-hidden bg-card/40 backdrop-blur-xl border-border/40 shadow-2xl relative group transition-all hover:border-primary/40 duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <CardContent className="p-8 sm:p-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                      <div>
                        <h3 className="text-3xl font-bold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Hotspring</h3>
                        <p className="text-primary font-semibold text-lg mt-2">Full Stack Developer Intern</p>
                      </div>
                      <Badge variant="secondary" className="px-4 py-1.5 text-sm bg-secondary/80 backdrop-blur-md border border-border/50 shadow-sm leading-none h-fit">May 2025 – Present</Badge>
                    </div>
                    <ul className="space-y-4 text-muted-foreground relative z-10">
                      {[
                        "Optimized asset-heavy pages (rendering, pagination, filtering), reducing page load time by 35%.",
                        "Built asset filtering, conversion tracking, and UI state updates, improving user engagement by 25%.",
                        "Resolved data ingestion and production issues via server log analysis, reducing failures by 20%.",
                        "Improved application stability by fixing edge-case bugs and implementing proper error handling across frontend and backend.",
                        "Built and maintained production-ready full-stack features using React, TypeScript, Django, GraphQL, following CI/CD."
                      ].map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 group/item">
                          <ChevronRight className="h-5 w-5 text-primary/50 group-hover/item:text-primary shrink-0 mt-0.5 transition-colors" />
                          <span className="leading-relaxed text-base group-hover/item:text-foreground transition-colors">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.section>

            {/* Featured Projects (Slideshow Row Layout) */}
            <motion.section variants={fadeInUp} className="space-y-10">
              <div className="flex items-center gap-4 text-4xl font-bold tracking-tight">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary"><Code2 className="h-8 w-8" /></div>
                Featured Projects
              </div>

              <div className="flex flex-col gap-12">
                {projects.map((project, idx) => (
                  <ProjectCard key={idx} project={project} />
                ))}
              </div>
            </motion.section>

            {/* Skills */}
            <motion.section variants={fadeInUp} className="space-y-10">
              <div className="flex items-center gap-4 text-4xl font-bold tracking-tight">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary"><Terminal className="h-8 w-8" /></div>
                Technical Arsenal
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: "Languages", skills: ["JavaScript", "TypeScript", "Python", "Java", "C++"] },
                  { title: "Frameworks & Libraries", skills: ["React", "Next.js", "Node.js", "Express", "Django", "Tailwind CSS"] },
                  { title: "Databases", skills: ["MongoDB", "MySQL", "Prisma"] },
                  { title: "DevOps & Tools", skills: ["Git", "Docker", "Vercel", "AWS", "GraphQL"] },
                  { title: "Web3", skills: ["Foundry", "Solidity", "Ethers.js"] },
                  { title: "Soft Skills", skills: ["Problem Solving", "Team Collaboration", "Time Management"] }
                ].map((category, idx) => (
                  <motion.div key={idx} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Card className="bg-card/40 backdrop-blur-xl border-border/30 shadow-xl hover:border-primary/30 transition-all duration-300 hover:shadow-primary/5 rounded-3xl h-full">
                      <CardContent className="p-8">
                        <h4 className="text-xl font-bold mb-6 text-foreground tracking-tight">{category.title}</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="border-border/50 bg-background/50 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all text-sm py-1.5 px-3">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Footer */}
            <motion.footer variants={fadeInUp} className="text-center py-10 opacity-70">
              <Separator className="mb-8 border-border/40" />
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 font-medium tracking-wide">
                Built with React, Vite & Shadcn <ChevronRight className="h-4 w-4 text-primary" /> Tanish Aggarwal
              </p>
            </motion.footer>

          </motion.div>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
