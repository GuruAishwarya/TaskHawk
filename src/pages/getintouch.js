import React, { useState } from 'react';
import './getintouch.css';

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "The interface is intuitive and their support team is always quick to respond to any questions.",
      name: "Emily",
      position: "Operations Director, GrowthLabs",
      avatar: "/emily-avatar.jpg"
    },
    {
      text: "TaskHawk has revolutionized how we manage our daily tasks and schedules.",
      name: "John",
      position: "Project Manager, TechCorp",
      avatar: "/john-avatar.jpg"
    },
    {
      text: "The productivity boost we've seen since implementing TaskHawk is incredible.",
      name: "Sarah",
      position: "Team Lead, InnovateLab",
      avatar: "/sarah-avatar.jpg"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // Auto-rotate testimonials
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="get-in-touch">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#4F46E5"/>
                <path d="M12 8L20 16L12 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>TaskHawk</span>
          </div>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/contact" className="active">Contact</a>
            <button className="login-btn">Login</button>
            <button className="signup-btn">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-circles">
            <div className="circle circle-left"></div>
            <div className="circle circle-right"></div>
            <div className="circle circle-small-left"></div>
            <div className="circle circle-small-right"></div>
          </div>
          <h1>Get In Touch</h1>
          <p>We're here to help with any questions about Task Hawk's scheduling capabilities</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon location-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="info-content">
                <h3>Our location</h3>
                <p>34, Ramakrishna street,<br />Anna nagar,<br />Chennai.</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon phone-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92V19.92C22 20.51 21.39 21 20.83 21C9.28 21 0 11.72 0 0.17C0 -0.39 0.49 -1 1.08 -1H4.08C4.67 -1 5.16 -0.51 5.16 0.08C5.16 1.58 5.35 3.05 5.72 4.47C5.84 4.9 5.7 5.36 5.35 5.71L3.9 7.16C5.51 10.06 7.94 12.49 10.84 14.1L12.29 12.65C12.64 12.3 13.1 12.16 13.53 12.28C14.95 12.65 16.42 12.84 17.92 12.84C18.51 12.84 19 13.33 19 13.92V16.92C19 17.51 18.51 18 17.92 18H22Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="info-content">
                <h3>Call Us</h3>
                <p>911-7904286945<br />Mon - Fri: 8am to 6pm IST</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon email-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="info-content">
                <h3>Email Us</h3>
                <p>support@taskhawk.com<br />sales@taskhawk.com</p>
              </div>
            </div>

            <div className="social-section">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon linkedin">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <div className="form-header">
              <h2>Send Us Message</h2>
              <span className="response-time">We respond within 24 hours</span>
            </div>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Your name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email address</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone number</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22 16.92V19.92C22 20.51 21.39 21 20.83 21C9.28 21 0 11.72 0 0.17C0 -0.39 0.49 -1 1.08 -1H4.08C4.67 -1 5.16 -0.51 5.16 0.08C5.16 1.58 5.35 3.05 5.72 4.47C5.84 4.9 5.7 5.36 5.35 5.71L3.9 7.16C5.51 10.06 7.94 12.49 10.84 14.1L12.29 12.65C12.64 12.3 13.1 12.16 13.53 12.28C14.95 12.65 16.42 12.84 17.92 12.84C18.51 12.84 19 13.33 19 13.92V16.92C19 17.51 18.51 18 17.92 18H22Z" fill="currentColor"/>
                    </svg>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0136 20.9135 12.7709 21.0141C12.5282 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4818 21.1148 11.2391 21.0141C10.9964 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41V13.41Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="7" cy="7" r="1" fill="currentColor"/>
                    </svg>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="sales">Sales</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Message</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <textarea
                    name="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="checkbox-group">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  I agree with the <a href="/terms">Terms and conditions</a> and <a href="/cookies">Cookies</a>.
                </label>
              </div>

              <button type="submit" className="submit-btn">
                Send message 
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2>What our customers say</h2>
          <div className="testimonial-slider">
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">
                {testimonials[currentTestimonial].text}
              </p>
              <div className="testimonial-author">
                <img src={testimonials[currentTestimonial].avatar} alt={testimonials[currentTestimonial].name} className="author-avatar" />
                <div className="author-info">
                  <h4>{testimonials[currentTestimonial].name}</h4>
                  <p>{testimonials[currentTestimonial].position}</p>
                </div>
              </div>
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <span 
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <h2>Find Us</h2>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8413734948393!2d80.2707184!3d13.0826802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526650e0b6c595%3A0x4f74ddbff946af6b!2sAnna%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{border: 0}}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background">
          <img src="/productivity-bg.jpg" alt="Productivity" className="cta-bg-image" />
          <div className="cta-overlay"></div>
        </div>
        <div className="cta-content">
          <h2>Ready to boost your productivity?</h2>
          <p>Join thousands of teams using Task Hawk to streamline their tasks and schedules.</p>
          <button className="cta-btn">Get started</button>
        </div>
      </section>
    </div>
  );
};

export default GetInTouch;
