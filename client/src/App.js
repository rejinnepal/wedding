import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Home from './components/Home';
import OurStory from './components/OurStory';
import WeddingDetails from './components/WeddingDetails';
import Gallery from './components/Gallery';
import TravelAccommodation from './components/TravelAccommodation';
import RSVP from './components/RSVP';
import AdminView from './components/AdminView';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/wedding-details" element={<WeddingDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/travel-accommodation" element={<TravelAccommodation />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/admin-view" element={<AdminView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
