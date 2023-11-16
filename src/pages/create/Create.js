import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import './Create.css';
import { db } from '../../firebase';
import { collection, addDoc, doc, getDoc, updateDoc } from '@firebase/firestore';
import { convertToMinutes } from '../../utils/constants';


function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newingredient, setNewIngredient] = useState('')
  const [data, setData] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [isPending, setIsPending] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const ingredientInput = useRef(null)
  const history = useHistory()
  const recipeCollectionRef = collection(db, 'recipes')

  const { id } = useParams();

  // console.log(id);

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id) {
      const updateRecipe = async (postData) => {
        setIsPending(true);
        const docRef = doc(db, 'recipes', id)
        await updateDoc(docRef, postData);
        history.push('/')
      }
      updateRecipe({ title, ingredients, method, cookingTime: cookingTime + ' minutes' })
    } else {
      const createRecipe = async (postData) => {
        await addDoc(recipeCollectionRef, postData)
        setData(postData)
      }
      createRecipe({ title, ingredients, method, cookingTime: cookingTime + ' minutes' })
    }
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newingredient.trim()
    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredeint => [...prevIngredeint, ing])
    }
    setNewIngredient('')
    ingredientInput.current.focus()
  }

  useEffect(() => {
    if (data) {
      history.push('/')
    }
  }, [data]);

  useEffect(() => {
    if (id) {
      const getRecipe = async (id) => {
        setIsPending(true);
        const docRef = await doc(db, 'recipes', id)
        const docSnap = await getDoc(docRef);
        console.log(docSnap);
        if (!docSnap.exists()) {
          history.push("/")
        } else {
          const recipe = docSnap.data();
          if (recipe) {
            setTitle(recipe.title)
            setIngredients(recipe.ingredients)
            setCookingTime(convertToMinutes(recipe.cookingTime))
            setMethod(recipe.method)
          }

        }
        setIsPending(false);
      }
      getRecipe(id)
    }
  }, [])

  return (
    <div className='create'>
      <h2 className='page-title'>{
        id ? "Update Recipe" : "Add New Recipe"
      }</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>Recipe Ingredients: </span>
          <div className='ingredients'>
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newingredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className='btn'>Add</button>
          </div>
          <p>Current Ingredients: {ingredients?.map((i) => <em key={i}>{i},</em>)}</p>
        </label>
        <label>
          <span>Method: </span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking Time (minutes): </span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className='btn'>Submit</button>
      </form>
    </div>
  );
}

export default Create;
