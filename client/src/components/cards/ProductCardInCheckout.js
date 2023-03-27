import React from 'react';
import ModalImage from 'react-modal-image';
import laptop from '../../images/laptop.png';
import { useDispatch } from 'react-redux';

const ProductCardInCheckout = ({ prod }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  const dispatch = useDispatch();
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
          <td>{prod.count}</td>
          <td>Shipping</td>
          <td>Delete Icon</td>

        </tr>
     </tbody>
   );
}
 
export default ProductCardInCheckout;