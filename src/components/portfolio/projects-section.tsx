"use client"

import { useState } from 'react'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import type { Variants } from 'framer-motion'
import { ExternalLink, Github, Code, Palette, Server, Smartphone, Globe, Database, Folder, Star } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce platform with payment integration, inventory management, and real-time analytics dashboard.",
    image: "/api/placeholder/400/250",
    techStack: ["React", "Nodejs", "MongoDB", "Stripe", "Tailwind CSS","Cloudinary"],
    liveUrl: "https://superb-pie-58d2c9.netlify.app/",
    sourceUrl: "https://github.com/geeky-hypertext629/Ecommerce",
    category: "Full Stack",
    featured: true
  },
  {
    id: 2,
    title: "Swift-Pay",
    description: "Online payment gateway with secure transactions, user authentication, and transaction history. Send and receive payments instantly",
    image: "/api/placeholder/400/250",
    techStack: ["Next", "Typescript", "Prisma", "Postgresql","AWS EC2","Docker"],
    liveUrl: "https://chat.example.com",
    sourceUrl: "https://github.com/example/ai-chat",
    category: "AI/ML",
    featured: true
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "An AI powered chatbot integrated into a portfolio website, providing personalized assistance, booking appointments and providing information to visitors.",
    image: "/api/placeholder/400/250",
    techStack: ["Next.js", "Vapi", "Make.com", "lucide react"],
    liveUrl: "#",
    sourceUrl: "https://github.com/geeky-hypertext629/ChandraBot",
    category: "Frontend",
    featured: false
  },
  {
    id: 4,
    title: "Airline Ticket Booking System",
    description: "A Flight Booking System API built on Microservices architecture containing Flights and Search Service, Auth Service, Booking Service and Reminder Service where users can search and book different flights.",
    image: "/api/placeholder/400/250",
    techStack: ["Express.js", "RabbitMQ", "JWT", "Microservices", "MySQL"],
    liveUrl: "https://github.com/geeky-hypertext629/API_GATEWAY_AIRLINE",
    sourceUrl: "https://github.com/geeky-hypertext629/API_GATEWAY_AIRLINE",
    category: "Backend",
    featured: false
  },
  {
    id: 5,
    title: "Smart Route Planner",
    description: "This project integrates real-time pollution data with route planning, providing users with the best routes based on air quality. It uses prediction ensemble model trained using XGBoost to predict the pollution level of different routes for navigation",
    image: "/api/placeholder/400/250",
    techStack: ["Google Colab", "Pandas", "Matplotlib", "Mapbox", "Vite", "Python", "Digital Ocean"],
    liveUrl: "https://srp-pollution-integrated.vercel.app/",
    sourceUrl: "https://github.com/geeky-hypertext629/SRP-pollution-integrated",
    category: "AI/ML",
    featured: false
  },
  {
    id: 6,
    title: "VisualSense",
    description: "AI Image processor - compress image, remove background, generate cool images, perform image transformations all in one platform using cloudinary.",
    image: "/api/placeholder/400/250",
    techStack: ["Cloudinary", "Next.js", "Clerk", "Zod", "MongoDB","Stripe", "lucide-react"],
    liveUrl: "https://github.com/geeky-hypertext629/VisualSense",
    sourceUrl: "https://visual-sense.vercel.app/",
    category: "AI/ML",
    featured: true
  }
]

const techStackIcons = {
  "Next.js": Code,
  "React": Code,
  "Vue.js": Code,
  "TypeScript": Code,
  "JavaScript": Code,
  "Node.js": Server,
  "Python": Code,
  "Django": Server,
  "PostgreSQL": Database,
  "MongoDB": Database,
  "Firebase": Database,
  "Tailwind CSS": Palette,
  "CSS3": Palette,
  "Material-UI": Palette,
  "Bootstrap": Palette,
  "Socket.io": Globe,
  "OpenAI API": Code,
  "OpenWeather API": Globe,
  "Stripe": Code,
  "Chart.js": Code,
  "D3.js": Code,
  "Framer Motion": Code,
  "Redux": Code
}

const categories = ["All", "Full Stack", "Frontend", "AI/ML", "Data Science"]

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Folder className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Featured Projects
            </h2>
          </motion.div>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            A showcase of my recent work spanning web development, mobile apps, and full-stack solutions.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              variants={itemVariants}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <motion.div
                className="bg-card border border-border rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-out h-full"
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 } 
                }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <motion.div
                    className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground rounded-full p-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <Star className="w-4 h-4" />
                  </motion.div>
                )}

                {/* Project Image */}
                <div className="relative h-48 bg-muted overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"
                    animate={{ 
                      background: hoveredProject === project.id 
                        ? "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(139,92,246,0.1))"
                        : "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.05))"
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-primary rounded-full"
                        initial={{ 
                          x: Math.random() * 400,
                          y: Math.random() * 200,
                          scale: Math.random() * 0.5 + 0.5
                        }}
                        animate={{
                          y: [null, -10, 10, -10],
                          opacity: [0.3, 0.8, 0.3, 0.8]
                        }}
                        transition={{
                          duration: Math.random() * 4 + 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: Math.random() * 2
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="text-6xl text-primary/30"
                      animate={{ 
                        scale: hoveredProject === project.id ? 1.2 : 1,
                        rotate: hoveredProject === project.id ? 5 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Code />
                    </motion.div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: hoveredProject === project.id ? 0 : 20, opacity: hoveredProject === project.id ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </motion.a>
                    <motion.a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: hoveredProject === project.id ? 0 : 20, opacity: hoveredProject === project.id ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <Github className="h-4 w-4" />
                      Source
                    </motion.a>
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-1">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map((tech) => {
                      const IconComponent = techStackIcons[tech as keyof typeof techStackIcons] || Code
                      return (
                        <motion.div
                          key={tech}
                          className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground border border-border"
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "var(--color-primary)",
                            color: "var(--color-primary-foreground)",
                            borderColor: "var(--color-primary)"
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <IconComponent className="h-3 w-3" />
                          {tech}
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  initial={{ background: "transparent" }}
                  animate={{
                    background: hoveredProject === project.id 
                      ? "linear-gradient(45deg, transparent, rgba(139,92,246,0.2), transparent)"
                      : "transparent"
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mt-16"
        >
          <motion.div
            className="bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-muted-foreground mb-6">
              Have a project in mind? I'd love to discuss how we can bring your ideas to life.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Smartphone className="h-4 w-4" />
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}