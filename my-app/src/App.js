
import './App.css';
import Home from './screens/Home';
import {
      BrowserRouter as Router,
      Routes,
      Route,

} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import Cart from './screens/Cart';
import MyOrders from './screens/MyOrders';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
      return (
            <AuthProvider>
                  <CartProvider>
                        <Router>
                              <div>
                                    <Routes>
                                          <Route exact path="/" element={<Home />} />
                                          <Route exact path="/login" element={<Login />} />
                                          <Route exact path="/signup" element={<Signup />} />
                                          <Route exact path="/cart" element={<Cart />} />
                                          <Route exact path="/myorders" element={<MyOrders />} />
                                    </Routes>
                              </div>
                        </Router>
                  </CartProvider>
            </AuthProvider>
      );
}

export default App;
