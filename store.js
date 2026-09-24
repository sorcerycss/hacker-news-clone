// Creates a simple store: holds state and updates it via a reducer
function createStore(reducer) {
    // Initialize state by calling the reducer with no state and an empty action
   let currentState = reducer(undefined, {});

   return {
    getState: () => currentState,
    // Runs the reducer with the current state + incoming action to get new state
    dispatch: action => {
      currentState = reducer(currentState, action);
    }
   }
}

const initialState = {
    favorites: []
}

// Reducer: determines how favorites state changes based on action type
function favoritesReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_FAVORITE": {
            const addedFavorite = action.payload.favorite;
            // Add new favorite without mutating original array
            const favorites = [...state.favorites, addedFavorite];
            return { favorites };
        }
        case "REMOVE_FAVORITE": {
            const removedFavorite = action.payload.favorite;
            // Filter out the favorite matching the removed one's id
            const favorites = state.favorites.filter(favorite => favorite.id !== removedFavorite.id);
            return { favorites };
        }
        default:
            return state;
    }
}

// Test action to confirm the store works before wiring it into the app
// const action = { type: "ADD_FAVORITE", payload: { favorite: { title: "story1", id: 1 } } };

const store = createStore(favoritesReducer);
// store.dispatch(action);
// console.log(store.getState());

export default store;
