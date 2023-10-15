import React, {useContext} from 'react'
import { cartContext } from '../Context/CartContext';
import ItemCartList from './ItemCartList';
import {Link} from 'react-router-dom';

const Cart = () => {
    const {cart, clearCart, getCartTotalPrice} = useContext(cartContext);

    if(cart.length == 0) {
        return (
            <div className='container mt-10'>
                <h2 className='mb-3'>No hay productos agregados al carrito de compras</h2>
                <div className='col-md-8 offset-2'>
                    <Link to={"/"} className='btn btn-md btn-outline-primary w-100'>Seguir comprando</Link>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='container mt-10'>
                <div className='row'>
                    <h2 className='mb-3'>Carrito de compras</h2>
                    <ItemCartList />
                </div>
                <hr/>
                <div className='d-flex justify-content-between mb-5'>
                    <div className=''>
                        <h4>Total: ${getCartTotalPrice()}</h4>
                        <h4>Cantidad de productos: {cart.length}</h4>
                    </div>
                    <div>
                        <Link to={"/checkout"} className='btn btn-success'>Finalizar compra</Link>
                    </div>
                    <div>
                        <button className='btn btn-danger' onClick={() => clearCart()}>Vaciar todo el carrito</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart