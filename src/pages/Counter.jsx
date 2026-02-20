import React, { useState, useEffect } from 'react';

const Counter = () => {
  // Initialize state from localStorage if available, otherwise 0
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem('counterValue');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  // Save to localStorage whenever value changes
  useEffect(() => {
    localStorage.setItem('counterValue', value);
  }, [value]);

  const increment = () => setValue((prev) => prev + 1);
  const decrement = () => setValue((prev) => (prev > 0 ? prev - 1 : 0));
  const reset = () => {
    setValue(0);
    localStorage.setItem('counterValue', 0);
  };

  return (
    <div className="page-container counter-wrapper">
      <h2>Counter Application</h2>
      <div className="counter-container">
        <h1 style={{ color: value === 0 ? 'red' : 'green' }}>{value}</h1>
        <div className="button-group">
          <button onClick={increment} className="btn increment">
            Increment
          </button>
          <button onClick={decrement} className="btn decrement">
            Decrement
          </button>
          <button onClick={reset} className="btn reset">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;