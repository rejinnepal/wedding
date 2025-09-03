import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './OurStory.css';

const OurStory = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const timelineEvents = [
    {
      id: 1,
      date: 'March 15, 2022',
      title: 'First Meeting',
      description: 'We met at a mutual friend\'s Diwali celebration. Abhishek was immediately drawn to Richa\'s beautiful smile and kind heart. What started as a simple conversation about our shared love for Indian culture turned into hours of talking about life, dreams, and everything in between.',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    },
    {
      id: 2,
      date: 'June 20, 2022',
      title: 'First Date',
      description: 'Our first official date was a magical evening at an authentic Indian restaurant. We shared our favorite dishes, talked about our families, and discovered our shared passion for travel and adventure. The chemistry between us was undeniable.',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    },
    {
      id: 3,
      date: 'December 25, 2023',
      title: 'Moving In Together',
      description: 'After a year and a half of dating, we decided to take the next big step and move in together. It was the perfect Christmas gift to ourselves. Our new home became a place filled with love, laughter, and countless memories.',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    },
    {
      id: 4,
      date: 'August 10, 2024',
      title: 'The Proposal',
      description: 'Abhishek planned the most romantic proposal during our vacation in India. He got down on one knee at the Taj Mahal at sunset, with the magnificent monument as our backdrop. Richa said "Yes!" without hesitation, and we celebrated our engagement with our families.',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    },
    {
      id: 5,
      date: 'November 30, 2025',
      title: 'Our Wedding Day',
      description: 'The day we\'ve been dreaming of is finally here! We can\'t wait to celebrate our love with all of our family and friends in a beautiful traditional Indian wedding ceremony. This is just the beginning of our forever together.',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <div className="our-story">
      <div className="story-hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>Our Love Story</h1>
            <p className="hero-subtitle">
              Every love story is beautiful, but ours is our favorite.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="timeline-section" ref={ref}>
        <div className="container">
          <motion.div
            className="timeline"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                variants={itemVariants}
              >
                <div className="timeline-content">
                  <div className="timeline-image">
                    <img src={event.image} alt={event.title} />
                  </div>
                  <div className="timeline-text">
                    <div className="timeline-date">{event.date}</div>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                  </div>
                </div>
                <div className="timeline-marker">
                  <div className="marker-dot"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="story-footer">
        <div className="container">
          <motion.div
            className="footer-content"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2>And the story continues...</h2>
            <p>
              We're so grateful for every moment we've shared together and can't wait 
              to create many more beautiful memories as husband and wife. Thank you 
              for being part of our journey and for celebrating this special day with us.
            </p>
            <div className="love-quote">
              <p>"Love is not about finding the perfect person, but about seeing an imperfect person perfectly."</p>
              <span>- Sam Keen</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
