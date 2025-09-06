const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    maxlength: [20, 'Phone number cannot be more than 20 characters']
  },
  attending: {
    type: String,
    required: [true, 'Please indicate if you are attending'],
    enum: ['Yes', 'No'],
    default: 'Yes'
  },
  eventsAttending: {
    type: [String],
    enum: ['Mehendi', 'Wedding', 'Reception'],
    required: function() {
      return this.attending === 'Yes';
    },
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Please select at least one event'
    }
  },
  numberOfGuests: {
    type: Number,
    min: [1, 'Number of guests must be at least 1'],
    max: [5, 'Number of guests cannot exceed 5'],
    required: function() {
      return this.attending === 'Yes';
    }
  },
  plusOneName: {
    type: String,
    trim: true,
    maxlength: [100, 'Plus one name cannot be more than 100 characters'],
    required: function() {
      return this.numberOfGuests === 2;
    }
  },
  mealPreference: {
    type: String,
    enum: ['Veg', 'Non-Veg', 'Vegan', 'No Preference'],
    required: function() {
      return this.attending === 'Yes';
    }
  },
  arrivalDate: {
    type: Date,
    required: function() {
      return this.attending === 'Yes';
    }
  },
  departureDate: {
    type: Date,
    required: function() {
      return this.attending === 'Yes';
    }
  },
  travelMethod: {
    type: String,
    enum: ['Car', 'Flight', 'Train', 'Bus', 'Other'],
    required: function() {
      return this.attending === 'Yes';
    }
  },
  songRequest: {
    type: String,
    trim: true,
    maxlength: [500, 'Song request/message cannot be more than 500 characters']
  },
  allergies: {
    type: String,
    trim: true,
    maxlength: [300, 'Allergies/special needs cannot be more than 300 characters']
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
rsvpSchema.index({ email: 1 });
rsvpSchema.index({ submittedAt: -1 });

// Virtual for formatted date
rsvpSchema.virtual('formattedDate').get(function() {
  return this.submittedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Ensure virtual fields are serialized
rsvpSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('RSVP', rsvpSchema);
