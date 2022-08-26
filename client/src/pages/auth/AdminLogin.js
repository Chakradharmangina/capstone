import React from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { adminLogin } from "../../api/admin";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

function AdminLogin() {
  const { setAuth } = useAuth();
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
  const from = "/admin";
  const loginHandle = handleSubmit((values) => {
    login(values);
    // console.log(response);
  });

  const login = async (values) => {
    await fetch("http://localhost:3003/admin/signIn", {
      method: "post",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          navigate(from, { replace: true });
          setAuth({
            ROLE: ["admin"],
            ACCESS_TOKEN: json.token,
            STATUS: true,
            EMAIL: values.email,
          });
          localStorage.setItem(
            "user-auth",
            JSON.stringify({
              ROLE: ["admin"],
              ACCESS_TOKEN: json.token,
              STATUS: true,
              EMAIL: values.email,
            })
          );
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div class="container">
        <div class="row justify-content-center mt-5">
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="card shadow">
              <div class="card-title text-center border-bottom">
                <h2 class="p-3">Admin Login</h2>
              </div>
              <div class="card-body">
                <form onSubmit={loginHandle}>
                  <div class="mb-4">
                    <label for="username" class="form-label">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      name="email"
                      type="text"
                      class="form-control"
                      id="username"
                    />
                    <p style={{ color: "red" }}>{errors.email?.message}</p>
                  </div>
                  <div class="mb-4">
                    <label for="password" class="form-label">
                      Password
                    </label>
                    <input
                      {...register("password")}
                      name="password"
                      type="password"
                      class="form-control"
                      id="password"
                    />
                    <p style={{ color: "red" }}>{errors.password?.message}</p>
                  </div>

                  <div class="d-grid">
                    <button type="submit" class="btn text-light main-bg">
                      Admin Login
                    </button>
                  </div>
                </form>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
