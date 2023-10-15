import React, {useContext} from 'react'
import './CartWidget.css';
import { cartContext } from '../Context/CartContext';

const CartWidget = () => {
  const {cart} = useContext(cartContext);
    const inlineStyle = {
        width: 30, 
        height: 30
    }
  return (
    <div>
        <span>{cart.length}</span> 
        <i style={inlineStyle} className="bi bi-cart-check"></i>
    </div>
  )
}

export default CartWidget