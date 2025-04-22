// App.jsx
import React from 'react';
import MachineList from './components/MachineList';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <div className="app-container">
        <h1 id="machines">ระบบร้านซักผ้าอัตโนมัติ 🧺</h1>
        <MachineList />
        <AboutSection />
      </div>
    </div>
  );
}

export default App;
