import React, {useContext} from 'react'
import { cartContext } from '../Context/CartContext';

const ItemCart = ({id, name, description, price, quantity, pictureUrl}) => {
    const {removeProduct} = useContext(cartContext);

    return (
        <div className='mb-3 text-center'>
            <div className="card" style={{width: "25rem"}}>
                <img src={"../" + pictureUrl} className="card-img-top" alt={name} />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p>{description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <p>Precio por unidad: <strong>${price}</strong></p>
                        <p>Cantidad: <strong>{quantity}</strong></p> 
                        <p>Total: <strong>${price*quantity}</strong></p>
                        <button className='btn btn-md btn-outline-danger w-100' onClick={() => removeProduct(id)}>Eliminar este producto del carrito</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ItemCart