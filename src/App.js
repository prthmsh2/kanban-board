import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import DisplayOption from './components/DisplayOption';
import './App.css';

const App = () => {
  // Function to get a value from localStorage safely
  const getLocalStorageItem = (key, defaultValue) => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? storedValue : defaultValue;
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage`, error);
      return defaultValue; // Fallback to the default value if localStorage is not available
    }
  };

  // Function to set a value in localStorage safely
  const setLocalStorageItem = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting ${key} in localStorage`, error);
    }
  };

  // Initialize state with localStorage or default value
  const [groupingBy, setGroupingBy] = useState(getLocalStorageItem('groupingBy', 'priority'));
  const [orderBy, setOrderBy] = useState(getLocalStorageItem('orderBy', 'priority'));

  // Update localStorage when state changes
  useEffect(() => {
    setLocalStorageItem('groupingBy', groupingBy);
    setLocalStorageItem('orderBy', orderBy);
  }, [groupingBy, orderBy]);

  return (
    <div className="App">
      <header className="App-header">
        <DisplayOption
          groupingBy={groupingBy}
          setGroupingBy={setGroupingBy}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
        />
      </header>
      <main>
        <Board groupingBy={groupingBy} orderBy={orderBy} />
      </main>
    </div>
  );
};

export default App;
