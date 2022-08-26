import React from "react";
import "../../styles/Register.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().min(8).max(32).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const registerHandle = handleSubmit((values) => {
    registerAPI(values);
    // console.log(response);
  });

  const registerAPI = async (values) => {
    await fetch("http://localhost:3003/user/signUp", {
      method: "post",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        username: values.username,
        itemsincart: [],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          navigate("/login");
        } else {
          alert(json.msg);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="registerContainer">
      <div class="container1">
        <div class="title">Registration</div>
        <form onSubmit={registerHandle}>
          <div class="user__details">
            <div class="input__box">
              <span class="details">Email</span>
              <input
                {...register("email")}
                type="text"
                placeholder="E.g: John@gmail.com"
              />
              <p style={{ color: "red" }}>{errors.email?.message}</p>
            </div>
            <div class="input__box">
              <span class="details">Username</span>
              <input
                {...register("username")}
                type="text"
                placeholder="johnWC98"
              />
              <p style={{ color: "red" }}>{errors.username?.message}</p>
            </div>
            <div class="input__box">
              <span class="details">Password</span>
              <input
                {...register("password")}
                type="password"
                placeholder="password"
              />
              <p style={{ color: "red" }}>{errors.password?.message}</p>
            </div>
            <div class="input__box">
              <span class="details">Confirm Password</span>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
              />
              <p style={{ color: "red" }}>{errors.confirmPassword?.message}</p>
            </div>
          </div>
          {/* <div class="gender__details">
            <input type="radio" name="gender" id="dot-1" />
            <input type="radio" name="gender" id="dot-2" />
            <input type="radio" name="gender" id="dot-3" />
            <span class="gender__title">Gender</span>
            <div class="category">
              <label for="dot-1">
                <span class="dot one"></span>
                <span>Male</span>
              </label>
              <label for="dot-2">
                <span class="dot two"></span>
                <span>Female</span>
              </label>
              <label for="dot-3">
                <span class="dot three"></span>
                <span>Prefer not to say</span>
              </label>
            </div>
          </div> */}
          <div class="button">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
