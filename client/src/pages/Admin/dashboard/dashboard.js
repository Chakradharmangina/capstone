import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);
  const fetchProducts = async () => {
    await fetch("http://localhost:3003/admin/getProducts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        // console.log(json);
      })
      .catch((err) => console.log(err));
  };

  const fetchUsers = async () => {
    await fetch("http://localhost:3003/admin/getUsers", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.ACCESS_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setUsers(json);
        // console.log(json);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div class="content-wrapper">
        <div class="container-fluid">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">My Dashboard</li>
          </ol>
          <div class="row">
            {/* <div class="col-xl-3 col-sm-6 mb-3">
              <div
                class="card text-white bg-primary o-hidden"
                style={{ height: "160px" }}
              >
                <div class="card-body">
                  <div class="card-body-icon">
                    <i class="fa fa-fw fa-comments"></i>
                  </div>
                  <h1 class="mr-5">26</h1>
                  <div class="mr-5">New Messages!</div>
                </div>
                <a class="card-footer text-white clearfix small z-1" href="#">
                  <span class="float-left">View Details</span>
                  <span class="float-right">
                    <i class="fa fa-angle-right"></i>
                  </span>
                </a>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-3">
              <div class="card text-white bg-warning o-hidden h-100">
                <div class="card-body">
                  <div class="card-body-icon">
                    <i class="fa fa-fw fa-list"></i>
                  </div>
                  <h1 class="mr-5">135</h1>
                  <div class="mr-5">New Products!</div>
                </div>
                <a class="card-footer text-white clearfix small z-1" href="#">
                  <span class="float-left">View Details</span>
                  <span class="float-right">
                    <i class="fa fa-angle-right"></i>
                  </span>
                </a>
              </div>
            </div> */}
            <div class="col-xl-3 col-sm-6 mb-3">
              <div class="card text-white bg-success o-hidden h-100">
                <div class="card-body">
                  <div class="card-body-icon">
                    <i class="fa fa-fw fa-shopping-cart"></i>
                  </div>
                  <h1 class="mr-5">{products?.length || "NA"}</h1>
                  <div class="mr-5">Total Products!</div>
                </div>
                <a class="card-footer text-white clearfix small z-1" href="#">
                  <span
                    class="float-left"
                    onClick={() => {
                      navigate("/admin/products");
                    }}
                  >
                    View Details
                  </span>
                  <span class="float-right">
                    <i class="fa fa-angle-right"></i>
                  </span>
                </a>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-3">
              <div class="card text-white bg-danger o-hidden h-100">
                <div class="card-body">
                  <div class="card-body-icon">
                    <i class="fa fa-fw fa-support"></i>
                  </div>
                  <h1 class="mr-5">{users?.length || "NA"}</h1>
                  <div class="mr-5">Users!</div>
                </div>
                <a class="card-footer text-white clearfix small z-1" href="#">
                  <span
                    class="float-left"
                    onClick={() => {
                      navigate("/admin/users");
                    }}
                  >
                    View Details
                  </span>
                  <span class="float-right">
                    <i class="fa fa-angle-right"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <footer class="sticky-footer">
          <div class="container">
            <div class="text-center">
              <small>Copyright © Your Website 2018</small>
            </div>
          </div>
        </footer>
        <a class="scroll-to-top rounded" href="#page-top">
          <i class="fa fa-angle-up"></i>
        </a>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  class="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                Select "Logout" below if you are ready to end your current
                session.
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <a class="btn btn-primary" href="login.html">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
