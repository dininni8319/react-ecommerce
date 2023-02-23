import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';
import RegisterComplete from './pages/auth/RegisterComplete';

const App = () => {
  return (
    <>
      <Header />
      {/* This way the toast container wil be available in the entire application */}
      <ToastContainer/>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/register' component={Register}></Route>
        <Route exact path='/register/complete' component={RegisterComplete}></Route>
      </Switch>
    </>
  )
}
  


export default App;
