import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import { userCart } from '../functions/user';

const Cart = ({ history }) => {
  const { cart, user } = useSelector(state => ({ ...state }))
  
  // [1,2] 100 + 200 = 300
  const getTotal = () => {
      return cart.reduce((currentValue, nextValue) => {
          return currentValue + nextValue.count * nextValue.price
      }, 0)
  };

  const saveOrderToDB = () => {
    // console.log(JSON.stringify(cart, null, 4), 'cart');
    userCart(cart, user.token)
      .then(res => {
        console.log('CART POST RES', res);
        if (res.data.ok) history.push('/checkout');
      }).catch((err) => console.log('cart save err', err))
    history.push('/checkout');
  };

  const showCartItems = () => (
    <table className='table table-bordered'>
      <thead className='thead-light'>
          <th scope='col'>Image</th>
          <th scope='col'>Title</th>
          <th scope='col'>Price</th>
          <th scope='col'>Brand</th>
          <th scope='col'>Color</th>
          <th scope='col'>Count</th>
          <th scope='col'>Shipping</th>
          <th scope='col'>Remove</th>
      </thead>

       {cart.map((p) => (
         <ProductCardInCheckout key={p._id} prod={p} />
       ))}
    </table>
  )
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
           showCartItems()
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
              // redirect not working, I need to look at it closer
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