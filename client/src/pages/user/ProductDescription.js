import React, { useState, useRef } from "react";
import productImage from "../../assets/card-image.jpg";
import "../../styles/ProductDescription.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function ProductDescription() {
  const [quantity, setQuantity] = useState(0);
  const { auth } = useAuth();
  const num = useRef(null);

  const location = useLocation();
  const data = location.state.data;
  const [maxQuantity, seMaxQuantity] = useState(data.quantity);

  const addWishlist = async () => {
    await fetch("http://localhost:3003/user/addtowishlist", {
      method: "post",
      body: JSON.stringify({
        productname: data.name,
        email: auth.EMAIL,
        quantity: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status == false) {
          alert("Already added to wishlist");
        } else {
          alert("Added to wishlist");
        }
      })
      .catch((err) => console.log(err));
  };

  const removeWishlist = async () => {
    // e.stopPropogation();
    await fetch("http://localhost:3003/user/removewishlistitem", {
      method: "post",
      body: JSON.stringify({
        productname: data.name,
        email: auth.EMAIL,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          alert("Removed from wishlist");
        } else {
          alert("Not in wishlist. Please add");
        }
      })
      .catch((err) => console.log(err));
  };
  const addtocart = async () => {
    if (maxQuantity == 0) {
      alert("This product is out of stock!!");
      return;
    } else if (quantity == 0) {
      alert("Increase the product count");
      num.current.focus();
      return;
    }
    if (quantity > maxQuantity) {
      alert(`You cannot add more than ${maxQuantity} to cart!!`);
      return;
    }
    await fetch("http://localhost:3003/user/addtocart", {
      method: "post",
      body: JSON.stringify({
        productname: data.name,
        email: auth.EMAIL,
        quantity: quantity,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.status == false) {
          alert(
            "Already added to Cart!! If you want to increase the count you can go to cart page..."
          );
        } else {
          alert("Added to Cart");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div class="card-wrapper">
        <div class="card1">
          <div class="product-imgs">
            <div class="img-display">
              <div class="img-showcase">
                <img src={data?.imagename || productImage} alt="shoe image" />
              </div>
            </div>
          </div>

          <div class="product-content">
            <h2 class="product-title">{data?.name || "NA"}</h2>

            <div class="product-price">
              <p class="new-price">
                Price: <span>{data?.price || "NA"}</span>
              </p>
            </div>

            <div class="product-detail">
              <h2>Description:</h2>
              <p>{data?.description || "NA"}</p>
            </div>

            <div class="purchase-info">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItes: "center",
                }}
              >
                <input
                  value={quantity}
                  ref={num}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                />
                {/* <br /> */}
                <button onClick={addtocart} type="button" class="btn">
                  Cart +
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItes: "center",
                }}
              >
                <br />
                <button onClick={addWishlist} type="button" class="btn">
                  Wishlist +
                </button>
                {/* <br /> */}
                <button onClick={removeWishlist} type="button" class="btn">
                  Wishlist -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
