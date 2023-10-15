import React from 'react'
import ItemCount from './ItemCount'
import {Link} from 'react-router-dom';
import { useState, useContext } from 'react';
import { cartContext } from '../Context/CartContext.js';

const ItemDetail = ({id, name, description, price, stock, pictureUrl, categoryId}) => {
    const [quantityToAdd, setQuantityToAdd] = useState(1);
    const {addProduct, isInCart, getActualQuantity} = useContext(cartContext);
    
    function addToCart(value) {
        setQuantityToAdd(value);
        addProduct({id: id, name: name, description: description, price: price, stock: stock, pictureUrl: pictureUrl, quantity: value, categoryId: categoryId})
    }
    
  return (
    <div className='col-md-4 offset-md-4 mb-3'>
        <div className="card" style={{width: "25rem"}}>
            <img src={"../" + pictureUrl} className="card-img-top" alt={name} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <p>Precio: <strong>${price}</strong></p> 
                    <p className='mb-2'>Cantidad en stock: <strong>{stock <= 0 ? "Sin stock" : stock}</strong></p>
                    {
                        isInCart(id) ? 
                        <div className='alert alert-info mb-2 p-2' role='alert'>¡<strong>{getActualQuantity(id)}</strong> unidades en el carrito!</div> : 
                        ""
                    }
                    <div className="card-body p-0">
                        {stock <= 0 ? "" : <ItemCount stock={stock} initial={1} onClickAddToCart={addToCart}/>}
                        <Link to={"/category/" + categoryId} className='btn btn-md btn-outline-secondary w-50'>Volver</Link>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default ItemDetail