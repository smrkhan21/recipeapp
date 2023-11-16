import React, { useEffect, useState } from 'react';
import { ColorRing, Oval } from 'react-loader-spinner';
import RecipeList from '../../components/RecipeList';
import './Home.css'
import { db } from '../../firebase';
import { collection, getDocs } from '@firebase/firestore';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const recipeCollectionRef = collection(db, "recipes")
  useEffect(() => {
    setIsPending(true)
    const getRecipes = async () => {
      const data = await getDocs(recipeCollectionRef)
      setRecipes(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
      setIsPending(false)
    }
    getRecipes()
  }, [])

  return (
    <div>
      {/* {error && <p className='error'>{error}</p>} */}
      {isPending && <p className='loading'>
        {/* Loading... */}
        <center><ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['white', 'white', 'white', 'white', 'white']}
        />
        </center>
      </p>}
      {recipes && <RecipeList recipe={recipes} />}
    </div>
  );
}

export default Home;
