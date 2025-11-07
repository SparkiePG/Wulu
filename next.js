'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUp, 
  ArrowDown, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  X, 
  Send,
  Menu,
  Star,
  Building,
  Users,
  TrendingUp
} from 'lucide-react';

const Page = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const awardsRef = useRef(null);
  const certificatesRef = useRef(null);

  // Close modals with Escape key (accessibility)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsContactOpen(false);
        setIsSubmitted(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when a modal is open
  useEffect(() => {
    const open = isContactOpen || isSubmitted;
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isContactOpen, isSubmitted]);

  // Initialize certificates position
  useEffect(() => {
    if (certificatesRef.current) {
      certificatesRef.current.scrollLeft = certificatesRef.current.scrollWidth;
    }
  }, []);

  // Handle awards and certificates animation
  useEffect(() => {
    let animationFrame;
    
    const animate = () => {
      if (isAnimating && awardsRef.current && certificatesRef.current) {
        // Awards: scroll right
        const awardsContainer = awardsRef.current;
        const maxA = awardsContainer.scrollWidth - awardsContainer.clientWidth;
        awardsContainer.scrollLeft =
          awardsContainer.scrollLeft >= maxA ? 0 : awardsContainer.scrollLeft + 0.5;

        // Certificates: scroll left
        const certsContainer = certificatesRef.current;
        certsContainer.scrollLeft =
          certsContainer.scrollLeft <= 0 ? certsContainer.scrollWidth : certsContainer.scrollLeft - 0.5;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isAnimating]);

  const toggleContact = () => {
    setIsContactOpen(!isContactOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Simplified email validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address.';
      isValid = false;
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsSubmitted(true);
        setFormData({ fullName: '', email: '', subject: '', message: '' });
        
        setTimeout(() => {
          setIsSubmitted(false);
          setIsContactOpen(false);
        }, 5000);
      } catch (error) {
        console.error('Submission error:', error);
        setFormErrors({ 
          submit: 'Failed to submit form. Please try again later.' 
        });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'services', 'awards', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Make scroll listener passive for smoother performance on mobile
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseDown = () => {
    setIsAnimating(false);
  };

  const handleMouseUp = () => {
    setIsAnimating(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const awards = [
    { title: "Real Estate Excellence Award" },
    { title: "Best Client Service 2023" },
    { title: "Top Property Deal 2022" },
    { title: "Innovation in Real Estate" },
    { title: "Customer Satisfaction Award" },
    { title: "Best Business Location Expert" }
  ];

  const certificates = [
    { title: "Certified Real Estate Professional" },
    { title: "Advanced Property Valuation" },
    { title: "Business Location Specialist" },
    { title: "Commercial Real Estate License" },
    { title: "Property Investment Consultant" },
    { title: "Real Estate Development Expert" }
  ];

  // Companies logos
  const companies = [
    { id: 1, name: 'Google', logo: 'https://placehold.co/120x80/white/333?text=Google' },
    { id: 2, name: 'Microsoft', logo: 'https://placehold.co/120x80/white/333?text=Microsoft' },
    { id: 3, name: 'Apple', logo: 'https://placehold.co/120x80/white/333?text=Apple' },
    { id: 4, name: 'Amazon', logo: 'https://placehold.co/120x80/white/333?text=Amazon' },
    { id: 5, name: 'Meta', logo: 'https://placehold.co/120x80/white/333?text=Meta' },
  ];

  const stats = [
    { number: '14+', label: 'Years Experience', icon: TrendingUp },
    { number: '500+', label: 'Properties Sold', icon: Building },
    { number: '200+', label: 'Happy Clients', icon: Users },
    { number: '98%', label: 'Client Satisfaction', icon: Star }
  ];

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { 
          display: none; 
        }
        .no-scrollbar { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `}</style>

      {/* Scroll to top button - only show when scrolled down */}
      {scrollPosition > 300 && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}

      {/* Navigation */}
      <motion.header 
        className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                DR
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                DGrealtor
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'services', label: 'Services' },
                { id: 'awards', label: 'Awards' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`font-medium transition-colors ${
                    activeSection === item.id 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                </motion.a>
              ))}
              <button
                onClick={toggleContact}
                className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                Contact
              </button>
            </nav>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-700"
              onClick={toggleMobileMenu}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-white border-t border-gray-200"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-4 space-y-3">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About' },
                  { id: 'services', label: 'Services' },
                  { id: 'awards', label: 'Awards' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block py-2 px-4 rounded-lg transition-colors ${
                      activeSection === item.id 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    toggleContact();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(https://files.catbox.moe/cs01wm.jpg)',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Looking for a new business Location?
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            I've got your back!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Properties
            </button>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/20 text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              Contact Us
            </button>
          </motion.div>
        </div>

        {/* Scroll down button */}
        <motion.button
          onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowDown className="w-6 h-6 text-white" />
        </motion.button>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">14+ Years of Real Estate Excellence</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                DGrealtor has been in the real estate business for over 14 years, serving some of the industry's most prominent businesses. 
                Our expertise in commercial real estate and business location consulting has helped countless clients find the perfect locations for their ventures.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                With our deep market knowledge and extensive network, we provide tailored solutions that align with your business goals and vision.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 blur-xl" />
              <img 
                src="https://placehold.co/600x400/e5e7eb/374151?text=Professional+Real+Estate" 
                alt="Professional Real Estate" 
                className="relative rounded-xl shadow-2xl object-cover w-full h-96"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Services
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Comprehensive real estate solutions for your business needs
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Commercial Real Estate", 
                desc: "Find the perfect commercial space for your business", 
                icon: <Building className="w-8 h-8 text-blue-600" /> 
              },
              { 
                title: "Business Location Consulting", 
                desc: "Expert advice on the best locations for your venture", 
                icon: <Award className="w-8 h-8 text-blue-600" /> 
              },
              { 
                title: "Property Investment", 
                desc: "Strategic investment opportunities in prime locations", 
                icon: <TrendingUp className="w-8 h-8 text-blue-600" /> 
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="mb-6 text-blue-600">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Certificates Section */}
      <section id="awards" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Awards & Certificates
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Recognition of our excellence in real estate
            </motion.p>
          </div>

          <div className="space-y-16">
            {/* Awards */}
            <div>
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Awards</h3>
              <motion.div 
                ref={awardsRef}
                className="flex overflow-x-auto no-scrollbar py-4 cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
              >
                {Array(2).fill(awards).flat().map((award, index) => (
                  <motion.div
                    key={`award-${index}`}
                    className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl shadow-lg min-w-[300px] mx-3"
                    whileHover={{ scale: 1.03 }}
                  >
                    <h4 className="text-xl font-bold mb-2">{award.title}</h4>
                    <p className="opacity-90">DGrealtor Excellence</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Certificates */}
            <div>
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Certificates</h3>
              <motion.div 
                ref={certificatesRef}
                className="flex overflow-x-auto no-scrollbar py-4 cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
              >
                {Array(2).fill(certificates).flat().map((cert, index) => (
                  <motion.div
                    key={`cert-${index}`}
                    className="flex-shrink-0 bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-xl shadow-lg min-w-[300px] mx-3"
                    whileHover={{ scale: 1.03 }}
                  >
                    <h4 className="text-xl font-bold mb-2">{cert.title}</h4>
                    <p className="opacity-90">Professional Certification</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Worked With */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Companies We've Worked With
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            {companies.map((company) => (
              <motion.div
                key={company.id}
                className="flex items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <img 
                  src={company.logo}
                  alt={company.name}
                  className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Get In Touch
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to find your perfect business location? Let's talk!
            </motion.p>
          </div>
          
          <motion.div
            className="bg-gray-50 rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                  {formErrors.fullName && <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter subject"
                />
                {formErrors.subject && <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your message"
                ></textarea>
                {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
              </div>
              
              {formErrors.submit && (
                <p className="text-red-500 text-sm">{formErrors.submit}</p>
              )}
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center"
              >
                <Send className="mr-2 h-5 w-5" /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Contact Panel */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="fixed inset-0 z-50 bg-black/50 flex items-start justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsContactOpen(false)}
          >
            <motion.div
              className="bg-white h-full w-full max-w-md p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 id="contact-title" className="text-2xl font-bold text-gray-800">Contact Me</h3>
                <button
                  onClick={toggleContact}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close contact form"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name *"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formErrors.fullName && <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>}
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email *"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>
                
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject *"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formErrors.subject && <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>}
                </div>
                
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Message *"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                  {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold text-sm transition-colors duration-300 flex items-center justify-center"
                >
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSubmitted(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 text-center max-w-md mx-auto shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 id="success-title" className="sr-only">Ticket Created</h3>
              <div className="text-6xl mb-4">🎫</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Ticket Created!</h3>
              <p className="text-gray-600 mb-4">You'll receive a message within 5-7 days</p>
              <img 
                src="https://media.giphy.com/media/l0HlG8vJXW0XzKZsI/giphy.gif" 
                alt="Success" 
                className="w-32 h-32 mx-auto rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer 
        className="relative bg-cover bg-center bg-no-repeat text-white py-16"
        style={{ backgroundImage: 'url(https://files.catbox.moe/oxiusk.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  DR
                </div>
                <h3 className="text-xl font-bold">DGrealtor</h3>
              </div>
              <p className="text-gray-200">
                Your trusted partner in commercial real estate and business location consulting.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About' },
                  { id: 'services', label: 'Services' },
                  { id: 'awards', label: 'Awards' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`} 
                      className="text-gray-200 hover:text-white transition-colors block py-1"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-gray-200">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 mt-1 text-blue-400" />
                  <span>info@dgrealtor.com</span>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 mt-1 text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-1 text-blue-400" />
                  <span>123 Business District, City, State</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-8 pt-8 text-center">
            <p className="text-gray-200">
              © {new Date().getFullYear()} DGrealtor. 14+ Years of experience in real estate excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
