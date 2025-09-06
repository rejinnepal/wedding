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
      src: `${process.env.PUBLIC_URL}/assets/541250715_1883148642542957_5023874615548922619_n.jpg`,
      alt: 'Abhishek & Richa - Wedding Day',
      category: 'wedding',
      title: 'Our Wedding Day'
    },
    // {
    //   id: 4,
    //   src: `${process.env.PUBLIC_URL}/assets/cats_family_photo.jpg`,
    //   alt: 'Abhishek & Richa - With Luna and Mango',
    //   category: 'family',
    //   title: 'Our Little Family'
    // },
    {
      id: 5,
      src: `${process.env.PUBLIC_URL}/assets/IMG_20170707_024226_050.jpg`,
      alt: 'Abhishek & Richa - Early Days',
      category: 'memories',
      title: 'Early Days'
    },
    {
      id: 6,
      src: `${process.env.PUBLIC_URL}/assets/IMG_20191223_175606.jpg`,
      alt: 'Abhishek & Richa - Winter Memories',
      category: 'memories',
      title: 'Winter Memories'
    },
    {
      id: 7,
      src: `${process.env.PUBLIC_URL}/assets/IMG_4556_adventure.jpg`,
      alt: 'Abhishek & Richa - Adventure Together',
      category: 'adventures',
      title: 'Adventures Together'
    },
    {
      id: 8,
      src: `${process.env.PUBLIC_URL}/assets/IMG_5114.jpg`,
      alt: 'Abhishek & Richa - Love Story',
      category: 'engagement',
      title: 'Our Love Story'
    },
    {
      id: 9,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6473.JPG`,
      alt: 'Abhishek & Richa - Beautiful Moment',
      category: 'engagement',
      title: 'Beautiful Moment'
    },
    {
      id: 10,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6478.JPG`,
      alt: 'Abhishek & Richa - Special Photo',
      category: 'engagement',
      title: 'Special Photo'
    },
    {
      id: 11,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6480.JPG`,
      alt: 'Abhishek & Richa - Love Captured',
      category: 'engagement',
      title: 'Love Captured'
    },
    {
      id: 12,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6499.JPG`,
      alt: 'Abhishek & Richa - Perfect Moment',
      category: 'engagement',
      title: 'Perfect Moment'
    },
    {
      id: 13,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6536.JPG`,
      alt: 'Abhishek & Richa - Together',
      category: 'engagement',
      title: 'Together'
    },
    {
      id: 14,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6542.JPG`,
      alt: 'Abhishek & Richa - Sweet Memories',
      category: 'engagement',
      title: 'Sweet Memories'
    },
    {
      id: 15,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6602.JPG`,
      alt: 'Abhishek & Richa - Joyful Moment',
      category: 'engagement',
      title: 'Joyful Moment'
    },
    {
      id: 16,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6617.JPG`,
      alt: 'Abhishek & Richa - Happy Together',
      category: 'engagement',
      title: 'Happy Together'
    },
    {
      id: 17,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6633.JPG`,
      alt: 'Abhishek & Richa - Love Story',
      category: 'engagement',
      title: 'Love Story'
    },
    {
      id: 18,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6639.JPG`,
      alt: 'Abhishek & Richa - Beautiful Day',
      category: 'engagement',
      title: 'Beautiful Day'
    },
    {
      id: 19,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6643.JPG`,
      alt: 'Abhishek & Richa - Special Day',
      category: 'engagement',
      title: 'Special Day'
    },
    {
      id: 20,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6648.JPG`,
      alt: 'Abhishek & Richa - Perfect Day',
      category: 'engagement',
      title: 'Perfect Day'
    },
    {
      id: 21,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6681_Original.JPG`,
      alt: 'Abhishek & Richa - Original Beauty',
      category: 'engagement',
      title: 'Original Beauty'
    },
    // {
    //   id: 22,
    //   src: `${process.env.PUBLIC_URL}/assets/IMG_6691_Original_copy.JPG`,
    //   alt: 'Abhishek & Richa - Beautiful Copy',
    //   category: 'engagement',
    //   title: 'Beautiful Copy'
    // },
    {
      id: 23,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6716_Original.JPG`,
      alt: 'Abhishek & Richa - Original Moment',
      category: 'engagement',
      title: 'Original Moment'
    },
    {
      id: 24,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6725.JPG`,
      alt: 'Abhishek & Richa - Wonderful Day',
      category: 'engagement',
      title: 'Wonderful Day'
    },
    {
      id: 25,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6765.JPG`,
      alt: 'Abhishek & Richa - Amazing Moment',
      category: 'engagement',
      title: 'Amazing Moment'
    },
    {
      id: 26,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6778.JPG`,
      alt: 'Abhishek & Richa - Lovely Day',
      category: 'engagement',
      title: 'Lovely Day'
    },
    {
      id: 27,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6800.JPG`,
      alt: 'Abhishek & Richa - Perfect Moment',
      category: 'engagement',
      title: 'Perfect Moment'
    },
    {
      id: 28,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6808_Original.JPG`,
      alt: 'Abhishek & Richa - Original Photo',
      category: 'engagement',
      title: 'Original Photo'
    },
    {
      id: 29,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6822_Original.JPG`,
      alt: 'Abhishek & Richa - Beautiful Original',
      category: 'engagement',
      title: 'Beautiful Original'
    },
    {
      id: 30,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6872_Original.JPG`,
      alt: 'Abhishek & Richa - Stunning Original',
      category: 'engagement',
      title: 'Stunning Original'
    },
    {
      id: 31,
      src: `${process.env.PUBLIC_URL}/assets/IMG_6893_Original_copy.JPG`,
      alt: 'Abhishek & Richa - Family Copy',
      category: 'family',
      title: 'Family Copy'
    },
    // {
    //   id: 32,
    //   src: `${process.env.PUBLIC_URL}/assets/IMG_6893_Original.JPG`,
    //   alt: 'Abhishek & Richa - With Our Cats',
    //   category: 'family',
    //   title: 'With Our Cats'
    // },
    {
      id: 33,
      src: `${process.env.PUBLIC_URL}/assets/PXL_20230610_160807595.MP~2.jpeg`,
      alt: 'Abhishek & Richa - Summer 2023',
      category: 'memories',
      title: 'Summer 2023'
    },
    {
      id: 34,
      src: `${process.env.PUBLIC_URL}/assets/PXL_20231221_222540392.MP~2.jpeg`,
      alt: 'Abhishek & Richa - December 2023',
      category: 'memories',
      title: 'December 2023'
    },
    {
      id: 35,
      src: `${process.env.PUBLIC_URL}/assets/PXL_20231226_011616169.jpeg`,
      alt: 'Abhishek & Richa - Holiday Season',
      category: 'memories',
      title: 'Holiday Season'
    },
    {
      id: 36,
      src: `${process.env.PUBLIC_URL}/assets/PXL_20250704_203452695.MP.jpeg`,
      alt: 'Abhishek & Richa - July 2025',
      category: 'engagement',
      title: 'July 2025'
    },
    {
      id: 37,
      src: `${process.env.PUBLIC_URL}/assets/PXL_20250830_182855816.jpeg`,
      alt: 'Abhishek & Richa - August 2025',
      category: 'engagement',
      title: 'August 2025'
    },
    {
      id: 38,
      src: `${process.env.PUBLIC_URL}/assets/QUA58761.jpg`,
      alt: 'Abhishek & Richa - Professional Photo',
      category: 'engagement',
      title: 'Professional Photo'
    },
    {
      id: 39,
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
        {/* <motion.div 
          className="header-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="gallery-title">Our Gallery</h1>
          <p className="gallery-subtitle">
            Capturing moments of love, laughter, and joy as we prepare for our special day
          </p>
        </motion.div> */}
        <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>Our Gallery</h1>
            <p className="hero-subtitle">
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
                    className={`gallery-image ${image.id === 31 ? 'family-copy-image' : ''} ${image.id === 39 ? 'shared-memory-image' : ''}`}
                    loading="lazy"
                    onError={(e) => {
                      console.error('Image failed to load:', image.src);
                      e.target.style.display = 'none';
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', image.src);
                    }}
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
