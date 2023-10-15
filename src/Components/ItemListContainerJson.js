import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import arrayProductos from '../Json/arrayProductos.json';
import ItemList from './ItemList';
const ItemListContainer = ({greeting}) => {
  // Funciones y promesas
  const getProducts = () => {
    return new Promise((resolve, reject) => {
      const productsFiltered = arrayProductos.filter((p) => {
        if(category != undefined && p.category == category) {
          return p
        }
        if(categoryId != undefined && p.categoryId == categoryId) {
          return p
        }
      })
      let newProducts = [];
      if(category == undefined && categoryId == undefined)
        newProducts = arrayProductos
      else
        newProducts = productsFiltered
      setTimeout(() => {
        resolve(newProducts);
      }, 2000);    
    });
  }
  const mock = async () => {
    try {
      const data = await getProducts();
      setActualProducts(data)
    }
    catch(err) {
      console.log("Error: ", err)
    }
  }
  // Hooks
  const [actualProducts, setActualProducts] = useState(['loader']);
  const {category, categoryId} = useParams();
  useEffect(() => {
    mock();
    // Función de limpieza
    return () => setActualProducts(['loader'])
  }, [category, categoryId])
  return (
    <div className='container'>
      <div className='row'>
        <ItemList items={actualProducts}/>
      </div>
    </div>
  )
}

export default ItemListContainer