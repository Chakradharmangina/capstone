import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  category: yup.string().required(),
});

function CreateCategory() {
  // const [error, setError] = useState(false);
  // const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createCategory = handleSubmit((values) => {
    // login(values);
    console.log(values);
    // updateProductApi(values);
    // console.log(response);
  });

  return (
    <div>
      <div class="content-wrapper">
        <div class="container-fluid">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">Create Category</li>
          </ol>
          <form onSubmit={createCategory} className="CreateCategory">
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <label for="adminCatInput" class="col-form-label">
                  Name
                </label>
              </div>
              <div class="col-auto">
                <input
                  {...register("category")}
                  type="text"
                  id="adminCatInput"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                />
                <p style={{ color: "red" }}>{errors.category?.message}</p>
              </div>
              <div class="col-auto">
                <span id="passwordHelpInline" class="form-text"></span>
              </div>
              <button
                type="submit"
                class="btn btn-info"
                style={{ width: "100px" }}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default CreateCategory;
