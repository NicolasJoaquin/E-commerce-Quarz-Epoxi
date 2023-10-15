import './App.css';
import NavBar from './Components/NavBar';
import ItemListContainer from './Components/ItemListContainer';
import Error404 from './Components/Error404';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemDetailContainer from './Components/ItemDetailContainer';
import Checkout from './Components/Checkout';
import Test from './Components/Test';
import CartContext from './Context/CartContext.js'; 
import Cart from './Components/Cart';

function App() {
  return (
    <div className="App">
      <CartContext>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<ItemListContainer />} />
            {/* <Route path='/:category' element={<ItemListContainer products={products}/>} /> */}
            <Route path='/category/:categoryId' element={<ItemListContainer />} />
            <Route path='/item/:itemId' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<Error404 />} />
            <Route path='/checkout' element={<Checkout />} />
            {/* Componente para pruebas */}
            <Route path='/test' element={<Test />} />
          </Routes>
        </BrowserRouter>
      </CartContext>
    </div>
  );
}

export default App;