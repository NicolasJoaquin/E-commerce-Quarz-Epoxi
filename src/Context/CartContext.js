import { createContext, useState } from "react";

export const cartContext = createContext(null);

const CartContext = ({children}) => {
  const [cart, setCart] = useState([]); 
  
  const addProduct = (product) => {
    if(!isInCart(product.id)) {
      setCart([...cart, product]);
    }
    else {
      const actualQuantity = getActualQuantity(product.id);
      const newQuantity = actualQuantity + product.quantity;
      if(newQuantity > product.stock)
        alert ("El stock no es suficiente, no se puede agregar el producto al carrito");
      else {
        product.quantity = newQuantity;
        let newCart = [...cart];
        newCart = newCart.filter((p) => p.id != product.id);
        setCart([...newCart, product]);
      }
    }
  }
  const removeProduct = (id) => {
    const newCart = cart.filter((p) => p.id != id);
    setCart(newCart);
  }
  const getActualQuantity = (id) => {
    const found = cart.find((p) => p.id == id);
    return (found == undefined) ? false : found.quantity;
  }
  const isInCart = (id) => {
    const found = cart.find((p) => p.id == id);
    return (found == undefined) ? false : true;
  }
  const clearCart = () => {
    setCart([]);
  }
  const getCartTotalPrice = () => {
    let total = 0;
    if(cart.length == 0)
      return total;
    cart.forEach((p) => {
      total += p.quantity*p.price;
    });
    return total;
  }

  return (
    <cartContext.Provider value = {{cart, addProduct, removeProduct, getActualQuantity, isInCart, clearCart, getCartTotalPrice}}>
        {children}
    </cartContext.Provider>
  )
}

export default CartContext