"use client"

import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { 
  Code, 
  Database, 
  Cpu, 
  Server, 
  Brain,
  User,
  Calendar,
  MapPin,
  Sparkles,
  Trophy,
  Target
} from "lucide-react"

const skills = [
  {
    icon: Code,
    name: "JavaScript",
    description: "Modern ES6+ development with focus on clean, maintainable code",
    color: "from-yellow-400 to-orange-500",
    percentage: 95
  },
  {
    icon: Database,
    name: "Python",
    description: "Data science, automation, and backend development expertise",
    color: "from-blue-400 to-blue-600",
    percentage: 90
  },
  {
    icon: Cpu,
    name: "React",
    description: "Building dynamic user interfaces with hooks and modern patterns",
    color: "from-cyan-400 to-blue-500",
    percentage: 92
  },
  {
    icon: Server,
    name: "Node.js",
    description: "Server-side JavaScript and API development",
    color: "from-green-400 to-green-600",
    percentage: 88
  },
  {
    icon: Brain,
    name: "Machine Learning",
    description: "AI/ML algorithms, data analysis, and predictive modeling",
    color: "from-purple-400 to-purple-600",
    percentage: 85
  }
]

const timelineEvents = [
  {
    year: "2024",
    title: "Full Stack Developer",
    description: "Leading development of modern web applications",
    icon: Trophy
  },
  {
    year: "2023",
    title: "React Specialist",
    description: "Focused on frontend architecture and user experience",
    icon: Target
  },
  {
    year: "2022",
    title: "Software Engineer",
    description: "Started journey in professional software development",
    icon: Sparkles
  }
]

const achievements = [
  { number: "50+", label: "Projects Completed", icon: Trophy },
  { number: "5+", label: "Years Experience", icon: Calendar },
  { number: "20+", label: "Technologies Mastered", icon: Code },
  { number: "100%", label: "Client Satisfaction", icon: Target }
]

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        ...options
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [options])

  return [ref, isIntersecting] as const
}

const AnimatedProgressBar = ({ percentage, delay = 0 }: { percentage: number; delay?: number }) => {
  return (
    <div className="w-full bg-muted rounded-full h-1 mt-3 overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, delay, ease: "easeOut" }}
      />
    </div>
  )
}

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{
            y: [null, -20, 20, -20],
            opacity: [null, 0.8, 0.2, 0.8]
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  )
}

export default function AboutSection() {
  const [skillsRef, skillsInView] = useIntersectionObserver()
  const [timelineRef, timelineInView] = useIntersectionObserver()
  const [achievementsRef, achievementsInView] = useIntersectionObserver()

  return (
    <section className="bg-background py-24 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50" />
      <ParticleBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <User className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              About Me
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            I&apos;m a passionate full-stack developer with expertise in modern web technologies 
            and machine learning. I love crafting elegant solutions to complex problems and 
            building applications that make a real difference in people&apos;s lives.
          </motion.p>
        </div>

        {/* Professional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 mb-20"
        >
          <motion.div 
            className="flex items-center gap-3 text-muted-foreground"
            whileHover={{ scale: 1.05, color: "var(--color-primary)" }}
            transition={{ duration: 0.3 }}
          >
            <MapPin className="w-5 h-5 text-primary" />
            <span>San Francisco, CA</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3 text-muted-foreground"
            whileHover={{ scale: 1.05, color: "var(--color-primary)" }}
            transition={{ duration: 0.3 }}
          >
            <Calendar className="w-5 h-5 text-primary" />
            <span>5+ Years Experience</span>
          </motion.div>
        </motion.div>

        {/* Achievements */}
        <div ref={achievementsRef} className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-foreground"
          >
            Key Achievements
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  <achievement.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold text-foreground mb-2"
                  >
                    {achievement.number}
                  </motion.div>
                  <p className="text-muted-foreground text-sm">{achievement.label}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div ref={skillsRef} className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-foreground"
          >
            Technical Skills
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative bg-card border border-border rounded-lg p-6 h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
                >
                  {/* Animated Border on Hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                    initial={false}
                    animate={{ 
                      background: [
                        "linear-gradient(0deg, rgba(139,92,246,0.1), rgba(139,92,246,0.2), rgba(139,92,246,0.1))",
                        "linear-gradient(90deg, rgba(139,92,246,0.1), rgba(139,92,246,0.2), rgba(139,92,246,0.1))",
                        "linear-gradient(180deg, rgba(139,92,246,0.1), rgba(139,92,246,0.2), rgba(139,92,246,0.1))",
                        "linear-gradient(270deg, rgba(139,92,246,0.1), rgba(139,92,246,0.2), rgba(139,92,246,0.1))",
                        "linear-gradient(0deg, rgba(139,92,246,0.1), rgba(139,92,246,0.2), rgba(139,92,246,0.1))"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div 
                      className={`p-3 rounded-lg bg-gradient-to-r ${skill.color} text-white`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <skill.icon className="w-6 h-6" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {skill.name}
                      </h4>
                      <div className="text-sm text-muted-foreground">{skill.percentage}%</div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {skill.description}
                  </p>
                  
                  <AnimatedProgressBar percentage={skill.percentage} delay={index * 0.2} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Timeline */}
        <div ref={timelineRef} className="max-w-4xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-foreground"
          >
            Professional Journey
          </motion.h3>
          
          <div className="relative">
            {/* Animated Timeline Line */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
            
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                    >
                      <motion.div 
                        className="flex items-center gap-3 mb-3"
                        style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}
                      >
                        <event.icon className="w-5 h-5 text-primary" />
                        <div className="text-primary font-bold text-lg">{event.year}</div>
                      </motion.div>
                      <h4 className="text-xl font-semibold text-foreground mb-2">{event.title}</h4>
                      <p className="text-muted-foreground">{event.description}</p>
                    </motion.div>
                  </div>
                  
                  {/* Animated Timeline Node */}
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.5 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}