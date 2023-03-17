import React, { useState } from 'react';
import { Menu } from 'antd';
import { 
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Search from '../forms/Search';

const { 
  SubMenu,
  Item 
} = Menu;

const Header = () => {
  const [ current, setCurrent ] = useState('home');
  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => ({...state}))
  const handleClick = (e) => {
    setCurrent(e.key)
  }

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
       type: "LOGOUT",
       payload: null,
     })
     history.push('/login')
  }
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to='/'>Home</Link>
      </Item>
     
      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to='/shop'>Shop</Link>
      </Item>

      <Item className="ml-auto p-1">
        <Search />
      </Item>
      {!user && (
          <Item key="register" icon={<UserAddOutlined />} className="ml-auto">
          <Link to='/register'>Register</Link>  
        </Item>
      )}
      {!user && (
          <Item key="login" icon={<UserOutlined />} >
            <Link to='/login'>Login</Link>  
          </Item>
      )}

      {user && (
          <SubMenu icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} className='ml-auto'>
          {user && user.role === 'subscriber' && (
            <Item>
              <Link to='/user/history'>Dashboard</Link>
            </Item>
          )}

          {user && user.role === 'admin' && (
            <Item>
              <Link to='/admin/dashboard'>Dashboard</Link>
            </Item>
          )}
    
          <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
        </SubMenu>
      )}
    </Menu>
  );
}

export default Header;