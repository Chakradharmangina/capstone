import React from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../styles/Login.css";
import { useNavigate, useLocation } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

function Login() {
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
  const from = "/";

  const loginHandle = handleSubmit((values) => {
    login(values);
    // console.log(response);
  });

  const login = async (values) => {
    await fetch("http://localhost:3003/user/signIn", {
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
            ROLE: ["user"],
            ACCESS_TOKEN: json.token,
            STATUS: true,
            EMAIL: values.email,
          });
          localStorage.setItem(
            "user-auth",
            JSON.stringify({
              ROLE: ["user"],
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
                <h2 class="p-3">Login</h2>
              </div>
              <div class="card-body">
                <form onSubmit={loginHandle}>
                  <div class="mb-4">
                    <label for="username" class="form-label">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="text"
                      class="form-control"
                      id="username"
                    />
                  </div>
                  <div class="mb-4">
                    <label for="password" class="form-label">
                      Password
                    </label>
                    <input
                      {...register("password")}
                      type="password"
                      class="form-control"
                      id="password"
                    />
                  </div>

                  <div class="d-grid">
                    <button type="submit" class="btn text-light main-bg">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
