import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import {getFirestore, collection, getDocs, where, query, orderBy} from 'firebase/firestore';

const ItemListContainer = ({greeting}) => {  
  // Hooks
  const [actualProducts, setActualProducts] = useState(['loader']);
  const {category, categoryId} = useParams();

  useEffect(() => {
    // get de los datos (productos) desde Firebase
    const queryDb = getFirestore();
    const queryCollection = collection(queryDb, 'products');
    // Filtrado por categoría
    if(categoryId) {
      const queryFilterCatId = query(queryCollection, where('categoryId', '==', parseInt(categoryId)), orderBy('categoryId', 'asc'));
      getDocs(queryFilterCatId)
      .then((res) => setActualProducts(res.docs.map((p) => ({id: p.id, ...p.data()}))))
    }
    if(category) {
      const queryFilterCat = query(queryCollection, where('category', '==', category), orderBy('categoryId', 'asc'));
      getDocs(queryFilterCat)
      .then((res) => setActualProducts(res.docs.map((p) => ({id: p.id, ...p.data()}))))
    }
    if(categoryId == undefined && category == undefined) {
      const queryNotFiltered = query(queryCollection, orderBy('categoryId', 'asc'))
      getDocs(queryNotFiltered)
      .then((res) => setActualProducts(res.docs.map((p) => ({id: p.id, ...p.data()}))))  
    }
    // Función de limpieza
    return () => setActualProducts(['loader'])
  }, [category, categoryId])
  
  return (
    <div className='container mt-10'>
      <div className='row'>
        <ItemList items={actualProducts}/>
      </div>
    </div>
  )
}

export default ItemListContainer