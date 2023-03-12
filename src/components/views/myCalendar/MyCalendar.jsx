/*import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = () => {
  return (
    <Calendar
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  );
};

export default MyCalendar;*/
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
    //console.log(format(date, "MM dd"));
    //console.log(format(new Date(userCalendarMenus[0].planDate), "MM dd"));
    /*if (
      view === "month" &&
      format(date, "MM dd") ==
        format(new Date(userCalendarMenus[0].planDate), "MM dd")
    ) {
      return <div>x</div>;
    }*/
    if (userCalendarMenus.length > 0 && view === "month") {
      for (let i = 0; i < userCalendarMenus.length; i++) {
        console.log("in the loop");
        if (
          format(date, "MM dd") ===
          format(new Date(userCalendarMenus[i].planDate), "MM dd")
        ) {
          return userCalendarMenus[i].recipes.map((recipe) => (
            <div key={recipe._id}>{recipe.title}</div>
          ));
        }
      }
      console.log("I checked length");

      /* if (
        view === "month" &&
        date.getDate(userCalendarMenus[0].planDate) ==
          format(new Date(userCalendarMenus[0].planDate), "dd")
      ) {
        console.log(
          `rendering: ${format(
            new Date(userCalendarMenus[0].planDate),
            "dd"
          )} and ${date.getDate(userCalendarMenus[0].planDate)}`
        );
        return <div className="mt-2">❤</div>;
      } else {
        return null;
      }*/
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
          date={date.toDateString()}
          setSelected={setSelected}
          recipes={userRecipes}
        />
      )}
    </div>
  );
};
export default MyCalendar;
