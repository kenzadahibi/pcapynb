import logo from './logo.svg';
import './App.css';
import {BrowserRouter , Route ,Routes} from "react-router-dom"
import Home from './Pages/HomeUser'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { RequireToken } from './SharedComponentsLog/auth';
function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes >
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />  
      <Route path="/home" element={ <Home/> } />  


      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
