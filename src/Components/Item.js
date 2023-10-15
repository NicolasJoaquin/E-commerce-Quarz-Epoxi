import React from 'react'
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { cartContext } from '../Context/CartContext.js';

const Item = ({id, name, description, price, stock, pictureUrl}) => {
    const {isInCart, getActualQuantity} = useContext(cartContext);

  return (
    <div className='mb-3 text-center'>
        <div className="card" style={{width: "25rem"}}>
            <img src={"../" + pictureUrl} className="card-img-top" alt={name} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
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
                    <Link to={"/item/" + id} className='btn btn-md btn-outline-primary w-100'>Ver detalle</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Item