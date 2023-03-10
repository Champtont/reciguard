import {
  SAVE_CURRENT_USER,
  SAVE_RECIPES,
  SAVE_USER_RECIPES,
  SAVE_SINGLE_RECIPE,
} from "../actions";

const initialState = {
  currentUser: null,
  allRecipes: [],
  userRecipes: [],
  singleRecipe: null,
  recipeSearch: [],
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
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
