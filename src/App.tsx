import { ModeToggle } from "./components/mode-toggle"
import { ThemeProvider } from "./components/theme-provider"
import { motion } from "framer-motion"
import {
  Mail, Phone, MapPin, Terminal, Globe, ExternalLink,
  GraduationCap, Briefcase, Trophy, Code2
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const STAGGER = {
  visible: { transition: { staggerChildren: 0.1 } }
}

function App() {
  const env = import.meta.env

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
        <ModeToggle />

        {/* Hero Background Elements */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-50 blur-[100px]"></div>
        </div>

        <main className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER}
            className="space-y-12"
          >
            {/* Header Section */}
            <motion.header variants={FADE_UP} className="space-y-6 text-center sm:text-left">
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-2">
                  Tanish Aggarwal
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  Full-stack developer experienced in building and scaling production-grade web applications using React, Next.js, and Django, with a strong focus on performance optimization and clean architecture.
                </p>
              </div>

              {/* Contact Links */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                <a href={env.VITE_GITHUB_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Terminal className="h-4 w-4" /> GitHub
                </a>
                <a href={env.VITE_LINKEDIN_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Globe className="h-4 w-4" /> LinkedIn
                </a>
                <a href={env.VITE_CODOLIO_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Code2 className="h-4 w-4" /> Codolio
                </a>
                <a href={`mailto:${env.VITE_EMAIL}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4" /> {env.VITE_EMAIL || "Email"}
                </a>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" /> {env.VITE_PHONE || "+91 8448026140"}
                </span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> New Delhi, India
                </span>
              </div>
            </motion.header>

            <Separator className="bg-border/50" />

            {/* Work Experience */}
            <motion.section variants={FADE_UP} className="space-y-6">
              <div className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                <Briefcase className="h-6 w-6 text-primary" /> Work Experience
              </div>

              <div className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm transition-all hover:shadow-md hover:border-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">Hotspring</h3>
                        <p className="text-muted-foreground">Full Stack Developer Intern</p>
                      </div>
                      <Badge variant="secondary" className="w-fit">May 2025 – Present</Badge>
                    </div>
                    <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
                      <li>Optimized asset-heavy pages (rendering, pagination, filtering), reducing page load time by <strong className="text-foreground">35%</strong>.</li>
                      <li>Built asset filtering, conversion tracking, and UI state updates, improving user engagement by <strong className="text-foreground">25%</strong>.</li>
                      <li>Resolved data ingestion and production issues via server log analysis, reducing failures by <strong className="text-foreground">20%</strong>.</li>
                      <li>Improved application stability by fixing edge-case bugs and implementing proper error handling across frontend and backend.</li>
                      <li>Built and maintained production-ready full-stack features using <strong className="text-foreground">React, TypeScript, Django, GraphQL</strong>, following CI/CD and code review best practices.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.section>

            {/* Education */}
            <motion.section variants={FADE_UP} className="space-y-6">
              <div className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                <GraduationCap className="h-6 w-6 text-primary" /> Education
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg leading-tight mb-1">B.Tech. in Computer Science and Engineering</h3>
                    <p className="text-muted-foreground text-sm mb-4">Sharda University</p>
                    <div className="flex justify-between items-center text-sm">
                      <Badge variant="outline">2023 - 2027</Badge>
                      <span className="font-medium">GPA: 8.89</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg leading-tight mb-1">Class 12th CBSE Board</h3>
                    <p className="text-muted-foreground text-sm mb-4">&nbsp;</p>
                    <div className="flex justify-between items-center text-sm">
                      <Badge variant="outline">2022 - 2023</Badge>
                      <span className="font-medium">93.8%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.section>

            {/* Projects */}
            <motion.section variants={FADE_UP} className="space-y-6">
              <div className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                <Code2 className="h-6 w-6 text-primary" /> Projects
              </div>

              <div className="grid gap-6">
                {[
                  {
                    name: "LMS Platform",
                    desc: "Learning Management System",
                    tech: "Next.js, React, TypeScript, Tailwind CSS, MongoDB, Stripe, MUX",
                    points: [
                      "Built a full-stack LMS supporting role-based access for students and instructors.",
                      "Implemented course creation, progress tracking, and secure payments via Stripe.",
                      "Optimized video delivery using MUX, reducing buffering and improving playback performance."
                    ]
                  },
                  {
                    name: "Event Finder",
                    desc: "Event Search Platform",
                    tech: "ReactJS, Django REST Framework, Ticketmaster API, Google Geolocation",
                    points: [
                      "Built a web app to search and view events by location.",
                      "Used ReactJS for SSR and dynamic event fetching; backend built with Django REST Framework."
                    ]
                  },
                  {
                    name: "Web Wallet",
                    desc: "Solana-based Wallet App",
                    tech: "Next.js, Tailwind CSS, Solana",
                    points: [
                      "Integrated Solana blockchain to enable users to receive SOL via a custom-built faucet.",
                      "Designed a seamless UI and ensured secure storage of mnemonic phrases.",
                      "Developed a Web Wallet to generate mnemonic phrases and key pairs."
                    ]
                  }
                ].map((project, idx) => (
                  <Card key={idx} className="bg-card/50 backdrop-blur-sm border-border/50 transition-all hover:shadow-md hover:border-border group">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-semibold flex items-center gap-2">
                            {project.name}
                            <a href="#" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary" />
                            </a>
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{project.desc}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary hover:bg-primary/20">{project.tech.split(", ")[0]}</Badge>
                      </div>
                      <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-muted-foreground">
                        {project.points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.split(", ").slice(1).map(t => (
                          <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.section>

            {/* Leadership & Achievements */}
            <motion.section variants={FADE_UP} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                  <Trophy className="h-6 w-6 text-primary" /> Leadership
                </div>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg">Tech Lead, Xe-Tech Club</h3>
                      <p className="text-sm text-muted-foreground">Sharda University • 2025 - Present</p>
                    </div>
                    <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-muted-foreground">
                      <li>Facilitated peer-to-peer learning sessions to strengthen coding and problem-solving skills.</li>
                      <li>Guided juniors in project building, tech stacks, and best practices in software development.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                  <Trophy className="h-6 w-6 text-primary" /> Achievements
                </div>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full">
                  <CardContent className="p-6 flex flex-col justify-center">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                        <Trophy className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Finalist at a National-Level Hackathon</h3>
                        <p className="text-sm text-muted-foreground">
                          Led development as Tech Lead, managing backend and blockchain integration in 2025.
                        </p>
                        <a href="#" className="text-primary text-sm inline-flex items-center gap-1 mt-2 hover:underline">
                          View Certificate <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.section>

            {/* Skills */}
            <motion.section variants={FADE_UP} className="space-y-6">
              <div className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                <Code2 className="h-6 w-6 text-primary" /> Technical Skills
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Programming Languages", skills: ["JavaScript", "TypeScript", "Python", "Java", "C++"] },
                  { title: "Frameworks & Libraries", skills: ["React", "Next.js", "Node.js", "Express.js", "Django", "DRF", "Tailwind CSS"] },
                  { title: "Databases", skills: ["MongoDB", "MySQL", "Prisma"] },
                  { title: "Tools & Platforms", skills: ["Git", "GitHub", "CI/CD", "Docker", "Vercel", "AWS", "GraphQL"] },
                  { title: "Web3 Technologies", skills: ["Foundry", "Solidity", "Ethers.js"] },
                  { title: "Soft Skills", skills: ["Problem Solving", "Communication", "Team Collaboration"] }
                ].map((category, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">{category.title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-secondary/50 hover:bg-secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

          </motion.div>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
