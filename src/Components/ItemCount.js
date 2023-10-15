import React from 'react'
import { useState } from 'react'

const ItemCount = ({stock, initial, onClickAddToCart}) => {
  const [currentQuantity, setCurrentQuantity] = useState(initial);

  const onAdd = () => {
    if(currentQuantity < stock)
      setCurrentQuantity(currentQuantity + 1);
    else
      alert('El stock no es suficiente, no se pueden agregar más unidades');
  }
  const onRemove = () => {
    if(currentQuantity > 1)
      setCurrentQuantity(currentQuantity - 1);
  }

  return (
    <div className='bg-light m-2 p-2 col-md-12 rounded'>
        <div className="btn-group border border-secondary-subtle col-md-12 bg-white" role="group" aria-label="Basic example">
            <button type="button" className="btn" onClick={() => onRemove()}>-</button>
            <span className='text-center p-3 col-md-4'>{currentQuantity}</span>
            <button type="button" className="btn" onClick={() => onAdd()}>+</button>
        </div> 
        <div className='m-2'>
            <button type="button" className='btn btn-md btn-outline-primary w-100' onClick={(evt) => {
              onClickAddToCart(currentQuantity)
              setCurrentQuantity(initial)
            }}>Agregar al carrito</button>
        </div>
    </div>
  )
}

export default ItemCount