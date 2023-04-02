import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../store'
import { getLineItems } from '../store'
import { fetchPlants } from "../store";

const DisplayOrders = ()=> {
    const { users, orders, auth, lineitems, plants } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
		dispatch(getOrders());
        dispatch(getLineItems());
        dispatch(fetchPlants());
	}, []);
  
    return (
        <div class='past-orders'>
            <h2>Past Orders</h2>
            <ul>
                {
                    orders.map(order => {
                        const user = users.filter(user => user.id === order.userId)
                        const allItems = lineitems.filter(item => item.orderId === order.id)
                        if ( auth.id === order.userId && order.isCart.toString() == 'false'){
                            return ([
                                <li key={ order.id }><span class="bold">Order.id:</span> { order.id }</li>,
                                <li key={ order.createdAt }><span class="bold">Date Created:</span> { order.createdAt }</li>,
                                <ul>
                                    { allItems.map(item => {
                                        const product = plants.find(plant => item.productId === plant.id)
                                        return ([
                                            <li key={ product.id }><span class="bold">Item:</span> {product.name} <span class="bold">Quantity:</span> {item.quantity}</li>
                                        ])
                                    })}
                                </ul>
                            ])
                        } 
                    }) 
                } 
            </ul> 
        </div> 
    ) 
} 

export default DisplayOrders