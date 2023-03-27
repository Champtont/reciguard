//ENV VARIABLES API
export const baseAPI = `${process.env.REACT_APP_BE_URL}`;
export const feURL = `${process.env.REACT_APP_FE_URL}`;

//Common actions
export const GET_USER = "GET_USER";
export const SAVE_CURRENT_USER = "SAVE_CURRENT_USER";
export const SAVE_RECIPES = "GET_RECIPES";
export const SAVE_USER_RECIPES = "GET_USER_RECIPES";
export const SAVE_SINGLE_RECIPE = "GET_SINGLE_RECIPE";
export const SAVE_TO_FAV = "SAVE_TO_FAV";
export const REMOVE_FROM_FAV = "REMOVE_FROM_FAV";

//Calendar Actions
export const SAVE_USER_MENUS = "SAVE_USER_MENUS";
export const GET_USER_MENUS = "GET_USER_MENUS";
export const GET_USER_MENUS_IN_RANGE = "GET_USER_MENUS_IN_RANGE";
export const SAVE_USER_SHOPPING = "SAVE_USER_SHOPPING";

//fetches
//--login
export const logInAction = (userInfo) => {
  return async (dispatch, getState) => {
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
      } else {
        console.log("There was a problem logging into your account");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//--register
export const registerAction = (userInfo) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch(`${baseAPI}/users/register`, {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let fetchedData = await response.json();
        console.log(fetchedData);
        let accessToken = fetchedData.accessToken;
        let firstName = fetchedData.firstName;
        localStorage.setItem("UserAccessToken", accessToken);
        localStorage.setItem("firstName", firstName);
        window.location.assign(`${feURL}/home`);
      } else {
        console.log("There was an error submitting your request");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//--get user
export const fetchCurrentUser = () => {
  return async (dispatch, getState) => {
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
        let shoppingMenus = fetchedData.shoppingMenus;
        let shoppingList = fetchedData.list;
        let favorites = fetchedData.favorites;
        dispatch({
          type: SAVE_CURRENT_USER,
          payload: fetchedData,
        });
        dispatch({
          type: SAVE_USER_MENUS,
          payload: shoppingMenus,
        });
        dispatch({
          type: SAVE_USER_SHOPPING,
          payload: shoppingList,
        });
        dispatch({
          type: SAVE_TO_FAV,
          payload: favorites,
        });
        console.log(getState());
      } else {
        console.log("There was an issue fetching user");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//--fetch googleUser
//*****DO NOT FORGET TO ADD DISPATCHES HERE!!! */
export const fetchCurrentGoogleUser = (googleAccessToken) => {
  return async (dispatch, getState) => {
    try {
      await localStorage.setItem("UserAccessToken", googleAccessToken);
      const accessToken = localStorage.getItem("UserAccessToken");
      let response = await fetch(`${baseAPI}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        let fetchedData = await response.json();
        let shoppingMenus = fetchedData.shoppingMenus;
        let shoppingList = fetchedData.list;
        let favorites = fetchedData.favorites;
        dispatch({
          type: SAVE_CURRENT_USER,
          payload: fetchedData,
        });
        dispatch({
          type: SAVE_USER_MENUS,
          payload: shoppingMenus,
        });
        dispatch({
          type: SAVE_USER_SHOPPING,
          payload: shoppingList,
        });
        dispatch({
          type: SAVE_TO_FAV,
          payload: favorites,
        });
        console.log(getState());
      } else {
        console.log("There was an issue fetching user");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//--get All recipes
export const fetchAllRecipes = (isLoading) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/recipes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        let fetchedData = await response.json();
        dispatch({
          type: SAVE_RECIPES,
          payload: fetchedData.reverse(),
        });
        setTimeout(function () {
          isLoading(false);
        }, 3500);
        console.log(getState());
      } else {
        console.log("There was an issue fetching recipes");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//--get Specifc recipe
export const fetchSingleRecipe = (recipeId) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/recipes/${recipeId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        let fetchedData = await response.json();
        dispatch({
          type: SAVE_SINGLE_RECIPE,
          payload: fetchedData,
        });
        console.log(getState());
      } else {
        console.log("There was an issue fetching recipes");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//--get my recipes
export const fetchingMyRecipes = () => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/users/me/recipes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        let fetchedData = await response.json();
        dispatch({
          type: SAVE_USER_RECIPES,
          payload: fetchedData,
        });
        console.log(getState());
      } else {
        console.log("There was an issue fetching recipes");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//Posts and puts
//--Edit User
export const editUser = (userInfo) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/users/me`, {
        method: "PUT",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(fetchCurrentUser());
        console.log(getState());
      } else {
        console.log("There was an issue fetching user");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//--Change User Avatar
export const changeUserAvatar = (image) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/users/me/avatar`, {
        method: "POST",
        body: image,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(fetchCurrentUser());
      } else {
        console.log("There was an issue fetching user");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//--Edit Recipe
export const editRecipe = (recipeInfo, recipeId) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/users/me/${recipeId}`, {
        method: "PUT",
        body: JSON.stringify(recipeInfo),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(fetchCurrentUser());
        console.log(getState());
      } else {
        console.log("There was an issue fetching Recipe");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//--Change Recipe Photo
export const changeRecipePhoto = (image, recipeId) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/recipes/${recipeId}/photo`, {
        method: "POST",
        body: image,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        await dispatch(fetchCurrentUser());
        await dispatch(fetchingMyRecipes());
      } else {
        console.log("There was an issue fetching Recipe");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//--Add a New Recipe
export const addANewRecipe = (recipeInfo) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/recipes`, {
        method: "POST",
        body: JSON.stringify(recipeInfo),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        await dispatch(fetchCurrentUser());
        await dispatch(fetchingMyRecipes());
        console.log(getState());
      } else {
        console.log("There was an issue fetching Recipe");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//***Delete***
//delete a recipe
export const deleteThisRecipe = (recipeId) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/users/me/${recipeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        await dispatch(fetchCurrentUser());
        await dispatch(fetchingMyRecipes());
        console.log(getState());
      } else {
        console.log("There was an issue fetching Recipe");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//******Other Actions Of the Site******

export const changeOpacity = (elementId) => {
  const modalFilter = document.getElementById(elementId);
  modalFilter.style.opacity = 1;
};

//**** Calendar Stuff ****

export const getMyCalenderItems = () => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/users/calendar`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        let fetchedData = await response.json();
        dispatch({
          type: SAVE_USER_MENUS,
          payload: fetchedData,
        });
        console.log(getState());
      } else {
        console.log("There was an issue fetching menus");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//post new menu
export const postNewMenu = (menuEvent, date) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/users/calendar/${date}`, {
        method: "POST",
        body: JSON.stringify(menuEvent),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        await dispatch(fetchCurrentUser());
        console.log(getState());
      } else {
        console.log("There was an issue posting Menu");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//get menus within a range
export const getMenusInRange = (start, end) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/users/calendar/${start}/${end}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        let fetchedData = await response.json();
        dispatch({
          type: SAVE_USER_MENUS,
          payload: fetchedData,
        });
        console.log(getState());
      } else {
        console.log(
          "There was an issue fetching menus within the date specified"
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//edit a menu
export const editMenu = (menuInfo, menuId) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/users/calendar/${menuId}`, {
        method: "PUT",
        body: JSON.stringify(menuInfo),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(fetchCurrentUser());
        console.log(getState());
      } else {
        console.log("There was an issue editing Menu");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//delete a menu
export const deleteThisMenu = (menuId) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/users/calendar/${menuId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        await dispatch(fetchCurrentUser());
        console.log(getState());
      } else {
        console.log("There was an issue fetching this Menu");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
// Post shopping list
export const postNewList = (newList) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/users/list`, {
        method: "POST",
        body: JSON.stringify(newList),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        await dispatch(fetchCurrentUser());
        console.log(getState());
      } else {
        console.log("There was an issue posting Menu");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//****ADDING TO AND REMOVING FAVORITES *****/
export const addToFavs = (newReci) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/users/favorites`, {
        method: "POST",
        body: JSON.stringify(newReci),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        await dispatch(fetchCurrentUser());
        console.log(getState());
      } else {
        console.log("There was an issue posting favorite");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeFromFavs = (reciId) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem("UserAccessToken");
      const token = accessToken.split('"').join("");
      let response = await fetch(`${baseAPI}/users/favorite/${reciId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        await dispatch(fetchCurrentUser());
        dispatch({
          type: REMOVE_FROM_FAV,
          payload: reciId,
        });
        console.log(getState());
      } else {
        console.log("There was an issue fetching this favorite");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
