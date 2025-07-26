"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Github, Linkedin, Mail, Send, CheckCircle, AlertCircle } from "lucide-react"

interface FloatingLabelInputProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
}

const FloatingLabelInput = ({ id, label, type = "text", value, onChange, error, required }: FloatingLabelInputProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value.length > 0
  const shouldFloat = isFocused || hasValue

  return (
    <div className="relative">
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`peer bg-secondary border-border focus:border-primary focus:ring-primary h-14 px-4 pt-6 pb-2 transition-all duration-300 ${
          error ? "border-destructive focus:border-destructive focus:ring-destructive" : ""
        }`}
        placeholder=""
        required={required}
      />
      <Label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          shouldFloat
            ? "top-2 text-xs text-muted-foreground"
            : "top-1/2 -translate-y-1/2 text-base text-muted-foreground"
        } ${isFocused && !error ? "text-primary" : ""} ${error ? "text-destructive" : ""}`}
      >
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1 mt-1 text-sm text-destructive"
        >
          <AlertCircle size={14} />
          {error}
        </motion.div>
      )}
    </div>
  )
}

interface FloatingLabelTextareaProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
}

const FloatingLabelTextarea = ({ id, label, value, onChange, error, required }: FloatingLabelTextareaProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value.length > 0
  const shouldFloat = isFocused || hasValue

  return (
    <div className="relative">
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`peer bg-secondary border-border focus:border-primary focus:ring-primary min-h-32 px-4 pt-6 pb-2 transition-all duration-300 resize-none ${
          error ? "border-destructive focus:border-destructive focus:ring-destructive" : ""
        }`}
        placeholder=""
        required={required}
      />
      <Label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          shouldFloat
            ? "top-2 text-xs text-muted-foreground"
            : "top-6 text-base text-muted-foreground"
        } ${isFocused && !error ? "text-primary" : ""} ${error ? "text-destructive" : ""}`}
      >
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1 mt-1 text-sm text-destructive"
        >
          <AlertCircle size={14} />
          {error}
        </motion.div>
      )}
    </div>
  )
}

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate form submission
      const response = await fetch("https://api.telegram.org/bot7699748085:AAHtc0VqyAMx0pvmHa0qzvbSPhUe01egoG4/sendMessage?chat_id=5060476669&text=" + encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`), {  
        method: "GET"
      });
      if(response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setErrors({})
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "http://github.com/geeky-hypertext629/",
      color: "hover:text-white"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/subham528/",
      color: "hover:text-blue-400"
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:subhamchandra222@gmail.com",
      color: "hover:text-primary"
    }
  ]

  return (
    <section ref={ref} className="relative py-24 bg-background overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Let's Build Something{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Amazing
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Let's discuss how we can work together to bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Send me a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <FloatingLabelInput
                  id="name"
                  label="Your Name"
                  value={formData.name}
                  onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                  error={errors.name}
                  required
                />

                <FloatingLabelInput
                  id="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                  error={errors.email}
                  required
                />

                <FloatingLabelTextarea
                  id="message"
                  label="Your Message"
                  value={formData.message}
                  onChange={(value) => setFormData(prev => ({ ...prev, message: value }))}
                  error={errors.message}
                  required
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all duration-300 group disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </motion.div>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Success/Error Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 text-green-400"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 text-destructive"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>Something went wrong. Please try again.</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Get in touch</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Response Time</h4>
                  <p className="text-muted-foreground">
                    I typically respond within 24 hours during business days.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Project Inquiries</h4>
                  <p className="text-muted-foreground">
                    Whether you need a new website, app development, or technical consultation, I'm here to help.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Collaboration</h4>
                  <p className="text-muted-foreground">
                    Open to interesting projects and partnerships. Let's create something amazing together.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Connect with me</h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`flex items-center justify-center w-12 h-12 bg-secondary border border-border rounded-lg text-muted-foreground transition-all duration-300 ${social.color} hover:border-primary hover:shadow-lg hover:shadow-primary/20 hover:scale-105`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}