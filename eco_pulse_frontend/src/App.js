import React from 'react';
import './App.css';
import AirQualityCard from './components/AirQualityCard';

function App() {
  // Test coordinates: New York City, NY, USA
  const newYorkCityCoords = { lat: 40.7128, lon: -74.0060 };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn">Template Button</button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="hero">
            <div className="subtitle">AI Workflow Manager Template</div>

            <h1 className="title">eco_pulse_frontend</h1>

            <div className="description">
              Start building your application.
            </div>

            <button className="btn btn-large">Button</button>
          </div>
          {/* --- Air Quality for New York City prominently displayed --- */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
            <AirQualityCard coords={newYorkCityCoords} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;