import React, { useState } from 'react';
import '../styles/Navbar.css'; // Assuming you're styling it
import display from '../assets/icons_FEtask/Display.svg';
import drop from '../assets/icons_FEtask/down.svg'

const Navbar = ({ onGroupChange, onSortChange }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Toggle the display of the dropdown
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <nav className="navbar">
      <div className="nav-disp-btn" onClick={toggleDropdown}>
        <div className="nav-disp-icon">
          <img className='display' src={display} alt='display' />
          <span className="nav-disp-heading">Display</span>
          <div className="nav-disp-drop">
            <img src={drop} alt="dropdown icon" className='dropdown'/>
          </div>
        </div>
      </div>

      {/* Dropdown content */}
      {isDropdownVisible && (
        <div className="nav-disp-dropdown nav-disp-dropdown-show">
          <div className="nav-disp-filters">
            {/* Group By Option */}
            <div className="dropdown-group">
              <label htmlFor="group-by" className="nav-dropdown-category">Group by:</label>
              <select 
                id="group-by" 
                className="nav-selector" 
                onChange={(e) => onGroupChange(e.target.value)} // Pass the selected value to the parent
              >
                <option value="status">Status</option>
                <option value="assigned_user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            {/* Sort By Option */}
            <div className="dropdown-sort">
              <label htmlFor="sort-by" className="nav-dropdown-category">Sort by:</label>
              <select 
                id="sort-by" 
                className="nav-selector" 
                onChange={(e) => onSortChange(e.target.value)} // Pass the selected value to the parent
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
