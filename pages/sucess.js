import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';


const Success = () => {
  const { setCartItems , setTotalPrice , setTotalQuantities   } = useStateContext();
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, [] );


  return (
    <div className='success-wrapper' >
      <div className='success'>
        <p className='icon' >
          <BsBagCheckFill/>
        </p>
        <h2>
          Thank You for Your Purchase
        </h2>
        <p className='email-msg' >Chekc Your email inbox for the receipt </p>
        <p className='description' >
          If any decrepency , contact us at 
          <a className='email' href="mailto:abc@xoxomail.com">abc@xoxomail.com</a>
        </p>
        <Link href='/' >
          <button type='button' width="300px" className='btn'  >
            Continue Shopping
          </button>
        </Link>
      </div>

    </div>
  )
}

export default Success