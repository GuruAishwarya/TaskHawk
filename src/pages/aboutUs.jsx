import React, { useState } from 'react';
import '../styles/aboutUs.css';

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState('story');

  const teamMembers = [
   /* {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      instagram: "#",
      github: "#"
    },*/
    {
      id: 1,
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      instagram: "#",
      github: "#"
    },
    {
      id: 2,
      name: "Emily Davis",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      instagram: "#",
      github: "#"
    },
    {
      id: 3,
      name: "David Wilson",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      instagram: "#",
      github: "#"
    }
  ];

  return (
    <div className="about-us">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>About Us</h1>
          <p>Your productivity partner for getting things done</p>
          <div className="hero-buttons">
            <button 
              className={`hero-btn ${activeSection === 'story' ? 'active' : ''}`}
              onClick={() => setActiveSection('story')}
            >
              Our Story
            </button>
            <button 
              className={`hero-btn ${activeSection === 'team' ? 'active' : ''}`}
              onClick={() => setActiveSection('team')}
            >
              Meet the Team
            </button>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story">
        <div className="container">
          <h2>Our Story</h2>
          <div className="story-content">
            <p>
              TaskHawk was founded in 2023 with a simple mission: to help people organize their tasks and boost their productivity. 
              Our team recognized that existing task management tools were either too complex or too simplistic, leaving many 
              users frustrated.
            </p>
            <p>
              We set out to create a solution that strikes the perfect balance between powerful features and intuitive design. Today, 
              TaskHawk helps thousands of users worldwide stay organized and accomplish more every day.
            </p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <h3>3K+</h3>
              <p>Active Users</p>
            </div>
            <div className="stat-card">
              <h3>5K+</h3>
              <p>Tasks Completed</p>
            </div>
            <div className="stat-card">
              <h3>24/7</h3>
              <p>Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="our-mission">
        <div className="container">
          <div className="mission-card">
            <h2>Our Mission</h2>
            <p>
              We believe that when people are organized, they're empowered to do their best work. Our mission is to provide 
              tools that help individuals and teams:
            </p>
            <ul className="mission-list">
              <li>Capture tasks quickly and easily</li>
              <li>Prioritize what matters most</li>
              <li>Stay focused and avoid distractions</li>
              <li>Track progress and celebrate accomplishments</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="meet-team">
        <div className="container">
          <h2>Meet Our Team</h2>
          <p className="team-subtitle">
            Our talented team is dedicated to making TaskHawk the best productivity tool available
          </p>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="team-member">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="social-links">
                  <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to boost your productivity?</h2>
            <p>Join thousands of users who are getting more done with TaskHawk</p>
            <button className="cta-button">Get Started for Free</button>
          </div>
        </div>
      </section>

      {/* Final CTA with Background */}
      <section className="final-cta">
        <div className="cta-overlay"></div>
        <div className="cta-content">
          <h2>Ready to boost your productivity?</h2>
          <p>Join thousands of teams using Task Hawk to streamline their tasks and schedules.</p>
          <button className="get-started-btn">Get Started</button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
