import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { incrementCart } from "../store";

// to convert to a functional 'card' ** base frame

const PlantCard = () => {
  const { id } = useParams();
  const { plants, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  // let quantity = 1;
  const [quantity, setQuantity] = useState(1);
  const plant = plants.find((plant) => plant.id === id);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  if (!plant) {
    return <h1> Loading... </h1>;
  }

  return (
    <div className="indvContainter">
      <div className="indvListContainer">
        <div className="badgeContainer">
          {plant.petFriendly === true && (
            <li className="badge">Pet Friendly!</li>
          )}
        </div>
        <img className="indvImg" src={plant.imageURL} />
        <ul className="indvList">
          <li className="indvName">{plant.name} </li>
          <li>${plant.price}</li>
          <li> Light Requirements: {plant.lightRequirements}</li>
          <li> Water Requirements: {plant.waterRequirements}</li>
          <li>Difficulty: {"💧".repeat(plant.difficulty)}</li>
          <div>
            <i
              className="fa-solid fa-minus"
              data-name="decrement"
              onClick={decrementQuantity}
            ></i>
            <span className="quantityPlant">{quantity}</span>
            <i
              className="fa-solid fa-plus"
              data-name="increment"
              onClick={incrementQuantity}
            ></i>
          </div>
          <div className="addToCartPlants">
            <button
              className="addButton"
              onClick={() => dispatch(incrementCart(plant, quantity))}
            >
              Add to Cart
            </button>
            <Link to={"/products"}> Back to Products </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};
export default PlantCard;
