import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../../styles/UpdateProduct.css";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.string().required(),
  category: yup.string().required(),
  quantity: yup.string().required(),
  sold: yup.string().required(),
  // image: yup.string().required(),
  shipping: yup.boolean().oneOf([true, false], "asdfg").required(),
});

function UpdateProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;
  const { auth } = useAuth();
  useEffect(() => {
    reset({
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      sold: data.sold,
      shipping: data.shipping,
      imagename: data.image,
      quantity: data.quantity,
    });
  }, []);
  const updateProduct = handleSubmit((values) => {
    // login(values);
    console.log(values);
    updateProductApi(values);
    // console.log(response);
  });
  const updateProductApi = async (values) => {
    await fetch(`http://localhost:3003/admin/updateProduct/${data.name}`, {
      method: "put",
      body: JSON.stringify({
        name: values.name,
        description: values.description,
        price: values.price,
        category: values.category,
        sold: values.sold,
        shipping: values.shipping,
        imagename: values.image,
        quantity: values.quantity,
      }),
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
          alert("Updated successfully!!");
          navigate("/admin/products");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div class="content-wrapper">
      <div class="container-fluid">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li class="breadcrumb-item active">Url of the Image</li>
        </ol>
        <div class="row g-3">
          <div>
            <form className="updateForm" onSubmit={updateProduct}>
              <div>
                <label>Name</label>
                <input
                  readOnly
                  {...register("name")}
                  type="text"
                  placeholder="name"
                />
              </div>
              <p style={{ color: "red" }}>{errors.name?.message}</p>

              <div>
                <label>Description</label>
                <input
                  readOnly
                  {...register("description")}
                  type="text"
                  placeholder="description"
                />
              </div>
              <p style={{ color: "red" }}>{errors.description?.message}</p>

              <div>
                <label>Price</label>
                <input
                  {...register("price")}
                  type="number"
                  placeholder="price"
                />
              </div>
              <p style={{ color: "red" }}>{errors.price?.message}</p>

              <div>
                <label>Category</label>
                <input
                  readOnly
                  {...register("category")}
                  type="text"
                  placeholder="category"
                />
              </div>
              <p style={{ color: "red" }}>{errors.category?.message}</p>

              <div>
                <label>Quantity</label>
                <input
                  {...register("quantity")}
                  type="number"
                  placeholder="quatity"
                />
              </div>
              <p style={{ color: "red" }}>{errors.quantity?.message}</p>

              <div>
                <label>Sold</label>
                <input {...register("sold")} type="text" placeholder="sold" />
              </div>
              <p style={{ color: "red" }}>{errors.sold?.message}</p>

              <div>
                <label>Image Name</label>
                <input
                  readOnly
                  {...register("image")}
                  type="text"
                  placeholder="image name"
                />
              </div>
              <p style={{ color: "red" }}>{errors.image?.message}</p>

              {/* <div>
                <label>Image</label>
                <input type="file" />
              </div> */}
              <div>
                <label>Shipping</label>
                <input
                  {...register("shipping")}
                  type="checkbox"
                  placeholder="shipping"
                />
              </div>
              <p style={{ color: "red" }}>{errors.shipping?.message}</p>

              <div>
                <button className="submit" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
