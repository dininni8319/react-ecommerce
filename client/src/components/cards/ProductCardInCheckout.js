import React from 'react';
import ModalImage from 'react-modal-image';
import laptop from '../../images/laptop.png';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ProductCardInCheckout = ({ prod }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  const dispatch = useDispatch();
  //  console.log(prod,'TESTING THE PROD');
  const handleColorChange = (e) => {
    let cart = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }

      cart.map((product, i) => {
        if (product._id === prod._id) {
          cart[i].color = e.target.value;
        }
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      })
    }
  };
  
  const handleQuantityChange = e => {
    let count = e.target.value  < 1 ? 1 : e.target.value;

    if(count > prod.quantity) {
      toast.error(`Max available quantity: ${prod.quantity}`)
      return;
    }

    let cart = [];
    if(typeof window !== 'undefined'){
      if(localStorage.getItem("cart")){
        cart = JSON.parse(localStorage.getItem("cart"))
      }

      cart.map((product, i) => {
        if (product._id === prod._id) {
          cart[i].count = count;
        }
        
      });
      
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    let cart = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      /// [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === prod._id) {
          cart.splice(i, 1)
        }
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      })
    }
  };

  return ( 
     <tbody>
        <tr>
          <td>
            <div style={{ width: '100px', height: 'auto'}}>
               {prod.images.length ? (
                 <ModalImage 
                  small={prod.images[0].url} 
                  large={prod.images[0].url} 
                 />) : (
                 <ModalImage 
                  small={laptop} 
                  large={laptop} 
                 />
                 )}
            </div>
          </td>
          <td>{prod.price}</td>
          <td>{prod.title}</td>
          <td>{prod.brand}</td>
          <td>
            <select 
             className='form-control' 
             onChange={handleColorChange}
             name="" 
             id=""
            >
              {prod.color ? <option>{prod.color}</option> : <option>Select</option>}
              {colors
               .filter((c) => c !== prod.color )
               .map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          </td>
          <td className='text-center'>
            <input 
              type="number" 
              className='form-control' 
              onChange={handleQuantityChange}
              defaultValue={prod.count}
            />
          </td>
          <td>
            {prod.shipping === "YES" ? (<CheckCircleOutlined className='text-success' />) : (
              <CloseCircleOutlined className='text-success' />
            )}
          </td>
          <td className='text-center'>
            <CloseOutlined 
              onClick={() => handleRemove(prod._id)} 
              className='text-danger pointer' 
            />
          </td>

        </tr>
     </tbody>
   );
}
 
export default ProductCardInCheckout;