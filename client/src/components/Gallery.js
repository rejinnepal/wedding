import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Gallery images - All your beautiful photos
  const galleryImages = [
    {
      id: 1,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6691_Original.JPG`,
      alt: 'Abhishek & Richa - Our Beautiful Photo',
      category: 'engagement',
      title: 'Our Beautiful Moment'
    },
    {
      id: 2,
      src: `${process.env.PUBLIC_URL}/assets/258F1EA6-4BF5-422C-AEBA-75D05FB612BC.JPG`,
      alt: 'Abhishek & Richa - Special Moment',
      category: 'engagement',
      title: 'Special Moment Together'
    },
    {
      id: 3,
      src: `${process.env.PUBLIC_URL}/assets/IMG_20170707_024226_050.jpg`,
      alt: 'Abhishek & Richa - Early Days',
      category: 'memories',
      title: 'Early Days'
    },
    {
      id: 4,
      src: `${process.env.PUBLIC_URL}/assets/IMG_20191223_175606.jpg`,
      alt: 'Abhishek & Richa - Winter Memories',
      category: 'memories',
      title: 'Winter Memories'
    },
    {
      id: 5,
      src: `${process.env.PUBLIC_URL}/assets/IMG_5114.jpg`,
      alt: 'Abhishek & Richa - Love Story',
      category: 'engagement',
      title: 'Our Love Story'
    },
    {
      id: 6,
      src: `${process.env.PUBLIC_URL}/assets/PXL_20230610_160807595.MP~2.jpeg`,
      alt: 'Abhishek & Richa - Summer 2023',
      category: 'memories',
      title: 'Summer 2023'
    },
    {
      id: 7,
      src: `${process.env.PUBLIC_URL}/assets/PXL_20231221_222540392.MP~2.jpeg`,
      alt: 'Abhishek & Richa - December 2023',
      category: 'memories',
      title: 'December 2023'
    },
    {
      id: 8,
      src: `${process.env.PUBLIC_URL}/assets/PXL_20231226_011616169.jpeg`,
      alt: 'Abhishek & Richa - Holiday Season',
      category: 'memories',
      title: 'Holiday Season'
    },
    {
      id: 9,
      src: `${process.env.PUBLIC_URL}/assets/PXL_20250704_203452695.MP.jpeg`,
      alt: 'Abhishek & Richa - July 2025',
      category: 'engagement',
      title: 'July 2025'
    },
    {
      id: 10,
      src: `${process.env.PUBLIC_URL}/assets/PXL_20250830_182855816.jpeg`,
      alt: 'Abhishek & Richa - August 2025',
      category: 'engagement',
      title: 'August 2025'
    },
    {
      id: 11,
      src: `${process.env.PUBLIC_URL}/assets/QUA58761.jpg`,
      alt: 'Abhishek & Richa - Professional Photo',
      category: 'engagement',
      title: 'Professional Photo'
    },
    {
      id: 12,
      src: `${process.env.PUBLIC_URL}/assets/received_2252639471531614~2.jpeg`,
      alt: 'Abhishek & Richa - Shared Memory',
      category: 'memories',
      title: 'Shared Memory'
    }
  ];

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentIndex(0);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(galleryImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(galleryImages[prevIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  return (
    <div className="gallery">
      {/* Header Section */}
      <section className="gallery-header">
        <motion.div 
          className="header-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="gallery-title">Our Gallery</h1>
          <p className="gallery-subtitle">
            Capturing moments of love, laughter, and joy as we prepare for our special day
          </p>
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-section">
        <motion.div 
          className="gallery-container"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => openLightbox(image, index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="image-container">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <h3 className="image-title">{image.title}</h3>
                      <div className="view-icon">👁️</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div className="lightbox-backdrop" onClick={closeLightbox}></div>
            
            <div className="lightbox-content">
              <button className="lightbox-close" onClick={closeLightbox}>
                ✕
              </button>
              
              <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
                ‹
              </button>
              
              <motion.div
                className="lightbox-image-container"
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="lightbox-image"
                />
              </motion.div>
              
              <button className="lightbox-nav lightbox-next" onClick={nextImage}>
                ›
              </button>
              
              <div className="lightbox-info">
                <h3 className="lightbox-title">{selectedImage.title}</h3>
                <p className="lightbox-counter">
                  {currentIndex + 1} of {galleryImages.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
