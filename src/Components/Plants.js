import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlants, incrementCart } from "../store";
import Filters from "./Filters";

//to host all functional 'cards' ** base framework

const Plants = () => {
  const { plants, auth } = useSelector((state) => state);
  const [filters, setFilters] = useState({
    petFriendly: false,
    waterRequirements: [],
    lightRequirements: [],
    difficulty: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlants());
  }, []);

  const updateFilters = (filters) => {
    setFilters(filters);
  };

  const filteredPlants = plants
    .filter((plant) => (filters.petFriendly == true ? plant.petFriendly : true))
    .filter((plant) =>
      filters.waterRequirements.length > 0
        ? filters.waterRequirements.includes(plant.waterRequirements)
        : true
    )
    .filter((plant) =>
      filters.lightRequirements.length > 0
        ? filters.lightRequirements.includes(plant.lightRequirements)
        : true
    )
    .filter((plant) =>
      filters.difficulty.length > 0
        ? filters.difficulty.includes(plant.difficulty.toString())
        : true
    );

  return (
    <div className="pageContainer">
      <Filters filters={filters} updateFilters={updateFilters} />

      <div className="cardContainer">
        {filteredPlants.map((plant) => {
          return (
            <div className="productCard" key={plant.id}>
              <Link to={`/products/${plant.id}`}>
                <img className="cardImg" src={plant.imageURL} />
                <div className="productTopRow">
                  <div className="productName" key={plant.id}>
                    {plant.name}
                  </div>
                  <div className="productPrice">${plant.price}</div>
                </div>
              </Link>
              <button
                className="quickAdd"
                onClick={() => dispatch(incrementCart(plant, 1))}
              >
                Quick add
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Plants;
