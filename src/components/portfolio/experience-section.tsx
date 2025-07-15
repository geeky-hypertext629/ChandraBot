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
      title: 'Frontend Developer Intern',
      subtitle: 'Skygoal Innova Technologies Pvt. Ltd',
      duration: '2024',
      location: 'Hyderabad, India',
      achievements: [
        'Developed multiple responsive pages customers page, bookings page, profile page, reports page and staff admin page using material ui, tailwind and react.',
        'Implemented form data handling using react hook form along with efficient form validation and user input management.',
        'Designed and implemented dashboard visualizations using Recharts, rendering dynamic data into Pie Charts, Bar Charts, and Line Charts for improved analytics',
        'Utilized React Data Table to display dynamic tabular data with pagination, filtering, and sorting for enhanced usability.'
      ]
    },
    {
      type: 'experience' as const,
      title: 'Backend Developer Intern',
      subtitle: 'Oriens Infotech Pvt. Ltd',
      duration: '2024',
      location: 'Remote',
      achievements: [
        'Developed multiple api routes for users, courses and certificates using Express.js and MongooseL',
        'Integrated multiple API routes into the frontend to enable seamless communication between client-side and server-side functionalities.',
        'AI aided chatbot to assist users with course recommendations and queries',
        'Plagiarism detection using AI to ensure content originality and integrity',
      ]
    },

  ]

  const educationData = [
    {
      type: 'education' as const,
      title: 'Bachelor of Technology in Computer Science and Engineering',
      subtitle: 'Techno Main Saltlake, Kolkata',
      duration: '2021 - 2025',
      location: 'Kolkata, India',
      achievements: [
        'Studied core subjects including Data Structures, Algorithms, Database Management Systems, and Networking',
        'Top 5 teams in the Smart India Hackathon oncampus round',
        '1st in Bits and Pieces Content Writing Competition',
        'CGPA: 8.5/10'
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