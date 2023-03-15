import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import { Button } from "react-bootstrap";
import SingleDayPlanner from "./SingleDayPlanner";
import { fetchCurrentUser, getMyCalenderItems } from "../../../redux/actions";
import { isSameDay, format } from "date-fns";

const MyCalendar = () => {
  const userRecipes = useSelector((state) => state.user.userRecipes);
  const userCalendarMenus = useSelector(
    (state) => state.user.currentUser.calendar
  );
  const [menus, setMenus] = useState(userCalendarMenus);
  const [date, setDate] = useState(new Date());
  const [selectRange, setSelectRange] = useState(false);
  const [isSelected, setSelected] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  // const datesToAddContentTo = [isTomorrow];

  /* function tileContent({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (datesToAddContentTo.find((dDate) => isSameDay(dDate, date))) {
        return "My content";
      }
    }
  }*/

  const tileContent = ({ date, view }) => {
    if (userCalendarMenus.length > 0 && view === "month") {
      for (let i = 0; i < userCalendarMenus.length; i++) {
        if (
          format(date, "MM dd") ===
          format(new Date(userCalendarMenus[i].planDate), "MM dd")
        ) {
          return userCalendarMenus[i].recipes.map((recipe) => (
            <div key={recipe._id}>{recipe.title}</div>
          ));
        }
      }
    }
  };

  return (
    <div id="calendarPage">
      <h2>Calendar</h2>
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          selectRange={selectRange}
          tileContent={tileContent}
        />
        {date.length > 0 ? (
          <p className="text-center">
            <span className="bold">Start:</span> {date[0].toDateString()}
            <span className="bold">End:</span> {date[1].toDateString()}
          </p>
        ) : (
          <p className="text-center">
            <span className="bold">selected date:</span> {date.toDateString()}
          </p>
        )}
      </div>
      <Button
        onClick={() => {
          selectRange === false ? setSelectRange(true) : setSelectRange(false);
          setDate(new Date());
        }}
      >
        {selectRange === false ? "Select Date Range" : "Plan A day"}
      </Button>
      {selectRange === true ? (
        <Button>Create My Shopping List</Button>
      ) : (
        <Button
          onClick={() => {
            setSelected(true);
          }}
        >
          Add Recipe(s) to: {date.toDateString()}
        </Button>
      )}
      {isSelected === true && (
        <SingleDayPlanner
          date={date}
          setSelected={setSelected}
          recipes={userRecipes}
          menus={userCalendarMenus}
        />
      )}
    </div>
  );
};
export default MyCalendar;
