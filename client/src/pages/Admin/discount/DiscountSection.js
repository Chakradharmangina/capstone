import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

function ManageDiscount() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

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
        console.log(json);
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
            <li class="breadcrumb-item active">Discount</li>
          </ol>
          <div>
            <h1 class="text-start">Discount</h1>
            <h3>Total {users.length} Users</h3>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Username</th>
                  <th scope="col">Discount Coupons</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.username || "NA"}</td>
                      <td>{item.discount_coupon || "NA"}</td>
                      <td>
                        <Link
                          className="badge bg-info"
                          to="/admin/update-discount"
                          state={{ data: item }}
                        >
                          Add Discount
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageDiscount;
