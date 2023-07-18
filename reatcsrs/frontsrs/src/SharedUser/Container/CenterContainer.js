import React from "react";
import "../../SharedUser/Container/CenterContainer.css";

const Container = () => {
  return (
    <div className="container">
      <div className="search-container">
        <form className="search-form">
          <input type="text" placeholder="Recherche..." />
          <button type="submit">Rechercher</button>
        </form>
      </div>
      <div className="sort-container">
        <div className="sort-box" id="level-sort">
        
          <label for="level-sort-select">Trier par niveau :</label>
        </div>
        <div className="sort-box" id="date-sort">
     
          <label for="date-sort-select">Trier par date :</label>
        </div>
        <div className="sort-box" id="date-sort">
          
          <label for="date-sort-select">Trier par type :</label>
        </div>
      </div>
    </div>
  );
};
export default Container;
