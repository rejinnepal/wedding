import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import './AdminView.css';

const AdminView = () => {
  const [rsvps, setRsvps] = useState([]);
  const [filteredRsvps, setFilteredRsvps] = useState([]);
  const [summary, setSummary] = useState({
    totalRSVPs: 0,
    attendingCount: 0,
    totalGuests: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    searchName: '',
    searchEmail: '',
    events: {
      Mehendi: false,
      Wedding: false,
      Reception: false
    },
    mealPreference: '',
    travelMethod: '',
    arrivalDateFrom: '',
    arrivalDateTo: '',
    guestCount: '',
    attending: '',
    hasAllergies: '',
    hasSongRequest: ''
  });

  useEffect(() => {
    fetchRSVPs();
  }, []);

  const fetchRSVPs = async () => {
    try {
      setLoading(true);
              const response = await axios.get('https://wedding-yec2.onrender.com/api/rsvp');
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

  const applyFilters = useCallback(() => {
    let filtered = [...rsvps];

    // Filter by name search
    if (filters.searchName) {
      filtered = filtered.filter(rsvp => 
        rsvp.fullName.toLowerCase().includes(filters.searchName.toLowerCase())
      );
    }

    // Filter by email search
    if (filters.searchEmail) {
      filtered = filtered.filter(rsvp => 
        rsvp.email.toLowerCase().includes(filters.searchEmail.toLowerCase())
      );
    }

    // Filter by events
    const selectedEvents = Object.keys(filters.events).filter(event => filters.events[event]);
    if (selectedEvents.length > 0) {
      filtered = filtered.filter(rsvp => {
        if (!rsvp.eventsAttending || rsvp.eventsAttending.length === 0) return false;
        // Use AND logic: RSVP must have ALL selected events
        return selectedEvents.every(event => rsvp.eventsAttending.includes(event));
      });
    }

    // Filter by meal preference
    if (filters.mealPreference) {
      filtered = filtered.filter(rsvp => rsvp.mealPreference === filters.mealPreference);
    }

    // Filter by travel method
    if (filters.travelMethod) {
      filtered = filtered.filter(rsvp => rsvp.travelMethod === filters.travelMethod);
    }

    // Filter by guest count
    if (filters.guestCount) {
      const guestCountFilter = parseInt(filters.guestCount);
      filtered = filtered.filter(rsvp => {
        // Handle both string and number types
        const rsvpGuestCount = typeof rsvp.numberOfGuests === 'string' 
          ? parseInt(rsvp.numberOfGuests) 
          : rsvp.numberOfGuests;
        return rsvpGuestCount === guestCountFilter;
      });
    }

    // Filter by attending status
    if (filters.attending) {
      filtered = filtered.filter(rsvp => rsvp.attending === filters.attending);
    }

    // Filter by arrival date range
    if (filters.arrivalDateFrom) {
      // Create date at start of day in local timezone
      const fromDate = new Date(filters.arrivalDateFrom + 'T00:00:00');
      filtered = filtered.filter(rsvp => {
        if (!rsvp.arrivalDate) return false;
        const rsvpDate = new Date(rsvp.arrivalDate);
        // Compare dates by setting time to start of day
        const rsvpDateStart = new Date(rsvpDate.getFullYear(), rsvpDate.getMonth(), rsvpDate.getDate());
        const fromDateStart = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
        return rsvpDateStart >= fromDateStart;
      });
    }

    if (filters.arrivalDateTo) {
      // Create date at end of day in local timezone
      const toDate = new Date(filters.arrivalDateTo + 'T23:59:59');
      filtered = filtered.filter(rsvp => {
        if (!rsvp.arrivalDate) return false;
        const rsvpDate = new Date(rsvp.arrivalDate);
        // Compare dates by setting time to start of day
        const rsvpDateStart = new Date(rsvpDate.getFullYear(), rsvpDate.getMonth(), rsvpDate.getDate());
        const toDateStart = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
        return rsvpDateStart <= toDateStart;
      });
    }

    // Filter by allergies
    if (filters.hasAllergies) {
      if (filters.hasAllergies === 'Yes') {
        filtered = filtered.filter(rsvp => rsvp.allergies && rsvp.allergies.trim() !== '');
      } else if (filters.hasAllergies === 'No') {
        filtered = filtered.filter(rsvp => !rsvp.allergies || rsvp.allergies.trim() === '');
      }
    }

    // Filter by song request
    if (filters.hasSongRequest) {
      if (filters.hasSongRequest === 'Yes') {
        filtered = filtered.filter(rsvp => rsvp.songRequest && rsvp.songRequest.trim() !== '');
      } else if (filters.hasSongRequest === 'No') {
        filtered = filtered.filter(rsvp => !rsvp.songRequest || rsvp.songRequest.trim() === '');
      }
    }

    setFilteredRsvps(filtered);
  }, [rsvps, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleEventFilterChange = (event) => {
    setFilters(prev => ({
      ...prev,
      events: {
        ...prev.events,
        [event]: !prev.events[event]
      }
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchName: '',
      searchEmail: '',
      events: {
        Mehendi: false,
        Wedding: false,
        Reception: false
      },
      mealPreference: '',
      travelMethod: '',
      arrivalDateFrom: '',
      arrivalDateTo: '',
      guestCount: '',
      attending: '',
      hasAllergies: '',
      hasSongRequest: ''
    });
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

      <section className="filters-section">
        <div className="container">
          <motion.div
            className="filters-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="filters-header">
              <h2>Filter RSVPs</h2>
              <button className="btn clear-filters-btn" onClick={clearFilters}>
                Clear All Filters
              </button>
            </div>

            {/* Search Filters Row */}
            <div className="filters-row search-filters">
              <div className="filter-group">
                <label>Search by Name</label>
                <input
                  type="text"
                  value={filters.searchName}
                  onChange={(e) => handleFilterChange('searchName', e.target.value)}
                  placeholder="Enter name to search..."
                />
              </div>
              <div className="filter-group">
                <label>Search by Email</label>
                <input
                  type="text"
                  value={filters.searchEmail}
                  onChange={(e) => handleFilterChange('searchEmail', e.target.value)}
                  placeholder="Enter email to search..."
                />
              </div>
            </div>

            {/* Main Filters Grid */}
            <div className="filters-grid">
              {/* Events Filter */}
              <div className="filter-group events-filter">
                <label>Events Attending</label>
                <div className="checkbox-filters">
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.events.Mehendi}
                      onChange={() => handleEventFilterChange('Mehendi')}
                    />
                    <span className="checkmark"></span>
                    Mehendi
                  </label>
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.events.Wedding}
                      onChange={() => handleEventFilterChange('Wedding')}
                    />
                    <span className="checkmark"></span>
                    Wedding
                  </label>
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.events.Reception}
                      onChange={() => handleEventFilterChange('Reception')}
                    />
                    <span className="checkmark"></span>
                    Reception
                  </label>
                </div>
              </div>

              {/* Meal Preference Filter */}
              <div className="filter-group">
                <label>Meal Preference</label>
                <select
                  value={filters.mealPreference}
                  onChange={(e) => handleFilterChange('mealPreference', e.target.value)}
                >
                  <option value="">All Meal Preferences</option>
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                  <option value="Vegan">Vegan</option>
                  <option value="No Preference">No Preference</option>
                </select>
              </div>

              {/* Travel Method Filter */}
              <div className="filter-group">
                <label>Travel Method</label>
                <select
                  value={filters.travelMethod}
                  onChange={(e) => handleFilterChange('travelMethod', e.target.value)}
                >
                  <option value="">All Travel Methods</option>
                  <option value="Car">Car</option>
                  <option value="Flight">Flight</option>
                  <option value="Train">Train</option>
                  <option value="Bus">Bus</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Guest Count Filter */}
              <div className="filter-group">
                <label>Guest Count</label>
                <select
                  value={filters.guestCount}
                  onChange={(e) => handleFilterChange('guestCount', e.target.value)}
                >
                  <option value="">All Guest Counts</option>
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                </select>
              </div>

              {/* Attending Status Filter */}
              <div className="filter-group">
                <label>Attending Status</label>
                <select
                  value={filters.attending}
                  onChange={(e) => handleFilterChange('attending', e.target.value)}
                >
                  <option value="">All Responses</option>
                  <option value="Yes">Attending</option>
                  <option value="No">Not Attending</option>
                </select>
              </div>

              {/* Allergies Filter */}
              <div className="filter-group">
                <label>Has Allergies</label>
                <select
                  value={filters.hasAllergies}
                  onChange={(e) => handleFilterChange('hasAllergies', e.target.value)}
                >
                  <option value="">All Responses</option>
                  <option value="Yes">Has Allergies</option>
                  <option value="No">No Allergies</option>
                </select>
              </div>

              {/* Song Request Filter */}
              <div className="filter-group">
                <label>Has Song Request</label>
                <select
                  value={filters.hasSongRequest}
                  onChange={(e) => handleFilterChange('hasSongRequest', e.target.value)}
                >
                  <option value="">All Responses</option>
                  <option value="Yes">Has Song Request</option>
                  <option value="No">No Song Request</option>
                </select>
              </div>
            </div>

            {/* Date Range Filter - Full Width */}
            <div className="filters-row date-filters">
              <div className="filter-group date-range-group">
                <label>Arrival Date Range</label>
                <div className="date-range">
                  <input
                    type="date"
                    value={filters.arrivalDateFrom}
                    onChange={(e) => handleFilterChange('arrivalDateFrom', e.target.value)}
                    placeholder="From Date"
                  />
                  <span>to</span>
                  <input
                    type="date"
                    value={filters.arrivalDateTo}
                    onChange={(e) => handleFilterChange('arrivalDateTo', e.target.value)}
                    placeholder="To Date"
                  />
                </div>
              </div>
            </div>

            {/* Filter Results Summary */}
            <div className="filter-results">
              <p>
                Showing <strong>{filteredRsvps.length}</strong> of <strong>{rsvps.length}</strong> RSVPs
                {filteredRsvps.length !== rsvps.length && (
                  <span className="filter-active"> (filtered)</span>
                )}
              </p>
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

            {filteredRsvps.length === 0 ? (
              <div className="no-data">
                <p>{rsvps.length === 0 ? 'No RSVP responses yet.' : 'No RSVPs match the current filters.'}</p>
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
                        <th>Events</th>
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
                      {filteredRsvps.map((rsvp) => (
                        <tr key={rsvp._id}>
                          <td>{rsvp.fullName}</td>
                          <td>{rsvp.email}</td>
                          <td>{rsvp.phoneNumber}</td>
                          <td>
                            <span className={`status ${rsvp.attending === 'Yes' ? 'attending' : 'declined'}`}>
                              {rsvp.attending}
                            </span>
                          </td>
                          <td>
                            {rsvp.eventsAttending && rsvp.eventsAttending.length > 0 ? (
                              <div className="events-list">
                                {rsvp.eventsAttending.map((event, index) => (
                                  <span key={index} className="event-tag">
                                    {event}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              '-'
                            )}
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
