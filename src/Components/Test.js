import React, { useContext } from 'react'
import cartContext from '../Context/CartContext';

const Test = () => {
    const context = useContext(cartContext);
    const handleClick = (event) => {
        let tecla = event.key; 
        tecla = tecla.toLowerCase();
        if(tecla == 'a' || tecla == 'e' || tecla == 'i' || tecla == 'o' || tecla == 'u')
            event.preventDefault();
    }

  return (
    <div className='col-md-4 mt-10'>
        <input type='text' className='form-control m-4 col-md-3' placeholder='Escribí...' onKeyDown={handleClick}></input>
    </div>
  )
}

export default Test