import Login from './auth/Login.jsx';
import Register from './auth/Register.jsx';
import Home from './Home.jsx';

import {BrowserRouter, Routes, Route} from "react-router-dom";



function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
