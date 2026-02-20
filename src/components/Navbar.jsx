import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <h2 className="logo">Student Portal</h2>
      <div className="menu-icon" onClick={toggleMenu}>
        <span className="icon">{isOpen ? "✖" : "☰"}</span>
      </div>
      <ul className={`nav-links ${isOpen ? 'active-menu' : ''}`}>
        <li>
          <NavLink to="/" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/students" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
            Students
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
            Add Student
          </NavLink>
        </li>
        <li>
          <NavLink to="/counter" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
            Counter
          </NavLink>
        </li>
      </ul>
      <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </nav>
  );
};

export default Navbar;
