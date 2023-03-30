import React,{ useEffect, lazy, Suspense }  from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";


// using lazy
const Login = lazy(() => import("./pages/auth/Login"));
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'));
const Register = lazy(() => import('./pages/auth/Register'));
const Home = lazy(() => import('./pages/Home'));
const Header = lazy(() => import('./components/nav/Header'));
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));
const History = lazy(() => import('./pages/user/History'));
const Password = lazy(() => import('./pages/user/Password'));
const CategoryCreate=  lazy(() => import('./pages/admin/category/CategoryCreate'));
const Wishlist = lazy(() => import('./pages/user/Wishlist'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CategoryUpdate = lazy(() => import('./pages/admin/category/CategoryUpdate'));
const SubCreate = lazy(() => import('./pages/admin/sub/SubCreate'));
const SubUpdate = lazy(() => import('./pages/admin/sub/SubUpdate'));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'));
const Product = lazy(() => import('./pages/Product'));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const CreateCoupon = lazy(() => import('./pages/admin/coupon/CreateCoupon'));
const Payment = lazy(() => import('./pages/Payment'));

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
    <Suspense fallback={
      <div className='col text-center p-5'>
        __ React Redux EC<LoadingOutlined />MMERCE __
      </div>
    }>
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
        <UserRoute exact path='/payment' component={Payment}></UserRoute>
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
        <AdminRoute exact path='/admin/coupon' component={CreateCoupon}></AdminRoute>
      </Switch>
    </Suspense>
  )
}
  
export default App;
