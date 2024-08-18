import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/esm/Badge";
import { useContext } from "react";
import { Store } from "./Store";

import SignInScreen from "./Component/SignInScreen";
import HomeScreen from "./HomeScreen/HomeScreen";
import ProductScreen from "./ProductScreen/ProductScreen";
import { CartScreen } from "./ProductScreen/CartScreen";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <header>
          <NavBar bg='dark' variant='dark'>
            <Container>
              <LinkContainer to='/'>
                <NavBar.Brand>Amazon</NavBar.Brand>
              </LinkContainer>
              <Nav className='me-auto'>
                <Link to='/cart' className='nav-link'>
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg='danger'>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </NavBar>
        </header>

        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/signin' element={<SignInScreen />} />
              <Route path='/product/:slug' element={<ProductScreen />} />
            </Routes>
          </Container>
        </main>

        <footer>
          <div className='text-center'>All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
