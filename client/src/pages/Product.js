import React, {  useState, useEffect }from 'react';
import { 
  getProduct, 
  productStar, 
  getRelated 
} from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import ProductCard from "../components/cards/ProductCard";

const Product = ({ match }) => {
  const [ product, setProduct ] = useState({});
  const [ related, setRelated ] = useState([]);
  const [ star, setStar ] = useState(0);
  const { slug } = match.params;
  const { user } = useSelector( state => ({ ...state }));

  useEffect(() => {
    loadingSingleProduct();
  },[slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); //current user star
    }
  })

  const loadingSingleProduct = () => {
    getProduct(slug)
      .then((res) => {
        setProduct(res.data)

        //loaded related
        getRelated(res.data._id)
          .then(res => setRelated(res.data))
      })
  }
  
  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, user.token)
      .then(res => {
        console.log('rating clicked', res.data);
        loadingSingleProduct();
      });
  }

  
  return ( 
    <div className="container-fluid">
       <div className="row pt-4">
          <SingleProduct 
            product={product}
            onStarClick={onStarClick}
            star={star}
          />
       </div>
       <div className="row">
         <div className='col text-center pt-5 pb-5'>
           <h4>Related products</h4>
           <hr />
         </div>
       </div>

       <div className="row pb-5">
         {related.length ? related.map((ral) => {
            return (
              <div key={ral._id} className='col-md-4'>
                <ProductCard 
                  product={ral}
                />
              </div>
            )
         }) : <div className='text-center col'>No products found</div> }
       </div>
    </div>
   );
}
 
export default Product;
