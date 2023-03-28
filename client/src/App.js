import React,{ useEffect }  from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route } from 'react-router-dom';
import SideDrawer from './components/drawer/SideDrawer';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';
import RegisterComplete from './pages/auth/RegisterComplete';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import ForgotPassword from './pages/auth/ForgotPassword';
import { currentUser } from "./functions/auth";
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import History from './pages/user/History';
import Password from './pages/user/Password';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import Wishlist from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import ProductCreate from "./pages/admin/product/ProductCreate";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import AllProducts from './pages/admin/product/AllProducts';
import Product from './pages/Product';
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const App = () => {
  const dispatch = useDispatch();
  
  //to check firebase auth state;
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        //user token
        const idTokenResult = await user.getIdTokenResult()
        currentUser(idTokenResult.token)
        .then((res) => { 
          
           dispatch({
             type: "LOGGED_IN_USER",
             payload: {
               name: res.data.name,
               email: res.data.email,
               token: idTokenResult.token,
               role: res.data.role,
               _id: res.data._id,
             },
           });
        })
        .catch(err => console.log(err));
      }
    });

    return () => unsubcribe();
  }, [dispatch])
  return (
    <>
      <Header />
      <SideDrawer />
      {/* This way the toast container wil be available in the entire application */}
      <ToastContainer/>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/register' component={Register}></Route>
        <Route exact path='/forgot/password' component={ForgotPassword}></Route>
        <Route exact path='/register/complete' component={RegisterComplete}></Route>
        <UserRoute exact path='/user/history' component={History}></UserRoute>
        <UserRoute exact path='/user/password' component={Password}></UserRoute>
        <UserRoute exact path='/user/wishlist' component={Wishlist}></UserRoute>
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard}></AdminRoute>
        <AdminRoute exact path='/admin/category' component={CategoryCreate}></AdminRoute>
        <AdminRoute exact path='/admin/sub' component={SubCreate}></AdminRoute>
        <AdminRoute 
          exact 
          path='/admin/category/:slug' 
          component={CategoryUpdate}
        >
        </AdminRoute>
        <AdminRoute 
          exact 
          path='/admin/sub/:slug' 
          component={SubUpdate}
        >
        </AdminRoute>
        <AdminRoute exact path='/admin/product' component={ProductCreate}></AdminRoute>
        <AdminRoute 
          exact 
          path='/admin/product/:slug' 
          component={ProductUpdate}>
        </AdminRoute>
        <AdminRoute exact path='/admin/products' component={AllProducts}></AdminRoute>
        <Route exact path='/product/:slug' component={Product}></Route>
        <Route exact path='/category/:slug' component={CategoryHome}></Route>
        <Route exact path='/sub/:slug' component={SubHome}></Route>
        <Route exact path='/shop' component={Shop}></Route>
        <Route exact path='/cart' component={Cart}></Route>
        <Route exact path='/checkout' component={Checkout}></Route>
      </Switch>
    </>
  )
}
  
export default App;
