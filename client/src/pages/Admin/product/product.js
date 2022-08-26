import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
function Product() {
  const { auth } = useAuth();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
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
        console.log(json);
      })
      .catch((err) => console.log(err));
  };

  const deleteProduct = async (name) => {
    if (!window.confirm("Are you sure you want to delete this product")) {
      return;
    } else {
      await fetch(`http://localhost:3003/admin/deleteProduct/${name}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.ACCESS_TOKEN}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          // setStocks(json);
          if (json.status === false) {
            alert(json.msg);
          } else {
            alert("Product Deleted Successfully!!");
            fetchProducts();
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <div class="content-wrapper">
        <div class="container-fluid">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">My Products</li>
          </ol>
          <div>
            <h1 class="text-start">Products</h1>
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
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => {
                  return (
                    <tr>
                      <td scope="row">{index + 1}</td>
                      {/* <td>{item?.name || "NA"}</td> */}
                      <td scope="row">{item?.name || "NA"}</td>
                      <td scope="row" style={{ maxWidth: "250px" }}>
                        {item?.description || "NA"}
                      </td>
                      <td scope="row">{item?.sold || "NA"}</td>
                      <td scope="row">{item?.price || "NA"}</td>
                      <td scope="row">
                        {item?.shipping ? "Available" : "NA" || "NA"}
                      </td>
                      <td scope="row">{item?.quantity || "NA"}</td>
                      <td className="actions">
                        <Link
                          to="/admin/products/update"
                          state={{ data: item }}
                        >
                          Update
                        </Link>
                        <a onClick={() => deleteProduct(item.name)}>Delete</a>
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
export default Product;
