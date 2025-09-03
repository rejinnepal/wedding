import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import './AdminView.css';

const AdminView = () => {
  const [rsvps, setRsvps] = useState([]);
  const [summary, setSummary] = useState({
    totalRSVPs: 0,
    attendingCount: 0,
    totalGuests: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRSVPs();
  }, []);

  const fetchRSVPs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://your-backend-server.com/api/rsvp');
      setRsvps(response.data.rsvps);
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error fetching RSVPs:', error);
      setError('Failed to load RSVP data');
      toast.error('Failed to load RSVP data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="admin-view">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading RSVP data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-view">
        <div className="container">
          <div className="error-message">
            <h2>Error</h2>
            <p>{error}</p>
            <button className="btn" onClick={fetchRSVPs}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-view">
      <div className="admin-hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>RSVP Admin View</h1>
            <p className="hero-subtitle">
              View all RSVP responses and guest information
            </p>
          </motion.div>
        </div>
      </div>

      <section className="summary-section">
        <div className="container">
          <motion.div
            className="summary-grid"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="summary-card">
              <div className="summary-icon">📊</div>
              <h3>Total Responses</h3>
              <p className="summary-number">{summary.totalRSVPs}</p>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon">✅</div>
              <h3>Attending</h3>
              <p className="summary-number">{summary.attendingCount}</p>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon">👥</div>
              <h3>Total Guests</h3>
              <p className="summary-number">{summary.totalGuests}</p>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon">📅</div>
              <h3>Last Updated</h3>
              <p className="summary-date">{formatDate(new Date())}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="rsvp-table-section">
        <div className="container">
          <motion.div
            className="table-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="table-header">
              <h2>RSVP Responses</h2>
              <button className="btn refresh-btn" onClick={fetchRSVPs}>
                Refresh Data
              </button>
            </div>

            {rsvps.length === 0 ? (
              <div className="no-data">
                <p>No RSVP responses yet.</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="rsvp-table">
                                      <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Attending</th>
                        <th>Guests</th>
                        <th>Meal</th>
                        <th>Arrival</th>
                        <th>Departure</th>
                        <th>Travel</th>
                        <th>Message</th>
                        <th>Allergies</th>
                        <th>Submitted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rsvps.map((rsvp) => (
                        <tr key={rsvp._id}>
                          <td>{rsvp.fullName}</td>
                          <td>{rsvp.email}</td>
                          <td>{rsvp.phoneNumber}</td>
                          <td>
                            <span className={`status ${rsvp.attending === 'Yes' ? 'attending' : 'declined'}`}>
                              {rsvp.attending}
                            </span>
                          </td>
                          <td>{rsvp.numberOfGuests || '-'}</td>
                          <td>{rsvp.mealPreference || '-'}</td>
                          <td>{rsvp.arrivalDate ? formatDate(rsvp.arrivalDate) : '-'}</td>
                          <td>{rsvp.departureDate ? formatDate(rsvp.departureDate) : '-'}</td>
                          <td>{rsvp.travelMethod || '-'}</td>
                          <td>
                            {rsvp.songRequest ? (
                              <div className="message-cell">
                                <span className="message-preview">
                                  {rsvp.songRequest.length > 50 
                                    ? `${rsvp.songRequest.substring(0, 50)}...` 
                                    : rsvp.songRequest
                                  }
                                </span>
                                {rsvp.songRequest.length > 50 && (
                                  <div className="message-tooltip">
                                    {rsvp.songRequest}
                                  </div>
                                )}
                              </div>
                            ) : (
                              '-'
                            )}
                          </td>
                          <td>
                            {rsvp.allergies ? (
                              <div className="message-cell">
                                <span className="message-preview">
                                  {rsvp.allergies.length > 30 
                                    ? `${rsvp.allergies.substring(0, 30)}...` 
                                    : rsvp.allergies
                                  }
                                </span>
                                {rsvp.allergies.length > 30 && (
                                  <div className="message-tooltip">
                                    {rsvp.allergies}
                                  </div>
                                )}
                              </div>
                            ) : (
                              '-'
                            )}
                          </td>
                          <td>{formatDate(rsvp.submittedAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AdminView;
