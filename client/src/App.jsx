// App.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { login } from './store/userSlice';
import { fetchArticles } from './store/ArticlesSlice';
import OutsideLayout from './layouts/OutsideLayout';
import InsideLayout from './layouts/InsideLayout';
import NeutralLayout from './layouts/NeutralLyaout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/login';
import Register from './pages/register';
import CreateArticle from './pages/createArticle';
import UpdateArticle from './pages/UpdateItem';
import ItemDetails from './pages/ItemDetails';
import AdminPage from './pages/AdminPage';
import Users from './pages/Users';
import Order from './components/Order';
import Cart from './components/Cart';
import { CartProvider } from 'react-use-cart';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const userRole = user.details ? user.details.role : null;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userDetails = localStorage.getItem('userDetails');
    if (token && userDetails) {
      dispatch(login({ token, userExist: JSON.parse(userDetails) }));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<OutsideLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          <Route element={<InsideLayout />}>
            <Route path="/create-article" element={<CreateArticle />} />
            <Route path="/update-art/:id" element={<UpdateArticle />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='/dashboard' element={ userRole === 'A' && isAuthenticated ? <AdminPage /> : <Navigate to='/'/>} />
            <Route path='/users' element={userRole === 'A' && isAuthenticated ? <Users /> : <Navigate to='/'/> } />
            <Route path='/order' element={<Order />} />
          </Route>

          <Route element={<NeutralLayout />}>
            <Route path="/" element={<Home />} />
            <Route path='/articles/:id' element={<ItemDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
