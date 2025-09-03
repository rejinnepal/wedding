import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './TravelAccommodation.css';

const TravelAccommodation = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const hotels = [
    {
      name: 'Hilton Garden Inn Troy',
      price: '$$$',
      address: '235 Hoosick St, Troy, NY 12180',
      phone: '(518) 272-1700',
      website: 'https://www.hilton.com/en/attend-my-event/albtygi-dgw-f875676e-c462-4dd1-9d69-2448f91d9fda/',
      description: 'Our reception venue! Special wedding rate: $129 for Saturday night',
      amenities: ['Free WiFi', 'Indoor Pool', 'Restaurant', 'Fitness Center', 'Free Parking'],
      blockCode: 'Special Wedding Rate',
      distance: 'Reception venue',
      specialOffer: 'Saturday Nov 29: $129'
    },
    {
      name: 'Holiday Inn Express Albany',
      price: '$$',
      address: '400 Old Loudon Rd, Latham, NY 12110',
      phone: '(518) 785-5555',
      website: 'https://www.ihg.com/holidayinnexpress/hotels/us/en/latham/albex/hoteldetail',
      description: 'Comfortable hotel with great amenities, located between Albany and Troy.',
      amenities: ['Free Breakfast', 'Free WiFi', 'Fitness Center', 'Business Center', 'Free Parking'],
      blockCode: 'WEDDING2025',
      distance: '15 minutes from temple, 10 minutes from reception'
    },
    {
      name: 'Best Western Plus Albany Airport Inn',
      price: '$$',
      address: '200 Wolf Rd, Albany, NY 12205',
      phone: '(518) 458-1000',
      website: 'https://www.bestwestern.com/en_US/book/hotel-rooms.33001.html',
      description: 'Convenient location near Albany International Airport with comfortable rooms.',
      amenities: ['Free WiFi', 'Free Breakfast', 'Shuttle Service', 'Fitness Center'],
      blockCode: 'ABHISHEKRICHA',
      distance: '20 minutes from temple, 25 minutes from reception'
    }
  ];

  const attractions = [
    {
      name: 'Empire State Plaza',
      description: 'Iconic government complex with stunning architecture and the New York State Museum.',
      category: 'Culture',
      website: 'https://empirestateplaza.ny.gov/',
      distance: '15 minutes from temple'
    },
    {
      name: 'Washington Park',
      description: 'Beautiful historic park in Albany with walking trails and seasonal events.',
      category: 'Nature',
      website: 'https://www.albany.org/listing/washington-park/',
      distance: '10 minutes from temple'
    },
    {
      name: 'Troy Waterfront Farmers Market',
      description: 'Vibrant farmers market with local produce, crafts, and food vendors.',
      category: 'Local',
      website: 'https://www.troymarket.org/',
      distance: '5 minutes from reception venue'
    },
    {
      name: 'Saratoga Springs',
      description: 'Historic spa town with mineral springs, racing, and charming downtown.',
      category: 'Day Trip',
      website: 'https://www.saratoga.org/',
      distance: '45 minutes from venues'
    }
  ];

  return (
    <div className="travel-accommodation">
      <div className="travel-hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>Travel & Accommodation</h1>
            <p className="hero-subtitle">
              Everything you need to know for your stay in Beautiful City
            </p>
          </motion.div>
        </div>
      </div>

      <section className="welcome-section" ref={ref}>
        <div className="container">
          <motion.div
            className="welcome-content"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2>Welcome to Beautiful City!</h2>
            <p>
              We're so excited to have you join us for our special day! Whether you're 
              traveling from near or far, we've put together some helpful information 
              to make your stay comfortable and enjoyable.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="accommodation-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>Recommended Accommodations</h2>
            <p>We've reserved blocks of rooms at these hotels for our wedding guests</p>
          </motion.div>

          <motion.div
            className="hotels-grid"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {hotels.map((hotel, index) => (
              <div key={index} className="hotel-card">
                <div className="hotel-header">
                  <h3>{hotel.name}</h3>
                  <span className="price-range">{hotel.price}</span>
                </div>
                
                <div className="hotel-info">
                  <p className="hotel-description">{hotel.description}</p>
                  <p className="hotel-address">
                    <strong>Address:</strong> {hotel.address}
                  </p>
                  <p className="hotel-phone">
                    <strong>Phone:</strong> {hotel.phone}
                  </p>
                  <p className="hotel-distance">
                    <strong>Distance:</strong> {hotel.distance}
                  </p>
                </div>

                <div className="hotel-amenities">
                  <h4>Amenities:</h4>
                  <ul>
                    {hotel.amenities.map((amenity, i) => (
                      <li key={i}>{amenity}</li>
                    ))}
                  </ul>
                </div>

                                  <div className="hotel-booking">
                    {hotel.specialOffer && (
                      <div className="special-offer">
                        <p><strong>🎉 Special Wedding Rate:</strong></p>
                        <p className="offer-highlight">{hotel.specialOffer}</p>
                      </div>
                    )}
                    <div className="booking-row">
                      <div className="block-info">
                        <p><strong>Group Code:</strong> {hotel.blockCode}</p>
                        <p><strong>Reserved until:</strong> November 5th, 2025</p>
                      </div>
                      <a 
                        href={hotel.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn booking-btn"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="attractions-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2>Things to Do</h2>
            <p>Explore Beautiful City while you're here</p>
          </motion.div>

          <motion.div
            className="attractions-grid"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {attractions.map((attraction, index) => (
              <div key={index} className="attraction-card">
                <div className="attraction-header">
                  <h3>{attraction.name}</h3>
                  <span className="category">{attraction.category}</span>
                </div>
                
                <p className="attraction-description">{attraction.description}</p>
                
                <div className="attraction-details">
                  <p><strong>Distance:</strong> {attraction.distance}</p>
                </div>

                <a 
                  href={attraction.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn secondary-btn"
                >
                  Learn More
                </a>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="travel-info-section">
        <div className="container">
          <motion.div
            className="travel-info-content"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h2>Travel Information</h2>
            
            <div className="info-grid">
              <div className="info-card">
                <div className="info-icon">✈️</div>
                <h3>Airport</h3>
                <p><strong>Albany International Airport (ALB)</strong></p>
                <p>Located 8 miles from temple, 12 miles from reception</p>
                <p>Approximate taxi fare: $25-35</p>
                <p>Ride share available</p>
              </div>

              <div className="info-card">
                <div className="info-icon">🚗</div>
                <h3>Transportation</h3>
                <p><strong>Public Transit:</strong> CDTA buses serve both venues</p>
                <p><strong>Ride Share:</strong> Uber & Lyft available</p>
                <p><strong>Car Rental:</strong> Available at airport</p>
                <p><strong>Parking:</strong> Free at both venues</p>
              </div>

              <div className="info-card">
                <div className="info-icon">🌤️</div>
                <h3>Weather</h3>
                <p><strong>November Average:</strong> 45°F (7°C)</p>
                <p><strong>Sunny days:</strong> 60% chance</p>
                <p><strong>Rain chance:</strong> 40%</p>
                <p><strong>Dress:</strong> Warm layers recommended</p>
              </div>

              <div className="info-card">
                <div className="info-icon">📞</div>
                <h3>Contact</h3>
                <p><strong>Wedding Coordinator:</strong></p>
                <p>Abhishek & Richa</p>
                <p>avighimire16@gmail.com</p>
                <p>(334) 492-6455</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TravelAccommodation;
