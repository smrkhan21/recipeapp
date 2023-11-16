import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './Searchbar.css'

export default function Searchbar() {
  const [term, setTerm] = useState('')
  const { id } = useParams()
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    history.push(`/search?q=${term}`)
  }

  return (
    <div className='searchbar'>
      <form onSubmit={handleSubmit}>
        <lable htmlFor='search'>Search: </lable>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          required
        />
      </form>
    </div>
  );
}
