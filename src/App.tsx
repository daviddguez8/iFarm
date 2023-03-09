import { useState } from 'react';
import './App.css';
import LogIn from './components/sign-in/LogIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/signUp/SignUp';
import AppLayout from './components/main/AppLayout';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<AppLayout/>}></Route>
      </Routes>
    </BrowserRouter>   
  )
}

export default App;
