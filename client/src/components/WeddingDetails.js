import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './WeddingDetails.css';

const WeddingDetails = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="wedding-details">
      {/* Hero Section */}
      <section className="details-hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>Wedding Details</h1>
            <p className="hero-subtitle">
              Everything you need to know about our special day
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section" ref={ref}>
        <div className="container">
          {/* <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Our Wedding Events</h2>
            <p className="section-subtitle">Join us for three days of celebration</p>
          </motion.div> */}
          {/* <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>Our Love Story</h1>
            <p className="hero-subtitle">
              Every love story is beautiful, but ours is our favorite.
            </p>
          </motion.div> */}
          
          <motion.div
            className="events-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="event-card mehendi-card">
              <div className="card-header">
                <div className="card-icon">🎨</div>
                <h2>Mehendi Ceremony</h2>
                <div className="event-date">Saturday, November 29th</div>
              </div>
              <div className="card-content">
                <div className="detail-item">
                  <div className="detail-icon">🕐</div>
                  <div className="detail-content">
                    <h3>Time</h3>
                    <p>1:00 PM - 4:00 PM</p>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon">📍</div>
                  <div className="detail-content">
                    <h3>Venue</h3>
                    <p>Sugar Hills Apartment<br />Troy, NY 12180</p>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon">✨</div>
                  <div className="detail-content">
                    <h3>Description</h3>
                    <p>Join us for the traditional Mehendi ceremony where beautiful henna designs are applied to the bride's hands and feet.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="event-card ceremony-card">
              <div className="card-header">
                <div className="card-icon">🛕</div>
                <h2>Wedding Ceremony</h2>
                <div className="event-date">Sunday, November 30th</div>
              </div>
              <div className="card-content">
                <div className="detail-item">
                  <div className="detail-icon">🕐</div>
                  <div className="detail-content">
                    <h3>Time</h3>
                    <p>1:00 PM - 4:00 PM</p>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon">📍</div>
                  <div className="detail-content">
                    <h3>Venue</h3>
                    <p>Hindu Temple Society<br />450 Albany Shaker Rd, Albany, NY 12211</p>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon">⏰</div>
                  <div className="detail-content">
                    <h3>Arrival</h3>
                    <p>Please arrive 30 minutes before the ceremony begins</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="event-card reception-card">
              <div className="card-header">
                <div className="card-icon">🎉</div>
                <h2>Reception</h2>
                <div className="event-date">Sunday, November 30th</div>
              </div>
              <div className="card-content">
                <div className="detail-item">
                  <div className="detail-icon">🕕</div>
                  <div className="detail-content">
                    <h3>Time</h3>
                    <p>6:00 PM - 11:00 PM</p>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon">📍</div>
                  <div className="detail-content">
                    <h3>Venue</h3>
                    <p>Hilton Garden Inn Troy<br />235 Hoosick St, Troy, NY 12180</p>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon">🍽️</div>
                  <div className="detail-content">
                    <h3>Dinner</h3>
                    <p>Traditional Nepali dinner service begins at 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Venue Locations</h2>
            <p className="section-subtitle">Find your way to our celebration</p>
          </motion.div>
          
          <motion.div
            className="map-container"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d187837.4736819899!2d-73.85486966861808!3d42.640996781225894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89de0b8a4d32d8f9%3A0x3463a15dfa4cd44e!2sHindu%20Temple%20Society!5e0!3m2!1sen!2sus!4v1757049506839!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '15px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding Venue Locations"
              ></iframe>
            </div>
            <div className="map-instructions">
              <p><strong>Quick Navigation</strong></p>
              <div className="search-links">
                <a href="https://www.google.com/maps/search/SugarHills+Apartment,+Troy,+NY" target="_blank" rel="noopener noreferrer" className="venue-link mehendi-link">
                  <span className="link-icon">🎨</span>
                  <span className="link-text">Mehendi: SugarHills Apartment</span>
                </a>
                <a href="https://www.google.com/maps/search/Hindu+Temple+Society,+450+Albany+Shaker+Rd,+Albany,+NY" target="_blank" rel="noopener noreferrer" className="venue-link ceremony-link">
                  <span className="link-icon">🛕</span>
                  <span className="link-text">Ceremony: Hindu Temple Society</span>
                </a>
                <a href="https://www.google.com/maps/search/Hilton+Garden+Inn+Troy,+235+Hoosick+St,+Troy,+NY" target="_blank" rel="noopener noreferrer" className="venue-link reception-link">
                  <span className="link-icon">🍾</span>
                  <span className="link-text">Reception: Hilton Garden Inn</span>
                </a>
              </div>
            </div>
            {/* <div className="venue-info">
              <div className="venue-card">
                <div className="venue-icon">🎨</div>
                <div className="venue-details">
                  <h3>Mehendi Venue</h3>
                  <p>SugarHills Apartment<br />Troy, NY</p>
                </div>
              </div>
              <div className="venue-card">
                <div className="venue-icon">💒</div>
                <div className="venue-details">
                  <h3>Ceremony Venue</h3>
                  <p>Hindu Temple Society<br />450 Albany Shaker Rd, Albany, NY 12211</p>
                </div>
              </div>
              <div className="venue-card">
                <div className="venue-icon">🍾</div>
                <div className="venue-details">
                  <h3>Reception Venue</h3>
                  <p>Hilton Garden Inn Troy<br />235 Hoosick St, Troy, NY 12180</p>
                </div>
              </div>
            </div> */}
          </motion.div>
        </div>
      </section>



      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Wedding Day Timeline</h2>
            {/* <p className="section-subtitle">Your guide to our special day</p> */}
          </motion.div>
          
          <motion.div
            className="timeline-content"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="timeline-container">
              {/* Saturday - Mehendi */}
              <div className="timeline-day">
                <h3 className="day-title">Saturday, November 29th</h3>
                <div className="timeline-item">
                  <div className="timeline-time">1:00 PM</div>
                  <div className="timeline-event">
                    <h4>Mehendi Ceremony</h4>
                    <p>Traditional henna ceremony begins at SugarHills Apartment</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-time">4:00 PM</div>
                  <div className="timeline-event">
                    <h4>Mehendi Ends</h4>
                    <p>Ceremony concludes, time to rest and prepare</p>
                  </div>
                </div>
              </div>

              {/* Sunday - Wedding & Reception */}
              <div className="timeline-day">
                <h3 className="day-title">Sunday, November 30th</h3>
                <div className="timeline-item">
                  <div className="timeline-time">1:00 PM</div>
                  <div className="timeline-event">
                    <h4>Wedding Ceremony</h4>
                    <p>Sacred ceremony at Hindu Temple Society</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-time">4:00 PM</div>
                  <div className="timeline-event">
                    <h4>Ceremony Ends</h4>
                    <p>Wedding ceremony concludes</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-time">6:00 PM</div>
                  <div className="timeline-event">
                    <h4>Reception Begins</h4>
                    <p>Cocktails and celebration start at Hilton Garden Inn</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-time">7:00 PM</div>
                  <div className="timeline-event">
                    <h4>Dinner Service</h4>
                    <p>Traditional Nepali dinner begins</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-time">8:30 PM</div>
                  <div className="timeline-event">
                    <h4>First Dance</h4>
                    <p>Abhishek & Richa's first dance</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-time">9:00 PM</div>
                  <div className="timeline-event">
                    <h4>Dancing & Celebration</h4>
                    <p>Join us on the dance floor!</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-time">11:00 PM</div>
                  <div className="timeline-event">
                    <h4>Reception Ends</h4>
                    <p>Thank you for celebrating with us!</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WeddingDetails;
