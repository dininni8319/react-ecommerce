import React, {  useState, useEffect }from 'react';
import { getProduct } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';

const Product = ({ match }) => {
  const [ product, setProduct ] = useState({});

  const { slug } = match.params;

  useEffect(() => {
    loadingSingleProduct();
  },[slug]);

  const loadingSingleProduct = () => getProduct(slug)
      .then((res) => setProduct(res.data));

  return ( 
    <div className="container-fluid">
       <div className="row pt-4">
          <SingleProduct 
            product={product}
          />
       </div>
       <div className="row">
         <div className='col text-center pt-5 pb-5'>
           <h4>Related products</h4>
         </div>
       </div>
    </div>
   );
}
 
export default Product;
