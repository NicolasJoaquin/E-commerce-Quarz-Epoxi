import React from 'react'
import ItemDetail from './ItemDetail'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'

const ItemDetailContainer = (products) => {
    const getProduct = () => {
        return new Promise((resolve, reject) => {
            console.log(typeof products, products)
            const product = products.find((p) => p.id == itemId)
            if(product == undefined)
                reject(new Error("No hay producto con ese id"));
            else 
                setTimeout(() => {
                    resolve(product);
                }, 2000);
        });
    }
    async function mock() {
        try {
            let p = await getProduct();
            console.log("Producto: ", p);
            setActualProduct(p);
        }
        catch(err) {
            console.log(err.message)
        }
    }
    // Hooks
    const {itemId} = useParams();
    const [actualProduct, setActualProduct] = useState({});
    useEffect(() => {
        mock();
        // Función de limpieza
        return () => setActualProduct(['loader'])
    }, [itemId])
    return (
        <div className='row'>
            <h3>Producto</h3>
            <hr/>
            <ItemDetail product={actualProduct} />
        </div>
    )
}

export default ItemDetailContainer