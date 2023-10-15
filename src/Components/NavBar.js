import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from './Logo';
import CartWidget from './CartWidget';
import {Link} from 'react-router-dom';
const NavBar = () => {
  return (
    <div>
        <Navbar bg="dark" data-bs-theme="dark" className='fixed-top'>
            <Container>
                <Navbar.Brand to="#">
                    <Logo />
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Link to="/" className='nav-link'>Home</Link>
                    {/* <Link to="/resinas" className='nav-link'>Resinas</Link>
                    <Link to="/pigmentos" className='nav-link'>Pigmentos</Link>
                    <Link to="/glitters" className='nav-link'>Glitters</Link>
                    <Link to="/moldes" className='nav-link'>Moldes</Link>
                    <Link to="/accesorios" className='nav-link'>Accesorios</Link> */}
                    <Link to="/category/1" className='nav-link'>Resinas</Link>
                    <Link to="/category/2" className='nav-link'>Pigmentos</Link>
                    <Link to="/category/3" className='nav-link'>Glitters</Link>
                    <Link to="/category/4" className='nav-link'>Moldes</Link>
                    <Link to="/category/5" className='nav-link'>Accesorios</Link>
                </Nav>
                <Nav>
                    <Link to="/cart" className='nav-link'>
                        <CartWidget />
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    </div>
  )
}

export default NavBar