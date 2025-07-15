"use client"

import { motion } from "motion/react"
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const textArray = ["Software Developer", "Full Stack Engineer", "Problem Solver", "Tech Enthusiast"]

  useEffect(() => {
    const targetText = textArray[currentIndex]
    let timeout: NodeJS.Timeout
    
    if (isTyping && currentText.length < targetText.length) {
      timeout = setTimeout(() => {
        setCurrentText(targetText.slice(0, currentText.length + 1))
      }, 100)
    } else if (isTyping && currentText.length === targetText.length) {
      timeout = setTimeout(() => {
        setIsTyping(false)
      }, 2000)
    } else if (!isTyping && currentText.length > 0) {
      timeout = setTimeout(() => {
        setCurrentText(currentText.slice(0, -1))
      }, 50)
    } else if (!isTyping && currentText.length === 0) {
      timeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % textArray.length)
        setIsTyping(true)
      }, 300)
    }

    return () => clearTimeout(timeout)
  }, [currentText, isTyping, currentIndex, textArray])

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@example.com", label: "Email" }
  ]

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-primary/10"
          animate={{ 
            background: [
              "radial-gradient(circle at 0% 0%, rgba(139,92,246,0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(139,92,246,0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 100%, rgba(139,92,246,0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 0%, rgba(139,92,246,0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, rgba(139,92,246,0.2) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [null, -20, 20, -20],
              x: [null, -10, 10, -10],
              opacity: [0.3, 0.8, 0.3, 0.8]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-foreground mb-2 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              John 
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-primary ml-4"
            >
              Doe
            </motion.span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl h-16 flex items-center justify-center mb-8"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-muted-foreground mr-2">I'm a</span>
            <span className="text-primary font-semibold border-r-2 border-primary pr-2 animate-pulse min-w-[300px] text-left">
              {currentText}
            </span>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Crafting exceptional digital experiences with modern technologies and innovative solutions.
          Let's build something amazing together.
        </motion.p>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex items-center justify-center gap-6 mb-16"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
            >
              <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
            </motion.a>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 animate-glow"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </motion.button>
          
          <motion.button
            className="px-8 py-4 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-muted-foreground hover:text-primary transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <ChevronDown size={32} />
        </motion.div>
        <motion.span 
          className="text-sm text-muted-foreground mt-2 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll to explore
        </motion.span>
      </motion.div>
    </div>
  )
}