import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, user } = useSelector(state => ({ ...state }))
  
  // [1,2] 100 + 200 = 300
  const getTotal = () => {
      return cart.reduce((currentValue, nextValue) => {
          return currentValue + nextValue.count * nextValue.price
      }, 0)
  };

  const saveOrderToDB = () => {

  };

  return ( 
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-8 pt-3">
         <h4>Cart / {cart.length} Product</h4>
          {!cart.length ? (
          <p>
            No product in cart. <Link to='/shop'>Continue Shopping.</Link>
          </p>
          ): (
            'show cart items'
          )}
        </div>
        <div className="col-md-4">
          <h4 className='pt-2'>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((cart, i) => (
            <div key={i}>
              <p>{cart.title} x {cart.count} = ${cart.price * cart.count}</p>
            </div>
          ))}
          <hr />
            Total: <b>${getTotal()}</b>
          <hr />
          {
            user ? (
              <button 
                onClick={saveOrderToDB} 
                disabled={!cart.length}
                className='btn btn-sm btn-primary mt-2'>
                Proceed to Checkout
              </button>
            ) : (
              <button className='btn btn-sm btn-primary mt-2'>
                <Link to={{
                  pathname: '/login',
                  state: { from: "cart"}
                }}>
                  Login to Checkout
                </Link>
              </button>
            )
          }
        </div>
      </div>
    </div>
   );
}
 
export default Cart;