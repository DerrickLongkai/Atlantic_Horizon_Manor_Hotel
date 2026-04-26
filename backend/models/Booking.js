const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    // (Room Type)
    roomType: {
      type: String,
      required: true,
    },
    // (Dates)
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    //(Nights & Travelers)
    totalNights: {
      type: Number,
      required: true,
    },
    totalTravelers: {
      type: Number,
      required: true,
    },
    // (Price)
    price: {
      type: Number,
      required: true,
    },
    // (Guest Info)
    guestInfo: {
      firstName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        default: '',
      },
      requests: {
        type: String,
        default: '',
      }
    },
    // (Order Status)
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending'
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Booking', bookingSchema);