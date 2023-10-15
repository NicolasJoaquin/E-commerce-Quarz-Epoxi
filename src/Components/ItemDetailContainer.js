import React from 'react';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ItemListLoader from './ItemLoader';
import {getFirestore, doc, getDoc} from 'firebase/firestore';

const ItemDetailContainer = () => {
    // Hooks
    const {itemId} = useParams();
    const [actualProduct, setActualProduct] = useState({id: 'loader'});

    useEffect(() => {
        const queryDb = getFirestore();
        const queryDoc = doc(queryDb, 'products', itemId);
        getDoc(queryDoc)
        .then((res) => setActualProduct({id: res.id, ...res.data()}));
        // Función de limpieza
        return () => setActualProduct({id: 'loader'})
    }, [itemId])
    
    if(actualProduct.id == 'loader')
        return(<ItemListLoader />)
    if(Object.keys(actualProduct).length == 0 || !actualProduct.name)
        return (
            <div className='container mt-10'>
                <div className='row'>
                    <h3>El producto que estás intentando ver no existe</h3>
                </div>
            </div>
        )
    else
        return (
            <div className='container mt-10'>
                <div className='row'>
                    <h3>Detalle del producto</h3>
                    <hr/>
                    <ItemDetail id={actualProduct.id} name={actualProduct.name} description={actualProduct.description} price={actualProduct.price} stock={actualProduct.stock} pictureUrl={actualProduct.pictureUrl} categoryId={actualProduct.categoryId} />
                </div>
            </div>
        )
}

export default ItemDetailContainer