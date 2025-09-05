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

  const weddingDate = new Date('2025-11-30T11:00:00');

  const scrollToStory = () => {
    const storySection = document.getElementById('our-story');
    if (storySection) {
      storySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home">
      {/* Hero Section - Reference Design */}
      <section className="hero">
        <div className="hero-background">
          <img 
            src={`${process.env.PUBLIC_URL}/assets/IMG_6691_Original.JPG`}
            alt="Abhishek & Richa - Wedding Couple" 
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <motion.div 
            className="main-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Couple Names */}
            <motion.h1 
              className="couple-names"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Abhishek & Richa
            </motion.h1>
            
            {/* Wedding Announcement */}
            <motion.div 
              className="wedding-announcement"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="announcement-text">We are getting married</h2>
              <h3 className="wedding-date">30 November 2025</h3>
            </motion.div>
            
            {/* Call to Action */}
            <motion.button 
              className="explore-button"
              onClick={scrollToStory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Story
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="countdown-section">
        <motion.div 
          className="countdown-container"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="countdown-title">Counting Down to Our Special Day</h2>
          <div className="countdown-timer">
            <Countdown 
              date={weddingDate}
              renderer={({ days, hours, minutes, seconds, completed }) => {
                if (completed) {
                  return <div className="wedding-day">Today is the day! 🎉</div>;
                }
                return (
                  <div className="countdown-grid">
                    <div className="countdown-item">
                      <div className="countdown-number">{days}</div>
                      <div className="countdown-label">Days</div>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number">{hours}</div>
                      <div className="countdown-label">Hours</div>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number">{minutes}</div>
                      <div className="countdown-label">Minutes</div>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number">{seconds}</div>
                      <div className="countdown-label">Seconds</div>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Quick Info Cards */}
      <section className="quick-info-section">
        <motion.div 
          className="info-cards-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Event Cards Row */}
          <div className="events-row">
            <div className="info-card">
              <div className="card-icon">🎨</div>
              <h3>Mehendi</h3>
              <p>Saturday, November 29th, 2025</p>
              <p className="card-detail">1:00 PM - 4:00 PM at Sugar Hills Apartment</p>
            </div>
            
            <div className="info-card">
              <div className="card-icon">💒</div>
              <h3>Ceremony</h3>
              <p>Sunday, November 30th, 2025</p>
              <p className="card-detail">1:00 PM - 4:00 PM at Hindu Temple Society</p>
            </div>
            
            <div className="info-card">
              <div className="card-icon">🎉</div>
              <h3>Reception</h3>
              <p>Sunday, November 30th, 2025</p>
              <p className="card-detail">6:00 PM - 11:00 PM at Hilton Garden Inn Troy</p>
            </div>
          </div>
          
          {/* RSVP Card - Full Width */}
          <div className="rsvp-row">
            <div className="info-card rsvp-card">
              <div className="card-icon">💝</div>
              <h3>RSVP</h3>
              <p>Please respond by</p>
              <p className="card-detail">September 30th, 2025</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
