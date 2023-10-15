import React from 'react'
import './Error404.css';
import {Link} from 'react-router-dom';

const Error404 = () => {
  return (
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-bg">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h1>oops!</h1>
        <h2>Error 404 : Esta página no existe</h2>
        <Link to={"/"}>Seguir comprando</Link>
        {/* <div class="notfound-social">
          <a href="#"><i class="fa fa-facebook"></i></a>
          <a href="#"><i class="fa fa-twitter"></i></a>
          <a href="#"><i class="fa fa-pinterest"></i></a>
          <a href="#"><i class="fa fa-google-plus"></i></a>
        </div> */}
      </div>
    </div>
  )
}

export default Error404