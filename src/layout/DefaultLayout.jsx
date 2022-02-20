import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../assets/scss/layout/DefaultLayout.scss'

import Button from '../components/basic/Button';
import Modal from '../components/basic/Modal';
import Register from '../components/common/Register';
import Logo from '../assets/img/logo.png';

const DefaultLayout = ({
  children,
  ...rest
}) => {
  ///States
  const { user } = useSelector(state => state.auth)
  const [isRegister, setRegister] = useState(false);
  const [auth, setAuth] = useState(false);

  ///Check logged in
  useEffect(() => {
    if (user) {
      setAuth(true)
    }
  }, [user]);

  ///Logout function
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload()
  }

  return (
    <div className='defaultLayout'>
      <div className='navbar'>

        <img width="60px" src={Logo} alt="z" />

        {auth ?

          <div>
            <div>{user}</div>
            <Button onClick={logout}>Logout</Button>
          </div>

          :

          <div>
            <Button onClick={() => setRegister(true)}>Register</Button>
          </div>
        }

      </div>

      <Modal active={isRegister} onClose={() => setRegister(false)}>
        <Register />
      </Modal>

      <div className='layoutBody' {...rest}>
        {children}
        <div className='ghostFooter'></div>
      </div>
    </div>
  );
};

export default DefaultLayout;
