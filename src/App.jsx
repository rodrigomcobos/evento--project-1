import React from 'react'
import Navbar from './components/NavBar'
import SearchBar from './components/SearchBar'
import CustomSlider from './components/Slider';
import EventsSection from './components/EventsSection';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-6">
        <SearchBar />
        <CustomSlider />
        <EventsSection />
        <Footer />
      </div>
    </div>

  )
}

export default App