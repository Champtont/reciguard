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
import { useState } from "react";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import { Button } from "react-bootstrap";
import SingleDayPlanner from "./SingleDayPlanner";
import { changeOpacity } from "../../../redux/actions";

const MyCalendar = () => {
  const userRecipes = useSelector((state) => state.user.userRecipes);
  const [date, setDate] = useState(new Date());
  const [selectRange, setSelectRange] = useState(false);
  const [isSelected, setSelected] = useState(false);

  return (
    <div id="calendarPage">
      <h2>Calendar</h2>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} selectRange={selectRange} />
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
