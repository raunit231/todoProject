/* `import './App.css';` is importing the CSS file for the App component. This allows the styles
defined in the CSS file to be applied to the App component and its child components. */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home/>} />
        <Route path='/main' element={<MainPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
