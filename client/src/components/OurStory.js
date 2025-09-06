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
      date: '2013',
      title: 'High School Sweethearts',
      description: 'Our story began in 2013, in the quiet halls of high school. Richa, shy and focused on her studies, never expected her life to change when Abhishek gathered the courage to propose. With his persistence and a heart full of hope, she eventually said yes — and from that moment, a beautiful journey began, one that grew quietly, like a secret only the two of us shared.',
      image: `${process.env.PUBLIC_URL}/assets/IMG_20170707_024226_050.jpg`
    },
    {
      id: 2,
      date: '2016-2017',
      title: 'Crossing Continents',
      description: 'Life took us across continents. In 2016, Abhishek came to the U.S. for his studies, and in 2017, Richa followed. From then until 2022, we lived in a long-distance rhythm, cherishing summers and spring breaks when we could reunite. It wasn\'t easy, but the distance only deepened our love and taught us the true meaning of patience, faith, and commitment.',
      image: `${process.env.PUBLIC_URL}/assets/IMG_20191223_175606.jpg`
    },
    {
      id: 3,
      date: 'March 15, 2022',
      title: 'The Proposal',
      description: 'On March 15, 2022, Abhishek asked the question once more — this time with a ring — and Richa said "Yes, of course!" Just two months later, she moved from Boston to Troy, choosing love and togetherness after years apart.',
      image: `${process.env.PUBLIC_URL}/assets/IMG_6691_Original.JPG`
    },
    {
      id: 4,
      date: '2022-2025',
      title: 'Adventures Together',
      description: 'Since then, life has been a new adventure. Our first trip was to Niagara Falls, a place that will forever symbolize our first chapter living together. Soon after, we discovered our love for the outdoors and became "National Park junkies," traveling to six parks so far with many more to come.',
      image: `${process.env.PUBLIC_URL}/assets/IMG_4556_adventure.jpg`
    },
    {
      id: 5,
      date: 'October 2022 & April 2025',
      title: 'Our Little Family',
      description: 'Our little family grew too — with Luna, our sweet girl, in October 2022, and Mango, our playful boy, in April 2025. They\'ve filled our lives with laughter, warmth, and love.',
      image: `${process.env.PUBLIC_URL}/assets/IMG_6893_Original.JPG`
    },
    {
      id: 6,
      date: 'November 30, 2025',
      title: 'Our Wedding Day',
      description: 'Through every chapter — graduations, careers, adventures, challenges — the greatest gift has been each other. From high school sweethearts to life partners, we are endlessly grateful to have found love so early, to have grown together, and to continue writing this story hand in hand.',
      image: `${process.env.PUBLIC_URL}/assets/541250715_1883148642542957_5023874615548922619_n.jpg`
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
