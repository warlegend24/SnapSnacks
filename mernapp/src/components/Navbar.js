import React, { useState } from 'react'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FastfoodSharpIcon from '@mui/icons-material/FastfoodSharp';
import { Link, NavLink, useNavigate } from "react-router-dom";
import Modal from './Modal';
import Cart from "../screens/Cart";
import { useCart } from './ContextReducer';

const Navbar = () => {
  const items=useCart();

  //STATE VARIABLE:-
  //state variable to control the rendering of the my cart portal:-
  const [cartView, setCartView] = useState(false);

  //FUNCTION:-
  const navigateTo = useNavigate();
  function handleLogOut() {
    localStorage.removeItem("authToken");
    navigateTo("/login");
  }

  function handleCartClicked() {
    setCartView(true);
    console.log(cartView);
  }
  function closeButtonclicked() {
    setCartView(false);

  }





  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <NavLink className="navbar-brand mx-2" to="/"><FastfoodSharpIcon fontSize='large'/></NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <NavLink className="nav-link active fs-5" to="/">Home</NavLink>
            </li>
            {(localStorage.getItem("authToken")) && <li className="nav-item">
              <NavLink className="nav-link fs-5" to="/myorders">My Orders</NavLink>
            </li>}

          </ul>
          {localStorage.getItem("authToken") ?
            <div className='d-flex'>
              <div className="btn  bg-white mx-1">
                <div className="nav-item text-success" onClick={handleCartClicked} ><Badge style={{"marginRight":"7px"}} showZero color="secondary" badgeContent={items.length} >
                  <ShoppingCartIcon color='primary'/>
                </Badge>
                My Cart</div>
                {cartView && <Modal onClose={closeButtonclicked}><Cart /></Modal>}
              </div>
              <div className="btn bg-white mx-1">
                <div className="nav-item text-danger" style={{ "textDecoration": "none" }} onClick={handleLogOut}>LogOut</div>
              </div>
            </div>
            :
            <div className='d-flex'>
              <div className="btn  bg-white mx-1">
                <NavLink className="nav-item text-warning" style={{ "textDecoration": "none" }} to="/login">Login</NavLink>
              </div>

              <div className="btn bg-white mx-1">
                <NavLink className="nav-item text-info" style={{ "textDecoration": "none" }} to="/signup">SignUp</NavLink>
              </div>
            </div>
          }

        </div>
      </nav></div>
  )
}

export default Navbar