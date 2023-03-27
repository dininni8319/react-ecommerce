import React, { useEffect, useState } from 'react';
import { getProductsByCount, fetchProductsByFilter } from '../functions/product';
import { getCategories } from "../functions/category";
import { getSubs } from '../functions/sub';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import Star from '../components/forms/Star';

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
  const [ star, setStar ] = useState('');
  const [ subs, setSubs] = useState([]);
  const [ sub, setSub ] = useState("");
  const [ brands, setBrands ] = useState(
    [ 
      "Apple", 
      "Samsung", 
      "Microsoft", 
      "Lenovo", 
      "ASUS"
    ]
  );
  const [ brand, setBrand ] = useState('');
  const [colors, setColors ] = useState([
    "Black", 
    "Brown", 
    "Silver", 
    "White", 
    "Blue"
  ]);
  const [ shipping, setShipping ] = useState("");
  const [ color, setColor ] = useState('')
  let dispatch = useDispatch();

  useEffect(() => {
      loadAllProducts();
      // fetch categories
      getCategories().then(res => setCategories(res.data));
      //fetch subcategories
      getSubs().then(res => setSubs(res.data))
  }, []);
  
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
    setSub('');
    setCategoriesIds([])
    setPrice(value);
    setStar("");
    setBrand('');
    setColor("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok)
    }, 300);
  };

  //4.load products based on categories
  // show categories in a list of checkbox
  const handleCheck = e => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: ""}
    });
    setPrice([0,0]);
    setStar("");
    setSub('');
    setBrand('');
    setColor("");
    setShipping("");
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
  );

  // 5. show products by star reting
  const handleStarClick = num => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: ""}
    });
    setPrice([0,0]);
    setCategoriesIds([]);
    setSub('');
    setBrand('');
    setColor("");
    setShipping("");
    setStar(num);
    fetchProducts({ stars: num })
  };

  const showStars = () => {
    return (
      <div className='pr-4 pl-4 pb-2'>
        <Star starClick={handleStarClick} numberOfStars={5} />
        <Star starClick={handleStarClick} numberOfStars={4} />
        <Star starClick={handleStarClick} numberOfStars={3} />
        <Star starClick={handleStarClick} numberOfStars={2} />
        <Star starClick={handleStarClick} numberOfStars={1} />
      </div>
    )
  };

  // 6. show products by sub categories
  const showSubs = () => subs.map((sub) => 
    <div 
      key={sub._id}
      onClick={() => handleSub(sub)} 
      className='p-1 m-1 badge badge-secondary'>
        {sub.name}
    </div>
  )

  const handleSub = (sub) => {
    // console.log('SUB', sub);
    setSub(sub);
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: ""}
    });
    setPrice([0,0])
    setCategoriesIds([]);
    setStar("");
    setBrand('')
    setColor("");
    setShipping("");
    fetchProducts({ sub })
  }

  // 7.show products based on brands name
  const showBrands = () => brands.map((b) => <Radio 
      value={b} 
      name={b}
      checked={b === brand}
      onChange={handleBrand}
      className='pb-1 pl-4 pr-4'
    >
      {b}
    </Radio>
  )

  const handleBrand = (e) => {
    setSub(sub);
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: ""}
    });
    setPrice([0,0])
    setCategoriesIds([]);
    setStar("");
    setColor("");
    setShipping("");
    setBrand(e.target.value)
    fetchProducts({ brand: e.target.value })
  }

  /// 8. show products based on colors
  const showColors = () => 
    colors.map((c) => (
      <Radio 
        value={c} 
        name={c}
        checked={c === color}
        onChange={handleColor}
        className='pb-1 pl-4 pr-4'
      >
        {c}
      </Radio>
  ))

  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: ""}
    });
    setPrice([0,0]);
    setCategoriesIds([]);
    setStar("");
    setBrand("");
    setShipping("");
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  // 9. show products based on shipping yes/no

  const showShipping = () => (
    <>
      <Checkbox 
        className='pb-2 pl-4 pr-4'
        onChange={handleShippingChange}
        value="YES"
        checked={shipping === "YES"}
      >YES
      </Checkbox>

      <Checkbox 
        className='pb-2 pl-3'
        onChange={handleShippingChange}
        value="NO"
        checked={shipping === "NO"}
      >NO</Checkbox>
    </>
  );

  const handleShippingChange = (e) => {
    setSub("");
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: ""}
    });
    setPrice([0,0]);
    setCategoriesIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value })
  }
  return ( 
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-3 pt-2">
           <h4>Search/Filter</h4>
           <hr />
           <Menu defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']} mode='inline'>
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
                <div style={{ marginTop: "-10px"}} className='bg-white'>
                {showCategories()}
                </div>
              </SubMenu>

              <SubMenu 
                key='3' 
                title={
                  <span className='h6'>
                    <StarOutlined /> Rating
                  </span>
              }>
                <div style={{ marginTop: "-10px"}} className='bg-white'>
                  {showStars()}
                </div>
              </SubMenu>

              {/*sub categories */}
              <SubMenu key='4' title={
                  <span className='h6'>
                    <DownSquareOutlined /> Sub Categories
                  </span>
              }>
                <div style={{ marginTop: "-10px"}} className='pl-4 pr-4 bg-white'>
                {showSubs()}
                </div>
              </SubMenu>

              {/*brands*/}
              <SubMenu key='5' title={
                  <span className='h6'>
                    <DownSquareOutlined /> Brands
                  </span>
              }>
                <div style={{ marginTop: "-10px"}} className='pr-4 bg-white'>
                {showBrands()}
                </div>
              </SubMenu>

              {/*colors*/}
              <SubMenu key='6' title={
                  <span className='h6'>
                    <DownSquareOutlined /> Colors
                  </span>
              }>
                <div style={{ marginTop: "-10px"}} className='pr-4 bg-white'>
                {showColors()}
                </div>
              </SubMenu>

               {/*shipping*/}
               <SubMenu key='7' title={
                  <span className='h6'>
                    <DownSquareOutlined /> Shipping
                  </span>
              }>
                <div style={{ marginTop: "-10px"}} className='pr-4 bg-white'>
                {showShipping()}
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
                   <ProductCard product={prod} />
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