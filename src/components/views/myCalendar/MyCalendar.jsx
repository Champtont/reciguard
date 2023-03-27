import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import { Button } from "react-bootstrap";
import SingleDayPlanner from "./SingleDayPlanner";
import {
  fetchCurrentUser,
  getMyCalenderItems,
  getMenusInRange,
} from "../../../redux/actions";
import { format, parseISO } from "date-fns";

const MyCalendar = () => {
  const userRecipes = useSelector((state) => state.user.userRecipes);
  const userCalendarMenus = useSelector(
    (state) => state.user.currentUser.calendar
  );
  const userFavs = useSelector((state) => state.user.favorites);
  const [menus, setMenus] = useState(userCalendarMenus);
  const [date, setDate] = useState(new Date());
  const [selectRange, setSelectRange] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  const tileContent = ({ date, view }) => {
    if (userCalendarMenus.length > 0 && view === "month") {
      for (let i = 0; i < userCalendarMenus.length; i++) {
        if (
          format(date, "MM dd") ===
          format(new Date(userCalendarMenus[i].planDate), "MM dd")
        ) {
          return userCalendarMenus[i].recipes.map((recipe) => (
            <div className="text-truncate" key={recipe._id}>
              {recipe.title}
            </div>
          ));
        }
      }
    }
  };

  return (
    <div id="calendarPage">
      <h2>Calendar</h2>
      {toast === true && (
        <div id="calendarToast">Your List has Been Created!</div>
      )}
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          selectRange={selectRange}
          tileContent={tileContent}
        />
        {date.length > 0 ? (
          <div className="text-center my-2 calendarReflectedDates">
            <strong>Start:</strong> {date[0].toDateString()}
            <br />
            <strong>End:</strong> {date[1].toDateString()}
          </div>
        ) : (
          <div className="text-center my-2 calendarReflectedDates">
            <strong>selected date:</strong> {date.toDateString()}
          </div>
        )}
      </div>
      <Button
        className={selectRange ? "mb-0 me-1" : "mb-1"}
        onClick={() => {
          selectRange === false ? setSelectRange(true) : setSelectRange(false);
          setDate(new Date());
        }}
      >
        {selectRange === false ? "Select Date Range" : "Plan A day"}
      </Button>
      {selectRange === true ? (
        <Button
          style={{
            animation:
              date.length > 0 ? "bounce 0.5s infinite 0.5s ease-in-out" : "",
          }}
          onClick={() => {
            dispatch(
              getMenusInRange(
                format(parseISO(date[0].toISOString()), "yyyy-MM-dd"),
                format(parseISO(date[1].toISOString()), "yyyy-MM-dd")
              )
            );
            setToast(true);
            setTimeout(function () {
              setToast(false);
            }, 2000);
            setDate(new Date());
          }}
        >
          Create My Shopping List
        </Button>
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
          favs={userFavs}
        />
      )}
    </div>
  );
};
export default MyCalendar;
