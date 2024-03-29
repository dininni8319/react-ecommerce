import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.png';
import { Link } from 'react-router-dom';
import { showAverage } from "../../functions/rating";
import { useSelector ,useDispatch } from 'react-redux';
import _ from 'lodash';

const { Meta } = Card;

const ProductCard = ({ product }) => {
    const { images, title, description, slug, price } = product;
    const initial = product.quantity < 1 ? "Out of stock" : "Click to add"
    const [ tooltip, setTooltip ] = useState(initial);
    const { user, cart } = useSelector(state => ({ ...state }))
    const dispatch = useDispatch();
 
    const handleAddToCart = () => {
       // create a cart array
       if (product.quantity < 1) return;

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
         });
         // show cart items in side srawer
         dispatch({
          type: "SET_VISIBLE",
          payload: true,
        });
       }
    };

    return (
      <>
        { product && product.ratings && product.ratings.length 
          ? showAverage(product)
          : <div className='text-center pt-1 pb-3'>No rating yet</div>
        }
        <Card
          cover={
            <img 
            src={images && images.length ? images[0].url : laptop }
            style={{ height: '150px', objectFit: 'cover' }}
            className='p-1'
            />
          }

          actions={[
            <Link to={`/product/${slug}`}>
              <EyeOutlined className="text-warning" /> <br/> View Product
            </Link>,
           <Tooltip title={tooltip}>
              <a disabled={product.quantity < 1} onClick={handleAddToCart} >
                <ShoppingCartOutlined 
                  className="text-danger" 
                /> <br/> { product.quantity < 1 ? "Out of stock" : "Add Product" }
              </a>
           </Tooltip>,
          ]}
        >
          <Meta 
            title={`${title} - $${price}`} 
            description={`${description && description.substring(0,40)}...`}
          />
           
        </Card>
      </>
  )
}

export default ProductCard;