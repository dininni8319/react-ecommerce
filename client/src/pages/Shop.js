import React, { useEffect, useState } from 'react';
import { getProductsByCount, fetchProductsByFilter } from '../functions/product';
import { getCategories } from "../functions/category";
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { DollarOutlined, DownSquareOutlined } from '@ant-design/icons';
import { Menu, Slider, Checkbox } from 'antd';

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [ products, setProducts ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  let { search } = useSelector(state => ({ ...state }));
  const  { text } = search;
  const [ price, setPrice ] = useState([0, 0]);
  const [ ok, setOk ] = useState(false);
  const [ categories, setCategories ] = useState([]);
  const [ categoriesIds, setCategoriesIds ] = useState([]);

  let dispatch = useDispatch();

  useEffect(() => {
      loadAllProducts();
      // fetch categories
      getCategories().then(res => setCategories(res.data));
  }, [])
  
  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg)
    .then(res => {
      setProducts(res.data);
    })
  };
  
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

  //3. load products based on a price range
  useEffect(() => {
    //  console.log('ok to request');
     fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: ""}
    });
    setCategoriesIds([])
    setPrice(value);
    setTimeout(() => {
      setOk(!ok)
    }, 300)
  };

  //4.load products based on categories
  // show categories in a list of checkbox
  const handleCheck = e => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: ""}
    });
    setPrice([0,0]);
    let inTheState = [...categoriesIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); 

    //indexOf method ?? if not found return -1 else return index

    if (foundInTheState === -1) {
      inTheState.push(justChecked)
    } else {
      // if found pull out one item from index
      // slice takes as a first arg the index and
      // as second arg the number of items to be removed
      inTheState.splice(foundInTheState, 1);
    }

    setCategoriesIds(inTheState);
    fetchProducts({category: inTheState })
  };

  const showCategories = () => categories.map(cat => 
    <div key={cat._id}>
      <Checkbox 
        onChange={handleCheck}
        className='pl-4 pr-4 pb-2'
        value={cat._id}
        name='category'
        checked={categoriesIds.includes(cat._id)} // if is in the state show it as checked
      >
        {cat.name}
      </Checkbox>
    </div>
  )
  return ( 
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-3 pt-2">
           <h4>Search/Filter</h4>
           <hr />
           <Menu defaultOpenKeys={['1', '2']} mode='inline'>
              {/* price */}
              <SubMenu key='1' title={
                  <span className='h6'>
                    <DollarOutlined /> Price
                  </span>
              }>
                <div>
                  <Slider 
                    className='ml-4 mr-4' 
                    tipFormatter={(val) => `$${val}`} 
                    range 
                    value={price}
                    onChange={handleSlider}
                    max='4999'
                  />
                </div>
              </SubMenu>
              {/* categories */}
              <SubMenu key='2' title={
                  <span className='h6'>
                    <DownSquareOutlined /> Categories
                  </span>
              }>
                <div style={{ marginTop: "-10px"}}>
                {showCategories()}
                </div>
              </SubMenu>
           </Menu>
        </div>

        <div className="col-md-9 pt-2">
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