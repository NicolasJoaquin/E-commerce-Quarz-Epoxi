import React from 'react';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import arrayProductos from '../Json/arrayProductos.json';
import ItemListLoader from './ItemLoader';

const ItemDetailContainer = () => {
    const getProduct = () => {
        return new Promise((resolve, reject) => {
            const product = arrayProductos.find((p) => p.id == itemId)
            if(product == undefined)
                setTimeout(() => {
                    reject(new Error("No hay producto con ese id"));
                }, 2000);
            else 
                setTimeout(() => {
                    resolve(product);
                }, 2000);
        });
    }
    async function mock() {
        try {
            let p = await getProduct();
            setActualProduct(p);
        }
        catch(err) {
            console.log(err.message)
            setActualProduct({})
        }
    }
    // Hooks
    const {itemId} = useParams();
    const [actualProduct, setActualProduct] = useState({id: 'loader'});
    useEffect(() => {
        mock();
        // Función de limpieza
        return () => setActualProduct({id: 'loader'})
    }, [itemId])
    if(actualProduct.id == 'loader')
        return(<ItemListLoader />)
    if(Object.keys(actualProduct).length == 0)
        return (
            <div className='container'>
                <div className='row'>
                    <h3>No existe el producto</h3>
                </div>
            </div>
        )
    else
        return (
            <div className='container'>
                <div className='row'>
                    <h3>Detalle del producto</h3>
                    <hr/>
                    <ItemDetail id={actualProduct.id} name={actualProduct.name} description={actualProduct.description} price={actualProduct.price} stock={actualProduct.stock} pictureUrl={actualProduct.pictureUrl} />
                </div>
            </div>
        )
}

export default ItemDetailContainer