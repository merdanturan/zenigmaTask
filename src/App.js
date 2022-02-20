import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './assets/scss/global.scss';

import CreatePost from './components/common/CreatePost';
import Post from './components/common/Post';
import DefaultLayout from './layout/DefaultLayout';


function App() {
  //States
  const { user } = useSelector(state => state.auth)
  const [auth, setAuth] = useState(false);

  ///Check logged in
  useEffect(() => {
    if (user) {
      setAuth(true)
    }
  }, [user]);

  return (
    <>
      <DefaultLayout>
        {auth &&
          <CreatePost />
        }
        <Post />
      </DefaultLayout>
    </>
  );
}

export default App;
