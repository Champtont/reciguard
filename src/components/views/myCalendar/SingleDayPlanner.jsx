import { useState } from "react";

const SingleDayPlanner = (props) => {
  return (
    <div id="singleDayModal">
      <div id="singleModalExit" onClick={() => props.setSelected(false)}>
        X
      </div>
      <div id="singleDayLeft">
        <div id="singleDayUpper">
          <h1>Select Recipe(s) for {props.date}</h1>
        </div>
        <div id="singleDayDowner"></div>
      </div>
      <div id="singleDayOptBox">
        {props.recipes.map((recipe) => (
          <div id={`${recipe.title}`}>{recipe.title}</div>
        ))}
      </div>
    </div>
  );
};
export default SingleDayPlanner;
