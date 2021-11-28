import React from 'react'
import { useSelector } from 'react-redux'

/* Icons */
import { BsCart3 } from "react-icons/bs";

const MyCart = () => {

    const myCart = useSelector((state)=> state.user.userData.cart)

    return (
        <div>
            <h1>Shopping Cart<BsCart3 className="pl-2 w-5 h-5" aria-hidden="true" /></h1>
            {myCart.items.map((item,idx)=>(
                <p>{item.product_ID}</p>
            ))}
        </div>
    )
}

export default MyCart
