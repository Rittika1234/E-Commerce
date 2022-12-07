import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { client } from '../lib/client';
import {Product, FooterBanner, HeroBanner} from '../components/index';
const Home = ({ products, bannerData }) => {
  const router = useRouter();
  const { cancelled } = router.query;

  useEffect(() => {
    if (cancelled) {
      toast.error('Transaction cancelled!');
    }
  }, []);

  return (
    <div>
      <HeroBanner heroBanner={ bannerData.length && bannerData[0] } />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        { products?.map((product) => <Product key={ product._id } product={ product } />) }
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: {
      products, bannerData,
    }
  };
};

export default Home;