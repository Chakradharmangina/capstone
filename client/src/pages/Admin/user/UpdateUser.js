import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../../styles/UpdateProduct.css";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

function UpdateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const location = useLocation();
  const data = location.state.data;
  const navigate = useNavigate();
  const { auth } = useAuth();
  useEffect(() => {
    reset({
      email: data.email,
    });
  }, []);
  const updateProduct = handleSubmit((values) => {
    // login(values);
    // console.log(response);
    updateProductAPI(values);
  });

  const updateProductAPI = async (values) => {
    await fetch(`http://localhost:3003/admin/updateUserEmail/${data.email}`, {
      method: "put",
      body: JSON.stringify({
        email: values.email,
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

          navigate("/admin/users");
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
          <li class="breadcrumb-item active">Update User</li>
        </ol>
        <div class="row g-3">
          <div>
            <form className="updateForm" onSubmit={updateProduct}>
              <div>
                <label>Email</label>
                <input {...register("email")} type="text" placeholder="Name" />
                <p style={{ color: "red" }}>{errors.email?.message}</p>
              </div>
              {/* <div>
                <label>Password</label>
                <input readOnly type="password" placeholder="Password" />
              </div>
              <div>
                <label>UserName</label>
                <input readOnly type="text" placeholder="Username" />
              </div> */}

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

export default UpdateUser;
