"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react'

interface TimelineItemProps {
  type: 'experience' | 'education'
  title: string
  subtitle: string
  duration: string
  location?: string
  achievements: string[]
  index: number
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  type,
  title,
  subtitle,
  duration,
  location,
  achievements,
  index
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative flex items-start gap-6 pb-8 last:pb-0"
    >
      {/* Timeline Line */}
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
          className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 border-2 border-primary"
        >
          {type === 'experience' ? (
            <Briefcase className="h-5 w-5 text-primary" />
          ) : (
            <GraduationCap className="h-5 w-5 text-primary" />
          )}
        </motion.div>
        
        {/* Connecting Line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
          className="w-0.5 bg-gradient-to-b from-primary to-primary/30 origin-top"
          style={{ height: '100%', minHeight: '80px' }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
        className="flex-1 group"
      >
        <div className="bg-card/50 backdrop-blur-sm border border-border/60 rounded-lg p-6 transition-all duration-300 hover:bg-card/70 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
          <div className="space-y-3">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <p className="text-lg text-muted-foreground font-medium">
                {subtitle}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{duration}</span>
              </div>
              {location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              {achievements.map((achievement, achievementIndex) => (
                <motion.div
                  key={achievementIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.2 + 0.4 + achievementIndex * 0.1 
                  }}
                  className="flex items-start gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/80 mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {achievement}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const experienceData = [
    {
      type: 'experience' as const,
      title: 'Senior Software Engineer',
      subtitle: 'TechCorp Solutions',
      duration: '2022 - Present',
      location: 'San Francisco, CA',
      achievements: [
        'Led development of microservices architecture serving 10M+ daily active users',
        'Implemented CI/CD pipeline reducing deployment time by 75%',
        'Mentored 5 junior developers and conducted technical interviews',
        'Collaborated with product team to deliver 15+ features ahead of schedule'
      ]
    },
    {
      type: 'experience' as const,
      title: 'Full Stack Developer',
      subtitle: 'InnovateTech Startup',
      duration: '2020 - 2022',
      location: 'Remote',
      achievements: [
        'Built responsive web applications using React, Node.js, and PostgreSQL',
        'Optimized application performance resulting in 40% faster load times',
        'Integrated third-party APIs and payment processing systems',
        'Participated in agile development cycles and code reviews'
      ]
    },
    {
      type: 'experience' as const,
      title: 'Frontend Developer',
      subtitle: 'Digital Agency Pro',
      duration: '2019 - 2020',
      location: 'Los Angeles, CA',
      achievements: [
        'Developed pixel-perfect websites for 20+ clients across various industries',
        'Implemented modern JavaScript frameworks and responsive design principles',
        'Collaborated with designers and project managers to deliver projects on time',
        'Maintained and updated existing client websites and applications'
      ]
    }
  ]

  const educationData = [
    {
      type: 'education' as const,
      title: 'Master of Science in Computer Science',
      subtitle: 'Stanford University',
      duration: '2017 - 2019',
      location: 'Palo Alto, CA',
      achievements: [
        'Specialized in Machine Learning and Artificial Intelligence',
        'Thesis: "Deep Learning Applications in Natural Language Processing"',
        'Teaching Assistant for Advanced Algorithms course',
        'GPA: 3.8/4.0'
      ]
    },
    {
      type: 'education' as const,
      title: 'Bachelor of Science in Software Engineering',
      subtitle: 'University of California, Berkeley',
      duration: '2013 - 2017',
      location: 'Berkeley, CA',
      achievements: [
        'Magna Cum Laude graduate with focus on Software Development',
        'President of Computer Science Student Association',
        'Led team in National Collegiate Programming Contest',
        'GPA: 3.7/4.0'
      ]
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-background"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A journey through my career milestones and educational achievements
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-8 flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-primary" />
              Work Experience
            </h3>
            
            <div className="relative">
              {experienceData.map((item, index) => (
                <TimelineItem
                  key={index}
                  {...item}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-8 flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-primary" />
              Education
            </h3>
            
            <div className="relative">
              {educationData.map((item, index) => (
                <TimelineItem
                  key={index}
                  {...item}
                  index={index + experienceData.length}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection