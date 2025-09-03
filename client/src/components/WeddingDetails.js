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
      <div className="details-hero">
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
      </div>

      <section className="events-section" ref={ref}>
        <div className="container">
          <motion.div
            className="events-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="event-card mehendi-card">
              <div className="card-icon">🎨</div>
              <h2>Mehendi Ceremony</h2>
              <div className="detail-item">
                <h3>Date & Time</h3>
                <p>Saturday, November 29th, 2025<br />6:00 PM onwards</p>
              </div>
              <div className="detail-item">
                <h3>Venue</h3>
                <p>Hindu Temple Society<br />450 Albany Shaker Rd, Albany, NY 12211</p>
              </div>
              <div className="detail-item">
                <h3>Description</h3>
                <p>Join us for the traditional Mehendi ceremony where beautiful henna designs are applied to the bride's hands and feet.</p>
              </div>
            </div>

            <div className="event-card ceremony-card">
              <div className="card-icon">💒</div>
              <h2>Wedding Ceremony</h2>
              <div className="detail-item">
                <h3>Date & Time</h3>
                <p>Sunday, November 30th, 2025<br />11:00 AM</p>
              </div>
              <div className="detail-item">
                <h3>Venue</h3>
                <p>Hindu Temple Society<br />450 Albany Shaker Rd, Albany, NY 12211</p>
              </div>
              <div className="detail-item">
                <h3>Arrival</h3>
                <p>Please arrive 30 minutes before the ceremony begins</p>
              </div>
            </div>

            <div className="event-card reception-card">
              <div className="card-icon">🍾</div>
              <h2>Reception</h2>
              <div className="detail-item">
                <h3>Date & Time</h3>
                <p>Sunday, November 30th, 2025<br />7:00 PM onwards</p>
              </div>
              <div className="detail-item">
                <h3>Venue</h3>
                <p>Hilton Garden Inn Troy<br />235 Hoosick St, Troy, NY 12180</p>
              </div>
              <div className="detail-item">
                <h3>Dinner</h3>
                <p>Traditional Nepali dinner service begins at 8:00 PM</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <motion.div
            className="map-container"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>Venue Location</h2>
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007%2C%20USA!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding Venue Location"
              ></iframe>
            </div>
            <div className="map-info">
              <p><strong>Ceremony Venue:</strong> Hindu Temple Society, 450 Albany Shaker Rd, Albany, NY 12211</p>
              <p><strong>Reception Venue:</strong> Hilton Garden Inn Troy, 235 Hoosick St, Troy, NY 12180</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="dress-code-section">
        <div className="container">
          <motion.div
            className="dress-code-content"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="dress-code-card">
              <div className="card-icon">👗</div>
              <h2>Dress Code</h2>
              <h3>Traditional Nepali or Formal Attire</h3>
              <p>
                We invite you to dress elegantly for our special day. Traditional Nepali attire 
                is welcome and encouraged, but formal Western attire is also perfectly acceptable. 
                Please dress modestly and respectfully for the temple ceremony.
              </p>
              <div className="dress-suggestions">
                <div className="suggestiweddingon">
                  <h4>For Gentlemen</h4>
                  <ul>
                    <li>Traditional Nepali kurta/sherwani</li>
                    <li>Formal suit with tie</li>
                    <li>Dress shoes</li>
                  </ul>
                </div>
                <div className="suggestion">
                  <h4>For Ladies</h4>
                  <ul>
                    <li>Traditional Nepali saree/salwar kameez</li>
                    <li>Elegant cocktail dress</li>
                    <li>Formal gown</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="parking-section">
        <div className="container">
          <motion.div
            className="parking-content"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="parking-card">
              <div className="card-icon">🅿️</div>
              <h2>Parking Information</h2>
              <div className="parking-details">
                <div className="parking-option">
                  <h3>On-Site Parking</h3>
                  <p>Complimentary parking is available in the venue's underground garage. 
                  Enter from Wedding Lane and follow the signs to the wedding parking area.</p>
                </div>
                <div className="parking-option">
                  <h3>Street Parking</h3>
                  <p>Limited street parking is available on Wedding Lane and surrounding streets. 
                  Please check parking signs for restrictions.</p>
                </div>
                <div className="parking-option">
                  <h3>Ride Share</h3>
                  <p>We recommend using ride-sharing services like Uber or Lyft for convenience. 
                  The venue is easily accessible from all major areas.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="container">
          <motion.div
            className="timeline-content"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2>Wedding Day Timeline</h2>
            <div className="timeline-grid">
              <div className="timeline-item">
                <div className="time">10:30 AM</div>
                <div className="event">Guest Arrival (Temple)</div>
              </div>
              <div className="timeline-item">
                <div className="time">11:00 AM</div>
                <div className="event">Wedding Ceremony Begins</div>
              </div>
              <div className="timeline-item">
                <div className="time">2:00 PM</div>
                <div className="event">Ceremony Ends</div>
              </div>
              <div className="timeline-item">
                <div className="time">6:30 PM</div>
                <div className="event">Reception Arrival</div>
              </div>
              <div className="timeline-item">
                <div className="time">7:00 PM</div>
                <div className="event">Reception Begins</div>
              </div>
              <div className="timeline-item">
                <div className="time">8:00 PM</div>
                <div className="event">Dinner Service</div>
              </div>
              <div className="timeline-item">
                <div className="time">9:30 PM</div>
                <div className="event">First Dance</div>
              </div>
              <div className="timeline-item">
                <div className="time">12:00 AM</div>
                <div className="event">Reception Ends</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WeddingDetails;
