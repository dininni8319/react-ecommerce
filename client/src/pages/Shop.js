import React, { useEffect, useState } from 'react';
import { getProductsByCount, fetchProductsByFilter } from '../functions/product';
import { useSelector } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { FullscreenOutlined } from '@ant-design/icons';
import { Menu, Slider } from 'antd';

const { SubMenu, ItemGroup } = Menu;
const Shop = () => {
  const [ products, setProducts ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  let { search } = useSelector(state => ({ ...state }));
  const  { text } = search;
  const [ price, setPrice ] = useState([0, 0]);

  useEffect(() => {
      loadAllProducts();
  }, [])
  
  //1 load products by default on page load
  const loadAllProducts = () => {
     getProductsByCount(12)
       .then(prod => {
         setProducts(prod.data);
         setLoading(false);
       });
  };

  //2. load products on user search input 
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({query: text});
    }, 400);

    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg)
    .then(res => {
      setProducts(res.data);
      // setLoading(false)
    })
  }

  //3. load products based on a price range


  return ( 
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-3">
           <h4>Search/Filter</h4>
           <Menu>
              <SubMenu>
                  <div>
                    <Slider 
                      className='ml-4 mr-4' 
                      tipFormatter={(val) => val} 
                      range 
                      value={price}
                       
                    />
                  </div>
              </SubMenu>
           </Menu>
        </div>

        <div className="col-md-9">
           { loading ? (
             <h4 className='text-danger'>Loading...</h4>
           ): (
            <h4 className='text-danger'>Products...</h4>
           )}

           {products.length < 1 && <p>No products found</p>}
           <div className="row">
             {products.map(prod => {
               return (
                 <div key={prod._id} className='col-md-4 pb-5 mt-3'>
                   <ProductCard product={prod}/>
                 </div>
               )
             })}
           </div>
        </div>
      </div>
    </div>
   );
}
 
export default Shop;