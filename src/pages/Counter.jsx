import React, { useState } from 'react';

const Counter = () => {
  const [value, setValue] = useState(0);

  const increment = () => setValue((prev) => prev + 1);
  const decrement = () => setValue((prev) => (prev > 0 ? prev - 1 : 0));
  const reset = () => setValue(0);

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