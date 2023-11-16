import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './Recipe.css'
import { db } from '../../firebase';
import { collection, doc, getDoc, deleteDoc } from '@firebase/firestore';

function Recipe() {
  const recipeCollectionRef = collection(db, "recipes")
  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState("")
  const history = useHistory()

  const { id } = useParams()

  useEffect(() => {
    const getRecipe = async (id) => {
      setIsPending(true);
      const docRef = await doc(db, 'recipes', id)
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        setError("Some error occured!")
      } else {
        setRecipe(docSnap.data());
      }
      setIsPending(false);
    }
    getRecipe(id)
  }, [])

  const deleteRecipe = async (id) => {
    setIsPending(true);
    const docRef = doc(db, 'recipes', id)
    await deleteDoc(docRef);
    setIsPending(false);
    history.push('/')
  }

  const handleEdit = (id) => {
    history.push("/create/"+id)
  }

  return (
    <div className='recipe'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>{recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className='method'>{recipe.method}</p>
          <div className='buttons'>
            <button className='action edit' onClick={() => handleEdit(id)}>Edit</button>
            <button className='action delete' onClick={() => deleteRecipe(id)}>Delete</button>
          </div>
        </>
      )
      }
    </div>
  );
}

export default Recipe;
