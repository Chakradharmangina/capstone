import React from "react";
import CardImage from "../assets/card-image.jpg";
import "../styles/Card.css";
import { Link } from "react-router-dom";
function Card({ item }) {
  return (
    <div
      className="card"
      style={{
        width: "18rem",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <img
        src={item.imagename || CardImage}
        style={{ width: "100%", height: "200px", objectFit: "contain" }}
        className="card-img-top card1"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{item.name || "NA"}</h5>
        <Link
          to="/product-description"
          state={{ data: item }}
          className="btn btn-primary"
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default Card;
