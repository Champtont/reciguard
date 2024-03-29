import {
  SAVE_CURRENT_USER,
  SAVE_RECIPES,
  SAVE_USER_RECIPES,
  SAVE_SINGLE_RECIPE,
  SAVE_USER_MENUS,
  SAVE_USER_SHOPPING,
  SAVE_TO_FAV,
  REMOVE_FROM_FAV,
} from "../actions";

const initialState = {
  currentUser: null,
  allRecipes: [],
  userRecipes: [],
  singleRecipe: null,
  recipeSearch: [],
  favorites: [],
  calendar: [],
  shoppingList: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SAVE_SINGLE_RECIPE:
      return {
        ...state,
        singleRecipe: action.payload,
      };
    case SAVE_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
      };
    case SAVE_USER_RECIPES:
      return {
        ...state,
        userRecipes: action.payload,
      };
    case SAVE_USER_MENUS:
      return {
        ...state,
        calendar: action.payload,
      };
    case SAVE_USER_SHOPPING:
      return {
        ...state,
        shoppingList: action.payload,
      };
    case SAVE_TO_FAV:
      return {
        ...state,
        favorites: action.payload,
      };
    case REMOVE_FROM_FAV:
      return {
        ...state,
        favorites: state.favorites.filter(
          (recId) => recId._id !== action.payload
        ),
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
