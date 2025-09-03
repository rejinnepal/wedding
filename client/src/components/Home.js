import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Countdown from 'react-countdown';
import './Home.css';

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Wedding date - Set this to your actual wedding date
  const weddingDate = new Date('2025-11-30T11:00:00');

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div className="countdown-complete">
          <h2>Today is the Day!</h2>
          <p>We're getting married!</p>
        </div>
      );
    }

    return (
      <div className="countdown-grid">
        <div className="countdown-item">
          <span className="countdown-number">{days}</span>
          <span className="countdown-label">Days</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-number">{hours}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-number">{minutes}</span>
          <span className="countdown-label">Minutes</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-number">{seconds}</span>
          <span className="countdown-label">Seconds</span>
        </div>
      </div>
    );
  };

  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById('rsvp-section');
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <img 
            src="/assets/IMG_6691_Original.JPG" 
            alt="Abhishek & Richa - Wedding Couple" 
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="invitation-card">
              <motion.div
                className="invitation-header"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <h1>Abhishek & Richa</h1>
                <div className="invitation-divider">
                  <span>♥</span>
                </div>
                <p className="invitation-text">
                  Cordially invite you to celebrate their wedding
                </p>
              </motion.div>

              <motion.div
                className="invitation-details"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="detail-item">
                  <h3>Sunday, November 30th, 2025</h3>
                  <p>Eleven o'clock in the morning</p>
                </div>
                
                <div className="detail-item">
                  <h3>Hindu Temple Society</h3>
                  <p>450 Albany Shaker Rd, Albany, NY 12211</p>
                </div>

                <div className="detail-item">
                  <h3>Reception to Follow</h3>
                  <p>Hilton Garden Inn Troy, 235 Hoosick St, Troy, NY 12180</p>
                </div>
              </motion.div>

              <motion.button
                className="btn rsvp-btn"
                onClick={scrollToRSVP}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                RSVP Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="countdown-section" ref={ref}>
        <div className="container">
          <motion.div
            className="countdown-content"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2>Counting Down to Our Special Day</h2>
            <div className="countdown-container">
              <Countdown
                date={weddingDate}
                renderer={countdownRenderer}
              />
            </div>
            <p className="countdown-subtitle">
              We can't wait to celebrate with you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="quick-info">
        <div className="container">
          <motion.div
            className="info-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="info-card">
              <div className="info-icon">📅</div>
              <h3>Date & Time</h3>
              <p>November 30th, 2025<br />11:00 AM</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Venue</h3>
              <p>Hindu Temple Society<br />Albany, NY</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">👗</div>
              <h3>Dress Code</h3>
              <p>Traditional Indian<br />or Formal Attire</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">💝</div>
              <h3>RSVP</h3>
              <p>Please respond by<br />November 15th, 2025</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
