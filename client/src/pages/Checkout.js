import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getUserCart, 
  emptyUserCart,
  saveUserAddress,
} from '../functions/user';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state}));
  const [ products, setProducts ] = useState([]);
  const [ total, setTotal ] = useState(0);
  const [ address, setAddress ] = useState('');
  const [ addressSaved, setAddressSaved ] = useState(false);

  useEffect(() => {
      getUserCart(user?.token)
        .then((res) => {
          console.log('user cart res', JSON.stringify(res.data, null, 4));
          setProducts(res.data.products);
          setTotal(res.data.cartTotal);
        })
  },[]);

  const emptyCart = () => {
    if (typeof window !==  'undefined') {
      // remove from localStorage
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: []
    });

    // remove from backend
    emptyUserCart(user.token)
      .then(res => {
        setProducts([]);
        setTotal(0);
        toast.success("Cart is empty. Continue shopping")
    })
  };

  const saveAddreessToDb = () => {
    saveUserAddress(user.token, address)
      .then(res => {
        if (res.data.ok) {
          setAddressSaved(true);
          toast.success('Address saved')
        }
      })
  };

  return ( 
    <div className='row'>
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        <ReactQuill 
            theme='snow'
            value={address}
            onChange={setAddress}
        />
        <button className="btn btn-primary" onClick={saveAddreessToDb}>Save</button>
        <hr />
        <h4>got Coupon?</h4>
        <br />
        Coupon input and apply button
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>Products {products.length}</p>
          <hr />
          {products && products.map((p,i) => (
            <div key={i}>
              <p>
                {p.product.title} ({p.color}) x {p.count} = {" "}
                {p.product.price * p.count}
              </p>
            </div>
          ))}
          <p>List of products</p>
          <hr />
          <p>Cart Total: ${total}</p>

          <div className='row'>
            <div className="col-md-6">
              <button 
                disabled={!addressSaved || !products.length}
                className="btn btn-primary">
                Place Order
              </button>
            </div>
            <div className="col-md-6">
                <button 
                  disabled={!products.length}
                  className="btn btn-danger"
                  onClick={emptyCart}
                >
                  Empty Cart
                </button>
            </div>
          </div>
        </div>
      </div>
   );
}
 
export default Checkout;