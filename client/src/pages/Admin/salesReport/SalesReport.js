import React from "react";
// import { listData } from './apiAdmin';
import { useState, useEffect } from "react";
import axios from "axios";
function SaleReport() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchSales();
  }, []);
  const fetchSales = async () => {
    axios
      .post("http://localhost:3003/admin/getsalesreport", {})
      .then((res) => {
        // setSuccessMsg(res.data.msg);
        setProducts(res.data?.report || []);
        // console.log(res.data.msg);
      })
      .catch((err) => {
        // console.log(err);
        // setErrMsg(err)
      });
  };

  return (
    <div>
      <div class="content-wrapper">
        <div class="container-fluid">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">salereport</li>
          </ol>
          <div>
            <h1 class="text-start">Sale Reports</h1>

            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  {/* <th scope="col">total</th> */}

                  <th scope="col">Revenue Generated</th>
                  <th scope="col">Date Of Purchases</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => {
                  return (
                    <tr>
                      <td scope="row">{index + 1}</td>
                      {/* <td>{item?.name || "NA"}</td> */}
                      <td scope="row">{item?.productname || "NA"}</td>
                      <td scope="row">{item?.quantity || "NA"}</td>
                      <td scope="row">{item?.price || "NA"}</td>

                      {/* <td scope="row">{item?.total || "NA"}</td> */}
                      {/* <td scope="row">
                        {item?.shipping ? "Available" : "NA" || "NA"}
                      </td> */}
                      <td scope="row">{item?.revenugenerated || "NA"}</td>
                      <td scope="row">{item?.dateofpurches || "NA"}</td>
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
export default SaleReport;
