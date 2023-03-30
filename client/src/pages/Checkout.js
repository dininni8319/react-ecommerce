import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getUserCart, 
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from '../functions/user';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Checkout = ({ history }) => {
  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state}));
  const couponTrueOrFalse = useSelector((state) => state.coupon);
  const [ products, setProducts ] = useState([]);
  const [ total, setTotal ] = useState(0);
  const [ address, setAddress ] = useState('');
  const [ coupon, setCoupon ] = useState('');
  const [ addressSaved, setAddressSaved ] = useState(false);
  // discount price
  const [ totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [ discountError, setDiscountError] = useState('');

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

    // remove coupon from redux 
    dispatch({
      type: "COUPON_APPLIED",
      payload: false
    });

     //empy COD from redux 
     dispatch({
      type: "COD",
      payload: false
    });
    // remove from backend
    emptyUserCart(user.token)
      .then(res => {
        setProducts([]);
        setTotal(0);
        setTotalAfterDiscount(0)
        setCoupon('');
        toast.success("Cart is empty. Continue shopping")
    });
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

  const showAddress = () => (
    <>
      <ReactQuill 
          theme='snow'
          value={address}
          onChange={setAddress}
      />
      <button className="btn btn-primary" onClick={saveAddreessToDb}>Save</button>
    </>
  );

  const showProductSummary = () => 
    products && products.map((p,i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} = {" "}
          {p.product.price * p.count}
        </p>
      </div>
  ));
  
  const applyDiscountCoupon = () => {
    applyCoupon(user.token, coupon)
     .then(res => {
       console.log('RESP COUPON BACKEND', res);
       if (res.data) {
         setTotalAfterDiscount(res.data);
        // update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: true
        });
       }
       if (res.data.err) {
         setDiscountError(res.data.err);
         // update redux coupon applied
         dispatch({
          type: "COUPON_APPLIED",
          payload: false
         });
       }
     })
  };

  const showApplyCoupon = () => (
    <>
      <input 
        type="text" 
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError('');
        }}
        className="form-control"
        value={coupon}
      />
      <button 
        className='btn btn-primary mt-2'
        onClick={applyDiscountCoupon}
      >Apply</button>
    </>
  );
  
  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then(res => {
      console.log('USER CASH ORDER CREATED RES', res);
      // empy cart form redux, localstorage, rest COD,
      if (res.data.ok) {
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
        
        setTimeout(() => {
          history.push('/user/history')
        },1000)
      } 
    })
  };

  return ( 
    <div className='row'>
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
         {showAddress()}
        <hr />
        <h4>Got Coupon?</h4>
        <br />
         {showApplyCoupon()}
         <br />
         {discountError && <p className='bg-danger p-2'>{discountError}</p>}
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>Products {products.length}</p>
          <hr />
          {showProductSummary()}
          <p>List of products</p>
          <hr />
          <p>Cart Total: ${total}</p>
           
           {totalAfterDiscount > 0 && (
              <p className='bg-success p-2'>
                Discount Applied: Total Payable: ${totalAfterDiscount}
              </p>
           )}

          <div className='row'>
            <div className="col-md-6">
             { COD ? (
                <button 
                  disabled={!addressSaved || !products.length}
                  onClick={createCashOrder}
                  className="btn btn-primary">
                  Place Order
                </button>
             ) : (
                <button 
                  disabled={!addressSaved || !products.length}
                  onClick={() => history.push('/payment')}
                  className="btn btn-primary">
                  Place Order
                </button>
             )}
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