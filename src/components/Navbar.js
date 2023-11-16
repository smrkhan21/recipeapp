import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";

// style
import './Navbar.css'
// components
import Searchbar from './Searchbar'

export default function Navbar() {
  return (
    <div className='navbar'>
      <nav>
        <Link to="/" className='brand'>
          <h1>Recipe App</h1>
        </Link>
        <div className='header-actions'>
          <Searchbar className='searchbar' />
          <Link to="/create" className='addbtn'>
            <h1>Add Recipe</h1>
          </Link>
        </div>
      </nav>
    </div>
  );
}
