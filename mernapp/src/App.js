import React from 'react';
import Home from "./screens/Home";
import './App.css';
import {BrowserRouter as Router ,Routes,Route} from "react-router-dom";
import Login from './screens/Login';
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import SignUp from './screens/SignUp';
import  CartProvider  from './components/ContextReducer';
import MyOrders from './screens/MyOrders';
import CustomizedBadges from './components/Badge';

function App() {
  return (
    
    <CartProvider>
    <Router>
    <div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/myorders" element={<MyOrders/>} />
        <Route exact path="/check" element={<CustomizedBadges/>} />
      </Routes>
    </div>
    </Router>
    </CartProvider>
    
  );
}

export default App;
