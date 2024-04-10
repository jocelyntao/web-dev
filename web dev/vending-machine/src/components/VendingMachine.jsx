import React, { useState } from 'react';
import Item from './Item';
import './VendingMachine.css'

function VendingMachine() {
    const items = [
        { id: 1, name: 'Sprite', price: 1.5 },
        { id: 2, name: 'Lays', price: 1.2 },
        { id: 3, name: 'Snickers', price: 1 },
        { id: 1, name: 'Chocolate', price: 4.75 },
        { id: 2, name: 'Cheez-Its', price: 1.2 },
        { id: 3, name: 'Goldfish', price: 1.2 },
        { id: 1, name: 'Skittles', price: 1.5 },
        { id: 2, name: 'Chex Mix', price: 1.2 },
        { id: 3, name: 'Ruffles', price: 1 },
        { id: 1, name: 'Popcorn', price: 2.5 },
        { id: 2, name: 'Fritos', price: 1.2 },
        { id: 3, name: 'Twix', price: 3.0 }
 ]; 

    return (
        <div className="vending-machine">
            <h1>Virtual Vending Machine</h1>
            <div className="items-container">
                
                {items.map((item) => {
                    return (
                        <Item id={item.id} name={item.name} price={item.price} />
                    );
                })}
            </div>
        </div>
    );
}

export default VendingMachine;