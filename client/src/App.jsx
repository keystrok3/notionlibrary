import { Outlet, Route, Routes } from 'react-router-dom'
import Register from './pages/Register';


const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={null}/>
        <Route path='/register' element={ <Register />} />
      </Routes>

      <Outlet />
    </>
  );
};

export default App;