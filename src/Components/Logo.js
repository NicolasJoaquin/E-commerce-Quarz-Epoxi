import React from 'react'
import logo from '../quarz-logo.png';
import {Link} from 'react-router-dom';
const Logo = () => {
  return (
    <div>
        <Link to="/">
          <img src={logo} width='40px' height='50px' alt='quarz-epoxi' />
        </Link>
        {' '} Quarz Epoxi
    </div>
  )
}

export default Logo