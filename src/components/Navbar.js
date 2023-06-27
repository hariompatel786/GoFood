

import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleCartClick = () => {
    setCartView(true);
  };

  let data = useCart();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("authToken") &&
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
              }
            </ul>

            {!localStorage.getItem("authToken") ?
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/Login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
              </div>
              :
              <div>
                <div className="btn bg-white text-success mx-2" onClick={handleCartClick}>
                  My Cart {"  "}
                  {/* <Badge pill bg="danger"> 2 </Badge> */}
                   <Badge color="secondary" badgeContent={data.length} >
                                        <ShoppingCartIcon />
                                    </Badge>
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            }
          </div>
        </div>
      </nav>
    </>
  );
}

