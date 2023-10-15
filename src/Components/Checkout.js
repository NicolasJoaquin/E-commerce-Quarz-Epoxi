import React from 'react'
import { useState, useContext } from 'react'
import {getFirestore, addDoc, collection, doc, getDoc, updateDoc} from 'firebase/firestore'
import { cartContext } from '../Context/CartContext' 
import {Link} from 'react-router-dom';
import Cart from './Cart'

const Checkout = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmation, setEmailConfirmation] = useState("");
    const [error, setError] = useState("");
    const [orderId, setOrderId] = useState("");

    const {cart, getCartTotalPrice, clearCart} = useContext(cartContext);

    const validateForm = () => {
        if(!name || !lastName || !phone || !email || !emailConfirmation) {
            setError('Por favor, completá todos los campos');
            return false;
        }
        if(!email.includes('@') || email.endsWith('@')) {
            setError('El email es inválido');
            return false;
        }
        if(email != emailConfirmation) {
            setError('El email no coincide con su confirmación');
            return false;
        }
        if(cart.length == 0) {
            setError('El carrito está vacío, ¡llenalo y volvé para confirmar tu compra!');
            return false;
        }
        return true;
    }
    const validateOrderItems = async (order) => {
        return new Promise((resolve, reject) => {
            const db = getFirestore();
            order.items.forEach(async (orderProduct, i) => {
                const refProduct = doc(db, 'products', orderProduct.id);
                const docProduct = await getDoc(refProduct); 
                const actualStock = docProduct.data().stock;
                const newStock = actualStock - orderProduct.quantity;
                if(newStock < 0) 
                    reject("El stock del producto " + orderProduct.name + " no es suficiente, no se puede dar de alta la orden");
                else if (i == order.items.length-1)
                    resolve("Todos los productos tienen la cantidad necesaria para dar de alta la orden")
            });
        })
    }
    const discountQuantities = async (order) => {
        return new Promise((resolve, reject) => {
            const db = getFirestore();
            order.items.forEach(async (orderProduct, i) => {
                const refProduct = doc(db, 'products', orderProduct.id);
                const docProduct = await getDoc(refProduct); 
                const actualStock = docProduct.data().stock;
                const newStock = actualStock - orderProduct.quantity;
                await updateDoc(refProduct, { 
                    stock: newStock,
                });    
                if (i == order.items.length-1)
                    resolve("Todos los productos fueron descontados del stock exitosamente")
            });
        })
    }
    const addOrder = async (order) => {
        const db = getFirestore();
        await addDoc(collection(db, 'orders'), order)
        .then((docRef) => { 
            setOrderId(docRef.id);
        })
    }
    const formHandler = async () => {
        setError("")
        setOrderId("")
        if(validateForm()) {
            const order = {
                buyer: {
                    name: name,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                },
                items: cart.map((p) => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    quantity: p.quantity,
                })),
                total: getCartTotalPrice(),
                date: new Date(),
            }
            validateOrderItems(order)
            .then((thenVal) => {
                console.log(thenVal)
                discountQuantities(order)
                .then((thenVal) => {
                    console.log(thenVal)
                    addOrder(order)
                    .then(() => {
                        console.log("La orden fué dada de alta exitosamente")
                        setTimeout(() => {
                            clearCart();
                        }, 5000);
                    })
                    .catch((err) => {
                        setError(err);
                        console.log(err)        
                    })
                })
                .catch((err) => {
                    setError(err);
                    console.log(err)    
                })
            })
            .catch((err) => {
                setError(err);
                console.log(err)
            })
        }
    }

    if(cart.length == 0) {
        return(
            <Cart />     
        )
    }
    else {
        return (
            <div className='container mt-10'>
                <h2>Completá tus datos para confirmar la compra</h2>
                <div className='mb-3'>
                    <div className="col-md-8 offset-2">
                        <table className='table table-hover'>
                            <thead className='table-light'>
                                <tr>
                                    <th scope="col">Producto</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((product) => {
                                    return (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>x{product.quantity}</td>
                                            <td>${product.price*product.quantity}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            <tfoot className='table-light'>
                                <tr>
                                    <td colSpan={3}>Total</td>
                                    <td>${getCartTotalPrice()}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="form-floating mb-3 mt-3 col-md-8 offset-2">
                        <input type="text" className="form-control" id="name" placeholder="Nicolas" value={name} onChange={(e) => setName(e.target.value)}/>
                        <label htmlFor="name">Nombre</label>
                    </div>
                    <div className="form-floating mb-3 mt-3 col-md-8 offset-2">
                        <input type="text" className="form-control" id="lastName" placeholder="Diorio" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                        <label htmlFor="name">Apellido</label>
                    </div>
                    <div className="form-floating mb-3 mt-3 col-md-8 offset-2">
                        <input type="text" className="form-control" id="phone" placeholder="11-2157-8552" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        <label htmlFor="phone">Teléfono</label>
                    </div>
                    <div className="form-floating mb-3 mt-3 col-md-8 offset-2">
                        <input type="email" className="form-control" id="email" placeholder="nicolas.joaquin.diorio@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-floating mb-3 mt-3 col-md-8 offset-2">
                        <input type="email" className="form-control" id="emailConfirmation" placeholder="nicolas.joaquin.diorio@gmail.com" value={emailConfirmation} onChange={(e) => setEmailConfirmation(e.target.value)}/>
                        <label htmlFor="name">Confirmá tu email</label>
                    </div>
                    {error ? (
                        <div className="alert alert-danger col-md-8 offset-2" role="alert">
                            {error}{' '}
                        </div>
                    ) : 
                    (
                        <div></div>
                    )}
                    {orderId ? (
                        <div className="alert alert-success col-md-8 offset-2" role="alert">
                            ¡Gracias por tu compra! <br /> Este es tu numero de orden: <br/>{' '}
                            <strong>{orderId}{' '}</strong>
                            <br/>
                            Serás redirigido en 5 segundos...
                        </div>
                    ) : 
                    (
                        <div></div>
                    )}
                    <hr/>
                    {orderId ? (
                        <div className='d-flex justify-content-around'>
                            <Link to={"/"} className='btn btn-md btn-outline-primary'>Seguir comprando</Link>
                        </div>
                    ) : 
                    (
                        <div className='d-flex justify-content-around'>
                            <Link to={"/cart"} className='btn btn-md btn-outline-primary goto-cart'>Volver al carrito</Link>
                            <button className='btn btn-success' onClick={() => formHandler()}>Confirmar compra</button>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Checkout