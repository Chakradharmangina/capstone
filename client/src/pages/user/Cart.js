import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

function Cart() {
  const [cart, setCart] = useState([]);
  const { auth } = useAuth();
  useEffect(() => {
    getCart();
  }, []);
  const getCart = async () => {
    await fetch("http://localhost:3003/user/getCartItems", {
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
        // console.log(json);
        setCart(json.cartitems || []);
      })
      .catch((err) => console.log(err));
  };
  const addPrice = () => {
    let price = 0;
    cart.forEach((item) => {
      let temp = item.quantity * item.price;
      price = price + temp;
    });
    // console.log(price);
    return price;
  };

  const removeCart = async (name) => {
    await fetch("http://localhost:3003/user/removecartitem", {
      method: "post",
      body: JSON.stringify({
        email: auth.EMAIL,
        productname: name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          alert(json.msg);
          getCart();
        } else {
          alert(json.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  const addQuantity = async (val, name) => {
    await fetch("http://localhost:3003/user/changequantity", {
      method: "post",
      body: JSON.stringify({
        email: auth.EMAIL,
        productname: name,
        quantity: parseInt(val) + 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          getCart();
        } else {
          alert(json.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  const decQuantity = async (val, name) => {
    if (val == 1) {
      if (window.confirm("Do you want to remove this item from cart?")) {
        removeCart(name);
      } else {
        return;
      }
    }
    await fetch("http://localhost:3003/user/changequantity", {
      method: "post",
      body: JSON.stringify({
        email: auth.EMAIL,
        productname: name,
        quantity: val - 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          getCart();
        } else {
          alert(json.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  const getDiscount = () => {
    if (cart.length == 0) return 0;
    let coupons = parseInt(cart[0].coupons || 0) / 100;
    let totalPrice = addPrice();
    console.log(totalPrice, coupons);
    return coupons * totalPrice;
  };
  const checkout = async () => {
    await fetch("http://localhost:3003/user/checkout", {
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
        if (json.status) {
          alert("Order Placed");
          getCart();
        } else {
          alert(json.msg);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div id="w">
        <header id="title">
          <h1>Your Cart</h1>
        </header>
        <div id="page" style={{ width: "60vw", margin: "auto" }}>
          {cart.length == 0 ? (
            <>
              <h1>Your cart is empty!!</h1>
            </>
          ) : (
            <table id="cart">
              <thead>
                <tr>
                  <th class="first">Product</th>
                  <th class="second">Qty</th>
                  <th class="third">Price Per piece</th>
                  <th class="fourth">Total</th>

                  <th class="fifth">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  return (
                    <tr class="productitm">
                      <td>{item.name}</td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <button
                          className="buttonsss"
                          onClick={() => decQuantity(item.quantity, item.name)}
                        >
                          -
                        </button>
                        <input
                          readOnly
                          value={item.quantity}
                          type="number"
                          class="qtyinput"
                        />
                        <button
                          className="buttonsss"
                          onClick={() => addQuantity(item.quantity, item.name)}
                        >
                          +
                        </button>
                      </td>
                      <td>Rs {item.price}</td>
                      <td className="price">Rs {item.price * item.quantity}</td>
                      <td>
                        <span class="remove">
                          <img
                            style={{ width: "20px", height: "20px" }}
                            onClick={() => removeCart(item.name)}
                            src="https://i.imgur.com/h1ldGRr.png"
                            alt="X"
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}

                <tr class="extracosts">
                  <td class="light">Shipping &amp; Tax</td>
                  <td colspan="2" class="light"></td>
                  <td>Rs 35.00</td>
                  <td>&nbsp;</td>
                </tr>
                <tr class="totalprice">
                  <td class="light">Total:</td>
                  <td colspan="2">&nbsp;</td>
                  <td colspan="2">
                    <span class="thick">Rs {addPrice() + 35}</span>
                  </td>
                </tr>
                <tr class="extracosts">
                  <td class="light">Exclusive Discount</td>
                  <td colspan="2" class="light"></td>
                  <td>- Rs{getDiscount()}</td>
                  <td>&nbsp;</td>
                </tr>
                <tr class="totalprice">
                  <td class="light">Final Total:</td>
                  <td colspan="2">&nbsp;</td>
                  <td colspan="2">
                    <span class="thick">
                      Rs {addPrice() - getDiscount() + 35}
                    </span>
                  </td>
                </tr>

                <tr class="checkoutrow">
                  <td colspan="5" class="checkout">
                    <button onClick={() => checkout()} id="submitbtn">
                      Checkout Now!
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
