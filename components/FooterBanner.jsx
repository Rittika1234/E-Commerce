import React from 'react'


import Link from 'next/link';
import { urlFor } from '../lib/client';

const FooterBanner = ({ footerBanner : {discount, largeText1, largeText2,saleTime, smallText, midText,desc, product, buttonText, image}}) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>Magic</h3>
          <h3>Sale</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>Year End Sale</h3>
          <p>Set your mind ablaze with boAt Rockerz 450</p>
          <Link href={`/product/${product}`}>
           <button type="button">Shop Now</button>
          </Link>
        </div>

        <img
          src={urlFor(image)} className="footer-banner-image"
        />
      </div>
    </div>
  )
}

export default FooterBanner