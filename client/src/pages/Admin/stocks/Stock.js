import React, { useEffect, useState } from "react";

function Stock() {
  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    fetchStocks();
  }, []);
  const fetchStocks = async () => {
    await fetch("http://localhost:3003/admin/getProducts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setStocks(json);
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
            <li class="breadcrumb-item active">Stocks</li>
          </ol>
          <div>
            <h1 class="text-start">Stocks</h1>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Sold</th>
                  <th scope="col">Price(Rs)</th>
                  <th scope="col">Shipping</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((item, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <th scope="row">{item?.name || "NA"}</th>
                      <th scope="row">{item?.description || "NA"}</th>
                      <th scope="row">{item?.sold || "NA"}</th>
                      <th scope="row">{item?.price || "NA"}</th>
                      <th scope="row">
                        {item?.shipping ? "Available" : "NA" || "NA"}
                      </th>
                      <th scope="row">{item?.quantity || "NA"}</th>
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

export default Stock;
