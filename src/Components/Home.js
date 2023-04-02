import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { auth } = useSelector((state) => state);
  return (
    <div className="Home">
      <img className="homeLogo" src="./static/homeLogo.png" />

      <div>
        <p className="bio">
          SINK &amp;&amp; SEED is a city scape inspired e-garden shop, we aim to
          help small space gardeners&mdash;and aspiring gardeners&mdash;achieve
          their planting goals. Our online store is stocked with apartment-ready
          tropical houseplants. Our marketplace is brimming with just the right
          nursery plants and for our neighbors' stoops, windowsills, and
          balconies (and the rare garden too!). From our own experience, we’ve
          selected our favorite, most vibrant species, your future plant babies!
        </p>
        <Link className="button button-large" to="/products">
          Shop our collection now!
        </Link>
      </div>

      <footer className="Home-employee-portal">
        <Link to="/portal">Employee Portal</Link>
      </footer>
    </div>
  );
};

export default Home;
