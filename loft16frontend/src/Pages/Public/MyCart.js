import React, { useEffect, useState } from 'react'
//import { useSelector, useDispatch } from 'react-redux'

/* Icons */
import { BsCart3 } from "react-icons/bs";


/* Axios API */
//import API from '../../Helpers/api';

const MyCart = () => {


    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        setCartItems([])
    }, [])

    return (
        <div>
            <h1>Shopping Cart<BsCart3 className="pl-2 w-5 h-5" aria-hidden="true" /></h1>
            {
                cartItems.length === 0? <p>No Item</p>:
                cartItems.map((item) => (<>item.name</>))
            }
        </div>
    )
}

export default MyCart
