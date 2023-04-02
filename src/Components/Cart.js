import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createOrder, incrementCart, decrementCart, fetchCart } from "../store";

const Cart = () => {
  let { cart } = useSelector((state) => state);
  const [total, setTotal] = useState(0);
  const [cartCanceled, setCanceled] = useState(false);
  const { canceled } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
    if (canceled)
      alert(
        "Your order could not be placed. These items are still in your cart!"
      );
  }, []);

  useEffect(() => {
    setTotal(
      cart.lineItems.reduce((accum, elem) => {
        return accum + elem.quantity * elem.product.price;
      }, 0)
    );
  }, [cart]);

  const onClick = (type, lineItem) => {
    if (type === "increment") {
      dispatch(incrementCart(lineItem.product, 1));
    }

    if (type === "decrement") {
      dispatch(decrementCart(lineItem.product, 1));
    }

    if (type === "remove") {
      dispatch(decrementCart(lineItem.product, lineItem.quantity));
    }
  };

  const checkout = async () => {
    const response = await axios.post("/create-checkout-session", cart);
    window.open(response.data);
  };

  return (
    <div className="Cart">
      <table>
        <h1>Your cart</h1>
        <thead>
          <tr>
            <td>Item</td>
            <td>Quantity</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          {cart.lineItems.map((lineItem) => {
            return (
              <tr key={lineItem.id}>
                <td className="Cart-item">
                  <img src={lineItem.product.imageURL} alt="" />
                  <div>
                    <span>{lineItem.product.name}</span>
                    <span
                      className="button-link"
                      data-name="remove"
                      onClick={(e) =>
                        onClick(e.target.getAttribute("data-name"), lineItem)
                      }
                    >
                      Remove
                    </span>
                  </div>
                </td>
                <td className="Cart-quantity">
                  <div className="Quantity-incrementer">
                    <i
                      className="fa-solid fa-minus"
                      data-name="decrement"
                      onClick={(e) =>
                        onClick(e.target.getAttribute("data-name"), lineItem)
                      }
                    ></i>
                    <span>{lineItem.quantity}</span>
                    <i
                      className="fa-solid fa-plus"
                      data-name="increment"
                      onClick={(e) =>
                        onClick(e.target.getAttribute("data-name"), lineItem)
                      }
                    ></i>
                  </div>
                </td>
                <td className="Cart-price">
                  ${(lineItem.quantity * lineItem.product.price).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="Checkout">
        <div>
          <span>Item Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="button button-large" onClick={checkout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
