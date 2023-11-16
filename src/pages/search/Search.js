import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useLocation } from 'react-router-dom';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../../firebase';
import './Search.css';
import RecipeList from '../../components/RecipeList';

function Search() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q');

  const fetchRecipes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'recipes'));
      const recipesData = querySnapshot.docs.map(doc => doc.data());
      return recipesData;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      setError('');

      try {
        const recipes = await fetchRecipes();
        setIsPending(false);

        // Use fuse.js for client-side searching
        const fuse = new Fuse(recipes, { keys: ['title'] });
        const results = fuse.search(query);
        setData(results.map(result => result.item));
      } catch (error) {
        setIsPending(false);
        setError('Error fetching recipes');
      }
    };

    if (query && query.trim() !== '') {
      fetchData();
    } else {
      setData([]);
    }

    return () => {
      setData([]);
    };
  }, [query]);

  return (
    <div>
      <h2 className='page-title'>Recipe including "{query}"</h2>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipe={data} />}
    </div>
  );
}

export default Search;
