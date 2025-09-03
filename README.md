# Abhishek & Richa's Wedding Website

A beautiful, responsive wedding website built with React, Node.js, and MongoDB. This elegant single-page application features a romantic design with RSVP functionality, guest management, and comprehensive wedding information.

## 🌟 Features

### Frontend (React)
- **Responsive Design**: Beautiful layout that works perfectly on desktop, tablet, and mobile
- **Romantic Theme**: Elegant dusty rose, gold, and ivory color palette
- **Smooth Animations**: Framer Motion animations and scroll-triggered effects
- **Interactive Components**: 
  - Countdown timer to the wedding day
  - RSVP form with validation
  - Timeline of the couple's story
  - Google Maps integration
  - Hotel recommendations and local attractions

### Backend (Node.js + Express)
- **RESTful API**: Clean API endpoints for RSVP management
- **MongoDB Integration**: Mongoose ODM for data persistence
- **Security Features**: 
  - Input validation and sanitization
  - Rate limiting
  - Helmet security headers
  - CORS protection
- **Comprehensive Logging**: Winston logger with file rotation
- **Error Handling**: Robust error handling and validation

### Key Pages
1. **Home**: Hero section with digital invitation and countdown timer
2. **Our Story**: Beautiful timeline of the couple's relationship
3. **Wedding Details**: Ceremony/reception info, dress code, parking, and timeline
4. **Travel & Accommodation**: Hotel recommendations and local attractions
5. **RSVP**: Interactive form with validation and thank you message
6. **Admin View**: Hidden page for viewing RSVP responses (accessible at `/admin-view`)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wedding-website
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Environment Setup**
   ```bash
   # Copy and edit the environment file
   cp config.env.example config.env
   ```
   
   Update `config.env` with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/wedding-website
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   # Development mode (runs both frontend and backend)
   npm run dev
   
   # Or run separately:
   npm run server    # Backend only
   npm run client    # Frontend only
   ```

5. **Access the website**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin View: http://localhost:3000/admin-view

## 📁 Project Structure

```
wedding-website/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── utils/             # Utilities (logging)
│   └── index.js           # Server entry point
├── logs/                  # Application logs
├── config.env             # Environment variables
├── package.json
└── README.md
```

## 🎨 Customization

### Colors and Typography
The website uses CSS custom properties for easy theming. Update the variables in `client/src/index.css`:

```css
:root {
  --dusty-rose: #D4A574;
  --gold: #D4AF37;
  --ivory: #FFFFF0;
  /* ... other colors */
  
  --font-script: 'Great Vibes', cursive;
  --font-body: 'Merriweather', serif;
}
```

### Wedding Information
Update the wedding details in the respective components:
- **Date**: Update in `client/src/components/Home.js` (line 15)
- **Venue**: Update in multiple components
- **Couple Names**: Update throughout the application
- **Timeline Events**: Update in `client/src/components/OurStory.js`

**Current Wedding Details:**
- **Couple**: Abhishek & Richa
- **Date**: November 30th, 2025
- **Ceremony**: Hindu Temple Society, Albany, NY
- **Reception**: Hilton Garden Inn Troy, Troy, NY
- **Mehendi**: November 29th, 2025 at Hindu Temple Society

### Images
Replace placeholder images with actual photos:
- Timeline images in `OurStory.js`
- Hero background (add to CSS)
- Venue photos

## 🔧 API Endpoints

### RSVP Management
- `POST /api/rsvp` - Submit new RSVP
- `GET /api/rsvp` - Get all RSVPs (admin)
- `GET /api/rsvp/summary` - Get RSVP summary

### Request/Response Examples

**Submit RSVP:**
```json
POST /api/rsvp
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "attending": "Joyfully Accepts",
  "numberOfGuests": 2,
  "message": "Can't wait to celebrate with you!"
}
```

**Get RSVPs (Admin):**
```json
GET /api/rsvp
Response:
{
  "rsvps": [...],
  "summary": {
    "totalRSVPs": 25,
    "attendingCount": 20,
    "totalGuests": 45
  }
}
```

## 📊 Logging

The application uses Winston for comprehensive logging:
- **Location**: `logs/app.log` and `logs/error.log`
- **Logs**: Server startup, API requests, RSVP submissions, errors
- **Rotation**: Automatic log rotation with size limits

## 🚀 Deployment

### Frontend (React)
```bash
cd client
npm run build
```

### Backend (Node.js)
```bash
npm start
```

### Environment Variables for Production
```bash
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
PORT=5000
```

## 🔒 Security Features

- **Input Validation**: All user inputs are validated and sanitized
- **Rate Limiting**: API endpoints are rate-limited to prevent abuse
- **Security Headers**: Helmet.js provides security headers
- **CORS**: Configured for cross-origin requests
- **Data Validation**: MongoDB schema validation

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🎯 Future Enhancements

- [ ] Photo gallery
- [ ] Guest book functionality
- [ ] Email notifications
- [ ] Wedding registry integration
- [ ] Live streaming integration
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 💝 Support

For questions or support, please contact the wedding couple or the development team.

---

**Built with ❤️ for Abhishek & Richa's special day**
