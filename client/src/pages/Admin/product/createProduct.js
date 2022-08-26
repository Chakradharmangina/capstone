import "../../../styles/Admin.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FileBase64 from "react-file-base64";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.string().required(),
  category: yup.string().required(),
  quantity: yup.string().required(),
  sold: yup.string().required(),
  image: yup.string().required(),
  shipping: yup.boolean().oneOf([true, false], "asdfg").required(),
});

function CreateProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // const [image, setImage] = useState("");
  const handleCreate = handleSubmit((values) => {
    console.log(values);
    // console.log(image);
    createProduct(values);
    // console.log(response);
  });

  const createProduct = async (values) => {
    // .getAsDataURL()
    await fetch("http://localhost:3003/admin/createProduct", {
      method: "post",
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
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // setStocks(json);
        if (json.status) {
          alert("Created successfully!!");
          reset({
            name: "",
            description: "",
            price: "",
            category: "",
            sold: "",
            shipping: "",
            image: "",
            quantity: "",
          });
          // console.log(json);
        } else {
          alert("Something went wrong!!");
        }
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

            <li class="breadcrumb-item active">create Product</li>
          </ol>
          <form onSubmit={handleCreate} className="create-product">
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">
                  URL of image
                </label>
              </div>
              <div class="col-auto">
                <input
                  {...register("image")}
                  type="text"
                  id="inputPassword6"
                  class="form-control"
                />

                <p style={{ color: "red" }}>{errors.image?.message}</p>
              </div>
              <div class="col-auto">
                <span id="passwordHelpInline" class="form-text"></span>
              </div>
            </div>
            <br></br>
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">
                  Name
                </label>
              </div>
              <div class="col-auto">
                <input
                  {...register("name")}
                  type="text"
                  id="inputPassword6"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                />
                <p style={{ color: "red" }}>{errors.name?.message}</p>
              </div>
              <div class="col-auto">
                <span id="passwordHelpInline" class="form-text"></span>
              </div>
            </div>
            <br></br>
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">
                  Description
                </label>
              </div>
              <div class="col-auto">
                <input
                  {...register("description")}
                  type="text"
                  id="inputPassword6"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                />
                <p style={{ color: "red" }}>{errors.description?.message}</p>
              </div>
              <div class="col-auto">
                <span id="passwordHelpInline" class="form-text"></span>
              </div>
            </div>
            <br></br>
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">
                  Price
                </label>
              </div>
              <div class="col-auto">
                <input
                  {...register("price")}
                  type="number"
                  id="inputPassword6"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                />
                <p style={{ color: "red" }}>{errors.price?.message}</p>
              </div>
              <div class="col-auto">
                <span id="passwordHelpInline" class="form-text"></span>
              </div>
            </div>
            <br></br>
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">
                  category
                </label>
              </div>
              <div class="col-auto">
                <input
                  {...register("category")}
                  type="text"
                  id="inputPassword6"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                />
                <p style={{ color: "red" }}>{errors.category?.message}</p>
              </div>
              <div class="col-auto">
                <span id="passwordHelpInline" class="form-text"></span>
              </div>
            </div>
            <br></br>
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">
                  shipping
                </label>
              </div>
              <div class="col-auto">
                <input
                  {...register("shipping")}
                  type="checkbox"
                  id="flexCheckDefault"
                  // class="form-control"
                />
                <p style={{ color: "red" }}>{errors.shipping?.message}</p>
              </div>
              <div class="col-auto">
                <span id="passwordHelpInline" class="form-text"></span>
              </div>
            </div>
            <br></br>
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">
                  Quantity
                </label>
              </div>
              <div class="col-auto">
                <input
                  {...register("quantity")}
                  type="number"
                  id="inputPassword6"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                />
                <p style={{ color: "red" }}>{errors.quantity?.message}</p>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">
                  Sold
                </label>
              </div>
              <div class="col-auto">
                <input
                  {...register("sold")}
                  type="number"
                  id="inputPassword6"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                />
                <p style={{ color: "red" }}>{errors.quantity?.message}</p>
              </div>
            </div>
            <br></br>
            <button type="submit" class="btn btn-info">
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default CreateProduct;
