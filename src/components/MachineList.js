import React, { useState } from 'react';
import WashingMachine from './WashingMachine';
import './WashingMachine.css';

function MachineList() {
  const [machines, setMachines] = useState([
    { id: 1, isUsed: false, countdown: 180 },
    { id: 2, isUsed: false, countdown: 80 },
    { id: 3, isUsed: false, countdown: 180 },
    { id: 4, isUsed: false, countdown: 180 },
    { id: 5, isUsed: false, countdown: 180 },
    { id: 6, isUsed: false, countdown: 180 },
  ]);

  const handleInsertCoin = (id) => {
    setMachines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isUsed: true } : m))
    );
  };

  return (
    <div className="machine-grid">
      {machines.map((machine) => (
        <WashingMachine
          key={machine.id}
          id={machine.id}
          isUsed={machine.isUsed}
          countdown={machine.countdown}
          onInsertCoin={() => handleInsertCoin(machine.id)}
        />
      ))}
    </div>
  );
}

export default MachineList;
