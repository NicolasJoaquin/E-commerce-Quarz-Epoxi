import React, {useContext} from 'react'
import { cartContext } from '../Context/CartContext';
import ItemCart from './ItemCart';

const ItemCartList = () => {
    const {cart} = useContext(cartContext);

    return (
        <>
            {cart.map((i) => {
                return (
                    <div className='col-md-4' key={i.id}>
                        <ItemCart id={i.id} name={i.name} description={i.description} price={i.price} quantity={i.quantity} pictureUrl={i.pictureUrl} />
                    </div>
                )
            })}
        </>
    )    
}

export default ItemCartList