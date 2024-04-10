import React, { useState } from 'react';
import './Item.css'

function Item({ id, name, price }) {
    return (
        <div>
            <button className="item">
                <p><b>{name}</b></p>
                <p>${price}</p>
            </button>
        </div>
    );
}

export default Item;