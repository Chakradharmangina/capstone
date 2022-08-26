import React, { useState, useEffect } from "react";
import cardImage from "../../assets/card-image.jpg";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [key, setKey] = useState("");
  useEffect(() => {
    if (key === "") {
      setProducts(wishlist);
      return;
    }
    let results = wishlist.filter((item) =>
      item.name.toLowerCase().includes(key.toLowerCase())
    );
    setProducts(results);
  }, [key]);

  const { auth } = useAuth();
  useEffect(() => {
    getWishList();
  }, []);

  const getWishList = async () => {
    await fetch("http://localhost:3003/user/getWishlistItems", {
      method: "post",
      body: JSON.stringify({
        email: auth.EMAIL,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setWishlist(json.wishlist || []);
        setProducts(json.wishlist || []);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="products-container">
      {wishlist.length == 0 ? (
        <h1>No Items in your Wishlist</h1>
      ) : (
        <div id="div1">
          <input
            placeholder="Search For Product"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <section class="section-grid">
            <div class="grid-prod">
              {products.map((item) => {
                return (
                  <Link to="/product-description" state={{ data: item }}>
                    <div class="prod-grid">
                      {console.log(item.imagename)}
                      <img
                        src={item.imagename || cardImage}
                        alt="product-image"
                      />
                      <h3>{item.name || "NA"}</h3>
                      {/* <p>{item.description}</p> */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          style={{ width: "100px", fontSize: "1rem" }}
                          class="btn"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
