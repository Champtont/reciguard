import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Loading from "../../assets/reciCustomLoad.png";
import Planner from "../../assets/reciCal.png";
import ShoppingList from "../../assets/reciList.png";
import MenuPlanner from "../../assets/reciPlanner.png";
import Preview from "../../assets/reciGuard.png";

const LoginCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <div className="slideImageBox">
          <img className="slideOutline" src={Loading} alt="First slide" />
        </div>
        <Carousel.Caption>
          <h3>Welcome to ReciGuard!</h3>
          <p>Your modern Recipe book...</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slideImageBox">
          <img className="slideOutline" src={Preview} alt="Second slide" />
        </div>
        <Carousel.Caption>
          <h3>Save, Share, Edit, and Favorite!</h3>
          <p>
            With ReciGuard, you'll be sure to remember all of your best recipes
            by saving them and/or altering however you see fit. Also, If you
            come across a recipe that you like, save it to your favorites for a
            chance to make it your own without altering the original!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div id="ThirdSlideBacking">
          <div id="ThirdSlideBoxOne">
            <img className="slideOutline" src={Planner} alt="Third slide" />
          </div>
          <div id="ThirdSlideBoxTwo">
            <img className="slideOutline" src={MenuPlanner} />
          </div>
        </div>

        <Carousel.Caption>
          <h3>Plan Your Meals!</h3>
          <p>
            Once you've saved/favorited some recipes, it's time to plan your
            menu! After selecting a day, you can drag and drop your menu items
            into your menu and save. Further, you can select a date range and
            generate a shopping list based on the menus within the selected
            dates.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slideImageBox">
          <img className="slideOutline" src={ShoppingList} alt="Third slide" />
        </div>
        <Carousel.Caption>
          <h3>Take Your list with You!</h3>
          <p>
            Okay, You have a list of food, but we aren't done yet! This app is
            mobile friendly for the sole purpose of taking your list with you.
            Often, we are shopping for more than food items. You can add/delete
            whatever else you need to your list and save it for later.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
export default LoginCarousel;
