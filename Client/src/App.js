/* `import './App.css';` is importing the CSS file for the App component. This allows the styles
defined in the CSS file to be applied to the App component and its child components. */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import MainPage from './pages/MainPage';
import SignUp from './pages/SignUp';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = Boolean(useSelector((state) => state.token));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to={'/'} /> : <Login/>} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to={'/'} /> : <SignUp/>} />
        <Route path="/" element={isLoggedIn ? <MainPage/> : <Home/>} />
        <Route path='/main' element={isLoggedIn ? <MainPage/> : <Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
