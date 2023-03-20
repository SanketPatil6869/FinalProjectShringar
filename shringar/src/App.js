import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Components/Register';
//import { AddressForm } from './Components/AddressForm';
import { AddressPage } from './Pages/AddressPage';
import { AdminUserListPage } from './Pages/AdminUserListPage';
import { Login } from './Components/Login';
import { UserProfile } from './Pages/UserProfile';
import { AddProductAdmin } from './Pages/AddProductAdmin';
import { AdminProductDataTable } from './Pages/AdminProductsDataTable';
import { AdHome } from './Pages/AdHome';
import CartPage from './Pages/CartPage';
import ProductDescription from './Pages/ProductDescription';
import { OTPBox } from './Components/OTPBox';
import { ForgotPassword } from './Components/ForgotPassword';
import { ForgotPassOTPBox } from './Components/ForgotPassOTPBox';
import { AdminUpdateProduct } from './Components/AdminUpdateProduct';
import OrderHistory from './Pages/OrderHistory';
import { TryOn } from './Components/TryOn';
import { Aboutus } from './Components/Aboutus';


function App() {



  return (

    < div >

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/Register' element={<Register></Register>}></Route>
          <Route path='/otp-box' element={<OTPBox></OTPBox>}></Route>
          <Route path='/forgot-otp-box' element={<ForgotPassOTPBox></ForgotPassOTPBox>}></Route>
          <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
          <Route path='/Address-Form' element={<AddressPage></AddressPage>}></Route>
          <Route path='/cart' element={<CartPage></CartPage>}></Route>
          <Route path='/product' element={<ProductDescription></ProductDescription>}></Route>
          <Route path='/your-orders' element={<OrderHistory></OrderHistory>}></Route>
          <Route path="/admin/allUsers" element={<AdminUserListPage></AdminUserListPage>}></Route>
          <Route path="/user-profile" element={<UserProfile></UserProfile>}></Route>
          <Route path="/admin/add-product" element={<AddProductAdmin></AddProductAdmin>}></Route>
          <Route path="/admin/all-products" element={<AdminProductDataTable></AdminProductDataTable>}></Route>
          <Route path="/admin/home" element={<AdHome></AdHome>}></Route>
          <Route path='/admin/update-product' element={<AdminUpdateProduct></AdminUpdateProduct>}></Route>
          <Route path='/tryon' element={<TryOn></TryOn>}></Route>
          <Route path='aboutUs' element={<Aboutus></Aboutus>}></Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
