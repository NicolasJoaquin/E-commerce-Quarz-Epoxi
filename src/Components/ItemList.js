import React from 'react'
import Item from './Item'
import ItemListLoader from './ItemLoader'

const ItemList = ({items}) => {   
    if(items.length == 0)
        return (
            <h2>No hay productos para la categoría indicada</h2>
        )
    else {
        if(items[0] == 'loader')
            return (
                <ItemListLoader />
            )
        else {
            return (
                <div className='row' id='itemList'>
                    <h3>Lista de productos</h3>
                    <hr/>
                    {items.map((i) => {
                        return(
                            <div className='col-md-4' key={i.id}>
                                <Item id={i.id} name={i.name} description={i.description} price={i.price} stock={i.stock} pictureUrl={i.pictureUrl} />
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
}

export default ItemList