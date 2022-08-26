import { navigate, useNavigate } from "react-router-dom";
import "../../styles/Admin.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import Product from "./product/product";
import User from "./user/user";
import Stocks from "./stocks/Stock";
// import CreateCategory from "./createCategory/CreateCategory";
import ViewOrders from "./viewOrders/ViewOrders";
import UpdateProduct from "./product/UpdateProduct";
import Bulkupload from "./bulkupload/bulkupload";
import CreateProduct from "./product/createProduct";
import UpdateUser from "./user/UpdateUser";
import RequireAuth from "../../components/RequireAuth";
import SaleReport from "./salesReport/SalesReport";
import ManageDiscount from "./discount/DiscountSection";
import UpdateDiscount from "./discount/UpdateDiscount";
function Admin() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="fixed-nav sticky-footer bg-dark" id="page-top">
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
          id="mainNav"
        >
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul
              className="navbar-nav navbar-sidenav text-start"
              id="exampleAccordion"
            >
              <li
                className="nav-item"
                data-toggle="tooltip"
                data-placement="right"
                title="Dashboard"
              >
                <a className="nav-link" onClick={() => navigate("/admin")}>
                  <i className="fa fa-fw fa-dashboard"></i>
                  <span className="nav-link-text">Dashboard</span>
                </a>
              </li>
              <li
                className="nav-item"
                data-toggle="tooltip"
                data-placement="right"
                title="Products"
              >
                <a
                  className="nav-link"
                  onClick={() => navigate("/admin/products")}
                >
                  <i className="fa fa-fw fa-table"></i>
                  <span className="nav-link-text"> Manage Products</span>
                </a>
              </li>
              <li
                className="nav-item"
                data-toggle="tooltip"
                data-placement="right"
                title="Users"
                onClick={() => navigate("/admin/users")}
              >
                <a className="nav-link">
                  <i className="fa fa-fw fa-sitemap"></i>
                  <span className="nav-link-text">Manage Users</span>
                </a>
              </li>
              <li
                className="nav-item"
                data-toggle="tooltip"
                data-placement="right"
                title="Stocks"
                onClick={() => navigate("/admin/stocks")}
              >
                <a className="nav-link">
                  <i className="fa fa-fw fa-sitemap"></i>
                  <span className="nav-link-text">Stocks</span>
                </a>
              </li>
              {/* <li
                className="nav-item"
                data-toggle="tooltip"
                data-placement="right"
                title="CreateCategory"
                onClick={() => navigate("/admin/create-category")}
              >
                <a className="nav-link">
                  <i className="fa fa-fw fa-sitemap"></i>
                  <span className="nav-link-text">Create Category</span>
                </a>
              </li> */}
              {/* <li
                className="nav-item"
                data-toggle="tooltip"
                data-placement="right"
                title="ViewOrders"
                onClick={() => navigate("/admin/view-orders")}
              >
                <a className="nav-link">
                  <i className="fa fa-fw fa-sitemap"></i>
                  <span className="nav-link-text">View Orders</span>
                </a>
              </li> */}
              <li
                className="nav-item"
                data-toggle="tooltip"
                data-placement="right"
                title="BulkUpload"
                onClick={() => navigate("/admin/bulkupload")}
              >
                <a className="nav-link">
                  <i className="fa fa-fw fa-sitemap"></i>
                  <span className="nav-link-text">Bulk Upload</span>
                </a>
              </li>
              <li
                className="nav-item"
                data-toggle="tooltip"
                data-placement="right"
                title="CreateProduct"
                onClick={() => navigate("/admin/createproduct")}
              >
                <a className="nav-link">
                  <i className="fa fa-fw fa-sitemap"></i>
                  <span className="nav-link-text">Create Product</span>
                </a>
              </li>
              <li
                className="nav-item"
                data-toggle="tooltip"
                data-placement="right"
                title="SaleReport"
                onClick={() => navigate("/admin/salesreport")}
              >
                <a className="nav-link">
                  <i className="fa fa-fw fa-sitemap"></i>
                  <span className="nav-link-text">Sale Report</span>
                </a>
              </li>
              <li
                className="nav-item"
                data-toggle="tooltip"
                data-placement="right"
                title="DiscountSection"
                onClick={() => navigate("/admin/discount")}
              >
                <a className="nav-link">
                  <i className="fa fa-fw fa-sitemap"></i>
                  <span className="nav-link-text">Discount Section</span>
                </a>
              </li>
            </ul>
            <ul className="navbar-nav sidenav-toggler">
              <li className="nav-item">
                <a className="nav-link text-center" id="sidenavToggler">
                  <i className="fa fa-fw fa-angle-left"></i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
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
        </Routes>
        {/* <Dashboard /> */}
      </div>
    </div>
  );
}
export default Admin;
