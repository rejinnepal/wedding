import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import axios from 'axios';
import './RSVP.css';

const RSVP = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();

  const attending = watch('attending');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
              const response = await axios.post('https://wedding-yec2.onrender.com/api/rsvp', data);
      
      toast.success(response.data.message);
      setIsSubmitted(true);
      reset();
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.error('RSVP submission error:', error);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rsvp" id="rsvp-section">
        <div className="container">
          <motion.div
            className="thank-you-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="thank-you-icon">💝</div>
            <h1>Thank You!</h1>
            <p>We've received your RSVP and can't wait to celebrate with you!</p>
            <p className="subtitle">We'll be in touch with more details soon.</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="rsvp" id="rsvp-section">
      <div className="rsvp-hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>RSVP</h1>
            <p className="hero-subtitle">
              Please let us know if you'll be joining us on our special day
            </p>
          </motion.div>
        </div>
      </div>

      <section className="rsvp-form-section" ref={ref}>
        <div className="container">
          <motion.div
            className="form-container"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="rsvp-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  {...register('fullName', {
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                  className={errors.fullName ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <span className="error-message">{errors.fullName.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  {...register('phoneNumber', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[+]?[1-9][\d]{0,15}$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                  className={errors.phoneNumber ? 'error' : ''}
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && (
                  <span className="error-message">{errors.phoneNumber.message}</span>
                )}
              </div>

              <div className="form-group">
                <label>Will you attend? *</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      value="Yes"
                      {...register('attending', {
                        required: 'Please select an option'
                      })}
                    />
                    <span className="radio-custom"></span>
                    <span className="radio-label">Yes</span>
                  </label>
                  
                  <label className="radio-option">
                    <input
                      type="radio"
                      value="No"
                      {...register('attending', {
                        required: 'Please select an option'
                      })}
                    />
                    <span className="radio-custom"></span>
                    <span className="radio-label">No</span>
                  </label>
                </div>
                {errors.attending && (
                  <span className="error-message">{errors.attending.message}</span>
                )}
              </div>

              {attending === 'Yes' && (
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="numberOfGuests">How many people (including you) are attending? *</label>
                  <select
                    id="numberOfGuests"
                    {...register('numberOfGuests', {
                      required: 'Please select number of guests'
                    })}
                    className={errors.numberOfGuests ? 'error' : ''}
                  >
                    <option value="">Select number of guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                  </select>
                  {errors.numberOfGuests && (
                    <span className="error-message">{errors.numberOfGuests.message}</span>
                  )}
                </motion.div>
              )}

              {attending === 'Yes' && (
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="mealPreference">Meal preference *</label>
                  <select
                    id="mealPreference"
                    {...register('mealPreference', {
                      required: 'Please select meal preference'
                    })}
                    className={errors.mealPreference ? 'error' : ''}
                  >
                    <option value="">Select meal preference</option>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                    <option value="Vegan">Vegan</option>
                    <option value="No Preference">No Preference</option>
                  </select>
                  {errors.mealPreference && (
                    <span className="error-message">{errors.mealPreference.message}</span>
                  )}
                </motion.div>
              )}

              {attending === 'Yes' && (
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="arrivalDate">Date of Arrival *</label>
                  <input
                    type="date"
                    id="arrivalDate"
                    {...register('arrivalDate', {
                      required: 'Please select arrival date'
                    })}
                    className={errors.arrivalDate ? 'error' : ''}
                  />
                  {errors.arrivalDate && (
                    <span className="error-message">{errors.arrivalDate.message}</span>
                  )}
                </motion.div>
              )}

              {attending === 'Yes' && (
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="departureDate">Date of Departure *</label>
                  <input
                    type="date"
                    id="departureDate"
                    {...register('departureDate', {
                      required: 'Please select departure date'
                    })}
                    className={errors.departureDate ? 'error' : ''}
                  />
                  {errors.departureDate && (
                    <span className="error-message">{errors.departureDate.message}</span>
                  )}
                </motion.div>
              )}

              {attending === 'Yes' && (
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="travelMethod">How will you be coming? *</label>
                  <select
                    id="travelMethod"
                    {...register('travelMethod', {
                      required: 'Please select travel method'
                    })}
                    className={errors.travelMethod ? 'error' : ''}
                  >
                    <option value="">Select travel method</option>
                    <option value="Car">Car</option>
                    <option value="Flight">Flight</option>
                    <option value="Train">Train</option>
                    <option value="Bus">Bus</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.travelMethod && (
                    <span className="error-message">{errors.travelMethod.message}</span>
                  )}
                </motion.div>
              )}

              <div className="form-group">
                <label htmlFor="songRequest">Song request or message for the couple (optional)</label>
                <textarea
                  id="songRequest"
                  {...register('songRequest', {
                    maxLength: {
                      value: 500,
                      message: 'Message cannot exceed 500 characters'
                    }
                  })}
                  className={errors.songRequest ? 'error' : ''}
                  placeholder="Share your song request, well wishes, or any special requests..."
                  rows="4"
                />
                {errors.songRequest && (
                  <span className="error-message">{errors.songRequest.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="allergies">Any allergies or special needs? (optional)</label>
                <textarea
                  id="allergies"
                  {...register('allergies', {
                    maxLength: {
                      value: 300,
                      message: 'Allergies/special needs cannot exceed 300 characters'
                    }
                  })}
                  className={errors.allergies ? 'error' : ''}
                  placeholder="Please let us know about any dietary restrictions, allergies, or special accommodations needed..."
                  rows="3"
                />
                {errors.allergies && (
                  <span className="error-message">{errors.allergies.message}</span>
                )}
              </div>

              <motion.button
                type="submit"
                className="btn submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending...' : 'Send RSVP'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RSVP;
