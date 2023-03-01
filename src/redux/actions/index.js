//ENV VARIABLES API
export const baseAPI = `${process.env.REACT_APP_BE_URL}`;
export const feURL = `${process.env.REACT_APP_FE_URL}`;

//Common actions
export const GET_USER = "GET_USER";
export const SAVE_CURRENT_USER = "SAVE_CURRENT_USER";
export const SAVE_RECIPES = "GET_RECIPES";
export const SAVE_USER_RECIPES = "GET_USER_RECIPES";
export const SAVE_SINGLE_RECIPE = "GET_SINGLE_RECIPE";

//fetches
//--login
export const logInAction = (userInfo) => {
  return async (dispatch) => {
    try {
      let response = await fetch(`${baseAPI}/users/login`, {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let fetchedData = await response.json();
        let accessToken = fetchedData.accessToken;
        let firstName = fetchedData.firstName;
        localStorage.setItem("UserAccessToken", accessToken);
        localStorage.setItem("firstName", firstName);
        window.location.assign(`${feURL}/home`);
        dispatch(fetchCurrentUser());
      } else {
        console.log("There was a problem logging into your account");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//--register
export const registerAction = async (userInfo) => {
  try {
    let response = await fetch(`${baseAPI}/users/register`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      window.location.assign(`${feURL}/home`);
    } else {
      console.log("There was an error submitting your request");
    }
  } catch (err) {
    console.log(err);
  }
};

//--get user
export const fetchCurrentUser = () => {
  return async (dispatch) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        let fetchedData = await response.json();
        dispatch({
          type: SAVE_CURRENT_USER,
          payload: fetchedData,
        });
      } else {
        console.log("There was an issue fetching ");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
