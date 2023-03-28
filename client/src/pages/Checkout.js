import React from 'react';

const Checkout = () => {
  const saveAddreessToDb = () => {};

  return ( 
    <div className='row'>
      <div className="col-md-6">
       <h4>Delivery Address</h4>
       <br />
       <br />
       textarea
       <button className="btn btn-primary" onClick={saveAddreessToDb}>Save</button>
       <hr />
       <h4>got Coupon?</h4>
       <br />
       Coupon input and apply button
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products x</p>
        <hr />
        <p>List of products</p>
        <hr />
        <p>Cart Total: $x</p>

        <div className='row'>
          <div className="col-md-6">
            <button className="btn btn-primary">
              Place Order
            </button>
          </div>
        </div>
        <div className="col-md-6">
            <button className="btn btn-danger">
              Empty Cart
            </button>
        </div>
      </div>
    </div>
   );
}
 
export default Checkout;