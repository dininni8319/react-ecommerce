import React, { useEffect, useState } from 'react';
import { getSub } from "../../functions/sub";
import ProductCard from '../../components/cards/ProductCard';

const SubHome = ({ match }) => {
  const [ sub, setSub ] = useState({});
  const [ products, setProducts ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSub(slug)
     .then((res) => {
       console.log(JSON.stringify(res.data, null, 4));
       setSub(res.data.sub);
       setProducts(res.data.products)
       setLoading(false)
     }); 
  }, [])
  
  return ( 
    <div className='container-fluid'>
      <div className='row'>
        <div className="col">
          {loading ? (
            <h4 className='text-center p-3 my-5 display-4 jumbotron'>Loading</h4>
          ) : (
            <h4 className='text-center p-3 my-5 display-4 jumbotron'>{products.length } Products in "{sub.name}" sub category</h4>
          )}
        </div>
      </div>
      <div className="row">
         {products.map(prod => <div className='col' key={prod._id}>
             <ProductCard  product={prod} />
         </div>) }
      </div>
    </div>
   );
}
 
export default SubHome;