import Login from './auth/Login.jsx';
import Register from './auth/Register.jsx';
import Home from './Home.jsx';
import Mhome from './Mhome.jsx';
import Attend from './Attend.jsx';
import AttendQuiz from './AttendQuiz.jsx';
import Quizit from './Quizit.jsx';

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Quiz from "./Quiz";



function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path='/home' element={<Mhome />}></Route>
            <Route path='/' element={<Home />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='home/quiz' element={<Quiz />}></Route>
            <Route path='home/attend' element={<Attend />}></Route>
            <Route path='home/attendquiz' element={<AttendQuiz />}></Route>
            <Route path='home/quizit' element={<Quizit />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
