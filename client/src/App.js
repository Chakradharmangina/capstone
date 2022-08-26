import "./App.css";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/admin";
import Home from "./pages/Home";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import AdminLogin from "./pages/auth/AdminLogin";
import ProductDescription from "./pages/user/ProductDescription";
import Cart from "./pages/user/Cart";
import Wishlist from "./pages/user/Wishlist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Missing from "./pages/Missing";
import Unauthorized from "./pages/auth/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./pages/Admin/dashboard/dashboard";
import Product from "./pages/Admin/product/product";
import User from "./pages/Admin/user/user";
import Stocks from "./pages/Admin/stocks/Stock";
import CreateCategory from "./pages/Admin/createCategory/CreateCategory";
import ViewOrders from "./pages/Admin/viewOrders/ViewOrders";
import UpdateProduct from "./pages/Admin/product/UpdateProduct";
import Bulkupload from "./pages/Admin/bulkupload/bulkupload";
import CreateProduct from "./pages/Admin/product/createProduct";
import UpdateUser from "./pages/Admin/user/UpdateUser";
import SaleReport from "./pages/Admin/salesReport/SalesReport";
import UpdateDiscount from "./pages/Admin/discount/UpdateDiscount";
import ManageDiscount from "./pages/Admin/discount/DiscountSection";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="adminLogin" element={<AdminLogin />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorised" element={<Unauthorized />} />

          {/* protected routes */}
          <Route element={<RequireAuth allowedRoles={["user"]} />}>
            <Route
              path="product-description"
              element={<ProductDescription />}
            />
            <Route path="products" element={<Products />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="admin" element={<Admin />}>
              <Route path="" element={<Dashboard />} />
              <Route path="products" element={<Product />} />
              <Route path="users" element={<User />} />
              <Route path="stocks" element={<Stocks />} />
              {/* <Route path="create-category" element={<CreateCategory />} /> */}
              <Route path="view-orders" element={<ViewOrders />} />
              <Route path="products/update" element={<UpdateProduct />} />
              <Route path="bulkupload" element={<Bulkupload />} />
              <Route path="createproduct" element={<CreateProduct />} />
              <Route path="user/update" element={<UpdateUser />} />
              <Route path="salesreport" element={<SaleReport />} />
              <Route path="discount" element={<ManageDiscount />} />
              <Route path="update-discount" element={<UpdateDiscount />} />
            </Route>
          </Route>
          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
