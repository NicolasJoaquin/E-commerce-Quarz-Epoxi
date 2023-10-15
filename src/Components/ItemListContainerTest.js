import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import arrayProductos from '../Json/arrayProductos.json';
import ItemList from './ItemList';

import FetchData from './FetchData';
import ItemCount from './ItemCount';
const ItemListContainer = ({greeting}) => {
  // Funciones y promesas
  const getProduct = (id) => {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              let found = arrayProductos.find(p => p.id == id );
              if(found !== undefined)
                  resolve(found);
              else
                  reject(new Error("No hay producto con ese id"));
          }, 1500);
      });
  }
  async function getProductAwait(id) {
    try {
      let p = await getProduct(id);
      console.log("Producto: ", p);
    }
    catch(err) {
      console.log(err.message)
    }
  }
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
      console.log(productsFiltered.length);
      if(category == undefined && categoryId == undefined)
        newProducts = arrayProductos
      else
        newProducts = productsFiltered
      setTimeout(() => {
        resolve(newProducts);
      }, 2000);
    });
  }
  async function mock() {
    try {
      let p = await getProducts();
      console.log("Productos: ", p);
      setActualProducts(p);
    }
    catch(err) {
      console.log(err.message)
    }
  }
  // Hooks
  const [actualProducts, setActualProducts] = useState(['loader']);
  const {category, categoryId} = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await new Promise((resolve, reject) => {
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
        })
        setActualProducts(data)
      }
      catch(err) {
        console.log("Error: ", err)
      }
    }
    fetchData();
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