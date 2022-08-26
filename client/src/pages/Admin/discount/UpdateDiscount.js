import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const schema = yup.object().shape({
  username: yup.string().required(),
  discount_coupon: yup.string().required(),
});
function UpdateDiscount() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
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
  useEffect(() => {
    console.log(data);
    reset({
      username: data.username,
      discount_coupon: "",
    });
  }, []);

  const updateDiscount = handleSubmit((values) => {
    setSuccessMsg("");
    setErrMsg("");
    let reqobj = {
      username: values.username,
      discount_coupon: Number(values.discount_coupon),
    };
    // console.log(response);
    axios
      .post(
        `http://localhost:3003/admin/changeDiscountCoupon/${data._id}`,
        reqobj
      )
      .then((res) => {
        alert(`Coupon Added for this ${data.username}`);
        reset({
          username: "",
          discount_coupon: "",
        });
        navigate("/admin/discount");
        // setSuccessMsg(res.data.msg);
        // console.log(res.data.msg);
      })
      .catch((err) => {
        // console.log(err);
        // setErrMsg(err);
      });
  });

  return (
    <div>
      <div class="content-wrapper">
        <div class="container-fluid">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Dashboard</a>
            </li>

            <li class="breadcrumb-item active">Update Discount</li>
          </ol>
          <form onSubmit={updateDiscount} className="create-product">
            <div class="row g-3">
              <h1 class="text-start">Update Discount</h1>
              <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">
                  Username
                </label>
              </div>
              <div class="col-auto">
                <input
                  {...register("username")}
                  type="text"
                  id="inputPassword6"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                />
              </div>
              <div class="col-auto">
                <span id="passwordHelpInline" class="form-text"></span>
              </div>
            </div>
            <p style={{ color: "red" }}>{errors?.username}</p>
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">
                  Discount-Coupon
                </label>
              </div>
              <div class="col-auto">
                <input
                  {...register("discount_coupon")}
                  type="number"
                  id="inputPassword6"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                />
              </div>
              <div class="col-auto">
                <span id="passwordHelpInline" class="form-text"></span>
              </div>
            </div>
            <p style={{ color: "red" }}>{errors?.discount_coupon}</p>
            <p className="success-text">{successMsg}</p>
            <p className="err-text">{errMsg}</p>
            <button type="submit" class="btn btn-info">
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdateDiscount;
