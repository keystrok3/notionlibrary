import { Outlet, Route, Routes } from 'react-router-dom'
import Register from './pages/Register';
import Main from './pages/Main';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import Home from './pages/Home';


const App = () => {
  
  const [ signInData, setSignInData ] = useState(null);

  /** Callback handler: Store sign in data in state: for id and authorization */
  const handleSignIn = (data) => {
    setSignInData({ ...data });
  };

  return (
    <>
      <Routes>
        <Route path='/' element={ <Main />}/>
        <Route path='/register' element={ <Register />} />
        <Route path='/login' element={ <Login onSignIn={handleSignIn} />} />
        <Route path='/home' element={ <Home data={signInData}/>} />
      </Routes>

      <Outlet />
    </>
  );
};

export default App;