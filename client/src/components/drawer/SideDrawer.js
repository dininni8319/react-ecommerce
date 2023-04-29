import React from 'react';
import { Drawer } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import laptop from '../../images/laptop.png';

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector(state => ({ ...state }))
  // console.log(cart, 'TESTING THE CART ERROR');
  const imageStyle = {
    width: '100px',
    height: '50px',
    obiectFit: 'cover',
  };

  return <Drawer 
    onClose={() => {
      dispatch({
        type: "SET_VISIBLE",
        payload: false
      })
    }} 
    className='text-center'
    title={`Cart / ${cart.length} Product`}
    // closable={false}
    visible={drawer}
  >
    {cart.length > 0 && cart.map((prod) => (
      <div key={prod?._id} className='row'>
          <div className="col">
            {prod?.images[0] ? (
              <>
                <img 
                  src={prod?.images[0]?.url}
                  style={imageStyle}
                />
                <p className='text-center bg-secondary text-light'>{prod?.title} x {prod?.count}</p>
              </>
            ) : (
              <>
                <img 
                  src={laptop}
                  style={imageStyle}
                />
                <p className='text-center bg-secondary text-light'>{prod?.title} x {prod?.count}</p>
              </>
            )}
          </div>
      </div>
     ))}

     <Link to='/cart'>
       <button 
          className='text-center btn btn-primary btn-raised btn-block'
          onClick={() => dispatch({
             type: "SET_VISIBLE",
             payload: false
           })
          }
       >
        Go To Cart
       </button>
     </Link>
  </Drawer> 
};

export default SideDrawer;