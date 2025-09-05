import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <motion.div
          className="not-found-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="error-icon">
            <span className="error-number">404</span>
          </div>
          
          <h1 className="error-title">Page Not Found</h1>
          
          <p className="error-message">
            Oops! The page you're looking for doesn't exist.
          </p>
          
          <p className="error-description">
            It seems like you've wandered off the beaten path. Don't worry, 
            even the best wedding planners sometimes take a wrong turn!
          </p>
          
          <motion.div
            className="error-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link to="/" className="btn home-btn">
              <span className="btn-icon">🏠</span>
              Go to Home
            </Link>
            
            <Link to="/rsvp" className="btn secondary-btn">
              <span className="btn-icon">💌</span>
              RSVP
            </Link>
          </motion.div>
          
          <motion.div
            className="helpful-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="links-title">Quick Links:</p>
            <div className="links-grid">
              <Link to="/our-story" className="quick-link">Our Story</Link>
              <Link to="/wedding-details" className="quick-link">Wedding Details</Link>
              <Link to="/travel-accommodation" className="quick-link">Travel & Accommodation</Link>
              <Link to="/gallery" className="quick-link">Gallery</Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
