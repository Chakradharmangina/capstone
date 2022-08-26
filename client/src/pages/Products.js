import React, { useEffect, useState } from "react";
import "../styles/Products.css";
import cardImage from "../assets/card-image.jpg";
import { Link } from "react-router-dom";
const data = [
  {
    img: cardImage,
    title: "Wood Work",
    description: "qwertyuioplkjhgfdsxcvbnm,",
  },
  {
    img: cardImage,
    title: "Plane Work",
    description: "qwertyuioplkjhgfdsxcvbnm,",
  },
  {
    img: cardImage,
    title: "Wall Work",
    description: "qwertyuioplkjhgfdsxcvbnm,",
  },
  {
    img: cardImage,
    title: "Paint Work",
    description: "qwertyuioplkjhgfdsxcvbnm,",
  },
  {
    img: cardImage,
    title: "Wool Work",
    description: "qwertyuioplkjhgfdsxcvbnm,",
  },
  {
    img: cardImage,
    title: "Floor Work",
    description: "qwertyuioplkjhgfdsxcvbnm,",
  },
  {
    img: cardImage,
    title: "Ceiling Work",
    description: "qwertyuioplkjhgfdsxcvbnm,",
  },
];
function Products() {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [key, setKey] = useState("");
  useEffect(() => {
    if (key === "") {
      setProducts(data);
      return;
    }
    let results = data.filter((item) =>
      item.name.toLowerCase().includes(key.toLowerCase())
    );
    setProducts(results);
  }, [key]);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    //
    await fetch("http://localhost:3003/user/getProducts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setData(json.result || []);
        setProducts(json.result || []);
        setCategories(json.categorylist || []);
      })
      .catch((err) => console.log(err));
  };

  const getProductsByCategory = async (item) => {
    //
    if (item == "All") {
      getProducts();
      return;
    }
    await fetch("http://localhost:3003/user/getbycategory", {
      method: "post",
      body: JSON.stringify({
        category: item,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setData(json.products || []);
        setProducts(json.products || []);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="products-container">
      <div id="div1">
        <div className="products-top">
          <div>
            <input
              className="searchInput"
              placeholder="Search For Product"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <div>
            <select
              onChange={(e) => getProductsByCategory(e.target.value)}
              name="cars"
              id="cars"
            >
              <option value="All">All</option>
              {categories.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </div>
        </div>
        <section class="section-grid">
          <div class="grid-prod">
            {products.map((item) => {
              return (
                <Link to="/product-description" state={{ data: item }}>
                  <div class="prod-grid">
                    <div>
                      <img src={item.imagename || cardImage} alt="kalita" />
                    </div>
                    <h3>{item?.name || "NA"}</h3>
                    {/* <p>{item?.description || "NA"}</p> */}
                    <button
                      class="btn"
                      style={{ width: "100px", fontSize: "1rem" }}
                    >
                      {" "}
                      View{" "}
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Products;
