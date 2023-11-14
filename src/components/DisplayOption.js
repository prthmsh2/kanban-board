import React, { useState, useEffect, useRef } from 'react';
import './DisplayOption.css';
import {ChevronDown, Sliders} from 'react-feather'

const DisplayOption = ({ groupingBy, setGroupingBy, orderBy, setOrderBy }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); 

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="display-option-container" ref={dropdownRef}>
      <button className="dropbtn" onClick={toggleDropdown}>
        <div className='display-visible'>
            <Sliders/> 
            <div className='display-display'>Display </div>
            <ChevronDown/>
        </div>
      </button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          <div className='dropdown-display-option'>
            <div className="dropdown-label">Grouping</div>
            <select value={groupingBy} onChange={(e) => setGroupingBy(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="user">User</option>
                <option value="status">Status</option>
            </select>
          </div>
          <div className='dropdown-display-option'>
            <div className="dropdown-label">Ordering</div>
            <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayOption;
