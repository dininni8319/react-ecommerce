import React, { useState } from 'react';
import { Card, Tabs, Tooltip } from 'antd';
import { Carousel } from "react-responsive-carousel";
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import laptop from '../../images/laptop.png';
import ProductListItem from './ProductListItem';
import StarRating from 'react-star-ratings';
import RatinModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';
import { useSelector ,useDispatch } from 'react-redux';

import _ from 'lodash';

const { TabPane } = Tabs;
// this is children component of Product page
const SingleProduct = ({ product,  onStarClick, star }) => {
  const { title, images, description, _id } = product;
  const [ tooltip, setTooltip ] = useState('Click to add');
  const { user, cart } = useSelector(state => ({ ...state }))
  const dispatch = useDispatch();

  const handleAddToCart = () => {
      // create a cart array
      let cart = [];

      if (typeof window !== 'undefined') {
        // check if cart is in the localstorage GET it
        if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        }
        //push new product to cart 
        cart.push({
          ...product,
          count: 1,
        });
        //remove duplicates
        let unique = _.uniqWith(cart, _.isEqual);
        //save to local storage
        localStorage.setItem('cart', JSON.stringify(unique));
        setTooltip("Added");

        //add to redux state
        dispatch({
          type: "ADD_TO_CART",
          payload: unique,
        })
      }
  };

  return ( 
    <> 
      <div className="col-md-7">
       {images && images.length? <Carousel showArrows={true} autoPlay infiniteLoop>
          {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel> : 
          <Card
            cover={
              <img 
                src={laptop}
                className='mb-3 card-image'
              />
            }
          >
          </Card>
        }
        <Tabs type='card'> 
            <TabPane tab='Description' key={1}>
               {description && description}
            </TabPane>
            <TabPane tab='More' key={2}>
               Call us on number xxxx xxx xxx to learn about this product.
            </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
      <h1 className='bg-info p-3'>{title}</h1>
      { product && product.ratings && product.ratings.length 
        ? showAverage(product)
        : <div className='text-center pt-1 pb-3'>No rating yet</div>
      }
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined 
                  className="text-danger" 
                /> <br/> Add Product
              </a>
           </Tooltip>,
            <Link to={`/`}>
              <HeartOutlined className='text-info' /><br />Add to Wishlist
            </Link>,
            <RatinModal>
              <StarRating 
                  name={_id}
                  numberOfStars={5}
                  rating={star}
                  changeRating={onStarClick}
                  isSelectable={true}
                  starRatedColor='orange'
              />
            </RatinModal>
          ]}
        >
          <ProductListItem 
            product={product}
          />
        </Card>
      </div>
    </>
   );
}
 
export default SingleProduct;